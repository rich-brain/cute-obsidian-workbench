import type { DashboardStore } from "../../core/DashboardStore";

export class FitnessStatsSection {
  constructor(private readonly store: DashboardStore) {}

  render(container: HTMLElement): void {
    const workouts = this.store.getWorkouts();
    const minutes = workouts.reduce((sum, item) => sum + item.duration, 0);
    const calories = workouts.reduce((sum, item) => sum + item.calories, 0);
    const grid = container.createDiv({ cls: "cow-reading-stat-grid" });
    [
      ["运动时长", `${minutes}min`],
      ["热量消耗", `${calories}kcal`],
      ["完成训练", `${workouts.filter((item) => item.completed).length}次`],
      ["训练类型", `${new Set(workouts.map((item) => item.type)).size}类`]
    ].forEach(([label, value]) => {
      const item = grid.createDiv();
      item.createEl("strong", { text: value });
      item.createSpan({ text: label });
    });
  }
}
