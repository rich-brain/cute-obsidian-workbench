import { App, Modal, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import type { ReadingQuote } from "../../types/dashboard";
import { applyResizableModal } from "../ResizableModal";

const QUOTE_COLORS = ["#fff7fb", "#fff1ad", "#ffe0ed", "#e4ffed", "#e5f4ff", "#f1e9ff"];
const QUOTE_STYLES: Array<{ value: NonNullable<ReadingQuote["style"]>; label: string }> = [
  { value: "default", label: "默认" },
  { value: "sticky", label: "便签" },
  { value: "soft", label: "柔和" },
  { value: "card", label: "卡片" }
];

export class ReadingQuotesSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const list = container.createDiv({ cls: "cow-reading-quote-grid" });
    const quotes = this.store.getReadingQuotes();
    if (quotes.length === 0) {
      list.createDiv({ cls: "cow-empty-state", text: "暂无金句摘录。" });
    } else {
      quotes.forEach((quote) => this.renderQuote(list, quote));
    }

    const add = container.createEl("button", { cls: "cow-bottom-add-button", attr: { type: "button" } });
    setIcon(add.createSpan(), "plus");
    add.createSpan({ text: "添加金句" });
    add.addEventListener("click", () => openReadingQuoteModal(this.app, this.store, this.onDataChanged));
  }

  private renderQuote(container: HTMLElement, quote: ReadingQuote): void {
    const book = quote.bookId ? this.store.getBooks().find((item) => item.id === quote.bookId) : undefined;
    const card = container.createDiv({ cls: `cow-reading-quote-card is-${quote.style ?? "default"}` });
    card.style.backgroundColor = quote.backgroundColor ?? "#fff7fb";
    const head = card.createDiv({ cls: "cow-list-item-head" });
    head.createEl("blockquote", { text: quote.text });
    const actions = head.createDiv({ cls: "cow-list-item-actions" });
    this.iconButton(actions, "pencil", "编辑金句", () => openReadingQuoteModal(this.app, this.store, this.onDataChanged, quote));
    this.iconButton(actions, "trash-2", "删除金句", async () => {
      if (!confirm("删除这条金句摘录？")) return;
      await this.store.deleteReadingQuote(quote.id);
      this.onDataChanged();
    });
    card.createDiv({ cls: "cow-quote-source", text: book ? `——《${book.title}》` : quote.source ? `——${quote.source}` : "——未关联书籍" });
    if (quote.note) card.createEl("p", { text: quote.note });
  }

  private iconButton(container: HTMLElement, icon: string, label: string, onClick: () => void): void {
    const button = container.createEl("button", { attr: { type: "button", "aria-label": label } });
    setIcon(button, icon);
    button.addEventListener("click", onClick);
  }
}

export function openReadingQuoteModal(
  app: App,
  store: DashboardStore,
  onDataChanged: () => void,
  quote?: ReadingQuote
): void {
  new ReadingQuoteModal(app, store, onDataChanged, quote).open();
}

class ReadingQuoteModal extends Modal {
  private text: string;
  private bookId: string;
  private note: string;
  private style: NonNullable<ReadingQuote["style"]>;
  private backgroundColor: string;

  constructor(
    app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void,
    private readonly quote?: ReadingQuote
  ) {
    super(app);
    this.text = quote?.text ?? "";
    this.bookId = quote?.bookId ?? "";
    this.note = quote?.note ?? "";
    this.style = quote?.style ?? "default";
    this.backgroundColor = quote?.backgroundColor ?? "#fff7fb";
  }

  onOpen(): void {
    applyResizableModal(this, {
      className: "cute-reading-quote-modal",
      width: "min(680px, 90vw)",
      maxWidth: "96vw",
      maxHeight: "88vh",
      minWidth: "min(440px, 92vw)",
      minHeight: "min(390px, 80vh)"
    });
    this.render();
  }

  private render(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-reading-quote-modal-content");
    this.contentEl.createEl("h2", { text: this.quote ? "编辑金句" : "添加金句" });
    const form = this.contentEl.createDiv({ cls: "cow-book-form" });
    this.renderTextarea(form, "金句内容", this.text, (value) => this.text = value);
    this.renderBookSelect(form);
    this.renderTextarea(form, "备注", this.note, (value) => this.note = value);
    this.renderStylePicker(form);
    this.renderColorPicker(form);
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", () => void this.save());
  }

  private renderBookSelect(container: HTMLElement): void {
    const row = container.createDiv({ cls: "cow-book-form-row" });
    row.createEl("label", { text: "来源书籍" });
    const select = row.createEl("select");
    select.createEl("option", { value: "", text: "不关联书籍" });
    this.store.getBooks().forEach((book) => select.createEl("option", { value: book.id, text: book.title }));
    select.value = this.bookId;
    select.addEventListener("change", () => this.bookId = select.value);
  }

  private renderStylePicker(container: HTMLElement): void {
    const row = container.createDiv({ cls: "cow-book-form-row" });
    row.createEl("label", { text: "背景风格" });
    const chips = row.createDiv({ cls: "cow-quote-style-list" });
    QUOTE_STYLES.forEach((style) => {
      const chip = chips.createEl("button", { text: style.label, cls: this.style === style.value ? "is-selected" : "", attr: { type: "button" } });
      chip.addEventListener("click", () => {
        this.style = style.value;
        this.render();
      });
    });
  }

  private renderColorPicker(container: HTMLElement): void {
    const row = container.createDiv({ cls: "cow-book-form-row" });
    row.createEl("label", { text: "背景颜色" });
    const chips = row.createDiv({ cls: "cow-quote-color-list" });
    QUOTE_COLORS.forEach((color) => {
      const chip = chips.createEl("button", { cls: this.backgroundColor === color ? "is-selected" : "", attr: { type: "button", "aria-label": color } });
      chip.style.backgroundColor = color;
      chip.addEventListener("click", () => {
        this.backgroundColor = color;
        this.render();
      });
    });
  }

  private renderTextarea(container: HTMLElement, label: string, value: string, onInput: (value: string) => void): void {
    const row = container.createDiv({ cls: "cow-book-form-row" });
    row.createEl("label", { text: label });
    const input = row.createEl("textarea", { text: value });
    input.addEventListener("input", () => onInput(input.value));
  }

  private async save(): Promise<void> {
    if (!this.text.trim()) return;
    const book = this.bookId ? this.store.getBooks().find((item) => item.id === this.bookId) : undefined;
    const payload: ReadingQuote = {
      id: this.quote?.id ?? `quote-${Date.now()}`,
      text: this.text.trim(),
      source: book?.title ?? "",
      bookId: this.bookId || undefined,
      note: this.note.trim(),
      style: this.style,
      backgroundColor: this.backgroundColor
    };
    if (this.quote) await this.store.updateReadingQuote(this.quote.id, payload);
    else await this.store.addReadingQuote(payload);
    this.onDataChanged();
    this.close();
  }
}
