import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import type { LiteratureNote } from "../../types/dashboard";
import { DeleteLiteratureNoteModal, openLiteratureNoteFile, openLiteratureNoteModal, paperLabel } from "./LiteratureNoteModals";

export class LiteratureNotesSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const list = container.createDiv({ cls: "cow-data-list" });
    const validPaths = new Set(this.app.vault.getMarkdownFiles().map((file) => file.path));
    const allNotes = this.store.getLiteratureNotes();
    const notes = allNotes.filter((note) => validPaths.has(note.notePath));
    if (notes.length !== allNotes.length) {
      void this.store.cleanupInvalidLiteratureNotes(validPaths).then((removed) => {
        if (removed > 0) this.onDataChanged();
      });
    }
    if (notes.length === 0) {
      list.createDiv({ cls: "cow-empty-state", text: "暂无文献笔记。可以从右上角添加，或在论文详情中关联已有笔记。" });
      return;
    }
    notes.forEach((note) => this.renderNote(list, note));
  }

  private renderNote(container: HTMLElement, note: LiteratureNote): void {
    const card = container.createDiv({ cls: "cow-data-card cow-literature-note-row" });
    const body = card.createDiv({ cls: "cow-paper-body" });
    const head = body.createDiv({ cls: "cow-list-item-head" });
    const title = head.createEl("button", { cls: "cow-paper-title-button", text: note.title, attr: { type: "button" } });
    title.addEventListener("click", () => void openLiteratureNoteFile(this.app, this.store, note, this.onDataChanged));
    const actions = head.createDiv({ cls: "cow-list-item-actions" });
    const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑文献笔记" } });
    setIcon(edit, "pencil");
    edit.addEventListener("click", (event) => {
      event.stopPropagation();
      openLiteratureNoteModal(this.app, this.store, this.onDataChanged, note);
    });
    const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "清理文献笔记关联" } });
    setIcon(remove, "trash-2");
    remove.addEventListener("click", (event) => {
      event.stopPropagation();
      new DeleteLiteratureNoteModal(this.app, this.store, note, this.onDataChanged).open();
    });
    const paper = this.store.getResearchPapers().find((item) => item.id === note.paperReadingId);
    body.createDiv({ cls: "cow-meta-line", text: paperLabel(paper) });
    body.createDiv({ cls: "cow-meta-line", text: note.notePath });
  }
}
