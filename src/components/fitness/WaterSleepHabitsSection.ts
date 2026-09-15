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
      ["饮水", `${record.waterCups}/${record.waterGoal} 杯`, record.waterGoal === 0 ? 0 : Math.round((record.waterCups / record.waterGoal) * 100)],
      ["睡眠", `${record.sleepHours}/${record.sleepGoal} 小时`, record.sleepGoal === 0 ? 0 : Math.round((record.sleepHours / record.sleepGoal) * 100)],
      ["作息", `${record.bedtime || "--"} - ${record.wakeTime || "--"}`, 100]
    ].forEach(([label, status, percent]) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: String(label) });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: String(status) });
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: "cow-month-progress-fill is-blue", attr: { style: `width: ${Math.min(100, Number(percent))}%` } });
    });
    this.store.getFitnessHabitDefinitions().slice(0, 3).forEach((definition) => {
      const daily = this.store.getFitnessHabitRecords(today).find((item) => item.habitId === definition.id);
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: definition.name });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${daily?.actualValue ?? 0}/${definition.targetValue}${definition.unit}` });
    });
  }
}
