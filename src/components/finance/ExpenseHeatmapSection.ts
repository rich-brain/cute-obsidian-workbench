import type { DashboardStore } from "../../core/DashboardStore";
import { formatDateKey } from "../../core/DashboardStore";

export class ExpenseHeatmapSection {
  constructor(private readonly store: DashboardStore) {}

  render(container: HTMLElement): void {
    const now = new Date();
    const days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const expenseByDate = new Map<string, number>();
    this.store.getTransactions().filter((tx) => tx.type === "expense").forEach((tx) => {
      expenseByDate.set(tx.date, (expenseByDate.get(tx.date) ?? 0) + tx.amount);
    });
    const grid = container.createDiv({ cls: "cow-reading-heatmap" });
    for (let day = 1; day <= days; day += 1) {
      const key = formatDateKey(new Date(now.getFullYear(), now.getMonth(), day));
      const amount = expenseByDate.get(key) ?? 0;
      const level = amount === 0 ? 0 : Math.min(5, Math.ceil(amount / 300));
      grid.createSpan({ cls: `level-${level}` });
    }
  }
}
