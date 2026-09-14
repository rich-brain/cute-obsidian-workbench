import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { AddTransactionModal } from "./AddTransactionModal";
import { openTransactionModal } from "../DashboardEditModals";

export class MonthlyBudgetSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const action = container.createEl("button", { cls: "cow-small-action", attr: { type: "button" } });
    setIcon(action.createSpan(), "plus");
    action.createSpan({ text: "新增记账" });
    action.addEventListener("click", () => this.openModal());
    const manage = container.createEl("button", { cls: "cow-small-action", attr: { type: "button" } });
    setIcon(manage.createSpan(), "list-checks");
    manage.createSpan({ text: "管理收支" });
    manage.addEventListener("click", () => this.openManager());

    const grid = container.createDiv({ cls: "cow-reading-stat-grid" });
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

  private openModal(): void {
    new AddTransactionModal(this.app, async (transaction) => {
      await this.store.addTransaction(transaction);
      this.onDataChanged();
    }).open();
  }

  private openManager(): void {
    openTransactionModal(this.app, async (transaction) => {
      await this.store.addTransaction(transaction);
      this.onDataChanged();
    });
  }
}
