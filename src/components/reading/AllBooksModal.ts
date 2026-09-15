import { App, Modal, Notice, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import type { BookItem } from "../../types/dashboard";
import { applyResizableModal } from "../ResizableModal";
import { AddBookModal } from "./AddBookModal";

type BookFilter = "all" | "want-to-read" | "reading" | "finished" | "on-shelf" | "off-shelf";

export class AllBooksModal extends Modal {
  private filter: BookFilter = "all";
  private query = "";

  constructor(app: App, private readonly store: DashboardStore, private readonly onDataChanged: () => void) {
    super(app);
  }

  onOpen(): void {
    applyResizableModal(this, {
      className: "cute-book-modal",
      width: "min(1050px, 92vw)",
      height: "min(720px, 86vh)",
      maxWidth: "96vw",
      maxHeight: "92vh",
      minWidth: "min(560px, 92vw)",
      minHeight: "min(430px, 82vh)"
    });
    this.render();
  }

  private render(): void {
    const books = this.filterBooks();
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-book-modal", "cow-all-books-modal");
    this.contentEl.createEl("h2", { text: "所有书籍" });
    this.renderStats();
    this.renderFilters();
    const list = this.contentEl.createDiv({ cls: "cow-all-books-list" });
    if (books.length === 0) {
      list.createDiv({ cls: "cow-empty-state", text: "没有找到匹配的书籍。" });
      return;
    }
    books.forEach((book) => this.renderBookRow(list, book));
  }

  private renderStats(): void {
    const books = this.store.getBooks();
    const stats = [
      ["总书籍数", books.length],
      ["想读", books.filter((book) => book.readingStatus === "want-to-read").length],
      ["在读", books.filter((book) => book.readingStatus === "reading").length],
      ["已读", books.filter((book) => book.readingStatus === "finished").length],
      ["书架上", books.filter((book) => book.shelfStatus !== "off-shelf").length],
      ["已下架", books.filter((book) => book.shelfStatus === "off-shelf").length]
    ];
    const grid = this.contentEl.createDiv({ cls: "cow-book-stats-grid" });
    stats.forEach(([label, value]) => {
      const card = grid.createDiv({ cls: "cow-stats-card" });
      card.createEl("strong", { text: String(value) });
      card.createSpan({ text: String(label) });
    });
  }

  private renderFilters(): void {
    const controls = this.contentEl.createDiv({ cls: "cow-all-books-controls" });
    const search = controls.createEl("input", { attr: { type: "search", placeholder: "搜索标题、作者、ISBN" } });
    search.value = this.query;
    search.addEventListener("input", () => {
      this.query = search.value;
      this.render();
    });
    const filters = controls.createDiv({ cls: "cow-book-tabs" });
    [
      { id: "all", label: "全部" },
      { id: "want-to-read", label: "想读" },
      { id: "reading", label: "在读" },
      { id: "finished", label: "已读" },
      { id: "on-shelf", label: "书架上" },
      { id: "off-shelf", label: "已下架" }
    ].forEach((option) => {
      const button = filters.createEl("button", { text: option.label, cls: this.filter === option.id ? "is-active" : "", attr: { type: "button" } });
      button.addEventListener("click", () => {
        this.filter = option.id as BookFilter;
        this.render();
      });
    });
  }

  private renderBookRow(container: HTMLElement, book: BookItem): void {
    const row = container.createDiv({ cls: "cow-all-book-row" });
    const cover = row.createDiv({ cls: "cow-book-result-cover" });
    const src = this.getCoverSrc(book);
    if (src) cover.createEl("img", { attr: { src, alt: book.title } });
    else cover.createSpan({ text: book.title.slice(0, 2) });
    const body = row.createDiv({ cls: "cow-all-book-body" });
    body.createEl("strong", { text: book.title });
    body.createSpan({ text: `${book.author} · ${this.statusLabel(book)} · ${book.shelfStatus === "off-shelf" ? "已下架" : "书架上"}` });
    body.createSpan({ text: [book.bookFilePath, book.notePath].filter(Boolean).join(" · ") || "暂无文件路径" });
    const actions = row.createDiv({ cls: "cow-list-item-actions" });
    this.iconButton(actions, "book-open", "打开书籍", () => void this.openBook(book));
    this.iconButton(actions, "notebook-tabs", "打开笔记", () => void this.openNote(book));
    this.iconButton(actions, "pencil", "编辑", () => new AddBookModal(this.app, this.store, () => {
      this.onDataChanged();
      this.render();
    }, book).open());
    this.iconButton(actions, book.shelfStatus === "off-shelf" ? "archive-restore" : "archive", book.shelfStatus === "off-shelf" ? "上架" : "下架", async () => {
      await this.store.updateBookShelfStatus(book.id, book.shelfStatus === "off-shelf" ? "on-shelf" : "off-shelf");
      this.onDataChanged();
      this.render();
    });
    this.iconButton(actions, "trash-2", "删除书籍记录", async () => {
      if (!confirm(`删除“${book.title}”书籍记录？不会删除电子书、笔记或封面文件。`)) return;
      await this.store.deleteBook(book.id);
      this.onDataChanged();
      this.render();
    });
  }

  private filterBooks(): BookItem[] {
    const query = this.query.trim().toLowerCase();
    return this.store.getBooks().filter((book) => {
      const statusMatch = this.filter === "all"
        || book.readingStatus === this.filter
        || book.shelfStatus === this.filter;
      const queryMatch = !query || [book.title, book.author, book.isbn10, book.isbn13].some((value) => (value ?? "").toLowerCase().includes(query));
      return statusMatch && queryMatch;
    });
  }

  private iconButton(container: HTMLElement, icon: string, label: string, onClick: () => void): void {
    const button = container.createEl("button", { attr: { type: "button", "aria-label": label } });
    setIcon(button, icon);
    button.addEventListener("click", onClick);
  }

  private async openBook(book: BookItem): Promise<void> {
    if (!book.bookFilePath) {
      new Notice("这本书还没有绑定电子书文件。");
      return;
    }
    const file = this.app.vault.getFileByPath(book.bookFilePath);
    if (!file) {
      new Notice(`没有找到书籍文件：${book.bookFilePath}`);
      return;
    }
    try {
      await this.app.workspace.getLeaf(false).openFile(file);
    } catch {
      const ext = book.bookFilePath.split(".").pop()?.toUpperCase() ?? "该格式";
      new Notice(`当前未检测到 ${ext} 阅读器插件。文件已保留在 Vault 中。`);
    }
  }

  private async openNote(book: BookItem): Promise<void> {
    if (!book.notePath) {
      new Notice("这本书还没有绑定阅读笔记。");
      return;
    }
    const file = this.app.vault.getFileByPath(book.notePath);
    if (!file) {
      new Notice(`没有找到笔记：${book.notePath}`);
      return;
    }
    await this.app.workspace.getLeaf(false).openFile(file);
  }

  private getCoverSrc(book: BookItem): string | undefined {
    if (book.coverPath) return this.app.vault.adapter.getResourcePath(book.coverPath);
    return book.cover ?? book.coverUrl;
  }

  private statusLabel(book: BookItem): string {
    if (book.readingStatus === "reading") return "在读";
    if (book.readingStatus === "finished") return "已读";
    return "想读";
  }
}
