import { App, Notice } from "obsidian";
import { formatDateKey, type DashboardStore } from "../core/DashboardStore";
import type { DailyFocusEntry, FinanceTodo, FitnessGoal, GoalAction, HealthReminder, Milestone, ReadingPlan, ResearchDeadline, Task, TodayFocusTask, TrainingPlan } from "../types/dashboard";
import { openTaskModal } from "../components/tasks/TaskModals";
import { TodayFocusTaskModal } from "../components/overview/TodoStatisticsModal";
import { openReadingPlanModal } from "../components/reading/ReadingPlanModals";
import { openFitnessGoalModal, openHealthReminderModal, openTrainingPlanModal } from "../components/fitness/FitnessModals";
import { openFinanceTodoModal } from "../components/finance/FinanceModals";
import { openGoalActionModal } from "../components/goals/GoalActionModals";

export interface DailyFocusProvider {
  moduleId: string;
  getDailyFocusEntries(date: string): DailyFocusEntry[];
  completeEntry?(sourceId: string): Promise<void>;
  openEntry?(sourceId: string, app: App, onDone: () => void): void;
}

const PRIORITY_WEIGHT: Record<string, number> = {
  high: 0,
  高: 0,
  medium: 1,
  中: 1,
  low: 2,
  低: 2,
  none: 3
};

export class DailyFocusService {
  private readonly providers: DailyFocusProvider[] = [];

  constructor(private readonly store: DashboardStore) {
    this.registerProvider(new ManualFocusProvider(store));
    this.registerProvider(new TaskFocusProvider(store));
    this.registerProvider(new ResearchDeadlineFocusProvider(store));
    this.registerProvider(new ReadingFocusProvider(store));
    this.registerProvider(new FitnessFocusProvider(store));
    this.registerProvider(new FinanceFocusProvider(store));
    this.registerProvider(new GoalsFocusProvider(store));
  }

  registerProvider(provider: DailyFocusProvider): void {
    this.providers.push(provider);
  }

  getEntriesForDate(date: string): DailyFocusEntry[] {
    const entries: DailyFocusEntry[] = [];
    this.providers.forEach((provider) => entries.push(...provider.getDailyFocusEntries(date)));
    return entries.sort((left, right) => this.compareEntries(left, right, date));
  }

  getTodayEntries(): DailyFocusEntry[] {
    return this.getEntriesForDate(formatDateKey(new Date()));
  }

  getOverdueEntries(date = formatDateKey(new Date())): DailyFocusEntry[] {
    return this.getEntriesForDate(date).filter((entry) => entry.status === "overdue");
  }

  getUpcomingDeadlines(days: number, date = formatDateKey(new Date())): DailyFocusEntry[] {
    const start = new Date(`${date}T00:00:00`);
    const limit = new Date(start);
    limit.setDate(start.getDate() + days);
    const limitKey = formatDateKey(limit);
    const entries: DailyFocusEntry[] = [];
    this.providers.forEach((provider) => entries.push(...provider.getDailyFocusEntries(date)));
    return entries
      .filter((entry) => entry.dueDate && entry.dueDate > date && entry.dueDate <= limitKey)
      .sort((left, right) => (left.dueDate ?? "").localeCompare(right.dueDate ?? ""));
  }

  async completeEntry(entry: DailyFocusEntry): Promise<void> {
    if (!entry.canComplete) return;
    const provider = this.providers.find((item) => item.moduleId === entry.sourceModule);
    await provider?.completeEntry?.(entry.sourceId);
  }

  openSource(entry: DailyFocusEntry, app: App, onDone: () => void): void {
    const provider = this.providers.find((item) => item.moduleId === entry.sourceModule);
    if (!provider?.openEntry) {
      new Notice("暂时没有可打开的来源详情。");
      return;
    }
    provider.openEntry(entry.sourceId, app, onDone);
  }

  private compareEntries(left: DailyFocusEntry, right: DailyFocusEntry, date: string): number {
    const group = this.groupWeight(left, date) - this.groupWeight(right, date);
    if (group !== 0) return group;
    const priority = (PRIORITY_WEIGHT[left.priority ?? "none"] ?? 3) - (PRIORITY_WEIGHT[right.priority ?? "none"] ?? 3);
    if (priority !== 0) return priority;
    return (left.dueDate ?? left.date ?? "").localeCompare(right.dueDate ?? right.date ?? "");
  }

