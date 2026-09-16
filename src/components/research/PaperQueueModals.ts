import { App, Modal, Notice, Platform, setIcon, TFile } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import type { ZoteroPaperImportInput } from "../../core/DashboardStore";
import type { PaperStatusDefinition, PaperTagDefinition, ResearchPaper, VenueDefinition } from "../../types/dashboard";
import { applyResizableModal } from "../ResizableModal";
import { ZoteroImportCandidate, ZoteroService } from "../../services/ZoteroService";
import { DeleteLiteratureNoteModal, openLiteratureNoteFile, openLiteratureNoteModal } from "./LiteratureNoteModals";
import { ZoteroLocalApiService, zoteroErrorMessage, type ZoteroLocalApiDiagnostic, type ZoteroPaperItem } from "../../services/ZoteroLocalApiService";
import { PaperZoteroSyncService } from "../../services/PaperZoteroSyncService";

type FieldKind = "status" | "venue" | "tag";
type ZoteroImportStatus = "new" | "imported" | "update-available";
type ZoteroStatusFilter = "all" | ZoteroImportStatus;

interface PaperManagerFilters {
  statusId?: string;
  venueId?: string;
  tagIds: string[];
}

export class PaperQueueManagerModal extends Modal {
  private query = "";
  private filters: PaperManagerFilters = { tagIds: [] };
  private listEl?: HTMLElement;
  private filterEl?: HTMLElement;

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
      minWidth: "min(620px, 92vw)",
      minHeight: "min(420px, 82vh)"
    });
    this.render();
  }

  private render(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-paper-modal", "cow-paper-manager-modal");
    const root = this.contentEl.createDiv({ cls: "cow-paper-manager-root" });
    const header = root.createDiv({ cls: "cow-paper-manager-header" });
    header.createEl("h2", { text: "论文阅读队列管理" });
    const toolbar = root.createDiv({ cls: "cow-paper-manager-toolbar" });
    const search = toolbar.createEl("input", {
      cls: "cow-paper-manager-search",
      attr: { type: "search", placeholder: "搜索论文标题、会议/期刊、年份、标签..." }
    });
    search.value = this.query;
    search.addEventListener("input", () => {
      this.query = search.value;
      this.refreshList();
    });
    const actions = toolbar.createDiv({ cls: "cow-paper-manager-actions" });
    const add = actions.createEl("button", { cls: "cow-section-add-button", attr: { type: "button" } });
    setIcon(add.createSpan(), "plus");
    add.createSpan({ text: "手动添加" });
    add.addEventListener("click", () => new PaperEditModal(this.app, this.store, () => {
      this.onDone();
      this.refreshList();
    }).open());
    const zotero = actions.createEl("button", { cls: "cow-section-add-button", attr: { type: "button" } });
    setIcon(zotero.createSpan(), "download");
    zotero.createSpan({ text: "Zotero 导入" });
    if (Platform.isMobileApp) {
      zotero.disabled = true;
      zotero.setAttr("aria-label", "Zotero Local API 仅支持桌面端");
    }
    zotero.addEventListener("click", () => new ZoteroPaperImportModal(this.app, this.store, () => {
      this.onDone();
      this.refreshList();
    }).open());
    const update = actions.createEl("button", { cls: "cow-section-add-button", attr: { type: "button" } });
    setIcon(update.createSpan(), "refresh-cw");
    update.createSpan({ text: "更新 Zotero" });
    update.addEventListener("click", () => void this.updateZoteroLinkedPapers());

    this.filterEl = root.createDiv({ cls: "cow-paper-manager-filterbar" });
    this.listEl = root.createDiv({ cls: "cow-paper-manager-list" });
    this.refreshFilters();
    this.refreshList();
  }

  private refreshFilters(): void {
    if (!this.filterEl) return;
    this.filterEl.empty();
    const filters = this.filterEl.createDiv({ cls: "cow-paper-manager-filter-controls" });
    this.renderSelect(filters, "阅读状态", this.filters.statusId ?? "", [
      { value: "", label: "全部状态" },
      ...this.store.getPaperStatuses().map((status) => ({ value: status.id, label: status.name }))
    ], (value) => {
      this.filters.statusId = value || undefined;
      this.refreshFilters();
      this.refreshList();
    });
    this.renderSelect(filters, "会议 / 期刊", this.filters.venueId ?? "", [
      { value: "", label: "全部会议 / 期刊" },
      ...this.store.getPaperVenues().map((venue) => ({ value: venue.id, label: venue.name }))
    ], (value) => {
      this.filters.venueId = value || undefined;
      this.refreshFilters();
      this.refreshList();
    });
    const tagWrap = filters.createDiv({ cls: "cow-paper-manager-tag-filter" });
    tagWrap.createSpan({ text: "标签" });
    const tagList = tagWrap.createDiv({ cls: "cow-paper-filter-tags" });
    this.store.getPaperTags().forEach((tag) => {
      const active = this.filters.tagIds.includes(tag.id);
      const button = tagList.createEl("button", { text: tag.name, cls: active ? "is-active" : "", attr: { type: "button", style: `--paper-color: ${tag.color}` } });
      button.addEventListener("click", () => {
        this.filters.tagIds = active ? this.filters.tagIds.filter((id) => id !== tag.id) : [...this.filters.tagIds, tag.id];
        this.refreshFilters();
        this.refreshList();
      });
    });
    const chips = this.filterEl.createDiv({ cls: "cow-paper-filter-chips" });
    const addChip = (label: string, onRemove: () => void): void => {
      const chip = chips.createEl("button", { text: `${label} ×`, attr: { type: "button" } });
      chip.addEventListener("click", () => {
        onRemove();
        this.refreshFilters();
        this.refreshList();
      });
    };
    if (this.filters.statusId) addChip(this.store.getPaperStatuses().find((status) => status.id === this.filters.statusId)?.name ?? "状态", () => this.filters.statusId = undefined);
    if (this.filters.venueId) addChip(this.store.getPaperVenues().find((venue) => venue.id === this.filters.venueId)?.name ?? "会议 / 期刊", () => this.filters.venueId = undefined);
    this.filters.tagIds.forEach((id) => addChip(this.store.getPaperTags().find((tag) => tag.id === id)?.name ?? "标签", () => this.filters.tagIds = this.filters.tagIds.filter((tagId) => tagId !== id)));
    if (this.hasActiveFilters()) addChip("清除筛选", () => this.filters = { tagIds: [] });
  }

  private refreshList(): void {
    if (!this.listEl) return;
    this.listEl.empty();
    const allPapers = this.store.getResearchPapers();
    const papers = this.filteredPapers(allPapers);
    if (allPapers.length === 0) {
      this.listEl.createDiv({ cls: "cow-empty-state", text: "暂无论文，可以通过“手动添加”或“Zotero 导入”添加论文。" });
      return;
    }
    if (papers.length === 0) {
      this.listEl.createDiv({ cls: "cow-empty-state", text: "暂无符合条件的论文。" });
      return;
    }
    papers.forEach((paper) => this.renderPaperRow(this.listEl as HTMLElement, paper));
  }

  private renderPaperRow(container: HTMLElement, paper: ResearchPaper): void {
    const row = container.createDiv({ cls: "cow-paper-manager-item" });
    const header = row.createDiv({ cls: "cow-paper-manager-item-header" });
    const title = header.createEl("button", { cls: "cow-paper-title-button", text: paper.title, attr: { type: "button" } });
    title.addEventListener("click", () => new PaperDetailModal(this.app, this.store, paper, () => {
      this.onDone();
      this.refreshList();
    }).open());
    const actions = header.createDiv({ cls: "cow-list-item-actions" });
    iconButton(actions, "pencil", "编辑论文", () => new PaperEditModal(this.app, this.store, () => {
      this.onDone();
      this.refreshList();
    }, paper).open());
    iconButton(actions, "trash-2", "删除论文", () => new DeletePaperReadingModal(this.app, this.store, paper, () => {
      this.onDone();
      this.refreshList();
    }).open());
    const metadata = row.createDiv({ cls: "cow-paper-meta-row" });
    metadata.createSpan({ cls: "cow-status is-blue", text: statusName(this.store, paper) });
    metadata.createSpan({ text: paperMetaText(this.store, paper) });
    const progress = row.createDiv({ cls: "cow-paper-progress-row" });
    progress.createDiv({ cls: "cow-month-progress-track" }).createDiv({ cls: "cow-month-progress-fill is-blue", attr: { style: `width: ${paper.readingProgress}%` } });
    progress.createSpan({ text: `${paper.readingProgress}%` });
    const tags = row.createDiv({ cls: "cow-paper-tags" });
    tagNames(this.store, paper).forEach((tag) => tags.createSpan({ text: tag }));
    row.createDiv({ cls: "cow-meta-line", text: `${paper.readingStartDate ?? "-"} → ${paper.readingEndDate ?? "-"}` });
  }

  private renderSelect(container: HTMLElement, label: string, value: string, options: Array<{ value: string; label: string }>, onChange: (value: string) => void): void {
    const wrap = container.createDiv({ cls: "cow-paper-manager-filter-field" });
    wrap.createSpan({ text: label });
    const select = wrap.createEl("select");
    options.forEach((option) => select.createEl("option", { value: option.value, text: option.label }));
    select.value = value;
    select.addEventListener("change", () => onChange(select.value));
  }

  private filteredPapers(papers: ResearchPaper[]): ResearchPaper[] {
    const query = this.query.trim().toLowerCase();
    return papers.filter((paper) => {
      if (this.filters.statusId && paper.statusId !== this.filters.statusId) return false;
      if (this.filters.venueId && paper.venueId !== this.filters.venueId) return false;
      if (this.filters.tagIds.some((tagId) => !(paper.tagIds ?? []).includes(tagId))) return false;
      if (!query) return true;
      const haystack = [
        paper.title,
        paper.year,
        venueName(this.store, paper),
        statusName(this.store, paper),
        paperMetaText(this.store, paper),
        ...tagNames(this.store, paper)
      ].filter(Boolean).join(" ").toLowerCase();
      return haystack.includes(query);
    });
  }

  private hasActiveFilters(): boolean {
    return Boolean(this.filters.statusId || this.filters.venueId || this.filters.tagIds.length > 0);
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
    this.refreshList();
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
    const remove = header.createEl("button", { cls: "cow-section-add-button", attr: { type: "button" } });
    setIcon(remove.createSpan(), "trash-2");
    remove.createSpan({ text: "删除" });
    remove.addEventListener("click", () => new DeletePaperReadingModal(this.app, this.store, paper, () => {
      this.onDone();
      this.close();
    }).open());
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
      ["阅读日期", `${paper.readingStartDate ?? "-"} → ${paper.readingEndDate ?? "-"}`],
      ["标签", tagNames(this.store, paper).join(" · ") || "无标签"],
      ["Zotero", paper.zoteroItemKey || paper.citekey ? [paper.zoteroItemKey, paper.citekey].filter(Boolean).join(" · ") : "预留，暂未导入"]
    ].forEach(([label, value]) => {
      const item = details.createDiv({ cls: "cow-data-card" });
      item.createEl("strong", { text: label });
      item.createSpan({ text: value });
    });
    const linkCard = details.createDiv({ cls: "cow-data-card" });
    linkCard.createEl("strong", { text: "论文链接" });
    if (paper.paperUrl) {
      const linkButton = linkCard.createEl("button", { cls: "cow-section-add-button", attr: { type: "button" } });
      setIcon(linkButton.createSpan(), "external-link");
      linkButton.createSpan({ text: "打开论文" });
      linkButton.addEventListener("click", () => openPaperUrl(paper.paperUrl));
      linkCard.createDiv({ cls: "cow-meta-line", text: paper.paperUrl });
    } else {
      linkCard.createSpan({ text: "未填写" });
    }
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
    const validPaths = new Set(this.app.vault.getMarkdownFiles().map((file) => file.path));
    const allNotes = this.store.getLiteratureNotesForPaper(paper.id);
    const notes = allNotes.filter((note) => validPaths.has(note.notePath));
    if (notes.length !== allNotes.length) {
      void this.store.cleanupInvalidLiteratureNotes(validPaths).then((removed) => {
        if (removed > 0) {
          this.onDone();
          this.render();
        }
      });
    }
    if (notes.length === 0) {
      section.createDiv({ cls: "cow-empty-state", text: "暂无关联文献笔记。" });
      return;
    }
    notes.forEach((note) => {
      const row = section.createDiv({ cls: "cow-data-card cow-literature-note-row" });
      const body = row.createDiv({ cls: "cow-paper-body" });
      const title = body.createEl("button", { cls: "cow-paper-title-button", text: note.title, attr: { type: "button" } });
      title.addEventListener("click", () => void openLiteratureNoteFile(this.app, this.store, note, () => {
        this.onDone();
        this.render();
      }));
      body.createDiv({ cls: "cow-meta-line", text: note.notePath });
      const actions = row.createDiv({ cls: "cow-list-item-actions" });
      iconButton(actions, "pencil", "编辑文献笔记", () => openLiteratureNoteModal(this.app, this.store, () => {
        this.onDone();
        this.render();
      }, note));
      iconButton(actions, "trash-2", "删除文献笔记", () => new DeleteLiteratureNoteModal(this.app, this.store, note, () => {
        this.onDone();
        this.render();
      }).open());
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

export class PaperEditModal extends Modal {
  private draft: ResearchPaper;
  private selectedLiteratureNoteId = "";

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
    this.selectedLiteratureNoteId = this.store.getLiteratureNotesForPaper(this.draft.id)[0]?.id ?? "";
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
    const basic = this.section("基础信息");
    inputField(basic, "论文名称", this.draft.title, (value) => this.draft.title = value);
    selectField(basic, "会议 / 期刊", this.draft.venueId ?? "", this.store.getPaperVenues().map((venue) => ({ value: venue.id, label: venue.name })), (value) => this.draft.venueId = value);
    inputField(basic, "年份", String(this.draft.year ?? new Date().getFullYear()), (value) => this.draft.year = Number(value) || new Date().getFullYear(), "number");

    const reading = this.section("阅读信息");
    selectField(reading, "阅读状态", this.draft.statusId ?? "", this.store.getPaperStatuses().map((status) => ({ value: status.id, label: status.name })), (value) => this.draft.statusId = value);
    progressField(reading, this.draft.readingProgress, (value) => this.draft.readingProgress = value);
    dateField(reading, "阅读开始日期", this.draft.readingStartDate ?? "", (value) => this.draft.readingStartDate = value);
    dateField(reading, "阅读结束日期", this.draft.readingEndDate ?? "", (value) => this.draft.readingEndDate = value);

    const resources = this.section("资源");
    paperUrlField(resources, this.draft.paperUrl ?? "", (value) => this.draft.paperUrl = value);
    this.literatureNoteSelect(resources);

    const category = this.section("分类");
    tagField(category, this.store.getPaperTags(), this.draft.tagIds ?? [], (value) => this.draft.tagIds = value);
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", () => void this.save());
  }

  private section(title: string): HTMLElement {
    const section = this.contentEl.createDiv({ cls: "cow-paper-edit-section" });
    section.createEl("h3", { text: title });
    return section.createDiv({ cls: "cow-paper-form" });
  }

  private literatureNoteSelect(container: HTMLElement): void {
    const row = container.createDiv({ cls: "cow-book-form-row" });
    row.createEl("label", { text: "关联文献笔记" });
    const select = row.createEl("select");
    select.createEl("option", { value: "", text: "不关联" });
    this.store.getLiteratureNotes().forEach((note) => {
      select.createEl("option", { value: note.id, text: note.title || fileName(note.notePath) });
    });
    select.value = this.selectedLiteratureNoteId;
    select.addEventListener("change", () => this.selectedLiteratureNoteId = select.value);
    const selectedNote = this.store.getLiteratureNotes().find((note) => note.id === this.selectedLiteratureNoteId);
    if (selectedNote?.notePath) row.createDiv({ cls: "cow-meta-line", text: selectedNote.notePath });
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
    if (!this.confirmLiteratureNoteReassignment()) return;
    this.draft.updatedAt = Date.now();
    if (this.store.getResearchPapers().some((paper) => paper.id === this.draft.id)) {
      await this.store.updateResearchPaper(this.draft.id, this.draft);
    } else {
      await this.store.addResearchPaper(this.draft);
    }
    await this.syncLiteratureNoteLink();
    this.onDone();
    this.close();
  }

  private confirmLiteratureNoteReassignment(): boolean {
    if (!this.selectedLiteratureNoteId) return true;
    const note = this.store.getLiteratureNotes().find((item) => item.id === this.selectedLiteratureNoteId);
    if (!note?.paperReadingId || note.paperReadingId === this.draft.id) return true;
    const oldPaper = this.store.getResearchPapers().find((paper) => paper.id === note.paperReadingId);
    return confirm(`该笔记当前关联《${oldPaper?.title ?? "其它论文"}》，是否改为关联当前论文？`);
  }

  private async syncLiteratureNoteLink(): Promise<void> {
    const linkedToCurrent = this.store.getLiteratureNotes().filter((note) => note.paperReadingId === this.draft.id);
    for (const note of linkedToCurrent) {
      if (note.id !== this.selectedLiteratureNoteId) {
        await this.store.updateLiteratureNote(note.id, { paperReadingId: undefined });
      }
    }
    if (!this.selectedLiteratureNoteId) return;
    await this.store.updateLiteratureNote(this.selectedLiteratureNoteId, { paperReadingId: this.draft.id });
  }
}

export class DeletePaperReadingModal extends Modal {
  constructor(
    app: App,
    private readonly store: DashboardStore,
    private readonly paper: ResearchPaper,
    private readonly onDone: () => void
  ) {
    super(app);
  }

  onOpen(): void {
    applyResizableModal(this, {
      className: "cute-paper-delete-modal",
      width: "min(560px, 90vw)",
      maxWidth: "96vw",
      maxHeight: "84vh",
      minWidth: "min(420px, 90vw)",
      minHeight: "min(260px, 70vh)"
    });
    this.render();
  }

  private render(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-paper-modal", "cow-delete-modal");
    const linkedNotes = this.store.getLiteratureNotesForPaper(this.paper.id);
    this.contentEl.createEl("h2", { text: "删除论文条目？" });
    const summary = this.contentEl.createDiv({ cls: "cow-delete-summary" });
    summary.createSpan({ text: "论文：" });
    summary.createEl("strong", { text: `《${this.paper.title}》` });
    const description = this.contentEl.createDiv({ cls: "cow-delete-description" });
    description.createEl("p", { text: "该操作只会删除 Cute Workbench 中的论文阅读记录。" });
    description.createEl("p", { text: "不会删除 Zotero 中的原始条目、Zotero PDF、Obsidian Markdown 笔记或本地 PDF 文件。" });
    if (linkedNotes.length > 0) {
      description.createEl("p", { text: `该论文关联了 ${linkedNotes.length} 条文献笔记。删除论文记录不会删除笔记，笔记将变为未关联状态。` });
    }
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "删除论文记录", cls: "mod-warning", attr: { type: "button" } }).addEventListener("click", () => void this.delete());
  }

  private async delete(): Promise<void> {
    await this.store.deletePaperReading(this.paper.id);
    new Notice("论文阅读记录已删除，关联文献笔记已保留。");
    this.onDone();
    this.close();
  }
}

