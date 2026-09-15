import { App, Notice, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import type { BookItem } from "../../types/dashboard";
import { AddBookModal } from "./AddBookModal";

export class BookCard {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly book: BookItem,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const card = container.createDiv({ cls: "cow-book-card" });
    const cover = card.createDiv({ cls: "cow-book-cover" });
    const coverSrc = this.getCoverSrc();
    if (coverSrc) {
      cover.createEl("img", { attr: { src: coverSrc, alt: this.book.title } });
    } else {
      cover.createSpan({ text: this.book.title.slice(0, 2) });
    }

    const body = card.createDiv({ cls: "cow-book-body" });
    body.createEl("strong", { text: this.book.title });
    body.createSpan({ text: `${this.book.author} · ${this.statusLabel()}` });
    if (this.book.startDate) body.createSpan({ text: `开始：${this.book.startDate}` });
    if (this.book.readingStatus === "finished" && this.book.finishDate) body.createSpan({ text: `完成：${this.book.finishDate}` });
    const progress = this.book.totalPages === 0 ? 0 : Math.round((this.book.currentPage / this.book.totalPages) * 100);
    const track = body.createDiv({ cls: "cow-month-progress-track" });
    track.createDiv({ cls: "cow-month-progress-fill is-pink", attr: { style: `width: ${progress}%` } });

    const controls = body.createDiv({ cls: "cow-book-controls" });
    const status = controls.createEl("select", { attr: { "aria-label": "阅读状态" } });
    [
      { value: "want-to-read", label: "想读" },
      { value: "reading", label: "在读" },
      { value: "finished", label: "已读" }
    ].forEach((option) => status.createEl("option", { value: option.value, text: option.label }));
    status.value = this.book.readingStatus ?? "want-to-read";
    status.addEventListener("change", async () => {
      const nextStatus = status.value as BookItem["readingStatus"];
      const shouldCompletePlans = nextStatus === "finished" ? this.shouldCompleteRelatedPlans() : false;
      await this.store.updateBookReadingStatus(this.book.id, nextStatus);
      if (nextStatus === "finished") {
        await this.completeRelatedPlansIfConfirmed(shouldCompletePlans);
      }
      this.onDataChanged();
    });
    const pageInput = controls.createEl("input", {
      type: "number",
      value: String(this.book.currentPage),
      attr: { min: "0", max: String(this.book.totalPages), "aria-label": "当前页数" }
    });
    pageInput.addEventListener("change", async () => {
      await this.store.updateBookPage(this.book.id, Number(pageInput.value) || 0);
      this.onDataChanged();
    });
    controls.createSpan({ text: `/ ${this.book.totalPages}` });

    const openBook = controls.createEl("button", { attr: { type: "button", "aria-label": "阅读书籍" } });
    setIcon(openBook, "book-open");
    openBook.addEventListener("click", () => void this.openBook());

    const openNote = controls.createEl("button", { attr: { type: "button", "aria-label": "打开阅读笔记" } });
    setIcon(openNote, "notebook-tabs");
    openNote.addEventListener("click", () => void this.openNote());

    const done = controls.createEl("button", { attr: { type: "button", "aria-label": "完成阅读" } });
    setIcon(done, "check");
    done.addEventListener("click", async () => {
      const shouldCompletePlans = this.shouldCompleteRelatedPlans();
      await this.store.completeBook(this.book.id);
      await this.completeRelatedPlansIfConfirmed(shouldCompletePlans);
      this.onDataChanged();
    });

    const edit = controls.createEl("button", { attr: { type: "button", "aria-label": "编辑书籍" } });
    setIcon(edit, "pencil");
    edit.addEventListener("click", () => {
      new AddBookModal(this.app, this.store, () => {
        this.onDataChanged();
      }, this.book).open();
    });

    const remove = controls.createEl("button", { attr: { type: "button", "aria-label": "下架" } });
    setIcon(remove, "archive");
    remove.addEventListener("click", async () => {
      await this.store.updateBookShelfStatus(this.book.id, "off-shelf");
      this.onDataChanged();
    });
  }

  private async openBook(): Promise<void> {
    if (!this.book.bookFilePath) {
      new Notice("这本书还没有绑定电子书文件。");
      return;
    }
    const file = this.app.vault.getFileByPath(this.book.bookFilePath);
    if (!file) {
      new Notice(`没有找到书籍文件：${this.book.bookFilePath}`);
      return;
    }
    try {
      await this.app.workspace.getLeaf(false).openFile(file);
    } catch {
      const ext = this.book.bookFilePath.split(".").pop()?.toUpperCase() ?? "该格式";
      new Notice(`当前未检测到 ${ext} 阅读器插件。文件已保留在 Vault 中。`);
    }
  }

  private async openNote(): Promise<void> {
    if (!this.book.notePath) {
      new Notice("这本书还没有绑定阅读笔记。");
      return;
    }
    const file = this.app.vault.getFileByPath(this.book.notePath);
    if (!file) {
      new Notice(`没有找到笔记：${this.book.notePath}`);
      return;
    }
    await this.app.workspace.getLeaf(false).openFile(file);
  }

  private getCoverSrc(): string | undefined {
    if (this.book.coverPath) return this.app.vault.adapter.getResourcePath(this.book.coverPath);
    return this.book.cover ?? this.book.coverUrl;
  }

  private statusLabel(): string {
    if (this.book.readingStatus === "reading") return "在读";
    if (this.book.readingStatus === "finished") return "已读";
    return "想读";
  }

  private shouldCompleteRelatedPlans(): boolean {
    const relatedPlans = this.store.getReadingPlans().filter((plan) => plan.bookId === this.book.id && plan.status !== "completed");
    if (relatedPlans.length === 0) return false;
    return confirm(`《${this.book.title}》已有 ${relatedPlans.length} 条未完成阅读计划，是否同时标记完成？`);
  }

  private async completeRelatedPlansIfConfirmed(confirmed: boolean): Promise<void> {
    if (!confirmed) return;
    const relatedPlans = this.store.getReadingPlans().filter((plan) => plan.bookId === this.book.id && !plan.completedDate);
    await Promise.all(relatedPlans.map((plan) => this.store.completeReadingPlan(plan.id)));
    new Notice("关联阅读计划已标记完成。");
  }
}
