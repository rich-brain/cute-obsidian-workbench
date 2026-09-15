import { Notice, type App } from "obsidian";
import { formatDateKey, type DashboardStore } from "../core/DashboardStore";
import type { HealthReminder, HealthReminderLog } from "../types/dashboard";

export class HealthReminderService {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore
  ) {}

  async checkMissedReminders(): Promise<void> {
    const missed: HealthReminderLog[] = [];
    const today = formatDateKey(new Date());
    const now = new Date();
    for (const reminder of this.store.getHealthReminders()) {
      if (!this.shouldCheck(reminder)) continue;
      const date = reminder.date ?? today;
      if (date > today) continue;
      if (!this.isScheduledForDate(reminder, date)) continue;
      const scheduled = this.getScheduledDate(reminder, date);
      if (!scheduled || scheduled >= now) continue;
      const id = this.getLogId(reminder.id, date, reminder.time ?? "09:00");
      if (this.store.getHealthReminderLogs().some((log) => log.id === id)) continue;
      missed.push({
        id,
        reminderId: reminder.id,
        date,
        scheduledTime: reminder.time ?? "09:00",
        status: "missed"
      });
    }
    for (const log of missed) {
      await this.store.addHealthReminderLog(log);
    }
    if (missed.length > 0) {
      new Notice(`你有 ${missed.length} 个错过的健康提醒。`);
    }
  }

  async tick(): Promise<void> {
    const now = new Date();
    const date = formatDateKey(now);
    const minute = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    for (const reminder of this.store.getHealthReminders()) {
      if (!this.shouldCheck(reminder) || !this.isScheduledForDate(reminder, date) || (reminder.time ?? "09:00") !== minute) {
        continue;
      }
      const id = this.getLogId(reminder.id, date, minute);
      if (this.store.getHealthReminderLogs().some((log) => log.id === id)) continue;
      await this.store.addHealthReminderLog({
        id,
        reminderId: reminder.id,
        date,
        scheduledTime: minute,
        triggeredAt: now.toISOString(),
        status: "triggered"
      });
      new Notice(`健康提醒：${reminder.title}`);
    }
  }

  private shouldCheck(reminder: HealthReminder): boolean {
    return reminder.enabled !== false && Boolean(reminder.title);
  }

  private isScheduledForDate(reminder: HealthReminder, date: string): boolean {
    const repeatType = reminder.repeatType ?? "once";
    if (repeatType === "once") return (reminder.date ?? date) === date;
    if ((reminder.date ?? date) > date) return false;
    const day = new Date(`${date}T00:00:00`).getDay();
    if (repeatType === "daily") return true;
    if (repeatType === "weekdays") return day >= 1 && day <= 5;
    if (repeatType === "weekly") return day === new Date(`${reminder.date ?? date}T00:00:00`).getDay();
    if (repeatType === "custom") return (reminder.repeatDays ?? []).includes(day);
    return false;
  }

  private getScheduledDate(reminder: HealthReminder, date: string): Date | null {
    const [hour, minute] = (reminder.time ?? "09:00").split(":").map((part) => Number(part));
    if (!Number.isFinite(hour) || !Number.isFinite(minute)) return null;
    return new Date(`${date}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`);
  }

  private getLogId(reminderId: string, date: string, time: string): string {
    return `health-log-${reminderId}-${date}-${time}`;
  }
}

