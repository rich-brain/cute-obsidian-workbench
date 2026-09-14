import { setIcon } from "obsidian";
import { formatDateKey, GOAL_HABITS, type DashboardStore } from "../../core/DashboardStore";

export class GoalsCheckinSection {
  constructor(
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const dates = this.store.getCurrentWeekDates();
    const table = container.createDiv({ cls: "cow-habit-overview" });
    const header = table.createDiv({ cls: "cow-habit-overview-row cow-habit-overview-header" });
    header.createSpan();
    ["一", "二", "三", "四", "五", "六", "日"].forEach((day) => header.createSpan({ text: day }));
    GOAL_HABITS.forEach((habit) => {
      const row = table.createDiv({ cls: "cow-habit-overview-row" });
      row.createSpan({ text: habit.label });
      dates.forEach((date) => {
        const done = this.store.isHabitCompleted(habit.id, date);
        const button = row.createEl("button", { cls: `cow-habit-dot ${done ? "is-done" : ""}`, attr: { type: "button" } });
        if (done) setIcon(button, "check");
        button.addEventListener("click", async () => {
          await this.store.toggleHabit(habit.id, date);
          this.onDataChanged();
        });
      });
    });
    table.createEl("p", { text: `今天：${formatDateKey(new Date())}` });
  }
}
