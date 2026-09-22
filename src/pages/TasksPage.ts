import { App, setIcon } from "obsidian";
import { formatDateKey, type DashboardStore } from "../core/DashboardStore";
import type { DashboardPage, DashboardPageDefinition, Task, TaskStatus } from "../types/dashboard";
import {
  openTaskFilterModal,
  openTaskModal,
  openTaskProjectModal,
  priorityLabel,
  recurrenceLabel,
  TaskStatisticsModal,
  taskTimeLabel
} from "../components/tasks/TaskModals";

const BOARD_COLUMNS: Array<[TaskStatus, string]> = [
  ["todo", "待办"],
  ["doing", "进行中"],
  ["waiting", "等待"],
  ["done", "已完成"]
];

export class TasksPage {
  private weekOffset = 0;

  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly page: DashboardPage,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    void this.store.generateDueRecurringTasks();
    const definition = this.store.getPages().find((item) => item.id === this.page) as DashboardPageDefinition;
    const pageEl = container.createDiv({ cls: "cow-page cow-tasks-page" });
    this.renderHeader(pageEl, definition);
    this.renderQuickAdd(pageEl);
    const topGrid = pageEl.createDiv({ cls: "cow-tasks-top-grid" });
    this.renderTodayTasks(topGrid);
    this.renderInbox(topGrid);
    this.renderStats(topGrid);
    this.renderWeekPlan(pageEl);
    this.renderBoard(pageEl);
    const bottomGrid = pageEl.createDiv({ cls: "cow-tasks-bottom-grid" });
    this.renderProjects(bottomGrid);
    this.renderRecurring(bottomGrid);
  }

  private renderHeader(container: HTMLElement, definition: DashboardPageDefinition): void {
    const heading = container.createDiv({ cls: "cow-page-heading cow-tasks-heading" });
    const title = heading.createDiv();
    title.createEl("h1", { text: definition.label });
    title.createEl("p", { text: definition.description });
    const actions = heading.createDiv({ cls: "cow-config-actions" });
    this.iconButton(actions, "plus", "新建任务", () => openTaskModal(this.app, this.store, this.onDataChanged, undefined, { status: "inbox", sourceModule: "general" }));
    this.iconButton(actions, "filter", "筛选", () => openTaskFilterModal(this.app, this.store, this.onDataChanged));
    this.iconButton(actions, "bar-chart-3", "统计", () => new TaskStatisticsModal(this.app, this.store).open());
  }

  private renderQuickAdd(container: HTMLElement): void {
    const card = container.createDiv({ cls: "cow-task-panel cow-task-quick-add" });
    card.createEl("h2", { text: "快速添加任务" });
    const row = card.createDiv({ cls: "cow-task-quick-row" });
    const input = row.createEl("input", { attr: { type: "text", placeholder: "输入任务内容，按回车快速添加…" } });
    const add = row.createEl("button", { text: "添加", cls: "mod-cta", attr: { type: "button" } });
    const submit = async (): Promise<void> => {
      const title = input.value.trim();
      if (!title) return;
      await this.store.addTask({ title, status: "inbox", priority: "none", sourceModule: "general" });
      input.value = "";
      this.onDataChanged();
    };
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") void submit();
    });
    add.addEventListener("click", () => void submit());
  }

  private renderTodayTasks(container: HTMLElement): void {
    const today = formatDateKey(new Date());
    const tasks = this.filteredTasks().filter((task) => task.plannedDate === today);
    const open = tasks.filter((task) => task.status !== "done" && task.status !== "cancelled");
    const done = tasks.filter((task) => task.status === "done");
    const card = this.panel(container, `今日任务 ${done.length}/${tasks.length}`, "今天暂时没有任务");
    [...open, ...done].slice(0, 10).forEach((task) => this.renderTaskRow(card, task, true));
  }

  private renderInbox(container: HTMLElement): void {
    const tasks = this.filteredTasks().filter((task) => task.status === "inbox" && !task.parentTaskId).slice(0, 6);
    const card = this.panel(container, "任务收集箱", "收集箱已经清空啦");
    tasks.forEach((task) => this.renderTaskRow(card, task, true));
    if (this.store.getTasks().filter((task) => task.status === "inbox").length > 6) {
      card.createEl("button", { cls: "cow-task-link-button", text: "查看全部", attr: { type: "button" } }).addEventListener("click", () => openTaskFilterModal(this.app, this.store, this.onDataChanged));
    }
  }

  private renderStats(container: HTMLElement): void {
    const tasks = this.filteredTasks();
    const weekDates = this.getWeekDates(0).map((date) => formatDateKey(date));
    const weekly = tasks.filter((task) => (task.plannedDate && weekDates.includes(task.plannedDate)) || (task.completedDate && weekDates.includes(task.completedDate)));
    const done = weekly.filter((task) => task.status === "done").length;
    const overdue = tasks.filter((task) => task.dueDate && task.dueDate < formatDateKey(new Date()) && task.status !== "done").length;
    const card = container.createDiv({ cls: "cow-task-panel cow-task-stat-panel" });
    card.createEl("h2", { text: "任务统计" });
    const grid = card.createDiv({ cls: "cow-stats-card-grid" });
    [
      ["本周完成率", `${weekly.length ? Math.round((done / weekly.length) * 100) : 0}%`],
      ["延期任务", overdue],
      ["本周完成", done],
      ["预计时间", `${weekly.reduce((sum, task) => sum + (task.estimatedMinutes ?? 0), 0)}min`]
    ].forEach(([label, value]) => {
      const item = grid.createDiv({ cls: "cow-stats-card" });
      item.createEl("strong", { text: String(value) });
      item.createSpan({ text: String(label) });
    });
  }

  private renderWeekPlan(container: HTMLElement): void {
    const card = container.createDiv({ cls: "cow-task-panel cow-task-week-panel" });
    const header = card.createDiv({ cls: "cow-task-panel-header" });
    header.createEl("h2", { text: "本周计划" });
    const actions = header.createDiv({ cls: "cow-list-item-actions" });
    actions.createEl("button", { text: "上一周", attr: { type: "button" } }).addEventListener("click", () => {
      this.weekOffset -= 1;
      renderWeek();
    });
    actions.createEl("button", { text: "本周", attr: { type: "button" } }).addEventListener("click", () => {
      this.weekOffset = 0;
      renderWeek();
    });
    actions.createEl("button", { text: "下一周", attr: { type: "button" } }).addEventListener("click", () => {
      this.weekOffset += 1;
      renderWeek();
    });
    const scroll = card.createDiv({ cls: "cow-task-week-scroll" });
    const renderWeek = (): void => {
      scroll.empty();
      const grid = scroll.createDiv({ cls: "cow-task-week-grid" });
      const dates = this.getWeekDates(this.weekOffset);
      dates.forEach((date) => {
        const dateKey = formatDateKey(date);
        const day = grid.createDiv({ cls: "cow-task-week-day" });
        day.createEl("strong", { text: `${date.getMonth() + 1}/${date.getDate()}` });
        day.createSpan({ cls: "cow-meta-line", text: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][date.getDay()] });
        const tasks = this.filteredTasks().filter((task) => task.plannedDate === dateKey && !task.parentTaskId);
        if (tasks.length === 0) {
          day.createDiv({ cls: "cow-empty-state", text: "暂无" });
          return;
        }
        tasks.slice(0, 5).forEach((task) => {
          const item = day.createEl("button", { cls: "cow-task-chip", attr: { type: "button", title: task.title } });
          item.createSpan({ text: task.title });
          item.addEventListener("click", () => openTaskModal(this.app, this.store, this.onDataChanged, task));
        });
      });
    };
    renderWeek();
  }

  private renderBoard(container: HTMLElement): void {
    const card = container.createDiv({ cls: "cow-task-panel cow-task-board-panel" });
    card.createEl("h2", { text: "任务看板" });
    const board = card.createDiv({ cls: "cow-task-board" });
    BOARD_COLUMNS.forEach(([status, label]) => {
      const column = board.createDiv({ cls: "cow-task-board-column" });
      column.createEl("h3", { text: label });
      const tasks = this.filteredTasks().filter((task) => task.status === status && !task.parentTaskId).slice(0, 8);
      if (tasks.length === 0) {
        column.createDiv({ cls: "cow-empty-state", text: "暂无任务" });
        return;
      }
      tasks.forEach((task) => this.renderBoardCard(column, task));
    });
  }

  private renderProjects(container: HTMLElement): void {
    const card = this.panel(container, "项目与任务组", "还没有项目");
    const add = card.createEl("button", { cls: "cow-task-add-strip", text: "+ 新建项目", attr: { type: "button" } });
    add.addEventListener("click", () => openTaskProjectModal(this.app, this.store, this.onDataChanged));
    this.store.getTaskProjects().slice(0, 6).forEach((project) => {
      const tasks = this.store.getTasks().filter((task) => task.projectId === project.id);
      const done = tasks.filter((task) => task.status === "done").length;
      const percent = tasks.length ? Math.round((done / tasks.length) * 100) : 0;
      const row = card.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: project.name });
      row.createDiv({ cls: "cow-meta-line", text: project.description || "暂无描述" });
      row.createDiv({ cls: "cow-meta-line", text: `${done} / ${tasks.length} · ${percent}%` });
      row.createDiv({ cls: "cow-month-progress-track" }).createDiv({ cls: "cow-month-progress-fill is-pink", attr: { style: `width: ${percent}%` } });
    });
  }

  private renderRecurring(container: HTMLElement): void {
    const card = this.panel(container, "周期任务", "还没有周期任务");
    this.store.getTasks()
      .filter((task) => task.recurrence?.enabled && task.recurrence.frequency !== "none")
      .slice(0, 6)
      .forEach((task) => {
        const row = card.createDiv({ cls: "cow-data-card" });
        const head = row.createDiv({ cls: "cow-list-item-head" });
        const body = head.createDiv();
        body.createEl("strong", { text: task.title });
        body.createDiv({ cls: "cow-meta-line", text: `${recurrenceLabel(task.recurrence?.frequency)} · 下次 ${task.recurrence?.nextDate ?? task.plannedDate ?? "--"}` });
        const toggle = head.createEl("button", { text: task.recurrence?.enabled ? "停用" : "启用", attr: { type: "button" } });
        toggle.addEventListener("click", async () => {
          await this.store.updateTask(task.id, { recurrence: { ...task.recurrence, frequency: task.recurrence?.frequency ?? "daily", enabled: !task.recurrence?.enabled } });
          this.onDataChanged();
        });
      });
  }

  private renderTaskRow(container: HTMLElement, task: Task, compact = false): void {
    const row = container.createDiv({ cls: `cow-task-row ${task.status === "done" ? "is-done" : ""}` });
    const checkbox = row.createEl("input", { attr: { type: "checkbox" } });
    checkbox.checked = task.status === "done";
    checkbox.addEventListener("change", async () => {
      await this.store.updateTask(task.id, { status: checkbox.checked ? "done" : "todo" });
      this.onDataChanged();
    });
    const body = row.createDiv({ cls: "cow-task-row-body" });
    body.createEl("strong", { text: task.title });
    const meta = body.createDiv({ cls: "cow-task-meta" });
    meta.createSpan({ cls: `cow-task-priority is-${task.priority}`, text: priorityLabel(task.priority) });
    if (task.estimatedMinutes) meta.createSpan({ text: taskTimeLabel(task) });
    if (!compact && task.tags?.length) task.tags.slice(0, 4).forEach((tag) => meta.createSpan({ cls: "cow-pill is-blue", text: tag }));
    const actions = row.createDiv({ cls: "cow-list-item-actions" });
    this.smallIcon(actions, "pencil", "编辑任务", () => openTaskModal(this.app, this.store, this.onDataChanged, task));
    this.smallIcon(actions, "trash-2", "删除任务", () => void this.confirmDeleteTask(task));
  }

  private renderBoardCard(container: HTMLElement, task: Task): void {
    const card = container.createDiv({ cls: `cow-task-board-card is-${task.priority}` });
    card.addEventListener("click", () => openTaskModal(this.app, this.store, this.onDataChanged, task));
    card.createEl("strong", { text: task.title });
    const meta = card.createDiv({ cls: "cow-task-meta" });
    meta.createSpan({ cls: `cow-task-priority is-${task.priority}`, text: priorityLabel(task.priority) });
    meta.createSpan({ text: taskTimeLabel(task) });
    const status = card.createEl("select");
    BOARD_COLUMNS.forEach(([id, label]) => status.createEl("option", { value: id, text: label }));
    status.value = task.status;
    status.addEventListener("click", (event) => event.stopPropagation());
    status.addEventListener("change", async () => {
      await this.store.updateTask(task.id, { status: status.value as TaskStatus });
      this.onDataChanged();
    });
  }

  private panel(container: HTMLElement, title: string, empty: string): HTMLElement {
    const card = container.createDiv({ cls: "cow-task-panel" });
    card.createEl("h2", { text: title });
    const marker = card.createDiv({ cls: "cow-task-empty-marker", text: empty });
    window.requestAnimationFrame(() => {
      if (card.querySelectorAll(".cow-task-row, .cow-data-card, .cow-task-board-card, .cow-task-chip").length > 0) marker.detach();
    });
    return card;
  }

  private filteredTasks(): Task[] {
    const settings = this.store.getTaskSettings();
    return this.store.getTasks().filter((task) => {
      if (settings.filterStatus && settings.filterStatus !== "all" && task.status !== settings.filterStatus) return false;
      if (settings.filterPriority && settings.filterPriority !== "all" && task.priority !== settings.filterPriority) return false;
      if (settings.filterProjectId && task.projectId !== settings.filterProjectId) return false;
      if (settings.filterStartDate && (task.plannedDate ?? task.dueDate ?? "") < settings.filterStartDate) return false;
      if (settings.filterEndDate && (task.plannedDate ?? task.dueDate ?? "") > settings.filterEndDate) return false;
      if (settings.filterTag && !(task.tags ?? []).some((tag) => tag.includes(settings.filterTag ?? ""))) return false;
      return true;
    });
  }

  private getWeekDates(offset: number): Date[] {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((today.getDay() + 6) % 7) + offset * 7);
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);
      return date;
    });
  }

  private async confirmDeleteTask(task: Task): Promise<void> {
    const children = this.store.getTasks().filter((item) => item.parentTaskId === task.id);
    if (children.length > 0) {
      const deleteChildren = confirm(`“${task.title}”包含 ${children.length} 个子任务。\n确定会同时删除子任务；取消则仅删除父任务并保留子任务。`);
      await this.store.deleteTask(task.id, deleteChildren ? "delete-children" : "keep-children");
    } else {
      if (!confirm(`删除“${task.title}”？`)) return;
      await this.store.deleteTask(task.id);
    }
    this.onDataChanged();
  }

  private iconButton(container: HTMLElement, icon: string, label: string, onClick: () => void): void {
    const button = container.createEl("button", { attr: { type: "button" } });
    setIcon(button.createSpan(), icon);
    button.createSpan({ text: label });
    button.addEventListener("click", onClick);
  }

  private smallIcon(container: HTMLElement, icon: string, label: string, onClick: () => void): void {
    const button = container.createEl("button", { attr: { type: "button", "aria-label": label } });
    setIcon(button, icon);
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      onClick();
    });
  }
}
