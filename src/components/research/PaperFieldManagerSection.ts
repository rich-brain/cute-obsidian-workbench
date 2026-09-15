import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { PaperFieldManagerModal } from "./PaperQueueModals";

export class PaperFieldManagerSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const shell = container.createDiv({ cls: "cow-paper-field-summary" });
    this.renderGroup(shell, "阅读状态", this.store.getPaperStatuses().map((item) => ({ name: item.name, color: item.color })));
    this.renderGroup(shell, "会议 / 期刊", this.store.getPaperVenues().map((item) => ({ name: item.name, color: item.color })));
    this.renderGroup(shell, "标签", this.store.getPaperTags().map((item) => ({ name: item.name, color: item.color })));
    const button = shell.createEl("button", { cls: "cow-bottom-add", attr: { type: "button" } });
    setIcon(button.createSpan(), "pencil");
    button.createSpan({ text: "编辑字段" });
    button.addEventListener("click", () => new PaperFieldManagerModal(this.app, this.store, this.onDataChanged).open());
  }

  private renderGroup(container: HTMLElement, title: string, items: Array<{ name: string; color: string }>): void {
    const group = container.createDiv({ cls: "cow-paper-field-group" });
    group.createEl("strong", { text: title });
    const chips = group.createDiv({ cls: "cow-paper-tags" });
    items.forEach((item) => chips.createSpan({ text: item.name, attr: { style: `--paper-color: ${item.color}` } }));
  }
}
