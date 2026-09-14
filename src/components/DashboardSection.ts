import { App, Modal, setIcon } from "obsidian";
import type { DashboardStore } from "../core/DashboardStore";
import type { DashboardSectionConfig } from "../types/dashboard";
import { ContributionHeatmapSection } from "./overview/ContributionHeatmapSection";
import { HabitOverviewSection } from "./overview/HabitOverviewSection";
import { MonthlyCalendarSection } from "./overview/MonthlyCalendarSection";
import { MonthlyProgressSection } from "./overview/MonthlyProgressSection";
import { OverviewStatsSection } from "./overview/OverviewStatsSection";
import { QuickActionsSection } from "./overview/QuickActionsSection";
import { RecentNotesSection } from "./overview/RecentNotesSection";
import { TodayFocusSection } from "./overview/TodayFocusSection";
import {
  ApexHabitSettingsSection,
  BannerBackgroundSettingsSection,
  CalendarWidgetSettingsSection,
  DataSourceStatusSection,
  EnabledModulesOverviewSection,
  HomeLayoutManagerSection,
  ModuleSwitchSortSection,
  QuickActionSettingsSection,
  ThemeColorSettingsSection
} from "./modules/ModulesControls";
import { AccountOverviewSection } from "./finance/AccountOverviewSection";
import { BillRemindersSection } from "./finance/BillRemindersSection";
import { ExpenseCategoriesSection } from "./finance/ExpenseCategoriesSection";
import { ExpenseHeatmapSection } from "./finance/ExpenseHeatmapSection";
import { FinanceCheckinSection } from "./finance/FinanceCheckinSection";
import { FinanceTodosSection } from "./finance/FinanceTodosSection";
import { IncomeExpenseTrendSection } from "./finance/IncomeExpenseTrendSection";
import { InvestmentWatchSection } from "./finance/InvestmentWatchSection";
import { MonthlyBudgetSection } from "./finance/MonthlyBudgetSection";
import { SavingGoalsSection } from "./finance/SavingGoalsSection";
import { BodyMeasurementsSection } from "./fitness/BodyMeasurementsSection";
import { CardioStrengthSection } from "./fitness/CardioStrengthSection";
import { FitnessCheckinSection } from "./fitness/FitnessCheckinSection";
import { FitnessGoalsSection } from "./fitness/FitnessGoalsSection";
import { FitnessHeatmapSection } from "./fitness/FitnessHeatmapSection";
import { FitnessStatsSection } from "./fitness/FitnessStatsSection";
import { GoalBreakdownSection } from "./goals/GoalBreakdownSection";
import { GoalsCheckinSection } from "./goals/GoalsCheckinSection";
import { LongTermProgressSection } from "./goals/LongTermProgressSection";
import { MilestoneTimelineSection } from "./goals/MilestoneTimelineSection";
import { MonthlyKeyResultsSection } from "./goals/MonthlyKeyResultsSection";
import { PriorityMatrixSection } from "./goals/PriorityMatrixSection";
import { QuarterlyOkrSection } from "./goals/QuarterlyOkrSection";
import { ReviewChecklistSection } from "./goals/ReviewChecklistSection";
import { RisksBlockersSection } from "./goals/RisksBlockersSection";
import { YearlyGoalsSection } from "./goals/YearlyGoalsSection";
import { HealthRemindersSection } from "./fitness/HealthRemindersSection";
import { TodayWorkoutSection } from "./fitness/TodayWorkoutSection";
import { WaterSleepHabitsSection } from "./fitness/WaterSleepHabitsSection";
import { WorkoutLogSection } from "./fitness/WorkoutLogSection";
import { WorkoutPlanSection } from "./fitness/WorkoutPlanSection";
import { AiReadingReviewSection } from "./reading/AiReadingReviewSection";
import { BookListSection } from "./reading/BookListSection";
import { BookshelfSection } from "./reading/BookshelfSection";
import { CurrentReadingSection } from "./reading/CurrentReadingSection";
import { ReadingCheckinSection } from "./reading/ReadingCheckinSection";
import { ReadingHeatmapSection } from "./reading/ReadingHeatmapSection";
import { ReadingNotesSection } from "./reading/ReadingNotesSection";
import { ReadingPlanSection } from "./reading/ReadingPlanSection";
import { ReadingQuotesSection } from "./reading/ReadingQuotesSection";
import { ReadingStatsSection } from "./reading/ReadingStatsSection";
import { DataAnalysisTasksSection } from "./research/DataAnalysisTasksSection";
import { ExperimentSection } from "./research/ExperimentSection";
import { LiteratureNotesSection } from "./research/LiteratureNotesSection";
import { PaperQueueSection } from "./research/PaperQueueSection";
import { ResearchCheckinSection } from "./research/ResearchCheckinSection";
import { ResearchMemoSection } from "./research/ResearchMemoSection";
import { ResearchProjectsSection } from "./research/ResearchProjectsSection";
import { ResearchTimelineSection } from "./research/ResearchTimelineSection";

