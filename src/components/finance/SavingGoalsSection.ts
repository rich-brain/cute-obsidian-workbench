import type { DashboardStore } from "../../core/DashboardStore";

export class SavingGoalsSection {
  constructor(private readonly store: DashboardStore) {}

  render(container: HTMLElement): void {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getSavingGoals().forEach((goal) => {
      const percent = goal.target === 0 ? 0 : Math.round((goal.current / goal.target) * 100);
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: goal.title });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `¥${goal.current}/¥${goal.target} · ${goal.deadline}` });
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: "cow-month-progress-fill is-green", attr: { style: `width: ${Math.min(100, percent)}%` } });
    });
  }
}