  private groupWeight(entry: DailyFocusEntry, date: string): number {
    if (entry.status === "overdue") return 0;
    if (entry.kind === "deadline" && entry.dueDate === date) return 1;
    if (entry.kind === "task") return 2;
    if (entry.kind === "schedule") return 3;
    if (entry.dueDate && entry.dueDate > date) return 4;
    return 5;
  }
}

class ManualFocusProvider implements DailyFocusProvider {
  moduleId = "overview";

  constructor(private readonly store: DashboardStore) {}

  getDailyFocusEntries(date: string): DailyFocusEntry[] {
    return this.store.getTodayFocusTasksForDate(date).map((task) => this.toEntry(task, date));
  }

  async completeEntry(sourceId: string): Promise<void> {
    await this.store.toggleTodayFocusTask(sourceId);
  }

  openEntry(sourceId: string, app: App, onDone: () => void): void {
    const task = this.store.getTodayFocusTasks().find((item) => item.id === sourceId);
    new TodayFocusTaskModal(app, task?.date ?? formatDateKey(new Date()), async (values) => {
      if (task) await this.store.updateTodayFocusTask(task.id, values);
      onDone();
    }, task).open();
  }

  private toEntry(task: TodayFocusTask, date: string): DailyFocusEntry {
    return {
      id: `overview-manual-${task.id}`,
      sourceModule: "overview",
      sourceType: "today-focus-task",
      sourceId: task.id,
      title: task.label,
      date: task.date ?? date,
      kind: "manual",
      status: task.completed ? "completed" : "pending",
      priority: task.category,
      canComplete: true,
      canOpenSource: true,
      subtitle: `手动事项 · ${task.category}`
    };
  }
}

class TaskFocusProvider implements DailyFocusProvider {
  moduleId = "tasks";

  constructor(private readonly store: DashboardStore) {}

  getDailyFocusEntries(date: string): DailyFocusEntry[] {
    return this.store.getTasks()
      .filter((task) => !task.parentTaskId)
      .filter((task) => task.plannedDate === date || task.dueDate === date || this.isOverdue(task, date) || this.isUpcoming(task, date))
      .map((task) => this.toEntry(task, date));
  }

  async completeEntry(sourceId: string): Promise<void> {
    await this.store.updateTask(sourceId, { status: "done" });
  }

  openEntry(sourceId: string, app: App, onDone: () => void): void {
    const task = this.store.getTasks().find((item) => item.id === sourceId);
    if (!task) {
      new Notice("任务不存在。");
      return;
    }
    openTaskModal(app, this.store, onDone, task);
  }

  private toEntry(task: Task, date: string): DailyFocusEntry {
    return {
      id: `tasks-task-${task.id}`,
      sourceModule: "tasks",
      sourceType: "task",
      sourceId: task.id,
      title: task.title,
      date: task.plannedDate,
      dueDate: task.dueDate,
      kind: "task",
      status: task.status === "done" ? "completed" : this.isOverdue(task, date) ? "overdue" : "pending",
      priority: task.priority,
      canComplete: task.status !== "done" && task.status !== "cancelled",
      canOpenSource: true,
      subtitle: this.taskSubtitle(task)
    };
  }

  private isOverdue(task: Task, date: string): boolean {
    return Boolean(task.dueDate && task.dueDate < date && task.status !== "done" && task.status !== "cancelled");
  }

  private isUpcoming(task: Task, date: string): boolean {
    if (!task.dueDate || task.dueDate <= date || task.status === "done" || task.status === "cancelled") return false;
    const due = new Date(`${task.dueDate}T00:00:00`);
    const current = new Date(`${date}T00:00:00`);
    const diff = Math.round((due.getTime() - current.getTime()) / 86_400_000);
    return diff <= 3;
  }

  private taskSubtitle(task: Task): string {
    const parts = ["任务"];
    if (task.plannedDate) parts.push(`计划 ${task.plannedDate}`);
    if (task.dueDate) parts.push(`截止 ${task.dueDate}`);
    return parts.join(" · ");
  }
}

