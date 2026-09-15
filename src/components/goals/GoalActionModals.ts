import { App, Modal, Notice, setIcon } from "obsidian";
import { formatDateKey, type DashboardStore } from "../../core/DashboardStore";
import type { Goal, GoalAction, Risk } from "../../types/dashboard";
import { applyResizableModal } from "../ResizableModal";

type Quadrant = "important-urgent" | "important-not-urgent" | "not-important-urgent" | "not-important-not-urgent";

export const GOAL_QUADRANTS: Array<{ id: Quadrant; label: string; importance: GoalAction["importance"]; urgency: GoalAction["urgency"] }> = [
  { id: "important-urgent", label: "重要且紧急", importance: "important", urgency: "urgent" },
  { id: "important-not-urgent", label: "重要不紧急", importance: "important", urgency: "not-urgent" },
  { id: "not-important-urgent", label: "不重要但紧急", importance: "not-important", urgency: "urgent" },
  { id: "not-important-not-urgent", label: "不重要不紧急", importance: "not-important", urgency: "not-urgent" }
];

function today(): string {
  return formatDateKey(new Date());
}

function setupEditModal(modal: Modal): void {
  applyResizableModal(modal, {
    className: "cute-goal-edit-modal",
    width: "min(760px, 90vw)",
    maxWidth: "94vw",
    maxHeight: "88vh",
    minWidth: "min(420px, 90vw)",
    minHeight: "min(320px, 80vh)"
  });
}

function setupStatsModal(modal: Modal): void {
  applyResizableModal(modal, {
    className: "cute-goal-stats-modal",
    width: "min(1050px, 92vw)",
    height: "min(720px, 86vh)",
    maxWidth: "96vw",
    maxHeight: "92vh",
    minWidth: "min(620px, 92vw)",
    minHeight: "min(420px, 86vh)"
  });
}

