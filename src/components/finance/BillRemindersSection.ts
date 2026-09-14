import type { DashboardStore } from "../../core/DashboardStore";

export class BillRemindersSection {
  constructor(private readonly store: DashboardStore) {}

  render(container: HTMLElement): void {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getBills().forEach((bill) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: bill.title });
      const meta = row.createDiv({ cls: "cow-meta-line" });
      meta.createSpan({ cls: bill.paid ? "cow-status is-green" : "cow-status is-yellow", text: bill.paid ? "已支付" : "待处理" });
      meta.createSpan({ text: `${bill.dueDate} · ¥${bill.amount}` });
    });
  }
}