class ResearchDeadlineFocusProvider implements DailyFocusProvider {
  moduleId = "research";

  constructor(private readonly store: DashboardStore) {}

  getDailyFocusEntries(date: string): DailyFocusEntry[] {
    return this.store.getResearchDeadlines()
      .filter((deadline) => deadline.date === date || deadline.date < date || this.isUpcoming(deadline, date))
      .map((deadline) => ({
        id: `research-deadline-${deadline.id}`,
        sourceModule: "research",
        sourceType: "research-deadline",
        sourceId: deadline.id,
        title: deadline.title,
        dueDate: deadline.date,
        kind: "deadline",
        status: deadline.date < date ? "overdue" : "pending",
        priority: deadline.priority,
        canComplete: false,
        canOpenSource: false,
        subtitle: `${deadline.type} · ${deadline.date}`
      }));
  }

  private isUpcoming(deadline: ResearchDeadline, date: string): boolean {
    if (deadline.date <= date) return false;
    const due = new Date(`${deadline.date}T00:00:00`);
    const current = new Date(`${date}T00:00:00`);
    const diff = Math.round((due.getTime() - current.getTime()) / 86_400_000);
    return diff <= 3;
  }
}

class ReadingFocusProvider implements DailyFocusProvider {
  moduleId = "reading";

  constructor(private readonly store: DashboardStore) {}

  getDailyFocusEntries(date: string): DailyFocusEntry[] {
    return this.store.getReadingPlans()
      .filter((plan) => plan.status !== "completed")
      .filter((plan) => this.isInRange(plan, date) || plan.endDate === date || plan.endDate < date || this.isUpcoming(plan.endDate, date))
      .map((plan) => this.toEntry(plan, date));
  }

  openEntry(sourceId: string, app: App, onDone: () => void): void {
    const plan = this.store.getReadingPlans().find((item) => item.id === sourceId);
    openReadingPlanModal(app, this.store, onDone, plan);
  }

  private toEntry(plan: ReadingPlan, date: string): DailyFocusEntry {
    const book = this.store.getBooks().find((item) => item.id === plan.bookId);
    return {
      id: `reading-plan-${plan.id}`,
      sourceModule: "reading",
      sourceType: "reading-plan",
      sourceId: plan.id,
      title: book ? `《${book.title}》阅读计划` : "阅读计划",
      date: this.isInRange(plan, date) ? date : undefined,
      dueDate: plan.endDate,
      kind: plan.endDate <= date ? "deadline" : "schedule",
      status: plan.endDate < date ? "overdue" : "pending",
      priority: plan.status,
      canComplete: false,
      canOpenSource: true,
      subtitle: this.subtitle(plan, book)
    };
  }

  private subtitle(plan: ReadingPlan, book: ReturnType<DashboardStore["getBooks"]>[number] | undefined): string {
    const parts = [`${plan.startDate} - ${plan.endDate}`];
    if (book && book.totalPages > book.currentPage) {
      const remainingPages = book.totalPages - book.currentPage;
      const remainingDays = Math.max(1, Math.ceil((new Date(`${plan.endDate}T00:00:00`).getTime() - Date.now()) / 86_400_000));
      parts.push(`建议约 ${Math.ceil(remainingPages / remainingDays)} 页/天`);
    }
    return parts.join(" · ");
  }

  private isInRange(plan: ReadingPlan, date: string): boolean {
    return plan.startDate <= date && plan.endDate >= date;
  }

  private isUpcoming(dueDate: string, date: string): boolean {
    if (dueDate <= date) return false;
    const diff = Math.round((new Date(`${dueDate}T00:00:00`).getTime() - new Date(`${date}T00:00:00`).getTime()) / 86_400_000);
    return diff <= 3;
  }
}

class FitnessFocusProvider implements DailyFocusProvider {
  moduleId = "fitness";

  constructor(private readonly store: DashboardStore) {}

