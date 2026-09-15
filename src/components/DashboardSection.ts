import { App, Modal, setIcon } from "obsidian";
import type { DashboardStore } from "../core/DashboardStore";
import type { DashboardSectionConfig } from "../types/dashboard";
import { SectionActionMenu } from "./SectionActionMenu";
import { getSectionCapabilities } from "../core/SectionCapabilities";
import { openAddContentModal } from "./SectionContentActions";
import { HabitStatisticsModal } from "./overview/HabitStatisticsModal";
import { MonthlyProgressStatisticsModal } from "./overview/MonthlyProgressStatisticsModal";
import { ContributionHeatmapSection } from "./overview/ContributionHeatmapSection";
import { HabitOverviewSection } from "./overview/HabitOverviewSection";
import { MonthlyCalendarSection } from "./overview/MonthlyCalendarSection";
import { MonthlyProgressSection } from "./overview/MonthlyProgressSection";
import { OverviewStatsSection } from "./overview/OverviewStatsSection";
import { QuickActionsSection } from "./overview/QuickActionsSection";
import { RecentNotesSection } from "./overview/RecentNotesSection";
import { TodayFocusSection } from "./overview/TodayFocusSection";
import { FocusStatSection } from "./overview/FocusStatSection";
import { TodoStatisticsModal } from "./overview/TodoStatisticsModal";
import {
  ApexHabitSettingsSection,
  BannerBackgroundSettingsSection,
  CalendarWidgetSettingsSection,
  DataSourceStatusSection,
  EnabledModulesOverviewSection,
  FunctionalSectionManagerSection,
  HomeLayoutManagerSection,
  ModuleSwitchSortSection,
  QuickActionSettingsSection,
  ThemeColorSettingsSection
} from "./modules/ModulesControls";
import { AccountOverviewSection } from "./finance/AccountOverviewSection";
import { BillRemindersSection } from "./finance/BillRemindersSection";
import { ExpenseCategoriesSection } from "./finance/ExpenseCategoriesSection";
import { ExpenseHeatmapSection } from "./finance/ExpenseHeatmapSection";
import { FinanceLedgerSection } from "./finance/FinanceLedgerSection";
import { FinanceCheckinSection } from "./finance/FinanceCheckinSection";
import { FinanceTodosSection } from "./finance/FinanceTodosSection";
import { IncomeExpenseTrendSection } from "./finance/IncomeExpenseTrendSection";
import { InvestmentWatchSection } from "./finance/InvestmentWatchSection";
import { MonthlyBudgetSection } from "./finance/MonthlyBudgetSection";
import { SavingGoalsSection } from "./finance/SavingGoalsSection";
import {
  ExpenseCategoryStatisticsModal,
  FinanceTodoStatisticsModal,
  IncomeExpenseStatisticsModal,
  InvestmentStatisticsModal,
  MonthlyBudgetStatisticsModal,
  MonthlyFinanceSummaryModal,
  TransactionManagerModal,
  TransactionStatisticsModal,
  openExpenseCategoryModal,
  openFinanceTodoModal,
  openInvestmentModal
} from "./finance/FinanceModals";
import { BodyMeasurementsSection } from "./fitness/BodyMeasurementsSection";
import { CardioStrengthSection } from "./fitness/CardioStrengthSection";
import { FitnessCheckinSection } from "./fitness/FitnessCheckinSection";
import { FitnessGoalsSection } from "./fitness/FitnessGoalsSection";
import { FitnessHeatmapSection } from "./fitness/FitnessHeatmapSection";
import { FitnessStatsSection } from "./fitness/FitnessStatsSection";
import {
  BodyMeasurementStatisticsModal,
  FitnessGoalStatisticsModal,
  HealthHabitStatisticsModal,
  HealthReminderStatisticsModal,
  openBodyMeasurementModal,
  openDailyHealthHabitModal,
  openFitnessGoalModal,
  openHealthReminderModal
} from "./fitness/FitnessModals";
import { GoalBreakdownSection } from "./goals/GoalBreakdownSection";
import { GoalsCheckinSection } from "./goals/GoalsCheckinSection";
import { LongTermProgressSection } from "./goals/LongTermProgressSection";
import { MilestoneTimelineSection } from "./goals/MilestoneTimelineSection";
import { MonthlyKeyResultsSection } from "./goals/MonthlyKeyResultsSection";
import { PriorityMatrixSection } from "./goals/PriorityMatrixSection";
import { QuarterlyOkrSection } from "./goals/QuarterlyOkrSection";
import { ReviewChecklistSection } from "./goals/ReviewChecklistSection";
import { ReviewStatisticsModal } from "./goals/ReviewModals";
import { RisksBlockersSection } from "./goals/RisksBlockersSection";
import { YearlyGoalsSection } from "./goals/YearlyGoalsSection";
import {
  AnnualGoalStatisticsModal,
  GoalBreakdownStatisticsModal,
  MilestoneStatisticsModal,
  MonthlyGoalStatisticsModal,
  PriorityStatisticsModal,
  QuarterlyGoalStatisticsModal,
  RiskStatisticsModal,
  SimpleGoalStatisticsModal,
  openAnnualGoalModal,
  openGoalActionModal,
  openMonthlyGoalModal,
  openQuarterlyGoalModal,
  openRiskModal
} from "./goals/GoalActionModals";
import { HealthRemindersSection } from "./fitness/HealthRemindersSection";
import { TodayWorkoutSection } from "./fitness/TodayWorkoutSection";
import { WaterSleepHabitsSection } from "./fitness/WaterSleepHabitsSection";
import { WorkoutLogSection } from "./fitness/WorkoutLogSection";
import { WorkoutPlanSection } from "./fitness/WorkoutPlanSection";
import { AiReadingReviewSection } from "./reading/AiReadingReviewSection";
import { AddBookModal } from "./reading/AddBookModal";
import { AllBooksModal } from "./reading/AllBooksModal";
import { BookListSection } from "./reading/BookListSection";
import { BookshelfSection } from "./reading/BookshelfSection";
import { CurrentReadingSection } from "./reading/CurrentReadingSection";
import { ReadingCheckinSection } from "./reading/ReadingCheckinSection";
import { ReadingHeatmapSection } from "./reading/ReadingHeatmapSection";
import { ReadingNotesSection } from "./reading/ReadingNotesSection";
import { ReadingPlanSection } from "./reading/ReadingPlanSection";
import { ReadingPlanStatisticsModal, openReadingPlanModal } from "./reading/ReadingPlanModals";
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
    const cardColor = typeof this.section.config?.cardColor === "string" ? this.section.config.cardColor : "default";
    const sectionEl = container.createDiv({
      cls: `cow-section cow-section-${this.section.width ?? "md"} cow-section-height-${this.section.height ?? "sm"} cow-card-color-${cardColor}`
    });

    const header = sectionEl.createDiv({ cls: "cow-section-header" });
    const title = header.createDiv({ cls: "cow-section-title" });
    setIcon(title.createSpan(), this.getIcon());
    title.createEl("h3", { text: this.section.title });

    const actions = header.createDiv({ cls: "cow-section-actions" });
    if (getSectionCapabilities(this.section.type).canAdd) {
      const addButton = actions.createEl("button", {
        cls: "cow-section-add-button",
        attr: { type: "button", "aria-label": `添加${this.section.title}内容` }
      });
      setIcon(addButton.createSpan(), "plus");
      addButton.createSpan({ text: "添加" });
      addButton.addEventListener("click", () => {
        openAddContentModal(this.app, this.store, this.section, this.onDataChanged);
      });
    }
    if (getSectionCapabilities(this.section.type).canOpenStats) {
      const statsButton = actions.createEl("button", {
        cls: "cow-section-add-button",
        attr: { type: "button", "aria-label": `${this.section.title}统计` }
      });
      setIcon(statsButton.createSpan(), "bar-chart-3");
      statsButton.createSpan({ text: "统计" });
      statsButton.addEventListener("click", () => this.openStats());
    }
    this.renderFitnessHeaderActions(actions);
    this.renderFinanceHeaderActions(actions);
    this.renderGoalHeaderActions(actions);
    this.renderReadingHeaderActions(actions);

    const menuButton = actions.createEl("button", {
      cls: "cow-icon-button",
      attr: { type: "button", "aria-label": `${this.section.title}操作菜单` }
    });
    setIcon(menuButton, "more-horizontal");
    menuButton.addEventListener("click", (event) => {
      new SectionActionMenu(this.app, this.store, this.section, this.onRemove, this.onDataChanged).show(event);
    });

    const content = sectionEl.createDiv({ cls: "cow-section-content" });
    this.renderContent(content);
  }

  private renderFitnessHeaderActions(actions: HTMLElement): void {
    const addAction = (label: string, icon: string, onClick: () => void): void => {
      const button = actions.createEl("button", {
        cls: "cow-section-add-button",
        attr: { type: "button", "aria-label": label }
      });
      setIcon(button.createSpan(), icon);
      button.createSpan({ text: label });
      button.addEventListener("click", onClick);
    };

    if (this.section.type === "body-measurements") {
      addAction("记录数据", "plus", () => openBodyMeasurementModal(this.app, this.store, this.onDataChanged));
      addAction("统计", "bar-chart-3", () => new BodyMeasurementStatisticsModal(this.app, this.store, this.onDataChanged).open());
    }
    if (this.section.type === "water-sleep-habits") {
      addAction("编辑今日", "pencil", () => openDailyHealthHabitModal(this.app, this.store, this.onDataChanged));
      addAction("统计", "bar-chart-3", () => new HealthHabitStatisticsModal(this.app, this.store).open());
    }
    if (this.section.type === "fitness-goals") {
      addAction("新增目标", "plus", () => openFitnessGoalModal(this.app, this.store, this.onDataChanged));
      addAction("统计", "bar-chart-3", () => new FitnessGoalStatisticsModal(this.app, this.store, this.onDataChanged).open());
    }
    if (this.section.type === "health-reminders") {
      addAction("新增提醒", "plus", () => openHealthReminderModal(this.app, this.store, this.onDataChanged));
      addAction("统计", "bar-chart-3", () => new HealthReminderStatisticsModal(this.app, this.store).open());
    }
  }

  private renderReadingHeaderActions(actions: HTMLElement): void {
    const addAction = (label: string, icon: string, onClick: () => void): void => {
      const button = actions.createEl("button", {
        cls: "cow-section-add-button",
        attr: { type: "button", "aria-label": label }
      });
      setIcon(button.createSpan(), icon);
      button.createSpan({ text: label });
      button.addEventListener("click", onClick);
    };

    if (this.section.type === "bookshelf") {
      addAction("增加书籍", "plus", () => new AddBookModal(this.app, this.store, this.onDataChanged).open());
      addAction("所有书籍", "library", () => new AllBooksModal(this.app, this.store, this.onDataChanged).open());
    }
    if (this.section.type === "reading-plan") {
      addAction("新增计划", "plus", () => openReadingPlanModal(this.app, this.store, this.onDataChanged));
      addAction("统计", "bar-chart-3", () => new ReadingPlanStatisticsModal(this.app, this.store).open());
    }
  }

  private renderFinanceHeaderActions(actions: HTMLElement): void {
    const addAction = (label: string, icon: string, onClick: () => void): void => {
      const button = actions.createEl("button", {
        cls: "cow-section-add-button",
        attr: { type: "button", "aria-label": label }
      });
      setIcon(button.createSpan(), icon);
      button.createSpan({ text: label });
      button.addEventListener("click", onClick);
    };

    if (this.section.type === "monthly-budget") {
      addAction("管理收支", "list-checks", () => new MonthlyFinanceSummaryModal(this.app, this.store, this.onDataChanged).open());
      addAction("统计", "bar-chart-3", () => new MonthlyBudgetStatisticsModal(this.app, this.store).open());
    }
    if (this.section.type === "expense-categories") {
      addAction("新增分类", "plus", () => openExpenseCategoryModal(this.app, this.store, this.onDataChanged));
      addAction("统计", "bar-chart-3", () => new ExpenseCategoryStatisticsModal(this.app, this.store).open());
    }
    if (this.section.type === "income-expense-trend") {
      addAction("管理记录", "list-checks", () => new TransactionManagerModal(this.app, this.store, this.onDataChanged).open());
      addAction("统计", "bar-chart-3", () => new IncomeExpenseStatisticsModal(this.app, this.store).open());
    }
    if (this.section.type === "finance-todos") {
      addAction("新建待办", "plus", () => openFinanceTodoModal(this.app, this.store, this.onDataChanged));
      addAction("统计", "bar-chart-3", () => new FinanceTodoStatisticsModal(this.app, this.store, this.onDataChanged).open());
    }
    if (this.section.type === "investment-watch") {
      addAction("新增观察", "plus", () => openInvestmentModal(this.app, this.store, this.onDataChanged));
      addAction("统计", "bar-chart-3", () => new InvestmentStatisticsModal(this.app, this.store).open());
    }
    if (this.section.type === "finance-ledger") {
      addAction("统计", "bar-chart-3", () => new TransactionStatisticsModal(this.app, this.store, this.onDataChanged).open());
    }
  }

  private renderGoalHeaderActions(actions: HTMLElement): void {
    const addAction = (label: string, icon: string, onClick: () => void): void => {
      const button = actions.createEl("button", {
        cls: "cow-section-add-button",
        attr: { type: "button", "aria-label": label }
      });
      setIcon(button.createSpan(), icon);
      button.createSpan({ text: label });
      button.addEventListener("click", onClick);
    };

    if (this.section.type === "yearly-goals") {
      addAction("新增目标", "plus", () => openAnnualGoalModal(this.app, this.store, this.onDataChanged));
      addAction("统计", "bar-chart-3", () => new AnnualGoalStatisticsModal(this.app, this.store).open());
    }
    if (this.section.type === "quarterly-okr") {
      addAction("新增季度目标", "plus", () => openQuarterlyGoalModal(this.app, this.store, this.onDataChanged));
      addAction("统计", "bar-chart-3", () => new QuarterlyGoalStatisticsModal(this.app, this.store).open());
    }
    if (this.section.type === "monthly-key-results") {
      addAction("新增月度目标", "plus", () => openMonthlyGoalModal(this.app, this.store, this.onDataChanged));
      addAction("统计", "bar-chart-3", () => new MonthlyGoalStatisticsModal(this.app, this.store).open());
    }
    if (this.section.type === "goal-breakdown") {
      addAction("新增拆解", "plus", () => openGoalActionModal(this.app, this.store, this.onDataChanged));
      addAction("统计", "bar-chart-3", () => new GoalBreakdownStatisticsModal(this.app, this.store).open());
    }
    if (this.section.type === "milestone-timeline") {
      addAction("新增里程碑", "plus", () => openGoalActionModal(this.app, this.store, this.onDataChanged, undefined, { isMilestone: true, status: "todo" }));
      addAction("统计", "bar-chart-3", () => new MilestoneStatisticsModal(this.app, this.store).open());
    }
    if (this.section.type === "priority-matrix") {
      addAction("新增任务", "plus", () => openGoalActionModal(this.app, this.store, this.onDataChanged, undefined, { importance: "important", urgency: "urgent", status: "todo" }));
      addAction("统计", "bar-chart-3", () => new PriorityStatisticsModal(this.app, this.store).open());
    }
    if (this.section.type === "goals-checkin") {
      addAction("统计", "bar-chart-3", () => new SimpleGoalStatisticsModal(this.app, this.store, "本周目标打卡统计").open());
    }
    if (this.section.type === "risks-blockers") {
      addAction("新增风险", "plus", () => openRiskModal(this.app, this.store, this.onDataChanged));
      addAction("统计", "bar-chart-3", () => new RiskStatisticsModal(this.app, this.store).open());
    }
    if (this.section.type === "long-term-progress") {
      addAction("统计", "bar-chart-3", () => new SimpleGoalStatisticsModal(this.app, this.store, "长期进展统计").open());
    }
    if (this.section.type === "review-checklist") {
      addAction("统计", "bar-chart-3", () => new ReviewStatisticsModal(this.app, this.store).open());
    }
  }

  private renderContent(container: HTMLElement): void {
    switch (this.section.type) {
      case "weekly-completion":
      case "pending-tasks":
      case "checkin-streak":
        new OverviewStatsSection(this.store, this.section.type).render(container);
        break;
      case "today-focus-stat":
        new FocusStatSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "today-focus":
      case "today-tasks":
        new TodayFocusSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "habit-overview":
      case "habit-summary":
        new HabitOverviewSection(this.store, this.onDataChanged).render(container);
        break;
      case "monthly-progress":
        new MonthlyProgressSection(this.store).render(container);
        break;
      case "monthly-calendar":
      case "month-calendar":
        new MonthlyCalendarSection(this.app, this.store, this.onDataChanged).render(container);
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
        new ResearchProjectsSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "reading-queue":
        new PaperQueueSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "research-checkin":
        new ResearchCheckinSection(this.store, this.onDataChanged).render(container);
        break;
      case "experiment-plan":
        new ExperimentSection(this.app, this.store, "plan", this.onDataChanged).render(container);
        break;
      case "experiment-records":
        new ExperimentSection(this.app, this.store, "records", this.onDataChanged).render(container);
        break;
      case "data-analysis-tasks":
        new DataAnalysisTasksSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "literature-notes":
        new LiteratureNotesSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "research-timeline":
        new ResearchTimelineSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "research-memo":
        new ResearchMemoSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "current-reading":
        new CurrentReadingSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "bookshelf":
        new BookshelfSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "reading-plan":
        new ReadingPlanSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "reading-checkin":
        new ReadingCheckinSection(this.store, this.onDataChanged).render(container);
        break;
      case "reading-notes":
        new ReadingNotesSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "reading-quotes":
        new ReadingQuotesSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "finished-books":
        new BookListSection(this.app, this.store, "finished", this.onDataChanged).render(container);
        break;
      case "wishlist-books":
        new BookListSection(this.app, this.store, "want-to-read", this.onDataChanged).render(container);
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
        new WorkoutPlanSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "fitness-checkin":
        new FitnessCheckinSection(this.store, this.onDataChanged).render(container);
        break;
      case "body-measurements":
        new BodyMeasurementsSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "cardio-strength-plan":
        new CardioStrengthSection(this.store).render(container);
        break;
      case "water-sleep-habits":
        new WaterSleepHabitsSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "fitness-stats":
        new FitnessStatsSection(this.store).render(container);
        break;
      case "workout-log":
        new WorkoutLogSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "fitness-goals":
        new FitnessGoalsSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "health-reminders":
        new HealthRemindersSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "fitness-heatmap":
        new FitnessHeatmapSection(this.store).render(container);
        break;
      case "monthly-budget":
        new MonthlyBudgetSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "finance-ledger":
        new FinanceLedgerSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "expense-categories":
        new ExpenseCategoriesSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "account-overview":
        new AccountOverviewSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "saving-goals":
        new SavingGoalsSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "bill-reminders":
        new BillRemindersSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "finance-checkin":
        new FinanceCheckinSection(this.store, this.onDataChanged).render(container);
        break;
      case "income-expense-trend":
        new IncomeExpenseTrendSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "finance-todos":
        new FinanceTodosSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "investment-watch":
        new InvestmentWatchSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "expense-heatmap":
        new ExpenseHeatmapSection(this.store).render(container);
        break;
      case "yearly-goals":
        new YearlyGoalsSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "quarterly-okr":
        new QuarterlyOkrSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "monthly-key-results":
        new MonthlyKeyResultsSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "goal-breakdown":
        new GoalBreakdownSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "milestone-timeline":
        new MilestoneTimelineSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "priority-matrix":
        new PriorityMatrixSection(this.app, this.store, this.onDataChanged).render(container);
        break;
      case "goals-checkin":
        new GoalsCheckinSection(this.store, this.onDataChanged).render(container);
        break;
      case "review-checklist":
        new ReviewChecklistSection(this.app, this.store, this.onDataChanged).render(container);
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
      case "section-manager":
        new FunctionalSectionManagerSection(this.app, this.store, this.onDataChanged).render(container);
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
      case "custom-text":
      case "custom-todo-list":
      case "custom-link-list":
      case "custom-memo":
        this.renderCustomSection(container);
        break;
      default:
        container.createEl("p", { text: "这是一个可配置功能分区，后续可以接入真实模块组件。" });
    }
  }

  private openStats(): void {
    if (this.section.type === "habit-overview") {
      new HabitStatisticsModal(this.app, this.store).open();
      return;
    }

    if (this.section.type === "monthly-progress") {
      new MonthlyProgressStatisticsModal(this.app, this.store).open();
      return;
    }

    if (this.section.type === "today-focus") {
      new TodoStatisticsModal(this.app, this.store, new Date(), this.onDataChanged).open();
    }
  }

  private renderCustomSection(container: HTMLElement): void {
    const description = typeof this.section.config?.description === "string" ? this.section.config.description : "";
    if (description) {
      container.createEl("p", { text: description });
    }

    if (this.section.type === "custom-todo-list") {
      const list = container.createEl("ul", { cls: "cow-focus-list" });
      ["待补充 Todo", "继续完善这个分区"].forEach((item) => {
        const row = list.createEl("li");
        row.createEl("input", { type: "checkbox" });
        row.createSpan({ text: item });
      });
      return;
    }

    if (this.section.type === "custom-link-list") {
      const list = container.createDiv({ cls: "cow-data-list" });
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: "链接列表" });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: "后续可在模块内容管理中扩展链接项。" });
      return;
    }

    if (this.section.type === "custom-memo") {
      const list = container.createEl("ul", { cls: "cow-memo-list" });
      list.createEl("li", { text: description || "记录一个可爱的想法。" });
      return;
    }

    if (!description) {
      container.createEl("p", { cls: "cow-empty-state", text: "这是一个自定义文本分区。" });
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
      "finance-ledger": "circle-plus",
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
      "section-manager": "rows-3",
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
