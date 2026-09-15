import { App, Modal, Notice } from "obsidian";
import { formatDateKey, type DashboardStore } from "../../core/DashboardStore";
import type { ReviewItem } from "../../types/dashboard";
import { applyResizableModal } from "../ResizableModal";
import { renderGoalStatisticsLayout } from "./GoalStatisticsLayout";

function setupReviewModal(modal: Modal): void {
  applyResizableModal(modal, {
    className: "cute-goal-edit-modal",
    width: "min(720px, 90vw)",
    maxWidth: "94vw",
    maxHeight: "88vh",
    minWidth: "min(420px, 90vw)",
    minHeight: "min(320px, 80vh)"
  });
}

function setupReviewStatsModal(modal: Modal): void {
  applyResizableModal(modal, {
    className: "cute-goal-stats-modal",
    width: "min(860px, 92vw)",
    height: "min(680px, 86vh)",
    maxWidth: "96vw",
    maxHeight: "92vh",
    minWidth: "min(620px, 92vw)",
    minHeight: "min(420px, 86vh)"
  });
}

function createField(container: HTMLElement, label: string, type: string, value: string): HTMLInputElement {
  const row = container.createDiv({ cls: `cow-goal-form-row ${type === "date" ? "is-picker" : ""}` });
  row.createEl("label", { text: label });
  const input = row.createEl("input", { attr: { type, value } });
  if (type === "date") {
    row.addEventListener("click", () => {
      input.focus();
      try {
        (input as HTMLInputElement & { showPicker?: () => void }).showPicker?.();
      } catch {
        input.focus();
      }
    });
  }
  return input;
}

function createTextarea(container: HTMLElement, label: string, value: string): HTMLTextAreaElement {
  const row = container.createDiv({ cls: "cow-goal-form-row" });
  row.createEl("label", { text: label });
  return row.createEl("textarea", { text: value });
}

export function openReviewItemModal(app: App, store: DashboardStore, onDone: () => void, review?: ReviewItem): void {
  new ReviewItemModal(app, store, onDone, review).open();
}

class ReviewItemModal extends Modal {
  constructor(app: App, private readonly store: DashboardStore, private readonly onDone: () => void, private readonly review?: ReviewItem) {
    super(app);
  }

  onOpen(): void {
    setupReviewModal(this);
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-goal-modal");
    this.contentEl.createEl("h2", { text: this.review ? "编辑复盘" : "添加复盘" });
    const date = createField(this.contentEl, "日期", "date", this.review?.date ?? formatDateKey(new Date()));
    const title = createField(this.contentEl, "标题", "text", this.review?.title ?? "");
    const content = createTextarea(this.contentEl, "内容", this.review?.content ?? "");
    const statusRow = this.contentEl.createDiv({ cls: "cow-goal-form-row is-inline" });
    const done = statusRow.createEl("input", { attr: { type: "checkbox" } });
    done.checked = this.review?.status === "done";
    statusRow.createEl("label", { text: "已完成复盘" });

    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      if (!title.value.trim()) {
        new Notice("请输入复盘标题。");
        return;
      }
      const now = new Date().toISOString();
      const values: ReviewItem = {
        id: this.review?.id ?? `review-${Date.now()}`,
        date: date.value || formatDateKey(new Date()),
        title: title.value.trim(),
        content: content.value.trim(),
        status: done.checked ? "done" : "todo",
        createdAt: this.review?.createdAt ?? now,
        updatedAt: now
      };
      if (this.review) await this.store.updateReviewItem(this.review.id, values);
      else await this.store.addReviewItem(values);
      this.onDone();
      this.close();
    });
  }
}

export class ReviewStatisticsModal extends Modal {
  private year = new Date().getFullYear();
  private month = new Date().getMonth() + 1;
  private selectedDate = formatDateKey(new Date());

  constructor(app: App, private readonly store: DashboardStore) {
    super(app);
  }

  onOpen(): void {
    setupReviewStatsModal(this);
    this.render();
  }

