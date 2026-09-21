import { App, Notice, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import type { BookItem, ReadingPlan } from "../../types/dashboard";
import { openReadingPlanDetailModal, openReadingPlanModal, readingPlanStatusLabel } from "./ReadingPlanModals";

export class ReadingPlanSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const plans = this.store
      .getReadingPlans()
      .filter((plan) => this.store.shouldShowActiveReadingPlan(plan))
      .sort((a, b) => a.startDate.localeCompare(b.startDate));

    if (plans.length === 0) {
      const empty = container.createDiv({ cls: "cow-empty-state" });
      empty.createSpan({ text: "当前没有阅读计划，可以从右上角新增一本书的阅读日期范围。" });
      return;
    }

    const list = container.createDiv({ cls: "cow-reading-plan-list" });
    plans.forEach((plan) => this.renderPlanCard(list, plan));
  }

  private renderPlanCard(container: HTMLElement, plan: ReadingPlan): void {
    const book = this.store.getBooks().find((item) => item.id === plan.bookId);
    const status = this.resolveStatus(plan);
    const card = container.createDiv({ cls: `cow-reading-plan-card is-${status}` });
    card.setAttr("role", "button");
    card.setAttr("tabindex", "0");
    card.addEventListener("click", () => openReadingPlanDetailModal(this.app, this.store, this.onDataChanged, plan));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openReadingPlanDetailModal(this.app, this.store, this.onDataChanged, plan);
      }
    });

    const cover = card.createDiv({ cls: "cow-reading-plan-cover" });
    const src = book ? this.getCoverSrc(book) : undefined;
    if (src) this.renderCoverImage(cover, src, book?.title ?? "阅读计划");
    else cover.createSpan({ text: (book?.title ?? "计划").slice(0, 2) });

    const body = card.createDiv({ cls: "cow-reading-plan-body" });
    const head = body.createDiv({ cls: "cow-list-item-head" });
    const title = head.createDiv({ cls: "cow-reading-plan-title" });
    title.createEl("strong", { text: book?.title ?? "未找到关联书籍" });
    title.createSpan({ text: book ? book.author : "这条计划保留了数据，但书籍记录可能已被删除。" });
    const badge = head.createSpan({ cls: `cow-reading-plan-status is-${status}`, text: status === "completed" ? `✓ ${readingPlanStatusLabel(status)}` : readingPlanStatusLabel(status) });

    body.createDiv({ cls: "cow-meta-line", text: formatDateRange(plan.startDate, plan.endDate) });
    body.createDiv({ cls: "cow-meta-line", text: `目标：${plan.goal ?? "读完本书"}` });
    if (plan.note) body.createEl("p", { text: plan.note });
    this.renderProgress(body, book, plan);

    const actions = card.createDiv({ cls: "cow-reading-plan-actions" });
    if (status === "active" && book?.readingStatus === "want-to-read") {
      this.textButton(actions, "设为在读", "play", async () => {
        if (!confirm(`阅读计划已开始，是否将《${book.title}》设为在读？`)) return;
        await this.store.updateBookReadingStatus(book.id, "reading");
        new Notice(`《${book.title}》已设为在读。`);
        this.onDataChanged();
      });
    }
    this.iconButton(actions, "pencil", "编辑计划", () => openReadingPlanModal(this.app, this.store, this.onDataChanged, plan));
    if (status !== "completed") {
      this.iconButton(actions, "check", "完成计划", async () => {
        await this.store.completeReadingPlan(plan.id);
        this.onDataChanged();
      });
    }
    this.iconButton(actions, "trash-2", "删除计划", async () => {
      if (!confirm("删除这条阅读计划？不会删除对应书籍。")) return;
      await this.store.deleteReadingPlan(plan.id);
      this.onDataChanged();
    });

    if (badge && status === "overdue") {
      badge.setText("已逾期");
    }
  }

  private renderProgress(container: HTMLElement, book: BookItem | undefined, plan: ReadingPlan): void {
    const progress = Math.max(0, Math.min(100, Number(plan.progress) || 0));
    const row = container.createDiv({ cls: "cow-reading-plan-progress" });
    row.createSpan({ text: `计划进度 ${progress}%` });
    if (book?.totalPages) row.createSpan({ text: `${book.currentPage}/${book.totalPages} 页` });
    const track = row.createDiv({ cls: "cow-month-progress-track" });
    track.createDiv({ cls: "cow-month-progress-fill is-pink", attr: { style: `width: ${progress}%` } });
  }

  private resolveStatus(plan: ReadingPlan): ReadingPlan["status"] {
    if (plan.status === "completed" || plan.completedDate) return "completed";
    const today = todayKey();
    if (today < plan.startDate) return "planned";
    if (today > plan.endDate) return "overdue";
    return "active";
  }

  private getCoverSrc(book: BookItem): string | undefined {
    if (book.coverPath) return this.app.vault.adapter.getResourcePath(book.coverPath);
    return book.cover ?? book.coverUrl;
  }

  private renderCoverImage(container: HTMLElement, src: string, title: string): void {
    const img = container.createEl("img", { attr: { src, alt: title } });
    img.addEventListener("error", () => {
      container.empty();
      container.createSpan({ text: title.slice(0, 2) });
    });
  }

  private iconButton(container: HTMLElement, icon: string, label: string, onClick: () => void): void {
    const button = container.createEl("button", { attr: { type: "button", "aria-label": label } });
    setIcon(button, icon);
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      onClick();
    });
  }

  private textButton(container: HTMLElement, label: string, icon: string, onClick: () => void): void {
    const button = container.createEl("button", { cls: "cow-section-add-button", attr: { type: "button" } });
    setIcon(button.createSpan(), icon);
    button.createSpan({ text: label });
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      onClick();
    });
  }
}

function todayKey(): string {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function formatMonthDay(date: string): string {
  const [, month, day] = date.split("-");
  return `${Number(month)}月${Number(day)}日`;
}

function formatDateRange(startDate: string, endDate: string): string {
  return `${formatMonthDay(startDate)} - ${formatMonthDay(endDate)}`;
}
