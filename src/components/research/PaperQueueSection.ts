import { App, Notice, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { openResearchPaperModal } from "../SectionContentActions";

export class PaperQueueSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getResearchPapers().forEach((paper) => {
      const button = list.createEl("button", { cls: "cow-data-card cow-click-card", attr: { type: "button" } });
      const head = button.createDiv({ cls: "cow-list-item-head" });
      head.createEl("strong", { text: paper.title });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑论文" } });
      setIcon(edit, "pencil");
      edit.addEventListener("click", (event) => {
        event.stopPropagation();
        openResearchPaperModal(this.app, async (values) => {
          await this.store.updateResearchPaper(paper.id, values);
          this.onDataChanged();
        }, paper);
      });
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除论文" } });
      setIcon(remove, "trash-2");
      remove.addEventListener("click", async (event) => {
        event.stopPropagation();
        await this.store.deleteResearchPaper(paper.id);
        this.onDataChanged();
      });
      const meta = button.createDiv({ cls: "cow-meta-line" });
      meta.createSpan({ cls: "cow-status is-blue", text: paper.status });
      meta.createSpan({ text: `${paper.venue} ${paper.year}` });
      const track = button.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: "cow-month-progress-fill is-blue", attr: { style: `width: ${paper.readingProgress}%` } });
      button.addEventListener("click", () => void this.openNote(paper.notePath));
    });
  }

  private async openNote(notePath?: string): Promise<void> {
    if (!notePath) {
      new Notice("这篇文献还没有绑定笔记。");
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
