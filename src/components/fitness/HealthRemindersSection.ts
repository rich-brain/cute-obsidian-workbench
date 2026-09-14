import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { openTextModal } from "../SectionContentActions";

export class HealthRemindersSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const list = container.createEl("ul", { cls: "cow-memo-list" });
    this.store.getHealthReminders().forEach((item) => {
      const row = list.createEl("li");
      const head = row.createDiv({ cls: "cow-list-item-head" });
      head.createSpan({ text: item.title });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑提醒" } });
      setIcon(edit, "pencil");
      edit.addEventListener("click", () => openTextModal(this.app, "编辑健康提醒", "提醒", item.title, async (value) => {
        await this.store.updateHealthReminder(item.id, value);
        this.onDataChanged();
      }));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除提醒" } });
      setIcon(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteHealthReminder(item.id);
        this.onDataChanged();
      });
    });
  }
}
