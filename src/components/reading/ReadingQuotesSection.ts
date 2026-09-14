import type { DashboardStore } from "../../core/DashboardStore";

export class ReadingQuotesSection {
  constructor(private readonly store: DashboardStore) {}

  render(container: HTMLElement): void {
    const list = container.createEl("ul", { cls: "cow-memo-list" });
    this.store.getReadingQuotes().forEach((quote) => {
      const item = list.createEl("li");
      item.createEl("blockquote", { text: quote.text });
      item.createSpan({ text: quote.source });
    });
  }
}
