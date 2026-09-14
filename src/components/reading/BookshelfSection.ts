import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { AddBookModal } from "./AddBookModal";
import { BookCard } from "./BookCard";

export class BookshelfSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const add = container.createEl("button", { cls: "cow-small-action", attr: { type: "button" } });
    setIcon(add.createSpan(), "plus");
    add.createSpan({ text: "增加书籍" });
    add.addEventListener("click", () => {
      new AddBookModal(this.app, async (book) => {
        await this.store.addBook(book);
        this.onDataChanged();
      }).open();
    });

    const grid = container.createDiv({ cls: "cow-book-grid" });
    this.store.getBooks().forEach((book) => new BookCard(this.app, this.store, book, this.onDataChanged).render(grid));
  }
}
