import { App, Menu, Modal, setIcon } from "obsidian";
import type { DashboardStore } from "../core/DashboardStore";
import type { DashboardSectionConfig } from "../types/dashboard";
import { getSectionCapabilities } from "../core/SectionCapabilities";
import { openAddContentModal } from "./SectionContentActions";
import { openManageContentModal } from "./SectionContentActions";
import { applyResizableModal } from "./ResizableModal";

const CARD_COLORS = [
  { id: "default", label: "默认" },
  { id: "pink", label: "粉色" },
  { id: "cream", label: "奶油黄" },
  { id: "mint", label: "薄荷绿" },
  { id: "sky", label: "天蓝" },
  { id: "lavender", label: "淡紫" }
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
    if (capabilities.canManage) {
      menu.addItem((item) => item
        .setTitle("编辑数据")
        .setIcon("pencil")
        .onClick(() => openManageContentModal(this.app, this.store, this.section, this.onDataChanged)));
    }

    menu.addItem((item) => item
      .setTitle("修改框体颜色")
      .setIcon("palette")
      .onClick(() => new SectionColorModal(this.app, this.store, this.section, this.onDataChanged).open()));
    menu.addItem((item) => item
      .setTitle("修改宽高")
      .setIcon("maximize-2")
      .onClick(() => new SectionSizeModal(this.app, this.store, this.section, this.onDataChanged).open()));
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
    await this.store.moveSectionLayout(this.section.page, this.section.id, direction);
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

class SectionSizeModal extends Modal {
  constructor(
    app: App,
    private readonly store: DashboardStore,
    private readonly section: DashboardSectionConfig,
    private readonly onDataChanged: () => void
  ) {
    super(app);
  }

  onOpen(): void {
    applyResizableModal(this, {
      className: "cute-section-size-modal",
      width: "min(720px, 92vw)",
      height: "min(640px, 82vh)",
      maxWidth: "96vw",
      maxHeight: "90vh",
      minWidth: "min(360px, 92vw)",
      minHeight: "min(360px, 70vh)"
    });
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-section-size-modal");
    this.contentEl.createEl("h2", { text: "修改宽高" });
    this.contentEl.createEl("p", { text: `正在调整“${this.section.title}”。数值对应当前工作台的逻辑列宽与行高。` });

    const layout = this.store.getModuleLayout(this.section.page);
    const columns = layout.mode === "custom" ? layout.columns ?? 12 : 12;
    const saved = layout.sections?.[this.section.id];
    const defaultWidth = this.defaultWidth();
    const form = this.contentEl.createDiv({ cls: "cow-form-grid cow-section-size-form" });
    const widthField = form.createDiv({ cls: "cow-form-row" });
    widthField.createEl("label", { text: `宽度（1-${columns} 列）` });
    const widthInput = widthField.createEl("input", { type: "number", value: String(saved?.colSpan ?? defaultWidth), attr: { min: "1", max: String(columns), step: "1" } });
    const heightField = form.createDiv({ cls: "cow-form-row" });
    heightField.createEl("label", { text: "高度（1-12 行）" });
    const heightInput = heightField.createEl("input", { type: "number", value: String(saved?.rowSpan ?? 1), attr: { min: "1", max: "12", step: "1" } });

    const presetToggle = this.contentEl.createEl("label", { cls: "cow-section-size-preset-toggle" });
    const savePreset = presetToggle.createEl("input", { type: "checkbox" });
    presetToggle.createSpan({ text: "将这组尺寸保存为标准" });
    const presetName = this.contentEl.createEl("input", {
      cls: "cow-section-size-preset-name",
      attr: { type: "text", placeholder: "例如：双列重点卡" }
    });
    presetName.hidden = true;
    savePreset.addEventListener("change", () => {
      presetName.hidden = !savePreset.checked;
      if (savePreset.checked) presetName.focus();
    });

    const error = this.contentEl.createDiv({ cls: "cow-form-error" });
    error.hidden = true;
    const presets = this.store.getSectionSizePresets(this.section.page);
    const presetArea = this.contentEl.createDiv({ cls: "cow-section-size-presets" });
    presetArea.createEl("h3", { text: "已有尺寸标准" });
    if (presets.length === 0) {
      presetArea.createDiv({ cls: "cow-empty-state", text: "还没有保存的尺寸标准。" });
    } else {
      const list = presetArea.createDiv({ cls: "cow-data-list" });
      presets.forEach((preset) => {
        const row = list.createDiv({ cls: "cow-data-row cow-section-size-preset" });
        row.createDiv({ text: `${preset.name} · ${preset.colSpan} × ${preset.rowSpan}` });
        const use = row.createEl("button", { text: "使用", attr: { type: "button" } });
        use.addEventListener("click", () => {
          widthInput.value = String(preset.colSpan);
          heightInput.value = String(preset.rowSpan);
          error.hidden = true;
        });
      });
    }

    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    const apply = actions.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } });
    apply.addEventListener("click", async () => {
      const colSpan = Number(widthInput.value);
      const rowSpan = Number(heightInput.value);
      const invalid = !Number.isInteger(colSpan) || !Number.isInteger(rowSpan) || colSpan < 1 || colSpan > columns || rowSpan < 1 || rowSpan > 12;
      if (invalid) {
        error.setText(`请输入宽度 1-${columns}、高度 1-12 的整数。`);
        error.hidden = false;
        return;
      }
      if (savePreset.checked && !presetName.value.trim()) {
        error.setText("请输入尺寸标准名称。" );
        error.hidden = false;
        return;
      }
      await this.store.applySectionSize(this.section.page, this.section.id, colSpan, rowSpan);
      if (savePreset.checked) {
        await this.store.saveSectionSizePreset(this.section.page, { name: presetName.value, colSpan, rowSpan });
      }
      this.onDataChanged();
      this.close();
    });
  }

  private defaultWidth(): number {
    if (this.section.width === "full") return 12;
    if (this.section.width === "lg") return 8;
    if (this.section.width === "sm") return 3;
    return 4;
  }
}
