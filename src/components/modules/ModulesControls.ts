import { App, Modal, Notice, setIcon, Setting } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { AVAILABLE_MODULES, DASHBOARD_PAGES } from "../../core/DashboardStore";
import type { CustomSectionInput, DashboardPage, DashboardSectionConfig, ModuleLayoutConfig, ModuleLayoutMode, SectionLayoutConfig } from "../../types/dashboard";
import { PAGE_LABELS } from "../../core/PageLabels";

function renderSwitch(container: HTMLElement, checked: boolean, onChange: (checked: boolean) => void): HTMLInputElement {
  const input = container.createEl("input", { type: "checkbox", cls: "cow-switch" });
  input.checked = checked;
  input.addEventListener("change", () => onChange(input.checked));
  return input;
}

function renderField(container: HTMLElement, label: string, value: string, onChange: (value: string) => void, type = "text"): void {
  const row = container.createDiv({ cls: "cow-setting-row" });
  row.createSpan({ text: label });
  const input = row.createEl("input", { type, value });
  input.addEventListener("change", () => onChange(input.value));
}

export class EnabledModulesOverviewSection {
  constructor(private readonly store: DashboardStore) {}

  render(container: HTMLElement): void {
    const currentPage = this.store.getData().currentPage;
    const currentEnabled = this.store.getSectionsForPage(currentPage).length;
    const allEnabled = this.store.getAllSections().filter((section) => section.enabled).length;
    const total = this.store.getAllSections().length;
    const grid = container.createDiv({ cls: "cow-reading-stat-grid" });
    [
      ["当前页面", `${currentEnabled} 个`],
      ["全部启用", `${allEnabled} 个`],
      ["模块总数", `${total} 个`],
      ["页面数量", `${DASHBOARD_PAGES.length} 个`]
    ].forEach(([label, value]) => {
      const item = grid.createDiv();
      item.createEl("strong", { text: value });
      item.createSpan({ text: label });
    });
  }
}

const MANAGED_PAGES: DashboardPage[] = ["overview", "research", "reading", "fitness", "finance", "goals"];

type LayoutTemplateId = "two-columns" | "three-columns" | "left-large" | "right-large" | "top-full" | "left-feature";

interface LayoutTemplateDefinition {
  id: LayoutTemplateId;
  label: string;
  description: string;
  columns: number;
}

const LAYOUT_TEMPLATES: LayoutTemplateDefinition[] = [
  { id: "two-columns", label: "均匀双列", description: "两个等宽列，适合通用信息流。", columns: 2 },
  { id: "three-columns", label: "均匀三列", description: "三列并排，适合轻量卡片。", columns: 3 },
  { id: "left-large", label: "左大右小", description: "左侧重点，右侧上下排列。", columns: 4 },
  { id: "right-large", label: "左小右大", description: "右侧重点，左侧上下排列。", columns: 4 },
  { id: "top-full", label: "顶部通栏", description: "首个板块通栏，下方双列。", columns: 4 },
  { id: "left-feature", label: "左列重点", description: "左侧整列，右侧网格。", columns: 4 }
];

export class HomeLayoutManagerSection {
  private selectedPage: DashboardPage;
  private selectedSectionId?: string;
  private host?: HTMLElement;

