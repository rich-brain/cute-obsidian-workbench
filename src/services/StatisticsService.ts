import type { DashboardStore } from "../core/DashboardStore";
import { DEFAULT_HABITS } from "../core/DashboardStore";
import { CalendarService } from "./CalendarService";

export interface HabitDayStatus {
  id: string;
  label: string;
  completed: boolean;
}

export interface HabitMonthDay {
  date: string;
  completedCount: number;
  totalCount: number;
  statuses: HabitDayStatus[];
}

export interface HabitStats {
  currentStreak: number;
  longestStreak: number;
  monthCompletionRate: number;
  yearCompletionRate: number;
  monthDays: HabitMonthDay[];
}

export interface MonthProgressItem {
  id: "research" | "reading" | "fitness" | "finance" | "goals";
  label: string;
  current: number;
  previous: number;
  change: number;
}

export interface YearProgressMonth {
  month: number;
  items: MonthProgressItem[];
  average: number;
}

export interface FocusStats {
  todayMinutes: number;
  todayPomodoros: number;
  weekMinutes: number;
  recentRecords: Array<{
    id: string;
    task: string;
    date: string;
    duration: number;
    completed: boolean;
  }>;
}

export class StatisticsService {
  private readonly calendar = new CalendarService();

  constructor(private readonly store: DashboardStore) {}

  getFocusStats(): FocusStats {
    const today = this.calendar.getDateKey(new Date());
    const weekKeys = new Set(this.store.getCurrentWeekDates());
    const records = this.store.getFocusRecords();
    return {
      todayMinutes: records
        .filter((record) => record.date === today)
        .reduce((sum, record) => sum + record.duration, 0),
      todayPomodoros: records.filter((record) => record.date === today && record.completed).length,
      weekMinutes: records
        .filter((record) => weekKeys.has(record.date))
        .reduce((sum, record) => sum + record.duration, 0),
      recentRecords: records.slice(0, 5)
    };
  }

  getHabitStats(month: Date): HabitStats {
    const monthDays = this.getHabitMonthDays(month);
    const year = month.getFullYear();
    const yearDays = this.getDaysBetween(new Date(year, 0, 1), new Date(year, 11, 31));

    return {
      currentStreak: this.getCurrentHabitStreak(),
      longestStreak: this.getLongestHabitStreak(year),
      monthCompletionRate: this.getCompletionRate(monthDays.map((day) => day.statuses)),
      yearCompletionRate: this.getCompletionRate(yearDays.map((date) => this.getHabitStatuses(date))),
      monthDays
    };
  }

  getMonthProgress(month: Date): MonthProgressItem[] {
    const previous = this.calendar.addMonths(month, -1);
    return this.getProgressLabels().map((item) => {
      const current = this.getProgressValue(item.id, month);
      const previousValue = this.getProgressValue(item.id, previous);
      return {
        id: item.id,
        label: item.label,
        current,
        previous: previousValue,
        change: current - previousValue
      };
    });
  }

  getYearProgress(year: number): YearProgressMonth[] {
    return Array.from({ length: 12 }, (_, index) => {
      const month = new Date(year, index, 1);
      const items = this.getMonthProgress(month);
      const average = items.length === 0 ? 0 : Math.round(items.reduce((sum, item) => sum + item.current, 0) / items.length);
      return { month: index + 1, items, average };
    });
  }

  private getHabitMonthDays(month: Date): HabitMonthDay[] {
    const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    return Array.from({ length: days }, (_, index) => {
      const date = new Date(month.getFullYear(), month.getMonth(), index + 1);
      const statuses = this.getHabitStatuses(date);
      return {
        date: this.calendar.getDateKey(date),
        completedCount: statuses.filter((status) => status.completed).length,
        totalCount: statuses.length,
        statuses
      };
    });
  }

  private getHabitStatuses(date: Date): HabitDayStatus[] {
    const dateKey = this.calendar.getDateKey(date);
    return DEFAULT_HABITS.map((habit) => ({
      ...habit,
      completed: this.store.isHabitCompleted(habit.id, dateKey)
    }));
  }

  private getCurrentHabitStreak(): number {
    const today = new Date();
    let streak = 0;
    for (let offset = 0; offset < 366; offset += 1) {
      const date = new Date(today);
      date.setDate(today.getDate() - offset);
      if (!this.isAllHabitsDone(date)) break;
      streak += 1;
    }
    return streak;
  }

  private getLongestHabitStreak(year: number): number {
    let longest = 0;
    let current = 0;
    this.getDaysBetween(new Date(year, 0, 1), new Date(year, 11, 31)).forEach((date) => {
      if (this.isAllHabitsDone(date)) {
        current += 1;
        longest = Math.max(longest, current);
      } else {
        current = 0;
      }
    });
    return longest;
  }

  private isAllHabitsDone(date: Date): boolean {
    return this.getHabitStatuses(date).every((status) => status.completed);
  }

  private getCompletionRate(days: HabitDayStatus[][]): number {
    const statuses: HabitDayStatus[] = [];
    days.forEach((day) => {
      day.forEach((status) => statuses.push(status));
    });
    if (statuses.length === 0) return 0;
    return Math.round((statuses.filter((status) => status.completed).length / statuses.length) * 100);
  }

  private getDaysBetween(start: Date, end: Date): Date[] {
    const days: Date[] = [];
    const cursor = new Date(start);
    while (cursor <= end) {
      days.push(new Date(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }
    return days;
  }

  private getProgressLabels(): Array<{ id: MonthProgressItem["id"]; label: string }> {
    return [
      { id: "research", label: "科研" },
      { id: "reading", label: "阅读" },
      { id: "fitness", label: "健身" },
      { id: "finance", label: "理财" },
      { id: "goals", label: "目标管理" }
    ];
  }

  private getProgressValue(id: MonthProgressItem["id"], month: Date): number {
    switch (id) {
      case "research":
        return this.average(this.store.getResearchProjects().map((item) => item.progress));
      case "reading":
        return this.average(this.store.getBooks().map((book) => book.totalPages === 0 ? 0 : Math.round((book.currentPage / book.totalPages) * 100)));
      case "fitness":
        return this.getFitnessProgress(month);
      case "finance":
        return this.getFinanceProgress();
      case "goals":
        return this.average(this.store.getGoals().map((goal) => goal.progress));
    }
  }

  private getFitnessProgress(month: Date): number {
    const prefix = `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, "0")}`;
    const workouts = this.store.getWorkouts().filter((workout) => workout.date.startsWith(prefix));
    if (workouts.length === 0) return 0;
    return Math.round((workouts.filter((workout) => workout.completed).length / workouts.length) * 100);
  }

  private getFinanceProgress(): number {
    const budgets = this.store.getBudgets();
    if (budgets.length === 0) return 0;
    return this.clamp(Math.round(this.average(budgets.map((budget) => budget.amount === 0 ? 100 : ((budget.amount - budget.spent) / budget.amount) * 100))));
  }

  private average(values: number[]): number {
    if (values.length === 0) return 0;
    return this.clamp(Math.round(values.reduce((sum, value) => sum + value, 0) / values.length));
  }

  private clamp(value: number): number {
    return Math.max(0, Math.min(100, value));
  }
}
