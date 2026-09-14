import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { AddBookModal } from "./AddBookModal";

export class ReadingPlanSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getBooks().filter((book) => book.status !== "已读").forEach((book) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      const head = row.createDiv({ cls: "cow-list-item-head" });
      head.createEl("strong", { text: book.title });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑阅读计划" } });
      setIcon(edit, "pencil");
      edit.addEventListener("click", () => new AddBookModal(this.app, async (updated) => {
        await this.store.updateBook(book.id, updated);
        this.onDataChanged();
      }, book).open());
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除阅读计划" } });
      setIcon(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteBook(book.id);
        this.onDataChanged();
      });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({
        text: `${book.currentPage}/${book.totalPages} 页 · ${book.status}`
      });
    });
  }
}
