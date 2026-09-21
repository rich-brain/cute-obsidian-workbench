import { App, Modal, Notice, setIcon, TFile } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import type { BookItem, ReadingNote } from "../../types/dashboard";
import { applyResizableModal } from "../ResizableModal";
import { MarkdownFilePicker, openVaultMarkdown } from "../research/MarkdownFilePicker";

export class ReadingNotesSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const notes = this.store.getReadingNotes();
    const list = container.createDiv({ cls: "cow-data-list cow-reading-note-list" });
    if (notes.length === 0) {
      list.createDiv({ cls: "cow-empty-state", text: "暂无已绑定的阅读笔记。可以从下方选择已有 Vault Markdown 关联到书籍。" });
    } else {
      notes.forEach((note) => this.renderNote(list, note));
    }

    const add = container.createEl("button", { cls: "cow-bottom-add-button", attr: { type: "button" } });
    setIcon(add.createSpan(), "plus");
    add.createSpan({ text: "添加阅读笔记" });
    add.addEventListener("click", () => openReadingNoteModal(this.app, this.store, this.onDataChanged));
  }

  private renderNote(container: HTMLElement, note: ReadingNote): void {
    const book = this.store.getBooks().find((item) => item.id === note.bookId);
    const card = container.createDiv({ cls: "cow-data-card cow-reading-note-card" });
    const head = card.createDiv({ cls: "cow-list-item-head" });
    const title = head.createEl("button", { cls: "cow-link-button", text: note.title, attr: { type: "button", title: note.title } });
    title.addEventListener("click", () => void this.openNote(note));
    const actions = head.createDiv({ cls: "cow-list-item-actions" });
    this.iconButton(actions, "external-link", "打开阅读笔记", () => void this.openNote(note));
    this.iconButton(actions, "pencil", "编辑关联", () => openReadingNoteModal(this.app, this.store, this.onDataChanged, note));
    this.iconButton(actions, "trash-2", "删除关联", () => new ReadingNoteDeleteModal(this.app, this.store, note, this.onDataChanged).open());
    card.createDiv({ cls: "cow-meta-line", text: book ? `关联书籍：${book.title}` : "关联书籍：未找到书籍记录" });
    card.createDiv({ cls: "cow-meta-line", text: note.notePath });
  }

  private async openNote(note: ReadingNote): Promise<void> {
    const file = this.app.vault.getFileByPath(note.notePath);
    if (!(file instanceof TFile)) {
      new Notice("阅读笔记文件不存在。");
      return;
    }
    await this.app.workspace.getLeaf(false).openFile(file);
  }

  private iconButton(container: HTMLElement, icon: string, label: string, onClick: () => void): void {
    const button = container.createEl("button", { attr: { type: "button", "aria-label": label } });
    setIcon(button, icon);
    button.addEventListener("click", onClick);
  }
}

export function openReadingNoteModal(
  app: App,
  store: DashboardStore,
  onDataChanged: () => void,
  note?: ReadingNote
): void {
  new ReadingNoteModal(app, store, onDataChanged, note).open();
}

export async function openReadingNoteForBook(app: App, store: DashboardStore, book: BookItem): Promise<void> {
  const notes = store.getReadingNotesForBook(book.id);
  if (notes.length === 0) {
    new Notice("这本书还没有绑定阅读笔记。");
    return;
  }
  if (notes.length === 1) {
    await openVaultMarkdown(app, notes[0].notePath);
    return;
  }
  new ReadingNoteChoiceModal(app, notes).open();
}

class ReadingNoteModal extends Modal {
  private selectedBookId: string;
  private noteTitle: string;
  private notePath: string;

  constructor(
    app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void,
    private readonly note?: ReadingNote
  ) {
    super(app);
    this.selectedBookId = note?.bookId ?? store.getBooks()[0]?.id ?? "";
    this.noteTitle = note?.title ?? "";
    this.notePath = note?.notePath ?? "";
  }

  onOpen(): void {
    applyResizableModal(this, {
      className: "cute-reading-note-modal",
      width: "min(760px, 90vw)",
      height: "min(640px, 86vh)",
      maxWidth: "96vw",
      maxHeight: "92vh",
      minWidth: "min(500px, 92vw)",
      minHeight: "min(420px, 82vh)"
    });
    this.render();
  }

