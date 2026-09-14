import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { MilestoneModal } from "./GoalModals";
import { CrudItemModal } from "../CrudItemModal";

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
      const actions = item.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑里程碑" } });
      setIcon(edit, "pencil");
      edit.addEventListener("click", () => {
        new CrudItemModal(this.app, "编辑里程碑", {
          title: milestone.title,
          date: milestone.date,
          status: milestone.status
        }, [
          { key: "title", name: "标题" },
          { key: "date", name: "日期" },
          { key: "status", name: "状态", type: "select", options: ["未开始", "进行中", "已完成"].map((value) => ({ value, label: value })) }
        ], async (values) => {
          await this.store.updateMilestone(milestone.id, values);
          this.onDataChanged();
        }).open();
      });
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除里程碑" } });
      setIcon(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteMilestone(milestone.id);
        this.onDataChanged();
      });
    });
  }
}