  constructor(
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {
    const currentPage = this.store.getData().currentPage;
    this.selectedPage = MANAGED_PAGES.includes(currentPage) ? currentPage : "overview";
  }

  render(container: HTMLElement): void {
    this.host = container;
    container.empty();
    const header = container.createDiv({ cls: "cow-layout-manager-header" });
    header.createSpan({ text: "当前模块" });
    const select = header.createEl("select", { attr: { "aria-label": "选择要设置布局的模块" } });
    MANAGED_PAGES.forEach((page) => select.createEl("option", { value: page, text: PAGE_LABELS[page] }));
    select.value = this.selectedPage;
    select.addEventListener("change", () => {
      this.selectedPage = select.value as DashboardPage;
      this.selectedSectionId = undefined;
      this.render(container);
    });

    const layout = this.store.getModuleLayout(this.selectedPage);
    const current = layout.mode;
    const grid = container.createDiv({ cls: "cow-layout-picker" });
    [
      ["default", "默认布局", "保持当前页面标准卡片节奏"],
      ["compact", "紧凑布局", "增加网格列数，减少间距和留白"],
      ["minimal", "极简布局", "单列展示，减少装饰但保留数据"],
      ["custom", "自定义布局", "使用模板、跨度和顺序控制板块"]
    ].forEach(([id, title, desc]) => {
      const button = grid.createEl("button", { cls: current === id ? "is-active" : "", attr: { type: "button" } });
      button.createEl("strong", { text: title });
      button.createSpan({ text: desc });
      button.addEventListener("click", async () => {
        await this.store.setModuleLayoutMode(this.selectedPage, id as ModuleLayoutMode);
        this.rerender();
      });
    });

    const note = container.createDiv({ cls: "cow-meta-line" });
    note.createSpan({ text: `${PAGE_LABELS[this.selectedPage]} 当前列数：${layout.columns ?? 12}。自定义布局会保存 columns / colSpan / rowSpan，并只作用于当前模块。` });
    if (layout.mode === "custom") {
      this.renderCustomLayoutEditor(container, layout);
    }
  }

  private renderCustomLayoutEditor(container: HTMLElement, layout: ModuleLayoutConfig): void {
    container.createEl("h4", { text: "布局模板" });
    const templates = container.createDiv({ cls: "cow-layout-template-grid" });
    LAYOUT_TEMPLATES.forEach((template) => {
      const button = templates.createEl("button", { cls: layout.templateId === template.id ? "is-active" : "", attr: { type: "button" } });
      const title = button.createDiv({ cls: "cow-layout-template-title" });
      title.createEl("strong", { text: template.label });
      if (layout.templateId === template.id) title.createSpan({ text: "✓" });
      this.renderTemplateMiniature(button, template.id);
      button.createSpan({ text: template.description });
      button.addEventListener("click", async () => {
        const sections = this.getManagedSections();
        await this.store.updateModuleLayout(this.selectedPage, {
          mode: "custom",
          columns: template.columns,
          templateId: template.id,
          sections: this.createTemplateSectionLayouts(template, sections)
        });
        this.rerender();
      });
    });

    container.createEl("h4", { text: "布局预览" });
    this.renderPreview(container, layout);
    container.createEl("h4", { text: "板块布局" });
    this.renderSectionEditor(container, layout);
  }

  private renderTemplateMiniature(container: HTMLElement, id: LayoutTemplateId): void {
    const mini = container.createDiv({ cls: `cow-layout-template-mini is-${id}` });
    Array.from({ length: id === "left-feature" ? 5 : 4 }, (_, index) => {
      mini.createDiv({ text: String.fromCharCode(65 + index) });
    });
  }

  private renderPreview(container: HTMLElement, layout: ModuleLayoutConfig): void {
    const sections = this.getManagedSections();
    const preview = container.createDiv({ cls: "cow-layout-preview" });
    preview.style.setProperty("--preview-columns", String(layout.columns ?? 4));
    sections.forEach((section) => {
      const sectionLayout = this.getSectionLayout(layout, section);
      const tile = preview.createEl("button", {
        cls: [
          "cow-layout-preview-tile",
          section.enabled ? "" : "is-disabled",
          this.selectedSectionId === section.id ? "is-selected" : ""
        ].filter(Boolean).join(" "),
        attr: { type: "button" }
      });
      tile.style.gridColumn = `span ${this.clamp(sectionLayout.colSpan ?? 1, 1, layout.columns ?? 4)}`;
      tile.style.gridRow = `span ${this.clamp(sectionLayout.rowSpan ?? 1, 1, 3)}`;
      tile.createEl("strong", { text: section.title });
      tile.createSpan({ text: `${sectionLayout.colSpan ?? 1}×${sectionLayout.rowSpan ?? 1}${section.enabled ? "" : " · 已隐藏"}` });
      tile.addEventListener("click", () => {
        this.selectedSectionId = section.id;
        this.rerender();
      });
    });
  }

  private renderSectionEditor(container: HTMLElement, layout: ModuleLayoutConfig): void {
    const sections = this.getManagedSections();
    const selected = sections.find((section) => section.id === this.selectedSectionId) ?? sections[0];
    if (selected && !this.selectedSectionId) this.selectedSectionId = selected.id;
    const list = container.createDiv({ cls: "cow-layout-section-list" });
    sections.forEach((section) => {
      const row = list.createDiv({ cls: `cow-layout-section-row ${this.selectedSectionId === section.id ? "is-selected" : ""} ${section.enabled ? "" : "is-disabled"}` });
      const title = row.createDiv({ cls: "cow-section-manager-title" });
      title.createEl("strong", { text: section.title });
      title.createSpan({ text: section.enabled ? "已启用" : "已隐藏，重新启用后会恢复此布局" });
      row.addEventListener("click", () => {
        this.selectedSectionId = section.id;
        this.rerender();
      });
      const actions = row.createDiv({ cls: "cow-list-item-actions" });
      const up = actions.createEl("button", { attr: { type: "button", "aria-label": "上移" } });
      setIcon(up, "arrow-up");
      up.addEventListener("click", async (event) => {
        event.stopPropagation();
        await this.store.moveSectionLayout(this.selectedPage, section.id, "up");
        this.selectedSectionId = section.id;
        this.rerender();
      });
      const down = actions.createEl("button", { attr: { type: "button", "aria-label": "下移" } });
      setIcon(down, "arrow-down");
      down.addEventListener("click", async (event) => {
        event.stopPropagation();
        await this.store.moveSectionLayout(this.selectedPage, section.id, "down");
        this.selectedSectionId = section.id;
        this.rerender();
      });
    });
    if (!selected) {
      container.createDiv({ cls: "cow-empty-state", text: "当前模块暂无可配置板块。" });
      return;
    }
    const selectedLayout = this.getSectionLayout(layout, selected);
    const panel = container.createDiv({ cls: "cow-layout-selected-panel" });
    panel.createEl("strong", { text: `当前选中：${selected.title}` });
    panel.createDiv({ cls: "cow-meta-line", text: selected.enabled ? "修改宽度 / 高度跨度后会立即应用到当前模块。" : "该 Section 已隐藏，布局设置会保留到恢复显示后继续生效。" });
    const controls = panel.createDiv({ cls: "cow-layout-span-controls" });
    this.renderSpanButtons(controls, "宽度", layout.columns ?? 4, selectedLayout.colSpan ?? 1, async (value) => {
      await this.store.updateSectionLayout(this.selectedPage, selected.id, { colSpan: value });
      this.selectedSectionId = selected.id;
      this.rerender();
    });
    this.renderSpanButtons(controls, "高度", 3, selectedLayout.rowSpan ?? 1, async (value) => {
      await this.store.updateSectionLayout(this.selectedPage, selected.id, { rowSpan: value });
      this.selectedSectionId = selected.id;
      this.rerender();
    });
  }

  private renderSpanButtons(container: HTMLElement, label: string, max: number, current: number, onPick: (value: number) => Promise<void>): void {
    const group = container.createDiv({ cls: "cow-layout-span-group" });
    group.createSpan({ text: label });
    for (let value = 1; value <= max; value += 1) {
      const button = group.createEl("button", { cls: current === value ? "is-active" : "", text: String(value), attr: { type: "button" } });
      button.addEventListener("click", () => void onPick(value));
    }
  }

  private createTemplateSectionLayouts(template: LayoutTemplateDefinition, sections: DashboardSectionConfig[]): Record<string, SectionLayoutConfig> {
    const layouts: Record<string, SectionLayoutConfig> = {};
    sections.forEach((section, index) => {
      layouts[section.id] = {
        order: (index + 1) * 10,
        colSpan: this.templateColSpan(template.id, index),
        rowSpan: this.templateRowSpan(template.id, index)
      };
    });
    return layouts;
  }

  private templateColSpan(template: LayoutTemplateId, index: number): number {
    if (template === "two-columns") return 1;
    if (template === "three-columns") return 1;
    if (template === "top-full" && index === 0) return 4;
    if (template === "top-full") return 2;
    if (template === "left-feature") return index === 0 ? 2 : 1;
    return 2;
  }

  private templateRowSpan(template: LayoutTemplateId, index: number): number {
    if ((template === "left-large" || template === "left-feature") && index === 0) return 2;
    if (template === "right-large" && index === 1) return 2;
    return 1;
  }

  private getManagedSections(): DashboardSectionConfig[] {
    const layout = this.store.getModuleLayout(this.selectedPage);
    return this.store.getAllSections()
      .filter((section) => section.page === this.selectedPage)
      .sort((left, right) => this.getSectionLayout(layout, left).order - this.getSectionLayout(layout, right).order);
  }

  private getSectionLayout(layout: ModuleLayoutConfig, section: DashboardSectionConfig): Required<SectionLayoutConfig> {
    return {
      order: layout.sections?.[section.id]?.order ?? section.order,
      colSpan: this.clamp(layout.sections?.[section.id]?.colSpan ?? 1, 1, layout.columns ?? 4),
      rowSpan: this.clamp(layout.sections?.[section.id]?.rowSpan ?? 1, 1, 3)
    };
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, Number(value) || min));
  }

  private rerender(): void {
    if (this.host) this.render(this.host);
  }
}

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

