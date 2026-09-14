import type { DashboardStore } from "../../core/DashboardStore";

export class WaterSleepHabitsSection {
  constructor(private readonly store: DashboardStore) {}

  render(container: HTMLElement): void {
    const dates = this.store.getCurrentWeekDates();
    const today = dates[dates.length - 1] ?? "";
    const water = this.store.isHabitCompleted("fitness-water", today);
    const sleep = this.store.isHabitCompleted("fitness-sleep", today);
    const list = container.createDiv({ cls: "cow-data-list" });
    [
      ["饮水", water ? "已达标" : "待完成", 80],
      ["睡眠", sleep ? "已记录" : "待记录", 65],
      ["拉伸", this.store.isHabitCompleted("fitness-stretch", today) ? "已完成" : "待完成", 50]
    ].forEach(([label, status, percent]) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: String(label) });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: String(status) });
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: "cow-month-progress-fill is-blue", attr: { style: `width: ${percent}%` } });
    });
  }
}
