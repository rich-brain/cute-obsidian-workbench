import type { DashboardStore } from "../../core/DashboardStore";

export class ExpenseCategoriesSection {
  constructor(private readonly store: DashboardStore) {}

  render(container: HTMLElement): void {
    this.store.getBudgets().forEach((budget) => {
      const percent = budget.amount === 0 ? 0 : Math.round((budget.spent / budget.amount) * 100);
      const row = container.createDiv({ cls: "cow-month-progress-row" });
      row.createSpan({ text: budget.category });
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: "cow-month-progress-fill is-pink", attr: { style: `width: ${Math.min(100, percent)}%` } });
      row.createSpan({ text: `${percent}%` });
    });
  }
}