export class FunctionalSectionManagerSection {
  private selectedPage: DashboardPage = "overview";
  private draggingId?: string;
  private host?: HTMLElement;

  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {
    const currentPage = this.store.getData().currentPage;
    this.selectedPage = MANAGED_PAGES.includes(currentPage) ? currentPage : "overview";
  }

  render(container: HTMLElement): void {
    this.host = container;
    container.empty();
    const root = container.createDiv({ cls: "cow-section-manager" });
    this.renderPagePicker(root);
    const columns = root.createDiv({ cls: "cow-section-manager-columns" });
    this.renderEnabled(columns);
    this.renderHidden(columns);
    this.renderAddable(columns);
  }

  private renderPagePicker(container: HTMLElement): void {
    const picker = container.createDiv({ cls: "cow-section-manager-picker" });
    MANAGED_PAGES.forEach((page) => {
      const button = picker.createEl("button", {
        cls: page === this.selectedPage ? "is-active" : "",
        attr: { type: "button" }
      });
      button.createSpan({ text: PAGE_LABELS[page] });
      button.addEventListener("click", () => {
        this.selectedPage = page;
        container.empty();
        this.renderPagePicker(container);
        const columns = container.createDiv({ cls: "cow-section-manager-columns" });
        this.renderEnabled(columns);
        this.renderHidden(columns);
        this.renderAddable(columns);
      });
    });
  }

