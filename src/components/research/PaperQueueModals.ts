import { App, Modal, Notice, setIcon, TFile } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import type { ZoteroPaperImportInput } from "../../core/DashboardStore";
import type { PaperStatusDefinition, PaperTagDefinition, ResearchPaper, VenueDefinition } from "../../types/dashboard";
import { applyResizableModal } from "../ResizableModal";
import { ZoteroImportCandidate, ZoteroService } from "../../services/ZoteroService";
import { openLiteratureNoteFile, openLiteratureNoteModal } from "./LiteratureNoteModals";

type FieldKind = "status" | "venue" | "tag";

export class PaperQueueManagerModal extends Modal {
  constructor(app: App, private readonly store: DashboardStore, private readonly onDone: () => void) {
    super(app);
  }

  onOpen(): void {
    applyResizableModal(this, {
      className: "cute-paper-manager-modal",
      width: "min(1050px, 92vw)",
      height: "min(720px, 86vh)",
      maxWidth: "96vw",
      maxHeight: "94vh",
      minWidth: "min(560px, 92vw)",
      minHeight: "min(420px, 82vh)"
    });
    this.render();
  }

  private render(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-paper-modal");
    const head = this.contentEl.createDiv({ cls: "cow-list-item-head" });
    head.createEl("h2", { text: "论文阅读队列管理" });
    const actions = head.createDiv({ cls: "cow-list-item-actions" });
    const add = actions.createEl("button", { cls: "cow-section-add-button", attr: { type: "button" } });
    setIcon(add.createSpan(), "plus");
    add.createSpan({ text: "手动添加" });
    add.addEventListener("click", () => new PaperEditModal(this.app, this.store, () => {
      this.onDone();
      this.render();
    }).open());
    const zotero = actions.createEl("button", { cls: "cow-section-add-button", attr: { type: "button" } });
    setIcon(zotero.createSpan(), "download");
    zotero.createSpan({ text: "从 Zotero 导入" });
    zotero.addEventListener("click", () => new ZoteroPaperImportModal(this.app, this.store, () => {
      this.onDone();
      this.render();
    }).open());
    const update = actions.createEl("button", { cls: "cow-section-add-button", attr: { type: "button" } });
    setIcon(update.createSpan(), "refresh-cw");
    update.createSpan({ text: "更新 Zotero 条目" });
    update.addEventListener("click", () => void this.updateZoteroLinkedPapers());

    const list = this.contentEl.createDiv({ cls: "cow-paper-manager-list" });
    this.store.getResearchPapers().forEach((paper) => this.renderPaperRow(list, paper));
  }

  private renderPaperRow(container: HTMLElement, paper: ResearchPaper): void {
    const row = container.createDiv({ cls: "cow-paper-card" });
    const body = row.createDiv({ cls: "cow-paper-body" });
    body.createEl("strong", { text: paper.title });
    body.createDiv({ cls: "cow-meta-line", text: paperMetaText(this.store, paper) });
    const actions = row.createDiv({ cls: "cow-list-item-actions" });
    iconButton(actions, "pencil", "编辑论文", () => new PaperEditModal(this.app, this.store, () => {
      this.onDone();
      this.render();
    }, paper).open());
    iconButton(actions, "trash-2", "删除论文", async () => {
      if (!confirm("删除论文条目？不会删除 Markdown 笔记、PDF 或 Zotero 条目。")) return;
      await this.store.deleteResearchPaper(paper.id);
      this.onDone();
      this.render();
    });
  }

  private async updateZoteroLinkedPapers(): Promise<void> {
    const candidates = await loadZoteroCandidates(this.app, this.store);
    if (candidates.length === 0) return;
    const linked = this.store.getResearchPapers().filter((paper) => paper.zoteroItemKey || paper.citekey || paper.doi || paper.paperUrl);
    const matches = linked
      .map((paper) => candidates.find((candidate) => candidateMatchesPaper(candidate, paper)))
      .filter(Boolean) as ZoteroImportCandidate[];
    if (matches.length === 0) {
      new Notice("没有找到可更新的 Zotero 条目，本地论文已保留。");
      return;
    }
    const result = await this.store.importZoteroPapers(matches);
    new Notice(`Zotero 更新完成：新增 ${result.created}，更新 ${result.updated}，跳过 ${result.skipped}。`);
    this.onDone();
    this.render();
  }
}

