import { App, Notice, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import type { BookItem } from "../../types/dashboard";
import { AddBookModal } from "./AddBookModal";

export class ReadingNotesSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getBooks().forEach((book) => {
      const button = list.createEl("button", { cls: "cow-data-card cow-click-card", attr: { type: "button" } });
      const head = button.createDiv({ cls: "cow-list-item-head" });
      head.createEl("strong", { text: book.title });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑阅读笔记" } });
      setIcon(edit, "pencil");
      edit.addEventListener("click", (event) => {
        event.stopPropagation();
        new AddBookModal(this.app, this.store, () => {
          this.onDataChanged();
        }, book).open();
      });
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除阅读笔记" } });
      setIcon(remove, "trash-2");
      remove.addEventListener("click", async (event) => {
        event.stopPropagation();
        if (!book.notePath) return;
        if (!confirm(`解绑《${book.title}》的阅读笔记？不会删除 Markdown 文件。`)) return;
        await this.store.updateBook(book.id, { notePath: undefined });
        this.onDataChanged();
      });
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
