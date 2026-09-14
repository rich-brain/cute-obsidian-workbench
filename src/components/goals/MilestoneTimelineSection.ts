import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { MilestoneModal } from "./GoalModals";

export class MilestoneTimelineSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const add = container.createEl("button", { cls: "cow-small-action", attr: { type: "button" } });
    setIcon(add.createSpan(), "plus");
    add.createSpan({ text: "新增里程碑" });
    add.addEventListener("click", () => {
      new MilestoneModal(this.app, this.store.getGoals(), async (milestone) => {
        await this.store.addMilestone(milestone);
        this.onDataChanged();
      }).open();
    });

    const timeline = container.createDiv({ cls: "cow-timeline" });
    this.store.getMilestones().forEach((milestone) => {
      const item = timeline.createDiv({ cls: "cow-timeline-item priority-medium" });
      item.createEl("time", { text: milestone.date });
      item.createEl("strong", { text: milestone.title });
      item.createSpan({ text: milestone.status });
    });
  }
}