export class PaperDetailModal extends Modal {
  constructor(app: App, private readonly store: DashboardStore, private readonly paper: ResearchPaper, private readonly onDone: () => void) {
    super(app);
  }

  onOpen(): void {
    applyResizableModal(this, {
      className: "cute-paper-edit-modal",
      width: "min(760px, 90vw)",
      maxWidth: "96vw",
      maxHeight: "92vh",
      minWidth: "min(520px, 90vw)",
      minHeight: "min(360px, 78vh)"
    });
    this.render();
  }

  private render(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-paper-modal");
    const paper = this.store.getResearchPapers().find((item) => item.id === this.paper.id) ?? this.paper;
    const header = this.contentEl.createDiv({ cls: "cow-list-item-head" });
    header.createEl("h2", { text: paper.title });
    const edit = header.createEl("button", { cls: "cow-section-add-button", attr: { type: "button" } });
    setIcon(edit.createSpan(), "pencil");
    edit.createSpan({ text: "编辑" });
    edit.addEventListener("click", () => new PaperEditModal(this.app, this.store, () => {
      this.onDone();
      this.render();
    }, paper).open());
    const refresh = header.createEl("button", { cls: "cow-section-add-button", attr: { type: "button" } });
    setIcon(refresh.createSpan(), "refresh-cw");
    refresh.createSpan({ text: "重新从 Zotero 更新" });
    refresh.addEventListener("click", () => void this.updateFromZotero(paper));
    const importNote = header.createEl("button", { cls: "cow-section-add-button", attr: { type: "button" } });
    setIcon(importNote.createSpan(), "notebook-tabs");
    importNote.createSpan({ text: "导入/更新 Zotero 笔记" });
    importNote.addEventListener("click", () => void this.importZoteroNote(paper));
    const linkNote = header.createEl("button", { cls: "cow-section-add-button", attr: { type: "button" } });
    setIcon(linkNote.createSpan(), "link");
    linkNote.createSpan({ text: "关联已有笔记" });
    linkNote.addEventListener("click", () => openLiteratureNoteModal(this.app, this.store, () => {
      this.onDone();
      this.render();
    }, undefined, { paperReadingId: paper.id, title: `${paper.title} 笔记` }));

    const details = this.contentEl.createDiv({ cls: "cow-paper-detail-grid" });
    [
      ["会议 / 期刊", venueName(this.store, paper)],
      ["年份", String(paper.year ?? "")],
      ["状态", statusName(this.store, paper)],
      ["阅读进度", `${paper.readingProgress}%`],
      ["研究项目", this.store.getResearchProjects().find((project) => project.id === paper.researchProjectId)?.title ?? "未关联"],
      ["论文链接", paper.paperUrl ?? "未填写"],
      ["阅读日期", `${paper.readingStartDate ?? "-"} → ${paper.readingEndDate ?? "-"}`],
      ["标签", tagNames(this.store, paper).join(" · ") || "无标签"],
      ["Zotero", paper.zoteroItemKey || paper.citekey ? [paper.zoteroItemKey, paper.citekey].filter(Boolean).join(" · ") : "预留，暂未导入"]
    ].forEach(([label, value]) => {
      const item = details.createDiv({ cls: "cow-data-card" });
      item.createEl("strong", { text: label });
      item.createSpan({ text: value });
    });
    this.renderLiteratureNotes(paper);
  }

  private async updateFromZotero(paper: ResearchPaper): Promise<void> {
    const candidates = await loadZoteroCandidates(this.app, this.store);
    const match = candidates.find((candidate) => candidateMatchesPaper(candidate, paper));
    if (!match) {
      new Notice("Zotero 条目未找到，本地论文已保留。");
      return;
    }
    const result = await this.store.importZoteroPapers([match]);
    new Notice(`Zotero 更新完成：新增 ${result.created}，更新 ${result.updated}，跳过 ${result.skipped}。`);
    this.onDone();
    this.render();
  }

