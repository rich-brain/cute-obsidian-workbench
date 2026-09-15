import { setIcon } from "obsidian";
import { CalendarService } from "../../services/CalendarService";

export type FitnessCalendarIndicator = "pink" | "green" | "blue" | "purple" | "yellow" | "red";

export interface StatisticsCalendarOptions {
  initialDate?: Date;
  getIndicators: (dateKey: string) => FitnessCalendarIndicator[];
  renderDayDetails: (container: HTMLElement, dateKey: string) => void;
}

export class StatisticsCalendar {
  private readonly calendar = new CalendarService();
  private month: Date;
  private selectedDate: string;

  constructor(private readonly options: StatisticsCalendarOptions) {
    const initial = options.initialDate ?? new Date();
    this.month = new Date(initial.getFullYear(), initial.getMonth(), 1);
    this.selectedDate = this.calendar.getDateKey(initial);
  }

  render(container: HTMLElement): void {
    container.empty();
    const root = container.createDiv({ cls: "cow-fitness-stats-calendar" });
    const calendarPanel = root.createDiv({ cls: "cow-fitness-calendar-panel" });
    const details = root.createDiv({ cls: "cow-fitness-calendar-details" });

    const header = calendarPanel.createDiv({ cls: "cow-fitness-calendar-header" });
    const previous = header.createEl("button", { attr: { type: "button", "aria-label": "上一月" } });
    setIcon(previous, "chevron-left");
    previous.addEventListener("click", () => {
      this.month = this.calendar.addMonths(this.month, -1);
      this.render(container);
    });
    header.createEl("strong", { text: this.calendar.getMonthTitle(this.month) });
    const next = header.createEl("button", { attr: { type: "button", "aria-label": "下一月" } });
    setIcon(next, "chevron-right");
    next.addEventListener("click", () => {
      this.month = this.calendar.addMonths(this.month, 1);
      this.render(container);
    });
    const today = header.createEl("button", { cls: "cow-calendar-today", text: "今天", attr: { type: "button" } });
    today.addEventListener("click", () => {
      const now = new Date();
      this.month = new Date(now.getFullYear(), now.getMonth(), 1);
      this.selectedDate = this.calendar.getDateKey(now);
      this.render(container);
    });

    const grid = calendarPanel.createDiv({ cls: "cow-fitness-calendar-grid" });
    ["一", "二", "三", "四", "五", "六", "日"].forEach((weekday) => grid.createSpan({ cls: "cow-weekday", text: weekday }));
    this.calendar.getMonthCells(this.month, "monday").forEach((date) => {
      if (!date) {
        grid.createSpan({ cls: "cow-calendar-empty" });
        return;
      }
      const dateKey = this.calendar.getDateKey(date);
      const day = grid.createEl("button", {
        cls: `cow-fitness-calendar-day ${dateKey === this.calendar.getDateKey(new Date()) ? "is-today" : ""} ${dateKey === this.selectedDate ? "is-selected" : ""}`,
        attr: { type: "button" }
      });
      day.createSpan({ cls: "cow-calendar-day-number", text: String(date.getDate()) });
      const indicators = this.options.getIndicators(dateKey).slice(0, 4);
      const dots = day.createDiv({ cls: "cow-calendar-dots" });
      indicators.forEach((indicator) => dots.createSpan({ cls: `is-${indicator}` }));
      day.addEventListener("click", () => {
        this.selectedDate = dateKey;
        this.render(container);
      });
    });

    details.createEl("h3", { text: this.selectedDate });
    details.createDiv({ cls: "cow-meta-line" }).createSpan({ text: this.calendar.getWeekdayLabel(new Date(`${this.selectedDate}T00:00:00`)) });
    this.options.renderDayDetails(details, this.selectedDate);
  }
}