function createInput(container: HTMLElement, label: string, type: string, value: string): HTMLInputElement {
  const row = container.createDiv({ cls: `cow-goal-form-row ${type === "date" ? "is-picker" : ""}` });
  row.createEl("label", { text: label });
  const input = row.createEl("input", { attr: { type, value } });
  if (type === "date") {
    row.addEventListener("click", () => {
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

function createTextarea(container: HTMLElement, label: string, value: string): HTMLTextAreaElement {
  const row = container.createDiv({ cls: "cow-goal-form-row" });
  row.createEl("label", { text: label });
  return row.createEl("textarea", { text: value });
}

function createSelect(container: HTMLElement, label: string, value: string, options: Array<{ value: string; label: string }>): HTMLSelectElement {
  const row = container.createDiv({ cls: "cow-goal-form-row" });
  row.createEl("label", { text: label });
  const select = row.createEl("select");
  options.forEach((option) => select.createEl("option", { value: option.value, text: option.label }));
  select.value = value;
  return select;
}

function getQuadrant(action: GoalAction): Quadrant | "" {
  const match = GOAL_QUADRANTS.find((quadrant) => quadrant.importance === action.importance && quadrant.urgency === action.urgency);
  return match?.id ?? "";
}

function applyQuadrant(action: Partial<GoalAction>, quadrantId: string): void {
  const quadrant = GOAL_QUADRANTS.find((item) => item.id === quadrantId);
  action.importance = quadrant?.importance;
  action.urgency = quadrant?.urgency;
}

export function openGoalActionModal(app: App, store: DashboardStore, onDone: () => void, action?: GoalAction, preset?: Partial<GoalAction>): void {
  new GoalActionModal(app, store, onDone, action, preset).open();
}

class GoalActionModal extends Modal {
  constructor(
    app: App,
    private readonly store: DashboardStore,
    private readonly onDone: () => void,
    private readonly action?: GoalAction,
    private readonly preset: Partial<GoalAction> = {}
  ) {
    super(app);
  }

  onOpen(): void {
    setupEditModal(this);
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-goal-modal");
    this.contentEl.createEl("h2", { text: this.action ? "编辑目标任务" : "新增目标任务" });
    const goals = this.store.getGoals();
    if (goals.length === 0) {
      this.contentEl.createEl("p", { cls: "cow-empty-state", text: "请先创建年度目标。" });
      return;
    }
    const goalId = createSelect(this.contentEl, "所属目标", this.action?.goalId ?? this.preset.goalId ?? goals[0].id, goals.map((goal) => ({ value: goal.id, label: goal.title })));
    const parentOptions = [{ value: "", label: "无父级" }, ...this.store.getGoalActions().filter((item) => item.id !== this.action?.id).map((item) => ({ value: item.id, label: item.title }))];
    const parentId = createSelect(this.contentEl, "父级拆解节点", this.action?.parentId ?? this.preset.parentId ?? "", parentOptions);
    const title = createInput(this.contentEl, "标题", "text", this.action?.title ?? this.preset.title ?? "");
    const description = createTextarea(this.contentEl, "描述", this.action?.description ?? this.preset.description ?? "");
    const progress = createInput(this.contentEl, "进度", "number", String(this.action?.progress ?? this.preset.progress ?? 0));
    progress.min = "0";
    progress.max = "100";
    const status = createSelect(this.contentEl, "状态", this.action?.status ?? this.preset.status ?? "todo", [
      { value: "todo", label: "未开始" },
      { value: "in-progress", label: "进行中" },
      { value: "completed", label: "已完成" },
      { value: "overdue", label: "已逾期" }
    ]);
    const startDate = createInput(this.contentEl, "开始日期", "date", this.action?.startDate ?? this.preset.startDate ?? today());
    const deadline = createInput(this.contentEl, "截止日期", "date", this.action?.deadline ?? this.preset.deadline ?? today());
    const milestoneRow = this.contentEl.createDiv({ cls: "cow-goal-form-row is-inline" });
    const isMilestone = milestoneRow.createEl("input", { attr: { type: "checkbox" } });
    isMilestone.checked = this.action?.isMilestone ?? this.preset.isMilestone ?? false;
    milestoneRow.createEl("label", { text: "设为里程碑" });
    const milestoneDate = createInput(this.contentEl, "里程碑日期", "date", this.action?.milestoneDate ?? this.preset.milestoneDate ?? deadline.value);
    const quadrant = createSelect(this.contentEl, "优先级象限", getQuadrant(this.action ?? this.preset as GoalAction), [{ value: "", label: "暂不进入矩阵" }, ...GOAL_QUADRANTS.map((item) => ({ value: item.id, label: item.label }))]);
    const note = createTextarea(this.contentEl, "备注", this.action?.note ?? this.preset.note ?? "");

    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      if (!title.value.trim()) {
        new Notice("请输入任务标题。");
        return;
      }
      const values: GoalAction = {
        id: this.action?.id ?? `goal-action-${Date.now()}`,
        goalId: goalId.value,
        parentId: parentId.value || undefined,
        title: title.value.trim(),
        description: description.value.trim(),
        status: status.value as GoalAction["status"],
        startDate: startDate.value || undefined,
        deadline: deadline.value || undefined,
        completedDate: status.value === "completed" ? this.action?.completedDate ?? today() : undefined,
        progress: Math.max(0, Math.min(100, Number(progress.value) || 0)),
        isMilestone: isMilestone.checked,
        milestoneDate: isMilestone.checked ? milestoneDate.value || deadline.value || today() : undefined,
        note: note.value.trim(),
        collapsed: this.action?.collapsed ?? false,
        createdAt: this.action?.createdAt ?? Date.now(),
        updatedAt: Date.now()
      };
      applyQuadrant(values, quadrant.value);
      if (this.action) await this.store.updateGoalAction(this.action.id, values);
      else await this.store.addGoalAction(values);
      this.onDone();
      this.close();
    });
  }
}

export function openAnnualGoalModal(app: App, store: DashboardStore, onDone: () => void, goal?: Goal): void {
  new AnnualGoalModal(app, store, onDone, goal).open();
}

class AnnualGoalModal extends Modal {
  constructor(app: App, private readonly store: DashboardStore, private readonly onDone: () => void, private readonly goal?: Goal) {
    super(app);
  }

  onOpen(): void {
    setupEditModal(this);
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-goal-modal");
    this.contentEl.createEl("h2", { text: this.goal ? "编辑年度目标" : "新增年度目标" });
    const title = createInput(this.contentEl, "标题", "text", this.goal?.title ?? "");
    const description = createTextarea(this.contentEl, "描述", this.goal?.description ?? "");
    const category = createInput(this.contentEl, "分类", "text", this.goal?.category ?? "个人");
    const progress = createInput(this.contentEl, "进度", "number", String(this.goal?.progress ?? 0));
    const startDate = createInput(this.contentEl, "开始日期", "date", this.goal?.startDate ?? today());
    const deadline = createInput(this.contentEl, "截止日期", "date", this.goal?.deadline ?? today());
    const status = createSelect(this.contentEl, "状态", this.goal?.status ?? "进行中", ["未开始", "进行中", "已完成", "暂停"].map((item) => ({ value: item, label: item })));
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      const values: Goal = {
        id: this.goal?.id ?? `goal-${Date.now()}`,
        title: title.value.trim() || "年度目标",
        description: description.value.trim(),
        category: category.value.trim() || "个人",
        progress: Math.max(0, Math.min(100, Number(progress.value) || 0)),
        startDate: startDate.value,
        deadline: deadline.value,
        status: status.value as Goal["status"],
        completedDate: status.value === "已完成" ? this.goal?.completedDate ?? today() : undefined,
        updatedAt: Date.now()
      };
      if (this.goal) await this.store.updateGoal(this.goal.id, values);
      else await this.store.addGoal(values);
      this.onDone();
      this.close();
    });
  }
}