  private renderLiteratureNotes(paper: ResearchPaper): void {
    const section = this.contentEl.createDiv({ cls: "cow-paper-linked-notes" });
    section.createEl("h3", { text: "文献笔记" });
    const notes = this.store.getLiteratureNotesForPaper(paper.id);
    if (notes.length === 0) {
      section.createDiv({ cls: "cow-empty-state", text: "暂无关联文献笔记。" });
      return;
    }
    notes.forEach((note) => {
      const row = section.createEl("button", { cls: "cow-data-card cow-click-card", attr: { type: "button" } });
      row.createEl("strong", { text: note.title });
      row.createDiv({ cls: "cow-meta-line", text: note.notePath });
      row.addEventListener("click", () => void openLiteratureNoteFile(this.app, this.store, note, () => {
        this.onDone();
        this.render();
      }));
    });
  }

  private async importZoteroNote(paper: ResearchPaper): Promise<void> {
    const command = findZoteroNoteCommand(this.app);
    if (!command) {
      new Notice("未找到可用的 Zotero Integration 笔记导入命令。可以使用“关联已有笔记”手动关联 Markdown。");
      return;
    }
    await executeCommand(this.app, command.id);
    const note = findLikelyZoteroNote(this.app, paper);
    if (!note) {
      new Notice("已触发 Zotero Integration 命令，但未能自动定位生成的 Markdown。请使用“关联已有笔记”。");
      return;
    }
    await this.store.upsertLiteratureNote({
      id: `literature-note-${paper.id}`,
      title: note.basename,
      notePath: note.path,
      paperReadingId: paper.id,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
    new Notice("Zotero 笔记已关联到论文。");
    this.onDone();
    this.render();
  }
}

class PaperEditModal extends Modal {
  private draft: ResearchPaper;

  constructor(
    app: App,
    private readonly store: DashboardStore,
    private readonly onDone: () => void,
    paper?: ResearchPaper
  ) {
    super(app);
    const now = Date.now();
    this.draft = {
      id: paper?.id ?? `paper-${now}`,
      title: paper?.title ?? "",
      venue: paper?.venue ?? "",
      venueId: paper?.venueId,
      year: paper?.year ?? new Date().getFullYear(),
      status: paper?.status ?? "未读",
      statusId: paper?.statusId ?? this.store.getPaperStatuses()[0]?.id,
      readingProgress: paper?.readingProgress ?? 0,
      paperUrl: paper?.paperUrl ?? "",
      readingStartDate: paper?.readingStartDate ?? "",
      readingEndDate: paper?.readingEndDate ?? "",
      researchProjectId: paper?.researchProjectId,
      tags: paper?.tags ?? [],
      tagIds: paper?.tagIds ?? [],
      notePath: paper?.notePath,
      createdAt: paper?.createdAt ?? now,
      updatedAt: now,
      zoteroItemKey: paper?.zoteroItemKey,
      citekey: paper?.citekey
    };
  }

  onOpen(): void {
    applyResizableModal(this, {
      className: "cute-paper-edit-modal",
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
    this.contentEl.addClass("cow-modal", "cow-paper-modal");
    this.contentEl.createEl("h2", { text: this.store.getResearchPapers().some((paper) => paper.id === this.draft.id) ? "编辑论文" : "手动添加论文" });
    const form = this.contentEl.createDiv({ cls: "cow-paper-form" });
    inputField(form, "论文名称", this.draft.title, (value) => this.draft.title = value);
    selectField(form, "会议 / 期刊", this.draft.venueId ?? "", this.store.getPaperVenues().map((venue) => ({ value: venue.id, label: venue.name })), (value) => this.draft.venueId = value);
    inputField(form, "年份", String(this.draft.year ?? new Date().getFullYear()), (value) => this.draft.year = Number(value) || new Date().getFullYear(), "number");
    selectField(form, "阅读状态", this.draft.statusId ?? "", this.store.getPaperStatuses().map((status) => ({ value: status.id, label: status.name })), (value) => this.draft.statusId = value);
    selectField(form, "研究项目", this.draft.researchProjectId ?? "", [
      { value: "", label: "未关联" },
      ...this.store.getResearchProjects().map((project) => ({ value: project.id, label: project.title }))
    ], (value) => this.draft.researchProjectId = value || undefined);
    progressField(form, this.draft.readingProgress, (value) => this.draft.readingProgress = value);
    inputField(form, "论文链接", this.draft.paperUrl ?? "", (value) => this.draft.paperUrl = value);
    dateField(form, "阅读开始日期", this.draft.readingStartDate ?? "", (value) => this.draft.readingStartDate = value);
    dateField(form, "阅读结束日期", this.draft.readingEndDate ?? "", (value) => this.draft.readingEndDate = value);
    tagField(form, this.store.getPaperTags(), this.draft.tagIds ?? [], (value) => this.draft.tagIds = value);
    inputField(form, "笔记路径", this.draft.notePath ?? "", (value) => this.draft.notePath = value);
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", () => void this.save());
  }

  private async save(): Promise<void> {
    if (!this.draft.title.trim()) {
      new Notice("请输入论文名称。");
      return;
    }
    if (this.draft.readingEndDate && this.draft.readingStartDate && this.draft.readingEndDate < this.draft.readingStartDate) {
      new Notice("阅读结束日期不能早于开始日期。");
      return;
    }
    this.draft.updatedAt = Date.now();
    if (this.store.getResearchPapers().some((paper) => paper.id === this.draft.id)) {
      await this.store.updateResearchPaper(this.draft.id, this.draft);
    } else {
      await this.store.addResearchPaper(this.draft);
    }
    this.onDone();
    this.close();
  }
}

class ZoteroPaperImportModal extends Modal {
  private candidates: ZoteroImportCandidate[] = [];
  private selectedKeys = new Set<string>();
  private query = "";
  private loaded = false;

  constructor(app: App, private readonly store: DashboardStore, private readonly onDone: () => void) {
    super(app);
  }

  async onOpen(): Promise<void> {
    applyResizableModal(this, {
      className: "cute-zotero-import-modal",
      width: "min(1100px, 92vw)",
      height: "min(720px, 86vh)",
      maxWidth: "96vw",
      maxHeight: "94vh",
      minWidth: "min(560px, 92vw)",
      minHeight: "min(420px, 82vh)"
    });
    await this.load();
    this.render();
  }

  private async load(): Promise<void> {
    this.candidates = await loadZoteroCandidates(this.app, this.store, false);
    this.loaded = true;
  }

  private render(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-paper-modal", "cow-zotero-import-modal");
    this.contentEl.createEl("h2", { text: "从 Zotero 导入" });
    this.renderSourceStatus();
    if (this.candidates.length === 0) {
      this.renderEmpty();
      return;
    }
    const tools = this.contentEl.createDiv({ cls: "cow-zotero-toolbar" });
    const search = tools.createEl("input", { attr: { type: "search", placeholder: "搜索标题、作者、会议/期刊、citekey" } });
    search.value = this.query;
    search.addEventListener("input", () => {
      this.query = search.value;
      this.render();
    });
    tools.createEl("button", { text: "全选当前筛选", attr: { type: "button" } }).addEventListener("click", () => {
      this.filteredCandidates().forEach((item) => this.selectedKeys.add(candidateKey(item)));
      this.render();
    });
    tools.createEl("button", { text: "取消全选", attr: { type: "button" } }).addEventListener("click", () => {
      this.selectedKeys.clear();
      this.render();
    });

    const list = this.contentEl.createDiv({ cls: "cow-zotero-list" });
    this.filteredCandidates().forEach((item) => this.renderCandidate(list, item));
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: `导入 ${this.selectedKeys.size} 篇`, cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", () => void this.importSelected());
  }

  private renderSourceStatus(): void {
    const service = new ZoteroService(this.app);
    const commands = service.getRegisteredZoteroCommands();
    const path = this.store.getData().userSettings.zoteroJsonPath ?? "";
    const status = this.contentEl.createDiv({ cls: "cow-zotero-source" });
    status.createSpan({ text: commands.length > 0 ? `检测到 Zotero 相关命令 ${commands.length} 个；未调用私有读取接口。` : "未检测到可读取条目的 Zotero Integration 公开命令。" });
    status.createSpan({ text: path ? `Better BibTeX JSON：${path}` : "未配置 Better BibTeX JSON 路径。" });
  }

  private renderEmpty(): void {
    const empty = this.contentEl.createDiv({ cls: "cow-empty-state" });
    empty.createSpan({ text: this.loaded ? "未检测到可用的 Zotero 数据源。请在插件设置中配置 Vault 内 Better BibTeX / CSL JSON 路径。" : "正在读取 Zotero 数据源..." });
  }

  private renderCandidate(container: HTMLElement, item: ZoteroImportCandidate): void {
    const key = candidateKey(item);
    const row = container.createEl("label", { cls: "cow-zotero-item" });
    const checkbox = row.createEl("input", { attr: { type: "checkbox" } });
    checkbox.checked = this.selectedKeys.has(key);
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) this.selectedKeys.add(key);
      else this.selectedKeys.delete(key);
    });
    const body = row.createDiv({ cls: "cow-paper-body" });
    body.createEl("strong", { text: item.title });
    body.createSpan({ text: [item.authors, item.venue, item.year].filter(Boolean).join(" · ") || "无作者 / Venue 信息" });
    body.createSpan({ text: [item.citekey ? `citekey: ${item.citekey}` : "", item.zoteroItemKey ? `itemKey: ${item.zoteroItemKey}` : ""].filter(Boolean).join(" · ") || "无 citekey" });
    if (item.tags.length > 0) {
      const tags = body.createDiv({ cls: "cow-paper-tags" });
      item.tags.forEach((tag) => tags.createSpan({ text: tag }));
    }
  }

  private filteredCandidates(): ZoteroImportCandidate[] {
    const query = this.query.trim().toLowerCase();
    if (!query) return this.candidates;
    return this.candidates.filter((item) => [
      item.title,
      item.authors,
      item.venue,
      item.citekey,
      item.zoteroItemKey,
      ...item.tags
    ].filter(Boolean).join(" ").toLowerCase().includes(query));
  }

  private async importSelected(): Promise<void> {
    const selected = this.candidates.filter((item) => this.selectedKeys.has(candidateKey(item)));
    if (selected.length === 0) {
      new Notice("请选择要导入的 Zotero 条目。");
      return;
    }
    const result = await this.store.importZoteroPapers(selected);
    new Notice(`导入完成：${result.created} 篇新论文，${result.updated} 篇已更新，${result.skipped} 篇跳过。`);
    this.onDone();
    this.close();
  }
}

export class PaperFieldManagerModal extends Modal {
  private tab: FieldKind = "status";