class ZoteroPaperImportModal extends Modal {
  private readonly pageSize = 120;
  private items: ZoteroPaperItem[] = [];
  private selectedKeys = new Set<string>();
  private query = "";
  private statusFilter: ZoteroStatusFilter = "all";
  private visibleLimit = this.pageSize;
  private loading = true;
  private connected = false;
  private error = "";
  private diagnostic?: ZoteroLocalApiDiagnostic;

  constructor(app: App, private readonly store: DashboardStore, private readonly onDone: () => void) {
    super(app);
  }

  async onOpen(): Promise<void> {
    if (Platform.isMobileApp) {
      new Notice("Zotero Local API 仅支持桌面端。");
      this.close();
      return;
    }
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
    this.loading = true;
    this.error = "";
    this.diagnostic = undefined;
    this.visibleLimit = this.pageSize;
    this.render();
    const service = new ZoteroLocalApiService();
    this.connected = await service.checkConnection();
    this.diagnostic = service.getDiagnostic();
    if (!this.connected) {
      this.items = [];
      this.loading = false;
      this.error = zoteroErrorMessage(this.diagnostic);
      this.render();
      return;
    }
    try {
      this.items = await service.getPapers();
    } catch {
      this.items = [];
      this.diagnostic = service.getDiagnostic();
      this.error = zoteroErrorMessage(this.diagnostic);
    } finally {
      this.loading = false;
      this.render();
    }
  }

