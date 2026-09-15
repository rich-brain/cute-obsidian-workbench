import { App, Modal, Notice, setIcon } from "obsidian";
import { formatDateKey, type DashboardStore } from "../../core/DashboardStore";
import type { Goal, GoalAction, KeyResult, Objective, Risk } from "../../types/dashboard";
import { applyResizableModal } from "../ResizableModal";
import { renderGoalStatisticsLayout } from "./GoalStatisticsLayout";

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
    width: "min(860px, 92vw)",
    height: "min(680px, 86vh)",
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
    const progressMode = createSelect(this.contentEl, "进度模式", this.action?.progressMode ?? this.preset.progressMode ?? "auto", [
      { value: "auto", label: "自动进度" },
      { value: "manual", label: "手动进度" }
    ]);
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
        progressMode: progressMode.value as GoalAction["progressMode"],
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

export function openQuarterlyGoalModal(app: App, store: DashboardStore, onDone: () => void, objective?: Objective): void {
  new QuarterlyGoalModal(app, store, onDone, objective).open();
}

class QuarterlyGoalModal extends Modal {
  constructor(app: App, private readonly store: DashboardStore, private readonly onDone: () => void, private readonly objective?: Objective) {
    super(app);
  }

  onOpen(): void {
    setupEditModal(this);
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-goal-modal");
    this.contentEl.createEl("h2", { text: this.objective ? "编辑季度目标" : "新增季度目标" });
    const currentYear = new Date().getFullYear();
    const title = createInput(this.contentEl, "标题", "text", this.objective?.title ?? "");
    const year = createSelect(this.contentEl, "年份", String(this.objective?.year ?? currentYear), getYearOptions(this.objective?.year ?? currentYear).map((value) => ({ value: String(value), label: String(value) })));
    const quarterNumber = createSelect(this.contentEl, "季度", String(this.objective?.quarterNumber ?? Math.floor(new Date().getMonth() / 3) + 1), [1, 2, 3, 4].map((value) => ({ value: String(value), label: `Q${value}` })));
    const progress = createInput(this.contentEl, "进度", "number", String(this.objective?.progress ?? 0));
    progress.min = "0";
    progress.max = "100";
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      const selectedYear = Number(year.value);
      const selectedQuarter = Number(quarterNumber.value) as 1 | 2 | 3 | 4;
      const values: Objective = {
        id: this.objective?.id ?? `objective-${Date.now()}`,
        title: title.value.trim() || "季度目标",
        quarter: `${selectedYear} Q${selectedQuarter}`,
        year: selectedYear,
        quarterNumber: selectedQuarter,
        progress: Math.max(0, Math.min(100, Number(progress.value) || 0)),
        completedDate: this.objective?.completedDate,
        updatedAt: Date.now()
      };
      if (this.objective) await this.store.updateObjective(this.objective.id, values);
      else await this.store.addObjective(values);
      this.onDone();
      this.close();
    });
  }
}

export function openMonthlyGoalModal(app: App, store: DashboardStore, onDone: () => void, keyResult?: KeyResult): void {
  new MonthlyGoalModal(app, store, onDone, keyResult).open();
}

class MonthlyGoalModal extends Modal {
  constructor(app: App, private readonly store: DashboardStore, private readonly onDone: () => void, private readonly keyResult?: KeyResult) {
    super(app);
  }