  getDailyFocusEntries(date: string): DailyFocusEntry[] {
    return [
      ...this.store.getTrainingPlans()
        .filter((plan) => plan.status !== "completed")
        .filter((plan) => plan.startDate === date || plan.endDate === date || plan.endDate < date || this.isUpcoming(plan.endDate, date))
        .map((plan) => this.planEntry(plan, date)),
      ...this.store.getFitnessGoals()
        .filter((goal) => goal.status !== "completed" && goal.status !== "archived")
        .filter((goal) => goal.deadline === date || goal.deadline < date || this.isUpcoming(goal.deadline, date))
        .map((goal) => this.goalEntry(goal, date)),
      ...this.store.getHealthReminders()
        .filter((reminder) => reminder.enabled !== false)
        .filter((reminder) => reminder.date === date || (reminder.repeatType === "daily" && reminder.date && reminder.date <= date))
        .map((reminder) => this.reminderEntry(reminder, date))
    ];
  }

  openEntry(sourceId: string, app: App, onDone: () => void): void {
    const plan = this.store.getTrainingPlans().find((item) => item.id === sourceId);
    if (plan) return openTrainingPlanModal(app, this.store, onDone, plan);
    const goal = this.store.getFitnessGoals().find((item) => item.id === sourceId);
    if (goal) return openFitnessGoalModal(app, this.store, onDone, goal);
    const reminder = this.store.getHealthReminders().find((item) => item.id === sourceId);
    if (reminder) return openHealthReminderModal(app, this.store, onDone, reminder);
    new Notice("来源不存在。");
  }

  private planEntry(plan: TrainingPlan, date: string): DailyFocusEntry {
    return {
      id: `fitness-plan-${plan.id}`,
      sourceModule: "fitness",
      sourceType: "training-plan",
      sourceId: plan.id,
      title: plan.title,
      date: plan.startDate === date ? date : undefined,
      dueDate: plan.endDate,
      kind: plan.endDate <= date ? "deadline" : "schedule",
      status: plan.endDate < date ? "overdue" : "pending",
      priority: plan.status,
      canComplete: false,
      canOpenSource: true,
      subtitle: `训练计划 · ${plan.startDate} - ${plan.endDate}`
    };
  }

  private goalEntry(goal: FitnessGoal, date: string): DailyFocusEntry {
    return {
      id: `fitness-goal-${goal.id}`,
      sourceModule: "fitness",
      sourceType: "fitness-goal",
      sourceId: goal.id,
      title: goal.title,
      dueDate: goal.deadline,
      kind: "deadline",
      status: goal.deadline < date ? "overdue" : "pending",
      priority: goal.status,
      canComplete: false,
      canOpenSource: true,
      subtitle: `健身目标 · 截止 ${goal.deadline}`
    };
  }

  private reminderEntry(reminder: HealthReminder, date: string): DailyFocusEntry {
    return {
      id: `fitness-reminder-${reminder.id}`,
      sourceModule: "fitness",
      sourceType: "health-reminder",
      sourceId: reminder.id,
      title: reminder.title,
      date,
      kind: "schedule",
      status: "pending",
      priority: reminder.repeatType,
      canComplete: false,
      canOpenSource: true,
      subtitle: `健康提醒${reminder.time ? ` · ${reminder.time}` : ""}`
    };
  }

  private isUpcoming(dueDate: string, date: string): boolean {
    if (dueDate <= date) return false;
    const diff = Math.round((new Date(`${dueDate}T00:00:00`).getTime() - new Date(`${date}T00:00:00`).getTime()) / 86_400_000);
    return diff <= 3;
  }
}

class FinanceFocusProvider implements DailyFocusProvider {
  moduleId = "finance";

  constructor(private readonly store: DashboardStore) {}

  getDailyFocusEntries(date: string): DailyFocusEntry[] {
    return this.store.getFinanceTodos()
      .filter((todo) => todo.date === date || this.isOverdue(todo, date))
      .map((todo) => ({
        id: `finance-todo-${todo.id}`,
        sourceModule: "finance",
        sourceType: "finance-todo",
        sourceId: todo.id,
        title: todo.title,
        date: todo.date,
        kind: "task",
        status: todo.completed ? "completed" : this.isOverdue(todo, date) ? "overdue" : "pending",
        canComplete: !todo.completed,
        canOpenSource: true,
        subtitle: todo.note ? `理财待办 · ${todo.note}` : "理财待办"
      }));
  }

