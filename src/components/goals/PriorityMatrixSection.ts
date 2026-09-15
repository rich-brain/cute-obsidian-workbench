import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import type { GoalAction } from "../../types/dashboard";
import { GOAL_QUADRANTS, openGoalActionModal, statusLabel } from "./GoalActionModals";

export class PriorityMatrixSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const grid = container.createDiv({ cls: "cow-priority-grid" });
    const matrixItems = this.store.getGoalActions().filter((item) => item.importance && item.urgency);
    GOAL_QUADRANTS.forEach((quadrant) => {
      const cell = grid.createDiv({ cls: `cow-priority-cell ${quadrant.id}` });
      cell.createEl("strong", { text: quadrant.label });
      cell.addEventListener("dragover", (event) => event.preventDefault());
      cell.addEventListener("drop", async (event) => {
        event.preventDefault();
        const id = event.dataTransfer?.getData("text/plain");
        if (!id) return;
        await this.store.updateGoalAction(id, { importance: quadrant.importance, urgency: quadrant.urgency });
        this.onDataChanged();
      });
      matrixItems.filter((item) => item.importance === quadrant.importance && item.urgency === quadrant.urgency).forEach((item) => this.renderMatrixItem(cell, item));
    });
  }

  private renderMatrixItem(container: HTMLElement, item: GoalAction): void {
    const row = container.createDiv({ cls: `cow-priority-item is-${item.status}`, attr: { draggable: "true" } });
    row.addEventListener("dragstart", (event) => {
      event.dataTransfer?.setData("text/plain", item.id);
      event.dataTransfer?.setData("application/cute-goal-action", item.id);
    });
    const body = row.createDiv({ cls: "cow-priority-item-body" });
    body.createSpan({ cls: item.status === "completed" ? "is-complete" : "", text: item.title });
    body.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${statusLabel(item.status)} · ${item.progress ?? 0}%${item.deadline ? ` · ${item.deadline}` : ""}` });
        const actions = row.createDiv({ cls: "cow-list-item-actions" });
    const complete = actions.createEl("button", { attr: { type: "button", "aria-label": "切换完成状态" } });
    setIcon(complete, item.status === "completed" ? "rotate-ccw" : "check");
    complete.addEventListener("click", async () => {
      await this.store.toggleGoalActionCompleted(item.id);
      this.onDataChanged();
    });
        const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑任务" } });
        setIcon(edit, "pencil");
    edit.addEventListener("click", () => openGoalActionModal(this.app, this.store, this.onDataChanged, item));
        const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除任务" } });
        setIcon(remove, "trash-2");
        remove.addEventListener("click", async () => {
      await this.store.deleteGoalAction(item.id);
          this.onDataChanged();
        });
  }
}
