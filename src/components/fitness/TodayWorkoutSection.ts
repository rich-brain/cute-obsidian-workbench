import type { DashboardStore } from "../../core/DashboardStore";
import { formatDateKey } from "../../core/DashboardStore";

export class TodayWorkoutSection {
  constructor(private readonly store: DashboardStore) {}

  render(container: HTMLElement): void {
    const today = formatDateKey(new Date());
    const workout = this.store.getWorkouts().find((item) => item.date === today) ?? this.store.getWorkouts()[0];
    const card = container.createDiv({ cls: "cow-feature-card" });
    card.createEl("strong", { text: workout?.note ?? "今天安排轻量活动" });
    card.createSpan({ text: workout ? `${workout.type} · ${workout.duration} 分钟 · ${workout.calories} kcal` : "给身体一点温柔的启动" });
    card.createEl("p", { text: workout?.completed ? "已完成，太稳了！" : "还没完成，留一点时间给自己。" });
  }
}
