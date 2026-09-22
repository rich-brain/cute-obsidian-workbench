import { App, Modal, Notice } from "obsidian";
import { formatDateKey, type DashboardStore } from "../../core/DashboardStore";
import type { RecurrenceFrequency, Task, TaskPriority, TaskProject, TaskSettings, TaskSourceModule, TaskStatus } from "../../types/dashboard";
import { applyResizableModal } from "../ResizableModal";
import { MarkdownFilePicker, openVaultMarkdown } from "../research/MarkdownFilePicker";

const STATUS_OPTIONS: Array<[TaskStatus, string]> = [
  ["inbox", "收集箱"],
  ["todo", "待办"],
  ["doing", "进行中"],
  ["waiting", "等待"],
  ["done", "已完成"],
  ["cancelled", "已取消"]
];

const PRIORITY_OPTIONS: Array<[TaskPriority, string]> = [
  ["none", "无"],
  ["low", "低"],
  ["medium", "中"],
  ["high", "高"]
];

const SOURCE_OPTIONS: Array<[TaskSourceModule, string]> = [
  ["general", "通用"],
  ["research", "科研"],
  ["reading", "阅读"],
  ["fitness", "健身"],
  ["finance", "理财"],
  ["goal", "目标管理"]
];

const RECURRENCE_OPTIONS: Array<[RecurrenceFrequency, string]> = [
  ["none", "不重复"],
  ["daily", "每天"],
  ["weekly", "每周"],
  ["monthly", "每月"],
  ["custom", "自定义周期"]
];

function nowIso(): string {
  return new Date().toISOString();
}

function today(): string {
  return formatDateKey(new Date());
}

function setupTaskModal(modal: Modal, className = "cute-task-edit-modal"): void {
  applyResizableModal(modal, {
    className,
    width: "min(920px, 92vw)",
    height: "min(760px, 86vh)",
    maxWidth: "96vw",
    maxHeight: "92vh",
    minWidth: "min(420px, 92vw)",
    minHeight: "min(360px, 86vh)"
  });
}

function createField(container: HTMLElement, label: string, type: string, value: string): HTMLInputElement {
  const row = container.createDiv({ cls: `cow-task-form-row ${type === "date" ? "is-picker" : ""}` });
  row.createEl("label", { text: label });
  const input = row.createEl("input", { attr: { type, value } });
  if (type === "date") {
    row.addEventListener("click", (event) => {
      if (event.target instanceof HTMLInputElement && event.target !== input) return;
      input.focus();
      try {
        (input as HTMLInputElement & { showPicker?: () => void }).showPicker?.();
      } catch {
        input.focus();
      }
    });
  }
  return input;
}

function createSelect<T extends string>(container: HTMLElement, label: string, options: Array<[T, string]>, value: T | ""): HTMLSelectElement {
  const row = container.createDiv({ cls: "cow-task-form-row" });
  row.createEl("label", { text: label });
  const select = row.createEl("select");
  options.forEach(([id, text]) => select.createEl("option", { value: id, text }));
  select.value = value;
  return select;
}

function createTextarea(container: HTMLElement, label: string, value: string): HTMLTextAreaElement {
  const row = container.createDiv({ cls: "cow-task-form-row" });
  row.createEl("label", { text: label });
  return row.createEl("textarea", { text: value });
}

export function statusLabel(status: TaskStatus): string {
  return STATUS_OPTIONS.find(([id]) => id === status)?.[1] ?? status;
}

export function priorityLabel(priority: TaskPriority): string {
  return PRIORITY_OPTIONS.find(([id]) => id === priority)?.[1] ?? priority;
}

export function recurrenceLabel(frequency?: RecurrenceFrequency): string {
  return RECURRENCE_OPTIONS.find(([id]) => id === (frequency ?? "none"))?.[1] ?? "不重复";
}

export function taskTimeLabel(task: Task): string {
  return task.estimatedMinutes ? `${task.estimatedMinutes}min` : "--";
}

export function openTaskModal(app: App, store: DashboardStore, onDone: () => void, task?: Task, defaults: Partial<Task> = {}): void {
  new TaskEditModal(app, store, onDone, task, defaults).open();
}

class TaskEditModal extends Modal {
  private linkedNote = "";
  private pendingChildren: string[] = [];

  constructor(
    app: App,
    private readonly store: DashboardStore,
    private readonly onDone: () => void,
    private readonly task?: Task,
    private readonly defaults: Partial<Task> = {}
  ) {
    super(app);
    this.linkedNote = task?.linkedNote ?? defaults.linkedNote ?? "";
  }

