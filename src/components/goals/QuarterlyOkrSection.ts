import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { openQuarterlyGoalModal } from "./GoalActionModals";

export class QuarterlyOkrSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const list = container.createDiv({ cls: "cow-data-list" });
    const today = new Date().toISOString().slice(0, 10);
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentQuarter = Math.floor(now.getMonth() / 3) + 1;
    this.store.getObjectives().filter((objective) => this.store.shouldShowActiveObjective(objective, today) && objective.year === currentYear && objective.quarterNumber === currentQuarter).forEach((objective) => {
      const completed = objective.progress >= 100;
      const row = list.createDiv({ cls: `cow-data-card cow-goal-list-card ${completed ? "is-complete" : ""}` });
      const head = row.createDiv({ cls: "cow-list-item-head" });
      head.createEl("strong", { text: completed ? `✓ ${objective.title}` : objective.title });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑季度目标" } });
      setIcon(edit, "pencil");
      edit.addEventListener("click", () => openQuarterlyGoalModal(this.app, this.store, this.onDataChanged, objective));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除季度目标" } });
      setIcon(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteObjective(objective.id);
        this.onDataChanged();
      });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${objective.quarter} · ${objective.progress}%` });
      const progressRow = row.createDiv({ cls: "cow-goal-progress-editor" });
      const range = progressRow.createEl("input", { type: "range", value: String(objective.progress), attr: { min: "0", max: "100", step: "1", "aria-label": `${objective.title} 进度` } });
      const number = progressRow.createEl("input", { type: "number", value: String(objective.progress), attr: { min: "0", max: "100", step: "1", "aria-label": `${objective.title} 进度百分比` } });
      const saveProgress = async (value: number): Promise<void> => {
        await this.store.updateObjective(objective.id, { progress: Math.max(0, Math.min(100, value)) });
        this.onDataChanged();
      };
      range.addEventListener("input", () => number.value = range.value);
      range.addEventListener("change", () => saveProgress(Number(range.value)));
      number.addEventListener("change", () => saveProgress(Number(number.value)));
    });
  }
}
