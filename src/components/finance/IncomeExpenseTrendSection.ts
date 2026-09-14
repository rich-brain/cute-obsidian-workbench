import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { openTransactionModal } from "../DashboardEditModals";

export class IncomeExpenseTrendSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const add = container.createEl("button", { cls: "cow-small-action", attr: { type: "button" } });
    setIcon(add.createSpan(), "list-checks");
    add.createSpan({ text: "管理收支记录" });
    add.addEventListener("click", () => openTransactionModal(this.app, async (transaction) => {
      await this.store.addTransaction(transaction);
      this.onDataChanged();
    }));
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
    const list = container.createDiv({ cls: "cow-data-list cow-compact-list" });
    this.store.getTransactions().slice(-4).reverse().forEach((transaction) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      const head = row.createDiv({ cls: "cow-list-item-head" });
      const body = head.createDiv();
      body.createEl("strong", { text: `${transaction.type === "income" ? "收入" : "支出"} ¥${transaction.amount}` });
      body.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${transaction.date} · ${transaction.category} · ${transaction.note || "无备注"}` });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑收支" } });
      setIcon(edit, "pencil");
      edit.addEventListener("click", () => openTransactionModal(this.app, async (values) => {
        await this.store.updateTransaction(transaction.id, values);
        this.onDataChanged();
      }, transaction));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除收支" } });
      setIcon(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteTransaction(transaction.id);
        this.onDataChanged();
      });
    });
  }
}
