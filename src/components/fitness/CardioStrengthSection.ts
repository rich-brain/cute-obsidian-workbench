import type { DashboardStore } from "../../core/DashboardStore";

export class CardioStrengthSection {
  constructor(private readonly store: DashboardStore) {}

  render(container: HTMLElement): void {
    const cardio = this.store.getWorkouts().filter((item) => item.type === "有氧").length;
    const strength = this.store.getWorkouts().filter((item) => item.type === "力量").length;
    const items = [
      ["有氧", cardio, "is-blue"],
      ["力量", strength, "is-pink"],
      ["拉伸", this.store.getWorkouts().filter((item) => item.type === "拉伸").length, "is-green"]
    ] as const;
    items.forEach(([label, value, className]) => {
      const row = container.createDiv({ cls: "cow-month-progress-row" });
      row.createSpan({ text: label });
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: `cow-month-progress-fill ${className}`, attr: { style: `width: ${Math.min(100, value * 30)}%` } });
      row.createSpan({ text: `${value}次` });
    });
  }
}
