import type { DashboardStore } from "../../core/DashboardStore";

export class LongTermProgressSection {
  constructor(private readonly store: DashboardStore) {}

  render(container: HTMLElement): void {
    const goals = this.store.getGoals();
    const average = goals.length === 0 ? 0 : Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length);
    const card = container.createDiv({ cls: "cow-feature-card" });
    card.createEl("strong", { text: `${average}%` });
    card.createSpan({ text: "长期目标平均进展" });
    card.createEl("p", { text: "把目标拆小，每周推一点，复利会悄悄站到你这边。" });
    goals.forEach((goal) => {
      const row = container.createDiv({ cls: "cow-month-progress-row" });
      row.createSpan({ text: goal.category });
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: "cow-month-progress-fill is-green", attr: { style: `width: ${goal.progress}%` } });
      row.createSpan({ text: `${goal.progress}%` });
    });
  }
}
