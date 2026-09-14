import type { DashboardStore } from "../../core/DashboardStore";

export class AccountOverviewSection {
  constructor(private readonly store: DashboardStore) {}

  render(container: HTMLElement): void {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getAccounts().forEach((account) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: account.name });
      const meta = row.createDiv({ cls: "cow-meta-line" });
      meta.createSpan({ cls: "cow-status is-blue", text: account.type });
      meta.createSpan({ text: `¥${account.balance}` });
    });
  }
}
