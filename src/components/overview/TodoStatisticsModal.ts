import { App, Modal, setIcon, Setting } from "obsidian";
import { formatDateKey, type DashboardStore } from "../../core/DashboardStore";
import { CalendarService } from "../../services/CalendarService";
import type { TodayFocusTask } from "../../types/dashboard";

const CATEGORIES: TodayFocusTask["category"][] = ["科研", "阅读", "健身", "理财", "个人"];

export class TodoStatisticsModal extends Modal {
  private readonly calendar = new CalendarService();
  private date: Date;

  constructor(
    app: App,
    private readonly store: DashboardStore,
    date: Date,
    private readonly onDataChanged: () => void
  ) {
    super(app);
    this.date = date;
  }

  onOpen(): void {
    this.render();
  }

  private render(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-todo-stat-modal");
    const dateKey = this.calendar.getDateKey(this.date);
    const tasks = this.store.getTodayFocusTasksForDate(dateKey);
    const done = tasks.filter((task) => task.completed).length;
    const rate = tasks.length === 0 ? 0 : Math.round((done / tasks.length) * 100);

    const header = this.contentEl.createDiv({ cls: "cow-stats-modal-header" });
    const prev = header.createEl("button", { attr: { type: "button", "aria-label": "上一天" } });
    setIcon(prev, "chevron-left");
    prev.addEventListener("click", () => {
      this.date.setDate(this.date.getDate() - 1);
      this.render();
    });
    header.createEl("h2", { text: dateKey });
    const next = header.createEl("button", { attr: { type: "button", "aria-label": "下一天" } });
    setIcon(next, "chevron-right");
    next.addEventListener("click", () => {
      this.date.setDate(this.date.getDate() + 1);
      this.render();
    });

    const summary = this.contentEl.createDiv({ cls: "cow-stats-card-grid" });
    [["总任务", tasks.length], ["已完成", done], ["未完成", tasks.length - done], ["完成率", `${rate}%`]].forEach(([label, value]) => {
      const card = summary.createDiv({ cls: "cow-stats-card" });
      card.createEl("strong", { text: String(value) });
      card.createSpan({ text: String(label) });
    });

    const add = this.contentEl.createEl("button", { cls: "cow-small-action", attr: { type: "button" } });
    setIcon(add.createSpan(), "plus");
    add.createSpan({ text: "新增待办" });
    add.addEventListener("click", () => {
      new TodayFocusTaskModal(this.app, dateKey, async (values) => {
        await this.store.addTodayFocusTask(values.label, values.category, values.date);
        this.onDataChanged();
        this.render();
      }).open();
    });

    const list = this.contentEl.createDiv({ cls: "cow-data-list" });
    if (tasks.length === 0) {
      list.createEl("p", { cls: "cow-empty-state", text: "这一天还没有 Todo。" });
      return;
    }

    tasks.forEach((task) => {
      const row = list.createDiv({ cls: "cow-data-card cow-todo-stat-item" });
      const checkbox = row.createEl("input", { attr: { type: "checkbox" } });
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", async () => {
        await this.store.toggleTodayFocusTask(task.id);
        this.onDataChanged();
        this.render();
      });
      const body = row.createDiv({ cls: "cow-list-item-head" });
      const text = body.createDiv();
      text.createEl("strong", { text: task.label });
      text.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${task.category} · ${task.date ?? dateKey}` });
      const actions = body.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑" } });
      setIcon(edit, "pencil");
      edit.addEventListener("click", () => {
        new TodayFocusTaskModal(this.app, dateKey, async (values) => {
          await this.store.updateTodayFocusTask(task.id, values);
          this.onDataChanged();
          this.render();
        }, task).open();
      });
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除" } });
      setIcon(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteTodayFocusTask(task.id);
        this.onDataChanged();
        this.render();
      });
    });
  }
}

export class TodayFocusTaskModal extends Modal {
  private label: string;
  private category: TodayFocusTask["category"];
  private date: string;

  constructor(
    app: App,
    date: string,
    private readonly onSubmit: (values: Pick<TodayFocusTask, "label" | "category"> & { date: string }) => Promise<void>,
    task?: TodayFocusTask
  ) {
    super(app);
    this.label = task?.label ?? "";
    this.category = task?.category ?? "个人";
    this.date = task?.date ?? date;
  }

  onOpen(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: this.label ? "编辑今日焦点" : "新增今日焦点" });

    new Setting(this.contentEl).setName("标题").addText((text) => text.setValue(this.label).onChange((value) => {
      this.label = value;
    }));
    new Setting(this.contentEl).setName("分类").addDropdown((dropdown) => {
      CATEGORIES.forEach((category) => dropdown.addOption(category, category));
      dropdown.setValue(this.category);
      dropdown.onChange((value) => {
        this.category = value as TodayFocusTask["category"];
      });
    });
    new Setting(this.contentEl).setName("日期").addText((text) => text.setValue(this.date).onChange((value) => {
      this.date = value.trim() || formatDateKey(new Date());
    }));

    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    const save = actions.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } });
    save.addEventListener("click", async () => {
      const label = this.label.trim();
      if (!label) return;
      await this.onSubmit({ label, category: this.category, date: this.date });
      this.close();
    });
  }
}
