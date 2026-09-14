import type { DashboardStore } from "../../core/DashboardStore";

export class ReadingPlanSection {
  constructor(private readonly store: DashboardStore) {}

  render(container: HTMLElement): void {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getBooks().filter((book) => book.status !== "已读").forEach((book) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: book.title });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({
        text: `${book.currentPage}/${book.totalPages} 页 · ${book.status}`
      });
    });
  }
}
