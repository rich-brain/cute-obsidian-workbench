import type { DashboardStore } from "../../core/DashboardStore";

export class ReadingStatsSection {
  constructor(private readonly store: DashboardStore) {}

  render(container: HTMLElement): void {
    const books = this.store.getBooks();
    const total = books.length;
    const finished = books.filter((book) => book.status === "已读").length;
    const pages = books.reduce((sum, book) => sum + book.currentPage, 0);
    const stats = [
      ["藏书", `${total}本`],
      ["已读", `${finished}本`],
      ["累计页数", `${pages}页`],
      ["完成率", `${total === 0 ? 0 : Math.round((finished / total) * 100)}%`]
    ];
    const grid = container.createDiv({ cls: "cow-reading-stat-grid" });
    stats.forEach(([label, value]) => {
      const item = grid.createDiv();
      item.createEl("strong", { text: value });
      item.createSpan({ text: label });
    });
  }
}
