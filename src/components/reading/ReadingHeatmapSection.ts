import { type DashboardStore, formatDateKey } from "../../core/DashboardStore";

export class ReadingHeatmapSection {
  constructor(private readonly store: DashboardStore) {}

  render(container: HTMLElement): void {
    const now = new Date();
    const days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const grid = container.createDiv({ cls: "cow-reading-heatmap" });
    for (let day = 1; day <= days; day += 1) {
      const date = new Date(now.getFullYear(), now.getMonth(), day);
      const key = formatDateKey(date);
      const count = this.store.getActiveCheckInDefinitions("reading").filter((habit) => this.store.isCheckInCompleted(habit.id, key)).length;
      grid.createSpan({ cls: `level-${count}`, attr: { "aria-label": key } });
    }
  }
}
