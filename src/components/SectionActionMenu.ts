import { App, Menu, Modal, setIcon } from "obsidian";
import type { DashboardStore } from "../core/DashboardStore";
import type { DashboardSectionConfig } from "../types/dashboard";
import { getSectionCapabilities } from "../core/SectionCapabilities";
import { openAddContentModal } from "./SectionContentActions";

const CARD_COLORS = [
  { id: "default", label: "默认" },
  { id: "pink", label: "粉色" },
  { id: "cream", label: "奶油黄" },
  { id: "mint", label: "薄荷绿" },
  { id: "sky", label: "天蓝" },
  { id: "lavender", label: "淡紫" }
];

const WIDTHS: Array<{ id: NonNullable<DashboardSectionConfig["width"]>; label: string }> = [
  { id: "sm", label: "小" },
  { id: "md", label: "中" },
  { id: "lg", label: "大" },
  { id: "full", label: "整行" }
];

export class SectionActionMenu {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly section: DashboardSectionConfig,
    private readonly onRemove: (section: DashboardSectionConfig) => Promise<void>,
    private readonly onDataChanged: () => void
  ) {}

  show(event: MouseEvent): void {
    const menu = new Menu();
    const capabilities = getSectionCapabilities(this.section.type);

    if (capabilities.canAdd) {
      menu.addItem((item) => item
        .setTitle("添加内容")
        .setIcon("plus")
        .onClick(() => void this.addContent()));
    }

    menu.addItem((item) => item
      .setTitle("修改框体颜色")
      .setIcon("palette")
      .onClick(() => new SectionColorModal(this.app, this.store, this.section, this.onDataChanged).open()));
    menu.addItem((item) => item
      .setTitle("修改宽度")
      .setIcon("columns-3")
      .onClick(() => new SectionWidthModal(this.app, this.store, this.section, this.onDataChanged).open()));
    menu.addSeparator();
    menu.addItem((item) => item
      .setTitle("上移")
      .setIcon("arrow-up")
      .onClick(() => void this.move("up")));
    menu.addItem((item) => item
      .setTitle("下移")
      .setIcon("arrow-down")
      .onClick(() => void this.move("down")));
    menu.addItem((item) => item
      .setTitle("隐藏")
      .setIcon("eye-off")
      .onClick(() => void this.hide()));
    menu.addSeparator();
    menu.addItem((item) => item
      .setTitle("删除")
      .setIcon("trash-2")
      .setWarning(true)
      .onClick(() => new ConfirmSectionDeleteModal(this.app, this.section, () => this.onRemove(this.section)).open()));

    menu.showAtMouseEvent(event);
  }

  private async addContent(): Promise<void> {
    openAddContentModal(this.app, this.store, this.section, this.onDataChanged);
  }

  private async move(direction: "up" | "down"): Promise<void> {
    await this.store.moveSection(this.section.id, direction);
    this.onDataChanged();
  }

  private async hide(): Promise<void> {
    await this.store.setSectionEnabled(this.section.id, false);
    this.onDataChanged();
  }
}

class ConfirmSectionDeleteModal extends Modal {
  constructor(
    app: App,
    private readonly section: DashboardSectionConfig,
    private readonly onConfirm: () => Promise<void>
  ) {
    super(app);
  }

  onOpen(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: `删除“${this.section.title}”分区？` });
    this.contentEl.createEl("p", { text: "只会从当前工作台布局移除，不会删除任何 Markdown 文件或业务数据。" });

    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } })
      .addEventListener("click", () => this.close());

    const remove = actions.createEl("button", { text: "删除", cls: "mod-warning", attr: { type: "button" } });
    remove.addEventListener("click", async () => {
      await this.onConfirm();
      this.close();
    });
  }
}

class SectionColorModal extends Modal {
  constructor(
    app: App,
    private readonly store: DashboardStore,
    private readonly section: DashboardSectionConfig,
    private readonly onDataChanged: () => void
  ) {
    super(app);
  }

  onOpen(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: "修改框体颜色" });
    const grid = this.contentEl.createDiv({ cls: "cow-choice-grid" });
    const current = String(this.section.config?.cardColor ?? "default");
    CARD_COLORS.forEach((color) => {
      const button = grid.createEl("button", {
        cls: `cow-color-choice cow-card-color-${color.id} ${current === color.id ? "is-active" : ""}`,
        attr: { type: "button" }
      });
      button.createSpan({ text: color.label });
      button.addEventListener("click", async () => {
        await this.store.updateSectionConfig(this.section.id, { cardColor: color.id });
        this.onDataChanged();
        this.close();
      });
    });
  }
}

class SectionWidthModal extends Modal {
  constructor(
    app: App,
    private readonly store: DashboardStore,
    private readonly section: DashboardSectionConfig,
    private readonly onDataChanged: () => void
  ) {
    super(app);
  }

  onOpen(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: "修改宽度" });
    const grid = this.contentEl.createDiv({ cls: "cow-choice-grid" });
    WIDTHS.forEach((width) => {
      const button = grid.createEl("button", {
        cls: this.section.width === width.id ? "is-active" : "",
        attr: { type: "button" }
      });
      setIcon(button.createSpan(), width.id === "full" ? "panel-top" : "columns-3");
      button.createSpan({ text: width.label });
      button.addEventListener("click", async () => {
        await this.store.updateSection(this.section.id, { width: width.id });
        this.onDataChanged();
        this.close();
      });
    });
  }
}