  private render(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-reading-note-modal-content");
    this.contentEl.createEl("h2", { text: this.note ? "编辑阅读笔记关联" : "添加阅读笔记" });
    const form = this.contentEl.createDiv({ cls: "cow-book-form cow-reading-note-form" });
    this.renderBookSelect(form);
    this.renderTitleField(form);
    new MarkdownFilePicker(this.app, {
      label: "关联 Markdown",
      placeholder: "搜索 Vault 中的 Markdown 文件……",
      value: this.notePath,
      onChange: (path: string) => {
        this.notePath = path;
        if (!this.noteTitle) this.noteTitle = fileName(path);
      }
    }).render(form);
    this.renderActions();
  }

  private renderBookSelect(container: HTMLElement): void {
    const row = container.createDiv({ cls: "cow-book-form-row" });
    row.createEl("label", { text: "关联书籍" });
    const select = row.createEl("select");
    this.store.getBooks().forEach((book) => select.createEl("option", { value: book.id, text: `${book.title} · ${book.author}` }));
    select.value = this.selectedBookId;
    select.addEventListener("change", () => this.selectedBookId = select.value);
  }

  private renderTitleField(container: HTMLElement): void {
    const row = container.createDiv({ cls: "cow-book-form-row" });
    row.createEl("label", { text: "笔记标题" });
    const input = row.createEl("input", { value: this.noteTitle, attr: { type: "text", placeholder: "默认使用 Markdown 文件名" } });
    input.addEventListener("input", () => this.noteTitle = input.value);
  }

  private renderActions(): void {
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", () => void this.save());
  }

  private async save(): Promise<void> {
    if (!this.selectedBookId) {
      new Notice("请先选择一本书。");
      return;
    }
    const file = this.app.vault.getFileByPath(this.notePath);
    if (!(file instanceof TFile)) {
      new Notice("请选择一个存在的 Vault Markdown 文件。");
      return;
    }
    const now = new Date().toISOString();
    const payload: ReadingNote = {
      id: this.note?.id ?? `reading-note-${Date.now()}`,
      title: this.noteTitle.trim() || file.basename,
      notePath: file.path,
      bookId: this.selectedBookId,
      createdAt: this.note?.createdAt ?? now,
      updatedAt: now
    };
    if (this.note) await this.store.updateReadingNote(this.note.id, payload);
    else await this.store.addReadingNote(payload);
    this.onDataChanged();
    this.close();
  }
}

class ReadingNoteDeleteModal extends Modal {
  constructor(
    app: App,
    private readonly store: DashboardStore,
    private readonly note: ReadingNote,
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
      minHeight: "min(240px, 70vh)"
    });
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-reading-note-delete-modal-content");
    this.contentEl.createEl("h2", { text: "删除阅读笔记关联" });
    this.contentEl.createEl("p", { text: `将从工作台移除“${this.note.title}”的关联记录，不会删除 Vault 中的 Markdown 文件。` });
    this.contentEl.createDiv({ cls: "cow-meta-line", text: this.note.notePath });
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "删除关联", cls: "mod-warning", attr: { type: "button" } }).addEventListener("click", () => void this.unlinkOnly());
  }

  private async unlinkOnly(): Promise<void> {
    await this.store.deleteReadingNote(this.note.id);
    this.onDone();
    this.close();
  }
}

class ReadingNoteChoiceModal extends Modal {
  constructor(app: App, private readonly notes: ReadingNote[]) {
    super(app);
  }

  onOpen(): void {
    applyResizableModal(this, {
      className: "cute-reading-note-choice-modal",
      width: "min(560px, 90vw)",
      maxWidth: "96vw",
      maxHeight: "82vh",
      minWidth: "min(360px, 90vw)",
      minHeight: "min(260px, 70vh)"
    });
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-reading-note-choice-modal-content");
    this.contentEl.createEl("h2", { text: "选择阅读笔记" });
    const list = this.contentEl.createDiv({ cls: "cow-data-list" });
    this.notes.forEach((note) => {
      const button = list.createEl("button", { cls: "cow-data-card cow-click-card", attr: { type: "button" } });
      button.createEl("strong", { text: note.title });
      button.createDiv({ cls: "cow-meta-line", text: note.notePath });
      button.addEventListener("click", () => {
        void openVaultMarkdown(this.app, note.notePath);
        this.close();
      });
    });
  }
}

function fileName(path: string): string {
  return path.split(/[\\/]/).pop()?.replace(/\.md$/i, "") ?? "";
}
