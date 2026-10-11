import { App, Modal, setIcon } from "obsidian";
import { formatDateKey } from "../core/DashboardStore";
import { DailyFocusService } from "../services/DailyFocusService";
import type { DashboardStore } from "../core/DashboardStore";

export class WorkbenchReminderModal extends Modal {
  constructor(app: App, private readonly store: DashboardStore) {
    super(app);
  }

  onOpen(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-reminder-modal");
    const header = this.contentEl.createDiv({ cls: "cow-modal-header" });
    const title = header.createDiv({ cls: "cow-modal-title" });
    setIcon(title.createSpan(), "bell");
    title.createEl("h2", { text: "提醒" });

    const entries = new DailyFocusService(this.store)
      .getEntriesForDate(formatDateKey(new Date()))
      .filter((entry) => entry.status !== "completed")
      .slice(0, 30);
    const body = this.contentEl.createDiv({ cls: "cow-reminder-list" });
    if (entries.length === 0) {
      body.createEl("p", { cls: "cow-empty-state", text: "今天暂时没有需要处理的提醒。" });
      return;
    }
    entries.forEach((entry) => {
      const row = body.createDiv({ cls: "cow-reminder-row" });
      setIcon(row.createSpan({ cls: "cow-reminder-icon" }), entry.status === "overdue" ? "alert-circle" : "bell-ring");
      const text = row.createDiv({ cls: "cow-reminder-text" });
      text.createEl("strong", { text: entry.title });
      text.createEl("span", { text: [entry.subtitle, entry.dueDate ? `截止 ${entry.dueDate}` : ""].filter(Boolean).join(" · ") });
    });
  }
}
