import type { DashboardStore } from "../../core/DashboardStore";

export class BodyMeasurementsSection {
  constructor(private readonly store: DashboardStore) {}

  render(container: HTMLElement): void {
    const measurements = this.store.getBodyMeasurements();
    const latest = measurements[measurements.length - 1];
    const grid = container.createDiv({ cls: "cow-reading-stat-grid" });
    [
      ["体重", `${latest?.weight ?? 0}kg`],
      ["BMI", `${latest?.bmi ?? 0}`],
      ["腰围", `${latest?.waist ?? 0}cm`],
      ["臀围", `${latest?.hip ?? 0}cm`]
    ].forEach(([label, value]) => {
      const item = grid.createDiv();
      item.createEl("strong", { text: value });
      item.createSpan({ text: label });
    });
  }
}
