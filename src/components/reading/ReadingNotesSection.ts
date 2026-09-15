import { App, Modal, Notice, setIcon, TFile } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import type { BookItem } from "../../types/dashboard";
import { applyResizableModal } from "../ResizableModal";
import { AddBookModal } from "./AddBookModal";

export class ReadingNotesSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const list = container.createDiv({ cls: "cow-data-list cow-reading-note-list" });
    const booksWithNotes = this.store.getBooks().filter((book) => {
      if (!book.notePath) return false;
      const file = this.app.vault.getFileByPath(book.notePath);
      if (!file) {
        void this.clearMissingNote(book);
        return false;
      }
      return true;
    });

    if (booksWithNotes.length === 0) {
      list.createDiv({ cls: "cow-empty-state", text: "暂无已绑定的阅读笔记。" });
      return;
    }

    booksWithNotes.forEach((book) => {
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
      remove.addEventListener("click", (event) => {
        event.stopPropagation();
        new ReadingNoteDeleteModal(this.app, this.store, book, () => {
          this.onDataChanged();
        }).open();
      });
      button.createDiv({ cls: "cow-meta-line" }).createSpan({ text: book.notePath ?? "" });
      button.addEventListener("click", () => void this.openNote(book));
    });
  }

  private async clearMissingNote(book: BookItem): Promise<void> {
    await this.store.updateBook(book.id, { notePath: undefined });
    this.onDataChanged();
  }

  private async openNote(book: BookItem): Promise<void> {
    if (!book.notePath) {
      new Notice("这本书还没有绑定阅读笔记。");
      return;
    }
    const file = this.app.vault.getFileByPath(book.notePath);
    if (!file) {
      await this.clearMissingNote(book);
      new Notice("阅读笔记文件不存在，已清理无效关联。");
      return;
    }
    await this.app.workspace.getLeaf(false).openFile(file);
  }
}

class ReadingNoteDeleteModal extends Modal {
  constructor(
    app: App,
    private readonly store: DashboardStore,
    private readonly book: BookItem,
    private readonly onDone: () => void
  ) {
    super(app);
  }

  onOpen(): void {
    applyResizableModal(this, {
      className: "cute-reading-note-delete-modal",
      width: "min(560px, 90vw)",
      maxWidth: "96vw",
      maxHeight: "82vh",
      minWidth: "min(380px, 90vw)",
      minHeight: "min(260px, 72vh)"
    });
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-reading-note-delete-modal-content");
    this.contentEl.createEl("h2", { text: "处理阅读笔记" });
    this.contentEl.createEl("p", { text: `《${this.book.title}》绑定的笔记：${this.book.notePath ?? "无"}` });
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "仅从列表移除", attr: { type: "button" } }).addEventListener("click", () => void this.unlinkOnly());
    actions.createEl("button", { text: "删除笔记文件", cls: "mod-warning", attr: { type: "button" } }).addEventListener("click", () => void this.trashNoteFile());
  }

  private async unlinkOnly(): Promise<void> {
    await this.store.updateBook(this.book.id, { notePath: undefined });
    this.onDone();
    this.close();
  }

  private async trashNoteFile(): Promise<void> {
    const notePath = this.book.notePath;
    if (notePath) {
      const file = this.app.vault.getFileByPath(notePath);
      if (file instanceof TFile) {
        await this.app.vault.trash(file, true);
      }
    }
    await this.store.updateBook(this.book.id, { notePath: undefined });
    this.onDone();
    this.close();
  }
}