  private renderEnabled(container: HTMLElement): void {
    const panel = container.createDiv({ cls: "cow-section-manager-panel" });
    panel.createEl("h4", { text: "当前启用模块" });
    const list = panel.createDiv({ cls: "cow-module-sort-list" });
    const sections = this.store.getAllSections().filter((section) => section.page === this.selectedPage && section.enabled);
    if (sections.length === 0) {
      list.createEl("p", { cls: "cow-empty-state", text: "暂无启用模块。" });
    }
    sections.forEach((section) => this.renderSectionRow(list, section, "enabled"));
  }

  private renderHidden(container: HTMLElement): void {
    const panel = container.createDiv({ cls: "cow-section-manager-panel" });
    panel.createEl("h4", { text: "隐藏模块" });
    const list = panel.createDiv({ cls: "cow-module-sort-list" });
    const sections = this.store.getAllSections().filter((section) => section.page === this.selectedPage && !section.enabled);
    if (sections.length === 0) {
      list.createEl("p", { cls: "cow-empty-state", text: "暂无隐藏模块。" });
    }
    sections.forEach((section) => this.renderSectionRow(list, section, "hidden"));
  }

  private renderAddable(container: HTMLElement): void {
    const panel = container.createDiv({ cls: "cow-section-manager-panel" });
    const header = panel.createDiv({ cls: "cow-list-item-head" });
    header.createEl("h4", { text: "可添加模块" });
    const custom = header.createEl("button", { cls: "cow-small-action", attr: { type: "button" } });
    setIcon(custom.createSpan(), "plus");
    custom.createSpan({ text: "自定义" });
    custom.addEventListener("click", () => {
      new CustomSectionModal(this.app, this.selectedPage, async (input) => {
        await this.store.addCustomSection(input);
        this.rerender();
      }).open();
    });

    const existingTypes = new Set(this.store.getAllSections().filter((section) => section.page === this.selectedPage).map((section) => section.type));
    const addable = AVAILABLE_MODULES.filter((module) => module.page === this.selectedPage && !existingTypes.has(module.type));
    const list = panel.createDiv({ cls: "cow-module-sort-list" });
    if (addable.length === 0) {
      list.createEl("p", { cls: "cow-empty-state", text: "默认模块都已在布局中，可继续创建自定义分区。" });
    }
    addable.forEach((module) => {
      const row = list.createDiv({ cls: "cow-section-manager-row" });
      row.createDiv().createEl("strong", { text: module.title });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: module.description });
      const actions = row.createDiv({ cls: "cow-list-item-actions" });
      const add = actions.createEl("button", { attr: { type: "button", "aria-label": "添加模块" } });
      setIcon(add, "plus");
      add.addEventListener("click", async () => {
        await this.store.addSection(this.selectedPage, module.type);
        this.rerender();
      });
    });
  }

  private renderSectionRow(list: HTMLElement, section: DashboardSectionConfig, mode: "enabled" | "hidden"): void {
    const row = list.createDiv({ cls: "cow-section-manager-row", attr: { draggable: mode === "enabled" ? "true" : "false", "data-id": section.id } });
    const title = row.createDiv({ cls: "cow-section-manager-title" });
    if (mode === "enabled") {
      const handle = title.createSpan({ cls: "cow-drag-handle" });
      setIcon(handle, "grip-vertical");
    }
    title.createEl("strong", { text: section.title });
    title.createSpan({ text: this.getSectionDescription(section) });
    const controls = row.createDiv({ cls: "cow-section-manager-controls" });
    this.renderColorSelect(controls, section);
    this.renderWidthSelect(controls, section);
    const actions = row.createDiv({ cls: "cow-list-item-actions" });
    if (mode === "enabled") {
      this.renderIconButton(actions, "eye-off", "隐藏", async () => this.store.setSectionEnabled(section.id, false));
    } else {
      this.renderIconButton(actions, "eye", "恢复", async () => this.store.setSectionEnabled(section.id, true));
    }
    this.renderIconButton(actions, "trash-2", "删除", async () => this.store.removeSection(section.id));

    if (mode === "enabled") {
      row.addEventListener("dragstart", () => {
        this.draggingId = section.id;
        row.addClass("is-dragging");
      });
      row.addEventListener("dragend", () => {
        this.draggingId = undefined;
        row.removeClass("is-dragging");
      });
      row.addEventListener("dragover", (event) => {
        event.preventDefault();
        if (!this.draggingId || this.draggingId === section.id) return;
        const draggingEl = list.querySelector(`[data-id="${this.draggingId}"]`);
        if (draggingEl) list.insertBefore(draggingEl, row);
      });
      row.addEventListener("drop", async () => {
        const ids = Array.from(list.querySelectorAll<HTMLElement>(".cow-section-manager-row")).map((item) => item.dataset.id ?? "");
        await this.store.reorderSections(this.selectedPage, ids);
        this.rerender();
      });
    }
  }

  private renderColorSelect(container: HTMLElement, section: DashboardSectionConfig): void {
    const select = container.createEl("select", { attr: { "aria-label": "修改颜色" } });
    CARD_COLORS.forEach((color) => select.createEl("option", { value: color.id, text: color.label }));
    select.value = String(section.config?.cardColor ?? "default");
    select.addEventListener("change", async () => {
      await this.store.updateSectionConfig(section.id, { cardColor: select.value });
      this.rerender();
    });
  }

  private renderWidthSelect(container: HTMLElement, section: DashboardSectionConfig): void {
    const select = container.createEl("select", { attr: { "aria-label": "修改宽度" } });
    WIDTHS.forEach((width) => select.createEl("option", { value: width.id, text: width.label }));
    select.value = section.width ?? "md";
    select.addEventListener("change", async () => {
      await this.store.updateSection(section.id, { width: select.value as DashboardSectionConfig["width"] });
      this.rerender();
    });
  }

  private renderIconButton(container: HTMLElement, icon: string, label: string, action: () => Promise<void>): void {
    const button = container.createEl("button", { attr: { type: "button", "aria-label": label } });
    setIcon(button, icon);
    button.addEventListener("click", async () => {
      await action();
      this.rerender();
    });
  }

  private rerender(): void {
    if (this.host) this.render(this.host);
  }

  private getSectionDescription(section: DashboardSectionConfig): string {
    const definition = AVAILABLE_MODULES.find((module) => module.type === section.type);
    return String(section.config?.description ?? definition?.description ?? section.type);
  }
}

