import type { DashboardStore } from "../../core/DashboardStore";
import type { BookItem } from "../../types/dashboard";

export class BookListSection {
  constructor(
    private readonly store: DashboardStore,
    private readonly status: BookItem["status"]
  ) {}

  render(container: HTMLElement): void {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getBooks().filter((book) => book.status === this.status).forEach((book) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: book.title });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${book.author} · ${book.tags.join(" / ")}` });
    });
  }
}
