import { setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";

export class OverviewStatsSection {
  constructor(
    private readonly store: DashboardStore,
    private readonly type: string
  ) {}

  render(container: HTMLElement): void {
    const stat = this.getStat();
    const wrapper = container.createDiv({ cls: "cow-overview-stat" });
    const art = wrapper.createDiv({ cls: `cow-stat-art ${stat.className}` });
    setIcon(art.createSpan(), stat.icon);

    const body = wrapper.createDiv();
    body.createEl("strong", { text: stat.value });
    body.createEl("span", { text: stat.caption });

    const meter = body.createDiv({ cls: "cow-stat-meter" });
    meter.createDiv({ attr: { style: `width: ${stat.meter}%` } });
  }

  private getStat(): { value: string; caption: string; icon: string; meter: number; className: string } {
    if (this.type === "weekly-completion") {
      const rate = this.store.getWeeklyCompletionRate();
      return {
        value: `${rate}%`,
        caption: "再接再厉！",
        icon: "badge-percent",
        meter: rate,
        className: "is-green"
      };
    }

    if (this.type === "pending-tasks") {
      const pending = this.store.getPendingTaskCount();
      const total = this.store.getTodayFocusTasks().length;
      const doneRate = total === 0 ? 100 : Math.round(((total - pending) / total) * 100);
      return {
        value: `${total - pending}/${total}`,
        caption: pending === 0 ? "今日清空啦" : `还有${pending}项待完成`,
        icon: "clipboard-list",
        meter: doneRate,
        className: "is-pink"
      };
    }

    if (this.type === "today-focus-stat") {
      return {
        value: "3.6h",
        caption: "专注让平凡变伟大",
        icon: "headphones",
        meter: 72,
        className: "is-blue"
      };
    }

    return {
      value: `${this.store.getCheckinStreakDays()}天`,
      caption: "真棒！继续保持",
      icon: "flame",
      meter: Math.min(100, this.store.getCheckinStreakDays() * 10),
      className: "is-yellow"
    };
  }
}
