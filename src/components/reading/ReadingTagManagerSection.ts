import { App, Modal, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import type { BookTagDefinition } from "../../types/dashboard";
import { applyResizableModal } from "../ResizableModal";

const DEFAULT_COLORS = ["#f8a8c4", "#ffd166", "#7bd88f", "#76c7f2", "#c9b6ff", "#fff1ad"];

export class ReadingTagManagerSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const list = container.createDiv({ cls: "cow-data-list cow-book-tag-manager-list" });
    const tags = this.store.getBookTags().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    if (tags.length === 0) {
      list.createDiv({ cls: "cow-empty-state", text: "暂无阅读标签。" });
    } else {
      tags.forEach((tag) => this.renderTag(list, tag));
    }

    const add = container.createEl("button", { cls: "cow-bottom-add-button", attr: { type: "button" } });
    setIcon(add.createSpan(), "plus");
    add.createSpan({ text: "新增标签" });
    add.addEventListener("click", () => openBookTagModal(this.app, this.store, this.onDataChanged));
  }

  private renderTag(container: HTMLElement, tag: BookTagDefinition): void {
    const card = container.createDiv({ cls: "cow-data-card cow-book-tag-manager-card" });
    card.style.setProperty("--book-tag-color", tag.color);
    const head = card.createDiv({ cls: "cow-list-item-head" });
    const label = head.createDiv({ cls: "cow-book-tag-preview" });
    label.createSpan({ text: tag.name });
    const actions = head.createDiv({ cls: "cow-list-item-actions" });
    this.iconButton(actions, "pencil", "编辑标签", () => openBookTagModal(this.app, this.store, this.onDataChanged, tag));
    this.iconButton(actions, "trash-2", "删除标签", async () => {
      if (!confirm(`删除“${tag.name}”标签？会从所有书籍中移除该标签，但不会删除书籍。`)) return;
      await this.store.deleteBookTag(tag.id);
      this.onDataChanged();
    });
    const count = this.store.getBooks().filter((book) => (book.tagIds ?? []).includes(tag.id)).length;
    card.createDiv({ cls: "cow-meta-line", text: `${count} 本书使用` });
  }

  private iconButton(container: HTMLElement, icon: string, label: string, onClick: () => void): void {
    const button = container.createEl("button", { attr: { type: "button", "aria-label": label } });
    setIcon(button, icon);
    button.addEventListener("click", onClick);
  }
}

export function openBookTagModal(
  app: App,
  store: DashboardStore,
  onDataChanged: () => void,
  tag?: BookTagDefinition
): void {
  new BookTagModal(app, store, onDataChanged, tag).open();
}

class BookTagModal extends Modal {
  private name: string;
  private color: string;

  constructor(
    app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void,
    private readonly tag?: BookTagDefinition
  ) {
    super(app);
    this.name = tag?.name ?? "";
    this.color = tag?.color ?? DEFAULT_COLORS[0];
  }

  onOpen(): void {
    applyResizableModal(this, {
      className: "cute-book-tag-modal",
      width: "min(560px, 90vw)",
      maxWidth: "96vw",
      maxHeight: "84vh",
      minWidth: "min(380px, 92vw)",
      minHeight: "min(300px, 76vh)"
    });
    this.render();
  }

  private render(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-book-tag-modal-content");
    this.contentEl.createEl("h2", { text: this.tag ? "编辑阅读标签" : "新增阅读标签" });
    const form = this.contentEl.createDiv({ cls: "cow-book-form" });
    const nameRow = form.createDiv({ cls: "cow-book-form-row" });
    nameRow.createEl("label", { text: "标签名称" });
    const input = nameRow.createEl("input", { value: this.name, attr: { type: "text" } });
    input.addEventListener("input", () => this.name = input.value);
    const colorRow = form.createDiv({ cls: "cow-book-form-row" });
    colorRow.createEl("label", { text: "颜色" });
    const colors = colorRow.createDiv({ cls: "cow-book-tag-color-grid" });
    DEFAULT_COLORS.forEach((color) => {
      const chip = colors.createEl("button", { cls: this.color === color ? "is-selected" : "", attr: { type: "button", "aria-label": color } });
      chip.style.backgroundColor = color;
      chip.addEventListener("click", () => {
        this.color = color;
        this.render();
      });
    });
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", () => void this.save());
  }

  private async save(): Promise<void> {
    if (!this.name.trim()) return;
    const payload: BookTagDefinition = {
      id: this.tag?.id ?? `book-tag-${Date.now()}`,
      name: this.name.trim(),
      color: this.color,
      order: this.tag?.order ?? this.store.getBookTags().length * 10 + 10
    };
    if (this.tag) await this.store.updateBookTag(this.tag.id, payload);
    else await this.store.addBookTag(payload);
    this.onDataChanged();
    this.close();
  }
}
