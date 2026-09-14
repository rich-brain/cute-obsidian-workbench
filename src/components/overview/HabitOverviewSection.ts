import { setIcon } from "obsidian";
import { DEFAULT_HABITS, formatDateKey, type DashboardStore } from "../../core/DashboardStore";

export class HabitOverviewSection {
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

    DEFAULT_HABITS.forEach((habit) => {
      const row = table.createDiv({ cls: "cow-habit-overview-row" });
      row.createSpan({ text: habit.label });
      dates.forEach((date) => {
        const completed = this.store.isHabitCompleted(habit.id, date);
        const button = row.createEl("button", {
          cls: `cow-habit-dot ${completed ? "is-done" : ""}`,
          attr: { type: "button", "aria-label": `${habit.label} ${date}` }
        });
        if (completed) {
          setIcon(button, "check");
        }
        button.addEventListener("click", async () => {
          await this.store.toggleHabit(habit.id, date);
          this.onDataChanged();
        });
      });
    });

    const today = formatDateKey(new Date());
    table.createEl("p", { text: `今天：${today}` });
  }
}
