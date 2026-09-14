import type { DashboardStore } from "../../core/DashboardStore";

export class WorkoutLogSection {
  constructor(private readonly store: DashboardStore) {}

  render(container: HTMLElement): void {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getWorkouts().filter((item) => item.completed).forEach((workout) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: workout.note });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${workout.date} · ${workout.type} · ${workout.duration}min` });
    });
  }
}
