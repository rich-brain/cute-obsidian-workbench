import { App, Notice } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";

export class LiteratureNotesSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore
  ) {}

  render(container: HTMLElement): void {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getResearchPapers().forEach((paper) => {
      const button = list.createEl("button", { cls: "cow-data-card cow-click-card", attr: { type: "button" } });
      button.createEl("strong", { text: paper.title });
      button.createDiv({ cls: "cow-meta-line" }).createSpan({ text: paper.notePath ?? "未绑定笔记" });
      button.addEventListener("click", () => void this.openNote(paper.notePath));
    });
  }

  private async openNote(notePath?: string): Promise<void> {
    if (!notePath) {
      new Notice("还没有绑定文献笔记。");
      return;
    }
    const file = this.app.vault.getFileByPath(notePath);
    if (file) await this.app.workspace.getLeaf(false).openFile(file);
  }
}