  constructor(app: App, private readonly store: DashboardStore, private readonly onDone: () => void) {
    super(app);
  }

  onOpen(): void {
    applyResizableModal(this, {
      className: "cute-paper-manager-modal",
      width: "min(1050px, 92vw)",
      height: "min(720px, 86vh)",
      maxWidth: "96vw",
      maxHeight: "94vh",
      minWidth: "min(560px, 92vw)",
      minHeight: "min(420px, 82vh)"
    });
    this.render();
  }

  private render(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-paper-modal");
    this.contentEl.createEl("h2", { text: "论文字段管理" });
    const tabs = this.contentEl.createDiv({ cls: "cow-book-tabs" });
    [
      ["status", "阅读状态"],
      ["venue", "会议 / 期刊"],
      ["tag", "标签"]
    ].forEach(([id, label]) => {
      const button = tabs.createEl("button", { text: label, cls: this.tab === id ? "is-active" : "", attr: { type: "button" } });
      button.addEventListener("click", () => {
        this.tab = id as FieldKind;
        this.render();
      });
    });
    if (this.tab === "status") this.renderStatuses();
    if (this.tab === "venue") this.renderVenues();
    if (this.tab === "tag") this.renderTags();
  }

  private renderStatuses(): void {
    const list = this.contentEl.createDiv({ cls: "cow-paper-field-list" });
    this.store.getPaperStatuses().forEach((status) => this.renderFieldRow(list, status.name, status.color, status.order, () => this.openFieldEditor("status", status), () => void this.deleteStatus(status)));
    this.renderAddField("新增状态", () => this.openFieldEditor("status"));
  }

