import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { openMonthlyGoalModal } from "./GoalActionModals";

export class MonthlyKeyResultsSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const now = new Date();
    const today = now.toISOString().slice(0, 10);
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    container.createDiv({ cls: "cow-month-goal-period", text: `${currentYear}年${currentMonth}月` });
    const list = container.createEl("ul", { cls: "cow-focus-list cow-month-goal-list" });
    this.store.getKeyResults().filter((kr) => this.store.shouldShowActiveKeyResult(kr, today) && kr.year === currentYear && kr.month === currentMonth).forEach((kr) => {
      const item = list.createEl("li", { cls: kr.completed ? "is-complete" : "" });
      const checkbox = item.createEl("input", { attr: { type: "checkbox", "aria-label": `${kr.title} 完成状态` } });
      checkbox.checked = kr.completed;
      checkbox.addEventListener("change", async () => {
        await this.store.toggleKeyResult(kr.id);
        this.onDataChanged();
      });
      const body = item.createDiv({ cls: "cow-month-goal-body" });
      body.createSpan({ cls: kr.completed ? "is-complete" : "", text: kr.completed ? `✓ ${kr.title}` : kr.title });
      const progressRow = body.createDiv({ cls: "cow-goal-progress-editor is-compact" });
      const range = progressRow.createEl("input", { type: "range", value: String(kr.progress), attr: { min: "0", max: "100", step: "1", "aria-label": `${kr.title} 进度` } });
      const number = progressRow.createEl("input", { type: "number", value: String(kr.progress), attr: { min: "0", max: "100", step: "1", "aria-label": `${kr.title} 进度百分比` } });
      progressRow.createSpan({ cls: "cow-pill is-purple", text: "%" });
      const saveProgress = async (value: number): Promise<void> => {
        await this.store.updateKeyResult(kr.id, { progress: Math.max(0, Math.min(100, value)), completed: value >= 100 });
        this.onDataChanged();
      };
      range.addEventListener("input", () => number.value = range.value);
      range.addEventListener("change", () => saveProgress(Number(range.value)));
      number.addEventListener("change", () => saveProgress(Number(number.value)));
      const actions = item.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑月度目标" } });
      setIcon(edit, "pencil");
      edit.addEventListener("click", () => openMonthlyGoalModal(this.app, this.store, this.onDataChanged, kr));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除月度目标" } });
      setIcon(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteKeyResult(kr.id);
        this.onDataChanged();
      });
    });
  }
}
