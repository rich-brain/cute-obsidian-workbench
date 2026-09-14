import { App, TFile } from "obsidian";

export class RecentNotesSection {
  constructor(private readonly app: App) {}

  render(container: HTMLElement): void {
    const files = this.app.vault
      .getMarkdownFiles()
      .sort((left, right) => right.stat.mtime - left.stat.mtime)
      .slice(0, 5);

    if (files.length === 0) {
      container.createEl("p", { cls: "cow-empty-state", text: "还没有 Markdown 笔记。" });
      return;
    }

    const list = container.createEl("ul", { cls: "cow-recent-notes" });
    files.forEach((file) => {
      const item = list.createEl("li");
      const button = item.createEl("button", { attr: { type: "button" } });
      button.createSpan({ text: file.basename });
      button.createEl("time", { text: this.formatTime(file.stat.mtime) });
      button.addEventListener("click", async () => this.openFile(file));
    });
  }

  private async openFile(file: TFile): Promise<void> {
    const leaf = this.app.workspace.getLeaf(false);
    await leaf.openFile(file);
  }

  private formatTime(timestamp: number): string {
    return new Date(timestamp).toLocaleString("zh-CN", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
  }
}