  onOpen(): void {
    setupTaskModal(this);
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-task-modal");
    this.contentEl.createEl("h2", { text: this.task ? "编辑任务" : "新建任务" });

    const grid = this.contentEl.createDiv({ cls: "cow-task-form-grid" });
    const basic = grid.createDiv({ cls: "cow-task-form-section" });
    basic.createEl("h3", { text: "基本信息" });
    const title = createField(basic, "任务名称 *", "text", this.task?.title ?? this.defaults.title ?? "");
    const description = createTextarea(basic, "任务描述", this.task?.description ?? this.defaults.description ?? "");

    const state = grid.createDiv({ cls: "cow-task-form-section" });
    state.createEl("h3", { text: "状态与优先级" });
    const status = createSelect(state, "状态", STATUS_OPTIONS, this.task?.status ?? this.defaults.status ?? "inbox");
    const priority = createSelect(state, "优先级", PRIORITY_OPTIONS, this.task?.priority ?? this.defaults.priority ?? "none");

    const time = grid.createDiv({ cls: "cow-task-form-section" });
    time.createEl("h3", { text: "时间" });
    const plannedDate = createField(time, "计划日期", "date", this.task?.plannedDate ?? this.defaults.plannedDate ?? "");
    const dueDate = createField(time, "截止日期", "date", this.task?.dueDate ?? this.defaults.dueDate ?? "");
    const estimatedMinutes = createField(time, "预计时长（分钟）", "number", String(this.task?.estimatedMinutes ?? this.defaults.estimatedMinutes ?? ""));

    const belong = grid.createDiv({ cls: "cow-task-form-section" });
    belong.createEl("h3", { text: "归属" });
    const project = belong.createDiv({ cls: "cow-task-form-row" });
    project.createEl("label", { text: "所属项目" });
    const projectSelect = project.createEl("select");
    projectSelect.createEl("option", { value: "", text: "不关联" });
    this.store.getTaskProjects().forEach((item) => projectSelect.createEl("option", { value: item.id, text: item.name }));
    projectSelect.value = this.task?.projectId ?? this.defaults.projectId ?? "";
    const source = createSelect(belong, "来源模块", SOURCE_OPTIONS, this.task?.sourceModule ?? this.defaults.sourceModule ?? "general");
    const tags = createField(belong, "标签（用逗号分隔）", "text", (this.task?.tags ?? this.defaults.tags ?? []).join(", "));

    const relate = grid.createDiv({ cls: "cow-task-form-section" });
    relate.createEl("h3", { text: "关联" });
    const parent = relate.createDiv({ cls: "cow-task-form-row" });
    parent.createEl("label", { text: "父任务" });
    const parentSelect = parent.createEl("select");
    parentSelect.createEl("option", { value: "", text: "无" });
    this.store.getTasks()
      .filter((item) => item.id !== this.task?.id && !item.parentTaskId)
      .forEach((item) => parentSelect.createEl("option", { value: item.id, text: item.title }));
    parentSelect.value = this.task?.parentTaskId ?? this.defaults.parentTaskId ?? "";
    new MarkdownFilePicker(this.app, {
      label: "关联 Obsidian 笔记",
      value: this.linkedNote,
      onChange: (path) => this.linkedNote = path
    }).render(relate);

    const recurrence = grid.createDiv({ cls: "cow-task-form-section" });
    recurrence.createEl("h3", { text: "周期" });
    const recurrenceSelect = createSelect(recurrence, "重复", RECURRENCE_OPTIONS, this.task?.recurrence?.frequency ?? this.defaults.recurrence?.frequency ?? "none");
    const interval = createField(recurrence, "自定义间隔（天）", "number", String(this.task?.recurrence?.interval ?? this.defaults.recurrence?.interval ?? 1));

    this.renderChildren(grid);

    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "保存任务", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      const name = title.value.trim();
      if (!name) {
        new Notice("任务名称不能为空。");
        return;
      }
      const nextStatus = status.value as TaskStatus;
      const recurrenceFrequency = recurrenceSelect.value as RecurrenceFrequency;
      const values: Task = {
        id: this.task?.id ?? `task-${Date.now()}`,
        title: name,
        description: description.value.trim(),
        status: nextStatus,
        priority: priority.value as TaskPriority,
        sourceModule: source.value as TaskSourceModule,
        projectId: projectSelect.value || undefined,
        parentTaskId: parentSelect.value || undefined,
        tags: tags.value.split(/[,，]/).map((tag) => tag.trim()).filter(Boolean),
        plannedDate: plannedDate.value || undefined,
        dueDate: dueDate.value || undefined,
        completedDate: nextStatus === "done" ? this.task?.completedDate ?? today() : undefined,
        estimatedMinutes: Number(estimatedMinutes.value) > 0 ? Number(estimatedMinutes.value) : undefined,
        actualMinutes: this.task?.actualMinutes,
        recurrence: recurrenceFrequency === "none" ? { frequency: "none", enabled: false } : {
          frequency: recurrenceFrequency,
          interval: Math.max(1, Number(interval.value) || 1),
          enabled: true,
          nextDate: plannedDate.value || dueDate.value || today(),
          lastGeneratedDate: this.task?.recurrence?.lastGeneratedDate
        },
        linkedNote: this.linkedNote || undefined,
        createdAt: this.task?.createdAt ?? nowIso(),
        updatedAt: nowIso()
      };
      if (this.task) await this.store.updateTask(this.task.id, values);
      else await this.store.addTask(values);
      for (const childTitle of this.pendingChildren) {
        await this.store.addTask({
          title: childTitle,
          status: "todo",
          priority: "none",
          parentTaskId: values.id,
          sourceModule: values.sourceModule,
          projectId: values.projectId,
          plannedDate: values.plannedDate
        });
      }
      this.onDone();
      this.close();
    });
  }

  private renderChildren(container: HTMLElement): void {
    const section = container.createDiv({ cls: "cow-task-form-section" });
    section.createEl("h3", { text: "子任务" });
    const list = section.createDiv({ cls: "cow-task-subtask-list" });
    if (this.task) {
      this.store.getTasks().filter((item) => item.parentTaskId === this.task?.id).forEach((child) => {
        const row = list.createDiv({ cls: "cow-task-subtask-row" });
        const checkbox = row.createEl("input", { attr: { type: "checkbox" } });
        checkbox.checked = child.status === "done";
        checkbox.addEventListener("change", async () => {
          await this.store.updateTask(child.id, { status: checkbox.checked ? "done" : "todo" });
          this.onDone();
        });
        row.createSpan({ text: child.title });
      });
    }
    this.pendingChildren.forEach((title) => list.createDiv({ cls: "cow-task-subtask-row" }).createSpan({ text: title }));
    const addRow = section.createDiv({ cls: "cow-task-inline-add" });
    const input = addRow.createEl("input", { attr: { type: "text", placeholder: "添加子任务…" } });
    addRow.createEl("button", { text: "添加", attr: { type: "button" } }).addEventListener("click", () => {
      const value = input.value.trim();
      if (!value) return;
      this.pendingChildren.push(value);
      this.onOpen();
    });
  }
}

