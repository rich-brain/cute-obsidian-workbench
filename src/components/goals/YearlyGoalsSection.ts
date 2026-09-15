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
      const actions = this.store.getGoalActionsForGoal(goal.id);
      const milestones = actions.filter((action) => action.isMilestone);
      const completed = goal.status === "已完成";
      const row = list.createDiv({ cls: `cow-data-card cow-goal-list-card ${completed ? "is-complete" : ""}` });
      const title = row.createDiv({ cls: "cow-inline-title" });
      title.createEl("strong", { text: completed ? `✓ ${goal.title}` : goal.title });
      const edit = title.createEl("button", { attr: { type: "button", "aria-label": "修改目标" } });
      setIcon(edit, "pencil");
      edit.addEventListener("click", () => openAnnualGoalModal(this.app, this.store, this.onDataChanged, goal));
      const remove = title.createEl("button", { attr: { type: "button", "aria-label": "删除目标" } });
      setIcon(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteGoal(goal.id);
        this.onDataChanged();
      });
      row.createEl("p", { text: goal.description });
      const meta = row.createDiv({ cls: "cow-meta-line" });
      meta.createSpan({ cls: "cow-status is-green", text: goal.status });
      meta.createSpan({ text: `${goal.category} · ${goal.deadline} · 拆解 ${actions.length} · 里程碑 ${milestones.filter((item) => item.status === "completed").length}/${milestones.length}` });
      const progressRow = row.createDiv({ cls: "cow-goal-progress-editor" });
      const input = progressRow.createEl("input", {
        type: "range",
        value: String(goal.progress),
        attr: { min: "0", max: "100", "aria-label": `${goal.title} 进度` }
      });
      const number = progressRow.createEl("input", {
        type: "number",
        value: String(goal.progress),
        attr: { min: "0", max: "100", step: "1", "aria-label": `${goal.title} 进度百分比` }
      });
      const saveProgress = async (value: number): Promise<void> => {
        await this.store.updateGoalProgress(goal.id, Math.max(0, Math.min(100, value)));
        this.onDataChanged();
      };
      input.addEventListener("input", () => number.value = input.value);
      input.addEventListener("change", () => saveProgress(Number(input.value)));
      number.addEventListener("change", () => saveProgress(Number(number.value)));
    });
  }
}
