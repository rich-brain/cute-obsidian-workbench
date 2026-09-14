import type { App } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { BookCard } from "./BookCard";

export class CurrentReadingSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const current = this.store.getBooks().filter((book) => book.status === "在读").slice(0, 2);
    const grid = container.createDiv({ cls: "cow-book-grid" });
    current.forEach((book) => new BookCard(this.app, this.store, book, this.onDataChanged).render(grid));
  }
}
