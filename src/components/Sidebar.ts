import { App, setIcon } from "obsidian";
import type { DashboardPage } from "../types/dashboard";
import { PAGE_LABELS } from "../core/PageLabels";
import { CalendarService } from "../services/CalendarService";
import type { WorkbenchData } from "../types/dashboard";
import { renderWorkbenchAvatar } from "./AvatarPickerModal";

interface SidebarAction {
  label: string;
  icon: string;
  onClick: () => void;
}

export class Sidebar {
  private clockEl?: HTMLElement;
  private dateEl?: HTMLElement;
  private timeEl?: HTMLElement;
  private pageLabelEl?: HTMLElement;
  private calendarEl?: HTMLElement;
  private timer?: number;
  private currentDateKey = "";
  private readonly calendar = new CalendarService();
  private visibleMonth = new Date();
  private selectedDate = new Date();

  constructor(
    private readonly app: App,
    private readonly currentPage: DashboardPage,
    private readonly actions: SidebarAction[],
    private readonly onQuickCreate: () => void,
    private readonly onOpenDay: (date: Date) => void,
    private readonly getData: () => WorkbenchData,
    private readonly onCustomizeAvatar: () => void
  ) {}

  render(container: HTMLElement): void {
    const sidebar = container.createDiv({ cls: "cow-sidebar" });
    const quickCreate = sidebar.createEl("button", {
      cls: "cow-sidebar-create-button",
      attr: { type: "button", "aria-label": "快速创建" }
    });
    setIcon(quickCreate, "plus");
    quickCreate.addEventListener("click", this.onQuickCreate);

    const profile = sidebar.createDiv({ cls: "cow-profile" });
    const avatarButton = profile.createEl("button", {
      cls: "cow-profile-avatar-button",
      attr: { type: "button", "aria-label": "修改左侧头像" }
    });
    renderWorkbenchAvatar(avatarButton, this.getData().banner.sidebarAvatar, "cow-profile-avatar");
    avatarButton.addEventListener("click", this.onCustomizeAvatar);
    profile.createEl("h2", { text: "我的工作台" });
    profile.createEl("p", { text: "记录、思考、成长、可爱向前" });

    this.clockEl = sidebar.createDiv({ cls: "cow-clock" });
    this.dateEl = this.clockEl.createEl("p");
    this.timeEl = this.clockEl.createEl("strong");
    this.pageLabelEl = this.clockEl.createEl("span");
    this.updateClock();
    this.timer = window.setInterval(() => this.updateClock(), 30_000);

    this.renderMiniCalendar(sidebar);
    this.renderActions(sidebar);
  }

  destroy(): void {
    if (this.timer) {
      window.clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  private renderMiniCalendar(container: HTMLElement): void {
    this.calendarEl = container.createDiv({ cls: "cow-mini-calendar" });
    this.renderMiniCalendarContent();
  }

  private renderMiniCalendarContent(): void {
    if (!this.calendarEl) return;
    this.calendarEl.empty();

    const header = this.calendarEl.createDiv({ cls: "cow-mini-calendar-header" });
    const prev = header.createEl("button", { attr: { type: "button", "aria-label": "上一月" } });
    setIcon(prev, "chevron-left");
    prev.addEventListener("click", () => {
      this.visibleMonth = this.calendar.addMonths(this.visibleMonth, -1);
      this.renderMiniCalendarContent();
    });

    header.createEl("h3", { text: this.calendar.getMonthTitle(this.visibleMonth) });

    const next = header.createEl("button", { attr: { type: "button", "aria-label": "下一月" } });
    setIcon(next, "chevron-right");
    next.addEventListener("click", () => {
      this.visibleMonth = this.calendar.addMonths(this.visibleMonth, 1);
      this.renderMiniCalendarContent();
    });

    const todayButton = this.calendarEl.createEl("button", {
      cls: "cow-mini-calendar-today",
      text: "今天",
      attr: { type: "button" }
    });
    todayButton.addEventListener("click", () => {
      const today = new Date();
      this.visibleMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      this.selectedDate = today;
      this.renderMiniCalendarContent();
      this.onOpenDay(today);
    });

    const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
    const grid = this.calendarEl.createDiv({ cls: "cow-mini-calendar-grid" });
    weekdays.forEach((weekday) => grid.createSpan({ cls: "cow-weekday", text: weekday }));

    this.calendar.getMonthCells(this.visibleMonth).forEach((date) => {
      if (!date) {
        grid.createSpan({ cls: "cow-empty-day" });
        return;
      }

      const today = new Date();
      const button = grid.createEl("button", {
        cls: `cow-day ${this.calendar.isSameDate(date, today) ? "is-today" : ""} ${this.calendar.isSameDate(date, this.selectedDate) ? "is-selected" : ""}`,
        text: String(date.getDate()),
        attr: { type: "button", "aria-label": this.calendar.getDateKey(date) }
      });
      button.addEventListener("click", () => {
        this.selectedDate = date;
        this.renderMiniCalendarContent();
        this.onOpenDay(date);
      });
    });
  }

  private renderActions(container: HTMLElement): void {
    const actions = container.createDiv({ cls: "cow-sidebar-actions" });
    this.actions.forEach((action) => {
      const button = actions.createEl("button", {
        cls: "cow-sidebar-action",
        attr: { type: "button" }
      });
      setIcon(button.createSpan(), action.icon);
      button.createSpan({ text: action.label });
      button.addEventListener("click", action.onClick);
    });

    const fileHint = actions.createDiv({ cls: "cow-file-shortcut" });
    setIcon(fileHint.createSpan(), "folder-open");
    fileHint.createSpan({ text: `文件库：${this.app.vault.getName()}` });
  }

  private updateClock(): void {
    if (!this.dateEl || !this.timeEl || !this.pageLabelEl) {
      return;
    }

    const now = new Date();
    const dateText = now.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short"
    });
    const timeText = now.toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit"
    });

    this.dateEl.setText(dateText);
    this.timeEl.setText(timeText);
    this.pageLabelEl.setText(PAGE_LABELS[this.currentPage]);
    const dateKey = this.calendar.getDateKey(now);
    if (this.currentDateKey && this.currentDateKey !== dateKey) {
      this.renderMiniCalendarContent();
    }
    this.currentDateKey = dateKey;
  }
}