export type SectionRemoveHandler = (section: DashboardSectionConfig) => Promise<void>;

export class ConfirmDeleteSectionModal extends Modal {
  constructor(
    app: App,
    private readonly section: DashboardSectionConfig,
    private readonly onConfirm: () => Promise<void>
  ) {
    super(app);
  }

  onOpen(): void {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("cow-modal");
    contentEl.createEl("h2", { text: `删除“${this.section.title}”分区？` });
    contentEl.createEl("p", { text: "只会从当前工作台布局移除，不会删除任何 Markdown 文件。" });

    const actions = contentEl.createDiv({ cls: "cow-modal-actions" });
    const cancel = actions.createEl("button", { text: "取消", attr: { type: "button" } });
    cancel.addEventListener("click", () => this.close());

    const remove = actions.createEl("button", {
      text: "删除",
      cls: "mod-warning",
      attr: { type: "button" }
    });
    remove.addEventListener("click", async () => {
      await this.onConfirm();
      this.close();
    });
  }
}

export class DashboardSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly section: DashboardSectionConfig,
    private readonly onRemove: SectionRemoveHandler,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const sectionEl = container.createDiv({
      cls: `cow-section cow-section-${this.section.width ?? "md"} cow-section-height-${this.section.height ?? "sm"}`
    });

    const header = sectionEl.createDiv({ cls: "cow-section-header" });
    const title = header.createDiv({ cls: "cow-section-title" });
    setIcon(title.createSpan(), this.getIcon());
    title.createEl("h3", { text: this.section.title });

    const removeButton = header.createEl("button", {
      cls: "cow-icon-button",
      attr: { type: "button", "aria-label": `删除${this.section.title}` }
    });
    setIcon(removeButton, "trash-2");
    removeButton.addEventListener("click", () => {
      new ConfirmDeleteSectionModal(this.app, this.section, () => this.onRemove(this.section)).open();
    });

    const content = sectionEl.createDiv({ cls: "cow-section-content" });
    this.renderContent(content);
  }

  private renderContent(container: HTMLElement): void {
    switch (this.section.type) {
      case "weekly-completion":
      case "pending-tasks":
      case "today-focus-stat":
      case "checkin-streak":
        new OverviewStatsSection(this.store, this.section.type).render(container);
        break;
      case "today-focus":
      case "today-tasks":
        new TodayFocusSection(this.store, this.onDataChanged).render(container);
        break;
      case "habit-overview":
      case "habit-summary":
        new HabitOverviewSection(this.store, this.onDataChanged).render(container);
        break;
      case "monthly-progress":
        new MonthlyProgressSection().render(container);
        break;
      case "monthly-calendar":
      case "month-calendar":
        new MonthlyCalendarSection(this.app, this.store).render(container);
        break;
      case "recent-notes":
        new RecentNotesSection(this.app).render(container);
        break;
      case "quick-actions":
        new QuickActionsSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "contribution-heatmap":
      case "year-heatmap":
        new ContributionHeatmapSection(this.app).render(container);
        break;
      case "research-projects":
        new ResearchProjectsSection(this.app, this.store).render(container);
        break;
      case "reading-queue":
        new PaperQueueSection(this.app, this.store).render(container);
        break;
      case "research-checkin":
        new ResearchCheckinSection(this.store, this.onDataChanged).render(container);
        break;
      case "experiment-plan":
        new ExperimentSection(this.app, this.store, "plan").render(container);
        break;
      case "experiment-records":
        new ExperimentSection(this.app, this.store, "records").render(container);
        break;
      case "data-analysis-tasks":
        new DataAnalysisTasksSection().render(container);
        break;
      case "literature-notes":
        new LiteratureNotesSection(this.app, this.store).render(container);
        break;
      case "research-timeline":
        new ResearchTimelineSection(this.store).render(container);
        break;
      case "research-memo":
        new ResearchMemoSection(this.store).render(container);
        break;
      case "current-reading":
        new CurrentReadingSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "bookshelf":
        new BookshelfSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "reading-plan":
        new ReadingPlanSection(this.store).render(container);
        break;
      case "reading-checkin":
        new ReadingCheckinSection(this.store, this.onDataChanged).render(container);
        break;
      case "reading-notes":
        new ReadingNotesSection(this.app, this.store).render(container);
        break;
      case "reading-quotes":
        new ReadingQuotesSection(this.store).render(container);
        break;
      case "finished-books":
        new BookListSection(this.store, "已读").render(container);
        break;
      case "wishlist-books":
        new BookListSection(this.store, "想读").render(container);
        break;
      case "reading-stats":
        new ReadingStatsSection(this.store).render(container);
        break;
      case "reading-heatmap":
        new ReadingHeatmapSection(this.store).render(container);
        break;
      case "ai-reading-review":
        new AiReadingReviewSection().render(container);
        break;
      case "today-workout":
        new TodayWorkoutSection(this.store).render(container);
        break;
      case "workout-plan":
        new WorkoutPlanSection(this.store).render(container);
        break;
      case "fitness-checkin":
        new FitnessCheckinSection(this.store, this.onDataChanged).render(container);
        break;
      case "body-measurements":
        new BodyMeasurementsSection(this.store).render(container);
        break;
      case "cardio-strength-plan":
        new CardioStrengthSection(this.store).render(container);
        break;
      case "water-sleep-habits":
        new WaterSleepHabitsSection(this.store).render(container);
        break;
      case "fitness-stats":
        new FitnessStatsSection(this.store).render(container);
        break;
      case "workout-log":
        new WorkoutLogSection(this.store).render(container);
        break;
      case "fitness-goals":
        new FitnessGoalsSection(this.store).render(container);
        break;
      case "health-reminders":
        new HealthRemindersSection().render(container);
        break;
      case "fitness-heatmap":
        new FitnessHeatmapSection(this.store).render(container);
        break;
      case "monthly-budget":
        new MonthlyBudgetSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "expense-categories":
        new ExpenseCategoriesSection(this.store).render(container);
        break;
      case "account-overview":
        new AccountOverviewSection(this.store).render(container);
        break;
      case "saving-goals":
        new SavingGoalsSection(this.store).render(container);
        break;
      case "bill-reminders":
        new BillRemindersSection(this.store).render(container);
        break;
      case "finance-checkin":
        new FinanceCheckinSection(this.store, this.onDataChanged).render(container);
        break;
      case "income-expense-trend":
        new IncomeExpenseTrendSection(this.store).render(container);
        break;
      case "finance-todos":
        new FinanceTodosSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "investment-watch":
        new InvestmentWatchSection().render(container);
        break;
      case "expense-heatmap":
        new ExpenseHeatmapSection(this.store).render(container);
        break;
      case "yearly-goals":
        new YearlyGoalsSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "quarterly-okr":
        new QuarterlyOkrSection(this.store).render(container);
        break;
      case "monthly-key-results":
        new MonthlyKeyResultsSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "goal-breakdown":
        new GoalBreakdownSection(this.store).render(container);
        break;
      case "milestone-timeline":
        new MilestoneTimelineSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "priority-matrix":
        new PriorityMatrixSection().render(container);
        break;
      case "goals-checkin":
        new GoalsCheckinSection(this.store, this.onDataChanged).render(container);
        break;
      case "review-checklist":
        new ReviewChecklistSection().render(container);
        break;
      case "risks-blockers":
        new RisksBlockersSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "long-term-progress":
        new LongTermProgressSection(this.store).render(container);
        break;
      case "enabled-modules-overview":
        new EnabledModulesOverviewSection(this.store).render(container);
        break;
      case "home-layout-manager":
        new HomeLayoutManagerSection(this.store, this.onDataChanged).render(container);
        break;
      case "module-settings":
        new ModuleSwitchSortSection(this.store, this.onDataChanged).render(container);
        break;
      case "banner-background-settings":
        new BannerBackgroundSettingsSection(this.store, this.onDataChanged).render(container);
        break;
      case "calendar-widget-settings":
        new CalendarWidgetSettingsSection(this.store, this.onDataChanged).render(container);
        break;
      case "apex-habit-settings":
        new ApexHabitSettingsSection(this.store, this.onDataChanged).render(container);
        break;
      case "quick-action-settings":
        new QuickActionSettingsSection(this.store, this.onDataChanged).render(container);
        break;
      case "theme-color-settings":
        new ThemeColorSettingsSection(this.store, this.onDataChanged).render(container);
        break;
      case "data-source-status":
        new DataSourceStatusSection().render(container);
        break;
      default:
        container.createEl("p", { text: "这是一个可配置功能分区，后续可以接入真实模块组件。" });
    }
  }

  private getIcon(): string {
    const iconMap: Record<string, string> = {
      "weekly-completion": "badge-percent",
      "pending-tasks": "clipboard-list",
      "today-focus-stat": "headphones",
      "checkin-streak": "flame",
      "today-focus": "target",
      "today-tasks": "target",
      "habit-overview": "calendar-check",
      "habit-summary": "calendar-check",
      "monthly-progress": "bar-chart-3",
      "monthly-calendar": "calendar-days",
      "month-calendar": "calendar-days",
      "recent-notes": "file-text",
      "quick-actions": "zap",
      "contribution-heatmap": "activity",
      "year-heatmap": "activity",
      memo: "sticky-note",
      todo: "list-checks",
      projects: "folder-kanban",
      notes: "notebook-tabs",
      "research-projects": "layers",
      "reading-queue": "book-marked",
      "research-checkin": "calendar-check",
      "experiment-plan": "clipboard-check",
      "experiment-records": "file-clock",
      "data-analysis-tasks": "bar-chart-3",
      "literature-notes": "notebook-text",
      "research-timeline": "calendar-clock",
      "research-memo": "lightbulb",
      "current-reading": "book-open-check",
      bookshelf: "library",
      "reading-plan": "calendar-range",
      "reading-checkin": "calendar-check",
      "reading-notes": "notebook-tabs",
      "reading-quotes": "quote",
      "finished-books": "badge-check",
      "wishlist-books": "bookmark-plus",
      "reading-stats": "pie-chart",
      "reading-heatmap": "activity",
      "ai-reading-review": "sparkles",
      "today-workout": "dumbbell",
      "workout-plan": "clipboard-list",
      "fitness-checkin": "calendar-check",
      "body-measurements": "ruler",
      "cardio-strength-plan": "heart-pulse",
      "water-sleep-habits": "moon",
      "fitness-stats": "flame",
      "workout-log": "notebook-text",
      "fitness-goals": "target",
      "health-reminders": "bell-ring",
      "fitness-heatmap": "activity",
      "monthly-budget": "wallet-cards",
      "expense-categories": "chart-pie",
      "account-overview": "landmark",
      "saving-goals": "piggy-bank",
      "bill-reminders": "receipt",
      "finance-checkin": "calendar-check",
      "income-expense-trend": "line-chart",
      "finance-todos": "list-checks",
      "investment-watch": "candlestick-chart",
      "expense-heatmap": "activity",
      "yearly-goals": "flag",
      "quarterly-okr": "target",
      "monthly-key-results": "list-checks",
      "goal-breakdown": "git-branch",
      "milestone-timeline": "milestone",
      "priority-matrix": "layout-dashboard",
      "goals-checkin": "calendar-check",
      "review-checklist": "clipboard-check",
      "risks-blockers": "triangle-alert",
      "long-term-progress": "trending-up",
      "enabled-modules-overview": "panel-top",
      "home-layout-manager": "layout-template",
      "module-settings": "sliders-horizontal"
      ,
      "banner-background-settings": "image",
      "calendar-widget-settings": "calendar-days",
      "apex-habit-settings": "calendar-check",
      "quick-action-settings": "zap",
      "theme-color-settings": "palette",
      "data-source-status": "database"
    };

    return iconMap[this.section.type] ?? "sparkles";
  }
}
