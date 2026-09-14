import { App, setIcon } from "obsidian";
import type { DashboardPage } from "../types/dashboard";

interface SidebarAction {
  label: string;
  icon: string;
  onClick: () => void;
}

export class Sidebar {
  private clockEl?: HTMLElement;
  private timer?: number;

  constructor(
    private readonly app: App,
    private readonly currentPage: DashboardPage,
    private readonly actions: SidebarAction[]
  ) {}

  render(container: HTMLElement): void {
    const sidebar = container.createDiv({ cls: "cow-sidebar" });
    const profile = sidebar.createDiv({ cls: "cow-profile" });
    profile.createDiv({ cls: "cow-profile-avatar" }).createDiv({ cls: "cow-mini-dog" });
    profile.createEl("h2", { text: "我的工作台" });
    profile.createEl("p", { text: "记录、思考、成长、可爱向前" });

    this.clockEl = sidebar.createDiv({ cls: "cow-clock" });
    this.updateClock();
    this.timer = window.setInterval(() => this.updateClock(), 30_000);

    this.renderMiniCalendar(sidebar);
    this.renderActions(sidebar);
  }

  destroy(): void {
    if (this.timer) {
      window.clearInterval(this.timer);
    }
  }

  private renderMiniCalendar(container: HTMLElement): void {
    const calendar = container.createDiv({ cls: "cow-mini-calendar" });
    const now = new Date();
    calendar.createEl("h3", {
      text: `${now.getFullYear()}年${now.getMonth() + 1}月`
    });

    const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
    const grid = calendar.createDiv({ cls: "cow-mini-calendar-grid" });
    weekdays.forEach((weekday) => grid.createSpan({ cls: "cow-weekday", text: weekday }));

    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    for (let index = 0; index < firstDay.getDay(); index += 1) {
      grid.createSpan({ cls: "cow-empty-day" });
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      grid.createSpan({
        cls: `cow-day ${day === now.getDate() ? "is-today" : ""}`,
        text: String(day)
      });
    }
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
    if (!this.clockEl) {
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

    this.clockEl.empty();
    this.clockEl.createEl("p", { text: dateText });
    this.clockEl.createEl("strong", { text: timeText });
    this.clockEl.createEl("span", { text: this.currentPage });
  }
}
