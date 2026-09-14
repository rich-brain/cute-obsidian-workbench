import { App, Notice, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { openExperimentModal } from "../SectionContentActions";

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
    items.forEach((item) => {
      const button = list.createEl("button", { cls: "cow-data-card cow-click-card", attr: { type: "button" } });
      const head = button.createDiv({ cls: "cow-list-item-head" });
      head.createEl("strong", { text: item.title });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑实验" } });
      setIcon(edit, "pencil");
      edit.addEventListener("click", (event) => {
        event.stopPropagation();
        openExperimentModal(this.app, async (values) => {
          await this.store.updateExperiment(this.mode, item.id, values);
          this.onDataChanged();
        }, item);
      });
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除实验" } });
      setIcon(remove, "trash-2");
      remove.addEventListener("click", async (event) => {
        event.stopPropagation();
        await this.store.deleteExperiment(this.mode, item.id);
        this.onDataChanged();
      });
      const meta = button.createDiv({ cls: "cow-meta-line" });
      meta.createSpan({ cls: "cow-status is-yellow", text: item.status });
      meta.createSpan({ text: item.date });
      button.addEventListener("click", () => void this.openNote(item.notePath));
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
