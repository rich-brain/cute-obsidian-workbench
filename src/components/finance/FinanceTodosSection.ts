import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { AddTransactionModal } from "./AddTransactionModal";

export class FinanceTodosSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const action = container.createEl("button", { cls: "cow-small-action", attr: { type: "button" } });
    setIcon(action.createSpan(), "plus");
    action.createSpan({ text: "新增记账" });
    action.addEventListener("click", () => {
      new AddTransactionModal(this.app, async (transaction) => {
        await this.store.addTransaction(transaction);
        this.onDataChanged();
      }).open();
    });

    const list = container.createEl("ul", { cls: "cow-focus-list" });
    ["记录本周交通支出", "检查餐饮预算", "确认账单提醒", "整理投资观察笔记"].forEach((item, index) => {
      const row = list.createEl("li");
      const checkbox = row.createEl("input", { type: "checkbox" });
      checkbox.checked = index === 1;
      row.createSpan({ text: item });
    });
  }
}
