import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { getGoalStatus, openFitnessGoalDetailModal, openFitnessGoalModal } from "./FitnessModals";

export class FitnessGoalsSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getFitnessGoals().filter((goal) => !(getGoalStatus(goal) === "completed" && goal.completedDate && goal.completedDate < new Date().toISOString().slice(0, 10))).forEach((goal) => {
      const status = getGoalStatus(goal);
      const row = list.createDiv({ cls: `cow-data-card cow-fitness-goal-${status}` });
      row.setAttr("role", "button");
      row.setAttr("tabindex", "0");
      row.addEventListener("click", () => openFitnessGoalDetailModal(this.app, this.store, this.onDataChanged, goal));
      row.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openFitnessGoalDetailModal(this.app, this.store, this.onDataChanged, goal);
        }
      });
      const head = row.createDiv({ cls: "cow-list-item-head" });
      const body = head.createDiv();
      body.createEl("strong", { text: `${status === "completed" ? "✓ " : ""}${goal.title}` });
      body.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${goal.type ?? "其它"} · ${goal.currentValue ?? goal.current ?? 0}/${goal.targetValue ?? goal.target ?? 0}${goal.targetUnit ?? goal.unit ?? ""} · ${goal.startDate ?? "--"} - ${goal.deadline} · ${this.statusLabel(status)}` });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑目标" } });
      setIcon(edit, "pencil");
      edit.addEventListener("click", (event) => {
        event.stopPropagation();
        openFitnessGoalModal(this.app, this.store, this.onDataChanged, goal);
      });
      if (status !== "completed") {
        const complete = actions.createEl("button", { attr: { type: "button", "aria-label": "完成目标" } });
        setIcon(complete, "check");
        complete.addEventListener("click", async (event) => {
          event.stopPropagation();
          await this.store.completeFitnessGoal(goal.id);
          this.onDataChanged();
        });
      }
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除目标" } });
      setIcon(remove, "trash-2");
      remove.addEventListener("click", async (event) => {
        event.stopPropagation();
        if (!confirm(`删除“${goal.title}”？关联训练计划会解除关联，但不会被删除。`)) return;
        await this.store.deleteFitnessGoal(goal.id);
        this.onDataChanged();
      });
      const current = goal.currentValue ?? goal.current ?? 0;
      const target = goal.targetValue ?? goal.target ?? 0;
      const percent = typeof goal.progress === "number" ? goal.progress : target === 0 ? 0 : Math.round((current / target) * 100);
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: "cow-month-progress-fill is-green", attr: { style: `width: ${Math.min(100, percent)}%` } });
    });
  }

  private statusLabel(status: string): string {
    if (status === "completed") return "已完成";
    if (status === "overdue") return "已逾期";
    if (status === "archived") return "已归档";
    if (status === "planned") return "未开始";
    return "进行中";
  }
}