  private renderVenues(): void {
    const list = this.contentEl.createDiv({ cls: "cow-paper-field-list" });
    this.store.getPaperVenues().forEach((venue) => this.renderFieldRow(list, `${venue.name} · ${venue.type}`, venue.color, undefined, () => this.openFieldEditor("venue", venue), () => void this.deleteVenue(venue)));
    this.renderAddField("新增会议 / 期刊", () => this.openFieldEditor("venue"));
  }

  private renderTags(): void {
    const list = this.contentEl.createDiv({ cls: "cow-paper-field-list" });
    this.store.getPaperTags().forEach((tag) => this.renderFieldRow(list, tag.name, tag.color, undefined, () => this.openFieldEditor("tag", tag), () => void this.deleteTag(tag)));
    this.renderAddField("新增标签", () => this.openFieldEditor("tag"));
  }

  private renderFieldRow(container: HTMLElement, label: string, color: string, order: number | undefined, onEdit: () => void, onDelete: () => void): void {
    const row = container.createDiv({ cls: "cow-paper-field-row" });
    row.createSpan({ cls: "cow-paper-color-dot", attr: { style: `background: ${color}` } });
    const body = row.createDiv({ cls: "cow-paper-body" });
    body.createEl("strong", { text: label });
    if (order !== undefined) body.createSpan({ text: `排序 ${order}` });
    const actions = row.createDiv({ cls: "cow-list-item-actions" });
    iconButton(actions, "pencil", "编辑", onEdit);
    iconButton(actions, "trash-2", "删除", onDelete);
  }

