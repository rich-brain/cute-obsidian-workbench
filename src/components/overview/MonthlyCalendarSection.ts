import { App, setIcon } from "obsidian";
import { type DashboardStore } from "../../core/DashboardStore";
import { CalendarService } from "../../services/CalendarService";
import { HolidayService } from "../../services/HolidayService";
import { NoteService } from "../../services/NoteService";
import { DayOverviewModal } from "./DayOverviewModal";

interface CalendarBadge {
  cls: string;
  count: number;
}

export class MonthlyCalendarSection {
  private displayDate = new Date();
  private readonly calendar = new CalendarService();
  private readonly holidays = new HolidayService();
  private readonly notes: NoteService;

  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void = () => undefined
  ) {
    this.notes = new NoteService(app);
  }

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
      this.displayDate = this.calendar.addMonths(this.displayDate, -1);
      this.draw(container);
    });

    header.createEl("strong", { text: this.calendar.getMonthTitle(this.displayDate) });

    const today = header.createEl("button", { cls: "cow-calendar-today", text: "今天", attr: { type: "button" } });
    today.addEventListener("click", () => {
      this.displayDate = new Date();
      this.draw(container);
    });

    const next = header.createEl("button", { attr: { type: "button", "aria-label": "下一月" } });
    setIcon(next, "chevron-right");
    next.addEventListener("click", () => {
      this.displayDate = this.calendar.addMonths(this.displayDate, 1);
      this.draw(container);
    });

    const grid = root.createDiv({ cls: "cow-month-calendar-grid" });
    const settings = this.store.getData().calendarSettings;
    const weekdays = settings.weekStartsOn === "monday" ? ["一", "二", "三", "四", "五", "六", "日"] : ["日", "一", "二", "三", "四", "五", "六"];
    weekdays.forEach((weekday) => grid.createSpan({ cls: "cow-weekday", text: weekday }));

    const todayKey = this.calendar.getDateKey(new Date());
    this.calendar.getMonthCells(this.displayDate, settings.weekStartsOn).forEach((date) => {
      if (!date) {
        grid.createSpan({ cls: "cow-calendar-empty" });
        return;
      }

      const dateKey = this.calendar.getDateKey(date);
      const button = grid.createEl("button", {
        cls: `cow-calendar-day ${dateKey === todayKey ? "is-today" : ""}`,
        attr: { type: "button", "aria-label": dateKey }
      });
      if (dateKey === todayKey) {
        button.style.borderColor = settings.highlightColor;
        button.style.background = `${settings.highlightColor}44`;
      }
      button.createSpan({ cls: "cow-calendar-day-number", text: String(date.getDate()) });
      const holidays = this.holidays.getHolidays(date);
      if (holidays.length > 0) {
        button.createSpan({ cls: "cow-calendar-holiday", text: holidays[0].name });
      } else {
        button.createSpan({ cls: "cow-calendar-holiday is-empty", text: "" });
      }
      const dots = button.createDiv({ cls: "cow-calendar-dots cow-calendar-day-indicators" });
      this.renderBadges(dots, this.getBadges(date));
      button.addEventListener("click", () => {
        new DayOverviewModal(this.app, this.store, date, () => {
          this.onDataChanged();
          this.draw(container);
        }).open();
      });
    });
  }

  private getBadges(date: Date): CalendarBadge[] {
    const settings = this.store.getData().calendarSettings;
    const dateKey = this.calendar.getDateKey(date);
    const todos = this.store.getCalendarTodos(dateKey);
    const badges: CalendarBadge[] = [];

    if (settings.showTaskMarkers) {
      const incomplete = todos.filter((todo) => !todo.completed).length;
      const complete = todos.filter((todo) => todo.completed).length;
      if (incomplete > 0) badges.push({ cls: "is-task", count: incomplete });
      if (complete > 0) badges.push({ cls: "is-task-done", count: complete });
    }

    if (settings.showNoteMarkers) {
      const noteCount = this.notes.getNoteCountForDate(date);
      if (noteCount > 0) badges.push({ cls: "is-note", count: noteCount });
    }

    if (settings.showEventMarkers) {
      const eventCount = this.holidays.getHolidays(date).length;
      if (eventCount > 0) badges.push({ cls: "is-event", count: eventCount });
    }

    return badges;
  }

  private renderBadges(container: HTMLElement, badges: CalendarBadge[]): void {
    const expanded: string[] = [];
    badges.forEach((badge) => {
      for (let index = 0; index < badge.count; index += 1) {
        expanded.push(badge.cls);
      }
    });
    expanded.slice(0, 4).forEach((cls) => container.createSpan({ cls }));
    if (expanded.length > 4) {
      container.createSpan({ cls: "is-more", text: `+${expanded.length - 4}` });
    }
  }
}
