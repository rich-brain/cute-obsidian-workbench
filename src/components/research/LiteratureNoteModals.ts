import { App, Modal, Notice, TFile } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import type { LiteratureNote, ResearchPaper } from "../../types/dashboard";
import { applyResizableModal } from "../ResizableModal";

export function openLiteratureNoteModal(app: App, store: DashboardStore, onDone: () => void, note?: LiteratureNote, preset?: Partial<LiteratureNote>): void {
  new LiteratureNoteModal(app, store, onDone, note, preset).open();
}

class LiteratureNoteModal extends Modal {
  private title: string;
  private notePath: string;
  private paperReadingId: string;
  private query = "";

  constructor(
    app: App,
    private readonly store: DashboardStore,
    private readonly onDone: () => void,
    private readonly note?: LiteratureNote,
    preset?: Partial<LiteratureNote>
  ) {
    super(app);
    this.title = note?.title ?? preset?.title ?? "";
    this.notePath = note?.notePath ?? preset?.notePath ?? "";
    this.paperReadingId = note?.paperReadingId ?? preset?.paperReadingId ?? "";
  }

  onOpen(): void {
    applyResizableModal(this, {
      className: "cute-literature-note-modal",
      width: "min(760px, 90vw)",
      maxWidth: "96vw",
      maxHeight: "92vh",
      minWidth: "min(520px, 90vw)",
      minHeight: "min(420px, 82vh)"
    });
    this.render();
  }

  private render(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-literature-note-modal");
    this.contentEl.createEl("h2", { text: this.note ? "编辑文献笔记" : "新增文献笔记" });
    const form = this.contentEl.createDiv({ cls: "cow-paper-form" });
    this.inputField(form, "标题", this.title, (value) => this.title = value);
    this.paperSelect(form);
    this.inputField(form, "搜索 Markdown", this.query, (value) => {
      this.query = value;
      this.render();
    });
    this.inputField(form, "笔记路径", this.notePath, (value) => this.notePath = value);
    this.renderNotePicker();
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", () => void this.save());
  }

  private paperSelect(container: HTMLElement): void {
    const row = container.createDiv({ cls: "cow-book-form-row" });
    row.createEl("label", { text: "所属论文" });
    const select = row.createEl("select");
    select.createEl("option", { value: "", text: "无" });
    this.store.getResearchPapers().forEach((paper) => select.createEl("option", { value: paper.id, text: paper.title }));
    select.value = this.paperReadingId;
    select.addEventListener("change", () => this.paperReadingId = select.value);
  }

  private renderNotePicker(): void {
    const list = this.contentEl.createDiv({ cls: "cow-note-picker-list" });
    const query = this.query.trim().toLowerCase();
    if (!query) {
      list.createDiv({ cls: "cow-empty-state", text: "输入关键词搜索 Vault 中的 Markdown 笔记，选择后会关联 notePath。" });
      return;
    }
    const files = this.app.vault.getMarkdownFiles()
      .filter((file) => `${file.basename} ${file.path}`.toLowerCase().includes(query))
      .slice(0, 20);
    files.forEach((file) => {
      const button = list.createEl("button", { cls: "cow-data-card cow-click-card", attr: { type: "button" } });
      button.createEl("strong", { text: file.basename });
      button.createDiv({ cls: "cow-meta-line", text: file.path });
      button.addEventListener("click", () => {
        this.title = this.title || file.basename;
        this.notePath = file.path;
        this.query = "";
        this.render();
      });
    });
  }

  private inputField(container: HTMLElement, label: string, value: string, onInput: (value: string) => void): HTMLInputElement {
    const row = container.createDiv({ cls: "cow-book-form-row" });
    row.createEl("label", { text: label });
    const input = row.createEl("input", { attr: { type: "text", value } });
    input.addEventListener("input", () => onInput(input.value));
    return input;
  }

  private async save(): Promise<void> {
    if (!this.title.trim()) {
      new Notice("请输入文献笔记标题。");
      return;
    }
    if (!this.notePath.trim()) {
      new Notice("请选择或填写 Markdown 笔记路径。");
      return;
    }
    const file = this.app.vault.getFileByPath(this.notePath);
    if (!(file instanceof TFile)) {
      new Notice("笔记文件不存在。");
      return;
    }
    const now = Date.now();
    const payload: LiteratureNote = {
      id: this.note?.id ?? `literature-note-${now}`,
      title: this.title.trim(),
      notePath: file.path,
      paperReadingId: this.paperReadingId || undefined,
      createdAt: this.note?.createdAt ?? now,
      updatedAt: now
    };
    if (this.note) await this.store.updateLiteratureNote(this.note.id, payload);
    else await this.store.upsertLiteratureNote(payload);
    this.onDone();
    this.close();
  }
}

