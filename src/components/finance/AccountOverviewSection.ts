import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { openAccountModal } from "../DashboardEditModals";

export class AccountOverviewSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const total = container.createDiv({ cls: "cow-feature-card" });
    total.createEl("strong", { text: `¥${this.store.getTotalAssets()}` });
    total.createSpan({ text: "总资产自动汇总" });
    const add = container.createEl("button", { cls: "cow-small-action", attr: { type: "button" } });
    setIcon(add.createSpan(), "plus");
    add.createSpan({ text: "新增账户" });
    add.addEventListener("click", () => openAccountModal(this.app, async (account) => {
      await this.store.addAccount(account);
      this.onDataChanged();
    }));
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getAccounts().forEach((account) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      const head = row.createDiv({ cls: "cow-list-item-head" });
      const body = head.createDiv();
      body.createEl("strong", { text: account.name });
      const meta = body.createDiv({ cls: "cow-meta-line" });
      meta.createSpan({ cls: "cow-status is-blue", text: account.type });
      meta.createSpan({ text: `¥${account.balance}` });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑账户" } });
      setIcon(edit, "pencil");
      edit.addEventListener("click", () => openAccountModal(this.app, async (values) => {
        await this.store.updateAccount(account.id, values);
        this.onDataChanged();
      }, account));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除账户" } });
      setIcon(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteAccount(account.id);
        this.onDataChanged();
      });
    });
  }
}