class CustomSectionModal extends Modal {
  private title = "";
  private description = "";
  private type: CustomSectionInput["type"] = "custom-text";
  private color = "default";

  constructor(
    app: App,
    private readonly page: DashboardPage,
    private readonly onSubmit: (input: CustomSectionInput) => Promise<void>
  ) {
    super(app);
  }

  onOpen(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: "创建自定义功能分区" });
    this.contentEl.createEl("p", { text: `将添加到 ${PAGE_LABELS[this.page]} 页面。` });

    new Setting(this.contentEl)
      .setName("标题")
      .addText((text) => text.onChange((value) => {
        this.title = value.trim();
      }));

    new Setting(this.contentEl)
      .setName("描述")
      .addTextArea((text) => text.onChange((value) => {
        this.description = value.trim();
      }));

    new Setting(this.contentEl)
      .setName("类型")
      .addDropdown((dropdown) => {
        [
          ["custom-text", "文本"],
          ["custom-todo-list", "Todo List"],
          ["custom-link-list", "链接列表"],
          ["custom-memo", "Memo"]
        ].forEach(([value, label]) => dropdown.addOption(value, label));
        dropdown.setValue(this.type);
        dropdown.onChange((value) => {
          this.type = value as CustomSectionInput["type"];
        });
      });

    new Setting(this.contentEl)
      .setName("颜色")
      .addDropdown((dropdown) => {
        CARD_COLORS.forEach((color) => dropdown.addOption(color.id, color.label));
        dropdown.setValue(this.color);
        dropdown.onChange((value) => {
          this.color = value;
        });
      });

    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    const save = actions.createEl("button", { text: "创建", cls: "mod-cta", attr: { type: "button" } });
    save.addEventListener("click", async () => {
      if (!this.title) return;
      await this.onSubmit({
        id: `custom-${Date.now()}`,
        page: this.page,
        title: this.title,
        description: this.description,
        type: this.type,
        color: this.color
      });
      this.close();
    });
  }
}

