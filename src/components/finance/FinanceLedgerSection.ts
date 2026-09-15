import { App, setIcon } from "obsidian";
import { formatDateKey, type DashboardStore } from "../../core/DashboardStore";
import { AddTransactionModal } from "./AddTransactionModal";

export class FinanceLedgerSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const today = formatDateKey(new Date());
    const todayTransactions = this.store.getTransactions().filter((item) => item.date === today);
    const income = todayTransactions.filter((item) => item.type === "income").reduce((sum, item) => sum + item.amount, 0);
    const expense = todayTransactions.filter((item) => item.type === "expense").reduce((sum, item) => sum + item.amount, 0);

    const stats = container.createDiv({ cls: "cow-reading-stat-grid cow-finance-ledger-stats" });
    [
      ["今日收入", `¥${income}`],
      ["今日支出", `¥${expense}`],
      ["今日笔数", todayTransactions.length]
    ].forEach(([label, value]) => {
      const item = stats.createDiv();
      item.createEl("strong", { text: String(value) });
      item.createSpan({ text: String(label) });
    });

    const list = container.createDiv({ cls: "cow-data-list cow-compact-list" });
    this.store.getTransactions().slice(-5).reverse().forEach((transaction) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: `${transaction.type === "income" ? "+" : "-"}¥${transaction.amount} · ${transaction.category}` });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${transaction.date} · ${transaction.note || "无备注"}` });
    });

    const add = container.createEl("button", { cls: "finance-add-transaction-bar", attr: { type: "button" } });
    setIcon(add.createSpan(), "plus");
    add.createSpan({ text: "添加" });
    add.addEventListener("click", () => {
      new AddTransactionModal(this.app, async (transaction) => {
        await this.store.addTransaction(transaction);
        this.onDataChanged();
      }, undefined, this.store.getBudgets()).open();
    });
  }
}