  private render(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-paper-modal", "cow-zotero-import-modal", "cow-zotero-local-modal");
    const header = this.contentEl.createDiv({ cls: "cow-zotero-local-header" });
    header.createEl("h2", { text: "Zotero Local API 论文预览" });
    this.renderConnectionStatus(header);
    const tools = this.contentEl.createDiv({ cls: "cow-zotero-toolbar" });
    const search = tools.createEl("input", { attr: { type: "search", placeholder: "搜索标题、作者、会议/期刊、citekey" } });
    search.value = this.query;
    search.addEventListener("input", () => {
      this.query = search.value;
      this.visibleLimit = this.pageSize;
      this.render();
    });
    tools.createEl("button", { text: "Refresh Zotero", attr: { type: "button" } }).addEventListener("click", () => void this.load());
    tools.createEl("button", { text: "全选当前筛选", attr: { type: "button" } }).addEventListener("click", () => {
      this.filteredItems().forEach((item) => this.selectedKeys.add(item.itemKey));
      this.render();
    });
    tools.createEl("button", { text: "取消全选", attr: { type: "button" } }).addEventListener("click", () => {
      this.selectedKeys.clear();
      this.render();
    });
    this.renderStatusFilters();

    const list = this.contentEl.createDiv({ cls: "cow-zotero-list" });
    if (this.loading) {
      list.createDiv({ cls: "cow-empty-state", text: "正在读取 Zotero..." });
      this.renderSelectionSummary();
      this.renderFooter();
      return;
    }
    if (!this.connected) {
      this.renderConnectionHelp(list);
      this.renderSelectionSummary();
      this.renderFooter();
      return;
    }
    if (this.error) {
      this.renderErrorState(list);
      this.renderSelectionSummary();
      this.renderFooter();
      return;
    }
    const items = this.filteredItems();
    if (this.items.length === 0) {
      list.createDiv({ cls: "cow-empty-state", text: "暂无论文。" });
      this.renderSelectionSummary();
      this.renderFooter();
      return;
    }
    if (items.length === 0) {
      list.createDiv({ cls: "cow-empty-state", text: "暂无符合条件的论文。" });
      this.renderSelectionSummary();
      this.renderFooter();
      return;
    }
    items.slice(0, this.visibleLimit).forEach((item) => this.renderCandidate(list, item));
    if (items.length > this.visibleLimit) {
      const more = list.createEl("button", { cls: "cow-zotero-load-more", text: `加载更多（${this.visibleLimit} / ${items.length}）`, attr: { type: "button" } });
      more.addEventListener("click", () => {
        this.visibleLimit += this.pageSize;
        this.render();
      });
    }
    this.renderSelectionSummary();
    this.renderFooter();
  }