  private renderAddField(label: string, onClick: () => void): void {
    const add = this.contentEl.createEl("button", { cls: "cow-bottom-add", attr: { type: "button" } });
    setIcon(add.createSpan(), "plus");
    add.createSpan({ text: label });
    add.addEventListener("click", onClick);
  }

  private openFieldEditor(kind: FieldKind, field?: PaperStatusDefinition | VenueDefinition | PaperTagDefinition): void {
    new PaperFieldEditModal(this.app, this.store, kind, () => {
      this.onDone();
      this.render();
    }, field).open();
  }

  private async deleteStatus(status: PaperStatusDefinition): Promise<void> {
    const used = this.store.getResearchPapers().some((paper) => paper.statusId === status.id);
    let migrateTo: string | undefined;
    if (used) {
      migrateTo = this.store.getPaperStatuses().find((item) => item.id !== status.id)?.id;
      if (!migrateTo || !confirm(`状态“${status.name}”仍被论文使用，删除后会迁移到其它状态。继续？`)) return;
    }
    await this.store.deletePaperStatus(status.id, migrateTo);
    this.onDone();
    this.render();
  }

  private async deleteVenue(venue: VenueDefinition): Promise<void> {
    const used = this.store.getResearchPapers().some((paper) => paper.venueId === venue.id);
    let migrateTo: string | undefined;
    if (used) {
      migrateTo = this.store.getPaperVenues().find((item) => item.id !== venue.id)?.id;
      if (!migrateTo || !confirm(`会议 / 期刊“${venue.name}”仍被论文使用，删除后会迁移到其它条目。继续？`)) return;
    }
    await this.store.deletePaperVenue(venue.id, migrateTo);
    this.onDone();
    this.render();
  }

  private async deleteTag(tag: PaperTagDefinition): Promise<void> {
    if (!confirm(`删除标签“${tag.name}”？会从对应论文中移除该标签。`)) return;
    await this.store.deletePaperTag(tag.id);
    this.onDone();
    this.render();
  }
}

class PaperFieldEditModal extends Modal {
  private name: string;
  private color: string;
  private order: number;
  private venueType: VenueDefinition["type"];

  constructor(
    app: App,
    private readonly store: DashboardStore,
    private readonly kind: FieldKind,
    private readonly onDone: () => void,
    field?: PaperStatusDefinition | VenueDefinition | PaperTagDefinition
  ) {
    super(app);
    this.name = field?.name ?? "";
    this.color = field?.color ?? "#f8a8c4";
    this.order = "order" in (field ?? {}) ? (field as PaperStatusDefinition).order : this.store.getPaperStatuses().length * 10 + 10;
    this.venueType = "type" in (field ?? {}) ? (field as VenueDefinition).type : "other";
    this.fieldId = field?.id;
  }

  private readonly fieldId?: string;

  onOpen(): void {
    applyResizableModal(this, {
      className: "cute-paper-edit-modal",
      width: "min(560px, 90vw)",
      maxWidth: "96vw",
      maxHeight: "86vh",
      minWidth: "min(420px, 90vw)",
      minHeight: "min(300px, 74vh)"
    });
    this.render();
  }

