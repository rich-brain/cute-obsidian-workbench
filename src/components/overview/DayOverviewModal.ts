import { App, Modal, setIcon, Setting, TFile } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { CalendarService } from "../../services/CalendarService";
import { HolidayService } from "../../services/HolidayService";
import { NoteService } from "../../services/NoteService";
import type { CalendarNoteGroup } from "../../services/NoteService";
import type { CalendarTodo } from "../../types/dashboard";

export class DayOverviewModal extends Modal {
  private readonly calendar = new CalendarService();
  private readonly holidays = new HolidayService();
  private readonly notes: NoteService;

  constructor(
    app: App,
    private readonly store: DashboardStore,
    private readonly date: Date,
    private readonly onDataChanged: () => void
  ) {
    super(app);
    this.notes = new NoteService(app);
  }

  onOpen(): void {
    this.render();
  }

  private render(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");

    const dateKey = this.calendar.getDateKey(this.date);
    const holidays = this.holidays.getHolidays(this.date);
    this.contentEl.createEl("h2", { text: dateKey });
    this.contentEl.createEl("p", {
      text: `${this.calendar.getWeekdayLabel(this.date)}${holidays.length > 0 ? ` · ${holidays.map((holiday) => holiday.name).join(" / ")}` : " · 暂无节日"}`
    });

    this.renderTodos(dateKey);
    this.renderNotes();
  }

  private renderTodos(dateKey: string): void {
    const header = this.contentEl.createDiv({ cls: "cow-day-section-header" });
    header.createEl("h3", { text: "待办" });
    const addButton = header.createEl("button", { attr: { type: "button" } });
    setIcon(addButton.createSpan(), "plus");
    addButton.createSpan({ text: "添加待办" });
    addButton.addEventListener("click", () => {
      new CalendarTodoModal(this.app, async (title, category) => {
        await this.store.addCalendarTodo(title, dateKey, category);
        this.onDataChanged();
        this.render();
      }).open();
    });

    const list = this.contentEl.createDiv({ cls: "cow-calendar-todo-list" });
    const todos = this.store.getCalendarTodos(dateKey);
    if (todos.length === 0) {
      list.createEl("p", { cls: "cow-empty-state", text: "这一天还没有待办。" });
      return;
    }

    todos.forEach((todo) => this.renderTodoItem(list, todo));
  }

  private renderTodoItem(container: HTMLElement, todo: CalendarTodo): void {
    const row = container.createDiv({ cls: `cow-calendar-todo-item ${todo.completed ? "is-complete" : ""}` });
    const checkbox = row.createEl("input", { attr: { type: "checkbox" } });
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", async () => {
      await this.store.toggleCalendarTodo(todo.id);
      this.onDataChanged();
      this.render();
    });

    const text = row.createDiv();
    text.createEl("strong", { text: todo.title });
    text.createSpan({ text: todo.category });

    const edit = row.createEl("button", { attr: { type: "button", "aria-label": "编辑待办" } });
    setIcon(edit, "pencil");
    edit.addEventListener("click", () => {
      new CalendarTodoModal(this.app, async (title, category) => {
        await this.store.updateCalendarTodo(todo.id, { title, category });
        this.onDataChanged();
        this.render();
      }, todo).open();
    });

    const remove = row.createEl("button", { attr: { type: "button", "aria-label": "删除待办" } });
    setIcon(remove, "trash-2");
    remove.addEventListener("click", async () => {
      await this.store.deleteCalendarTodo(todo.id);
      this.onDataChanged();
      this.render();
    });
  }

  private renderNotes(): void {
    this.contentEl.createEl("h3", { text: "笔记" });
    const groups = this.notes.getNotesForDate(this.date);
    const list = this.contentEl.createDiv({ cls: "cow-day-note-list" });

    this.renderDailyNote(list, groups);
    this.renderNoteGroup(list, "当天创建的笔记", groups.created);
    this.renderNoteGroup(list, "当天修改的笔记", groups.modified);
    this.renderNoteGroup(list, "明确关联该日期的笔记", groups.linked);
  }

  private renderDailyNote(container: HTMLElement, groups: CalendarNoteGroup): void {
    const section = container.createDiv({ cls: "cow-day-note-group" });
    section.createEl("h4", { text: "Daily Note" });
    if (groups.dailyNote) {
      this.renderNoteButton(section, groups.dailyNote);
      return;
    }

    const button = section.createEl("button", { cls: "cow-day-note-item", attr: { type: "button" } });
    button.createEl("strong", { text: "创建每日笔记" });
    button.createSpan({ text: this.notes.getDailyNotePath(this.date) });
    button.addEventListener("click", async () => {
      await this.notes.openOrCreateDailyNote(this.date);
      this.close();
    });
  }

  private renderNoteGroup(container: HTMLElement, title: string, files: TFile[]): void {
    const section = container.createDiv({ cls: "cow-day-note-group" });
    section.createEl("h4", { text: title });
    if (files.length === 0) {
      section.createEl("p", { cls: "cow-empty-state", text: "暂无笔记。" });
      return;
    }

    files.forEach((file) => this.renderNoteButton(section, file));
  }

  private renderNoteButton(container: HTMLElement, file: TFile): void {
    const button = container.createEl("button", { cls: "cow-day-note-item", attr: { type: "button" } });
    button.createEl("strong", { text: file.basename });
    button.createSpan({ text: file.path });
    button.createEl("time", { text: new Date(file.stat.mtime).toLocaleString("zh-CN") });
    button.addEventListener("click", async () => {
      await this.app.workspace.getLeaf(false).openFile(file);
      this.close();
    });
  }
}

class CalendarTodoModal extends Modal {
  private titleValue: string;
  private categoryValue: string;

  constructor(
    app: App,
    private readonly onSubmit: (title: string, category: string) => Promise<void>,
    todo?: CalendarTodo
  ) {
    super(app);
    this.titleValue = todo?.title ?? "";
    this.categoryValue = todo?.category ?? "待办";
  }

  onOpen(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: this.titleValue ? "编辑待办" : "添加待办" });

    new Setting(this.contentEl)
      .setName("标题")
      .addText((text) => text.setValue(this.titleValue).onChange((value) => {
        this.titleValue = value;
      }));

    new Setting(this.contentEl)
      .setName("分类")
      .addText((text) => text.setValue(this.categoryValue).onChange((value) => {
        this.categoryValue = value;
      }));

    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    const save = actions.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } });
    save.addEventListener("click", async () => {
      const title = this.titleValue.trim();
      if (!title) return;
      await this.onSubmit(title, this.categoryValue.trim() || "待办");
      this.close();
    });
  }
}
