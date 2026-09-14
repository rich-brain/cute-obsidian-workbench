import type { DashboardStore } from "../../core/DashboardStore";

export class IncomeExpenseTrendSection {
  constructor(private readonly store: DashboardStore) {}

  render(container: HTMLElement): void {
    [
      ["收入", this.store.getMonthlyIncome(), "is-green"],
      ["支出", this.store.getMonthlyExpense(), "is-pink"],
      ["预算剩余", this.store.getBudgetRemaining(), "is-blue"]
    ].forEach(([label, value, className]) => {
      const row = container.createDiv({ cls: "cow-month-progress-row" });
      row.createSpan({ text: String(label) });
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: `cow-month-progress-fill ${className}`, attr: { style: `width: ${Math.min(100, Number(value) / 150)}%` } });
      row.createSpan({ text: `¥${value}` });
    });
  }
}
