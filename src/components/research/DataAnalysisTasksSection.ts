import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { openDataAnalysisTaskModal } from "../SectionContentActions";

export class DataAnalysisTasksSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getDataAnalysisTasks().forEach((task) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      const head = row.createDiv({ cls: "cow-list-item-head" });
      head.createEl("strong", { text: task.title });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑任务" } });
      setIcon(edit, "pencil");
      edit.addEventListener("click", () => openDataAnalysisTaskModal(this.app, async (values) => {
        await this.store.updateDataAnalysisTask(task.id, values);
        this.onDataChanged();
      }, task));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除任务" } });
      setIcon(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteDataAnalysisTask(task.id);
        this.onDataChanged();
      });
      const meta = row.createDiv({ cls: "cow-meta-line" });
      meta.createSpan({ cls: "cow-status is-green", text: task.status });
      meta.createSpan({ text: `${task.progress}%` });
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: "cow-month-progress-fill is-green", attr: { style: `width: ${task.progress}%` } });
    });
  }
}
