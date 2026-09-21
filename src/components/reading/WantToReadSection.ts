import { App, Modal, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import type { WantToReadItem } from "../../types/dashboard";
import { applyResizableModal } from "../ResizableModal";
import { AddBookModal } from "./AddBookModal";

export class WantToReadSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const pending = this.store.getWantToReadItems().filter((item) => item.status === "pending");
    const added = this.store.getWantToReadItems().filter((item) => item.status === "added");
    const list = container.createDiv({ cls: "cow-data-list cow-want-read-list" });
    if (pending.length === 0) {
      list.createDiv({ cls: "cow-empty-state", text: "暂无待处理想读记录。这里适合快速记下书名、作者和概述。" });
    } else {
      pending.forEach((item) => this.renderItem(list, item));
    }

    if (added.length > 0) {
      const history = container.createDiv({ cls: "cow-want-read-history" });
      history.createEl("strong", { text: "已加入书架" });
      added.slice(0, 6).forEach((item) => {
        const row = history.createDiv({ cls: "cow-meta-line" });
        row.createSpan({ text: `✓ ${item.title}` });
      });
    }

    const add = container.createEl("button", { cls: "cow-bottom-add-button", attr: { type: "button" } });
    setIcon(add.createSpan(), "plus");
    add.createSpan({ text: "添加想读" });
    add.addEventListener("click", () => openWantToReadModal(this.app, this.store, this.onDataChanged));
  }

  private renderItem(container: HTMLElement, item: WantToReadItem): void {
    const card = container.createDiv({ cls: "cow-data-card cow-want-read-card" });
    const head = card.createDiv({ cls: "cow-list-item-head" });
    head.createEl("strong", { text: item.title });
    const actions = head.createDiv({ cls: "cow-list-item-actions" });
    this.textButton(actions, "加入书架", "library", () => this.addToShelf(item));
    this.iconButton(actions, "pencil", "编辑想读", () => openWantToReadModal(this.app, this.store, this.onDataChanged, item));
    this.iconButton(actions, "trash-2", "删除想读", async () => {
      if (!confirm(`删除“${item.title}”想读记录？不会删除任何书籍文件。`)) return;
      await this.store.deleteWantToReadItem(item.id);
      this.onDataChanged();
    });
    card.createDiv({ cls: "cow-meta-line", text: item.author || "未知作者" });
    if (item.summary) card.createEl("p", { text: item.summary });
  }

  private addToShelf(item: WantToReadItem): void {
    new AddBookModal(this.app, this.store, this.onDataChanged, undefined, {
      initialDraft: {
        title: item.title,
        author: item.author ?? "",
        description: item.summary ?? "",
        readingStatus: "want-to-read"
      },
      onBookSaved: async (book) => {
        await this.store.updateWantToReadItem(item.id, { status: "added", bookId: book.id });
      }
    }).open();
  }

  private iconButton(container: HTMLElement, icon: string, label: string, onClick: () => void): void {
    const button = container.createEl("button", { attr: { type: "button", "aria-label": label } });
    setIcon(button, icon);
    button.addEventListener("click", onClick);
  }

  private textButton(container: HTMLElement, label: string, icon: string, onClick: () => void): void {
    const button = container.createEl("button", { cls: "cow-section-add-button", attr: { type: "button" } });
    setIcon(button.createSpan(), icon);
    button.createSpan({ text: label });
    button.addEventListener("click", onClick);
  }
}

export function openWantToReadModal(
  app: App,
  store: DashboardStore,
  onDataChanged: () => void,
  item?: WantToReadItem
): void {
  new WantToReadModal(app, store, onDataChanged, item).open();
}

class WantToReadModal extends Modal {
  private title: string;
  private author: string;
  private summary: string;

  constructor(
    app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void,
    private readonly item?: WantToReadItem
  ) {
    super(app);
    this.title = item?.title ?? "";
    this.author = item?.author ?? "";
    this.summary = item?.summary ?? "";
  }

  onOpen(): void {
    applyResizableModal(this, {
      className: "cute-want-read-modal",
      width: "min(620px, 90vw)",
      maxWidth: "96vw",
      maxHeight: "86vh",
      minWidth: "min(420px, 92vw)",
      minHeight: "min(340px, 78vh)"
    });
    this.render();
  }

  private render(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-want-read-modal-content");
    this.contentEl.createEl("h2", { text: this.item ? "编辑想读" : "添加想读" });
    const form = this.contentEl.createDiv({ cls: "cow-book-form" });
    this.bindInput(this.textField(form, "书名 *", this.title), (value) => this.title = value);
    this.bindInput(this.textField(form, "作者", this.author), (value) => this.author = value);
    this.bindInput(this.textareaField(form, "概述", this.summary), (value) => this.summary = value);
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", () => void this.save());
  }

  private async save(): Promise<void> {
    if (!this.title.trim()) return;
    const now = new Date().toISOString();
    const payload: WantToReadItem = {
      id: this.item?.id ?? `want-read-${Date.now()}`,
      title: this.title.trim(),
      author: this.author.trim(),
      summary: this.summary.trim(),
      status: this.item?.status ?? "pending",
      bookId: this.item?.bookId,
      createdAt: this.item?.createdAt ?? now,
      updatedAt: now
    };
    if (this.item) await this.store.updateWantToReadItem(this.item.id, payload);
    else await this.store.addWantToReadItem(payload);
    this.onDataChanged();
    this.close();
  }

  private textField(container: HTMLElement, label: string, value: string): HTMLInputElement {
    const row = container.createDiv({ cls: "cow-book-form-row" });
    row.createEl("label", { text: label });
    return row.createEl("input", { value, attr: { type: "text" } });
  }

  private textareaField(container: HTMLElement, label: string, value: string): HTMLTextAreaElement {
    const row = container.createDiv({ cls: "cow-book-form-row" });
    row.createEl("label", { text: label });
    return row.createEl("textarea", { text: value });
  }

  private bindInput(input: HTMLInputElement | HTMLTextAreaElement, onInput: (value: string) => void): void {
    input.addEventListener("input", () => onInput(input.value));
  }
}
