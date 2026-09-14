import type { DashboardStore } from "../../core/DashboardStore";

export class WorkoutPlanSection {
  constructor(private readonly store: DashboardStore) {}

  render(container: HTMLElement): void {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getWorkouts().forEach((workout) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: workout.note });
      const meta = row.createDiv({ cls: "cow-meta-line" });
      meta.createSpan({ cls: workout.completed ? "cow-status is-green" : "cow-status is-yellow", text: workout.completed ? "已完成" : "待训练" });
      meta.createSpan({ text: `${workout.date} · ${workout.type} · ${workout.duration}min` });
    });
  }
}