export class BannerBackgroundSettingsSection {
  constructor(
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const banner = this.store.getData().banner;
    const choices = container.createDiv({ cls: "cow-layout-picker" });
    [
      ["pink-paper", "推荐壁纸"],
      ["cream-stars", "奶油星星"],
      ["soft-hearts", "爱心背景"]
    ].forEach(([id, label]) => {
      const button = choices.createEl("button", { cls: banner.background === id ? "is-active" : "", attr: { type: "button" } });
      button.createEl("strong", { text: label });
      button.addEventListener("click", async () => {
        await this.store.updateBanner({ background: id, imageDataUrl: undefined });
        this.onDataChanged();
      });
    });
    const file = container.createEl("input", { type: "file", attr: { accept: "image/*" } });
    file.addEventListener("change", () => {
      const selected = file.files?.[0];
      if (!selected) return;
      const reader = new FileReader();
      reader.onload = async () => {
        await this.store.updateBanner({ background: "local-image", imageDataUrl: String(reader.result) });
        this.onDataChanged();
      };
      reader.readAsDataURL(selected);
    });
    renderField(container, "背景位置", banner.backgroundPosition, async (value) => {
      await this.store.updateBanner({ backgroundPosition: value });
      this.onDataChanged();
    });
    renderField(container, "透明度", String(banner.opacity), async (value) => {
      await this.store.updateBanner({ opacity: Number(value) || 1 });
      this.onDataChanged();
    }, "number");
    const row = container.createDiv({ cls: "cow-setting-row" });
    row.createSpan({ text: "Overlay" });
    renderSwitch(row, banner.overlay, async (checked) => {
      await this.store.updateBanner({ overlay: checked });
      this.onDataChanged();
    });
  }
}

