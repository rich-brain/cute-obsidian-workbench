import { App, Notice, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { DASHBOARD_PAGES } from "../../core/DashboardStore";
import type { DashboardPage, DashboardSectionConfig } from "../../types/dashboard";

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
