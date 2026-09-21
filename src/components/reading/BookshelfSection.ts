import { App } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { BookCard } from "./BookCard";

export class BookshelfSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const grid = container.createDiv({ cls: "cow-book-grid" });
    this.store.getBooks()
      .filter((book) => book.shelfStatus !== "off-shelf")
      .forEach((book) => new BookCard(this.app, this.store, book, this.onDataChanged, "shelf").render(grid));
  }
}