  private render(): void {
    const all = this.store.getReviewItems();
    const monthly = all.filter((item) => item.date.startsWith(`${this.year}-${String(this.month).padStart(2, "0")}`));
    const yearly = all.filter((item) => item.date.startsWith(String(this.year)));
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-goal-modal", "cow-goal-stats-modal");
    const content = renderGoalStatisticsLayout(this.contentEl, "复盘统计", [
      { label: "上一年", onClick: () => { this.year -= 1; this.render(); } },
      { label: String(this.year), active: true },
      { label: "下一年", onClick: () => { this.year += 1; this.render(); } }
    ], (toolbar) => {
      const months = toolbar.createDiv({ cls: "cow-goal-period-tabs is-months" });
      for (let month = 1; month <= 12; month += 1) {
        const button = months.createEl("button", { text: `${month}月`, cls: month === this.month ? "is-active" : "", attr: { type: "button" } });
        button.addEventListener("click", () => {
          this.month = month;
          this.selectedDate = `${this.year}-${String(month).padStart(2, "0")}-01`;
          this.render();
        });
      }
    });
    this.renderStats(content, [
      ["本月复盘次数", monthly.length],
      ["本年复盘次数", yearly.length],
      ["连续复盘天数", this.getStreak(all)],
      ["最近复盘日期", all.slice().sort((a, b) => b.date.localeCompare(a.date))[0]?.date ?? "--"]
    ]);
    this.renderCalendar(content, monthly);
    this.renderSelectedDate(content, all.filter((item) => item.date === this.selectedDate));
  }

  private renderStats(container: HTMLElement, items: Array<[string, string | number]>): void {
    const grid = container.createDiv({ cls: "cow-stats-card-grid" });
    items.forEach(([label, value]) => {
      const card = grid.createDiv({ cls: "cow-stats-card" });
      card.createEl("strong", { text: String(value) });
      card.createSpan({ text: label });
    });
  }

  private renderCalendar(container: HTMLElement, reviews: ReviewItem[]): void {
    const calendar = container.createDiv({ cls: "cow-review-calendar" });
    const firstDay = new Date(this.year, this.month - 1, 1);
    const totalDays = new Date(this.year, this.month, 0).getDate();
    const offset = firstDay.getDay();
    ["日", "一", "二", "三", "四", "五", "六"].forEach((label) => calendar.createDiv({ cls: "cow-review-calendar-week", text: label }));
    for (let index = 0; index < offset; index += 1) calendar.createDiv({ cls: "cow-review-calendar-empty" });
    for (let day = 1; day <= totalDays; day += 1) {
      const date = `${this.year}-${String(this.month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const count = reviews.filter((item) => item.date === date).length;
      const cell = calendar.createEl("button", { cls: `cow-review-calendar-day ${count > 0 ? "has-review" : ""} ${date === this.selectedDate ? "is-selected" : ""}`, attr: { type: "button" } });
      cell.createSpan({ text: String(day) });
      if (count > 0) cell.createDiv({ cls: "cow-calendar-dot is-purple", text: count > 1 ? String(count) : "" });
      cell.addEventListener("click", () => {
        this.selectedDate = date;
        this.render();
      });
    }
  }

  private renderSelectedDate(container: HTMLElement, reviews: ReviewItem[]): void {
    const list = container.createDiv({ cls: "cow-goal-stats-list" });
    list.createEl("strong", { text: `${this.selectedDate} 复盘记录` });
    if (reviews.length === 0) {
      list.createDiv({ cls: "cow-empty-state", text: "这一天还没有复盘。" });
      return;
    }
    reviews.forEach((review) => {
      const row = list.createDiv({ cls: `cow-data-card ${review.status === "done" ? "is-complete" : ""}` });
      row.createEl("strong", { text: review.status === "done" ? `✓ ${review.title}` : review.title });
      row.createEl("p", { text: review.content });
    });
  }

  private getStreak(items: ReviewItem[]): number {
    const dates = new Set(items.map((item) => item.date));
    let cursor = new Date();
    let streak = 0;
    while (dates.has(formatDateKey(cursor))) {
      streak += 1;
      cursor = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() - 1);
    }
    return streak;
  }
}