export class CalendarWidgetSettingsSection {
  constructor(
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const settings = this.store.getData().calendarSettings;
    [
      ["显示笔记标记", "showNoteMarkers"],
      ["显示任务标记", "showTaskMarkers"],
      ["显示事件标记", "showEventMarkers"]
    ].forEach(([label, key]) => {
      const row = container.createDiv({ cls: "cow-setting-row" });
      row.createSpan({ text: label });
      renderSwitch(row, Boolean(settings[key as keyof typeof settings]), async (checked) => {
        await this.store.updateCalendarSettings({ [key]: checked });
        this.onDataChanged();
      });
    });
    const week = container.createDiv({ cls: "cow-setting-row" });
    week.createSpan({ text: "一周起始日" });
    const select = week.createEl("select");
    select.createEl("option", { value: "monday", text: "周一" });
    select.createEl("option", { value: "sunday", text: "周日" });
    select.value = settings.weekStartsOn;
    select.addEventListener("change", async () => {
      await this.store.updateCalendarSettings({ weekStartsOn: select.value as "monday" | "sunday" });
      this.onDataChanged();
    });
    renderField(container, "日期高亮颜色", settings.highlightColor, async (value) => {
      await this.store.updateCalendarSettings({ highlightColor: value });
      this.onDataChanged();
    }, "color");
  }
}

export class ApexHabitSettingsSection {
  private draggingHabitId?: string;

  constructor(
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const settings = this.store.getData().apexHabitSettings;
    [
      ["首页显示", "showOnOverview"],
      ["连续打卡", "showStreak"],
      ["本周完成进度", "showWeeklyProgress"]
    ].forEach(([label, key]) => {
      const row = container.createDiv({ cls: "cow-setting-row" });
      row.createSpan({ text: label });
      renderSwitch(row, Boolean(settings[key as keyof typeof settings]), async (checked) => {
        await this.store.updateApexHabitSettings({ [key]: checked });
        this.onDataChanged();
      });
    });
    const input = container.createEl("input", { type: "text", attr: { placeholder: "新增打卡项目" } });
    input.addEventListener("keydown", async (event) => {
      if (event.key !== "Enter" || !input.value.trim()) return;
      await this.store.addCustomHabit(input.value.trim());
      this.onDataChanged();
    });
    const list = container.createDiv({ cls: "cow-module-sort-list" });
    settings.customHabits.sort((a, b) => a.order - b.order).forEach((habit) => {
      const row = list.createDiv({ cls: "cow-module-row", attr: { draggable: "true", "data-id": habit.id } });
      const handle = row.createSpan({ cls: "cow-drag-handle" });
      setIcon(handle, "grip-vertical");
      const edit = row.createEl("input", { type: "text", value: habit.label });
      edit.addEventListener("change", async () => {
        await this.store.updateCustomHabit(habit.id, { label: edit.value.trim() || habit.label });
        this.onDataChanged();
      });
      renderSwitch(row, habit.enabled, async (checked) => {
        await this.store.updateCustomHabit(habit.id, { enabled: checked });
        this.onDataChanged();
      });
      const del = row.createEl("button", { text: "删除", attr: { type: "button" } });
      del.addEventListener("click", async () => {
        await this.store.deleteCustomHabit(habit.id);
        this.onDataChanged();
      });

      row.addEventListener("dragstart", () => {
        this.draggingHabitId = habit.id;
        row.addClass("is-dragging");
      });
      row.addEventListener("dragend", () => {
        this.draggingHabitId = undefined;
        row.removeClass("is-dragging");
      });
      row.addEventListener("dragover", (event) => {
        event.preventDefault();
        if (!this.draggingHabitId || this.draggingHabitId === habit.id) return;
        const draggingEl = list.querySelector(`[data-id="${this.draggingHabitId}"]`);
        if (draggingEl) list.insertBefore(draggingEl, row);
      });
      row.addEventListener("drop", async () => {
        const ids = Array.from(list.querySelectorAll<HTMLElement>(".cow-module-row")).map((item) => item.dataset.id ?? "");
        await this.store.reorderCustomHabits(ids);
        this.onDataChanged();
      });
    });
  }
}

