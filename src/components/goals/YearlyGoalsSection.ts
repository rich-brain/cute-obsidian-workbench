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
    this.store.getGoals().forEach((goal) => {
      const actions = this.store.getGoalActionsForGoal(goal.id);
      const milestones = actions.filter((action) => action.isMilestone);
      const row = list.createDiv({ cls: "cow-data-card" });
      const title = row.createDiv({ cls: "cow-inline-title" });
      title.createEl("strong", { text: goal.title });
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
      const input = row.createEl("input", {
        type: "range",
        value: String(goal.progress),
        attr: { min: "0", max: "100", "aria-label": `${goal.title} 进度` }
      });
      input.addEventListener("change", async () => {
        await this.store.updateGoalProgress(goal.id, Number(input.value));
        this.onDataChanged();
      });
    });
  }
}
