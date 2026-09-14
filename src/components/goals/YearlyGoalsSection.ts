import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { GoalEditorModal } from "./GoalModals";

export class YearlyGoalsSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const add = container.createEl("button", { cls: "cow-small-action", attr: { type: "button" } });
    setIcon(add.createSpan(), "plus");
    add.createSpan({ text: "新增目标" });
    add.addEventListener("click", () => {
      new GoalEditorModal(this.app, undefined, async (goal) => {
        await this.store.addGoal(goal);
        this.onDataChanged();
      }).open();
    });

    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getGoals().forEach((goal) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      const title = row.createDiv({ cls: "cow-inline-title" });
      title.createEl("strong", { text: goal.title });
      const edit = title.createEl("button", { attr: { type: "button", "aria-label": "修改目标" } });
      setIcon(edit, "pencil");
      edit.addEventListener("click", () => {
        new GoalEditorModal(this.app, goal, async (updated) => {
          await this.store.updateGoal(goal.id, updated);
          this.onDataChanged();
        }).open();
      });
      row.createEl("p", { text: goal.description });
      const meta = row.createDiv({ cls: "cow-meta-line" });
      meta.createSpan({ cls: "cow-status is-green", text: goal.status });
      meta.createSpan({ text: `${goal.category} · ${goal.deadline}` });
      const input = row.createEl("input", {
        type: "range",
        value: String(goal.progress),
        attr: { min: "0", max: "100", "aria-label": `${goal.title} 进度` }
      });
      input.addEventListener("change", async () => {
        await this.store.updateGoalProgress(goal.id, Number(input.value));
        this.onDataChanged();
      });
    });
  }
}
