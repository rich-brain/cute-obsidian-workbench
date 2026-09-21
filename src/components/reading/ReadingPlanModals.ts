import { App, Modal, Notice, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import type { BookItem, ReadingPlan } from "../../types/dashboard";
import { renderGoalStatisticsLayout } from "../goals/GoalStatisticsLayout";
import { applyResizableModal } from "../ResizableModal";
import { AddBookModal } from "./AddBookModal";

type PlanStatusFilter = "all" | "planned" | "active" | "completed" | "overdue";

export function openReadingPlanModal(
  app: App,
  store: DashboardStore,
  onDataChanged: () => void,
  plan?: ReadingPlan
): void {
  new ReadingPlanModal(app, store, onDataChanged, plan).open();
}

class ReadingPlanModal extends Modal {
  private query = "";
  private selectedBookId: string;
  private startDate: string;
  private endDate: string;
  private goal: string;
  private progress: number;
  private note: string;

  constructor(
    app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void,
    private readonly plan?: ReadingPlan
  ) {
    super(app);
    const today = todayKey();
    this.selectedBookId = plan?.bookId ?? store.getBooks()[0]?.id ?? "";
    this.startDate = plan?.startDate ?? today;
    this.endDate = plan?.endDate ?? today;
    this.goal = plan?.goal ?? (plan?.targetPages ? `${plan.targetPages} 页` : "读完本书");
    this.progress = Math.max(0, Math.min(100, Number(plan?.progress ?? (plan?.status === "completed" ? 100 : 0)) || 0));
    this.note = plan?.note ?? "";
  }

  onOpen(): void {
    applyResizableModal(this, {
      className: "cute-reading-plan-modal",
      width: "min(760px, 90vw)",
      height: "min(680px, 86vh)",
      maxWidth: "96vw",
      maxHeight: "92vh",
      minWidth: "min(520px, 92vw)",
      minHeight: "min(430px, 82vh)"
    });
    this.render();
  }

  private render(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-reading-plan-modal");
    this.contentEl.createEl("h2", { text: this.plan ? "编辑阅读计划" : "新增阅读计划" });
    const body = this.contentEl.createDiv({ cls: "cow-reading-plan-modal-body" });
    this.renderBookPicker(body);
    this.renderPlanForm(body);
    this.renderActions();
  }

  private renderBookPicker(container: HTMLElement): void {
    const section = container.createDiv({ cls: "cow-reading-plan-picker" });
    const head = section.createDiv({ cls: "cow-list-item-head" });
    head.createEl("strong", { text: "选择书籍" });
    const addBook = head.createEl("button", { cls: "cow-section-add-button", attr: { type: "button" } });
    setIcon(addBook.createSpan(), "plus");
    addBook.createSpan({ text: "增加书籍" });
    addBook.addEventListener("click", () => {
      new AddBookModal(this.app, this.store, () => {
        this.onDataChanged();
        const books = this.store.getBooks();
        this.selectedBookId = books[books.length - 1]?.id ?? this.selectedBookId;
        this.render();
      }).open();
    });

    const search = section.createEl("input", {
      value: this.query,
      attr: { type: "search", placeholder: "搜索书名或作者" }
    });
    search.addEventListener("input", () => {
      this.query = search.value;
      this.render();
    });

    const list = section.createDiv({ cls: "cow-reading-plan-book-list" });
    const books = this.filterBooks();
    if (books.length === 0) {
      list.createDiv({ cls: "cow-empty-state", text: "还没有可选择的书籍，可以先增加一本。" });
      return;
    }
    books.forEach((book) => {
      const row = list.createEl("button", {
        cls: `cow-reading-plan-book-option ${this.selectedBookId === book.id ? "is-selected" : ""}`,
        attr: { type: "button" }
      });
      const cover = row.createDiv({ cls: "cow-reading-plan-book-cover" });
      const src = this.getCoverSrc(book);
      if (src) renderCoverImage(cover, src, book.title);
      else cover.createSpan({ text: book.title.slice(0, 2) });
      const body = row.createDiv({ cls: "cow-reading-plan-book-meta" });
      body.createEl("strong", { text: book.title });
      body.createSpan({ text: `${book.author} · ${bookStatusLabel(book)}` });
      row.addEventListener("click", () => {
        this.selectedBookId = book.id;
        this.render();
      });
    });
  }

  private renderPlanForm(container: HTMLElement): void {
    const form = container.createDiv({ cls: "cow-reading-plan-form" });
    this.renderDateField(form, "开始日期", this.startDate, (value) => {
      this.startDate = value;
      if (this.endDate < this.startDate) this.endDate = this.startDate;
      this.render();
    });
    this.renderDateField(form, "结束日期", this.endDate, (value) => {
      this.endDate = value;
      this.render();
    });

    const goalRow = form.createDiv({ cls: "cow-book-form-row" });
    goalRow.createEl("label", { text: "阅读目标" });
    const goal = goalRow.createEl("input", {
      value: this.goal,
      attr: { type: "text", placeholder: "例如：读完整本书 / 第 1-4 章 / 300 页" }
    });
    goal.addEventListener("input", () => this.goal = goal.value);

    const progressRow = form.createDiv({ cls: "cow-book-form-row cow-progress-editor-row" });
    progressRow.createEl("label", { text: "计划进度" });
    const progressControls = progressRow.createDiv({ cls: "cow-progress-editor-inline" });
    const range = progressControls.createEl("input", { attr: { type: "range", min: "0", max: "100", step: "1" } });
    const number = progressControls.createEl("input", { value: String(this.progress), attr: { type: "number", min: "0", max: "100", step: "1", "aria-label": "进度百分比" } });
    const percent = progressControls.createSpan({ text: `${this.progress}%` });
    range.value = String(this.progress);
    const updateProgress = (value: number) => {
      this.progress = Math.max(0, Math.min(100, Math.round(value)));
      range.value = String(this.progress);
      number.value = String(this.progress);
      percent.setText(`${this.progress}%`);
    };
    range.addEventListener("input", () => updateProgress(Number(range.value)));
    number.addEventListener("input", () => updateProgress(Number(number.value) || 0));

    const noteRow = form.createDiv({ cls: "cow-book-form-row" });
    noteRow.createEl("label", { text: "备注" });
    const note = noteRow.createEl("textarea", { text: this.note });
    note.addEventListener("input", () => {
      this.note = note.value;
    });
  }

  private renderDateField(container: HTMLElement, label: string, value: string, onChange: (value: string) => void): void {
    const row = container.createDiv({ cls: "cow-book-form-row cow-clickable-date-row" });
    row.createEl("label", { text: label });
    const input = row.createEl("input", { value, attr: { type: "date" } });
    row.addEventListener("click", () => {
      const dateInput = input as HTMLInputElement & { showPicker?: () => void };
      dateInput.showPicker?.();
      dateInput.focus();
    });
    input.addEventListener("change", () => onChange(input.value));
  }

  private renderActions(): void {
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    const cancel = actions.createEl("button", { text: "取消", attr: { type: "button" } });
    cancel.addEventListener("click", () => this.close());
    const save = actions.createEl("button", { text: "保存计划", cls: "mod-cta", attr: { type: "button" } });
    save.addEventListener("click", async () => {
      if (!this.selectedBookId) {
        new Notice("请先选择一本书。");
        return;
      }
      if (this.endDate < this.startDate) {
        new Notice("结束日期不能早于开始日期。");
        return;
      }
      const now = new Date().toISOString();
      const status = computeReadingPlanStatus(this.startDate, this.endDate, this.progress);
      const completedDate = status === "completed" ? this.plan?.completedDate ?? todayKey() : undefined;
      const completedAt = status === "completed" ? this.plan?.completedAt ?? now : undefined;
      const payload: ReadingPlan = {
        id: this.plan?.id ?? `reading-plan-${Date.now()}`,
        bookId: this.selectedBookId,
        startDate: this.startDate,
        endDate: this.endDate,
        targetPages: this.plan?.targetPages,
        goal: this.goal.trim() || "读完本书",
        progress: this.progress,
        note: this.note.trim(),
        status,
        completedDate,
        completedAt,
        createdAt: this.plan?.createdAt ?? now,
        updatedAt: now
      };
      if (this.plan) await this.store.updateReadingPlan(this.plan.id, payload);
      else await this.store.addReadingPlan(payload);
      this.onDataChanged();
      this.close();
    });
  }

  private filterBooks(): BookItem[] {
    const query = this.query.trim().toLowerCase();
    return this.store.getBooks().filter((book) => {
      if (!query) return true;
      return `${book.title} ${book.author}`.toLowerCase().includes(query);
    });
  }

  private getCoverSrc(book: BookItem): string | undefined {
    if (book.coverPath) return this.app.vault.adapter.getResourcePath(book.coverPath);
    return book.cover ?? book.coverUrl;
  }
}

export function openReadingPlanDetailModal(
  app: App,
  store: DashboardStore,
  onDataChanged: () => void,
  plan: ReadingPlan
): void {
  new ReadingPlanDetailModal(app, store, onDataChanged, plan).open();
}

class ReadingPlanDetailModal extends Modal {
  constructor(
    app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void,
    private readonly plan: ReadingPlan
  ) {
    super(app);
  }

  onOpen(): void {
    applyResizableModal(this, {
      className: "cute-reading-plan-detail-modal",
      width: "min(760px, 90vw)",
      height: "min(620px, 86vh)",
      maxWidth: "96vw",
      maxHeight: "92vh",
      minWidth: "min(500px, 92vw)",
      minHeight: "min(380px, 82vh)"
    });
    this.render();
  }

  private render(): void {
    const plan = this.store.getReadingPlans().find((item) => item.id === this.plan.id) ?? this.plan;
    const book = this.store.getBooks().find((item) => item.id === plan.bookId);
    const status = plan.status;
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-reading-plan-detail-modal-content");
    this.contentEl.createEl("h2", { text: "阅读计划详情" });
    const card = this.contentEl.createDiv({ cls: `cow-reading-plan-detail-card is-${status}` });
    const head = card.createDiv({ cls: "cow-list-item-head" });
    const title = head.createEl("button", { cls: "cow-link-button", text: book?.title ?? "未找到关联书籍", attr: { type: "button" } });
    title.addEventListener("click", () => {
      if (!book) return;
      new AddBookModal(this.app, this.store, () => {
        this.onDataChanged();
        this.render();
      }, book).open();
    });
    head.createSpan({ cls: `cow-reading-plan-status is-${status}`, text: status === "completed" ? `✓ ${readingPlanStatusLabel(status)}` : readingPlanStatusLabel(status) });
    card.createDiv({ cls: "cow-meta-line", text: book ? `${book.author} · ${book.currentPage}/${book.totalPages} 页` : "这条计划保留了数据，但书籍记录可能已被删除。" });
    card.createDiv({ cls: "cow-meta-line", text: formatDateRange(plan.startDate, plan.endDate) });
    if (plan.completedAt ?? plan.completedDate) card.createDiv({ cls: "cow-meta-line", text: `完成：${(plan.completedAt ?? plan.completedDate)?.slice(0, 10)}` });
    card.createEl("p", { text: plan.goal ?? "读完本书" });
    this.renderProgress(card, plan);
    this.renderRhythm(card, plan, book);
    if (plan.note) card.createEl("p", { text: plan.note });

    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "编辑", attr: { type: "button" } }).addEventListener("click", () => openReadingPlanModal(this.app, this.store, () => {
      this.onDataChanged();
      this.close();
    }, plan));
    if (status !== "completed") {
      actions.createEl("button", { text: "完成", attr: { type: "button" } }).addEventListener("click", async () => {
        await this.store.completeReadingPlan(plan.id);
        this.onDataChanged();
        this.render();
      });
    }
    actions.createEl("button", { text: "关闭", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", () => this.close());
  }

  private renderProgress(container: HTMLElement, plan: ReadingPlan): void {
    const progress = Math.max(0, Math.min(100, Number(plan.progress) || 0));
    const row = container.createDiv({ cls: "cow-reading-plan-progress" });
    row.createSpan({ text: `计划进度 ${progress}%` });
    const track = row.createDiv({ cls: "cow-month-progress-track" });
    track.createDiv({ cls: "cow-month-progress-fill is-pink", attr: { style: `width: ${progress}%` } });
  }

  private renderRhythm(container: HTMLElement, plan: ReadingPlan, book: BookItem | undefined): void {
    const today = todayKey();
    const daysLeft = Math.max(0, daysBetween(today, plan.endDate) + 1);
    const rhythm = container.createDiv({ cls: "cow-reading-rhythm" });
    if (book?.totalPages) {
      const remainingPages = Math.max(0, book.totalPages - book.currentPage);
      const pagesPerDay = daysLeft <= 0 ? remainingPages : Math.ceil(remainingPages / daysLeft);
      rhythm.createSpan({ text: `剩余 ${remainingPages} 页` });
      rhythm.createSpan({ text: `${daysLeft} 天` });
      rhythm.createSpan({ text: `建议 ${pagesPerDay} 页/天` });
      return;
    }
    rhythm.createSpan({ text: `剩余 ${daysLeft} 天` });
  }
}

export class ReadingPlanStatisticsModal extends Modal {
  private year = new Date().getFullYear();
  private month: number | "all" = new Date().getMonth() + 1;
  private selectedDate = todayKey();
  private statusFilter: PlanStatusFilter = "all";

  constructor(app: App, private readonly store: DashboardStore) {
    super(app);
  }

  onOpen(): void {
    applyResizableModal(this, {
      className: "cute-goal-stats-modal cute-reading-plan-stats-modal",
      width: "min(1050px, 92vw)",
      height: "min(720px, 86vh)",
      maxWidth: "96vw",
      maxHeight: "92vh",
      minWidth: "min(560px, 92vw)",
      minHeight: "min(460px, 82vh)"
    });
    this.render();
  }

  private render(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-goal-stats-modal", "cow-reading-plan-stats");
    const content = renderGoalStatisticsLayout(
      this.contentEl,
      "阅读计划统计",
      [
        { label: "<", onClick: () => { this.year -= 1; this.render(); } },
        { label: String(this.year), active: true },
        { label: ">", onClick: () => { this.year += 1; this.render(); } }
      ],
      (toolbar) => {
        const months = toolbar.createDiv({ cls: "cow-goal-period-tabs is-months" });
        const all = months.createEl("button", { text: "全部月份", cls: this.month === "all" ? "is-active" : "", attr: { type: "button" } });
        all.addEventListener("click", () => {
          this.month = "all";
          this.render();
        });
        for (let month = 1; month <= 12; month += 1) {
          const button = months.createEl("button", { text: `${month}月`, cls: this.month === month ? "is-active" : "", attr: { type: "button" } });
          button.addEventListener("click", () => {
            this.month = month;
            this.render();
          });
        }
      }
    );
    this.renderStats(content);
    const layout = content.createDiv({ cls: "cow-reading-plan-stats-layout" });
    this.renderCalendar(layout);
    this.renderPlanDetails(layout);
  }

  private renderStats(container: HTMLElement): void {
    const plans = this.getPeriodPlans();
    const completed = plans.filter((plan) => this.resolveStatus(plan) === "completed").length;
    const active = plans.filter((plan) => this.resolveStatus(plan) === "active").length;
    const overdue = plans.filter((plan) => this.resolveStatus(plan) === "overdue").length;
    const rate = plans.length === 0 ? 0 : Math.round((completed / plans.length) * 100);
    const stats = [
      ["计划总数", plans.length],
      ["完成", completed],
      ["进行中", active],
      ["逾期", overdue],
      ["完成率", `${rate}%`]
    ];
    const grid = container.createDiv({ cls: "cow-stats-card-grid" });
    stats.forEach(([label, value]) => {
      const card = grid.createDiv({ cls: "cow-stats-card" });
      card.createEl("strong", { text: String(value) });
      card.createSpan({ text: String(label) });
    });
  }

  private renderCalendar(container: HTMLElement): void {
    const shell = container.createDiv({ cls: "cow-reading-plan-calendar-panel" });
    shell.createEl("strong", { text: this.month === "all" ? `${this.year} 全年计划分布` : `${this.year}年${this.month}月计划日历` });
    if (this.month === "all") {
      const months = shell.createDiv({ cls: "cow-reading-plan-year-months" });
      for (let month = 1; month <= 12; month += 1) {
        const count = this.store.getReadingPlans().filter((plan) => planOverlapsMonth(plan, this.year, month)).length;
        const button = months.createEl("button", { cls: count > 0 ? "has-plan" : "", attr: { type: "button" } });
        button.createEl("strong", { text: `${month}月` });
        button.createSpan({ text: count > 0 ? `${count} 个计划` : "无计划" });
        button.addEventListener("click", () => {
          this.month = month;
          this.selectedDate = `${this.year}-${String(month).padStart(2, "0")}-01`;
          this.render();
        });
      }
      return;
    }

    const grid = shell.createDiv({ cls: "cow-review-calendar cow-reading-plan-calendar" });
    ["一", "二", "三", "四", "五", "六", "日"].forEach((day) => grid.createDiv({ cls: "cow-review-calendar-week", text: day }));
    const first = new Date(this.year, this.month - 1, 1);
    const firstDay = first.getDay() === 0 ? 6 : first.getDay() - 1;
    for (let index = 0; index < firstDay; index += 1) grid.createDiv({ cls: "cow-review-calendar-empty" });
    const days = new Date(this.year, this.month, 0).getDate();
    for (let day = 1; day <= days; day += 1) {
      const key = `${this.year}-${String(this.month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const hasPlan = this.store.getReadingPlans().some((plan) => dateInRange(key, plan.startDate, plan.endDate));
      const button = grid.createEl("button", {
        cls: `cow-review-calendar-day ${hasPlan ? "has-review" : ""} ${this.selectedDate === key ? "is-selected" : ""}`,
        attr: { type: "button" }
      });
      button.createSpan({ text: String(day) });
      if (hasPlan) button.createSpan({ cls: "cow-calendar-dot" });
      button.addEventListener("click", () => {
        this.selectedDate = key;
        this.render();
      });
    }
  }

  private renderPlanDetails(container: HTMLElement): void {
    const shell = container.createDiv({ cls: "cow-goal-stats-list cow-reading-plan-detail-list" });
    const title = this.month === "all" ? `${this.year} 年阅读计划` : `${formatMonthDay(this.selectedDate)} 涉及的计划`;
    shell.createEl("strong", { text: title });
    const filters = shell.createDiv({ cls: "cow-goal-period-tabs" });
    [
      ["all", "全部"],
      ["planned", "计划中"],
      ["active", "进行中"],
      ["completed", "已完成"],
      ["overdue", "已逾期"]
    ].forEach(([value, label]) => {
      const button = filters.createEl("button", { text: label, cls: this.statusFilter === value ? "is-active" : "", attr: { type: "button" } });
      button.addEventListener("click", () => {
        this.statusFilter = value as PlanStatusFilter;
        this.render();
      });
    });
    const plans = this.getVisibleDetailPlans();
    if (plans.length === 0) {
      shell.createDiv({ cls: "cow-empty-state", text: "这个时间范围暂无阅读计划。" });
      return;
    }
    plans.forEach((plan) => {
      const book = this.findBook(plan.bookId);
      const card = shell.createDiv({ cls: `cow-data-card ${this.resolveStatus(plan) === "completed" ? "is-complete" : ""}` });
      card.createEl("strong", { text: book?.title ?? "未知书籍" });
      card.createDiv({ cls: "cow-meta-line", text: `${formatDateRange(plan.startDate, plan.endDate)} · ${readingPlanStatusLabel(this.resolveStatus(plan))}` });
      card.createDiv({ cls: "cow-meta-line", text: `${book?.author ?? "未知作者"} · ${plan.goal ?? "读完本书"} · ${plan.progress ?? 0}%` });
      if (plan.note) card.createEl("p", { text: plan.note });
    });
  }

  private getPeriodPlans(): ReadingPlan[] {
    return this.store.getReadingPlans().filter((plan) => {
      if (this.month === "all") return plan.startDate.slice(0, 4) <= String(this.year) && plan.endDate.slice(0, 4) >= String(this.year);
      return planOverlapsMonth(plan, this.year, this.month);
    });
  }

  private getVisibleDetailPlans(): ReadingPlan[] {
    const plans = this.month === "all"
      ? this.getPeriodPlans()
      : this.store.getReadingPlans().filter((plan) => dateInRange(this.selectedDate, plan.startDate, plan.endDate));
    return plans.filter((plan) => this.statusFilter === "all" || this.resolveStatus(plan) === this.statusFilter);
  }

  private resolveStatus(plan: ReadingPlan): ReadingPlan["status"] {
    return this.store.getReadingPlans().find((item) => item.id === plan.id)?.status ?? plan.status;
  }

  private findBook(bookId: string): BookItem | undefined {
    return this.store.getBooks().find((book) => book.id === bookId);
  }
}

function todayKey(): string {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function dateInRange(date: string, startDate: string, endDate: string): boolean {
  return date >= startDate && date <= endDate;
}

function planOverlapsMonth(plan: ReadingPlan, year: number, month: number): boolean {
  const start = `${year}-${String(month).padStart(2, "0")}-01`;
  const end = `${year}-${String(month).padStart(2, "0")}-${String(new Date(year, month, 0).getDate()).padStart(2, "0")}`;
  return plan.startDate <= end && plan.endDate >= start;
}

function formatMonthDay(date: string): string {
  const [, month, day] = date.split("-");
  return `${Number(month)}月${Number(day)}日`;
}

function formatDateRange(startDate: string, endDate: string): string {
  return `${formatMonthDay(startDate)} - ${formatMonthDay(endDate)}`;
}

export function readingPlanStatusLabel(status: ReadingPlan["status"]): string {
  if (status === "active") return "进行中";
  if (status === "completed") return "已完成";
  if (status === "overdue") return "已逾期";
  return "未开始";
}

function computeReadingPlanStatus(startDate: string, endDate: string, progress: number): ReadingPlan["status"] {
  if (progress >= 100) return "completed";
  const today = todayKey();
  if (today < startDate) return "planned";
  if (today > endDate) return "overdue";
  return "active";
}

function daysBetween(startDate: string, endDate: string): number {
  const start = new Date(`${startDate}T00:00:00`).getTime();
  const end = new Date(`${endDate}T00:00:00`).getTime();
  return Math.floor((end - start) / 86400000);
}

function bookStatusLabel(book: BookItem): string {
  if (book.readingStatus === "reading") return "在读";
  if (book.readingStatus === "finished") return "已读";
  return "想读";
}

function renderCoverImage(container: HTMLElement, src: string, title: string): void {
  const img = container.createEl("img", { attr: { src, alt: title } });
  img.addEventListener("error", () => {
    container.empty();
    container.createSpan({ text: title.slice(0, 2) });
  });
}