  private renderConnectionStatus(container: HTMLElement): void {
    const status = container.createDiv({ cls: this.connected ? "cow-zotero-connection is-connected" : "cow-zotero-connection is-disconnected" });
    status.createSpan({ text: this.connected ? "● Zotero 已连接" : "○ Zotero 未连接" });
  }

  private renderConnectionHelp(container: HTMLElement): void {
    const empty = container.createDiv({ cls: "cow-empty-state cow-zotero-help" });
    empty.createEl("strong", { text: this.error || "无法连接 Zotero" });
    empty.createSpan({ text: this.connectionHelpText() });
    this.renderDiagnosticDetails(empty);
    empty.createEl("button", { text: "重新连接", attr: { type: "button" } }).addEventListener("click", () => void this.load());
  }

  private renderErrorState(container: HTMLElement): void {
    const empty = container.createDiv({ cls: "cow-empty-state cow-zotero-help" });
    empty.createEl("strong", { text: this.error });
    this.renderDiagnosticDetails(empty);
    empty.createEl("button", { text: "重新连接", attr: { type: "button" } }).addEventListener("click", () => void this.load());
  }

  private renderDiagnosticDetails(container: HTMLElement): void {
    if (!this.diagnostic) return;
    const details = container.createEl("details", { cls: "cow-zotero-diagnostics" });
    details.createEl("summary", { text: "查看错误详情" });
    details.createDiv({ text: `Request: ${this.diagnostic.url}` });
    if (this.diagnostic.status) details.createDiv({ text: `Status: ${this.diagnostic.status}` });
    details.createDiv({ text: `Error: ${this.diagnostic.message}` });
  }