  async completeEntry(sourceId: string): Promise<void> {
    await this.store.updateFinanceTodo(sourceId, { completed: true });
  }

  openEntry(sourceId: string, app: App, onDone: () => void): void {
    const todo = this.store.getFinanceTodos().find((item) => item.id === sourceId);
    openFinanceTodoModal(app, this.store, onDone, todo);
  }

  private isOverdue(todo: FinanceTodo, date: string): boolean {
    return Boolean(todo.date && todo.date < date && !todo.completed);
  }
}

class GoalsFocusProvider implements DailyFocusProvider {
  moduleId = "goals";

  constructor(private readonly store: DashboardStore) {}

  getDailyFocusEntries(date: string): DailyFocusEntry[] {
    return [
      ...this.store.getGoalActions()
        .filter((action) => action.startDate === date || action.deadline === date || this.isActionOverdue(action, date) || (action.deadline ? this.isUpcoming(action.deadline, date) : false))
        .map((action) => this.actionEntry(action, date)),
      ...this.store.getMilestones()
        .filter((milestone) => milestone.date === date || this.isMilestoneOverdue(milestone, date) || this.isUpcoming(milestone.date, date))
        .map((milestone) => this.milestoneEntry(milestone, date))
    ];
  }

  async completeEntry(sourceId: string): Promise<void> {
    if (this.store.getGoalActions().some((item) => item.id === sourceId)) {
      await this.store.updateGoalAction(sourceId, { status: "completed" });
      return;
    }
    if (this.store.getMilestones().some((item) => item.id === sourceId)) {
      await this.store.updateMilestone(sourceId, { status: "已完成" });
    }
  }

  openEntry(sourceId: string, app: App, onDone: () => void): void {
    const action = this.store.getGoalActions().find((item) => item.id === sourceId);
    if (action) return openGoalActionModal(app, this.store, onDone, action);
    const milestone = this.store.getMilestones().find((item) => item.id === sourceId);
    if (milestone) return openGoalActionModal(app, this.store, onDone, undefined, { isMilestone: true, title: milestone.title, milestoneDate: milestone.date });
    new Notice("来源不存在。");
  }

  private actionEntry(action: GoalAction, date: string): DailyFocusEntry {
    return {
      id: `goals-action-${action.id}`,
      sourceModule: "goals",
      sourceType: "goal-action",
      sourceId: action.id,
      title: action.title,
      date: action.startDate === date ? date : undefined,
      dueDate: action.deadline,
      kind: action.deadline && action.deadline <= date ? "deadline" : "task",
      status: action.status === "completed" ? "completed" : this.isActionOverdue(action, date) ? "overdue" : "pending",
      priority: action.urgency,
      canComplete: action.status !== "completed",
      canOpenSource: true,
      subtitle: `目标行动${action.deadline ? ` · 截止 ${action.deadline}` : ""}`
    };
  }

  private milestoneEntry(milestone: Milestone, date: string): DailyFocusEntry {
    return {
      id: `goals-milestone-${milestone.id}`,
      sourceModule: "goals",
      sourceType: "milestone",
      sourceId: milestone.id,
      title: milestone.title,
      dueDate: milestone.date,
      kind: "deadline",
      status: milestone.status === "已完成" ? "completed" : this.isMilestoneOverdue(milestone, date) ? "overdue" : "pending",
      priority: milestone.status,
      canComplete: milestone.status !== "已完成",
      canOpenSource: true,
      subtitle: `里程碑 · ${milestone.date}`
    };
  }

  private isActionOverdue(action: GoalAction, date: string): boolean {
    return Boolean(action.deadline && action.deadline < date && action.status !== "completed");
  }

  private isMilestoneOverdue(milestone: Milestone, date: string): boolean {
    return milestone.date < date && milestone.status !== "已完成";
  }

  private isUpcoming(dueDate: string, date: string): boolean {
    if (dueDate <= date) return false;
    const diff = Math.round((new Date(`${dueDate}T00:00:00`).getTime() - new Date(`${date}T00:00:00`).getTime()) / 86_400_000);
    return diff <= 3;
  }
}