  onOpen(): void {
    setupEditModal(this);
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-goal-modal");
    this.contentEl.createEl("h2", { text: this.keyResult ? "编辑月度目标" : "新增月度目标" });
    const now = new Date();
    const objectives = this.store.getObjectives();
    const objectiveId = createSelect(this.contentEl, "关联季度目标", this.keyResult?.objectiveId ?? objectives[0]?.id ?? "", [{ value: "", label: "暂不关联" }, ...objectives.map((objective) => ({ value: objective.id, label: `${objective.quarter} · ${objective.title}` }))]);
    const title = createInput(this.contentEl, "标题", "text", this.keyResult?.title ?? "");
    const year = createSelect(this.contentEl, "年份", String(this.keyResult?.year ?? now.getFullYear()), getYearOptions(this.keyResult?.year ?? now.getFullYear()).map((value) => ({ value: String(value), label: String(value) })));
    const month = createSelect(this.contentEl, "月份", String(this.keyResult?.month ?? now.getMonth() + 1), Array.from({ length: 12 }, (_, index) => ({ value: String(index + 1), label: `${index + 1}月` })));
    const progress = createInput(this.contentEl, "进度", "number", String(this.keyResult?.progress ?? 0));
    progress.min = "0";
    progress.max = "100";
    const completedRow = this.contentEl.createDiv({ cls: "cow-goal-form-row is-inline" });
    const completed = completedRow.createEl("input", { attr: { type: "checkbox" } });
    completed.checked = this.keyResult?.completed ?? false;
    completedRow.createEl("label", { text: "已完成" });
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      const progressValue = Math.max(0, Math.min(100, Number(progress.value) || 0));
      const values: KeyResult = {
        id: this.keyResult?.id ?? `kr-${Date.now()}`,
        objectiveId: objectiveId.value,
        title: title.value.trim() || "月度目标",
        year: Number(year.value),
        month: Number(month.value),
        progress: completed.checked ? 100 : progressValue,
        completed: completed.checked || progressValue >= 100,
        completedDate: this.keyResult?.completedDate,
        updatedAt: Date.now()
      };
      if (this.keyResult) await this.store.updateKeyResult(this.keyResult.id, values);
      else await this.store.addKeyResult(values);
      this.onDone();
      this.close();
    });
  }
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
    const content = renderGoalStatisticsLayout(this.contentEl, "年度目标统计", [
      {
        label: "上一年",
        onClick: () => {
          this.year -= 1;
          this.render();
        }
      },
      { label: String(this.year), active: true },
      {
        label: "下一年",
        onClick: () => {
          this.year += 1;
          this.render();
        }
      }
    ], (toolbar) => {
      const select = toolbar.createEl("select", { attr: { "aria-label": "选择年份" } });
      getYearOptions(this.year).forEach((year) => select.createEl("option", { value: String(year), text: String(year) }));
      select.value = String(this.year);
      select.addEventListener("change", () => {
        this.year = Number(select.value);
        this.render();
      });
    });
    renderStats(content, getGoalStats(goals));
    renderGoalRows(content, this.store, goals);
  }
}

export class QuarterlyGoalStatisticsModal extends Modal {
  private year = new Date().getFullYear();
  private quarterNumber: 1 | 2 | 3 | 4 = Math.floor(new Date().getMonth() / 3) + 1 as 1 | 2 | 3 | 4;
  constructor(app: App, private readonly store: DashboardStore) { super(app); }
  onOpen(): void { setupStatsModal(this); this.render(); }
  private render(): void {
    const objectives = this.store.getObjectives().filter((objective) => objective.year === this.year && objective.quarterNumber === this.quarterNumber);
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-goal-modal", "cow-goal-stats-modal");
    const content = renderGoalStatisticsLayout(this.contentEl, "季度目标统计", [
      { label: "上一年", onClick: () => { this.year -= 1; this.render(); } },
      { label: String(this.year), active: true },
      { label: "下一年", onClick: () => { this.year += 1; this.render(); } }
    ], (toolbar) => {
      const quarters = toolbar.createDiv({ cls: "cow-goal-period-tabs" });
      [1, 2, 3, 4].forEach((quarter) => {
        const button = quarters.createEl("button", { text: `Q${quarter}`, cls: quarter === this.quarterNumber ? "is-active" : "", attr: { type: "button" } });
        button.addEventListener("click", () => {
          this.quarterNumber = quarter as 1 | 2 | 3 | 4;
          this.render();
        });
      });
    });
    renderStats(content, getObjectiveStats(objectives, this.year, this.quarterNumber));
    renderObjectiveRows(content, objectives);
  }
}

export class MonthlyGoalStatisticsModal extends Modal {
  private year = new Date().getFullYear();
  private month = new Date().getMonth() + 1;
  constructor(app: App, private readonly store: DashboardStore) { super(app); }
  onOpen(): void { setupStatsModal(this); this.render(); }
  private render(): void {
    const keyResults = this.store.getKeyResults().filter((kr) => kr.year === this.year && kr.month === this.month);
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-goal-modal", "cow-goal-stats-modal");
    const content = renderGoalStatisticsLayout(this.contentEl, "月度目标统计", [
      { label: "上一年", onClick: () => { this.year -= 1; this.render(); } },
      { label: String(this.year), active: true },
      { label: "下一年", onClick: () => { this.year += 1; this.render(); } }
    ], (toolbar) => {
      const months = toolbar.createDiv({ cls: "cow-goal-period-tabs is-months" });
      for (let month = 1; month <= 12; month += 1) {
        const button = months.createEl("button", { text: `${month}月`, cls: month === this.month ? "is-active" : "", attr: { type: "button" } });
        button.addEventListener("click", () => {
          this.month = month;
          this.render();
        });
      }
    });
    renderStats(content, getKeyResultStats(keyResults, this.year, this.month));
    renderKeyResultRows(content, keyResults);
  }
}

