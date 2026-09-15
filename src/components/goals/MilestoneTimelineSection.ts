import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { openGoalActionModal, statusLabel } from "./GoalActionModals";

export class MilestoneTimelineSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const milestones = this.store.getGoalActions().filter((action) => action.isMilestone).sort((left, right) => (left.milestoneDate ?? left.deadline ?? "").localeCompare(right.milestoneDate ?? right.deadline ?? ""));
    const timeline = container.createDiv({ cls: "cow-goal-timeline" });
    if (milestones.length === 0) {
      timeline.createDiv({ cls: "cow-empty-state", text: "还没有里程碑，点击右上角新增里程碑。" });
    }
    milestones.forEach((milestone) => {
      const goal = this.store.getGoals().find((item) => item.id === milestone.goalId);
      const date = milestone.milestoneDate ?? milestone.deadline ?? "";
      const item = timeline.createDiv({ cls: `cow-goal-timeline-item is-${milestone.status}` });
      item.createEl("time", { text: date || "--" });
      item.createEl("strong", { text: milestone.title });
      item.createSpan({ text: `${goal?.title ?? "未关联目标"} · ${statusLabel(milestone.status)}` });
      const actions = item.createDiv({ cls: "cow-list-item-actions" });
      const complete = actions.createEl("button", { attr: { type: "button", "aria-label": "切换完成状态" } });
      setIcon(complete, milestone.status === "completed" ? "rotate-ccw" : "check");
      complete.addEventListener("click", async () => {
        await this.store.toggleGoalActionCompleted(milestone.id);
        this.onDataChanged();
      });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑里程碑" } });
      setIcon(edit, "pencil");
      edit.addEventListener("click", () => openGoalActionModal(this.app, this.store, this.onDataChanged, milestone));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除里程碑" } });
      setIcon(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteGoalAction(milestone.id);
        this.onDataChanged();
      });
    });
  }
}
