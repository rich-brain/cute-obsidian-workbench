import { App, setIcon } from "obsidian";
import { formatDateKey, type DashboardStore } from "../../core/DashboardStore";
import { openFinanceTodoModal } from "./FinanceModals";

export class FinanceTodosSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
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
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${item.date ?? ""}${item.note ? ` · ${item.note}` : ""}` });
      const actions = row.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑记账待办" } });
      setIcon(edit, "pencil");
      edit.addEventListener("click", () => openFinanceTodoModal(this.app, this.store, this.onDataChanged, item));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除记账待办" } });
      setIcon(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteFinanceTodo(item.id);
        this.onDataChanged();
      });
    });
    this.renderCompleteAll(container);
  }

  private renderCompleteAll(container: HTMLElement): void {
    const today = formatDateKey(new Date());
    const todayTodos = this.store.getFinanceTodos().filter((item) => (item.date ?? today) === today);
    const pending = todayTodos.filter((item) => !item.completed);
    const button = container.createEl("button", {
      cls: `cow-finance-todo-complete-all ${pending.length === 0 ? "is-complete" : ""}`,
      attr: { type: "button" }
    });
    setIcon(button.createSpan(), pending.length === 0 ? "check-circle-2" : "check");
    button.createSpan({ text: pending.length === 0 ? "今日记账待办已完成" : "都完成" });
    button.addEventListener("click", async () => {
      if (pending.length === 0) return;
      for (const todo of pending) {
        await this.store.updateFinanceTodo(todo.id, { completed: true });
      }
      this.onDataChanged();
    });
  }
}
