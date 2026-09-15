import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import type { GoalAction } from "../../types/dashboard";
import { openGoalActionModal, statusLabel } from "./GoalActionModals";

export class GoalBreakdownSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const list = container.createDiv({ cls: "cow-goal-tree-list" });
    const today = new Date().toISOString().slice(0, 10);
    this.store.getGoals().forEach((goal) => {
      const goalActions = this.store.getGoalActionsForGoal(goal.id).filter((action) => this.store.shouldShowActiveGoalAction(action, today));
      const rootActions = goalActions.filter((action) => !action.parentId);
      const group = list.createDiv({ cls: "cow-goal-tree-group" });
      const header = group.createDiv({ cls: "cow-goal-tree-goal" });
      header.createEl("strong", { text: goal.title });
      header.createSpan({ text: `${goal.progress}% · ${goalActions.length} 个拆解任务` });

      if (rootActions.length === 0) {
        group.createDiv({ cls: "cow-empty-state", text: "还没有拆解任务，点击右上角新增拆解。" });
      }

      rootActions.forEach((action) => this.renderAction(group, action, goalActions, 0));
    });
  }

  private renderAction(container: HTMLElement, action: GoalAction, allActions: GoalAction[], depth: number): void {
    const children = allActions.filter((item) => item.parentId === action.id);
    const row = container.createDiv({ cls: `cow-goal-action-row is-depth-${Math.min(depth, 3)} is-${action.status}` });
    row.style.setProperty("--goal-depth", String(Math.min(depth, 3)));

    const toggle = row.createEl("button", { cls: "cow-icon-button", attr: { type: "button", "aria-label": action.collapsed ? "展开子任务" : "收起子任务" } });
    setIcon(toggle, children.length > 0 ? (action.collapsed ? "chevron-right" : "chevron-down") : "circle");
    toggle.disabled = children.length === 0;
    toggle.addEventListener("click", async () => {
      await this.store.updateGoalAction(action.id, { collapsed: !action.collapsed });
      this.onDataChanged();
    });

    const check = row.createEl("input", { attr: { type: "checkbox", "aria-label": `${action.title} 完成状态` } });
    check.checked = action.status === "completed";
    check.addEventListener("change", async () => {
      await this.store.toggleGoalActionCompleted(action.id);
      this.onDataChanged();
    });

    const body = row.createDiv({ cls: "cow-goal-action-body" });
    body.createEl("strong", { text: action.title });
    const dateText = [action.startDate ? `开始 ${action.startDate}` : "", action.deadline ? `截止 ${action.deadline}` : ""].filter(Boolean).join(" · ");
    body.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${statusLabel(action.status)} · ${action.progress ?? 0}% · ${action.durationDays ?? 1} 天${dateText ? ` · ${dateText}` : ""}` });
    if (action.description || action.note) body.createEl("p", { text: action.description || action.note || "" });
    this.renderProgressEditor(body, action, children.length > 0);

    const actions = row.createDiv({ cls: "cow-list-item-actions" });
    const addChild = actions.createEl("button", { attr: { type: "button", "aria-label": "新增子任务" } });
    setIcon(addChild, "plus");
    addChild.addEventListener("click", () => openGoalActionModal(this.app, this.store, this.onDataChanged, undefined, { goalId: action.goalId, parentId: action.id }));
    const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑任务" } });
    setIcon(edit, "pencil");
    edit.addEventListener("click", () => openGoalActionModal(this.app, this.store, this.onDataChanged, action));
    const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除任务" } });
    setIcon(remove, "trash-2");
    remove.addEventListener("click", async () => {
      await this.store.deleteGoalAction(action.id);
      this.onDataChanged();
    });

    if (!action.collapsed) {
      children.forEach((child) => this.renderAction(container, child, allActions, depth + 1));
    }
  }

  private renderProgressEditor(container: HTMLElement, action: GoalAction, hasChildren: boolean): void {
    const row = container.createDiv({ cls: "cow-goal-progress-editor cow-goal-action-progress" });
    const mode = row.createEl("select", { attr: { "aria-label": `${action.title} 进度模式` } });
    mode.createEl("option", { value: "auto", text: "自动进度" });
    mode.createEl("option", { value: "manual", text: "手动进度" });
    mode.value = action.progressMode ?? "auto";
    const range = row.createEl("input", { type: "range", value: String(action.progress ?? 0), attr: { min: "0", max: "100", step: "1", "aria-label": `${action.title} 进度` } });
    const number = row.createEl("input", { type: "number", value: String(action.progress ?? 0), attr: { min: "0", max: "100", step: "1", "aria-label": `${action.title} 进度百分比` } });
    const updateDisabled = (): void => {
      const disabled = hasChildren && mode.value !== "manual";
      range.disabled = disabled;
      number.disabled = disabled;
    };
    updateDisabled();
    mode.addEventListener("change", async () => {
      await this.store.updateGoalAction(action.id, { progressMode: mode.value as GoalAction["progressMode"] });
      this.onDataChanged();
    });
    range.addEventListener("input", () => number.value = range.value);
    range.addEventListener("change", () => this.saveProgress(action.id, Number(range.value)));
    number.addEventListener("change", () => this.saveProgress(action.id, Number(number.value)));
  }

  private async saveProgress(actionId: string, value: number): Promise<void> {
    const progress = Math.max(0, Math.min(100, value));
    await this.store.updateGoalAction(actionId, {
      progress,
      progressMode: "manual",
      status: progress >= 100 ? "completed" : progress > 0 ? "in-progress" : "todo"
    });
    this.onDataChanged();
  }
}
