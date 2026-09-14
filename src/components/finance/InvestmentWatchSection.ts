import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { openInvestmentWatchModal } from "../DashboardEditModals";

export class InvestmentWatchSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const add = container.createEl("button", { cls: "cow-small-action", attr: { type: "button" } });
    setIcon(add.createSpan(), "plus");
    add.createSpan({ text: "新增观察" });
    add.addEventListener("click", () => {
      openInvestmentWatchModal(this.app, async (item) => {
        await this.store.addInvestmentWatchItem(item);
        this.onDataChanged();
      });
    });
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getInvestmentWatchItems().forEach((item) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      const head = row.createDiv({ cls: "cow-list-item-head" });
      const body = head.createDiv();
      body.createEl("strong", { text: item.name });
      body.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${item.code} · ${item.type} · ¥${item.price} · ${item.changePercent}%` });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑观察" } });
      setIcon(edit, "pencil");
      edit.addEventListener("click", () => openInvestmentWatchModal(this.app, async (values) => {
        await this.store.updateInvestmentWatchItem(item.id, values);
        this.onDataChanged();
      }, item));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除观察" } });
      setIcon(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteInvestmentWatchItem(item.id);
        this.onDataChanged();
      });
    });
  }
}
