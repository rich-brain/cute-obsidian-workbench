import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { openHealthReminderModal } from "./FitnessModals";

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
      const body = head.createDiv();
      body.createSpan({ text: item.title });
      body.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${item.date ?? "--"} ${item.time ?? "--"} · ${item.repeatType === "daily" ? "每天" : "仅一次"} · ${item.enabled === false ? "已停用" : "已启用"}` });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑提醒" } });
      setIcon(edit, "pencil");
      edit.addEventListener("click", () => openHealthReminderModal(this.app, this.store, this.onDataChanged, item));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除提醒" } });
      setIcon(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteHealthReminder(item.id);
        this.onDataChanged();
      });
    });
  }
}
