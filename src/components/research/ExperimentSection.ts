import { App, Notice, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import type { ExperimentPlan } from "../../types/dashboard";
import { DeleteExperimentPlanModal, ExperimentPlanDetailModal, ExperimentRecordDetailModal, openExperimentEditModal } from "./ExperimentModals";

export class ExperimentSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly mode: "plan" | "records",
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const items = this.mode === "plan" ? this.store.getExperimentPlans() : this.store.getExperimentRecords();
    const list = container.createDiv({ cls: "cow-data-list" });
    items.forEach((item) => this.renderItem(list, item));
  }

  private renderItem(container: HTMLElement, item: ExperimentPlan): void {
    const button = container.createEl("button", { cls: "cow-data-card cow-click-card", attr: { type: "button" } });
    const head = button.createDiv({ cls: "cow-list-item-head" });
    head.createEl("strong", { text: item.title });
    const actions = head.createDiv({ cls: "cow-list-item-actions" });
    const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑实验" } });
    setIcon(edit, "pencil");
    edit.addEventListener("click", (event) => {
      event.stopPropagation();
      openExperimentEditModal(this.app, this.store, this.mode, this.onDataChanged, item);
    });
    const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除实验" } });
    setIcon(remove, "trash-2");
    remove.addEventListener("click", async (event) => {
      event.stopPropagation();
      if (this.mode === "plan") {
        new DeleteExperimentPlanModal(this.app, this.store, item, this.onDataChanged).open();
        return;
      }
      if (!confirm("删除实验记录？不会删除关联 Markdown。")) return;
      await this.store.deleteExperiment(this.mode, item.id);
      this.onDataChanged();
    });
    const meta = button.createDiv({ cls: "cow-meta-line" });
    meta.createSpan({ cls: "cow-status is-yellow", text: item.status });
    meta.createSpan({ text: item.date });
    if (this.mode === "records") {
      const plan = this.store.getExperimentPlans().find((plan) => plan.id === item.experimentPlanId);
      meta.createSpan({ text: plan ? `所属计划：${plan.title}` : "未关联计划" });
    }
    button.addEventListener("click", () => {
      if (this.mode === "plan") new ExperimentPlanDetailModal(this.app, this.store, item, this.onDataChanged).open();
      else new ExperimentRecordDetailModal(this.app, this.store, item, this.onDataChanged).open();
    });
  }

  private async openNote(notePath?: string): Promise<void> {
    if (!notePath) {
      new Notice("这条实验记录还没有绑定 Markdown。");
      return;
    }
    const file = this.app.vault.getFileByPath(notePath);
    if (!file) {
      new Notice(`没有找到笔记：${notePath}`);
      return;
    }
    await this.app.workspace.getLeaf(false).openFile(file);
  }
}