export function openRiskModal(app: App, store: DashboardStore, onDone: () => void, risk?: Risk): void {
  new GoalRiskModal(app, store, onDone, risk).open();
}

class GoalRiskModal extends Modal {
  constructor(app: App, private readonly store: DashboardStore, private readonly onDone: () => void, private readonly risk?: Risk) {
    super(app);
  }

  onOpen(): void {
    setupEditModal(this);
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-goal-modal");
    this.contentEl.createEl("h2", { text: this.risk ? "编辑风险" : "新增风险" });
    const title = createInput(this.contentEl, "名称", "text", this.risk?.title ?? "");
    const goalOptions = [{ value: "", label: "不关联目标" }, ...this.store.getGoals().map((goal) => ({ value: goal.id, label: goal.title }))];
    const goalId = createSelect(this.contentEl, "关联目标", this.risk?.goalId ?? "", goalOptions);
    const level = createSelect(this.contentEl, "严重程度", this.risk?.level ?? "medium", [{ value: "high", label: "高" }, { value: "medium", label: "中" }, { value: "low", label: "低" }]);
    const status = createSelect(this.contentEl, "状态", this.risk?.status ?? "todo", [{ value: "todo", label: "待处理" }, { value: "in-progress", label: "处理中" }, { value: "resolved", label: "已解决" }]);
    const discoveredDate = createInput(this.contentEl, "发现日期", "date", this.risk?.discoveredDate ?? today());
    const resolvedDate = createInput(this.contentEl, "解决日期", "date", this.risk?.resolvedDate ?? today());
    const solution = createTextarea(this.contentEl, "解决方案 / 备注", this.risk?.solution ?? "");
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      const values: Risk = {
        id: this.risk?.id ?? `risk-${Date.now()}`,
        title: title.value.trim() || "风险",
        goalId: goalId.value || undefined,
        level: level.value as Risk["level"],
        status: status.value as Risk["status"],
        discoveredDate: discoveredDate.value,
        resolvedDate: status.value === "resolved" ? resolvedDate.value : undefined,
        solution: solution.value.trim(),
        note: solution.value.trim()
      };
      if (this.risk) await this.store.updateRisk(this.risk.id, values);
      else await this.store.addRisk(values);
      this.onDone();
      this.close();
    });
  }
}

