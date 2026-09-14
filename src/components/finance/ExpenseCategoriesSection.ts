import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { openBudgetModal, showUsedCategoryNotice } from "../DashboardEditModals";

export class ExpenseCategoriesSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const add = container.createEl("button", { cls: "cow-small-action", attr: { type: "button" } });
    setIcon(add.createSpan(), "plus");
    add.createSpan({ text: "新增分类" });
    add.addEventListener("click", () => {
      openBudgetModal(this.app, async (budget) => {
        await this.store.addBudget(budget);
        this.onDataChanged();
      });
    });
    this.store.getBudgets().forEach((budget) => {
      const percent = budget.amount === 0 ? 0 : Math.round((budget.spent / budget.amount) * 100);
      const row = container.createDiv({ cls: "cow-month-progress-row" });
      row.createSpan({ text: budget.category });
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: "cow-month-progress-fill is-pink", attr: { style: `width: ${Math.min(100, percent)}%` } });
      row.createSpan({ text: `${percent}%` });
      const actions = row.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑分类" } });
      setIcon(edit, "pencil");
      edit.addEventListener("click", () => openBudgetModal(this.app, async (values) => {
        await this.store.updateBudget(budget.id, values);
        this.onDataChanged();
      }, budget));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除分类" } });
      setIcon(remove, "trash-2");
      remove.addEventListener("click", async () => {
        const deleted = await this.store.deleteBudget(budget.id);
        if (!deleted) showUsedCategoryNotice(budget.category);
        this.onDataChanged();
      });
    });
  }
}