function renderGoalRows(container: HTMLElement, store: DashboardStore, goals: Goal[]): void {
  const list = container.createDiv({ cls: "cow-goal-stats-list" });
    goals.forEach((goal) => {
      const actions = store.getGoalActionsForGoal(goal.id);
      const milestones = actions.filter((action) => action.isMilestone);
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: goal.title });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${goal.progress}% · 子任务完成 ${actions.filter((item) => item.status === "completed").length}/${actions.length} · 里程碑完成 ${milestones.filter((item) => item.status === "completed").length}/${milestones.length} · 逾期 ${actions.filter((item) => item.status === "overdue").length}` });
    });
}

export class GoalBreakdownStatisticsModal extends Modal {
  private year = new Date().getFullYear();
  private month = new Date().getMonth() + 1;
  constructor(app: App, private readonly store: DashboardStore) { super(app); }
  onOpen(): void { setupStatsModal(this); this.render(); }
  private render(): void {
    const actions = this.store.getGoalActions().filter((action) => isActionInPeriod(action, this.year, this.month));
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-goal-modal", "cow-goal-stats-modal");
    const content = renderGoalStatisticsLayout(this.contentEl, "目标拆解统计", [
      { label: "上一年", onClick: () => { this.year -= 1; this.render(); } },
      { label: String(this.year), active: true },
      { label: "下一年", onClick: () => { this.year += 1; this.render(); } }
    ], (toolbar) => {
      const months = toolbar.createDiv({ cls: "cow-goal-period-tabs is-months" });
      [{ value: 0, label: "全部月份" }, ...Array.from({ length: 12 }, (_, index) => ({ value: index + 1, label: `${index + 1}月` }))].forEach((item) => {
        const button = months.createEl("button", { text: item.label, cls: item.value === this.month ? "is-active" : "", attr: { type: "button" } });
        button.addEventListener("click", () => {
          this.month = item.value;
          this.render();
        });
      });
    });
    renderStats(content, [["拆解任务数量", actions.length], ["完成", actions.filter((item) => item.status === "completed").length], ["进行中", actions.filter((item) => item.status === "in-progress").length], ["逾期", actions.filter((item) => item.status === "overdue").length], ["平均进度", `${actions.length ? Math.round(actions.reduce((sum, item) => sum + (item.progress ?? 0), 0) / actions.length) : 0}%`]]);
    const list = content.createDiv({ cls: "cow-goal-stats-list" });
    this.store.getGoals().forEach((goal) => {
      const goalActions = actions.filter((item) => item.goalId === goal.id);
      if (goalActions.length === 0) return;
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: goal.title });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `完成率 ${goalActions.length ? Math.round(goalActions.reduce((sum, item) => sum + (item.progress ?? 0), 0) / goalActions.length) : goal.progress}% · 层级任务 ${goalActions.length} · 逾期 ${goalActions.filter((item) => item.status === "overdue").length}` });
    });
  }
}

export class MilestoneStatisticsModal extends Modal {
  private year = new Date().getFullYear();
  private month = new Date().getMonth() + 1;
  constructor(app: App, private readonly store: DashboardStore) { super(app); }
  onOpen(): void { setupStatsModal(this); this.render(); }
  private render(): void {
    const milestones = this.store.getGoalActions().filter((item) => item.isMilestone && isActionInPeriod(item, this.year, this.month));
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-goal-modal", "cow-goal-stats-modal");
    const content = renderGoalStatisticsLayout(this.contentEl, "里程碑统计", [
      { label: "上一年", onClick: () => { this.year -= 1; this.render(); } },
      { label: String(this.year), active: true },
      { label: "下一年", onClick: () => { this.year += 1; this.render(); } }
    ], (toolbar) => {
      const months = toolbar.createDiv({ cls: "cow-goal-period-tabs is-months" });
      [{ value: 0, label: "全部月份" }, ...Array.from({ length: 12 }, (_, index) => ({ value: index + 1, label: `${index + 1}月` }))].forEach((item) => {
        const button = months.createEl("button", { text: item.label, cls: item.value === this.month ? "is-active" : "", attr: { type: "button" } });
        button.addEventListener("click", () => {
          this.month = item.value;
          this.render();
        });
      });
    });
    renderStats(content, [["里程碑总数", milestones.length], ["完成", milestones.filter((item) => item.status === "completed").length], ["未完成", milestones.filter((item) => item.status !== "completed").length], ["逾期", milestones.filter((item) => item.status === "overdue").length], ["按时完成率", `${getOnTimeRate(milestones)}%`]]);
    renderMilestoneCalendar(content, milestones, this.year, this.month);
    renderTimeline(content, this.store, milestones);
  }
}

export class PriorityStatisticsModal extends Modal {
  private selectedQuadrant: Quadrant = "important-urgent";
  private filter: "current" | "completed" | "all" = "current";
  constructor(app: App, private readonly store: DashboardStore) { super(app); }
  onOpen(): void { setupStatsModal(this); this.render(); }
  private render(): void {
    const items = this.store.getGoalActions().filter((item) => item.importance && item.urgency);
    const todayKey = today();
    const filteredByState = items.filter((item) => {
      if (this.filter === "all") return true;
      if (this.filter === "completed") return item.status === "completed";
      return !item.completedDate || item.completedDate >= todayKey;
    });
    const selectedItems = filteredByState.filter((item) => getQuadrant(item) === this.selectedQuadrant);
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-goal-modal", "cow-goal-stats-modal");
    const content = renderGoalStatisticsLayout(this.contentEl, "优先级统计", [], (toolbar) => {
      const filters = toolbar.createDiv({ cls: "cow-goal-period-tabs" });
      [
        { id: "current", label: "当前" },
        { id: "completed", label: "已完成" },
        { id: "all", label: "全部" }
      ].forEach((option) => {
        const button = filters.createEl("button", { text: option.label, cls: this.filter === option.id ? "is-active" : "", attr: { type: "button" } });
        button.addEventListener("click", () => {
          this.filter = option.id as typeof this.filter;
          this.render();
        });
      });
    });
    const cards = content.createDiv({ cls: "cow-priority-stat-grid" });
    GOAL_QUADRANTS.forEach((quadrant) => {
      const card = cards.createEl("button", { cls: `cow-priority-stat-card ${this.selectedQuadrant === quadrant.id ? "is-active" : ""}`, attr: { type: "button" } });
      card.createEl("strong", { text: String(filteredByState.filter((item) => item.importance === quadrant.importance && item.urgency === quadrant.urgency).length) });
      card.createSpan({ text: quadrant.label });
      card.addEventListener("click", () => {
        this.selectedQuadrant = quadrant.id;
        this.render();
      });
    });
    renderPriorityRows(content, this.store, selectedItems);
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
      ["季度目标", this.store.getObjectives().length],
      ["月度目标", this.store.getKeyResults().length],
      ["已完成月度目标", this.store.getKeyResults().filter((item) => item.completed).length],
      ["目标打卡项", this.store.getGoalActions().length]
    ]);
  }
}

function getYearOptions(centerYear: number): number[] {
  return Array.from({ length: 7 }, (_, index) => centerYear - 3 + index);
}

function getGoalStats(goals: Goal[]): Array<[string, string | number]> {
  return [
    ["年度目标数", goals.length],
    ["完成数", goals.filter((goal) => goal.status === "已完成").length],
    ["进行中", goals.filter((goal) => goal.status === "进行中").length],
    ["逾期", goals.filter((goal) => goal.status !== "已完成" && goal.deadline && goal.deadline < today()).length],
    ["平均完成率", `${averageProgress(goals)}%`]
  ];
}

function getObjectiveStats(objectives: Objective[], year: number, quarter: number): Array<[string, string | number]> {
  const periodEnd = getQuarterEndDate(year, quarter);
  return [
    ["目标总数", objectives.length],
    ["完成数", objectives.filter((item) => item.progress >= 100).length],
    ["进行中", objectives.filter((item) => item.progress > 0 && item.progress < 100).length],
    ["逾期", objectives.filter((item) => item.progress < 100 && periodEnd < today()).length],
    ["平均完成率", `${averageProgress(objectives)}%`]
  ];
}

function getKeyResultStats(keyResults: KeyResult[], year: number, month: number): Array<[string, string | number]> {
  const periodEnd = getMonthEndDate(year, month);
  return [
    ["目标总数", keyResults.length],
    ["完成数", keyResults.filter((item) => item.completed || item.progress >= 100).length],
    ["进行中", keyResults.filter((item) => !item.completed && item.progress > 0 && item.progress < 100).length],
    ["逾期", keyResults.filter((item) => !item.completed && periodEnd < today()).length],
    ["平均完成率", `${averageProgress(keyResults)}%`]
  ];
}

function isActionInPeriod(action: GoalAction, year: number, month: number): boolean {
  const periodStart = month === 0 ? `${year}-01-01` : `${year}-${String(month).padStart(2, "0")}-01`;
  const periodEnd = month === 0 ? `${year}-12-31` : getMonthEndDate(year, month);
  const actionStart = action.startDate ?? action.deadline ?? periodStart;
  const actionEnd = action.deadline ?? action.startDate ?? periodEnd;
  return actionStart <= periodEnd && actionEnd >= periodStart;
}

function averageProgress(items: Array<{ progress: number }>): number {
  if (items.length === 0) return 0;
  return Math.round(items.reduce((sum, item) => sum + (Number(item.progress) || 0), 0) / items.length);
}

function getQuarterEndDate(year: number, quarter: number): string {
  const month = quarter * 3;
  return getMonthEndDate(year, month);
}

function getMonthEndDate(year: number, month: number): string {
  const date = new Date(year, month, 0);
  return formatDateKey(date);
}

function renderObjectiveRows(container: HTMLElement, objectives: Objective[]): void {
  const list = container.createDiv({ cls: "cow-goal-stats-list" });
  objectives.forEach((objective) => {
    const row = list.createDiv({ cls: `cow-data-card ${objective.progress >= 100 ? "is-complete" : ""}` });
    row.createEl("strong", { text: objective.progress >= 100 ? `✓ ${objective.title}` : objective.title });
    row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${objective.quarter} · ${objective.progress}%` });
  });
}

