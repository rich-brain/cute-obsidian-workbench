import { App, Modal, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { CalendarService } from "../../services/CalendarService";
import { StatisticsService, type HabitMonthDay } from "../../services/StatisticsService";

export class HabitStatisticsModal extends Modal {
  private readonly calendar = new CalendarService();
  private readonly statistics: StatisticsService;
  private month = new Date();
  private selectedDay?: HabitMonthDay;

  constructor(app: App, store: DashboardStore) {
    super(app);
    this.statistics = new StatisticsService(store);
  }

  onOpen(): void {
    this.render();
  }

  private render(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    const stats = this.statistics.getHabitStats(this.month);
    this.selectedDay = this.selectedDay ?? stats.monthDays.find((day) => day.date === this.calendar.getDateKey(new Date()));

    const header = this.contentEl.createDiv({ cls: "cow-stats-modal-header" });
    const previous = header.createEl("button", { attr: { type: "button", "aria-label": "上一月" } });
    setIcon(previous, "chevron-left");
    previous.addEventListener("click", () => {
      this.month = this.calendar.addMonths(this.month, -1);
      this.selectedDay = undefined;
      this.render();
    });
    header.createEl("h2", { text: `打卡统计 · ${this.calendar.getMonthTitle(this.month)}` });
    const next = header.createEl("button", { attr: { type: "button", "aria-label": "下一月" } });
    setIcon(next, "chevron-right");
    next.addEventListener("click", () => {
      this.month = this.calendar.addMonths(this.month, 1);
      this.selectedDay = undefined;
      this.render();
    });

    const cards = this.contentEl.createDiv({ cls: "cow-stats-card-grid" });
    [
      ["连续打卡", `${stats.currentStreak} 天`],
      ["最长连续", `${stats.longestStreak} 天`],
      ["本月完成率", `${stats.monthCompletionRate}%`],
      ["全年完成率", `${stats.yearCompletionRate}%`]
    ].forEach(([label, value]) => {
      const card = cards.createDiv({ cls: "cow-stats-card" });
      card.createEl("strong", { text: value });
      card.createSpan({ text: label });
    });

    const heatmap = this.contentEl.createDiv({ cls: "cow-habit-stats-heatmap" });
    stats.monthDays.forEach((day) => {
      const level = day.totalCount === 0 ? 0 : Math.ceil((day.completedCount / day.totalCount) * 4);
      const button = heatmap.createEl("button", {
        cls: `level-${level} ${this.selectedDay?.date === day.date ? "is-selected" : ""}`,
        text: day.date.slice(-2),
        attr: { type: "button", "aria-label": day.date }
      });
      button.addEventListener("click", () => {
        this.selectedDay = day;
        this.render();
      });
    });

    const detail = this.contentEl.createDiv({ cls: "cow-habit-day-detail" });
    detail.createEl("h3", { text: this.selectedDay ? `当天完成情况 · ${this.selectedDay.date}` : "当天完成情况" });
    const day = this.selectedDay ?? stats.monthDays[0];
    if (!day) return;
    day.statuses.forEach((status) => {
      const row = detail.createDiv({ cls: "cow-habit-day-row" });
      row.createSpan({ text: status.label });
      row.createSpan({ cls: status.completed ? "is-done" : "", text: status.completed ? "已完成" : "未完成" });
    });
  }
}
