import type { DashboardStore } from "../../core/DashboardStore";

export class QuarterlyOkrSection {
  constructor(private readonly store: DashboardStore) {}

  render(container: HTMLElement): void {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getObjectives().forEach((objective) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: objective.title });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${objective.quarter} · ${objective.progress}%` });
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: "cow-month-progress-fill is-pink", attr: { style: `width: ${objective.progress}%` } });
    });
  }
}
