import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { openPriorityItemModal } from "../DashboardEditModals";
import type { PriorityMatrixItem } from "../../types/dashboard";

const QUADRANTS: Array<{ id: PriorityMatrixItem["quadrant"]; label: string }> = [
  { id: "important-urgent", label: "重要且紧急" },
  { id: "important-not-urgent", label: "重要不紧急" },
  { id: "not-important-urgent", label: "不重要但紧急" },
  { id: "not-important-not-urgent", label: "不重要不紧急" }
];

export class PriorityMatrixSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const add = container.createEl("button", { cls: "cow-small-action", attr: { type: "button" } });
    setIcon(add.createSpan(), "plus");
    add.createSpan({ text: "新增任务" });
    add.addEventListener("click", () => openPriorityItemModal(this.app, async (item) => {
      await this.store.addPriorityMatrixItem(item);
      this.onDataChanged();
    }));
    const grid = container.createDiv({ cls: "cow-priority-grid" });
    QUADRANTS.forEach((quadrant) => {
      const cell = grid.createDiv();
      cell.createEl("strong", { text: quadrant.label });
      this.store.getPriorityMatrixItems().filter((item) => item.quadrant === quadrant.id).forEach((item) => {
        const row = cell.createDiv({ cls: "cow-priority-item" });
        row.createSpan({ cls: item.completed ? "is-complete" : "", text: item.title });
        const actions = row.createDiv({ cls: "cow-list-item-actions" });
        const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑任务" } });
        setIcon(edit, "pencil");
        edit.addEventListener("click", () => openPriorityItemModal(this.app, async (values) => {
          await this.store.updatePriorityMatrixItem(item.id, values);
          this.onDataChanged();
        }, item));
        const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除任务" } });
        setIcon(remove, "trash-2");
        remove.addEventListener("click", async () => {
          await this.store.deletePriorityMatrixItem(item.id);
          this.onDataChanged();
        });
      });
    });
  }
}
