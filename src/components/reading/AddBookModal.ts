import { App, Modal, Setting } from "obsidian";
import type { BookItem } from "../../types/dashboard";

export class AddBookModal extends Modal {
  private title = "";
  private author = "";
  private totalPages = 200;

  constructor(
    app: App,
    private readonly onSubmit: (book: BookItem) => Promise<void>
  ) {
    super(app);
  }

  onOpen(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: "增加书籍" });

    new Setting(this.contentEl).setName("书名").addText((text) => {
      text.onChange((value) => {
        this.title = value.trim();
      });
    });
    new Setting(this.contentEl).setName("作者").addText((text) => {
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

    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "添加", attr: { type: "button" } }).addEventListener("click", async () => {
      if (!this.title) {
        return;
      }
      await this.onSubmit({
        id: `book-${Date.now()}`,
        title: this.title,
        author: this.author || "未知作者",
        totalPages: Math.max(1, this.totalPages),
        currentPage: 0,
        status: "想读",
        tags: []
      });
      this.close();
    });
  }
}
