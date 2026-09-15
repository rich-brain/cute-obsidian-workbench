import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import type { LiteratureNote } from "../../types/dashboard";
import { MissingLiteratureNoteModal, openLiteratureNoteFile, openLiteratureNoteModal, paperLabel } from "./LiteratureNoteModals";

export class LiteratureNotesSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const list = container.createDiv({ cls: "cow-data-list" });
    const notes = this.store.getLiteratureNotes();
    if (notes.length === 0) {
      list.createDiv({ cls: "cow-empty-state", text: "暂无文献笔记。可以从右上角添加，或在论文详情中关联已有笔记。" });
      return;
    }
    notes.forEach((note) => this.renderNote(list, note));
  }

  private renderNote(container: HTMLElement, note: LiteratureNote): void {
    const button = container.createEl("button", { cls: "cow-data-card cow-click-card", attr: { type: "button" } });
    const head = button.createDiv({ cls: "cow-list-item-head" });
    head.createEl("strong", { text: note.title });
    const actions = head.createDiv({ cls: "cow-list-item-actions" });
    const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑文献笔记" } });
    setIcon(edit, "pencil");
    edit.addEventListener("click", (event) => {
      event.stopPropagation();
      openLiteratureNoteModal(this.app, this.store, this.onDataChanged, note);
    });
    const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "清理文献笔记关联" } });
    setIcon(remove, "unlink");
    remove.addEventListener("click", (event) => {
      event.stopPropagation();
      new MissingLiteratureNoteModal(this.app, this.store, note, this.onDataChanged).open();
    });
    const paper = this.store.getResearchPapers().find((item) => item.id === note.paperReadingId);
    button.createDiv({ cls: "cow-meta-line", text: paperLabel(paper) });
    button.createDiv({ cls: "cow-meta-line", text: note.notePath });
    button.addEventListener("click", () => void openLiteratureNoteFile(this.app, this.store, note, this.onDataChanged));
  }
}
