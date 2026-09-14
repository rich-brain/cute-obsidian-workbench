import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { openQuoteModal } from "../SectionContentActions";

export class ReadingQuotesSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const list = container.createEl("ul", { cls: "cow-memo-list" });
    this.store.getReadingQuotes().forEach((quote) => {
      const item = list.createEl("li");
      const head = item.createDiv({ cls: "cow-list-item-head" });
      head.createEl("blockquote", { text: quote.text });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑金句" } });
      setIcon(edit, "pencil");
      edit.addEventListener("click", () => openQuoteModal(this.app, async (values) => {
        await this.store.updateReadingQuote(quote.id, values);
        this.onDataChanged();
      }, quote));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除金句" } });
      setIcon(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteReadingQuote(quote.id);
        this.onDataChanged();
      });
      item.createSpan({ text: quote.source });
    });
  }
}
