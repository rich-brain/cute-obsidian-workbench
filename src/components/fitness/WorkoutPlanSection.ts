import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { openWorkoutModal } from "../SectionContentActions";

export class WorkoutPlanSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getWorkouts().forEach((workout) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      const head = row.createDiv({ cls: "cow-list-item-head" });
      head.createEl("strong", { text: workout.note });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑训练计划" } });
      setIcon(edit, "pencil");
      edit.addEventListener("click", () => openWorkoutModal(this.app, async (values) => {
        await this.store.updateWorkout(workout.id, values);
        this.onDataChanged();
      }, workout.completed, workout));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除训练计划" } });
      setIcon(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteWorkout(workout.id);
        this.onDataChanged();
      });
      const meta = row.createDiv({ cls: "cow-meta-line" });
      meta.createSpan({ cls: workout.completed ? "cow-status is-green" : "cow-status is-yellow", text: workout.completed ? "已完成" : "待训练" });
      meta.createSpan({ text: `${workout.date} · ${workout.type} · ${workout.duration}min` });
    });
  }
}
