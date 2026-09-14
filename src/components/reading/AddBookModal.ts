import { App, Modal, Setting } from "obsidian";
import type { BookItem } from "../../types/dashboard";

export class AddBookModal extends Modal {
  private title = "";
  private author = "";
  private totalPages = 200;
  private currentPage = 0;
  private status: BookItem["status"] = "想读";
  private notePath = "";
  private tags = "";

  constructor(
    app: App,
    private readonly onSubmit: (book: BookItem) => Promise<void>,
    private readonly book?: BookItem
  ) {
    super(app);
    this.title = book?.title ?? "";
    this.author = book?.author ?? "";
    this.totalPages = book?.totalPages ?? 200;
    this.currentPage = book?.currentPage ?? 0;
    this.status = book?.status ?? "想读";
    this.notePath = book?.notePath ?? "";
    this.tags = book?.tags.join(", ") ?? "";
  }

  onOpen(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: this.book ? "编辑书籍" : "增加书籍" });

    new Setting(this.contentEl).setName("书名").addText((text) => {
      text.setValue(this.title);
      text.onChange((value) => {
        this.title = value.trim();
      });
    });
    new Setting(this.contentEl).setName("作者").addText((text) => {
      text.setValue(this.author);
      text.onChange((value) => {
        this.author = value.trim();
      });
    });
    new Setting(this.contentEl).setName("总页数").addText((text) => {
      text.inputEl.type = "number";
      text.setValue(String(this.totalPages));
      text.onChange((value) => {
        this.totalPages = Number(value) || 0;
      });
    });
    new Setting(this.contentEl).setName("当前页").addText((text) => {
      text.inputEl.type = "number";
      text.setValue(String(this.currentPage));
      text.onChange((value) => {
        this.currentPage = Number(value) || 0;
      });
    });
    new Setting(this.contentEl).setName("状态").addDropdown((dropdown) => {
      ["在读", "想读", "已读"].forEach((status) => dropdown.addOption(status, status));
      dropdown.setValue(this.status);
      dropdown.onChange((value) => {
        this.status = value as BookItem["status"];
      });
    });
    new Setting(this.contentEl).setName("笔记路径").addText((text) => {
      text.setValue(this.notePath);
      text.onChange((value) => {
        this.notePath = value.trim();
      });
    });
    new Setting(this.contentEl).setName("标签").addText((text) => {
      text.setValue(this.tags);
      text.onChange((value) => {
        this.tags = value;
      });
    });

    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "添加", attr: { type: "button" } }).addEventListener("click", async () => {
      if (!this.title) {
        return;
      }
      await this.onSubmit({
        id: `book-${Date.now()}`,
        ...this.book,
        title: this.title,
        author: this.author || "未知作者",
        totalPages: Math.max(1, this.totalPages),
        currentPage: Math.max(0, Math.min(this.currentPage, Math.max(1, this.totalPages))),
        status: this.status,
        notePath: this.notePath || undefined,
        tags: this.tags.split(/[,，]/).map((tag) => tag.trim()).filter(Boolean)
      });
      this.close();
    });
  }
}
