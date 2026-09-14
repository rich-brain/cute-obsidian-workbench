import { App, Notice } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import type { BookItem } from "../../types/dashboard";

export class ReadingNotesSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore
  ) {}

  render(container: HTMLElement): void {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getBooks().forEach((book) => {
      const button = list.createEl("button", { cls: "cow-data-card cow-click-card", attr: { type: "button" } });
      button.createEl("strong", { text: book.title });
      button.createDiv({ cls: "cow-meta-line" }).createSpan({ text: book.notePath ?? "未绑定阅读笔记" });
      button.addEventListener("click", () => void this.openNote(book));
    });
  }

  private async openNote(book: BookItem): Promise<void> {
    if (!book.notePath) {
      new Notice("这本书还没有绑定阅读笔记。");
      return;
    }
    const file = this.app.vault.getFileByPath(book.notePath);
    if (file) await this.app.workspace.getLeaf(false).openFile(file);
  }
}