export function openTaskProjectModal(app: App, store: DashboardStore, onDone: () => void, project?: TaskProject): void {
  new TaskProjectModal(app, store, onDone, project).open();
}

class TaskProjectModal extends Modal {
  constructor(app: App, private readonly store: DashboardStore, private readonly onDone: () => void, private readonly project?: TaskProject) {
    super(app);
  }

  onOpen(): void {
    setupTaskModal(this, "cute-task-small-modal");
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-task-modal");
    this.contentEl.createEl("h2", { text: this.project ? "编辑项目" : "新建项目" });
    const name = createField(this.contentEl, "项目名称", "text", this.project?.name ?? "");
    const description = createTextarea(this.contentEl, "项目描述", this.project?.description ?? "");
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      const values = { id: this.project?.id ?? `task-project-${Date.now()}`, name: name.value.trim() || "未命名项目", description: description.value.trim(), createdAt: this.project?.createdAt ?? nowIso() };
      if (this.project) await this.store.updateTaskProject(this.project.id, values);
      else await this.store.addTaskProject(values);
      this.onDone();
      this.close();
    });
  }
}

export function openTaskFilterModal(app: App, store: DashboardStore, onDone: () => void): void {
  new TaskFilterModal(app, store, onDone).open();
}

class TaskFilterModal extends Modal {
  constructor(app: App, private readonly store: DashboardStore, private readonly onDone: () => void) {
    super(app);
  }