export class MissingLiteratureNoteModal extends Modal {
  constructor(
    app: App,
    private readonly store: DashboardStore,
    private readonly note: LiteratureNote,
    private readonly onDone: () => void
  ) {
    super(app);
  }

  onOpen(): void {
    applyResizableModal(this, {
      className: "cute-literature-note-modal",
      width: "min(560px, 90vw)",
      maxWidth: "96vw",
      maxHeight: "84vh",
      minWidth: "min(420px, 90vw)",
      minHeight: "min(260px, 70vh)"
    });
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: "笔记文件不存在" });
    this.contentEl.createEl("p", { text: this.note.notePath });
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "重新关联", attr: { type: "button" } }).addEventListener("click", () => {
      this.close();
      openLiteratureNoteModal(this.app, this.store, this.onDone, this.note);
    });
    actions.createEl("button", { text: "清理失效链接", cls: "mod-warning", attr: { type: "button" } }).addEventListener("click", () => void this.clear());
  }

  private async clear(): Promise<void> {
    await this.store.deleteLiteratureNote(this.note.id);
    this.onDone();
    this.close();
  }
}

export class DeleteLiteratureNoteModal extends Modal {
  constructor(
    app: App,
    private readonly store: DashboardStore,
    private readonly note: LiteratureNote,
    private readonly onDone: () => void
  ) {
    super(app);
  }

  onOpen(): void {
    applyResizableModal(this, {
      className: "cute-literature-note-modal",
      width: "min(580px, 90vw)",
      maxWidth: "96vw",
      maxHeight: "84vh",
      minWidth: "min(420px, 90vw)",
      minHeight: "min(300px, 70vh)"
    });
    this.render();
  }

  private render(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-delete-modal");
    this.contentEl.createEl("h2", { text: "删除文献笔记" });
    const summary = this.contentEl.createDiv({ cls: "cow-delete-summary" });
    summary.createSpan({ text: "笔记：" });
    summary.createEl("strong", { text: `《${this.note.title}》` });
    const description = this.contentEl.createDiv({ cls: "cow-delete-description" });
    description.createEl("p", { text: "可以只从科研文献笔记中移除记录，也可以同时把对应 Markdown 移入回收站。" });
    description.createEl("p", { text: "不会删除 Zotero 条目、Zotero PDF 或其它本地论文文件。" });
    description.createDiv({ cls: "cow-meta-line", text: this.note.notePath });
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "仅从科研文献笔记中移除", attr: { type: "button" } }).addEventListener("click", () => void this.removeRecordOnly());
    actions.createEl("button", { text: "同时删除 Obsidian 笔记文件", cls: "mod-warning", attr: { type: "button" } }).addEventListener("click", () => void this.trashMarkdownAndRemove());
  }

  private async removeRecordOnly(): Promise<void> {
    await this.store.deleteLiteratureNote(this.note.id);
    new Notice("文献笔记记录已移除，Markdown 文件已保留。");
    this.onDone();
    this.close();
  }

  private async trashMarkdownAndRemove(): Promise<void> {
    const file = this.app.vault.getFileByPath(this.note.notePath);
    if (file instanceof TFile) {
      await this.app.vault.trash(file, true);
    } else {
      new Notice("笔记文件不存在，已清理科研记录。");
    }
    await this.store.deleteLiteratureNote(this.note.id, { clearPaperNotePath: true });
    new Notice("文献笔记已移除。");
    this.onDone();
    this.close();
  }
}

export async function openLiteratureNoteFile(app: App, store: DashboardStore, note: LiteratureNote, onDone: () => void): Promise<void> {
  const file = app.vault.getFileByPath(note.notePath);
  if (!(file instanceof TFile)) {
    new MissingLiteratureNoteModal(app, store, note, onDone).open();
    return;
  }
  await app.workspace.getLeaf(false).openFile(file);
}

export function paperLabel(paper: ResearchPaper | undefined): string {
  return paper?.title ?? "未关联论文";
}
