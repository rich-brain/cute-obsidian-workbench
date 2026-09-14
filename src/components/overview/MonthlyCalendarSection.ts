import { App, Notice, setIcon } from "obsidian";
import { formatDateKey, type DashboardStore } from "../../core/DashboardStore";

export class MonthlyCalendarSection {
  private displayDate = new Date();

  constructor(
    private readonly app: App,
    private readonly store: DashboardStore
  ) {}

  render(container: HTMLElement): void {
    this.draw(container);
  }

  private draw(container: HTMLElement): void {
    container.empty();
    const root = container.createDiv({ cls: "cow-month-calendar" });
    const header = root.createDiv({ cls: "cow-month-calendar-header" });
    const previous = header.createEl("button", { attr: { type: "button", "aria-label": "上一月" } });
    setIcon(previous, "chevron-left");
    previous.addEventListener("click", () => {
      this.displayDate = new Date(this.displayDate.getFullYear(), this.displayDate.getMonth() - 1, 1);
      this.draw(container);
    });

    header.createEl("strong", { text: `${this.displayDate.getFullYear()}年${this.displayDate.getMonth() + 1}月` });

    const today = header.createEl("button", { cls: "cow-calendar-today", text: "今天", attr: { type: "button" } });
    today.addEventListener("click", () => {
      this.displayDate = new Date();
      this.draw(container);
    });

    const next = header.createEl("button", { attr: { type: "button", "aria-label": "下一月" } });
    setIcon(next, "chevron-right");
    next.addEventListener("click", () => {
      this.displayDate = new Date(this.displayDate.getFullYear(), this.displayDate.getMonth() + 1, 1);
      this.draw(container);
    });

    const grid = root.createDiv({ cls: "cow-month-calendar-grid" });
    const settings = this.store.getData().calendarSettings;
    const weekdays = settings.weekStartsOn === "monday" ? ["一", "二", "三", "四", "五", "六", "日"] : ["日", "一", "二", "三", "四", "五", "六"];
    weekdays.forEach((weekday) => grid.createSpan({ cls: "cow-weekday", text: weekday }));

    const firstDay = new Date(this.displayDate.getFullYear(), this.displayDate.getMonth(), 1);
    const offset = settings.weekStartsOn === "monday" ? (firstDay.getDay() + 6) % 7 : firstDay.getDay();
    const daysInMonth = new Date(this.displayDate.getFullYear(), this.displayDate.getMonth() + 1, 0).getDate();
    const todayKey = formatDateKey(new Date());
    const markdownDates = new Set(
      this.app.vault.getMarkdownFiles().map((file) => formatDateKey(new Date(file.stat.ctime)))
    );

    for (let index = 0; index < offset; index += 1) {
      grid.createSpan({ cls: "cow-calendar-empty" });
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = new Date(this.displayDate.getFullYear(), this.displayDate.getMonth(), day);
      const dateKey = formatDateKey(date);
      const button = grid.createEl("button", {
        cls: `cow-calendar-day ${dateKey === todayKey ? "is-today" : ""}`,
        attr: { type: "button", "aria-label": dateKey }
      });
      if (dateKey === todayKey) {
        button.style.borderColor = settings.highlightColor;
        button.style.background = `${settings.highlightColor}44`;
      }
      button.createSpan({ text: String(day) });
      const dots = button.createDiv({ cls: "cow-calendar-dots" });
      if (settings.showNoteMarkers && markdownDates.has(dateKey)) dots.createSpan({ cls: "is-note" });
      if (settings.showTaskMarkers && day % 5 === 0) dots.createSpan({ cls: "is-task" });
      if (settings.showEventMarkers && day % 9 === 0) dots.createSpan({ cls: "is-event" });
      button.addEventListener("click", () => new Notice(`已选择 ${dateKey}`));
    }
  }
}
