import { App, Modal, setIcon } from "obsidian";
import type { DashboardStore } from "../core/DashboardStore";
import { CalendarService } from "../services/CalendarService";
import { HolidayService } from "../services/HolidayService";
import { NoteService } from "../services/NoteService";

export class DayDetailModal extends Modal {
  private readonly calendar = new CalendarService();
  private readonly holidays = new HolidayService();
  private readonly notes: NoteService;

  constructor(
    app: App,
    private readonly store: DashboardStore,
    private readonly date: Date
  ) {
    super(app);
    this.notes = new NoteService(app);
  }

  onOpen(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");

    const dateKey = this.calendar.getDateKey(this.date);
    const holidays = this.holidays.getHolidays(this.date);
    const dailyNote = this.notes.getDailyNote(this.date);
    const isToday = this.calendar.isSameDate(this.date, new Date());

    this.contentEl.createEl("h2", { text: dateKey });
    this.contentEl.createEl("p", {
      text: `${this.calendar.getWeekdayLabel(this.date)}${holidays.length > 0 ? ` · ${holidays.map((holiday) => holiday.name).join(" / ")}` : " · 暂无节日"}`
    });

    this.contentEl.createEl("h3", { text: "当天待办" });
    const taskList = this.contentEl.createEl("ul", { cls: "cow-day-detail-list" });
    const tasks = isToday ? this.store.getTodayFocusTasks() : [];
    if (tasks.length === 0) {
      taskList.createEl("li", { text: "暂无待办。" });
    } else {
      tasks.forEach((task) => {
        taskList.createEl("li", { text: `${task.completed ? "✓" : "○"} ${task.category} · ${task.label}` });
      });
    }

    this.contentEl.createEl("h3", { text: "当天笔记" });
    const noteRow = this.contentEl.createDiv({ cls: "cow-day-note-row" });
    noteRow.createSpan({ text: dailyNote ? dailyNote.path : "还没有每日笔记。" });
    const button = noteRow.createEl("button", { attr: { type: "button" } });
    setIcon(button.createSpan(), dailyNote ? "file-text" : "file-plus");
    button.createSpan({ text: dailyNote ? "打开每日笔记" : "创建每日笔记" });
    button.addEventListener("click", async () => {
      await this.notes.openOrCreateDailyNote(this.date);
      this.close();
    });
  }
}
