import { App, setIcon } from "obsidian";
import { formatDateKey, type DashboardStore } from "../../core/DashboardStore";
import { TodayFocusTaskModal } from "./TodoStatisticsModal";

const CATEGORY_CLASS: Record<string, string> = {
  科研: "is-blue",
  阅读: "is-pink",
  健身: "is-green",
  理财: "is-yellow",
  个人: "is-purple"
};

export class TodayFocusSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const list = container.createEl("ul", { cls: "cow-focus-list" });
    this.store.getTodayFocusTasksForDate(formatDateKey(new Date())).forEach((task) => {
      const item = list.createEl("li");
      const checkbox = item.createEl("input", { type: "checkbox" });
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", async () => {
        await this.store.toggleTodayFocusTask(task.id);
        this.onDataChanged();
      });
      item.createSpan({ cls: `cow-pill ${CATEGORY_CLASS[task.category]}`, text: task.category });
      item.createSpan({ cls: task.completed ? "is-complete cow-focus-task-title" : "cow-focus-task-title", text: task.label });
      const actions = item.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑" } });
      setIcon(edit, "pencil");
      edit.addEventListener("click", () => {
        new TodayFocusTaskModal(this.app, formatDateKey(new Date()), async (values) => {
          await this.store.updateTodayFocusTask(task.id, values);
          this.onDataChanged();
        }, task).open();
      });
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除" } });
      setIcon(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteTodayFocusTask(task.id);
        this.onDataChanged();
      });
    });
  }
}
