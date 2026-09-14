import { App, Notice, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import type { BookItem } from "../../types/dashboard";

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
    if (this.book.cover) {
      cover.createEl("img", { attr: { src: this.book.cover, alt: this.book.title } });
    } else {
      cover.createSpan({ text: this.book.title.slice(0, 2) });
    }

    const body = card.createDiv({ cls: "cow-book-body" });
    body.createEl("strong", { text: this.book.title });
    body.createSpan({ text: this.book.author });
    const progress = this.book.totalPages === 0 ? 0 : Math.round((this.book.currentPage / this.book.totalPages) * 100);
    const track = body.createDiv({ cls: "cow-month-progress-track" });
    track.createDiv({ cls: "cow-month-progress-fill is-pink", attr: { style: `width: ${progress}%` } });

    const controls = body.createDiv({ cls: "cow-book-controls" });
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

    const open = controls.createEl("button", { attr: { type: "button", "aria-label": "打开阅读笔记" } });
    setIcon(open, "notebook-tabs");
    open.addEventListener("click", () => void this.openNote());

    const done = controls.createEl("button", { attr: { type: "button", "aria-label": "完成阅读" } });
    setIcon(done, "check");
    done.addEventListener("click", async () => {
      await this.store.completeBook(this.book.id);
      this.onDataChanged();
    });
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
}
