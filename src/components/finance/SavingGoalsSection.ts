import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { openSavingGoalModal } from "../SectionContentActions";

export class SavingGoalsSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getSavingGoals().forEach((goal) => {
      const percent = goal.target === 0 ? 0 : Math.round((goal.current / goal.target) * 100);
      const row = list.createDiv({ cls: "cow-data-card" });
      const head = row.createDiv({ cls: "cow-list-item-head" });
      head.createEl("strong", { text: goal.title });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑储蓄目标" } });
      setIcon(edit, "pencil");
      edit.addEventListener("click", () => openSavingGoalModal(this.app, async (values) => {
        await this.store.updateSavingGoal(goal.id, values);
        this.onDataChanged();
      }, goal));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除储蓄目标" } });
      setIcon(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteSavingGoal(goal.id);
        this.onDataChanged();
      });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `¥${goal.current}/¥${goal.target} · ${goal.deadline}` });
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: "cow-month-progress-fill is-green", attr: { style: `width: ${Math.min(100, percent)}%` } });
    });
  }
}
