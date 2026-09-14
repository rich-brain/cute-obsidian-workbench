import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { AddTransactionModal } from "./AddTransactionModal";
import { openTextModal } from "../SectionContentActions";

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

    const list = container.createEl("ul", { cls: "cow-focus-list cow-editable-list" });
    this.store.getFinanceTodos().forEach((item) => {
      const row = list.createEl("li");
      const checkbox = row.createEl("input", { type: "checkbox" });
      checkbox.checked = item.completed;
      checkbox.addEventListener("change", async () => {
        await this.store.updateFinanceTodo(item.id, { completed: checkbox.checked });
        this.onDataChanged();
      });
      row.createSpan({ text: item.title });
      const actions = row.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑记账待办" } });
      setIcon(edit, "pencil");
      edit.addEventListener("click", () => openTextModal(this.app, "编辑记账待办", "待办", item.title, async (value) => {
        await this.store.updateFinanceTodo(item.id, { title: value });
        this.onDataChanged();
      }));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除记账待办" } });
      setIcon(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteFinanceTodo(item.id);
        this.onDataChanged();
      });
    });
  }
}
