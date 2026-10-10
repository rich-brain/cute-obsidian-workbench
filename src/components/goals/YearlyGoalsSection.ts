import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { openAnnualGoalModal } from "./GoalActionModals";

export class YearlyGoalsSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const list = container.createDiv({ cls: "cow-data-list" });
    const today = new Date().toISOString().slice(0, 10);
    const currentYear = new Date().getFullYear();
    this.store.getGoals().filter((goal) => this.store.shouldShowActiveGoal(goal, today) && ((goal.deadline || "").startsWith(String(currentYear)) || (goal.startDate || "").startsWith(String(currentYear)))).forEach((goal) => {
      const goalActions = this.store.getGoalActionsForGoal(goal.id);
      const milestones = goalActions.filter((action) => action.isMilestone);
      const completed = goal.status === "已完成";
      const row = list.createDiv({ cls: `cow-data-card cow-goal-list-card ${completed ? "is-complete" : ""}` });
      const title = row.createDiv({ cls: "cow-list-item-head cow-goal-card-header" });
      title.createEl("strong", { text: completed ? `✓ ${goal.title}` : goal.title });
      const actions = title.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "修改目标" } });
      setIcon(edit, "pencil");
      edit.addEventListener("click", () => openAnnualGoalModal(this.app, this.store, this.onDataChanged, goal));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除目标" } });
      setIcon(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteGoal(goal.id);
        this.onDataChanged();
      });
      row.createEl("p", { text: goal.description });
      const meta = row.createDiv({ cls: "cow-meta-line" });
      meta.createSpan({ cls: "cow-status is-green", text: goal.status });
      meta.createSpan({ text: `${goal.category} · ${goal.deadline} · 拆解 ${goalActions.length} · 里程碑 ${milestones.filter((item) => item.status === "completed").length}/${milestones.length}` });
      const progressRow = row.createDiv({ cls: "cow-goal-progress-editor" });
      const track = progressRow.createDiv({ cls: "cow-goal-display-progress", attr: { role: "progressbar", "aria-valuemin": "0", "aria-valuemax": "100", "aria-valuenow": String(goal.progress), "aria-label": `${goal.title} 进度` } });
      const fill = track.createDiv({ cls: "cow-goal-display-progress-fill" });
      fill.style.width = `${Math.max(0, Math.min(100, goal.progress))}%`;
      const number = progressRow.createEl("input", {
        type: "number",
        value: String(goal.progress),
        attr: { min: "0", max: "100", step: "1", "aria-label": `${goal.title} 进度百分比` }
      });
      const saveProgress = async (value: number): Promise<void> => {
        await this.store.updateGoalProgress(goal.id, Math.max(0, Math.min(100, value)));
        this.onDataChanged();
      };
      number.addEventListener("change", () => saveProgress(Number(number.value)));
    });
  }
}
