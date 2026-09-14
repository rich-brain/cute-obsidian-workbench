import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { openFitnessGoalModal } from "../DashboardEditModals";

export class FitnessGoalsSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const action = container.createEl("button", { cls: "cow-small-action", attr: { type: "button" } });
    setIcon(action.createSpan(), "plus");
    action.createSpan({ text: "新增目标" });
    action.addEventListener("click", () => {
      openFitnessGoalModal(this.app, async (goal) => {
        await this.store.addFitnessGoal(goal);
        this.onDataChanged();
      });
    });
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getFitnessGoals().forEach((goal) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      const head = row.createDiv({ cls: "cow-list-item-head" });
      const body = head.createDiv();
      body.createEl("strong", { text: goal.title });
      body.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${goal.current}/${goal.target}${goal.unit} · ${goal.deadline}` });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑目标" } });
      setIcon(edit, "pencil");
      edit.addEventListener("click", () => openFitnessGoalModal(this.app, async (values) => {
        await this.store.updateFitnessGoal(goal.id, values);
        this.onDataChanged();
      }, goal));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除目标" } });
      setIcon(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteFitnessGoal(goal.id);
        this.onDataChanged();
      });
      const percent = goal.target === 0 ? 0 : Math.round((goal.current / goal.target) * 100);
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: "cow-month-progress-fill is-green", attr: { style: `width: ${Math.min(100, percent)}%` } });
    });
  }
}
