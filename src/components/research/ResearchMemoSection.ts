import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { openTextModal } from "../SectionContentActions";

export class ResearchMemoSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const list = container.createEl("ul", { cls: "cow-memo-list" });
    this.store.getResearchMemos().forEach((memo, index) => {
      const item = list.createEl("li");
      const head = item.createDiv({ cls: "cow-list-item-head" });
      head.createSpan({ text: memo });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑 Memo" } });
      setIcon(edit, "pencil");
      edit.addEventListener("click", () => openTextModal(this.app, "编辑科研 Memo", "Memo", memo, async (value) => {
        await this.store.updateResearchMemo(index, value);
        this.onDataChanged();
      }));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除 Memo" } });
      setIcon(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteResearchMemo(index);
        this.onDataChanged();
      });
    });
  }
}
