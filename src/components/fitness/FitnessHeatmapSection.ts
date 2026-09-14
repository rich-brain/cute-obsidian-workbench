import type { DashboardStore } from "../../core/DashboardStore";
import { formatDateKey } from "../../core/DashboardStore";

export class FitnessHeatmapSection {
  constructor(private readonly store: DashboardStore) {}

  render(container: HTMLElement): void {
    const now = new Date();
    const days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const workoutsByDate = new Map<string, number>();
    this.store.getWorkouts().forEach((workout) => {
      workoutsByDate.set(workout.date, (workoutsByDate.get(workout.date) ?? 0) + (workout.completed ? 2 : 1));
    });
    const grid = container.createDiv({ cls: "cow-reading-heatmap" });
    for (let day = 1; day <= days; day += 1) {
      const key = formatDateKey(new Date(now.getFullYear(), now.getMonth(), day));
      grid.createSpan({ cls: `level-${Math.min(5, workoutsByDate.get(key) ?? 0)}` });
    }
  }
}
