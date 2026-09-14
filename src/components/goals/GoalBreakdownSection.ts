import type { DashboardStore } from "../../core/DashboardStore";

export class GoalBreakdownSection {
  constructor(private readonly store: DashboardStore) {}

  render(container: HTMLElement): void {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getGoals().forEach((goal) => {
      const related = this.store.getMilestones().filter((milestone) => milestone.goalId === goal.id).length;
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: goal.title });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${related} 个里程碑 · ${goal.progress}%` });
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: "cow-month-progress-fill is-blue", attr: { style: `width: ${goal.progress}%` } });
    });
  }
}