  onOpen(): void {
    setupTaskModal(this, "cute-task-small-modal");
    const settings = this.store.getTaskSettings();
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-task-modal");
    this.contentEl.createEl("h2", { text: "筛选任务" });
    const form = this.contentEl.createDiv({ cls: "cow-task-form-grid" });
    const status = createSelect(form, "状态", [["all", "全部"], ...STATUS_OPTIONS] as Array<[TaskStatus | "all", string]>, settings.filterStatus ?? "all");
    const priority = createSelect(form, "优先级", [["all", "全部"], ...PRIORITY_OPTIONS] as Array<[TaskPriority | "all", string]>, settings.filterPriority ?? "all");
    const projectRow = form.createDiv({ cls: "cow-task-form-row" });
    projectRow.createEl("label", { text: "项目" });
    const project = projectRow.createEl("select");
    project.createEl("option", { value: "", text: "全部项目" });
    this.store.getTaskProjects().forEach((item) => project.createEl("option", { value: item.id, text: item.name }));
    project.value = settings.filterProjectId ?? "";
    const start = createField(form, "开始日期", "date", settings.filterStartDate ?? "");
    const end = createField(form, "结束日期", "date", settings.filterEndDate ?? "");
    const tag = createField(form, "标签", "text", settings.filterTag ?? "");
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "重置", attr: { type: "button" } }).addEventListener("click", async () => {
      await this.store.updateTaskSettings({ filterStatus: "all", filterPriority: "all", filterProjectId: "", filterStartDate: "", filterEndDate: "", filterTag: "" });
      this.onDone();
      this.close();
    });
    actions.createEl("button", { text: "应用", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      await this.store.updateTaskSettings({
        filterStatus: status.value as TaskSettings["filterStatus"],
        filterPriority: priority.value as TaskSettings["filterPriority"],
        filterProjectId: project.value,
        filterStartDate: start.value,
        filterEndDate: end.value,
        filterTag: tag.value.trim()
      });
      this.onDone();
      this.close();
    });
  }
}

export class TaskStatisticsModal extends Modal {
  private period: "week" | "month" = "week";

  constructor(app: App, private readonly store: DashboardStore) {
    super(app);
  }

  onOpen(): void {
    setupTaskModal(this, "cute-task-stats-modal");
    this.render();
  }

  private render(): void {
    const tasks = this.store.getTasks();
    const now = new Date();
    const start = new Date(now);
    start.setDate(now.getDate() - (this.period === "week" ? 6 : 29));
    const startKey = formatDateKey(start);
    const todayKey = today();
    const scoped = tasks.filter((task) => (task.plannedDate ?? task.completedDate ?? task.createdAt.slice(0, 10)) >= startKey);
    const done = scoped.filter((task) => task.status === "done").length;
    const overdue = tasks.filter((task) => task.dueDate && task.dueDate < todayKey && task.status !== "done").length;
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-task-modal", "cow-task-stats-modal");
    this.contentEl.createEl("h2", { text: "任务统计" });
    const filters = this.contentEl.createDiv({ cls: "cow-focus-filter-row" });
    [["week", "本周"], ["month", "本月"]].forEach(([id, label]) => {
      filters.createEl("button", { cls: this.period === id ? "is-active" : "", text: label, attr: { type: "button" } }).addEventListener("click", () => {
        this.period = id as "week" | "month";
        this.render();
      });
    });
    const cards = this.contentEl.createDiv({ cls: "cow-stats-card-grid" });
    [
      ["完成率", `${scoped.length ? Math.round((done / scoped.length) * 100) : 0}%`],
      ["延期任务", overdue],
      ["完成数量", done],
      ["预计时间", `${scoped.reduce((sum, task) => sum + (task.estimatedMinutes ?? 0), 0)}min`]
    ].forEach(([label, value]) => {
      const card = cards.createDiv({ cls: "cow-stats-card" });
      card.createEl("strong", { text: String(value) });
      card.createSpan({ text: String(label) });
    });
    const chart = this.contentEl.createDiv({ cls: "cow-task-mini-chart" });
    for (let offset = 6; offset >= 0; offset -= 1) {
      const date = new Date();
      date.setDate(date.getDate() - offset);
      const key = formatDateKey(date);
      const count = tasks.filter((task) => task.completedDate === key).length;
      const bar = chart.createDiv({ cls: "cow-task-mini-bar" });
      bar.createDiv({ attr: { style: `height: ${Math.max(8, count * 18)}px` } });
      bar.createSpan({ text: `${date.getMonth() + 1}/${date.getDate()}` });
    }
  }
}

export function openLinkedTaskNote(app: App, task: Task): void {
  void openVaultMarkdown(app, task.linkedNote);
}
