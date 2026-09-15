import { App } from "obsidian";
import { formatDateKey, type DashboardStore } from "../../core/DashboardStore";

export class WaterSleepHabitsSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const today = formatDateKey(new Date());
    const record = this.store.getFitnessDailyRecord(today);
    const list = container.createDiv({ cls: "cow-data-list" });
    [
      ["饮水", `${record.waterCups} / ${record.waterGoal} 杯`, record.waterNote ?? "", record.waterGoal === 0 ? 0 : Math.round((record.waterCups / record.waterGoal) * 100)],
      ["睡眠", `${record.sleepHours} / ${record.sleepGoal} 小时`, record.sleepNote ?? "", record.sleepGoal === 0 ? 0 : Math.round((record.sleepHours / record.sleepGoal) * 100)]
    ].forEach(([label, status, note, percent]) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: String(label) });
      const meta = row.createDiv({ cls: "cow-fitness-metric-line" });
      meta.createSpan({ cls: "cow-fitness-metric-value", text: String(status) });
      if (note) {
        meta.createSpan({ cls: "cow-fitness-note", text: String(note) });
      }
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: "cow-month-progress-fill is-blue", attr: { style: `width: ${Math.min(100, Number(percent))}%` } });
    });
    this.store.getFitnessHabitDefinitions().slice(0, 3).forEach((definition) => {
      const daily = this.store.getFitnessHabitRecords(today).find((item) => item.habitId === definition.id);
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: definition.name });
      const meta = row.createDiv({ cls: "cow-fitness-metric-line" });
      meta.createSpan({ cls: "cow-fitness-metric-value", text: `${daily?.actualValue ?? 0} / ${definition.targetValue} ${definition.unit}` });
      if (daily?.note) {
        meta.createSpan({ cls: "cow-fitness-note", text: daily.note });
      }
    });
  }
}
