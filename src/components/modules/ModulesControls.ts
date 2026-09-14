import { App, Modal, Notice, setIcon, Setting } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { AVAILABLE_MODULES, DASHBOARD_PAGES } from "../../core/DashboardStore";
import type { CustomSectionInput, DashboardPage, DashboardSectionConfig } from "../../types/dashboard";
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

export class HomeLayoutManagerSection {
  constructor(
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const current = this.store.getData().userSettings.overviewLayout;
    const grid = container.createDiv({ cls: "cow-layout-picker" });
    [
      ["default", "默认布局", "卡片按 12 栏网格展示"],
      ["compact", "紧凑布局", "更多卡片并排，信息更密"],
      ["minimal", "极简布局", "单列阅读，少干扰"]
    ].forEach(([id, title, desc]) => {
      const button = grid.createEl("button", { cls: current === id ? "is-active" : "", attr: { type: "button" } });
      button.createEl("strong", { text: title });
      button.createSpan({ text: desc });
      button.addEventListener("click", async () => {
        await this.store.setOverviewLayout(id as "default" | "compact" | "minimal");
        this.onDataChanged();
      });
    });
  }
}

export class ModuleSwitchSortSection {
  private draggingId?: string;

  constructor(
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    DASHBOARD_PAGES.forEach((pageDefinition) => {
      const page = pageDefinition.id;
      const sections = this.store.getAllSections().filter((section) => section.page === page);
      if (sections.length === 0) return;
      container.createEl("h4", { text: pageDefinition.label });
      const list = container.createDiv({ cls: "cow-module-sort-list", attr: { "data-page": page } });
      sections.forEach((section) => this.renderRow(list, section));
    });
  }

  private renderRow(list: HTMLElement, section: DashboardSectionConfig): void {
    const row = list.createDiv({ cls: "cow-module-row", attr: { draggable: "true", "data-id": section.id } });
    const handle = row.createSpan({ cls: "cow-drag-handle" });
    setIcon(handle, "grip-vertical");
    row.createSpan({ text: section.title });
    row.createSpan({ cls: "cow-module-page", text: section.page });
    renderSwitch(row, section.enabled, async (checked) => {
      await this.store.setSectionEnabled(section.id, checked);
      this.onDataChanged();
    });

    row.addEventListener("dragstart", () => {
      this.draggingId = section.id;
      row.addClass("is-dragging");
    });
    row.addEventListener("dragend", () => {
      row.removeClass("is-dragging");
      this.draggingId = undefined;
    });
    row.addEventListener("dragover", (event) => {
      event.preventDefault();
      const dragging = this.draggingId;
      if (!dragging || dragging === section.id) return;
      const draggingEl = list.querySelector(`[data-id="${dragging}"]`);
      if (draggingEl) list.insertBefore(draggingEl, row);
    });
    row.addEventListener("drop", async () => {
      const ids = Array.from(list.querySelectorAll<HTMLElement>(".cow-module-row")).map((item) => item.dataset.id ?? "");
      await this.store.reorderSections(section.page, ids);
      this.onDataChanged();
    });
  }
}

const MANAGED_PAGES: DashboardPage[] = ["overview", "research", "reading", "fitness", "finance", "goals"];
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

  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {
    const currentPage = this.store.getData().currentPage;
    this.selectedPage = MANAGED_PAGES.includes(currentPage) ? currentPage : "overview";
  }

  render(container: HTMLElement): void {
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
        this.onDataChanged();
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
        this.onDataChanged();
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
        this.onDataChanged();
      });
    }
  }

  private renderColorSelect(container: HTMLElement, section: DashboardSectionConfig): void {
    const select = container.createEl("select", { attr: { "aria-label": "修改颜色" } });
    CARD_COLORS.forEach((color) => select.createEl("option", { value: color.id, text: color.label }));
    select.value = String(section.config?.cardColor ?? "default");
    select.addEventListener("change", async () => {
      await this.store.updateSectionConfig(section.id, { cardColor: select.value });
      this.onDataChanged();
    });
  }

  private renderWidthSelect(container: HTMLElement, section: DashboardSectionConfig): void {
    const select = container.createEl("select", { attr: { "aria-label": "修改宽度" } });
    WIDTHS.forEach((width) => select.createEl("option", { value: width.id, text: width.label }));
    select.value = section.width ?? "md";
    select.addEventListener("change", async () => {
      await this.store.updateSection(section.id, { width: select.value as DashboardSectionConfig["width"] });
      this.onDataChanged();
    });
  }

  private renderIconButton(container: HTMLElement, icon: string, label: string, action: () => Promise<void>): void {
    const button = container.createEl("button", { attr: { type: "button", "aria-label": label } });
    setIcon(button, icon);
    button.addEventListener("click", async () => {
      await action();
      this.onDataChanged();
    });
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
