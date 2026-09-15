import { App } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";

export class MonthlyBudgetSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const grid = container.createDiv({ cls: "cow-reading-stat-grid cow-finance-summary-grid" });
    [
      ["本月收入", `¥${this.store.getMonthlyIncome()}`],
      ["本月支出", `¥${this.store.getMonthlyExpense()}`],
      ["预算剩余", `¥${this.store.getBudgetRemaining()}`],
      ["储蓄率", `${this.store.getSavingRate()}%`]
    ].forEach(([label, value]) => {
      const item = grid.createDiv();
      item.createEl("strong", { text: value });
      item.createSpan({ text: label });
    });
  }
}
