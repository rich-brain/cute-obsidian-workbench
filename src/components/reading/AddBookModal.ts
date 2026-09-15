import { App, Modal, Notice, requestUrl, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import type { BookItem } from "../../types/dashboard";
import { applyResizableModal } from "../ResizableModal";

type TabId = "search" | "local" | "manual";
type BookDraft = Partial<BookItem> & { title: string; author: string };

interface BookSearchResult {
  title: string;
  author: string;
  publisher?: string;
  publishDate?: string;
  isbn10?: string;
  isbn13?: string;
  totalPages?: number;
  category?: string;
  description?: string;
  coverUrl?: string;
}

export class AddBookModal extends Modal {
  private activeTab: TabId = "search";
  private draft: BookDraft;
  private searchResults: BookSearchResult[] = [];

  constructor(
    app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void,
    private readonly book?: BookItem
  ) {
    super(app);
    this.draft = {
      ...book,
      title: book?.title ?? "",
      author: book?.author ?? "",
      totalPages: book?.totalPages ?? 200,
      currentPage: book?.currentPage ?? 0,
      readingStatus: book?.readingStatus ?? (book?.status === "在读" ? "reading" : book?.status === "已读" ? "finished" : "want-to-read"),
      shelfStatus: book?.shelfStatus ?? "on-shelf",
      tags: book?.tags ?? []
    };
    if (book) this.activeTab = "manual";
  }

  onOpen(): void {
    applyResizableModal(this, {
      className: "cute-book-modal",
      width: "min(760px, 90vw)",
      maxWidth: "96vw",
      maxHeight: "90vh",
      minWidth: "min(520px, 92vw)",
      minHeight: "min(430px, 82vh)"
    });
    this.render();
  }

  private render(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-book-modal");
    this.contentEl.createEl("h2", { text: this.book ? "编辑书籍" : "增加书籍" });
    this.renderTabs();
    const body = this.contentEl.createDiv({ cls: "cow-book-modal-body" });
    if (this.activeTab === "search") this.renderSearchTab(body);
    if (this.activeTab === "local") this.renderLocalTab(body);
    this.renderBookForm(body);
    this.renderActions();
  }

  private renderTabs(): void {
    const tabs = this.contentEl.createDiv({ cls: "cow-book-tabs" });
    [
      { id: "search", label: "搜索导入" },
      { id: "local", label: "本地文件" },
      { id: "manual", label: "手动添加" }
    ].forEach((tab) => {
      const button = tabs.createEl("button", { text: tab.label, cls: this.activeTab === tab.id ? "is-active" : "", attr: { type: "button" } });
      button.addEventListener("click", () => {
        this.activeTab = tab.id as TabId;
        this.render();
      });
    });
  }

  private renderSearchTab(container: HTMLElement): void {
    const panel = container.createDiv({ cls: "cow-book-search-panel" });
    const search = container.createDiv({ cls: "cow-book-search" });
    const input = search.createEl("input", { attr: { type: "search", placeholder: "输入书名、作者或 ISBN" } });
    input.value = [this.draft.title, this.draft.author].filter(Boolean).join(" ");
    const button = search.createEl("button", { attr: { type: "button" } });
    setIcon(button.createSpan(), "search");
    button.createSpan({ text: "搜索" });
    button.addEventListener("click", async () => {
      this.searchResults = await this.searchBooks(input.value.trim());
      this.render();
    });
    const results = container.createDiv({ cls: "cow-book-search-results" });
    this.searchResults.forEach((result) => this.renderSearchResult(results, result));
    panel.appendChild(search);
    panel.appendChild(results);
  }

  private renderSearchResult(container: HTMLElement, result: BookSearchResult): void {
    const item = container.createDiv({ cls: "cow-book-search-result" });
    const cover = item.createDiv({ cls: "cow-book-result-cover" });
    if (result.coverUrl) this.renderCoverImage(cover, result.coverUrl, result.title);
    else cover.createSpan({ text: result.title.slice(0, 2) });
    const body = item.createDiv({ cls: "cow-book-result-body" });
    body.createEl("strong", { text: result.title });
    body.createSpan({ text: [result.author, result.publisher, result.publishDate].filter(Boolean).join(" · ") || "未知作者" });
    body.createSpan({ text: [`ISBN ${result.isbn13 ?? result.isbn10 ?? "--"}`, result.totalPages ? `${result.totalPages} 页` : ""].filter(Boolean).join(" · ") });
    const select = item.createEl("button", { text: "选择", attr: { type: "button" } });
    select.addEventListener("click", () => {
      this.draft = {
        ...this.draft,
        ...result,
        author: result.author || this.draft.author,
        totalPages: result.totalPages ?? this.draft.totalPages ?? 200,
        bookFilePath: this.draft.bookFilePath
      };
      new Notice("已填入书籍元数据。搜索结果不包含全文，请按需关联本地电子书。");
      this.activeTab = "manual";
      this.render();
    });
  }

  private renderLocalTab(container: HTMLElement): void {
    const panel = container.createDiv({ cls: "cow-book-local-panel" });
    panel.createEl("p", { text: "选择 PDF / EPUB / FB2 / MOBI / AZW3 文件后，会复制到当前 Vault 的 Books/Files/，不会保存本机绝对路径。" });
    const input = panel.createEl("input", { attr: { type: "file", accept: ".pdf,.epub,.fb2,.mobi,.azw3,application/pdf" } });
    input.addEventListener("change", async () => {
      const file = input.files?.[0];
      if (!file) return;
      const path = await this.copyBookFile(file);
      if (!path) return;
      this.draft.bookFilePath = path;
      if (!this.draft.title) this.draft.title = file.name.replace(/\.[^.]+$/, "");
      await this.ensureMetadataFromQuery(this.draft.title);
      this.render();
    });
  }

  private renderBookForm(container: HTMLElement): void {
    const form = container.createDiv({ cls: "cow-book-form" });
    const cover = form.createDiv({ cls: "cow-book-form-cover" });
    const coverSrc = this.draft.coverPath ? this.app.vault.adapter.getResourcePath(this.draft.coverPath) : this.draft.coverUrl ?? this.draft.cover;
    if (coverSrc) this.renderCoverImage(cover, coverSrc, this.draft.title || "封面");
    else cover.createSpan({ text: (this.draft.title || "书").slice(0, 2) });
    const coverInput = cover.createEl("input", { attr: { type: "file", accept: "image/*" } });
    coverInput.addEventListener("change", async () => {
      const file = coverInput.files?.[0];
      if (!file) return;
      this.draft.coverPath = await this.copyCoverFile(file);
      this.render();
    });

    const fields = form.createDiv({ cls: "cow-book-form-fields" });
    this.bindInput(this.textField(fields, "书名", this.draft.title), (value) => this.draft.title = value);
    this.bindInput(this.textField(fields, "作者", this.draft.author), (value) => this.draft.author = value);
    this.bindInput(this.textField(fields, "出版社", this.draft.publisher ?? ""), (value) => this.draft.publisher = value);
    this.bindInput(this.textField(fields, "出版日期", this.draft.publishDate ?? ""), (value) => this.draft.publishDate = value);
    this.bindInput(this.textField(fields, "ISBN", this.draft.isbn13 ?? this.draft.isbn10 ?? ""), (value) => {
      if (value.length === 10) this.draft.isbn10 = value;
      else this.draft.isbn13 = value;
    });
    this.bindInput(this.textField(fields, "总页数", String(this.draft.totalPages ?? 200), "number"), (value) => this.draft.totalPages = Number(value) || 1);
    this.bindInput(this.textField(fields, "当前页", String(this.draft.currentPage ?? 0), "number"), (value) => this.draft.currentPage = Number(value) || 0);
    this.bindInput(this.textField(fields, "分类", this.draft.category ?? ""), (value) => this.draft.category = value);
    this.renderDateField(fields, "开始阅读日期", "startDate");
    this.renderDateField(fields, "结束阅读日期", "finishDate");
    this.renderBookFileField(fields);
    this.renderSelect(fields, "阅读状态", this.draft.readingStatus ?? "want-to-read", [
      { value: "want-to-read", label: "想读" },
      { value: "reading", label: "在读" },
      { value: "finished", label: "已读" }
    ], (value) => {
      this.draft.readingStatus = value as BookItem["readingStatus"];
      if (value === "reading") this.draft.startDate = this.draft.startDate || this.today();
      if (value === "finished") {
        this.draft.startDate = this.draft.startDate || this.today();
        this.draft.finishDate = this.draft.finishDate || this.today();
        this.draft.currentPage = this.draft.totalPages ?? this.draft.currentPage ?? 0;
      }
      this.render();
    });
    this.renderSelect(fields, "书架状态", this.draft.shelfStatus ?? "on-shelf", [
      { value: "on-shelf", label: "上架" },
      { value: "off-shelf", label: "下架" }
    ], (value) => this.draft.shelfStatus = value as BookItem["shelfStatus"]);
    this.bindInput(this.textField(fields, "标签", (this.draft.tags ?? []).join(", ")), (value) => this.draft.tags = value.split(/[,，]/).map((tag) => tag.trim()).filter(Boolean));
    this.bindInput(this.textareaField(fields, "简介", this.draft.description ?? ""), (value) => this.draft.description = value);
  }

  private renderBookFileField(container: HTMLElement): void {
    const row = container.createDiv({ cls: "cow-book-form-row cow-book-file-field" });
    row.createEl("label", { text: "书籍文件" });
    row.createSpan({ text: this.draft.bookFilePath ?? "未关联书籍文件。搜索导入只会导入元数据；如需阅读全文，请选择本地 PDF / EPUB 文件。" });
    const input = row.createEl("input", { attr: { type: "file", accept: ".pdf,.epub,.fb2,.mobi,.azw3,application/pdf" } });
    input.addEventListener("change", async () => {
      const file = input.files?.[0];
      if (!file) return;
      const path = await this.copyBookFile(file);
      if (!path) return;
      this.draft.bookFilePath = path;
      if (!this.draft.title) this.draft.title = file.name.replace(/\.[^.]+$/, "");
      this.render();
    });
  }

  private renderActions(): void {
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: this.book ? "保存" : "添加", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", () => void this.saveBook());
  }

  private async saveBook(): Promise<void> {
    if (!this.draft.title.trim()) {
      new Notice("请输入书名。");
      return;
    }
    if (this.draft.bookFilePath && !await this.verifyVaultFile(this.draft.bookFilePath)) {
      new Notice(`书籍文件导入失败：${this.draft.bookFilePath} 不存在。已取消创建记录。`);
      return;
    }
    const book = await this.prepareBook();
    if (this.book) await this.store.updateBook(this.book.id, book);
    else await this.store.addBook(book);
    this.onDataChanged();
    this.close();
  }

  private async prepareBook(): Promise<BookItem> {
    const readingStatus = this.draft.readingStatus ?? "want-to-read";
    if (this.draft.coverUrl && !this.draft.coverPath) {
      this.draft.coverPath = await this.downloadCover(this.draft.coverUrl, this.draft.title);
    }
    const notePath = this.draft.notePath || await this.ensureBookNote();
    return {
      id: this.book?.id ?? `book-${Date.now()}`,
      ...this.book,
      ...this.draft,
      title: this.draft.title.trim(),
      author: this.draft.author.trim() || "未知作者",
      totalPages: Math.max(1, Number(this.draft.totalPages) || 1),
      currentPage: Math.max(0, Math.min(Number(this.draft.currentPage) || 0, Math.max(1, Number(this.draft.totalPages) || 1))),
      status: readingStatus === "reading" ? "在读" : readingStatus === "finished" ? "已读" : "想读",
      readingStatus,
      shelfStatus: this.draft.shelfStatus ?? "on-shelf",
      notePath,
      createdAt: this.book?.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: this.draft.tags ?? []
    };
  }

  private async searchBooks(query: string): Promise<BookSearchResult[]> {
    if (!query) return [];
    const results: BookSearchResult[] = [];
    try {
      const google = await requestUrl({ url: `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=8` });
      const items = (google.json?.items ?? []) as Array<{ volumeInfo?: Record<string, unknown> }>;
      items.forEach((item) => {
        const info = item.volumeInfo ?? {};
        const identifiers = Array.isArray(info.industryIdentifiers) ? info.industryIdentifiers as Array<{ type?: string; identifier?: string }> : [];
        const imageLinks = info.imageLinks as { thumbnail?: string } | undefined;
        results.push({
          title: String(info.title ?? ""),
          author: Array.isArray(info.authors) ? info.authors.join(", ") : "",
          publisher: String(info.publisher ?? ""),
          publishDate: String(info.publishedDate ?? ""),
          isbn10: identifiers.find((id) => id.type === "ISBN_10")?.identifier,
          isbn13: identifiers.find((id) => id.type === "ISBN_13")?.identifier,
          totalPages: Number(info.pageCount) || undefined,
          category: Array.isArray(info.categories) ? String(info.categories[0]) : "",
          description: String(info.description ?? ""),
          coverUrl: typeof imageLinks?.thumbnail === "string" ? imageLinks.thumbnail.replace("http://", "https://") : undefined
        });
      });
    } catch {
      new Notice("Google Books 搜索失败，已尝试继续使用其它数据源。");
    }
    try {
      const openLibrary = await requestUrl({ url: `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=8` });
      const docs = (openLibrary.json?.docs ?? []) as Array<Record<string, unknown>>;
      docs.forEach((doc) => results.push({
        title: String(doc.title ?? ""),
        author: Array.isArray(doc.author_name) ? doc.author_name.join(", ") : "",
        publisher: Array.isArray(doc.publisher) ? String(doc.publisher[0]) : "",
        publishDate: doc.first_publish_year ? String(doc.first_publish_year) : "",
        isbn10: Array.isArray(doc.isbn) ? doc.isbn.find((value) => String(value).length === 10) as string | undefined : undefined,
        isbn13: Array.isArray(doc.isbn) ? doc.isbn.find((value) => String(value).length === 13) as string | undefined : undefined,
        totalPages: Number(doc.number_of_pages_median) || undefined,
        coverUrl: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : undefined
      }));
    } catch {
      new Notice("Open Library 搜索失败，可继续手动添加。");
    }
    return results.filter((item) => item.title).slice(0, 10);
  }

  private async ensureMetadataFromQuery(query: string): Promise<void> {
    const results = await this.searchBooks(query);
    this.searchResults = results;
    if (results[0]) this.draft = { ...this.draft, ...results[0], totalPages: results[0].totalPages ?? this.draft.totalPages };
  }

  private async copyBookFile(file: File): Promise<string | undefined> {
    await this.ensureFolder("Books/Files");
    const target = await this.resolveConflict(`Books/Files/${this.safeName(file.name)}`);
    if (!target) return undefined;
    await this.app.vault.adapter.writeBinary(target, await file.arrayBuffer());
    if (!await this.verifyVaultFile(target)) {
      new Notice("书籍文件写入失败，没有创建书籍记录。");
      return undefined;
    }
    return target;
  }

  private async copyCoverFile(file: File): Promise<string> {
    await this.ensureFolder("Books/Covers");
    const target = await this.uniquePath(`Books/Covers/${this.safeName(file.name)}`);
    await this.app.vault.adapter.writeBinary(target, await file.arrayBuffer());
    return target;
  }

  private async verifyVaultFile(path: string): Promise<boolean> {
    if (!path) return false;
    if (!await this.app.vault.adapter.exists(path)) return false;
    try {
      const stat = await this.app.vault.adapter.stat(path);
      return !stat || stat.size > 0;
    } catch {
      return true;
    }
  }

  private async downloadCover(url: string, title: string): Promise<string | undefined> {
    try {
      await this.ensureFolder("Books/Covers");
      const response = await requestUrl({ url });
      const contentType = response.headers["content-type"] ?? "";
      const extension = contentType.includes("png") ? "png" : "jpg";
      const target = await this.uniquePath(`Books/Covers/${this.safeName(title)}.${extension}`);
      await this.app.vault.adapter.writeBinary(target, response.arrayBuffer);
      return target;
    } catch {
      new Notice("封面保存失败，将使用默认占位封面。");
      return undefined;
    }
  }

  private async ensureBookNote(): Promise<string> {
    await this.ensureFolder("Books/Notes");
    const path = await this.uniquePath(`Books/Notes/${this.safeName(this.draft.title)}.md`);
    const isbn = this.draft.isbn13 ?? this.draft.isbn10 ?? "";
    const content = [
      "---",
      "type: book",
      `title: ${this.escapeYaml(this.draft.title)}`,
      `author: ${this.escapeYaml(this.draft.author)}`,
      `status: ${this.draft.readingStatus ?? "want-to-read"}`,
      `startDate: ${this.draft.startDate ?? ""}`,
      `finishDate: ${this.draft.finishDate ?? ""}`,
      `isbn: ${isbn}`,
      `publisher: ${this.escapeYaml(this.draft.publisher ?? "")}`,
      `totalPages: ${this.draft.totalPages ?? ""}`,
      `cover: ${this.draft.coverPath ?? ""}`,
      `bookFile: ${this.draft.bookFilePath ?? ""}`,
      "---",
      "",
      `# ${this.draft.title}`,
      "",
      this.draft.bookFilePath ? `书籍文件：[[${this.draft.bookFilePath}]]` : "书籍文件：",
      "",
      "## 阅读进度",
      "",
      "## 阅读笔记",
      "",
      "## 金句",
      ""
    ].join("\n");
    await this.app.vault.create(path, content);
    return path;
  }

  private textField(container: HTMLElement, label: string, value: string, type = "text"): HTMLInputElement {
    const row = container.createDiv({ cls: "cow-book-form-row" });
    row.createEl("label", { text: label });
    return row.createEl("input", { attr: { type, value } });
  }

  private textareaField(container: HTMLElement, label: string, value: string): HTMLTextAreaElement {
    const row = container.createDiv({ cls: "cow-book-form-row" });
    row.createEl("label", { text: label });
    return row.createEl("textarea", { text: value });
  }

  private bindInput(input: HTMLInputElement | HTMLTextAreaElement, onInput: (value: string) => void): void {
    input.addEventListener("input", () => onInput(input.value));
  }

  private renderDateField(container: HTMLElement, label: string, key: "startDate" | "finishDate"): void {
    const row = container.createDiv({ cls: "cow-book-form-row is-picker" });
    row.createEl("label", { text: label });
    const input = row.createEl("input", { attr: { type: "date", value: this.draft[key] ?? "" } });
    row.addEventListener("click", () => {
      input.focus();
      try {
        (input as HTMLInputElement & { showPicker?: () => void }).showPicker?.();
      } catch {
        input.focus();
      }
    });
    input.addEventListener("change", () => this.draft[key] = input.value);
  }

  private renderSelect(container: HTMLElement, label: string, value: string, options: Array<{ value: string; label: string }>, onChange: (value: string) => void): void {
    const row = container.createDiv({ cls: "cow-book-form-row" });
    row.createEl("label", { text: label });
    const select = row.createEl("select");
    options.forEach((option) => select.createEl("option", { value: option.value, text: option.label }));
    select.value = value;
    select.addEventListener("change", () => onChange(select.value));
  }

  private async resolveConflict(path: string): Promise<string | undefined> {
    if (!await this.app.vault.adapter.exists(path)) return path;
    const choice = await new Promise<"overwrite" | "rename" | "cancel">((resolve) => new FileConflictModal(this.app, path, resolve).open());
    if (choice === "cancel") return undefined;
    if (choice === "overwrite") return path;
    return this.uniquePath(path);
  }

  private async uniquePath(path: string): Promise<string> {
    if (!await this.app.vault.adapter.exists(path)) return path;
    const dot = path.lastIndexOf(".");
    const base = dot > -1 ? path.slice(0, dot) : path;
    const ext = dot > -1 ? path.slice(dot) : "";
    let index = 2;
    let candidate = `${base}-${index}${ext}`;
    while (await this.app.vault.adapter.exists(candidate)) {
      index += 1;
      candidate = `${base}-${index}${ext}`;
    }
    return candidate;
  }

  private async ensureFolder(path: string): Promise<void> {
    const parts = path.split("/");
    let current = "";
    for (const part of parts) {
      current = current ? `${current}/${part}` : part;
      if (!await this.app.vault.adapter.exists(current)) await this.app.vault.createFolder(current);
    }
  }

  private safeName(value: string): string {
    return value.replace(/[\\/:*?"<>|#^[\]]/g, " ").replace(/\s+/g, " ").trim() || "book";
  }

  private escapeYaml(value: string): string {
    return `"${value.replace(/"/g, '\\"')}"`;
  }

  private renderCoverImage(container: HTMLElement, src: string, title: string): void {
    const img = container.createEl("img", { attr: { src, alt: title } });
    img.addEventListener("error", () => {
      container.empty();
      container.createSpan({ text: title.slice(0, 2) });
    });
  }

  private today(): string {
    return new Date().toISOString().slice(0, 10);
  }
}

class FileConflictModal extends Modal {
  constructor(app: App, private readonly path: string, private readonly resolve: (choice: "overwrite" | "rename" | "cancel") => void) {
    super(app);
  }

  onOpen(): void {
    applyResizableModal(this, {
      className: "cute-file-conflict-modal",
      width: "min(520px, 90vw)",
      maxWidth: "96vw",
      maxHeight: "80vh",
      minWidth: "min(360px, 90vw)",
      minHeight: "min(220px, 70vh)"
    });
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: "文件已存在" });
    this.contentEl.createEl("p", { text: this.path });
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.closeWith("cancel"));
    actions.createEl("button", { text: "自动重命名", attr: { type: "button" } }).addEventListener("click", () => this.closeWith("rename"));
    actions.createEl("button", { text: "覆盖", cls: "mod-warning", attr: { type: "button" } }).addEventListener("click", () => this.closeWith("overwrite"));
  }

  private closeWith(choice: "overwrite" | "rename" | "cancel"): void {
    this.resolve(choice);
    this.close();
  }
}