function renderKeyResultRows(container: HTMLElement, keyResults: KeyResult[]): void {
  const list = container.createDiv({ cls: "cow-goal-stats-list" });
  keyResults.forEach((keyResult) => {
    const row = list.createDiv({ cls: `cow-data-card ${keyResult.completed ? "is-complete" : ""}` });
    row.createEl("strong", { text: keyResult.completed ? `✓ ${keyResult.title}` : keyResult.title });
    row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${keyResult.year}年${keyResult.month}月 · ${keyResult.progress}%` });
  });
}

function renderMilestoneCalendar(container: HTMLElement, milestones: GoalAction[], year: number, month: number): void {
  if (month === 0) return;
  const calendar = container.createDiv({ cls: "cow-review-calendar cow-goal-calendar" });
  const firstDay = new Date(year, month - 1, 1);
  const totalDays = new Date(year, month, 0).getDate();
  const offset = firstDay.getDay();
  ["日", "一", "二", "三", "四", "五", "六"].forEach((label) => calendar.createDiv({ cls: "cow-review-calendar-week", text: label }));
  for (let index = 0; index < offset; index += 1) calendar.createDiv({ cls: "cow-review-calendar-empty" });
  for (let day = 1; day <= totalDays; day += 1) {
    const date = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const count = milestones.filter((item) => (item.milestoneDate ?? item.deadline) === date).length;
    const cell = calendar.createDiv({ cls: `cow-review-calendar-day ${count > 0 ? "has-review" : ""}` });
    cell.createSpan({ text: String(day) });
    if (count > 0) cell.createDiv({ cls: "cow-calendar-dot is-purple", text: count > 1 ? String(count) : "" });
  }
}

function renderPriorityRows(container: HTMLElement, store: DashboardStore, items: GoalAction[]): void {
  const list = container.createDiv({ cls: "cow-goal-stats-list" });
  if (items.length === 0) {
    list.createDiv({ cls: "cow-empty-state", text: "当前筛选下没有任务。" });
    return;
  }
  items.forEach((item) => {
    const goal = store.getGoals().find((candidate) => candidate.id === item.goalId);
    const row = list.createDiv({ cls: `cow-data-card ${item.status === "completed" ? "is-complete" : ""}` });
    row.createEl("strong", { text: item.status === "completed" ? `✓ ${item.title}` : item.title });
    row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${goal?.title ?? "未关联目标"} · ${item.deadline ?? item.startDate ?? "--"} · ${statusLabel(item.status)}` });
    if (item.note) row.createEl("p", { text: item.note });
  });
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