  private render(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-paper-modal");
    this.contentEl.createEl("h2", { text: this.fieldId ? "编辑字段" : "新增字段" });
    const form = this.contentEl.createDiv({ cls: "cow-paper-form" });
    inputField(form, "名称", this.name, (value) => this.name = value);
    inputField(form, "颜色", this.color, (value) => this.color = value, "color");
    if (this.kind === "status") inputField(form, "排序", String(this.order), (value) => this.order = Number(value) || 0, "number");
    if (this.kind === "venue") {
      selectField(form, "类型", this.venueType, [
        { value: "conference", label: "conference" },
        { value: "journal", label: "journal" },
        { value: "other", label: "other" }
      ], (value) => this.venueType = value as VenueDefinition["type"]);
    }
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", () => void this.save());
  }

  private async save(): Promise<void> {
    if (!this.name.trim()) {
      new Notice("请输入名称。");
      return;
    }
    const id = this.fieldId ?? `${this.kind}-${Date.now()}`;
    if (this.kind === "status") {
      if (this.fieldId) await this.store.updatePaperStatus(id, { name: this.name.trim(), color: this.color, order: this.order });
      else await this.store.addPaperStatus({ id, name: this.name.trim(), color: this.color, order: this.order });
    }
    if (this.kind === "venue") {
      if (this.fieldId) await this.store.updatePaperVenue(id, { name: this.name.trim(), color: this.color, type: this.venueType });
      else await this.store.addPaperVenue({ id, name: this.name.trim(), color: this.color, type: this.venueType });
    }
    if (this.kind === "tag") {
      if (this.fieldId) await this.store.updatePaperTag(id, { name: this.name.trim(), color: this.color });
      else await this.store.addPaperTag({ id, name: this.name.trim(), color: this.color });
    }
    this.onDone();
    this.close();
  }
}

export function paperMetaText(store: DashboardStore, paper: ResearchPaper): string {
  return `${statusName(store, paper)} · ${venueName(store, paper)} · ${paper.year ?? ""}`;
}

export function statusName(store: DashboardStore, paper: ResearchPaper): string {
  return store.getPaperStatuses().find((status) => status.id === paper.statusId)?.name ?? paper.status ?? "未读";
}

export function venueName(store: DashboardStore, paper: ResearchPaper): string {
  return store.getPaperVenues().find((venue) => venue.id === paper.venueId)?.name ?? paper.venue ?? "未分组";
}

export function tagNames(store: DashboardStore, paper: ResearchPaper): string[] {
  return (paper.tagIds ?? []).map((id) => store.getPaperTags().find((tag) => tag.id === id)?.name).filter(Boolean) as string[];
}

function inputField(container: HTMLElement, label: string, value: string, onInput: (value: string) => void, type = "text"): HTMLInputElement {
  const row = container.createDiv({ cls: "cow-book-form-row" });
  row.createEl("label", { text: label });
  const input = row.createEl("input", { attr: { type, value } });
  input.addEventListener("input", () => onInput(input.value));
  return input;
}

function dateField(container: HTMLElement, label: string, value: string, onChange: (value: string) => void): void {
  const row = container.createDiv({ cls: "cow-book-form-row is-picker" });
  row.createEl("label", { text: label });
  const input = row.createEl("input", { attr: { type: "date", value } });
  row.addEventListener("click", () => {
    input.focus();
    try {
      (input as HTMLInputElement & { showPicker?: () => void }).showPicker?.();
    } catch {
      input.focus();
    }
  });
  input.addEventListener("change", () => onChange(input.value));
}

function selectField(container: HTMLElement, label: string, value: string, options: Array<{ value: string; label: string }>, onChange: (value: string) => void): void {
  const row = container.createDiv({ cls: "cow-book-form-row" });
  row.createEl("label", { text: label });
  const select = row.createEl("select");
  options.forEach((option) => select.createEl("option", { value: option.value, text: option.label }));
  select.value = value;
  select.addEventListener("change", () => onChange(select.value));
}

function progressField(container: HTMLElement, value: number, onChange: (value: number) => void): void {
  const row = container.createDiv({ cls: "cow-paper-progress-editor" });
  row.createEl("label", { text: "阅读进度" });
  const range = row.createEl("input", { attr: { type: "range", min: "0", max: "100", step: "1", value: String(value) } });
  const number = row.createEl("input", { attr: { type: "number", min: "0", max: "100", step: "1", value: String(value) } });
  const sync = (next: number) => {
    const normalized = Math.max(0, Math.min(100, next));
    range.value = String(normalized);
    number.value = String(normalized);
    onChange(normalized);
  };
  range.addEventListener("input", () => sync(Number(range.value) || 0));
  number.addEventListener("input", () => sync(Number(number.value) || 0));
}

function tagField(container: HTMLElement, tags: PaperTagDefinition[], selected: string[], onChange: (value: string[]) => void): void {
  const row = container.createDiv({ cls: "cow-book-form-row cow-paper-tag-picker" });
  row.createEl("label", { text: "标签" });
  const list = row.createDiv({ cls: "cow-paper-tag-options" });
  const selectedSet = new Set(selected);
  tags.forEach((tag) => {
    const button = list.createEl("button", { text: tag.name, cls: selectedSet.has(tag.id) ? "is-active" : "", attr: { type: "button", style: `--paper-color: ${tag.color}` } });
    button.addEventListener("click", () => {
      if (selectedSet.has(tag.id)) selectedSet.delete(tag.id);
      else selectedSet.add(tag.id);
      onChange([...selectedSet]);
      button.toggleClass("is-active", selectedSet.has(tag.id));
    });
  });
}

function iconButton(container: HTMLElement, icon: string, label: string, onClick: () => void): void {
  const button = container.createEl("button", { attr: { type: "button", "aria-label": label } });
  setIcon(button, icon);
  button.addEventListener("click", onClick);
}

async function loadZoteroCandidates(app: App, store: DashboardStore, notify = true): Promise<ZoteroImportCandidate[]> {
  const path = store.getData().userSettings.zoteroJsonPath ?? "";
  const service = new ZoteroService(app);
  const commands = service.getRegisteredZoteroCommands();
  if (!path) {
    if (notify) {
      new Notice(commands.length > 0
        ? "检测到 Zotero Integration 命令，但没有公开条目读取接口。请配置 Better BibTeX JSON 路径。"
        : "未检测到可用的 Zotero 数据源。请配置 Better BibTeX JSON 路径。");
    }
    return [];
  }
  try {
    const candidates = await service.loadBetterBibtexJson(path);
    if (candidates.length === 0 && notify) new Notice("Better BibTeX JSON 中没有可导入条目。");
    return candidates;
  } catch {
    if (notify) new Notice("读取 Better BibTeX JSON 失败，请检查 JSON 路径和格式。");
    return [];
  }
}

function candidateMatchesPaper(candidate: ZoteroImportCandidate, paper: ResearchPaper): boolean {
  if (candidate.zoteroItemKey && paper.zoteroItemKey === candidate.zoteroItemKey) return true;
  if (candidate.citekey && paper.citekey === candidate.citekey) return true;
  if (candidate.doi && paper.doi?.toLowerCase() === candidate.doi.toLowerCase()) return true;
  if (candidate.paperUrl && paper.paperUrl === candidate.paperUrl) return true;
  return false;
}

function candidateKey(candidate: ZoteroImportCandidate): string {
  return candidate.zoteroItemKey ?? candidate.citekey ?? candidate.doi ?? candidate.paperUrl ?? candidate.title;
}

function findZoteroNoteCommand(app: App): { id: string; name: string } | undefined {
  const commands = (app as App & { commands?: { commands?: Record<string, { id?: string; name?: string }>; executeCommandById?: (id: string) => boolean } }).commands?.commands ?? {};
  return Object.entries(commands)
    .map(([id, command]) => ({ id, name: command.name ?? id }))
    .find((command) => {
      const text = `${command.id} ${command.name}`.toLowerCase();
      return text.includes("zotero") && (text.includes("note") || text.includes("import") || text.includes("citekey"));
    });
}

async function executeCommand(app: App, commandId: string): Promise<void> {
  const commands = (app as App & { commands?: { executeCommandById?: (id: string) => boolean } }).commands;
  commands?.executeCommandById?.(commandId);
}

function findLikelyZoteroNote(app: App, paper: ResearchPaper): TFile | undefined {
  const needles = [paper.citekey, paper.zoteroItemKey, paper.title].filter(Boolean).map((value) => String(value).toLowerCase());
  if (needles.length === 0) return undefined;
  return app.vault.getMarkdownFiles()
    .sort((a, b) => b.stat.mtime - a.stat.mtime)
    .find((file) => {
      const text = `${file.basename} ${file.path}`.toLowerCase();
      return needles.some((needle) => text.includes(needle));
    });
}