export class AnnualGoalStatisticsModal extends Modal {
  private year = new Date().getFullYear();
  constructor(app: App, private readonly store: DashboardStore) { super(app); }
  onOpen(): void { setupStatsModal(this); this.render(); }
  private render(): void {
    const goals = this.store.getGoals().filter((goal) => (goal.deadline || "").startsWith(String(this.year)) || (goal.startDate || "").startsWith(String(this.year)));
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-goal-modal", "cow-goal-stats-modal");
    this.renderYearHeader("年度目标统计");
    const completed = goals.filter((goal) => goal.status === "已完成").length;
    const overdue = goals.filter((goal) => goal.status !== "已完成" && goal.deadline < today()).length;
    renderStats(this.contentEl, [["年度目标数", goals.length], ["完成数", completed], ["进行中", goals.filter((goal) => goal.status === "进行中").length], ["逾期", overdue], ["平均完成率", `${goals.length ? Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length) : 0}%`]]);
    this.renderGoalRows(goals);
  }
  private renderYearHeader(title: string): void {
    const header = this.contentEl.createDiv({ cls: "cow-goal-stats-header" });
    header.createEl("button", { text: "<", attr: { type: "button" } }).addEventListener("click", () => { this.year -= 1; this.render(); });
    header.createEl("h2", { text: `${title} · ${this.year}` });
    header.createEl("button", { text: ">", attr: { type: "button" } }).addEventListener("click", () => { this.year += 1; this.render(); });
  }
  private renderGoalRows(goals: Goal[]): void {
    const list = this.contentEl.createDiv({ cls: "cow-data-list" });
    goals.forEach((goal) => {
      const actions = this.store.getGoalActionsForGoal(goal.id);
      const milestones = actions.filter((action) => action.isMilestone);
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: goal.title });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${goal.progress}% · 子任务完成 ${actions.filter((item) => item.status === "completed").length}/${actions.length} · 里程碑完成 ${milestones.filter((item) => item.status === "completed").length}/${milestones.length} · 逾期 ${actions.filter((item) => item.status === "overdue").length}` });
    });
  }
}

export class GoalBreakdownStatisticsModal extends Modal {
  constructor(app: App, private readonly store: DashboardStore) { super(app); }
  onOpen(): void { setupStatsModal(this); this.render(); }
  private render(): void {
    const actions = this.store.getGoalActions();
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-goal-modal", "cow-goal-stats-modal");
    this.contentEl.createEl("h2", { text: "目标拆解统计" });
    renderStats(this.contentEl, [["总任务数", actions.length], ["已完成", actions.filter((item) => item.status === "completed").length], ["进行中", actions.filter((item) => item.status === "in-progress").length], ["逾期", actions.filter((item) => item.status === "overdue").length], ["整体完成率", `${actions.length ? Math.round(actions.reduce((sum, item) => sum + (item.progress ?? 0), 0) / actions.length) : 0}%`]]);
    this.store.getGoals().forEach((goal) => {
      const goalActions = this.store.getGoalActionsForGoal(goal.id);
      const row = this.contentEl.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: goal.title });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `完成率 ${goalActions.length ? Math.round(goalActions.reduce((sum, item) => sum + (item.progress ?? 0), 0) / goalActions.length) : goal.progress}% · 层级任务 ${goalActions.length} · 逾期 ${goalActions.filter((item) => item.status === "overdue").length}` });
    });
  }
}

export class MilestoneStatisticsModal extends Modal {
  constructor(app: App, private readonly store: DashboardStore) { super(app); }
  onOpen(): void { setupStatsModal(this); this.render(); }
  private render(): void {
    const milestones = this.store.getGoalActions().filter((item) => item.isMilestone);
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-goal-modal", "cow-goal-stats-modal");
    this.contentEl.createEl("h2", { text: "里程碑统计" });
    renderStats(this.contentEl, [["里程碑总数", milestones.length], ["已完成", milestones.filter((item) => item.status === "completed").length], ["未完成", milestones.filter((item) => item.status !== "completed").length], ["已逾期", milestones.filter((item) => item.status === "overdue").length], ["按时完成率", `${getOnTimeRate(milestones)}%`]]);
    renderTimeline(this.contentEl, this.store, milestones);
  }
}

export class PriorityStatisticsModal extends Modal {
  constructor(app: App, private readonly store: DashboardStore) { super(app); }
  onOpen(): void { setupStatsModal(this); this.render(); }
  private render(): void {
    const items = this.store.getGoalActions().filter((item) => item.importance && item.urgency);
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-goal-modal", "cow-goal-stats-modal");
    this.contentEl.createEl("h2", { text: "优先级统计" });
    renderStats(this.contentEl, [["当前任务", items.length], ["已完成", items.filter((item) => item.status === "completed").length], ["逾期", items.filter((item) => item.status === "overdue").length], ["完成率", `${items.length ? Math.round((items.filter((item) => item.status === "completed").length / items.length) * 100) : 0}%`]]);
    GOAL_QUADRANTS.forEach((quadrant) => this.contentEl.createDiv({ cls: "cow-data-card" }).createEl("strong", { text: `${quadrant.label}：${items.filter((item) => item.importance === quadrant.importance && item.urgency === quadrant.urgency).length}` }));
  }
}

export class RiskStatisticsModal extends Modal {
  constructor(app: App, private readonly store: DashboardStore) { super(app); }
  onOpen(): void { setupStatsModal(this); this.render(); }
  private render(): void {
    const risks = this.store.getRisks();
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-goal-modal", "cow-goal-stats-modal");
    this.contentEl.createEl("h2", { text: "风险统计" });
    renderStats(this.contentEl, [["总风险", risks.length], ["待处理", risks.filter((item) => (item.status ?? "todo") === "todo").length], ["处理中", risks.filter((item) => item.status === "in-progress").length], ["已解决", risks.filter((item) => item.status === "resolved").length], ["高风险数量", risks.filter((item) => item.level === "high").length]]);
    risks.forEach((risk) => this.contentEl.createDiv({ cls: "cow-data-card" }).createEl("strong", { text: `${risk.title} · ${risk.level} · ${risk.status ?? "todo"}` }));
  }
}

export class SimpleGoalStatisticsModal extends Modal {
  constructor(app: App, private readonly store: DashboardStore, private readonly title: string) { super(app); }
  onOpen(): void { setupStatsModal(this); this.render(); }
  private render(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-goal-modal", "cow-goal-stats-modal");
    this.contentEl.createEl("h2", { text: this.title });
    renderStats(this.contentEl, [
      ["Objective", this.store.getObjectives().length],
      ["KR", this.store.getKeyResults().length],
      ["已完成 KR", this.store.getKeyResults().filter((item) => item.completed).length],
      ["目标打卡项", this.store.getGoalActions().length]
    ]);
  }
}

function renderStats(container: HTMLElement, items: Array<[string, string | number]>): void {
  const grid = container.createDiv({ cls: "cow-stats-card-grid" });
  items.forEach(([label, value]) => {
    const card = grid.createDiv({ cls: "cow-stats-card" });
    card.createEl("strong", { text: String(value) });
    card.createSpan({ text: label });
  });
}

function renderTimeline(container: HTMLElement, store: DashboardStore, milestones: GoalAction[]): void {
  const timeline = container.createDiv({ cls: "cow-goal-timeline" });
  milestones.slice().sort((left, right) => (left.milestoneDate ?? left.deadline ?? "").localeCompare(right.milestoneDate ?? right.deadline ?? "")).forEach((action) => {
    const goal = store.getGoals().find((item) => item.id === action.goalId);
    const item = timeline.createDiv({ cls: `cow-goal-timeline-item is-${action.status}` });
    item.createEl("time", { text: action.milestoneDate ?? action.deadline ?? "--" });
    item.createEl("strong", { text: action.title });
    item.createSpan({ text: `${goal?.title ?? "未关联目标"} · ${statusLabel(action.status)}` });
  });
}

function getOnTimeRate(milestones: GoalAction[]): number {
  const completed = milestones.filter((item) => item.status === "completed");
  if (completed.length === 0) return 0;
  const onTime = completed.filter((item) => !item.completedDate || !item.milestoneDate || item.completedDate <= item.milestoneDate).length;
  return Math.round((onTime / completed.length) * 100);
}

export function statusLabel(status: GoalAction["status"]): string {
  if (status === "completed") return "已完成";
  if (status === "overdue") return "已逾期";
  if (status === "in-progress") return "进行中";
  return "未开始";
}