  private connectionHelpText(): string {
    if (this.diagnostic?.kind === "forbidden") {
      return "Zotero 拒绝了本地请求，请检查 Zotero 设置中的 Allow other applications on this computer to communicate with Zotero。";
    }
    return "请确认 Zotero Desktop 正在运行，本地 API 地址为 127.0.0.1:23119，失败时会自动尝试 localhost。";
  }

  private renderStatusFilters(): void {
    const filters = this.contentEl.createDiv({ cls: "cow-zotero-status-filters" });
    const counts = this.statusCounts();
    ([
      ["all", `全部 ${this.items.length}`],
      ["new", `未导入 ${counts.new}`],
      ["imported", `已导入 ${counts.imported}`],
      ["update-available", `可更新 ${counts["update-available"]}`]
    ] as Array<[ZoteroStatusFilter, string]>).forEach(([status, label]) => {
      const button = filters.createEl("button", { text: label, cls: this.statusFilter === status ? "is-active" : "", attr: { type: "button" } });
      button.addEventListener("click", () => {
        this.statusFilter = status;
        this.visibleLimit = this.pageSize;
        this.render();
      });
    });
  }

  private renderCandidate(container: HTMLElement, item: ZoteroPaperItem): void {
    const status = this.getImportStatus(item);
    const row = container.createEl("label", { cls: `cow-zotero-item is-${status} ${this.selectedKeys.has(item.itemKey) ? "is-selected" : ""}` });
    const checkbox = row.createEl("input", { attr: { type: "checkbox" } });
    checkbox.checked = this.selectedKeys.has(item.itemKey);
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) this.selectedKeys.add(item.itemKey);
      else this.selectedKeys.delete(item.itemKey);
      row.toggleClass("is-selected", checkbox.checked);
      this.renderSelectionSummary();
    });
    const body = row.createDiv({ cls: "cow-paper-body" });
    body.createEl("strong", { text: item.title });
    body.createSpan({ text: [item.venue, item.year].filter(Boolean).join(" · ") || "无 Venue / Year 信息" });
    const badge = row.createDiv({ cls: `cow-zotero-status-badge is-${status}` });
    badge.createSpan({ text: statusLabel(status) });
  }

  private filteredItems(): ZoteroPaperItem[] {
    const query = this.query.trim().toLowerCase();
    return this.items.filter((item) => {
      const status = this.getImportStatus(item);
      if (this.statusFilter !== "all" && status !== this.statusFilter) return false;
      if (!query) return true;
      return [
      item.title,
      item.venue,
      item.year
      ].filter(Boolean).join(" ").toLowerCase().includes(query);
    });
  }

  private statusCounts(): Record<ZoteroImportStatus, number> {
    return this.items.reduce<Record<ZoteroImportStatus, number>>((counts, item) => {
      counts[this.getImportStatus(item)] += 1;
      return counts;
    }, { new: 0, imported: 0, "update-available": 0 });
  }

  private renderFooter(): void {
    const footer = this.contentEl.createDiv({ cls: "cow-zotero-footer" });
    const actions = footer.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    const sync = actions.createEl("button", { text: "导入 / 更新选中", cls: "mod-cta cow-zotero-sync-button", attr: { type: "button" } });
    sync.disabled = this.loading || !this.connected || this.selectedKeys.size === 0;
    sync.addEventListener("click", () => void this.syncSelected());
  }

  private renderSelectionSummary(): void {
    const summary = this.selectedSummary();
    const text = `已选择 ${summary.total} 篇 · 新增 ${summary.new} · 更新 ${summary.update} · 未变化 ${summary.unchanged}`;
    const sync = this.contentEl.querySelector(".cow-zotero-sync-button");
    if (sync instanceof HTMLButtonElement) sync.disabled = this.loading || !this.connected || this.selectedKeys.size === 0;
    const existing = this.contentEl.querySelector(".cow-zotero-selection-summary");
    if (existing instanceof HTMLElement) {
      existing.setText(text);
      return;
    }
    this.contentEl.createDiv({ cls: "cow-zotero-selection-summary", text });
  }

  private selectedSummary(): { total: number; new: number; update: number; unchanged: number } {
    return this.items
      .filter((item) => this.selectedKeys.has(item.itemKey))
      .reduce((summary, item) => {
        const status = this.getImportStatus(item);
        summary.total += 1;
        if (status === "new") summary.new += 1;
        else if (status === "update-available") summary.update += 1;
        else summary.unchanged += 1;
        return summary;
      }, { total: 0, new: 0, update: 0, unchanged: 0 });
  }

  private async syncSelected(): Promise<void> {
    const selected = this.items.filter((item) => this.selectedKeys.has(item.itemKey));
    if (selected.length === 0) {
      new Notice("请选择要导入或更新的 Zotero 条目。");
      return;
    }
    const service = new PaperZoteroSyncService(this.store);
    const result = await service.importOrUpdateMany(selected);
    new Notice(`同步完成：新增 ${result.created}，更新 ${result.updated}，未变化 ${result.unchanged}，失败 ${result.failed}。`);
    this.onDone();
    this.selectedKeys.clear();
    this.render();
  }

  private getImportStatus(item: ZoteroPaperItem): ZoteroImportStatus {
    const paper = this.store.getResearchPapers().find((local) => local.zoteroItemKey === item.itemKey);
    if (!paper) return "new";
    const localVenue = normalizeCompare(venueName(this.store, paper) || paper.venue);
    const remoteVenue = normalizeCompare(item.venue);
    const sameTitle = normalizeCompare(paper.title) === normalizeCompare(item.title);
    const sameVenue = localVenue === remoteVenue;
    const sameYear = (paper.year ?? undefined) === (item.year ?? undefined);
    const sameUrl = Boolean(paper.paperUrl) || !item.paperUrl;
    return sameTitle && sameVenue && sameYear && sameUrl ? "imported" : "update-available";
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

function paperUrlField(container: HTMLElement, value: string, onInput: (value: string) => void): void {
  const row = container.createDiv({ cls: "cow-book-form-row cow-paper-url-row" });
  row.createEl("label", { text: "论文链接" });
  const controls = row.createDiv({ cls: "cow-paper-url-controls" });
  const input = controls.createEl("input", { attr: { type: "url", value, placeholder: "https://..." } });
  input.addEventListener("input", () => onInput(input.value));
  const button = controls.createEl("button", { attr: { type: "button" } });
  setIcon(button.createSpan(), "external-link");
  button.createSpan({ text: "打开" });
  button.toggleAttribute("disabled", !value.trim());
  input.addEventListener("input", () => button.toggleAttribute("disabled", !input.value.trim()));
  button.addEventListener("click", () => openPaperUrl(input.value));
}

function openPaperUrl(value: string | undefined): void {
  const url = value?.trim();
  if (!url) return;
  if (!/^https?:\/\//i.test(url)) {
    new Notice("论文链接格式无效。");
    return;
  }
  window.open(url);
}

function fileName(path: string): string {
  return path.split(/[\\/]/).pop()?.replace(/\.md$/i, "") || path;
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

function statusLabel(status: ZoteroImportStatus): string {
  if (status === "imported") return "✓ 已导入";
  if (status === "update-available") return "↻ 可更新";
  return "未导入";
}

function normalizeCompare(value: string | number | undefined): string {
  return String(value ?? "").trim().toLowerCase();
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
