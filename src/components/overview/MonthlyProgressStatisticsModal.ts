import { App, Modal, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { CalendarService } from "../../services/CalendarService";
import { StatisticsService } from "../../services/StatisticsService";

export class MonthlyProgressStatisticsModal extends Modal {
  private readonly calendar = new CalendarService();
  private readonly statistics: StatisticsService;
  private month = new Date();

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
    const progress = this.statistics.getMonthProgress(this.month);

    const header = this.contentEl.createDiv({ cls: "cow-stats-modal-header" });
    const previous = header.createEl("button", { attr: { type: "button", "aria-label": "上一月" } });
    setIcon(previous, "chevron-left");
    previous.addEventListener("click", () => {
      this.month = this.calendar.addMonths(this.month, -1);
      this.render();
    });
    header.createEl("h2", { text: `本月进度统计 · ${this.calendar.getMonthTitle(this.month)}` });
    const next = header.createEl("button", { attr: { type: "button", "aria-label": "下一月" } });
    setIcon(next, "chevron-right");
    next.addEventListener("click", () => {
      this.month = this.calendar.addMonths(this.month, 1);
      this.render();
    });

    const table = this.contentEl.createDiv({ cls: "cow-progress-stats-table" });
    const tableHeader = table.createDiv({ cls: "cow-progress-stats-row is-header" });
    ["模块", "本月", "上月", "变化值"].forEach((label) => tableHeader.createSpan({ text: label }));
    progress.forEach((item) => {
      const row = table.createDiv({ cls: "cow-progress-stats-row" });
      row.createSpan({ text: item.label });
      row.createSpan({ text: `${item.current}%` });
      row.createSpan({ text: `${item.previous}%` });
      row.createSpan({ cls: item.change >= 0 ? "is-up" : "is-down", text: `${item.change >= 0 ? "+" : ""}${item.change}%` });
    });

    this.contentEl.createEl("h3", { text: "1～12月全年总览" });
    const yearGrid = this.contentEl.createDiv({ cls: "cow-year-progress-grid" });
    this.statistics.getYearProgress(this.month.getFullYear()).forEach((month) => {
      const card = yearGrid.createDiv({ cls: "cow-year-progress-card" });
      card.createEl("strong", { text: `${month.month}月` });
      const track = card.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: "cow-month-progress-fill is-purple", attr: { style: `width: ${month.average}%` } });
      card.createSpan({ text: `${month.average}%` });
    });
  }
}