export class QuickActionSettingsSection {
  constructor(
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const list = container.createDiv({ cls: "cow-module-sort-list" });
    this.store.getData().quickActions.sort((a, b) => a.order - b.order).forEach((action) => {
      const row = list.createDiv({ cls: "cow-module-row" });
      row.createSpan({ text: action.label });
      row.createSpan({ cls: "cow-module-page", text: action.type });
      renderSwitch(row, action.enabled, async (checked) => {
        await this.store.updateQuickAction(action.id, { enabled: checked });
        this.onDataChanged();
      });
    });
    const label = container.createEl("input", { type: "text", attr: { placeholder: "自定义入口名称" } });
    const target = container.createEl("input", { type: "text", attr: { placeholder: "目标路径或命令备注" } });
    const add = container.createEl("button", { cls: "cow-small-action", text: "添加自定义入口", attr: { type: "button" } });
    add.addEventListener("click", async () => {
      if (!label.value.trim()) return;
      await this.store.addQuickAction(label.value.trim(), target.value.trim());
      this.onDataChanged();
    });
  }
}

export class ThemeColorSettingsSection {
  constructor(
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const theme = this.store.getData().theme;
    [
      ["主色", "cutePrimary", "color"],
      ["辅助色", "cuteSecondary", "color"],
      ["文字", "cuteText", "color"],
      ["背景", "cuteBg", "color"],
      ["卡片透明度", "cardOpacity", "number"],
      ["圆角", "cuteRadius", "number"],
      ["背景纹理强度", "textureStrength", "number"],
      ["字体大小", "fontSize", "number"]
    ].forEach(([label, key, type]) => {
      renderField(container, label, String(theme[key as keyof typeof theme]), async (value) => {
        const numericKeys = ["cardOpacity", "cuteRadius", "textureStrength", "fontSize"];
        await this.store.updateTheme({ [key]: numericKeys.includes(key) ? Number(value) : value });
        this.onDataChanged();
      }, type);
    });
  }
}

export class DataSourceStatusSection {
  render(container: HTMLElement): void {
    const sources = [
      ["笔记", true],
      ["任务", false],
      ["日历", true],
      ["习惯", true],
      ["阅读", true],
      ["科研", true]
    ] as const;
    const list = container.createDiv({ cls: "cow-data-list" });
    sources.forEach(([label, enabled]) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: label });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ cls: enabled ? "cow-status is-green" : "cow-status is-yellow", text: enabled ? "已启用" : "待接入" });
    });
  }
}

export function downloadJson(filename: string, content: string): void {
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function readJsonFile(file: File, onRead: (data: unknown) => void): void {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      onRead(JSON.parse(String(reader.result)));
    } catch {
      new Notice("导入失败：JSON 格式不正确。");
    }
  };
  reader.readAsText(file);
}
