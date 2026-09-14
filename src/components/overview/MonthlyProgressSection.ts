import type { DashboardStore } from "../../core/DashboardStore";
import { StatisticsService } from "../../services/StatisticsService";

const COLOR_MAP: Record<string, string> = {
  research: "is-pink",
  reading: "is-yellow",
  fitness: "is-green",
  finance: "is-blue",
  goals: "is-purple"
};

export class MonthlyProgressSection {
  constructor(private readonly store: DashboardStore) {}

  render(container: HTMLElement): void {
    const progress = new StatisticsService(this.store).getMonthProgress(new Date());
    progress.forEach((item) => {
      const row = container.createDiv({ cls: "cow-month-progress-row" });
      row.createSpan({ text: item.label });
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: `cow-month-progress-fill ${COLOR_MAP[item.id]}`, attr: { style: `width: ${item.current}%` } });
      row.createSpan({ text: `${item.current}%` });
    });
  }
}
