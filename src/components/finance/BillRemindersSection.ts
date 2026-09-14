import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { openBillModal } from "../SectionContentActions";

export class BillRemindersSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getBills().forEach((bill) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      const head = row.createDiv({ cls: "cow-list-item-head" });
      head.createEl("strong", { text: bill.title });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑账单" } });
      setIcon(edit, "pencil");
      edit.addEventListener("click", () => openBillModal(this.app, async (values) => {
        await this.store.updateBill(bill.id, values);
        this.onDataChanged();
      }, bill));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除账单" } });
      setIcon(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteBill(bill.id);
        this.onDataChanged();
      });
      const meta = row.createDiv({ cls: "cow-meta-line" });
      meta.createSpan({ cls: bill.paid ? "cow-status is-green" : "cow-status is-yellow", text: bill.paid ? "已支付" : "待处理" });
      meta.createSpan({ text: `${bill.dueDate} · ¥${bill.amount}` });
    });
  }
}
