import type { DashboardStore } from "../../core/DashboardStore";

const CATEGORY_CLASS: Record<string, string> = {
  科研: "is-blue",
  阅读: "is-pink",
  健身: "is-green",
  理财: "is-yellow",
  个人: "is-purple"
};

export class TodayFocusSection {
  constructor(
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const list = container.createEl("ul", { cls: "cow-focus-list" });
    this.store.getTodayFocusTasks().forEach((task) => {
      const item = list.createEl("li");
      const checkbox = item.createEl("input", { type: "checkbox" });
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", async () => {
        await this.store.toggleTodayFocusTask(task.id);
        this.onDataChanged();
      });
      item.createSpan({ cls: `cow-pill ${CATEGORY_CLASS[task.category]}`, text: task.category });
      item.createSpan({ cls: task.completed ? "is-complete" : "", text: task.label });
    });
  }
}
