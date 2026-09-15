import { App, Notice, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import type { ResearchPaper } from "../../types/dashboard";
import { PaperDetailModal, paperMetaText, tagNames, venueName, statusName } from "./PaperQueueModals";

interface PaperFilters {
  statusId?: string;
  venueId?: string;
  researchProjectId?: string;
  tagIds: string[];
}

export class PaperQueueSection {
  private filters: PaperFilters = { tagIds: [] };

  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const host = container.createDiv({ cls: "cow-paper-queue" });
    this.renderFilters(host);
    const list = host.createDiv({ cls: "cow-paper-list" });
    const papers = this.filterPapers(this.store.getResearchPapers());
    if (papers.length === 0) {
      list.createDiv({ cls: "cow-empty-state", text: "没有匹配当前筛选条件的论文。" });
      return;
    }
    papers.forEach((paper) => this.renderPaperCard(list, paper));
  }

  private renderFilters(container: HTMLElement): void {
    const filters = container.createDiv({ cls: "cow-paper-filter-panel" });
    this.renderSelect(filters, "阅读状态", this.filters.statusId ?? "", [{ value: "", label: "全部状态" }, ...this.store.getPaperStatuses().map((item) => ({ value: item.id, label: item.name }))], (value) => {
      this.filters.statusId = value || undefined;
      container.empty();
      this.render(container);
    });
    this.renderSelect(filters, "会议 / 期刊", this.filters.venueId ?? "", [{ value: "", label: "全部会议 / 期刊" }, ...this.store.getPaperVenues().map((item) => ({ value: item.id, label: item.name }))], (value) => {
      this.filters.venueId = value || undefined;
      container.empty();
      this.render(container);
    });
    this.renderSelect(filters, "研究项目", this.filters.researchProjectId ?? "", [{ value: "", label: "全部研究项目" }, ...this.store.getResearchProjects().map((item) => ({ value: item.id, label: item.title }))], (value) => {
      this.filters.researchProjectId = value || undefined;
      container.empty();
      this.render(container);
    });
    const tagWrap = filters.createDiv({ cls: "cow-paper-filter-tags" });
    this.store.getPaperTags().forEach((tag) => {
      const active = this.filters.tagIds.includes(tag.id);
      const button = tagWrap.createEl("button", { text: tag.name, cls: active ? "is-active" : "", attr: { type: "button", style: `--paper-color: ${tag.color}` } });
      button.addEventListener("click", () => {
        this.filters.tagIds = active ? this.filters.tagIds.filter((id) => id !== tag.id) : [...this.filters.tagIds, tag.id];
        container.empty();
        this.render(container);
      });
    });
    this.renderChips(container);
  }

  private renderChips(container: HTMLElement): void {
    const chips = container.createDiv({ cls: "cow-paper-filter-chips" });
    const addChip = (label: string, onRemove: () => void): void => {
      const chip = chips.createEl("button", { text: `${label} ×`, attr: { type: "button" } });
      chip.addEventListener("click", () => {
        onRemove();
        container.empty();
        this.render(container);
      });
    };
    if (this.filters.statusId) addChip(this.store.getPaperStatuses().find((item) => item.id === this.filters.statusId)?.name ?? "状态", () => this.filters.statusId = undefined);
    if (this.filters.venueId) addChip(this.store.getPaperVenues().find((item) => item.id === this.filters.venueId)?.name ?? "会议", () => this.filters.venueId = undefined);
    if (this.filters.researchProjectId) addChip(this.store.getResearchProjects().find((item) => item.id === this.filters.researchProjectId)?.title ?? "项目", () => this.filters.researchProjectId = undefined);
    this.filters.tagIds.forEach((id) => addChip(this.store.getPaperTags().find((tag) => tag.id === id)?.name ?? "标签", () => this.filters.tagIds = this.filters.tagIds.filter((tagId) => tagId !== id)));
    if (this.filters.statusId || this.filters.venueId || this.filters.researchProjectId || this.filters.tagIds.length > 0) {
      addChip("清除筛选", () => this.filters = { tagIds: [] });
    }
  }

  private renderPaperCard(container: HTMLElement, paper: ResearchPaper): void {
    const card = container.createDiv({ cls: "cow-paper-card" });
    const body = card.createDiv({ cls: "cow-paper-body" });
    const title = body.createEl("button", { cls: "cow-paper-title-button", text: paper.title, attr: { type: "button" } });
    title.addEventListener("click", () => new PaperDetailModal(this.app, this.store, paper, this.onDataChanged).open());
    const meta = body.createDiv({ cls: "cow-paper-meta-row" });
    meta.createSpan({ cls: "cow-status is-blue", text: statusName(this.store, paper) });
    const project = this.store.getResearchProjects().find((item) => item.id === paper.researchProjectId);
    meta.createSpan({ text: `${venueName(this.store, paper)} · ${paper.year ?? ""} · ${project?.title ?? "未关联项目"}` });
    const progress = body.createDiv({ cls: "cow-paper-progress-row" });
    progress.createDiv({ cls: "cow-month-progress-track" }).createDiv({ cls: "cow-month-progress-fill is-blue", attr: { style: `width: ${paper.readingProgress}%` } });
    progress.createSpan({ text: `${paper.readingProgress}%` });
    const tags = body.createDiv({ cls: "cow-paper-tags" });
    tagNames(this.store, paper).forEach((tag) => tags.createSpan({ text: tag }));
    body.createDiv({ cls: "cow-meta-line", text: `${paper.readingStartDate ?? "-"} → ${paper.readingEndDate ?? "-"}` });
    const actions = card.createDiv({ cls: "cow-list-item-actions" });
    iconButton(actions, "external-link", "打开论文链接", () => void this.openPaperUrl(paper));
    iconButton(actions, "notebook-tabs", "打开笔记", () => void this.openNote(paper.notePath));
  }

  private filterPapers(papers: ResearchPaper[]): ResearchPaper[] {
    return papers.filter((paper) => {
      if (this.filters.statusId && paper.statusId !== this.filters.statusId) return false;
      if (this.filters.venueId && paper.venueId !== this.filters.venueId) return false;
      if (this.filters.researchProjectId && paper.researchProjectId !== this.filters.researchProjectId) return false;
      if (this.filters.tagIds.some((tagId) => !(paper.tagIds ?? []).includes(tagId))) return false;
      return true;
    });
  }

  private renderSelect(container: HTMLElement, label: string, value: string, options: Array<{ value: string; label: string }>, onChange: (value: string) => void): void {
    const wrap = container.createDiv({ cls: "cow-paper-filter-field" });
    wrap.createSpan({ text: label });
    const select = wrap.createEl("select");
    options.forEach((option) => select.createEl("option", { value: option.value, text: option.label }));
    select.value = value;
    select.addEventListener("change", () => onChange(select.value));
  }

  private async openNote(notePath?: string): Promise<void> {
    if (!notePath) {
      new Notice("这篇文献还没有绑定笔记。");
      return;
    }
    const file = this.app.vault.getFileByPath(notePath);
    if (!file) {
      new Notice(`没有找到笔记：${notePath}`);
      return;
    }
    await this.app.workspace.getLeaf(false).openFile(file);
  }

  private async openPaperUrl(paper: ResearchPaper): Promise<void> {
    if (!paper.paperUrl) {
      new Notice("这篇论文还没有填写链接。");
      return;
    }
    window.open(paper.paperUrl);
  }
}

function iconButton(container: HTMLElement, icon: string, label: string, onClick: () => void): void {
  const button = container.createEl("button", { attr: { type: "button", "aria-label": label } });
  setIcon(button, icon);
  button.addEventListener("click", onClick);
}
