import type {
  AvailableModuleDefinition,
  Account,
  ApexHabitSettings,
  Bill,
  BookItem,
  BookTagDefinition,
  BodyMeasurement,
  Budget,
  CalendarTodo,
  CheckInDefinition,
  CheckInRecord,
  CustomSectionInput,
  DataAnalysisTask,
  DashboardPage,
  DashboardPageDefinition,
  DashboardSectionConfig,
  ExperimentPlan,
  FocusRecord,
  FitnessDailyRecord,
  FitnessHabitDefinition,
  FitnessHabitRecord,
  FitnessGoal,
  FocusSettings,
  FocusState,
  FinanceTodo,
  Goal,
  GoalAction,
  HealthReminder,
  HealthReminderLog,
  InvestmentSnapshot,
  InvestmentWatchItem,
  KeyResult,
  LiteratureNote,
  Milestone,
  ModuleLayoutConfig,
  ModuleLayoutMode,
  Objective,
  QuickActionConfig,
  PaperStatusDefinition,
  PaperTagDefinition,
  PriorityMatrixItem,
  ReadingQuote,
  ReadingNote,
  ReadingPlan,
  ResearchDeadline,
  ResearchPaper,
  ResearchProject,
  ReviewItem,
  Risk,
  SavingGoal,
  SectionLayoutConfig,
  Task,
  TaskPriority,
  TaskProject,
  TaskSettings,
  TaskStatus,
  TodayFocusTask,
  Transaction,
  TrainingPlan,
  VenueDefinition,
  WantToReadItem,
  Workout,
  ThemeSettings,
  WorkbenchData
} from "../types/dashboard";

export const DASHBOARD_PAGES: DashboardPageDefinition[] = [
  { id: "overview", label: "总览", icon: "home", description: "今日概览与快捷入口" },
  { id: "research", label: "科研", icon: "flask-conical", description: "论文、实验和科研记录" },
  { id: "reading", label: "阅读", icon: "book-open", description: "读书队列与摘录进度" },
  { id: "fitness", label: "健身", icon: "dumbbell", description: "训练、恢复和习惯打卡" },
  { id: "finance", label: "理财", icon: "coins", description: "预算、资产和投资观察" },
  { id: "tasks", label: "任务管理", icon: "list-todo", description: "把想做的事，变成正在发生的事" },
  { id: "goals", label: "目标管理", icon: "target", description: "长期目标与阶段计划" },
  { id: "modules", label: "模块管理", icon: "layout-grid", description: "模块启用、布局和数据绑定" }
];

export const AVAILABLE_MODULES: AvailableModuleDefinition[] = [
  { type: "weekly-completion", title: "本周完成率", description: "统计今日焦点和习惯的本周完成率。", page: "overview", icon: "badge-percent", defaultWidth: "sm" },
  { type: "pending-tasks", title: "待办任务", description: "显示未完成的今日焦点任务。", page: "overview", icon: "clipboard-list", defaultWidth: "sm" },
  { type: "today-focus-stat", title: "今日专注", description: "记录今日专注时长。", page: "overview", icon: "headphones", defaultWidth: "sm" },
  { type: "checkin-streak", title: "连续打卡", description: "显示连续完成习惯的天数。", page: "overview", icon: "flame", defaultWidth: "sm" },
  { type: "today-focus", title: "今日焦点", description: "科研、阅读、健身、理财和个人任务。", page: "overview", icon: "target", defaultWidth: "md", defaultHeight: "md" },
  { type: "habit-overview", title: "打卡总览", description: "查看并切换本周习惯打卡状态。", page: "overview", icon: "calendar-check", defaultWidth: "md", defaultHeight: "md" },
  { type: "monthly-progress", title: "本月进度", description: "按页面追踪本月完成率。", page: "overview", icon: "bar-chart-3", defaultWidth: "md" },
  { type: "monthly-calendar", title: "月度日历", description: "独立月历，预留笔记、任务和事件标记。", page: "overview", icon: "calendar-days", defaultWidth: "md", defaultHeight: "md" },
  { type: "recent-notes", title: "最近笔记", description: "为后续 NoteService 预留的最近文件列表。", page: "overview", icon: "file-text", defaultWidth: "md" },
  { type: "quick-actions", title: "快捷操作", description: "新建笔记、添加任务、打开日历等动作入口。", page: "overview", icon: "zap", defaultWidth: "md" },
  { type: "contribution-heatmap", title: "年度贡献图", description: "按月份展示 Markdown 创建数量热力图。", page: "overview", icon: "activity", defaultWidth: "full", defaultHeight: "sm" },
  { type: "memo", title: "Memo", description: "随手记录灵感和想法。", page: "overview", icon: "sticky-note", defaultWidth: "md" },
  { type: "todo", title: "Todo", description: "轻量清单模块。", page: "overview", icon: "list-checks", defaultWidth: "md" },
  { type: "projects", title: "Projects", description: "项目卡片和关联笔记。", page: "overview", icon: "folder-kanban", defaultWidth: "md" },
  { type: "notes", title: "Notes", description: "笔记入口集合。", page: "overview", icon: "notebook-tabs", defaultWidth: "md" },
  { type: "research-projects", title: "研究项目总览", description: "科研项目与阶段状态。", page: "research", icon: "layers", defaultWidth: "md" },
  { type: "reading-queue", title: "论文阅读队列", description: "论文阅读状态和优先级。", page: "research", icon: "book-marked", defaultWidth: "md" },
  { type: "paper-field-manager", title: "论文字段管理", description: "管理论文阅读状态、会议期刊和标签。", page: "research", icon: "sliders-horizontal", defaultWidth: "md" },
  { type: "research-checkin", title: "本周科研打卡", description: "论文、实验、写作和组会准备。", page: "research", icon: "calendar-check", defaultWidth: "md" },
  { type: "experiment-plan", title: "实验计划", description: "计划中的实验任务。", page: "research", icon: "clipboard-check", defaultWidth: "md" },
  { type: "experiment-records", title: "实验记录", description: "最近实验记录与笔记入口。", page: "research", icon: "file-clock", defaultWidth: "md" },
  { type: "data-analysis-tasks", title: "数据分析任务", description: "数据处理、分析和图表任务。", page: "research", icon: "bar-chart-3", defaultWidth: "md" },
  { type: "literature-notes", title: "文献笔记", description: "已绑定的论文阅读笔记。", page: "research", icon: "notebook-text", defaultWidth: "md" },
  { type: "research-timeline", title: "会议 / DDL 时间线", description: "重要会议、截止日期和汇报安排。", page: "research", icon: "calendar-clock", defaultWidth: "md" },
  { type: "research-memo", title: "科研灵感 Memo", description: "记录突然冒出来的科研想法。", page: "research", icon: "lightbulb", defaultWidth: "md" },
  { type: "current-reading", title: "当前阅读", description: "当前正在读的书和进度。", page: "reading", icon: "book-open-check", defaultWidth: "md" },
  { type: "bookshelf", title: "书架 Bookshelf", description: "书籍卡片和阅读状态。", page: "reading", icon: "library", defaultWidth: "md" },
  { type: "reading-plan", title: "阅读计划", description: "近期阅读安排。", page: "reading", icon: "calendar-range", defaultWidth: "md" },
  { type: "reading-checkin", title: "本周阅读打卡", description: "本周阅读习惯打卡。", page: "reading", icon: "calendar-check", defaultWidth: "md" },
  { type: "reading-notes", title: "阅读笔记", description: "阅读笔记入口。", page: "reading", icon: "notebook-tabs", defaultWidth: "md" },
  { type: "reading-quotes", title: "金句摘录", description: "值得反复看的句子。", page: "reading", icon: "quote", defaultWidth: "md" },
  { type: "reading-tag-manager", title: "标签管理", description: "管理阅读书籍标签。", page: "reading", icon: "tags", defaultWidth: "md" },
  { type: "finished-books", title: "已读清单", description: "已经读完的书。", page: "reading", icon: "badge-check", defaultWidth: "md" },
  { type: "wishlist-books", title: "想读清单", description: "准备开始的书。", page: "reading", icon: "bookmark-plus", defaultWidth: "md" },
  { type: "reading-stats", title: "阅读进度统计", description: "页数、完成率和阅读数量。", page: "reading", icon: "pie-chart", defaultWidth: "md" },
  { type: "reading-heatmap", title: "月度阅读热力图", description: "按日展示本月阅读活动。", page: "reading", icon: "activity", defaultWidth: "md" },
  { type: "ai-reading-review", title: "AI 阅读复盘", description: "AI 复盘能力占位卡。", page: "reading", icon: "sparkles", defaultWidth: "md" },
  { type: "today-workout", title: "今日训练", description: "今天的训练安排和完成状态。", page: "fitness", icon: "dumbbell", defaultWidth: "md" },
  { type: "workout-plan", title: "训练计划", description: "近期训练计划。", page: "fitness", icon: "clipboard-list", defaultWidth: "md" },
  { type: "fitness-checkin", title: "本周健身打卡", description: "训练、饮水、睡眠和恢复打卡。", page: "fitness", icon: "calendar-check", defaultWidth: "md" },
  { type: "body-measurements", title: "体重与围度记录", description: "体重、BMI 和身体围度变化。", page: "fitness", icon: "ruler", defaultWidth: "md" },
  { type: "cardio-strength-plan", title: "有氧 / 力量安排", description: "平衡有氧和力量训练。", page: "fitness", icon: "heart-pulse", defaultWidth: "md" },
  { type: "water-sleep-habits", title: "习惯", description: "饮水、睡眠和自定义健康习惯。", page: "fitness", icon: "moon", defaultWidth: "md" },
  { type: "fitness-stats", title: "趋势图", description: "观察身体、运动和执行趋势。", page: "fitness", icon: "line-chart", defaultWidth: "lg" },
  { type: "workout-log", title: "运动日志", description: "最近完成的训练记录。", page: "fitness", icon: "notebook-text", defaultWidth: "md" },
  { type: "fitness-goals", title: "健身目标进度", description: "追踪健身目标完成度。", page: "fitness", icon: "target", defaultWidth: "md" },
  { type: "health-reminders", title: "健康提醒", description: "恢复、热身和休息提醒。", page: "fitness", icon: "bell-ring", defaultWidth: "md" },
  { type: "fitness-heatmap", title: "月度运动热力图", description: "按日展示运动活跃度。", page: "fitness", icon: "activity", defaultWidth: "md" },
  { type: "monthly-budget", title: "本月预算", description: "预算、支出和剩余额度。", page: "finance", icon: "wallet-cards", defaultWidth: "md" },
  { type: "finance-ledger", title: "记账", description: "快速记录每日收入与支出。", page: "finance", icon: "circle-plus", defaultWidth: "md" },
  { type: "expense-categories", title: "支出分类", description: "本月分类支出占比。", page: "finance", icon: "chart-pie", defaultWidth: "md" },
  { type: "account-overview", title: "账户总览", description: "个人账户余额概览。", page: "finance", icon: "landmark", defaultWidth: "md" },
  { type: "saving-goals", title: "储蓄目标", description: "储蓄目标进度。", page: "finance", icon: "piggy-bank", defaultWidth: "md" },
  { type: "bill-reminders", title: "账单提醒", description: "即将到期的账单。", page: "finance", icon: "receipt", defaultWidth: "md" },
  { type: "finance-checkin", title: "本周理财打卡", description: "记账、复盘和预算检查。", page: "finance", icon: "calendar-check", defaultWidth: "md" },
  { type: "income-expense-trend", title: "收支趋势", description: "本月收入和支出走势。", page: "finance", icon: "line-chart", defaultWidth: "md" },
  { type: "finance-todos", title: "本月记账待办", description: "本月财务待办事项。", page: "finance", icon: "list-checks", defaultWidth: "md" },
  { type: "investment-watch", title: "投资观察", description: "个人投资观察，不执行交易。", page: "finance", icon: "candlestick-chart", defaultWidth: "md" },
  { type: "expense-heatmap", title: "月度支出热力图", description: "按日展示支出密度。", page: "finance", icon: "activity", defaultWidth: "md" },
  { type: "yearly-goals", title: "年度目标", description: "全年目标和完成进度。", page: "goals", icon: "flag", defaultWidth: "md" },
  { type: "quarterly-okr", title: "季度目标", description: "按年份和季度推进的目标。", page: "goals", icon: "target", defaultWidth: "md" },
  { type: "monthly-key-results", title: "月度目标", description: "本月需要推进的目标。", page: "goals", icon: "list-checks", defaultWidth: "md" },
  { type: "goal-breakdown", title: "目标拆解", description: "把目标拆到行动层。", page: "goals", icon: "git-branch", defaultWidth: "md" },
  { type: "milestone-timeline", title: "里程碑时间线", description: "目标里程碑和日期。", page: "goals", icon: "milestone", defaultWidth: "md" },
  { type: "priority-matrix", title: "优先级矩阵", description: "重要紧急四象限。", page: "goals", icon: "layout-dashboard", defaultWidth: "md" },
  { type: "goals-checkin", title: "本周目标打卡", description: "目标推进习惯打卡。", page: "goals", icon: "calendar-check", defaultWidth: "md" },
  { type: "review-checklist", title: "复盘清单", description: "周复盘和月复盘事项。", page: "goals", icon: "clipboard-check", defaultWidth: "md" },
  { type: "risks-blockers", title: "风险与阻碍", description: "识别风险并记录解决方案。", page: "goals", icon: "triangle-alert", defaultWidth: "md" },
  { type: "long-term-progress", title: "长期进展", description: "目标长期趋势和完成率。", page: "goals", icon: "trending-up", defaultWidth: "md" },
  { type: "enabled-modules-overview", title: "已启用模块概览", description: "统计当前页面和整个工作台启用模块。", page: "modules", icon: "panel-top", defaultWidth: "md" },
  { type: "home-layout-manager", title: "页面布局管理", description: "为每个页面单独设置默认、紧凑或极简布局。", page: "modules", icon: "layout-template", defaultWidth: "md" },
  { type: "section-manager", title: "功能分区管理", description: "按页面管理启用、隐藏、删除、排序、颜色、宽度和自定义分区。", page: "modules", icon: "rows-3", defaultWidth: "full", defaultHeight: "lg" },
  { type: "banner-background-settings", title: "Banner 背景设置", description: "设置推荐壁纸、本地图片、纯色背景和遮罩。", page: "modules", icon: "image", defaultWidth: "md" },
  { type: "calendar-widget-settings", title: "日历组件设置", description: "控制日期标记、周起始日和高亮颜色。", page: "modules", icon: "calendar-days", defaultWidth: "md" },
  { type: "apex-habit-settings", title: "Apex 打卡模块设置", description: "管理首页打卡展示和自定义打卡项目。", page: "modules", icon: "calendar-check", defaultWidth: "md" },
  { type: "quick-action-settings", title: "快捷操作配置", description: "控制内置快捷操作和自定义入口。", page: "modules", icon: "zap", defaultWidth: "md" },
  { type: "theme-color-settings", title: "主题与配色", description: "调整 CSS variables、圆角和字体大小。", page: "modules", icon: "palette", defaultWidth: "md" },
  { type: "data-source-status", title: "数据源", description: "查看笔记、任务、日历、习惯、阅读和科研是否启用。", page: "modules", icon: "database", defaultWidth: "md" }
];

function createSection(
  page: DashboardPage,
  type: string,
  title: string,
  order: number,
  width: DashboardSectionConfig["width"] = "md",
  height: DashboardSectionConfig["height"] = "md"
): DashboardSectionConfig {
  return {
    id: `${page}-${type}`,
    page,
    type,
    title,
    order,
    enabled: true,
    width,
    height
  };
}

function nowIso(): string {
  return new Date().toISOString();
}

function todayKey(): string {
  return formatDateKey(new Date());
}

function currentMonthKey(): string {
  return todayKey().slice(0, 7);
}

function createDefaultCheckInDefinitions(): CheckInDefinition[] {
  const createdAt = new Date("2026-09-14T08:00:00.000Z").getTime();
  const create = (moduleId: CheckInDefinition["moduleId"], id: string, title: string, order: number, icon: string, color: string): CheckInDefinition => ({
    id,
    moduleId,
    title,
    icon,
    color,
    enabled: true,
    order,
    createdAt,
    updatedAt: createdAt
  });
  return [
    create("overview", "reading", "阅读", 10, "book-open", "#ff8fbc"),
    create("overview", "fitness", "健身", 20, "dumbbell", "#7bd88f"),
    create("overview", "finance", "理财", 30, "coins", "#ffd166"),
    create("overview", "writing", "写作", 40, "pencil", "#9ecbff"),
    create("overview", "study", "学习", 50, "graduation-cap", "#c9a7ff"),
    create("research", "research-reading-paper", "阅读论文", 10, "book-marked", "#9ecbff"),
    create("research", "research-experiment", "实验", 20, "flask-conical", "#c9a7ff"),
    create("research", "research-writing", "写作", 30, "pencil", "#ff8fbc"),
    create("research", "research-data", "整理数据", 40, "database", "#7bd88f"),
    create("research", "research-meeting", "组会准备", 50, "users", "#ffd166"),
    create("reading", "reading-pages", "读书", 10, "book-open", "#ff8fbc"),
    create("reading", "reading-note", "写笔记", 20, "notebook-tabs", "#9ecbff"),
    create("reading", "reading-quote", "摘录", 30, "quote", "#ffd166"),
    create("reading", "reading-review", "复盘", 40, "rotate-ccw", "#c9a7ff"),
    create("reading", "reading-plan", "计划", 50, "calendar-range", "#7bd88f"),
    create("fitness", "fitness-workout", "训练", 10, "dumbbell", "#7bd88f"),
    create("fitness", "fitness-water", "饮水", 20, "droplets", "#9ecbff"),
    create("fitness", "fitness-sleep", "睡眠", 30, "moon", "#c9a7ff"),
    create("fitness", "fitness-stretch", "拉伸", 40, "activity", "#ffd166"),
    create("fitness", "fitness-recovery", "恢复", 50, "heart-pulse", "#ff8fbc"),
    create("finance", "finance-record", "记账", 10, "receipt", "#ffd166"),
    create("finance", "finance-budget", "预算", 20, "wallet-cards", "#ff8fbc"),
    create("finance", "finance-review", "复盘", 30, "rotate-ccw", "#c9a7ff"),
    create("finance", "finance-save", "储蓄", 40, "piggy-bank", "#7bd88f"),
    create("finance", "finance-invest", "观察", 50, "candlestick-chart", "#9ecbff"),
    create("goals", "goals-plan", "计划", 10, "calendar-check", "#9ecbff"),
    create("goals", "goals-action", "行动", 20, "target", "#ff8fbc"),
    create("goals", "goals-review", "复盘", 30, "rotate-ccw", "#c9a7ff"),
    create("goals", "goals-focus", "聚焦", 40, "focus", "#ffd166"),
    create("goals", "goals-adjust", "调整", 50, "sliders-horizontal", "#7bd88f")
  ];
}

const DEFAULT_MODULE_LAYOUTS: Record<DashboardPage, ModuleLayoutConfig> = {
  overview: { mode: "default", columns: 12, sections: {} },
  research: { mode: "default", columns: 12, sections: {} },
  reading: { mode: "default", columns: 12, sections: {} },
  fitness: { mode: "default", columns: 12, sections: {} },
  finance: { mode: "default", columns: 12, sections: {} },
  tasks: { mode: "default", columns: 12, sections: {} },
  goals: { mode: "default", columns: 12, sections: {} },
  modules: { mode: "default", columns: 12, sections: {} }
};

const DEFAULT_DATA: WorkbenchData = {
  dataVersion: "0.7.0",
  currentPage: "overview",
  sections: [
    {
      id: "overview-weekly-completion",
      page: "overview",
      type: "weekly-completion",
      title: "本周完成率",
      order: 10,
      enabled: true,
      width: "sm",
      height: "sm"
    },
    {
      id: "overview-pending-tasks",
      page: "overview",
      type: "pending-tasks",
      title: "待办任务",
      order: 20,
      enabled: true,
      width: "sm",
      height: "sm"
    },
    {
      id: "overview-today-focus-stat",
      page: "overview",
      type: "today-focus-stat",
      title: "今日专注",
      order: 30,
      enabled: true,
      width: "sm",
      height: "sm"
    },
    {
      id: "overview-checkin-streak",
      page: "overview",
      type: "checkin-streak",
      title: "连续打卡",
      order: 40,
      enabled: true,
      width: "sm",
      height: "sm"
    },
    {
      id: "overview-today-focus",
      page: "overview",
      type: "today-focus",
      title: "今日焦点",
      order: 50,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "overview-habit-overview",
      page: "overview",
      type: "habit-overview",
      title: "打卡总览",
      order: 60,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "overview-monthly-progress",
      page: "overview",
      type: "monthly-progress",
      title: "本月进度",
      order: 70,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "overview-monthly-calendar",
      page: "overview",
      type: "monthly-calendar",
      title: "月度日历",
      order: 80,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "overview-recent-notes",
      page: "overview",
      type: "recent-notes",
      title: "最近笔记",
      order: 90,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "overview-quick-actions",
      page: "overview",
      type: "quick-actions",
      title: "快捷操作",
      order: 100,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "overview-contribution-heatmap",
      page: "overview",
      type: "contribution-heatmap",
      title: "年度贡献图",
      order: 110,
      enabled: true,
      width: "full",
      height: "sm"
    },
    {
      id: "research-projects",
      page: "research",
      type: "research-projects",
      title: "研究项目总览",
      order: 10,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "research-reading-queue",
      page: "research",
      type: "reading-queue",
      title: "论文阅读队列",
      order: 20,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "research-paper-field-manager",
      page: "research",
      type: "paper-field-manager",
      title: "论文字段管理",
      order: 25,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "research-checkin",
      page: "research",
      type: "research-checkin",
      title: "本周科研打卡",
      order: 30,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "research-experiment-plan",
      page: "research",
      type: "experiment-plan",
      title: "实验计划",
      order: 40,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "research-experiment-records",
      page: "research",
      type: "experiment-records",
      title: "实验记录",
      order: 50,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "research-data-analysis",
      page: "research",
      type: "data-analysis-tasks",
      title: "数据分析任务",
      order: 60,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "research-literature-notes",
      page: "research",
      type: "literature-notes",
      title: "文献笔记",
      order: 70,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "research-timeline",
      page: "research",
      type: "research-timeline",
      title: "会议 / DDL 时间线",
      order: 80,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "research-memo",
      page: "research",
      type: "research-memo",
      title: "科研灵感 Memo",
      order: 90,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "reading-current",
      page: "reading",
      type: "current-reading",
      title: "当前阅读",
      order: 10,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "reading-bookshelf",
      page: "reading",
      type: "bookshelf",
      title: "书架 Bookshelf",
      order: 20,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "reading-plan",
      page: "reading",
      type: "reading-plan",
      title: "阅读计划",
      order: 30,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "reading-checkin",
      page: "reading",
      type: "reading-checkin",
      title: "本周阅读打卡",
      order: 40,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "reading-notes",
      page: "reading",
      type: "reading-notes",
      title: "阅读笔记",
      order: 50,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "reading-quotes",
      page: "reading",
      type: "reading-quotes",
      title: "金句摘录",
      order: 60,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "reading-finished",
      page: "reading",
      type: "finished-books",
      title: "已读清单",
      order: 80,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "reading-wishlist",
      page: "reading",
      type: "wishlist-books",
      title: "想读清单",
      order: 90,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "reading-tag-manager",
      page: "reading",
      type: "reading-tag-manager",
      title: "标签管理",
      order: 70,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "reading-stats",
      page: "reading",
      type: "reading-stats",
      title: "阅读进度统计",
      order: 100,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "reading-heatmap",
      page: "reading",
      type: "reading-heatmap",
      title: "月度阅读热力图",
      order: 110,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "reading-ai-review",
      page: "reading",
      type: "ai-reading-review",
      title: "AI 阅读复盘",
      order: 120,
      enabled: true,
      width: "md",
      height: "md"
    },
    createSection("fitness", "today-workout", "今日训练", 10),
    createSection("fitness", "workout-plan", "训练计划", 20),
    createSection("fitness", "fitness-checkin", "本周健身打卡", 30),
    createSection("fitness", "body-measurements", "体重与围度记录", 40),
    createSection("fitness", "cardio-strength-plan", "有氧 / 力量安排", 50),
    createSection("fitness", "water-sleep-habits", "习惯", 60),
    createSection("fitness", "fitness-stats", "趋势图", 70, "lg"),
    createSection("fitness", "workout-log", "运动日志", 80),
    createSection("fitness", "fitness-goals", "健身目标进度", 90),
    createSection("fitness", "health-reminders", "健康提醒", 100),
    createSection("fitness", "fitness-heatmap", "月度运动热力图", 110),
    createSection("finance", "monthly-budget", "本月预算", 10),
    createSection("finance", "finance-ledger", "记账", 20),
    createSection("finance", "expense-categories", "支出分类", 30),
    createSection("finance", "account-overview", "账户总览", 40),
    createSection("finance", "saving-goals", "储蓄目标", 50),
    createSection("finance", "bill-reminders", "账单提醒", 60),
    createSection("finance", "finance-checkin", "本周理财打卡", 70),
    createSection("finance", "income-expense-trend", "收支趋势", 80),
    createSection("finance", "finance-todos", "本月记账待办", 90),
    createSection("finance", "investment-watch", "投资观察", 100),
    createSection("finance", "expense-heatmap", "月度支出热力图", 110),
    createSection("goals", "yearly-goals", "年度目标", 10),
    createSection("goals", "quarterly-okr", "季度目标", 20),
    createSection("goals", "monthly-key-results", "月度目标", 30),
    createSection("goals", "goal-breakdown", "目标拆解", 40),
    createSection("goals", "milestone-timeline", "里程碑时间线", 50),
    createSection("goals", "priority-matrix", "优先级矩阵", 60),
    createSection("goals", "goals-checkin", "本周目标打卡", 70),
    createSection("goals", "review-checklist", "复盘清单", 80),
    createSection("goals", "risks-blockers", "风险与阻碍", 90),
    createSection("goals", "long-term-progress", "长期进展", 100),
    createSection("modules", "enabled-modules-overview", "已启用模块概览", 10),
    createSection("modules", "home-layout-manager", "页面布局管理", 20),
    createSection("modules", "section-manager", "功能分区管理", 30, "full", "lg"),
    createSection("modules", "banner-background-settings", "Banner 背景设置", 50),
    createSection("modules", "calendar-widget-settings", "日历组件设置", 60),
    createSection("modules", "apex-habit-settings", "Apex 打卡模块设置", 70),
    createSection("modules", "quick-action-settings", "快捷操作配置", 80),
    createSection("modules", "theme-color-settings", "主题与配色", 90),
    createSection("modules", "data-source-status", "数据源", 100)
  ],
  moduleLayouts: structuredClone(DEFAULT_MODULE_LAYOUTS),
  banner: {
    message: "要成功，先发疯，不顾一切向前冲。",
    subtitle: "把想法变成行动，让每一天都更靠近理想的自己。",
    background: "pink-paper",
    backgroundPosition: "center",
    overlay: true,
    opacity: 0.88,
    sidebarAvatar: { type: "preset", value: "dog" },
    bannerAvatar: { type: "preset", value: "dog" }
  },
  habits: {},
  todayFocusTasks: [
    { id: "focus-research", label: "推进论文或实验记录", category: "科研", completed: true },
    { id: "focus-reading", label: "阅读并整理一条笔记", category: "阅读", completed: true },
    { id: "focus-fitness", label: "完成今日训练或拉伸", category: "健身", completed: false },
    { id: "focus-finance", label: "检查预算与账单", category: "理财", completed: false },
    { id: "focus-personal", label: "复盘今天的计划", category: "个人", completed: false }
  ],
  researchProjects: [
    {
      id: "project-medical-vlm",
      title: "多模态大模型在医学影像中的应用",
      status: "进行中",
      progress: 70,
      startDate: "2026-08-01",
      deadline: "2026-10-30",
      tags: ["VLM", "医学影像"]
    },
    {
      id: "project-graph-drug",
      title: "基于图神经网络的药物重定位研究",
      status: "撰写中",
      progress: 40,
      startDate: "2026-07-15",
      deadline: "2026-11-15",
      tags: ["GNN", "Drug"]
    },
    {
      id: "project-single-cell",
      title: "单细胞时空转录组数据分析方法",
      status: "已完成",
      progress: 100,
      startDate: "2026-06-10",
      deadline: "2026-09-01",
      tags: ["scRNA-seq"]
    }
  ],
  researchPapers: [
    { id: "paper-survey-llm", title: "A Survey on Multimodal LLMs", venue: "CVPR", venueId: "venue-cvpr", year: 2024, status: "进行中", statusId: "paper-status-reading", readingProgress: 62, tagIds: ["paper-tag-multimodal"], createdAt: 1789344000000, updatedAt: 1789344000000 },
    { id: "paper-single-cell", title: "Single-cell foundation models", venue: "Nature", venueId: "venue-nature", year: 2024, status: "未读", statusId: "paper-status-unread", readingProgress: 0, tagIds: ["paper-tag-biology"], createdAt: 1789344000000, updatedAt: 1789344000000 },
    { id: "paper-gnn-drug", title: "Graph Neural Networks for Drug Discovery", venue: "ICLR", venueId: "venue-iclr", year: 2024, status: "进行中", statusId: "paper-status-reading", readingProgress: 45, tagIds: ["paper-tag-gnn"], createdAt: 1789344000000, updatedAt: 1789344000000 }
  ],
  literatureNotes: [
    { id: "lit-note-survey-llm", title: "A Survey on Multimodal LLMs 阅读笔记", notePath: "", paperReadingId: "paper-survey-llm", createdAt: 1789344000000, updatedAt: 1789344000000 }
  ],
  paperStatuses: [
    { id: "paper-status-unread", name: "未读", color: "#f8a8c4", order: 10 },
    { id: "paper-status-planned", name: "计划阅读", color: "#ffd166", order: 20 },
    { id: "paper-status-reading", name: "阅读中", color: "#76c7f2", order: 30 },
    { id: "paper-status-finished", name: "已读", color: "#7bd88f", order: 40 },
    { id: "paper-status-paused", name: "暂停", color: "#c9b6ff", order: 50 }
  ],
  paperVenues: [
    { id: "venue-cvpr", name: "CVPR", type: "conference", color: "#76c7f2" },
    { id: "venue-iclr", name: "ICLR", type: "conference", color: "#c9b6ff" },
    { id: "venue-nature", name: "Nature", type: "journal", color: "#7bd88f" },
    { id: "venue-chi", name: "CHI", type: "conference", color: "#f8a8c4" }
  ],
  paperTags: [
    { id: "paper-tag-multimodal", name: "Multimodal", color: "#f8a8c4" },
    { id: "paper-tag-biology", name: "Biology", color: "#7bd88f" },
    { id: "paper-tag-gnn", name: "GNN", color: "#c9b6ff" },
    { id: "paper-tag-wearable", name: "Wearable", color: "#ffd166" }
  ],
  experimentPlans: [
    { id: "exp-cell-drug", title: "细胞系传代与药物处理", date: "2026-09-14", status: "进行中" },
    { id: "exp-western", title: "Western Blot 实验", date: "2026-09-16", status: "未开始" },
    { id: "exp-flow", title: "流式细胞术 FACS", date: "2026-09-18", status: "计划中" }
  ],
  experimentRecords: [
    { id: "record-drug", title: "细胞药物处理记录", date: "2026-09-13", status: "已完成", experimentPlanId: "exp-cell-drug" },
    { id: "record-wb", title: "WB 条带结果", date: "2026-09-12", status: "已完成", experimentPlanId: "exp-western" },
    { id: "record-flow", title: "流式数据分析", date: "2026-09-10", status: "进行中" }
  ],
  researchDeadlines: [
    { id: "ddl-report", title: "组会实验进展汇报", date: "2026-09-18", type: "组会", priority: "medium" },
    { id: "ddl-dataset", title: "蓝金申请书提交", date: "2026-10-05", type: "DDL", priority: "high" },
    { id: "ddl-neurips", title: "NeurIPS 投稿截止", date: "2026-10-09", type: "DDL", priority: "high" }
  ],
  researchMemos: [
    "把图神经网络和医学影像预训练结合，看看能否改善小样本场景。",
    "对比学习框架也许可以作为论文方法部分的主线。",
    "组会前整理一次失败实验，可能比只展示成功结果更有价值。"
  ],
  dataAnalysisTasks: [
    { id: "analysis-scrna", title: "scRNA-seq 数据预处理", progress: 80, status: "进行中" },
    { id: "analysis-deg", title: "差异基因分析", progress: 100, status: "已完成" },
    { id: "analysis-chart", title: "可视化图表生成", progress: 30, status: "进行中" },
    { id: "analysis-paper", title: "论文图表整理", progress: 50, status: "进行中" }
  ],
  books: [
    {
      id: "book-deep-work",
      title: "深度工作",
      author: "Cal Newport",
      totalPages: 304,
      currentPage: 188,
      status: "在读",
      rating: 4,
      startDate: "2026-09-01",
      tagIds: ["book-tag-efficiency", "book-tag-focus"],
      tags: ["效率", "专注"]
    },
    {
      id: "book-atomic-habits",
      title: "Atomic Habits",
      author: "James Clear",
      totalPages: 320,
      currentPage: 320,
      status: "已读",
      rating: 5,
      startDate: "2026-08-01",
      finishDate: "2026-08-21",
      tagIds: ["book-tag-habit"],
      tags: ["习惯"]
    },
    {
      id: "book-thinking",
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      totalPages: 499,
      currentPage: 0,
      status: "想读",
      tagIds: ["book-tag-psychology"],
      tags: ["心理学"]
    }
  ],
  readingQuotes: [
    { id: "quote-1", text: "专注不是拒绝世界，而是选择此刻真正重要的事。", source: "深度工作", bookId: "book-deep-work", style: "sticky", backgroundColor: "#fff1ad" },
    { id: "quote-2", text: "微小习惯会在时间里复利。", source: "Atomic Habits", bookId: "book-atomic-habits", style: "soft", backgroundColor: "#ffe0ed" }
  ],
  wantToReadItems: [
    { id: "want-design-book", title: "设计心理学", author: "Donald A. Norman", summary: "补一下产品设计和可用性基础。", status: "pending", createdAt: "2026-09-01T08:00:00.000Z", updatedAt: "2026-09-01T08:00:00.000Z" }
  ],
  bookTags: [
    { id: "book-tag-efficiency", name: "效率", color: "#f8a8c4", order: 10 },
    { id: "book-tag-focus", name: "专注", color: "#76c7f2", order: 20 },
    { id: "book-tag-habit", name: "习惯", color: "#7bd88f", order: 30 },
    { id: "book-tag-psychology", name: "心理学", color: "#c9b6ff", order: 40 }
  ],
  readingNotes: [],
  readingPlans: [
    { id: "plan-deep-work-sep", bookId: "book-deep-work", startDate: "2026-09-01", endDate: "2026-09-30", targetPages: 304, goal: "读完整本书", progress: 62, note: "完成全书并整理深度工作实践清单。", status: "active", createdAt: "2026-09-01T08:00:00.000Z", updatedAt: "2026-09-01T08:00:00.000Z" },
    { id: "plan-thinking-oct", bookId: "book-thinking", startDate: "2026-10-01", endDate: "2026-10-31", targetPages: 180, goal: "阅读判断与决策相关章节", progress: 0, note: "先读判断与决策相关章节。", status: "planned", createdAt: "2026-09-01T08:00:00.000Z", updatedAt: "2026-09-01T08:00:00.000Z" }
  ],
  workouts: [
    { id: "workout-1", date: "2026-09-14", type: "力量", duration: 45, calories: 320, completed: false, note: "下肢力量 + 核心" },
    { id: "workout-2", date: "2026-09-12", type: "有氧", duration: 35, calories: 260, completed: true, note: "椭圆机中等强度" },
    { id: "workout-3", date: "2026-09-10", type: "拉伸", duration: 20, calories: 80, completed: true, note: "肩颈和髋部放松" }
  ],
  trainingPlans: [
    {
      id: "training-plan-weight",
      title: "每周三练减重计划",
      fitnessGoalId: "fitness-goal-weight",
      startDate: "2026-09-01",
      endDate: "2026-12-31",
      weeklyFrequency: 3,
      description: "周一力量，周三有氧，周五全身循环。",
      note: "根据状态调整强度。",
      status: "active",
      createdAt: "2026-09-01T08:00:00.000Z",
      updatedAt: "2026-09-14T08:00:00.000Z"
    }
  ],
  bodyMeasurements: [
    { id: "measure-2026-09-01", date: "2026-09-01", weight: 58.8, bmi: 21.6, waist: 70, chest: 84, hip: 91, note: "", createdAt: "2026-09-01T08:00:00.000Z", updatedAt: "2026-09-01T08:00:00.000Z" },
    { id: "measure-2026-09-08", date: "2026-09-08", weight: 58.2, bmi: 21.4, waist: 69, chest: 84, hip: 90, note: "", createdAt: "2026-09-08T08:00:00.000Z", updatedAt: "2026-09-08T08:00:00.000Z" },
    { id: "measure-2026-09-14", date: "2026-09-14", weight: 57.9, bmi: 21.3, waist: 68, chest: 84, hip: 90, note: "", createdAt: "2026-09-14T08:00:00.000Z", updatedAt: "2026-09-14T08:00:00.000Z" }
  ],
  fitnessGoals: [
    { id: "fitness-goal-weight", title: "稳定体重", type: "减重", description: "稳定下降到更轻盈的状态。", currentValue: 57.9, targetValue: 56.5, unit: "kg", targetUnit: "kg", progress: 46, startDate: "2026-09-01", deadline: "2026-12-31", status: "active", createdAt: "2026-09-01T08:00:00.000Z", updatedAt: "2026-09-14T08:00:00.000Z" },
    { id: "fitness-goal-cardio", title: "本月有氧", type: "跑步", currentValue: 210, targetValue: 600, unit: "min", targetUnit: "min", progress: 35, startDate: "2026-09-01", deadline: "2026-09-30", status: "active", createdAt: "2026-09-01T08:00:00.000Z", updatedAt: "2026-09-14T08:00:00.000Z" },
    { id: "fitness-goal-strength", title: "力量训练", type: "力量", currentValue: 6, targetValue: 12, unit: "次", targetUnit: "次", progress: 50, startDate: "2026-09-01", deadline: "2026-09-30", status: "active", createdAt: "2026-09-01T08:00:00.000Z", updatedAt: "2026-09-14T08:00:00.000Z" }
  ],
  healthReminders: [
    { id: "health-warmup", title: "训练前热身 8 分钟。", date: "2026-09-14", time: "18:30", repeatType: "once", repeatDays: [], note: "", enabled: true, createdAt: "2026-09-14T08:00:00.000Z", updatedAt: "2026-09-14T08:00:00.000Z" },
    { id: "health-stand", title: "久坐 50 分钟后起身活动。", date: "2026-09-14", time: "15:30", repeatType: "daily", repeatDays: [], note: "", enabled: true, createdAt: "2026-09-14T08:00:00.000Z", updatedAt: "2026-09-14T08:00:00.000Z" },
    { id: "health-protein", title: "力量日后补充蛋白质和睡眠。", date: "2026-09-14", time: "20:30", repeatType: "once", repeatDays: [], note: "", enabled: true, createdAt: "2026-09-14T08:00:00.000Z", updatedAt: "2026-09-14T08:00:00.000Z" },
    { id: "health-recovery", title: "状态差时允许降强度，不硬扛。", date: "2026-09-14", time: "21:30", repeatType: "daily", repeatDays: [], note: "", enabled: true, createdAt: "2026-09-14T08:00:00.000Z", updatedAt: "2026-09-14T08:00:00.000Z" }
  ],
  healthReminderLogs: [],
  transactions: [
    { id: "tx-1", type: "income", category: "工资", amount: 12000, date: "2026-09-01", note: "月收入" },
    { id: "tx-2", type: "expense", category: "餐饮", amount: 860, date: "2026-09-03", note: "外食与咖啡" },
    { id: "tx-3", type: "expense", category: "交通", amount: 220, date: "2026-09-05", note: "通勤" },
    { id: "tx-4", type: "expense", category: "学习", amount: 399, date: "2026-09-08", note: "课程订阅" },
    { id: "tx-5", type: "expense", category: "购物", amount: 520, date: "2026-09-12", note: "日用品" }
  ],
  budgets: [
    { id: "budget-food", category: "餐饮", amount: 1800, spent: 860 },
    { id: "budget-transport", category: "交通", amount: 500, spent: 220 },
    { id: "budget-study", category: "学习", amount: 800, spent: 399 },
    { id: "budget-shopping", category: "购物", amount: 1200, spent: 520 }
  ],
  accounts: [
    { id: "account-cash", name: "现金钱包", type: "现金", balance: 800 },
    { id: "account-card", name: "储蓄卡", type: "储蓄卡", balance: 32600 },
    { id: "account-invest", name: "基金账户", type: "投资账户", balance: 18800 }
  ],
  savingGoals: [
    { id: "saving-emergency", title: "应急金", current: 18000, target: 30000, deadline: "2026-12-31" },
    { id: "saving-travel", title: "旅行基金", current: 3600, target: 8000, deadline: "2026-10-31" }
  ],
  bills: [
    { id: "bill-rent", title: "房租", amount: 3000, dueDate: "2026-09-20", paid: false },
    { id: "bill-phone", title: "手机套餐", amount: 89, dueDate: "2026-09-18", paid: false },
    { id: "bill-card", title: "信用卡还款", amount: 1260, dueDate: "2026-09-25", paid: false }
  ],
  financeTodos: [
    { id: "finance-todo-transport", title: "记录本周交通支出", completed: false },
    { id: "finance-todo-food", title: "检查餐饮预算", completed: true },
    { id: "finance-todo-bills", title: "确认账单提醒", completed: false },
    { id: "finance-todo-invest", title: "整理投资观察笔记", completed: false }
  ],
  tasks: [],
  taskProjects: [],
  taskSettings: {},
  goals: [
    {
      id: "goal-research",
      title: "完成一篇高质量科研论文",
      description: "完成实验、撰写初稿并进入投稿准备。",
      category: "科研",
      progress: 62,
      deadline: "2026-12-20",
      status: "进行中"
    },
    {
      id: "goal-health",
      title: "建立稳定健康节奏",
      description: "每周训练、规律睡眠、保持能量。",
      category: "健康",
      progress: 48,
      deadline: "2026-12-31",
      status: "进行中"
    },
    {
      id: "goal-finance",
      title: "完成年度储蓄计划",
      description: "控制预算，提高储蓄率。",
      category: "理财",
      progress: 55,
      deadline: "2026-12-31",
      status: "进行中"
    }
  ],
  goalActions: [],
  objectives: [
    { id: "obj-q3-research", title: "Q3 完成论文方法和实验闭环", quarter: "2026 Q3", progress: 72 },
    { id: "obj-q4-life", title: "Q4 建立可持续工作生活系统", quarter: "2026 Q4", progress: 35 }
  ],
  keyResults: [
    { id: "kr-exp", objectiveId: "obj-q3-research", title: "完成 3 组关键实验", progress: 80, completed: false },
    { id: "kr-draft", objectiveId: "obj-q3-research", title: "论文初稿达到可内审状态", progress: 60, completed: false },
    { id: "kr-training", objectiveId: "obj-q4-life", title: "连续 8 周训练不少于 3 次", progress: 45, completed: false }
  ],
  milestones: [
    { id: "mile-exp", goalId: "goal-research", title: "完成核心实验", date: "2026-09-30", status: "进行中" },
    { id: "mile-draft", goalId: "goal-research", title: "完成论文初稿", date: "2026-10-20", status: "未开始" },
    { id: "mile-review", goalId: "goal-research", title: "完成组内反馈修改", date: "2026-11-10", status: "未开始" }
  ],
  risks: [
    { id: "risk-time", title: "实验排期被压缩", level: "high", solution: "提前预约设备，准备替代实验方案。" },
    { id: "risk-energy", title: "睡眠不足影响执行", level: "medium", solution: "晚间固定收尾，减少临睡前输入。" }
  ],
  reviewItems: [
    { id: "review-week-focus", date: "2026-09-14", title: "本周目标推进复盘", content: "检查最重要的目标是否真的向前推进。", status: "todo", createdAt: "2026-09-14T08:00:00.000Z", updatedAt: "2026-09-14T08:00:00.000Z" },
    { id: "review-cut-busywork", date: "2026-09-14", title: "减少忙碌感任务", content: "识别只是带来忙碌感、但不产生结果的任务。", status: "todo", createdAt: "2026-09-14T08:00:00.000Z", updatedAt: "2026-09-14T08:00:00.000Z" }
  ],
  calendarSettings: {
    showNoteMarkers: true,
    showTaskMarkers: true,
    showEventMarkers: true,
    weekStartsOn: "monday",
    highlightColor: "#f23b8d"
  },
  calendarTodos: [],
  apexHabitSettings: {
    showOnOverview: true,
    showStreak: true,
    showWeeklyProgress: true,
    customHabits: [
      { id: "custom-reading", label: "阅读", enabled: true, order: 10 },
      { id: "custom-fitness", label: "健身", enabled: true, order: 20 },
      { id: "custom-finance", label: "理财", enabled: true, order: 30 },
      { id: "custom-writing", label: "写作", enabled: true, order: 40 },
      { id: "custom-study", label: "学习", enabled: true, order: 50 }
    ]
  },
  checkInDefinitions: createDefaultCheckInDefinitions(),
  checkInRecords: [],
  quickActions: [
    { id: "quick-new-note", label: "新建笔记", enabled: true, order: 10, type: "new-note" },
    { id: "quick-daily-note", label: "打开今日笔记", enabled: true, order: 20, type: "daily-note" },
    { id: "quick-search", label: "搜索", enabled: true, order: 30, type: "search" },
    { id: "quick-templates", label: "打开模板", enabled: true, order: 40, type: "templates" },
    { id: "quick-graph", label: "打开图谱", enabled: true, order: 50, type: "graph" }
  ],
  focusSettings: {
    focusDuration: 25,
    breakDuration: 5,
    autoStartBreak: false,
    autoStartNextFocus: false,
    defaultBackground: "pink"
  },
  focusState: {
    isRunning: false,
    isPaused: false,
    mode: "focus",
    remainingSeconds: 25 * 60
  },
  focusRecords: [],
  fitnessDailyRecords: [
    { date: "2026-09-14", waterCups: 5, waterGoal: 8, waterNote: "", sleepHours: 7, sleepGoal: 8, bedtime: "23:30", wakeTime: "07:00", sleepNote: "", updatedAt: "2026-09-14T08:00:00.000Z" }
  ],
  fitnessHabitDefinitions: [
    { id: "fitness-habit-steps", name: "步数", targetName: "每日步数目标", targetValue: 10000, unit: "步", order: 10, createdAt: "2026-09-14T08:00:00.000Z", updatedAt: "2026-09-14T08:00:00.000Z" }
  ],
  fitnessHabitRecords: [
    { date: "2026-09-14", habitId: "fitness-habit-steps", actualValue: 8530, note: "", updatedAt: "2026-09-14T08:00:00.000Z" }
  ],
  investmentWatchItems: [
    { id: "watch-hs300", name: "沪深300", code: "CSI300", price: 3800, changePercent: 0.8, type: "指数" },
    { id: "watch-btc", name: "比特币", code: "BTC", price: 65000, changePercent: -1.2, type: "加密资产" },
    { id: "watch-gold", name: "黄金", code: "XAU", price: 2380, changePercent: 0.3, type: "商品" }
  ],
  investmentSnapshots: [
    { id: "snapshot-watch-hs300-2026-09-14", investmentId: "watch-hs300", date: "2026-09-14", price: 3800, changePercent: 0.8, note: "", createdAt: "2026-09-14T08:00:00.000Z" },
    { id: "snapshot-watch-btc-2026-09-14", investmentId: "watch-btc", date: "2026-09-14", price: 65000, changePercent: -1.2, note: "", createdAt: "2026-09-14T08:00:00.000Z" },
    { id: "snapshot-watch-gold-2026-09-14", investmentId: "watch-gold", date: "2026-09-14", price: 2380, changePercent: 0.3, note: "", createdAt: "2026-09-14T08:00:00.000Z" }
  ],
  priorityMatrixItems: [
    { id: "priority-1", title: "本周必须交付的关键结果", quadrant: "important-urgent", note: "优先处理", completed: false },
    { id: "priority-2", title: "长期目标、健康节奏、能力建设", quadrant: "important-not-urgent", note: "每天推进", completed: false },
    { id: "priority-3", title: "临时消息、流程性处理", quadrant: "not-important-urgent", note: "集中批处理", completed: false },
    { id: "priority-4", title: "低价值消耗，尽量减少", quadrant: "not-important-not-urgent", note: "减少投入", completed: false }
  ],
  theme: {
    cuteBg: "#ffd1e2",
    cuteCard: "#fff7df",
    cutePrimary: "#f23b8d",
    cuteSecondary: "#ffd166",
    cuteText: "#4a1f19",
    cuteBorder: "rgba(242, 59, 141, 0.26)",
    cuteRadius: 18,
    cuteShadow: "0 10px 28px rgba(190, 66, 120, 0.16)",
    cardOpacity: 0.86,
    textureStrength: 0.5,
    fontSize: 14
  },
  userSettings: {
    showLeftSidebar: true,
    weekStartsOn: "monday",
    dateFormat: "YYYY-MM-DD",
    overviewLayout: "default"
  }
};

export class DashboardStore {
  private data: WorkbenchData = structuredClone(DEFAULT_DATA);

  constructor(
    private readonly loadPluginData: () => Promise<unknown>,
    private readonly savePluginData: (data: WorkbenchData) => Promise<void>
  ) {}

  async load(): Promise<void> {
    const savedData = await this.loadPluginData();
    this.data = this.mergeWithDefaults(savedData);
  }

  async save(): Promise<void> {
    await this.savePluginData(this.data);
  }

  getData(): WorkbenchData {
    return this.data;
  }

  getPages(): DashboardPageDefinition[] {
    return DASHBOARD_PAGES;
  }

  getAvailableModules(page: DashboardPage): AvailableModuleDefinition[] {
    return AVAILABLE_MODULES.filter((module) => module.page === "all" || module.page === page);
  }

  getAllSections(): DashboardSectionConfig[] {
    return [...this.data.sections].sort((left, right) => {
      if (left.page === right.page) return left.order - right.order;
      return left.page.localeCompare(right.page);
    });
  }

  getSectionsForPage(page: DashboardPage): DashboardSectionConfig[] {
    const layout = this.getModuleLayout(page);
    return this.data.sections
      .filter((section) => section.page === page && section.enabled)
      .sort((left, right) => this.getSectionLayoutOrder(left, layout) - this.getSectionLayoutOrder(right, layout));
  }

  getModuleLayout(page: DashboardPage): ModuleLayoutConfig {
    return this.data.moduleLayouts[page] ?? DEFAULT_MODULE_LAYOUTS[page];
  }

  async setCurrentPage(page: DashboardPage): Promise<void> {
    this.data.currentPage = page;
    await this.save();
  }

  async addSection(page: DashboardPage, moduleType: string): Promise<DashboardSectionConfig> {
    const moduleDefinition = this.getAvailableModules(page).find((module) => module.type === moduleType);
    const existingSections = this.data.sections.filter((section) => section.page === page);
    const nextOrder = existingSections.reduce((max, section) => Math.max(max, section.order), 0) + 10;
    const section: DashboardSectionConfig = {
      id: `${page}-${moduleType}-${Date.now()}`,
      page,
      type: moduleType,
      title: moduleDefinition?.title ?? moduleType,
      order: nextOrder,
      enabled: true,
      width: moduleDefinition?.defaultWidth ?? "md",
      height: moduleDefinition?.defaultHeight ?? "sm",
      config: {}
    };

    this.data.sections.push(section);
    this.ensureSectionLayout(page, section.id, nextOrder);
    await this.save();
    return section;
  }

  async addCustomSection(input: CustomSectionInput): Promise<DashboardSectionConfig> {
    const existingSections = this.data.sections.filter((section) => section.page === input.page);
    const nextOrder = input.order ?? existingSections.reduce((max, section) => Math.max(max, section.order), 0) + 10;
    const section: DashboardSectionConfig = {
      id: input.id || `${input.page}-${input.type}-${Date.now()}`,
      page: input.page,
      type: input.type,
      title: input.title,
      order: nextOrder,
      enabled: true,
      width: "md",
      height: "md",
      config: {
        description: input.description,
        cardColor: input.color,
        customType: input.type
      }
    };

    this.data.sections.push(section);
    this.ensureSectionLayout(input.page, section.id, nextOrder);
    await this.save();
    return section;
  }

  async removeSection(sectionId: string): Promise<void> {
    const section = this.data.sections.find((item) => item.id === sectionId);
    this.data.sections = this.data.sections.filter((section) => section.id !== sectionId);
    if (section) {
      delete this.data.moduleLayouts[section.page]?.sections?.[sectionId];
    }
    await this.save();
  }

  async setSectionEnabled(sectionId: string, enabled: boolean): Promise<void> {
    const section = this.data.sections.find((item) => item.id === sectionId);
    if (!section) return;
    section.enabled = enabled;
    await this.save();
  }

  async updateSection(sectionId: string, updates: Partial<DashboardSectionConfig>): Promise<void> {
    const section = this.data.sections.find((item) => item.id === sectionId);
    if (!section) return;
    Object.assign(section, updates);
    await this.save();
  }

  async updateSectionConfig(sectionId: string, updates: Record<string, unknown>): Promise<void> {
    const section = this.data.sections.find((item) => item.id === sectionId);
    if (!section) return;
    section.config = { ...section.config, ...updates };
    await this.save();
  }

  async moveSection(sectionId: string, direction: "up" | "down"): Promise<void> {
    const section = this.data.sections.find((item) => item.id === sectionId);
    if (!section) return;

    const pageSections = this.data.sections
      .filter((item) => item.page === section.page && item.enabled)
      .sort((left, right) => left.order - right.order);
    const currentIndex = pageSections.findIndex((item) => item.id === sectionId);
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    const target = pageSections[targetIndex];
    if (!target) return;

    const currentOrder = section.order;
    section.order = target.order;
    target.order = currentOrder;
    await this.save();
  }

  async reorderSections(page: DashboardPage, orderedIds: string[]): Promise<void> {
    const orderMap = new Map(orderedIds.map((id, index) => [id, (index + 1) * 10]));
    this.data.sections.forEach((section) => {
      const order = orderMap.get(section.id);
      if (section.page === page && order !== undefined) {
        section.order = order;
        this.ensureSectionLayout(page, section.id, order);
        const sectionLayout = this.data.moduleLayouts[page].sections?.[section.id];
        if (sectionLayout) sectionLayout.order = order;
      }
    });
    await this.save();
  }

  async setOverviewLayout(layout: WorkbenchData["userSettings"]["overviewLayout"]): Promise<void> {
    this.data.userSettings.overviewLayout = layout;
    this.data.moduleLayouts.overview = this.normalizeModuleLayout({ ...this.data.moduleLayouts.overview, mode: layout });
    await this.save();
  }

  async setModuleLayoutMode(page: DashboardPage, mode: ModuleLayoutMode): Promise<void> {
    this.data.moduleLayouts[page] = this.normalizeModuleLayout({
      ...this.getModuleLayout(page),
      mode
    });
    if (page === "overview" && mode !== "custom") {
      this.data.userSettings.overviewLayout = mode;
    }
    await this.save();
  }

  async updateModuleLayout(page: DashboardPage, updates: Partial<ModuleLayoutConfig>): Promise<void> {
    this.data.moduleLayouts[page] = this.normalizeModuleLayout({
      ...this.getModuleLayout(page),
      ...updates
    });
    await this.save();
  }

  async updateSectionLayout(page: DashboardPage, sectionId: string, updates: SectionLayoutConfig): Promise<void> {
    const section = this.data.sections.find((item) => item.id === sectionId && item.page === page);
    if (!section) return;
    this.ensureSectionLayout(page, sectionId, section.order);
    const layout = this.data.moduleLayouts[page];
    const sectionLayout = layout.sections?.[sectionId];
    if (!sectionLayout) return;
    Object.assign(sectionLayout, updates);
    this.data.moduleLayouts[page] = this.normalizeModuleLayout(layout);
    await this.save();
  }

  async moveSectionLayout(page: DashboardPage, sectionId: string, direction: "up" | "down"): Promise<void> {
    const layout = this.data.moduleLayouts[page];
    const pageSections = this.data.sections
      .filter((section) => section.page === page)
      .sort((left, right) => this.getSectionLayoutOrder(left, layout) - this.getSectionLayoutOrder(right, layout));
    const currentIndex = pageSections.findIndex((section) => section.id === sectionId);
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    const target = pageSections[targetIndex];
    const current = pageSections[currentIndex];
    if (!current || !target) return;
    this.ensureSectionLayout(page, current.id, current.order);
    this.ensureSectionLayout(page, target.id, target.order);
    const currentLayout = this.data.moduleLayouts[page].sections?.[current.id];
    const targetLayout = this.data.moduleLayouts[page].sections?.[target.id];
    if (!currentLayout || !targetLayout) return;
    const currentOrder = currentLayout.order ?? current.order;
    currentLayout.order = targetLayout.order ?? target.order;
    targetLayout.order = currentOrder;
    await this.save();
  }

  async updateUserSettings(settings: Partial<WorkbenchData["userSettings"]>): Promise<void> {
    this.data.userSettings = {
      ...this.data.userSettings,
      ...settings
    };
    await this.save();
  }

  async updateBanner(updates: Partial<WorkbenchData["banner"]>): Promise<void> {
    this.data.banner = { ...this.data.banner, ...updates };
    await this.save();
  }

  async updateSidebarAvatar(avatar: WorkbenchData["banner"]["sidebarAvatar"]): Promise<void> {
    this.data.banner.sidebarAvatar = avatar;
    await this.save();
  }

  async updateBannerAvatar(avatar: WorkbenchData["banner"]["bannerAvatar"]): Promise<void> {
    this.data.banner.bannerAvatar = avatar;
    await this.save();
  }

  async updateBannerMessage(message: string): Promise<void> {
    this.data.banner.message = message;
    await this.save();
  }

  async updateCalendarSettings(updates: Partial<WorkbenchData["calendarSettings"]>): Promise<void> {
    this.data.calendarSettings = { ...this.data.calendarSettings, ...updates };
    this.data.userSettings.weekStartsOn = this.data.calendarSettings.weekStartsOn;
    await this.save();
  }

  getCalendarTodos(date?: string): CalendarTodo[] {
    const todos = [...this.data.calendarTodos].sort((left, right) => left.createdAt.localeCompare(right.createdAt));
    return date ? todos.filter((todo) => todo.date === date) : todos;
  }

  async addCalendarTodo(title: string, date: string, category = "待办"): Promise<void> {
    this.data.calendarTodos.push({
      id: `calendar-todo-${Date.now()}`,
      title,
      date,
      completed: false,
      category,
      createdAt: new Date().toISOString()
    });
    await this.save();
  }

  async updateCalendarTodo(todoId: string, updates: Partial<CalendarTodo>): Promise<void> {
    const todo = this.data.calendarTodos.find((item) => item.id === todoId);
    if (!todo) return;
    Object.assign(todo, updates);
    await this.save();
  }

  async toggleCalendarTodo(todoId: string): Promise<void> {
    const todo = this.data.calendarTodos.find((item) => item.id === todoId);
    if (!todo) return;
    todo.completed = !todo.completed;
    await this.save();
  }

  async deleteCalendarTodo(todoId: string): Promise<void> {
    this.data.calendarTodos = this.data.calendarTodos.filter((todo) => todo.id !== todoId);
    await this.save();
  }

  async updateTheme(updates: Partial<ThemeSettings>): Promise<void> {
    this.data.theme = { ...this.data.theme, ...updates };
    await this.save();
  }

  async updateApexHabitSettings(updates: Partial<ApexHabitSettings>): Promise<void> {
    this.data.apexHabitSettings = { ...this.data.apexHabitSettings, ...updates };
    if (updates.showOnOverview !== undefined) {
      this.setSectionEnabledInMemory("overview-habit-overview", updates.showOnOverview);
    }
    if (updates.showStreak !== undefined) {
      this.setSectionEnabledInMemory("overview-checkin-streak", updates.showStreak);
    }
    if (updates.showWeeklyProgress !== undefined) {
      this.setSectionEnabledInMemory("overview-weekly-completion", updates.showWeeklyProgress);
    }
    await this.save();
  }

  async addCustomHabit(label: string): Promise<void> {
    const nextOrder = this.data.apexHabitSettings.customHabits.reduce((max, habit) => Math.max(max, habit.order), 0) + 10;
    const id = `habit-${Date.now()}`;
    this.data.apexHabitSettings.customHabits.push({
      id,
      label,
      enabled: true,
      order: nextOrder
    });
    this.data.checkInDefinitions.push({
      id,
      moduleId: "overview",
      title: label,
      icon: "sparkles",
      color: "#ff8fbc",
      enabled: true,
      order: nextOrder,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
    await this.save();
  }

  async updateCustomHabit(habitId: string, updates: Partial<WorkbenchData["apexHabitSettings"]["customHabits"][number]>): Promise<void> {
    const habit = this.data.apexHabitSettings.customHabits.find((item) => item.id === habitId);
    if (!habit) return;
    Object.assign(habit, updates);
    const definition = this.data.checkInDefinitions.find((item) => item.id === habitId || item.id === habitId.replace(/^custom-/, ""));
    if (definition) {
      if (updates.label !== undefined) definition.title = updates.label;
      if (updates.enabled !== undefined) definition.enabled = updates.enabled;
      if (updates.order !== undefined) definition.order = updates.order;
      definition.updatedAt = Date.now();
    }
    await this.save();
  }

  async deleteCustomHabit(habitId: string): Promise<void> {
    this.data.apexHabitSettings.customHabits = this.data.apexHabitSettings.customHabits.filter((item) => item.id !== habitId);
    const definition = this.data.checkInDefinitions.find((item) => item.id === habitId || item.id === habitId.replace(/^custom-/, ""));
    if (definition) {
      definition.archived = true;
      definition.enabled = false;
      definition.updatedAt = Date.now();
    }
    await this.save();
  }

  async reorderCustomHabits(orderedIds: string[]): Promise<void> {
    const orderMap = new Map(orderedIds.map((id, index) => [id, (index + 1) * 10]));
    this.data.apexHabitSettings.customHabits.forEach((habit) => {
      const order = orderMap.get(habit.id);
      if (order !== undefined) habit.order = order;
      const definition = this.data.checkInDefinitions.find((item) => item.id === habit.id || item.id === habit.id.replace(/^custom-/, ""));
      if (definition && order !== undefined) {
        definition.order = order;
        definition.updatedAt = Date.now();
      }
    });
    await this.save();
  }

  async updateQuickAction(actionId: string, updates: Partial<QuickActionConfig>): Promise<void> {
    const action = this.data.quickActions.find((item) => item.id === actionId);
    if (!action) return;
    Object.assign(action, updates);
    await this.save();
  }

  async addQuickAction(label: string, target: string): Promise<void> {
    const nextOrder = this.data.quickActions.reduce((max, action) => Math.max(max, action.order), 0) + 10;
    this.data.quickActions.push({
      id: `quick-${Date.now()}`,
      label,
      enabled: true,
      order: nextOrder,
      type: "custom",
      target
    });
    await this.save();
  }

  getFocusSettings(): FocusSettings {
    return this.data.focusSettings;
  }

  getFocusState(): FocusState {
    return this.resolveFocusState();
  }

  getFocusRecords(): FocusRecord[] {
    return [...this.data.focusRecords].sort((left, right) => right.createdAt.localeCompare(left.createdAt));
  }

  getTodayFocusRecords(): FocusRecord[] {
    const today = formatDateKey(new Date());
    return this.getFocusRecords().filter((record) => record.date === today);
  }

  async updateFocusSettings(updates: Partial<FocusSettings>): Promise<void> {
    this.data.focusSettings = {
      ...this.data.focusSettings,
      ...updates,
      focusDuration: Math.max(1, Math.round(updates.focusDuration ?? this.data.focusSettings.focusDuration)),
      breakDuration: Math.max(1, Math.round(updates.breakDuration ?? this.data.focusSettings.breakDuration))
    };
    if (!this.data.focusState.isRunning) {
      this.data.focusState.remainingSeconds = this.data.focusSettings.focusDuration * 60;
    }
    await this.save();
  }

  async startFocusSession(
    task = "",
    durationMinutes = this.data.focusSettings.focusDuration,
    background = this.data.focusSettings.defaultBackground ?? "pink",
    backgroundDataUrl?: string
  ): Promise<void> {
    const plannedDuration = Math.max(1, Math.round(durationMinutes));
    this.data.focusSettings.focusDuration = plannedDuration;
    this.data.focusSettings.defaultBackground = background;
    this.data.focusState = {
      isRunning: true,
      isPaused: false,
      mode: "focus",
      startedAt: new Date().toISOString(),
      remainingSeconds: plannedDuration * 60,
      currentTask: task.trim(),
      background,
      backgroundDataUrl,
      plannedDuration
    };
    await this.save();
  }

  async pauseFocusSession(): Promise<void> {
    const state = this.resolveFocusState();
    if (!state.isRunning || state.isPaused) return;
    this.data.focusState = {
      ...state,
      isPaused: true,
      pausedAt: new Date().toISOString(),
      startedAt: undefined
    };
    await this.save();
  }

  async resumeFocusSession(): Promise<void> {
    const state = this.resolveFocusState();
    if (!state.isRunning || !state.isPaused) return;
    this.data.focusState = {
      ...state,
      isPaused: false,
      pausedAt: undefined,
      startedAt: new Date().toISOString()
    };
    await this.save();
  }

  async endFocusSession(completed = false, saveRecord = true): Promise<void> {
    const state = this.resolveFocusState();
    if (saveRecord && state.mode === "focus") {
      this.pushFocusRecord(state, completed);
    }
    this.data.focusState = {
      isRunning: false,
      isPaused: false,
      mode: "focus",
      remainingSeconds: this.data.focusSettings.focusDuration * 60
    };
    await this.save();
  }

  async updateFocusRecord(recordId: string, updates: Partial<FocusRecord>): Promise<void> {
    const record = this.data.focusRecords.find((item) => item.id === recordId);
    if (!record) return;
    Object.assign(record, updates);
    record.duration = updates.actualDurationMinutes ?? updates.duration ?? record.actualDurationMinutes ?? record.duration;
    record.actualDurationMinutes = record.duration;
    record.plannedDuration = updates.plannedDurationMinutes ?? updates.plannedDuration ?? record.plannedDuration;
    record.plannedDurationMinutes = record.plannedDuration;
    await this.save();
  }

  async deleteFocusRecord(recordId: string): Promise<void> {
    this.data.focusRecords = this.data.focusRecords.filter((record) => record.id !== recordId);
    await this.save();
  }

  async completeCurrentFocusPhase(): Promise<void> {
    const state = this.resolveFocusState();
    if (state.mode === "focus") {
      this.pushFocusRecord(state, true);
      this.data.focusState = {
        isRunning: this.data.focusSettings.autoStartBreak,
        isPaused: !this.data.focusSettings.autoStartBreak,
        mode: "break",
        startedAt: this.data.focusSettings.autoStartBreak ? new Date().toISOString() : undefined,
        remainingSeconds: this.data.focusSettings.breakDuration * 60,
        currentTask: state.currentTask,
        background: state.background,
        backgroundDataUrl: state.backgroundDataUrl,
        plannedDuration: this.data.focusSettings.breakDuration
      };
    } else {
      this.data.focusState = {
        isRunning: this.data.focusSettings.autoStartNextFocus,
        isPaused: !this.data.focusSettings.autoStartNextFocus,
        mode: "focus",
        startedAt: this.data.focusSettings.autoStartNextFocus ? new Date().toISOString() : undefined,
        remainingSeconds: this.data.focusSettings.focusDuration * 60,
        currentTask: state.currentTask,
        background: state.background,
        backgroundDataUrl: state.backgroundDataUrl,
        plannedDuration: this.data.focusSettings.focusDuration
      };
    }
    await this.save();
  }

  getTodayFocusMinutes(): number {
    return this.getTodayFocusRecords().reduce((sum, record) => sum + record.duration, 0);
  }

  getTodayPomodoroCount(): number {
    return this.getTodayFocusRecords().filter((record) => record.completed).length;
  }

  private pushFocusRecord(state: FocusState, completed: boolean): void {
    const plannedDuration = state.plannedDuration ?? this.data.focusSettings.focusDuration;
    const elapsedMinutes = Math.max(0, Math.ceil(((plannedDuration * 60) - state.remainingSeconds) / 60));
    const actualDuration = completed ? plannedDuration : elapsedMinutes;
    if (actualDuration <= 0) return;
    const endedAt = new Date().toISOString();
    this.data.focusRecords.push({
      id: `focus-record-${Date.now()}`,
      date: formatDateKey(new Date()),
      task: state.currentTask?.trim() || "专注",
      duration: actualDuration,
      actualDurationMinutes: actualDuration,
      completed,
      createdAt: endedAt,
      startedAt: state.startedAt,
      endedAt,
      plannedDuration,
      plannedDurationMinutes: plannedDuration,
      background: state.background,
      backgroundDataUrl: state.backgroundDataUrl
    });
  }

  exportData(): string {
    return JSON.stringify(this.data, null, 2);
  }

  async importData(data: unknown): Promise<void> {
    this.data = this.mergeWithDefaults(data);
    await this.save();
  }

  async resetToDefaults(): Promise<void> {
    this.data = structuredClone(DEFAULT_DATA);
    await this.save();
  }

  getTodayFocusTasks(): TodayFocusTask[] {
    return this.data.todayFocusTasks;
  }

  async toggleTodayFocusTask(taskId: string): Promise<void> {
    const task = this.data.todayFocusTasks.find((item) => item.id === taskId);
    if (!task) {
      return;
    }

    task.completed = !task.completed;
    await this.save();
  }

  async addTodayFocusTask(label: string, category: TodayFocusTask["category"] = "个人", date = formatDateKey(new Date())): Promise<void> {
    this.data.todayFocusTasks.push({
      id: `focus-${Date.now()}`,
      label,
      category,
      completed: false,
      date
    });
    await this.save();
  }

  getTodayFocusTasksForDate(date = formatDateKey(new Date())): TodayFocusTask[] {
    return this.data.todayFocusTasks.filter((task) => (task.date ?? formatDateKey(new Date())) === date);
  }

  async updateTodayFocusTask(taskId: string, updates: Partial<TodayFocusTask>): Promise<void> {
    const task = this.data.todayFocusTasks.find((item) => item.id === taskId);
    if (!task) return;
    Object.assign(task, updates);
    await this.save();
  }

  async deleteTodayFocusTask(taskId: string): Promise<void> {
    this.data.todayFocusTasks = this.data.todayFocusTasks.filter((item) => item.id !== taskId);
    await this.save();
  }

  getResearchProjects(): ResearchProject[] {
    return this.data.researchProjects;
  }

  async addResearchProject(project: ResearchProject): Promise<void> {
    this.data.researchProjects.push(project);
    await this.save();
  }

  async updateResearchProject(projectId: string, updates: Partial<ResearchProject>): Promise<void> {
    const project = this.data.researchProjects.find((item) => item.id === projectId);
    if (!project) return;
    Object.assign(project, updates);
    await this.save();
  }

  async deleteResearchProject(projectId: string): Promise<void> {
    this.data.researchProjects = this.data.researchProjects.filter((item) => item.id !== projectId);
    this.data.researchPapers.forEach((paper) => {
      if (paper.researchProjectId === projectId) paper.researchProjectId = undefined;
    });
    this.data.experimentPlans.forEach((plan) => {
      if (plan.researchProjectId === projectId) plan.researchProjectId = undefined;
    });
    await this.save();
  }

  getResearchPapers(): ResearchPaper[] {
    return this.data.researchPapers;
  }

  async addResearchPaper(paper: ResearchPaper): Promise<void> {
    this.data.researchPapers.push(this.normalizeResearchPaper(paper));
    await this.save();
  }

  async updateResearchPaper(paperId: string, updates: Partial<ResearchPaper>): Promise<void> {
    const paper = this.data.researchPapers.find((item) => item.id === paperId);
    if (!paper) return;
    Object.assign(paper, updates);
    Object.assign(paper, this.normalizeResearchPaper(paper));
    await this.save();
  }

  async deleteResearchPaper(paperId: string): Promise<void> {
    this.data.researchPapers = this.data.researchPapers.filter((item) => item.id !== paperId);
    this.data.literatureNotes.forEach((note) => {
      if (note.paperReadingId === paperId) note.paperReadingId = undefined;
    });
    await this.save();
  }

  async deletePaperReading(paperId: string): Promise<void> {
    await this.deleteResearchPaper(paperId);
  }

  getLiteratureNotes(): LiteratureNote[] {
    return this.data.literatureNotes.filter((note) => note.notePath);
  }

  getLiteratureNotesForPaper(paperId: string): LiteratureNote[] {
    return this.getLiteratureNotes().filter((note) => note.paperReadingId === paperId);
  }

  async addLiteratureNote(note: LiteratureNote): Promise<void> {
    this.data.literatureNotes.push(this.normalizeLiteratureNote(note));
    await this.save();
  }

  async upsertLiteratureNote(note: LiteratureNote): Promise<void> {
    const existing = this.data.literatureNotes.find((item) => item.id === note.id)
      ?? this.data.literatureNotes.find((item) => item.paperReadingId === note.paperReadingId && item.notePath === note.notePath);
    if (existing) {
      Object.assign(existing, this.normalizeLiteratureNote({ ...existing, ...note, id: existing.id }));
    } else {
      this.data.literatureNotes.push(this.normalizeLiteratureNote(note));
    }
    await this.save();
  }

  async updateLiteratureNote(noteId: string, updates: Partial<LiteratureNote>): Promise<void> {
    const note = this.data.literatureNotes.find((item) => item.id === noteId);
    if (!note) return;
    Object.assign(note, updates, { updatedAt: Date.now() });
    Object.assign(note, this.normalizeLiteratureNote(note));
    await this.save();
  }

  async deleteLiteratureNote(noteId: string, options?: { clearPaperNotePath?: boolean }): Promise<void> {
    const note = this.data.literatureNotes.find((item) => item.id === noteId);
    if (note && options?.clearPaperNotePath) {
      this.data.researchPapers.forEach((paper) => {
        if (paper.notePath === note.notePath) paper.notePath = undefined;
      });
    }
    this.data.literatureNotes = this.data.literatureNotes.filter((item) => item.id !== noteId);
    await this.save();
  }

  async cleanupInvalidLiteratureNotes(validPaths: Set<string>): Promise<number> {
    const before = this.data.literatureNotes.length;
    this.data.literatureNotes = this.data.literatureNotes.filter((note) => validPaths.has(note.notePath));
    const removed = before - this.data.literatureNotes.length;
    if (removed > 0) await this.save();
    return removed;
  }

  async importZoteroPapers(items: ZoteroPaperImportInput[]): Promise<{ created: number; updated: number; skipped: number }> {
    let created = 0;
    let updated = 0;
    let skipped = 0;
    for (const item of items) {
      if (!item.title.trim()) {
        skipped += 1;
        continue;
      }
      const venueId = item.venue ? await this.ensurePaperVenue(item.venue) : undefined;
      const existing = this.findExistingZoteroPaper(item);
      if (existing) {
        Object.assign(existing, this.normalizeResearchPaper({
          ...existing,
          title: item.title,
          venue: item.venue ?? existing.venue,
          venueId: venueId ?? existing.venueId,
          year: item.year ?? existing.year,
          paperUrl: existing.paperUrl || item.paperUrl,
          doi: item.doi ?? existing.doi,
          citekey: item.citekey ?? existing.citekey,
          zoteroItemKey: item.zoteroItemKey ?? existing.zoteroItemKey,
          tagIds: existing.tagIds ?? [],
          updatedAt: Date.now()
        }));
        updated += 1;
      } else {
        this.data.researchPapers.push(this.normalizeResearchPaper({
          id: `paper-${Date.now()}-${created}`,
          title: item.title,
          venue: item.venue ?? "",
          venueId,
          year: item.year ?? new Date().getFullYear(),
          statusId: this.data.paperStatuses[0]?.id ?? "paper-status-unread",
          readingProgress: 0,
          paperUrl: item.paperUrl,
          doi: item.doi,
          readingStartDate: undefined,
          readingEndDate: undefined,
          tagIds: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
          zoteroItemKey: item.zoteroItemKey,
          citekey: item.citekey
        }));
        created += 1;
      }
    }
    await this.save();
    return { created, updated, skipped };
  }

  getPaperStatuses(): PaperStatusDefinition[] {
    return [...this.data.paperStatuses].sort((a, b) => a.order - b.order);
  }

  getPaperVenues(): VenueDefinition[] {
    return this.data.paperVenues;
  }

  getPaperTags(): PaperTagDefinition[] {
    return this.data.paperTags;
  }

  async addPaperStatus(status: PaperStatusDefinition): Promise<void> {
    this.data.paperStatuses.push(status);
    await this.save();
  }

  async updatePaperStatus(statusId: string, updates: Partial<PaperStatusDefinition>): Promise<void> {
    const status = this.data.paperStatuses.find((item) => item.id === statusId);
    if (!status) return;
    Object.assign(status, updates);
    await this.save();
  }

  async deletePaperStatus(statusId: string, migrateToStatusId?: string): Promise<boolean> {
    const inUse = this.data.researchPapers.some((paper) => paper.statusId === statusId);
    if (inUse && !migrateToStatusId) return false;
    if (inUse) {
      this.data.researchPapers.forEach((paper) => {
        if (paper.statusId === statusId) paper.statusId = migrateToStatusId;
      });
    }
    this.data.paperStatuses = this.data.paperStatuses.filter((item) => item.id !== statusId);
    await this.save();
    return true;
  }

  async addPaperVenue(venue: VenueDefinition): Promise<void> {
    this.data.paperVenues.push(venue);
    await this.save();
  }

  async updatePaperVenue(venueId: string, updates: Partial<VenueDefinition>): Promise<void> {
    const venue = this.data.paperVenues.find((item) => item.id === venueId);
    if (!venue) return;
    Object.assign(venue, updates);
    await this.save();
  }

  async deletePaperVenue(venueId: string, migrateToVenueId?: string): Promise<boolean> {
    const inUse = this.data.researchPapers.some((paper) => paper.venueId === venueId);
    if (inUse && !migrateToVenueId) return false;
    if (inUse) {
      this.data.researchPapers.forEach((paper) => {
        if (paper.venueId === venueId) paper.venueId = migrateToVenueId;
      });
    }
    this.data.paperVenues = this.data.paperVenues.filter((item) => item.id !== venueId);
    await this.save();
    return true;
  }

  async addPaperTag(tag: PaperTagDefinition): Promise<void> {
    this.data.paperTags.push(tag);
    await this.save();
  }

  async updatePaperTag(tagId: string, updates: Partial<PaperTagDefinition>): Promise<void> {
    const tag = this.data.paperTags.find((item) => item.id === tagId);
    if (!tag) return;
    Object.assign(tag, updates);
    await this.save();
  }

  async deletePaperTag(tagId: string): Promise<void> {
    this.data.paperTags = this.data.paperTags.filter((item) => item.id !== tagId);
    this.data.researchPapers.forEach((paper) => {
      paper.tagIds = (paper.tagIds ?? []).filter((id) => id !== tagId);
    });
    await this.save();
  }

  getExperimentPlans(): ExperimentPlan[] {
    return this.data.experimentPlans;
  }

  getExperimentRecords(): ExperimentPlan[] {
    return this.data.experimentRecords;
  }

  async addExperiment(mode: "plan" | "records", experiment: ExperimentPlan): Promise<void> {
    const items = mode === "plan" ? this.data.experimentPlans : this.data.experimentRecords;
    items.push(experiment);
    await this.save();
  }

  async updateExperiment(mode: "plan" | "records", experimentId: string, updates: Partial<ExperimentPlan>): Promise<void> {
    const items = mode === "plan" ? this.data.experimentPlans : this.data.experimentRecords;
    const experiment = items.find((item) => item.id === experimentId);
    if (!experiment) return;
    Object.assign(experiment, updates);
    await this.save();
  }

  async deleteExperiment(mode: "plan" | "records", experimentId: string): Promise<void> {
    if (mode === "plan") {
      this.data.experimentPlans = this.data.experimentPlans.filter((item) => item.id !== experimentId);
      this.data.experimentRecords.forEach((record) => {
        if (record.experimentPlanId === experimentId) record.experimentPlanId = undefined;
      });
    } else {
      this.data.experimentRecords = this.data.experimentRecords.filter((item) => item.id !== experimentId);
    }
    await this.save();
  }

  async migrateExperimentRecordsToPlan(fromPlanId: string, toPlanId: string | undefined): Promise<void> {
    this.data.experimentRecords.forEach((record) => {
      if (record.experimentPlanId === fromPlanId) record.experimentPlanId = toPlanId;
    });
    await this.save();
  }

  getResearchDeadlines(): ResearchDeadline[] {
    return this.data.researchDeadlines;
  }

  async addResearchDeadline(deadline: ResearchDeadline): Promise<void> {
    this.data.researchDeadlines.push(deadline);
    await this.save();
  }

  async updateResearchDeadline(deadlineId: string, updates: Partial<ResearchDeadline>): Promise<void> {
    const deadline = this.data.researchDeadlines.find((item) => item.id === deadlineId);
    if (!deadline) return;
    Object.assign(deadline, updates);
    await this.save();
  }

  async deleteResearchDeadline(deadlineId: string): Promise<void> {
    this.data.researchDeadlines = this.data.researchDeadlines.filter((item) => item.id !== deadlineId);
    await this.save();
  }

  getResearchMemos(): string[] {
    return this.data.researchMemos;
  }

  async addResearchMemo(memo: string): Promise<void> {
    this.data.researchMemos.push(memo);
    await this.save();
  }

  async updateResearchMemo(index: number, memo: string): Promise<void> {
    if (!this.data.researchMemos[index]) return;
    this.data.researchMemos[index] = memo;
    await this.save();
  }

  async deleteResearchMemo(index: number): Promise<void> {
    this.data.researchMemos.splice(index, 1);
    await this.save();
  }

  getDataAnalysisTasks(): DataAnalysisTask[] {
    return this.data.dataAnalysisTasks;
  }

  async addDataAnalysisTask(task: DataAnalysisTask): Promise<void> {
    this.data.dataAnalysisTasks.push(task);
    await this.save();
  }

  async updateDataAnalysisTask(taskId: string, updates: Partial<DataAnalysisTask>): Promise<void> {
    const task = this.data.dataAnalysisTasks.find((item) => item.id === taskId);
    if (!task) return;
    Object.assign(task, updates);
    await this.save();
  }

  async deleteDataAnalysisTask(taskId: string): Promise<void> {
    this.data.dataAnalysisTasks = this.data.dataAnalysisTasks.filter((item) => item.id !== taskId);
    await this.save();
  }

  getBooks(): BookItem[] {
    return this.data.books;
  }

  getReadingQuotes(): ReadingQuote[] {
    return this.data.readingQuotes;
  }

  getWantToReadItems(): WantToReadItem[] {
    return this.data.wantToReadItems;
  }

  getBookTags(): BookTagDefinition[] {
    return this.data.bookTags;
  }

  getReadingPlans(): ReadingPlan[] {
    return this.data.readingPlans.map((plan) => this.withComputedReadingPlanStatus(plan));
  }

  getReadingNotes(): ReadingNote[] {
    return this.data.readingNotes;
  }

  getReadingNotesForBook(bookId: string): ReadingNote[] {
    return this.data.readingNotes.filter((note) => note.bookId === bookId);
  }

  async addReadingNote(note: ReadingNote): Promise<void> {
    this.data.readingNotes.push(this.normalizeReadingNote(note));
    await this.save();
  }

  async updateReadingNote(noteId: string, updates: Partial<ReadingNote>): Promise<void> {
    const note = this.data.readingNotes.find((item) => item.id === noteId);
    if (!note) return;
    Object.assign(note, updates, { updatedAt: new Date().toISOString() });
    Object.assign(note, this.normalizeReadingNote(note));
    await this.save();
  }

  async deleteReadingNote(noteId: string): Promise<void> {
    this.data.readingNotes = this.data.readingNotes.filter((item) => item.id !== noteId);
    await this.save();
  }

  async addReadingPlan(plan: ReadingPlan): Promise<void> {
    const normalized = this.normalizeReadingPlan(plan);
    this.data.readingPlans.push(normalized);
    await this.save();
  }

  async updateReadingPlan(planId: string, updates: Partial<ReadingPlan>): Promise<void> {
    const plan = this.data.readingPlans.find((item) => item.id === planId);
    if (!plan) return;
    Object.assign(plan, updates, { updatedAt: new Date().toISOString() });
    Object.assign(plan, this.normalizeReadingPlan(plan));
    await this.save();
  }

  async deleteReadingPlan(planId: string): Promise<void> {
    this.data.readingPlans = this.data.readingPlans.filter((item) => item.id !== planId);
    await this.save();
  }

  async completeReadingPlan(planId: string): Promise<void> {
    const plan = this.data.readingPlans.find((item) => item.id === planId);
    if (!plan) return;
    const now = new Date().toISOString();
    Object.assign(plan, { status: "completed" as const, progress: 100, completedDate: formatDateKey(new Date()), completedAt: now, updatedAt: now });
    await this.save();
  }

  shouldShowActiveReadingPlan(plan: ReadingPlan, dateKey = formatDateKey(new Date())): boolean {
    const completedDate = plan.completedDate ?? plan.completedAt?.slice(0, 10);
    return !completedDate || completedDate >= dateKey;
  }

  async addReadingQuote(quote: ReadingQuote): Promise<void> {
    this.data.readingQuotes.push(this.normalizeReadingQuote(quote));
    await this.save();
  }

  async updateReadingQuote(quoteId: string, updates: Partial<ReadingQuote>): Promise<void> {
    const quote = this.data.readingQuotes.find((item) => item.id === quoteId);
    if (!quote) return;
    Object.assign(quote, updates);
    Object.assign(quote, this.normalizeReadingQuote(quote));
    await this.save();
  }

  async deleteReadingQuote(quoteId: string): Promise<void> {
    this.data.readingQuotes = this.data.readingQuotes.filter((item) => item.id !== quoteId);
    await this.save();
  }

  async addWantToReadItem(item: WantToReadItem): Promise<void> {
    this.data.wantToReadItems.push(this.normalizeWantToReadItem(item));
    await this.save();
  }

  async updateWantToReadItem(itemId: string, updates: Partial<WantToReadItem>): Promise<void> {
    const item = this.data.wantToReadItems.find((entry) => entry.id === itemId);
    if (!item) return;
    Object.assign(item, updates, { updatedAt: new Date().toISOString() });
    Object.assign(item, this.normalizeWantToReadItem(item));
    await this.save();
  }

  async deleteWantToReadItem(itemId: string): Promise<void> {
    this.data.wantToReadItems = this.data.wantToReadItems.filter((item) => item.id !== itemId);
    await this.save();
  }

  async addBookTag(tag: BookTagDefinition): Promise<void> {
    this.data.bookTags.push(this.normalizeBookTag(tag, this.data.bookTags.length));
    await this.save();
  }

  async updateBookTag(tagId: string, updates: Partial<BookTagDefinition>): Promise<void> {
    const tag = this.data.bookTags.find((item) => item.id === tagId);
    if (!tag) return;
    Object.assign(tag, updates);
    Object.assign(tag, this.normalizeBookTag(tag, this.data.bookTags.indexOf(tag)));
    this.syncLegacyBookTags();
    await this.save();
  }

  async deleteBookTag(tagId: string): Promise<void> {
    this.data.bookTags = this.data.bookTags.filter((tag) => tag.id !== tagId);
    this.data.books.forEach((book) => {
      book.tagIds = (book.tagIds ?? []).filter((id) => id !== tagId);
    });
    this.syncLegacyBookTags();
    await this.save();
  }

  async addBook(book: BookItem): Promise<void> {
    this.data.books.push(this.normalizeBook(book));
    await this.save();
  }

  async updateBook(bookId: string, updates: Partial<BookItem>): Promise<void> {
    const book = this.data.books.find((item) => item.id === bookId);
    if (!book) return;
    Object.assign(book, updates);
    Object.assign(book, this.normalizeBook(book));
    await this.save();
  }

  async deleteBook(bookId: string): Promise<void> {
    this.data.books = this.data.books.filter((item) => item.id !== bookId);
    await this.save();
  }

  async updateBookPage(bookId: string, currentPage: number): Promise<void> {
    const book = this.data.books.find((item) => item.id === bookId);
    if (!book) {
      return;
    }

    book.currentPage = Math.max(0, Math.min(currentPage, book.totalPages));
    if (book.currentPage > 0 && book.readingStatus === "want-to-read") {
      book.readingStatus = "reading";
      book.status = "在读";
      book.startDate = book.startDate || formatDateKey(new Date());
    }
    await this.save();
  }

  async completeBook(bookId: string): Promise<void> {
    const book = this.data.books.find((item) => item.id === bookId);
    if (!book) {
      return;
    }

    book.status = "已读";
    book.readingStatus = "finished";
    book.currentPage = book.totalPages;
    book.finishDate = formatDateKey(new Date());
    book.startDate = book.startDate || book.finishDate;
    await this.save();
  }

  async updateBookReadingStatus(bookId: string, readingStatus: BookItem["readingStatus"]): Promise<void> {
    const book = this.data.books.find((item) => item.id === bookId);
    if (!book || !readingStatus) return;
    book.readingStatus = readingStatus;
    book.status = this.legacyBookStatus(readingStatus);
    if (readingStatus === "reading") book.startDate = book.startDate || formatDateKey(new Date());
    if (readingStatus === "finished") {
      book.currentPage = book.totalPages;
      book.startDate = book.startDate || formatDateKey(new Date());
      book.finishDate = book.finishDate || formatDateKey(new Date());
    }
    await this.save();
  }

  async updateBookShelfStatus(bookId: string, shelfStatus: BookItem["shelfStatus"]): Promise<void> {
    const book = this.data.books.find((item) => item.id === bookId);
    if (!book || !shelfStatus) return;
    book.shelfStatus = shelfStatus;
    await this.save();
  }

  getWorkouts(): Workout[] {
    return this.data.workouts.map((workout) => this.normalizeWorkout(workout));
  }

  async addWorkout(workout: Workout): Promise<void> {
    this.data.workouts.push(this.normalizeWorkout(workout));
    this.data.workouts.sort((left, right) => right.date.localeCompare(left.date));
    await this.save();
  }

  async updateWorkout(workoutId: string, updates: Partial<Workout>): Promise<void> {
    const workout = this.data.workouts.find((item) => item.id === workoutId);
    if (!workout) return;
    Object.assign(workout, updates, { updatedAt: nowIso() });
    Object.assign(workout, this.normalizeWorkout(workout));
    this.data.workouts.sort((left, right) => right.date.localeCompare(left.date));
    await this.save();
  }

  async deleteWorkout(workoutId: string): Promise<void> {
    this.data.workouts = this.data.workouts.filter((item) => item.id !== workoutId);
    await this.save();
  }

  getTrainingPlans(): TrainingPlan[] {
    return this.data.trainingPlans.map((plan) => this.withComputedTrainingPlanStatus(plan));
  }

  async addTrainingPlan(plan: TrainingPlan): Promise<void> {
    this.data.trainingPlans.push(this.normalizeTrainingPlan(plan));
    await this.save();
  }

  async updateTrainingPlan(planId: string, updates: Partial<TrainingPlan>): Promise<void> {
    const plan = this.data.trainingPlans.find((item) => item.id === planId);
    if (!plan) return;
    Object.assign(plan, updates, { updatedAt: nowIso() });
    Object.assign(plan, this.normalizeTrainingPlan(plan));
    await this.save();
  }

  async completeTrainingPlan(planId: string): Promise<void> {
    const plan = this.data.trainingPlans.find((item) => item.id === planId);
    if (!plan) return;
    Object.assign(plan, { status: "completed" as const, completedDate: todayKey(), updatedAt: nowIso() });
    await this.save();
  }

  async deleteTrainingPlan(planId: string): Promise<void> {
    this.data.trainingPlans = this.data.trainingPlans.filter((item) => item.id !== planId);
    this.data.workouts.forEach((workout) => {
      if (workout.trainingPlanId === planId) workout.trainingPlanId = undefined;
    });
    await this.save();
  }

  getBodyMeasurements(): BodyMeasurement[] {
    return this.data.bodyMeasurements;
  }

  async addBodyMeasurement(measurement: BodyMeasurement): Promise<void> {
    const timestamp = nowIso();
    this.data.bodyMeasurements.push({
      ...measurement,
      id: measurement.id ?? `measure-${Date.now()}`,
      createdAt: measurement.createdAt ?? timestamp,
      updatedAt: timestamp
    });
    this.data.bodyMeasurements.sort((left, right) => left.date.localeCompare(right.date));
    await this.save();
  }

  async updateBodyMeasurement(measurementId: string, updates: Partial<BodyMeasurement>): Promise<void> {
    const measurement = this.data.bodyMeasurements.find((item) => (item.id ?? item.date) === measurementId);
    if (!measurement) return;
    Object.assign(measurement, updates, { updatedAt: nowIso() });
    await this.save();
  }

  async upsertBodyMeasurementForDate(measurement: BodyMeasurement): Promise<void> {
    const existing = this.data.bodyMeasurements.find((item) => item.date === measurement.date);
    if (existing) {
      await this.updateBodyMeasurement(existing.id ?? existing.date, measurement);
      return;
    }
    await this.addBodyMeasurement(measurement);
  }

  async deleteBodyMeasurement(measurementId: string): Promise<void> {
    this.data.bodyMeasurements = this.data.bodyMeasurements.filter((item) => (item.id ?? item.date) !== measurementId);
    await this.save();
  }

  getFitnessDailyRecord(date = formatDateKey(new Date())): FitnessDailyRecord {
    const record = this.data.fitnessDailyRecords.find((item) => item.date === date);
    return record ?? { date, waterCups: 0, waterGoal: 8, waterNote: "", sleepHours: 0, sleepGoal: 8, bedtime: "", wakeTime: "", sleepNote: "" };
  }

  async updateFitnessDailyRecord(date: string, updates: Partial<FitnessDailyRecord>): Promise<void> {
    let record = this.data.fitnessDailyRecords.find((item) => item.date === date);
    if (!record) {
      record = this.getFitnessDailyRecord(date);
      this.data.fitnessDailyRecords.push(record);
    }
    Object.assign(record, updates, { date, updatedAt: nowIso() });
    await this.save();
  }

  getFitnessHabitDefinitions(): FitnessHabitDefinition[] {
    return [...this.data.fitnessHabitDefinitions].sort((left, right) => left.order - right.order);
  }

  getFitnessHabitRecords(date?: string): FitnessHabitRecord[] {
    return date ? this.data.fitnessHabitRecords.filter((item) => item.date === date) : this.data.fitnessHabitRecords;
  }

  async addFitnessHabitDefinition(definition: Omit<FitnessHabitDefinition, "id" | "order" | "createdAt" | "updatedAt">): Promise<void> {
    const timestamp = nowIso();
    const maxOrder = Math.max(0, ...this.data.fitnessHabitDefinitions.map((item) => item.order));
    this.data.fitnessHabitDefinitions.push({
      ...definition,
      id: `fitness-habit-${Date.now()}`,
      order: maxOrder + 10,
      createdAt: timestamp,
      updatedAt: timestamp
    });
    await this.save();
  }

  async updateFitnessHabitDefinition(definitionId: string, updates: Partial<FitnessHabitDefinition>): Promise<void> {
    const definition = this.data.fitnessHabitDefinitions.find((item) => item.id === definitionId);
    if (!definition) return;
    Object.assign(definition, updates, { updatedAt: nowIso() });
    await this.save();
  }

  async deleteFitnessHabitDefinition(definitionId: string): Promise<void> {
    this.data.fitnessHabitDefinitions = this.data.fitnessHabitDefinitions.filter((item) => item.id !== definitionId);
    this.data.fitnessHabitRecords = this.data.fitnessHabitRecords.filter((item) => item.habitId !== definitionId);
    await this.save();
  }

  async moveFitnessHabitDefinition(definitionId: string, direction: -1 | 1): Promise<void> {
    const definitions = this.getFitnessHabitDefinitions();
    const index = definitions.findIndex((item) => item.id === definitionId);
    const nextIndex = index + direction;
    if (index < 0 || nextIndex < 0 || nextIndex >= definitions.length) return;
    const currentOrder = definitions[index].order;
    definitions[index].order = definitions[nextIndex].order;
    definitions[nextIndex].order = currentOrder;
    await this.save();
  }

  async updateFitnessHabitRecord(date: string, habitId: string, updates: Partial<FitnessHabitRecord>): Promise<void> {
    let record = this.data.fitnessHabitRecords.find((item) => item.date === date && item.habitId === habitId);
    if (!record) {
      record = { date, habitId, actualValue: 0, note: "", updatedAt: nowIso() };
      this.data.fitnessHabitRecords.push(record);
    }
    Object.assign(record, updates, { date, habitId, updatedAt: nowIso() });
    await this.save();
  }

  getFitnessGoals(): FitnessGoal[] {
    return this.data.fitnessGoals;
  }

  async addFitnessGoal(goal: FitnessGoal): Promise<void> {
    const timestamp = nowIso();
    this.data.fitnessGoals.push({
      ...goal,
      currentValue: goal.currentValue ?? goal.current ?? 0,
      targetValue: goal.targetValue ?? goal.target ?? 0,
      startDate: goal.startDate ?? todayKey(),
      status: goal.status ?? "active",
      createdAt: goal.createdAt ?? timestamp,
      updatedAt: timestamp
    });
    await this.save();
  }

  async updateFitnessGoal(goalId: string, updates: Partial<FitnessGoal>): Promise<void> {
    const goal = this.data.fitnessGoals.find((item) => item.id === goalId);
    if (!goal) return;
    Object.assign(goal, updates, { updatedAt: nowIso() });
    await this.save();
  }

  async completeFitnessGoal(goalId: string): Promise<void> {
    const goal = this.data.fitnessGoals.find((item) => item.id === goalId);
    if (!goal) return;
    Object.assign(goal, {
      status: "completed" as const,
      completedDate: todayKey(),
      currentValue: goal.targetValue ?? goal.target ?? goal.currentValue ?? goal.current ?? 0,
      updatedAt: nowIso()
    });
    await this.save();
  }

  async deleteFitnessGoal(goalId: string): Promise<void> {
    this.data.fitnessGoals = this.data.fitnessGoals.filter((item) => item.id !== goalId);
    this.data.trainingPlans.forEach((plan) => {
      if (plan.fitnessGoalId === goalId) plan.fitnessGoalId = undefined;
    });
    this.data.workouts.forEach((workout) => {
      if (workout.fitnessGoalId === goalId) workout.fitnessGoalId = undefined;
    });
    await this.save();
  }

  getHealthReminders(): HealthReminder[] {
    return this.data.healthReminders;
  }

  async addHealthReminder(reminder: HealthReminder | string): Promise<void> {
    const timestamp = nowIso();
    const reminderData: Partial<HealthReminder> & { title: string } = typeof reminder === "string"
      ? { title: reminder }
      : reminder;
    this.data.healthReminders.push({
      id: reminderData.id ?? `health-${Date.now()}`,
      title: reminderData.title,
      date: reminderData.date ?? todayKey(),
      time: reminderData.time ?? "09:00",
      repeatType: reminderData.repeatType ?? "once",
      repeatDays: reminderData.repeatDays ?? [],
      note: reminderData.note ?? "",
      enabled: reminderData.enabled ?? true,
      createdAt: reminderData.createdAt ?? timestamp,
      updatedAt: timestamp
    });
    await this.save();
  }

  async updateHealthReminder(reminderId: string, updates: Partial<HealthReminder> | string): Promise<void> {
    const reminder = this.data.healthReminders.find((item) => item.id === reminderId);
    if (!reminder) return;
    if (typeof updates === "string") {
      reminder.title = updates;
    } else {
      Object.assign(reminder, updates);
    }
    reminder.updatedAt = nowIso();
    await this.save();
  }

  async deleteHealthReminder(reminderId: string): Promise<void> {
    this.data.healthReminders = this.data.healthReminders.filter((item) => item.id !== reminderId);
    await this.save();
  }

  getHealthReminderLogs(): HealthReminderLog[] {
    return this.data.healthReminderLogs;
  }

  async addHealthReminderLog(log: HealthReminderLog): Promise<void> {
    if (this.data.healthReminderLogs.some((item) => item.id === log.id)) return;
    this.data.healthReminderLogs.push(log);
    await this.save();
  }

  async updateHealthReminderLog(logId: string, updates: Partial<HealthReminderLog>): Promise<void> {
    const log = this.data.healthReminderLogs.find((item) => item.id === logId);
    if (!log) return;
    Object.assign(log, updates);
    await this.save();
  }

  getTransactions(): Transaction[] {
    return this.data.transactions.filter((transaction) => !this.isBudgetAdjustmentTransaction(transaction));
  }

  async updateTransaction(transactionId: string, updates: Partial<Transaction>): Promise<void> {
    const transaction = this.data.transactions.find((item) => item.id === transactionId);
    if (!transaction) return;
    Object.assign(transaction, updates);
    this.recalculateBudgetSpent();
    await this.save();
  }

  async deleteTransaction(transactionId: string): Promise<void> {
    this.data.transactions = this.data.transactions.filter((item) => item.id !== transactionId);
    this.recalculateBudgetSpent();
    await this.save();
  }

  getBudgets(): Budget[] {
    return this.data.budgets.filter((budget) => budget.role !== "monthly-limit");
  }

  getMonthlyBudgetLimit(period = currentMonthKey()): number {
    const monthly = this.data.budgets.find((budget) => budget.role === "monthly-limit" && budget.period === period);
    if (monthly) return monthly.amount;
    return this.getBudgets().reduce((sum, budget) => sum + budget.amount, 0);
  }

  async setMonthlyBudgetLimit(amount: number, period = currentMonthKey()): Promise<void> {
    let budget = this.data.budgets.find((item) => item.role === "monthly-limit" && item.period === period);
    if (!budget) {
      budget = { id: `budget-limit-${period}`, category: "月预算", amount: 0, spent: 0, role: "monthly-limit", period };
      this.data.budgets.unshift(budget);
    }
    budget.amount = Math.max(0, amount);
    await this.save();
  }

  async addBudget(budget: Budget): Promise<void> {
    this.data.budgets.push(budget);
    this.recalculateBudgetSpent();
    await this.save();
  }

  async updateBudget(budgetId: string, updates: Partial<Budget>): Promise<void> {
    const budget = this.data.budgets.find((item) => item.id === budgetId);
    if (!budget) return;
    Object.assign(budget, updates);
    this.recalculateBudgetSpent();
    await this.save();
  }

  async deleteBudget(budgetId: string): Promise<boolean> {
    const budget = this.data.budgets.find((item) => item.id === budgetId);
    if (!budget) return false;
    if (this.data.transactions.some((transaction) => transaction.category === budget.category)) {
      return false;
    }
    this.data.budgets = this.data.budgets.filter((item) => item.id !== budgetId);
    await this.save();
    return true;
  }

  getAccounts(): Account[] {
    return this.data.accounts;
  }

  getTotalAssets(): number {
    return this.data.accounts.reduce((sum, account) => sum + account.balance, 0);
  }

  async addAccount(account: Account): Promise<void> {
    this.data.accounts.push(this.normalizeAccount(account));
    await this.save();
  }

  async updateAccount(accountId: string, updates: Partial<Account>): Promise<void> {
    const account = this.data.accounts.find((item) => item.id === accountId);
    if (!account) return;
    Object.assign(account, updates);
    Object.assign(account, this.normalizeAccount(account));
    await this.save();
  }

  async deleteAccount(accountId: string): Promise<void> {
    this.data.accounts = this.data.accounts.filter((item) => item.id !== accountId);
    this.data.transactions.forEach((transaction) => {
      if (transaction.accountId === accountId) transaction.accountId = undefined;
    });
    await this.save();
  }

  getInvestmentWatchItems(): InvestmentWatchItem[] {
    return this.data.investmentWatchItems;
  }

  async addInvestmentWatchItem(item: InvestmentWatchItem): Promise<void> {
    this.data.investmentWatchItems.push(item);
    await this.addInvestmentSnapshot({
      id: `snapshot-${item.id}-${Date.now()}`,
      investmentId: item.id,
      date: todayKey(),
      price: item.price,
      changePercent: item.changePercent,
      note: item.note ?? "",
      createdAt: nowIso()
    }, false);
    await this.save();
  }

  async updateInvestmentWatchItem(itemId: string, updates: Partial<InvestmentWatchItem>): Promise<void> {
    const item = this.data.investmentWatchItems.find((entry) => entry.id === itemId);
    if (!item) return;
    Object.assign(item, updates);
    await this.addInvestmentSnapshot({
      id: `snapshot-${item.id}-${Date.now()}`,
      investmentId: item.id,
      date: todayKey(),
      price: item.price,
      changePercent: item.changePercent,
      note: item.note ?? "",
      createdAt: nowIso()
    }, false);
    await this.save();
  }

  async deleteInvestmentWatchItem(itemId: string): Promise<void> {
    this.data.investmentWatchItems = this.data.investmentWatchItems.filter((item) => item.id !== itemId);
    await this.save();
  }

  getInvestmentSnapshots(): InvestmentSnapshot[] {
    return this.data.investmentSnapshots;
  }

  async addInvestmentSnapshot(snapshot: InvestmentSnapshot, save = true): Promise<void> {
    this.data.investmentSnapshots.push(snapshot);
    if (save) {
      await this.save();
    }
  }

  getSavingGoals(): SavingGoal[] {
    return this.data.savingGoals;
  }

  async addSavingGoal(goal: SavingGoal): Promise<void> {
    this.data.savingGoals.push(goal);
    await this.save();
  }

  async updateSavingGoal(goalId: string, updates: Partial<SavingGoal>): Promise<void> {
    const goal = this.data.savingGoals.find((item) => item.id === goalId);
    if (!goal) return;
    Object.assign(goal, updates);
    await this.save();
  }

  async deleteSavingGoal(goalId: string): Promise<void> {
    this.data.savingGoals = this.data.savingGoals.filter((item) => item.id !== goalId);
    await this.save();
  }

  getBills(): Bill[] {
    return this.data.bills;
  }

  async addBill(bill: Bill): Promise<void> {
    this.data.bills.push(bill);
    await this.save();
  }

  async updateBill(billId: string, updates: Partial<Bill>): Promise<void> {
    const bill = this.data.bills.find((item) => item.id === billId);
    if (!bill) return;
    Object.assign(bill, updates);
    await this.save();
  }

  async deleteBill(billId: string): Promise<void> {
    this.data.bills = this.data.bills.filter((item) => item.id !== billId);
    await this.save();
  }

  getFinanceTodos(): FinanceTodo[] {
    return this.data.financeTodos;
  }

  async addFinanceTodo(todo: string | FinanceTodo): Promise<void> {
    const timestamp = nowIso();
    const values: Partial<FinanceTodo> & { title: string } = typeof todo === "string" ? { title: todo } : todo;
    this.data.financeTodos.push({
      id: values.id ?? `finance-todo-${Date.now()}`,
      title: values.title,
      completed: values.completed ?? false,
      date: values.date ?? todayKey(),
      note: values.note ?? "",
      createdAt: values.createdAt ?? timestamp,
      updatedAt: timestamp
    });
    await this.save();
  }

  async updateFinanceTodo(todoId: string, updates: Partial<FinanceTodo>): Promise<void> {
    const todo = this.data.financeTodos.find((item) => item.id === todoId);
    if (!todo) return;
    Object.assign(todo, updates, { updatedAt: nowIso() });
    await this.save();
  }

  async deleteFinanceTodo(todoId: string): Promise<void> {
    this.data.financeTodos = this.data.financeTodos.filter((item) => item.id !== todoId);
    await this.save();
  }

  getTasks(): Task[] {
    this.generateDueRecurringTasks(false);
    return this.data.tasks.map((task) => this.normalizeTask(task));
  }

  async addTask(task: Partial<Task> & { title: string }): Promise<Task> {
    const normalized = this.normalizeTask({ ...task, id: task.id ?? `task-${Date.now()}` } as Task);
    this.data.tasks.push(normalized);
    await this.save();
    return normalized;
  }

  async updateTask(taskId: string, updates: Partial<Task>): Promise<void> {
    const task = this.data.tasks.find((item) => item.id === taskId);
    if (!task) return;
    const nextStatus = updates.status;
    Object.assign(task, updates, { updatedAt: nowIso() });
    if (nextStatus === "done") task.completedDate = task.completedDate ?? todayKey();
    if (nextStatus && nextStatus !== "done") task.completedDate = undefined;
    Object.assign(task, this.normalizeTask(task));
    await this.save();
  }

  async deleteTask(taskId: string, mode: "delete-children" | "keep-children" = "keep-children"): Promise<void> {
    const childIds = this.data.tasks.filter((task) => task.parentTaskId === taskId).map((task) => task.id);
    this.data.tasks = this.data.tasks.filter((task) => task.id !== taskId && (mode === "delete-children" ? !childIds.includes(task.id) : true));
    if (mode === "keep-children") {
      this.data.tasks.forEach((task) => {
        if (task.parentTaskId === taskId) task.parentTaskId = undefined;
      });
    }
    await this.save();
  }

  getTaskProjects(): TaskProject[] {
    return this.data.taskProjects.map((project) => this.normalizeTaskProject(project));
  }

  async addTaskProject(project: Partial<TaskProject> & { name: string }): Promise<TaskProject> {
    const normalized = this.normalizeTaskProject({ ...project, id: project.id ?? `task-project-${Date.now()}` } as TaskProject);
    this.data.taskProjects.push(normalized);
    await this.save();
    return normalized;
  }

  async updateTaskProject(projectId: string, updates: Partial<TaskProject>): Promise<void> {
    const project = this.data.taskProjects.find((item) => item.id === projectId);
    if (!project) return;
    Object.assign(project, updates);
    Object.assign(project, this.normalizeTaskProject(project));
    await this.save();
  }

  async deleteTaskProject(projectId: string): Promise<void> {
    this.data.taskProjects = this.data.taskProjects.filter((project) => project.id !== projectId);
    this.data.tasks.forEach((task) => {
      if (task.projectId === projectId) task.projectId = undefined;
    });
    await this.save();
  }

  async updateTaskSettings(updates: Partial<TaskSettings>): Promise<void> {
    this.data.taskSettings = { ...this.data.taskSettings, ...updates };
    await this.save();
  }

  getTaskSettings(): TaskSettings {
    return { ...this.data.taskSettings };
  }

  async generateDueRecurringTasks(save = true): Promise<void> {
    const today = todayKey();
    let changed = false;
    this.data.tasks.forEach((task) => {
      if (!task.recurrence?.enabled || task.recurrence.frequency === "none") return;
      const nextDate = task.recurrence.nextDate ?? task.plannedDate;
      if (!nextDate || nextDate > today || task.recurrence.lastGeneratedDate === nextDate) return;
      const generatedId = `task-rec-${task.id}-${nextDate}`;
      if (!this.data.tasks.some((item) => item.id === generatedId)) {
        this.data.tasks.push(this.normalizeTask({
          ...task,
          id: generatedId,
          status: "todo",
          plannedDate: nextDate,
          completedDate: undefined,
          parentTaskId: undefined,
          recurrence: { frequency: "none", enabled: false },
          createdAt: nowIso(),
          updatedAt: nowIso()
        }));
      }
      task.recurrence.lastGeneratedDate = nextDate;
      task.recurrence.nextDate = this.nextRecurrenceDate(nextDate, task.recurrence.frequency, task.recurrence.interval);
      task.updatedAt = nowIso();
      changed = true;
    });
    if (changed && save) await this.save();
  }

  getGoals(): Goal[] {
    return this.data.goals;
  }

  getObjectives(): Objective[] {
    return this.data.objectives;
  }

  async addObjective(objective: Objective): Promise<void> {
    this.data.objectives.push(this.normalizeObjective(objective));
    await this.save();
  }

  async updateObjective(objectiveId: string, updates: Partial<Objective>): Promise<void> {
    const objective = this.data.objectives.find((item) => item.id === objectiveId);
    if (!objective) return;
    Object.assign(objective, updates, { updatedAt: Date.now() });
    const period = this.parseObjectivePeriod(objective);
    objective.year = period.year;
    objective.quarterNumber = period.quarterNumber;
    objective.quarter = `${period.year} Q${period.quarterNumber}`;
    objective.progress = Math.max(0, Math.min(100, objective.progress));
    if (objective.progress >= 100) {
      objective.completedDate = objective.completedDate ?? formatDateKey(new Date());
    } else {
      objective.completedDate = undefined;
    }
    await this.save();
  }

  async deleteObjective(objectiveId: string): Promise<void> {
    this.data.objectives = this.data.objectives.filter((item) => item.id !== objectiveId);
    this.data.keyResults = this.data.keyResults.filter((item) => item.objectiveId !== objectiveId);
    await this.save();
  }

  getKeyResults(): KeyResult[] {
    return this.data.keyResults;
  }

  getMilestones(): Milestone[] {
    return this.data.milestones;
  }

  getGoalActions(): GoalAction[] {
    return this.data.goalActions.map((action) => this.withGoalActionComputedState(action));
  }

  getGoalActionsForGoal(goalId: string): GoalAction[] {
    return this.getGoalActions().filter((action) => action.goalId === goalId);
  }

  getRisks(): Risk[] {
    return this.data.risks;
  }

  getReviewItems(): ReviewItem[] {
    return this.data.reviewItems;
  }

  async addReviewItem(item: ReviewItem): Promise<void> {
    this.data.reviewItems.push(this.normalizeReviewItem(item));
    await this.save();
  }

  async updateReviewItem(itemId: string, updates: Partial<ReviewItem>): Promise<void> {
    const item = this.data.reviewItems.find((review) => review.id === itemId);
    if (!item) return;
    Object.assign(item, updates, { updatedAt: new Date().toISOString() });
    Object.assign(item, this.normalizeReviewItem(item));
    await this.save();
  }

  async deleteReviewItem(itemId: string): Promise<void> {
    this.data.reviewItems = this.data.reviewItems.filter((item) => item.id !== itemId);
    await this.save();
  }

  async addGoal(goal: Goal): Promise<void> {
    this.data.goals.push(goal);
    await this.save();
  }

  async deleteGoal(goalId: string): Promise<void> {
    this.data.goals = this.data.goals.filter((item) => item.id !== goalId);
    this.data.milestones = this.data.milestones.filter((item) => item.goalId !== goalId);
    this.data.goalActions = this.data.goalActions.filter((item) => item.goalId !== goalId);
    await this.save();
  }

  async updateGoal(goalId: string, updates: Partial<Goal>): Promise<void> {
    const goal = this.data.goals.find((item) => item.id === goalId);
    if (!goal) {
      return;
    }
    Object.assign(goal, updates);
    goal.progress = Math.max(0, Math.min(100, goal.progress));
    if (updates.progress !== undefined && goal.progress < 100 && updates.status === undefined) {
      goal.status = "进行中";
      goal.completedDate = undefined;
    } else if (goal.progress >= 100 || goal.status === "已完成") {
      goal.status = "已完成";
      goal.progress = 100;
      goal.completedDate = goal.completedDate ?? formatDateKey(new Date());
    } else {
      goal.completedDate = undefined;
    }
    goal.updatedAt = Date.now();
    await this.save();
  }

  async updateGoalProgress(goalId: string, progress: number): Promise<void> {
    await this.updateGoal(goalId, { progress });
  }

  async addGoalAction(action: GoalAction): Promise<void> {
    const normalized = this.normalizeGoalAction(action);
    this.data.goalActions.push(normalized);
    this.syncGoalActionWithAncestors(normalized);
    await this.save();
  }

  async updateGoalAction(actionId: string, updates: Partial<GoalAction>): Promise<void> {
    const action = this.data.goalActions.find((item) => item.id === actionId);
    if (!action) return;
    Object.assign(action, updates, { updatedAt: Date.now() });
    if (updates.status === "completed") {
      action.progress = 100;
      action.completedDate = action.completedDate ?? formatDateKey(new Date());
    }
    if (updates.status && updates.status !== "completed") {
      action.completedDate = updates.completedDate;
    }
    const normalized = this.normalizeGoalAction(action);
    Object.assign(action, normalized);
    this.syncGoalActionWithAncestors(action);
    await this.save();
  }

  async toggleGoalActionCompleted(actionId: string): Promise<void> {
    const action = this.data.goalActions.find((item) => item.id === actionId);
    if (!action) return;
    if (action.status === "completed") {
      Object.assign(action, { status: "in-progress" as const, completedDate: undefined, progress: Math.min(action.progress ?? 0, 90), updatedAt: Date.now() });
    } else {
      Object.assign(action, { status: "completed" as const, completedDate: formatDateKey(new Date()), progress: 100, updatedAt: Date.now() });
    }
    this.syncGoalActionWithAncestors(action);
    await this.save();
  }

  async deleteGoalAction(actionId: string): Promise<void> {
    const ids = new Set<string>([actionId]);
    let changed = true;
    while (changed) {
      changed = false;
      this.data.goalActions.forEach((action) => {
        if (action.parentId && ids.has(action.parentId) && !ids.has(action.id)) {
          ids.add(action.id);
          changed = true;
        }
      });
    }
    this.data.goalActions = this.data.goalActions.filter((action) => !ids.has(action.id));
    ids.forEach((id) => this.removeAutoSegmentsForGoalAction(id));
    await this.save();
  }

  getGoalActionProgress(actionId: string): number {
    const action = this.data.goalActions.find((item) => item.id === actionId);
    if (!action) return 0;
    const children = this.data.goalActions.filter((item) => item.parentId === actionId);
    if (children.length === 0 || action.progressMode === "manual") return Math.max(0, Math.min(100, action.progress ?? (action.status === "completed" ? 100 : 0)));
    const total = children.reduce((sum, child) => sum + this.getGoalActionProgress(child.id), 0);
    return Math.round(total / children.length);
  }

  private withGoalActionComputedState(action: GoalAction): GoalAction {
    const progress = this.getGoalActionProgress(action.id);
    const status = action.status !== "completed" && action.deadline && action.deadline < formatDateKey(new Date())
      ? "overdue"
      : action.status;
    return { ...action, status, progress };
  }

  private normalizeGoalAction(action: GoalAction): GoalAction {
    const timestamp = Date.now();
    const startDate = action.startDate || formatDateKey(new Date());
    const deadline = action.deadline || startDate;
    return {
      id: action.id ?? `goal-action-${timestamp}`,
      goalId: action.goalId,
      parentId: action.parentId,
      title: action.title || "目标任务",
      description: action.description ?? "",
      status: action.status ?? "todo",
      startDate,
      deadline,
      completedDate: action.completedDate,
      progress: Math.max(0, Math.min(100, action.progress ?? 0)),
      progressMode: action.progressMode ?? "auto",
      durationDays: this.getNaturalDurationDays(startDate, deadline),
      isMilestone: action.isMilestone ?? false,
      milestoneDate: action.milestoneDate,
      importance: action.importance,
      urgency: action.urgency,
      note: action.note ?? "",
      collapsed: action.collapsed ?? false,
      createdAt: action.createdAt ?? timestamp,
      updatedAt: timestamp
    };
  }

  shouldShowActiveGoal(goal: Goal, dateKey = formatDateKey(new Date())): boolean {
    return !goal.completedDate || goal.completedDate >= dateKey;
  }

  shouldShowActiveObjective(objective: Objective, dateKey = formatDateKey(new Date())): boolean {
    return !objective.completedDate || objective.completedDate >= dateKey;
  }

  shouldShowActiveKeyResult(keyResult: KeyResult, dateKey = formatDateKey(new Date())): boolean {
    return !keyResult.completedDate || keyResult.completedDate >= dateKey;
  }

  shouldShowActiveGoalAction(action: GoalAction, dateKey = formatDateKey(new Date())): boolean {
    return !action.completedDate || action.completedDate >= dateKey;
  }

  private normalizeObjective(objective: Objective): Objective {
    const period = this.parseObjectivePeriod(objective);
    const progress = Math.max(0, Math.min(100, objective.progress ?? 0));
    const completedDate = progress >= 100 ? objective.completedDate ?? formatDateKey(new Date()) : undefined;
    return {
      ...objective,
      title: objective.title || "季度目标",
      quarter: `${period.year} Q${period.quarterNumber}`,
      year: period.year,
      quarterNumber: period.quarterNumber,
      progress,
      completedDate,
      autoGenerated: objective.autoGenerated ?? false,
      sourceGoalActionId: objective.sourceGoalActionId,
      segmentType: objective.segmentType,
      segmentStartDate: objective.segmentStartDate,
      segmentEndDate: objective.segmentEndDate,
      segmentNote: objective.segmentNote ?? "",
      segmentProgress: objective.segmentProgress ?? progress,
      updatedAt: objective.updatedAt ?? Date.now()
    };
  }

  private parseObjectivePeriod(objective: Partial<Objective>): { year: number; quarterNumber: 1 | 2 | 3 | 4 } {
    const current = new Date();
    const quarterMatch = typeof objective.quarter === "string" ? objective.quarter.match(/(\d{4})\s*Q([1-4])/i) : null;
    const parsedQuarter = Number(quarterMatch?.[2] ?? objective.quarterNumber ?? Math.floor(current.getMonth() / 3) + 1);
    return {
      year: Number(quarterMatch?.[1] ?? objective.year ?? current.getFullYear()),
      quarterNumber: Math.max(1, Math.min(4, parsedQuarter || 1)) as 1 | 2 | 3 | 4
    };
  }

  private normalizeKeyResult(keyResult: KeyResult): KeyResult {
    const now = new Date();
    const progress = Math.max(0, Math.min(100, keyResult.progress ?? 0));
    const completed = keyResult.completed || progress >= 100;
    return {
      ...keyResult,
      title: keyResult.title || "月度目标",
      year: keyResult.year ?? now.getFullYear(),
      month: Math.max(1, Math.min(12, keyResult.month ?? now.getMonth() + 1)),
      progress: completed ? 100 : progress,
      completed,
      completedDate: completed ? keyResult.completedDate ?? formatDateKey(new Date()) : undefined,
      autoGenerated: keyResult.autoGenerated ?? false,
      sourceGoalActionId: keyResult.sourceGoalActionId,
      segmentType: keyResult.segmentType,
      segmentStartDate: keyResult.segmentStartDate,
      segmentEndDate: keyResult.segmentEndDate,
      segmentNote: keyResult.segmentNote ?? "",
      segmentProgress: keyResult.segmentProgress ?? progress,
      updatedAt: keyResult.updatedAt ?? Date.now()
    };
  }

  private normalizeReviewItem(item: ReviewItem): ReviewItem {
    const now = new Date().toISOString();
    return {
      id: item.id ?? `review-${Date.now()}`,
      date: item.date || formatDateKey(new Date()),
      title: item.title || "复盘记录",
      content: item.content ?? "",
      status: item.status ?? "todo",
      createdAt: item.createdAt ?? now,
      updatedAt: item.updatedAt ?? now
    };
  }

  async addKeyResult(keyResult: KeyResult): Promise<void> {
    this.data.keyResults.push(this.normalizeKeyResult(keyResult));
    await this.save();
  }

  async updateKeyResult(keyResultId: string, updates: Partial<KeyResult>): Promise<void> {
    const keyResult = this.data.keyResults.find((item) => item.id === keyResultId);
    if (!keyResult) return;
    Object.assign(keyResult, updates, { updatedAt: Date.now() });
    keyResult.progress = Math.max(0, Math.min(100, keyResult.progress));
    keyResult.completed = keyResult.completed || keyResult.progress >= 100;
    if (keyResult.completed) {
      keyResult.progress = 100;
      keyResult.completedDate = keyResult.completedDate ?? formatDateKey(new Date());
    } else {
      keyResult.completedDate = undefined;
    }
    await this.save();
  }

  async deleteKeyResult(keyResultId: string): Promise<void> {
    this.data.keyResults = this.data.keyResults.filter((item) => item.id !== keyResultId);
    await this.save();
  }

  async toggleKeyResult(keyResultId: string): Promise<void> {
    const keyResult = this.data.keyResults.find((item) => item.id === keyResultId);
    if (!keyResult) {
      return;
    }
    keyResult.completed = !keyResult.completed;
    keyResult.progress = keyResult.completed ? 100 : Math.min(keyResult.progress, 90);
    keyResult.completedDate = keyResult.completed ? formatDateKey(new Date()) : undefined;
    keyResult.updatedAt = Date.now();
    await this.save();
  }

  async addMilestone(milestone: Milestone): Promise<void> {
    this.data.milestones.push(milestone);
    await this.save();
  }

  async updateMilestone(milestoneId: string, updates: Partial<Milestone>): Promise<void> {
    const milestone = this.data.milestones.find((item) => item.id === milestoneId);
    if (!milestone) return;
    Object.assign(milestone, updates);
    await this.save();
  }

  async deleteMilestone(milestoneId: string): Promise<void> {
    this.data.milestones = this.data.milestones.filter((item) => item.id !== milestoneId);
    await this.save();
  }

  async addRisk(risk: Risk): Promise<void> {
    this.data.risks.push(risk);
    await this.save();
  }

  async updateRisk(riskId: string, updates: Partial<Risk>): Promise<void> {
    const risk = this.data.risks.find((item) => item.id === riskId);
    if (!risk) return;
    Object.assign(risk, updates);
    await this.save();
  }

  async deleteRisk(riskId: string): Promise<void> {
    this.data.risks = this.data.risks.filter((item) => item.id !== riskId);
    await this.save();
  }

  async addTransaction(transaction: Transaction): Promise<void> {
    this.data.transactions.push({ ...transaction, amount: Math.abs(transaction.amount) });
    this.recalculateBudgetSpent();
    await this.save();
  }

  getMonthlyIncome(): number {
    return this.getCurrentMonthTransactions()
      .filter((transaction) => transaction.type === "income")
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  }

  getMonthlyExpense(): number {
    return this.getCurrentMonthTransactions()
      .filter((transaction) => transaction.type === "expense")
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  }

  getBudgetRemaining(): number {
    return this.getMonthlyBudgetLimit() - this.getMonthlyExpense();
  }

  getSavingRate(): number {
    const income = this.getMonthlyIncome();
    if (income <= 0) {
      return 0;
    }
    return Math.round(((income - this.getMonthlyExpense()) / income) * 100);
  }

  private getCurrentMonthTransactions(): Transaction[] {
    const now = new Date();
    const prefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    return this.getTransactions().filter((transaction) => transaction.date.startsWith(prefix));
  }

  getPriorityMatrixItems(): PriorityMatrixItem[] {
    return this.data.priorityMatrixItems;
  }

  async addPriorityMatrixItem(item: PriorityMatrixItem): Promise<void> {
    this.data.priorityMatrixItems.push(item);
    await this.save();
  }

  async updatePriorityMatrixItem(itemId: string, updates: Partial<PriorityMatrixItem>): Promise<void> {
    const item = this.data.priorityMatrixItems.find((entry) => entry.id === itemId);
    if (!item) return;
    Object.assign(item, updates);
    await this.save();
  }

  async deletePriorityMatrixItem(itemId: string): Promise<void> {
    this.data.priorityMatrixItems = this.data.priorityMatrixItems.filter((item) => item.id !== itemId);
    await this.save();
  }

  private recalculateBudgetSpent(): void {
    this.getBudgets().forEach((budget) => {
      budget.spent = this.getCurrentMonthTransactions()
        .filter((transaction) => transaction.type === "expense" && transaction.category === budget.category)
        .reduce((sum, transaction) => sum + transaction.amount, 0);
    });
  }

  private isBudgetAdjustmentTransaction(transaction: Transaction): boolean {
    return transaction.note === "月度收支管理调整"
      && (transaction.category === "月度收入调整" || transaction.category === "月度支出调整");
  }

  private setSectionEnabledInMemory(sectionId: string, enabled: boolean): void {
    const section = this.data.sections.find((item) => item.id === sectionId);
    if (section) {
      section.enabled = enabled;
    }
  }

  isHabitCompleted(habitId: string, date: string): boolean {
    return this.isCheckInCompleted(habitId, date);
  }

  async toggleHabit(habitId: string, date: string): Promise<void> {
    await this.toggleCheckIn(habitId, date);
  }

  getCheckInDefinitions(moduleId?: string, includeArchived = false): CheckInDefinition[] {
    return this.data.checkInDefinitions
      .filter((definition) => (includeArchived || !definition.archived) && (!moduleId || definition.moduleId === moduleId))
      .sort((left, right) => {
        if (left.moduleId === right.moduleId) return left.order - right.order;
        return this.getCheckInModuleOrder(left.moduleId) - this.getCheckInModuleOrder(right.moduleId);
      });
  }

  getActiveCheckInDefinitions(moduleId?: string): CheckInDefinition[] {
    return this.getCheckInDefinitions(moduleId).filter((definition) => definition.enabled);
  }

  getCheckInRecords(checkInId?: string): CheckInRecord[] {
    return this.data.checkInRecords.filter((record) => !checkInId || record.checkInId === checkInId);
  }

  getCheckInRecordsByDate(date: string): CheckInRecord[] {
    return this.data.checkInRecords.filter((record) => record.date === date);
  }

  isCheckInCompleted(checkInId: string, date: string): boolean {
    return this.data.checkInRecords.some((record) => record.checkInId === checkInId && record.date === date);
  }

  async toggleCheckIn(checkInId: string, date: string): Promise<boolean> {
    const index = this.data.checkInRecords.findIndex((record) => record.checkInId === checkInId && record.date === date);
    if (index >= 0) {
      this.data.checkInRecords.splice(index, 1);
      await this.save();
      return false;
    }
    this.data.checkInRecords.push({
      id: `checkin-record-${checkInId}-${date}`,
      checkInId,
      date,
      completedAt: Date.now()
    });
    this.dedupeCheckInRecordsInMemory();
    await this.save();
    return true;
  }

  async addCheckInDefinition(input: Pick<CheckInDefinition, "moduleId" | "title"> & Partial<CheckInDefinition>): Promise<void> {
    const nextOrder = this.getCheckInDefinitions(input.moduleId, true).reduce((max, item) => Math.max(max, item.order), 0) + 10;
    const now = Date.now();
    this.data.checkInDefinitions.push({
      id: input.id ?? `checkin-${input.moduleId}-${now}`,
      moduleId: input.moduleId,
      title: input.title,
      icon: input.icon ?? "circle",
      color: input.color ?? "#ff8fbc",
      enabled: input.enabled ?? true,
      archived: false,
      order: input.order ?? nextOrder,
      createdAt: input.createdAt ?? now,
      updatedAt: now
    });
    await this.save();
  }

  async updateCheckInDefinition(definitionId: string, updates: Partial<CheckInDefinition>): Promise<void> {
    const definition = this.data.checkInDefinitions.find((item) => item.id === definitionId);
    if (!definition) return;
    if (updates.enabled === false && definition.enabled) {
      updates.inactiveFrom = updates.inactiveFrom ?? todayKey();
    }
    if (updates.enabled === true && !definition.enabled) {
      updates.inactiveFrom = undefined;
      updates.archived = false;
    }
    Object.assign(definition, updates, { updatedAt: Date.now() });
    await this.save();
  }

  async archiveCheckInDefinition(definitionId: string): Promise<void> {
    await this.updateCheckInDefinition(definitionId, { archived: true, enabled: false, inactiveFrom: todayKey() });
  }

  async reorderCheckInDefinitions(moduleId: string, orderedIds: string[]): Promise<void> {
    const orderMap = new Map(orderedIds.map((id, index) => [id, (index + 1) * 10]));
    this.data.checkInDefinitions.forEach((definition) => {
      const order = orderMap.get(definition.id);
      if (definition.moduleId === moduleId && order !== undefined) {
        definition.order = order;
        definition.updatedAt = Date.now();
      }
    });
    await this.save();
  }

  getWeeklyCompletionRate(): number {
    const habitCompletion: boolean[] = [];
    this.getCurrentWeekDates().forEach((date) => {
      this.getActiveCheckInDefinitions().forEach((habit) => {
        habitCompletion.push(this.isCheckInCompleted(habit.id, date));
      });
    });
    const focusCompletion = this.data.todayFocusTasks.map((task) => task.completed);
    const items = [...habitCompletion, ...focusCompletion];
    const done = items.filter(Boolean).length;
    return items.length === 0 ? 0 : Math.round((done / items.length) * 100);
  }

  getPendingTaskCount(): number {
    return this.data.todayFocusTasks.filter((task) => !task.completed).length;
  }

  getCheckinStreakDays(): number {
    const today = new Date();
    let streak = 0;

    for (let offset = 0; offset < 366; offset += 1) {
      const date = new Date(today);
      date.setDate(today.getDate() - offset);
      const key = formatDateKey(date);
      const habits = this.getActiveCheckInDefinitions();
      const allDone = habits.length > 0 && habits.every((habit) => this.isCheckInCompleted(habit.id, key));
      if (!allDone) {
        break;
      }
      streak += 1;
    }

    return streak;
  }

  private resolveFocusState(): FocusState {
    const state = { ...this.data.focusState };
    if (!state.isRunning || state.isPaused || !state.startedAt) {
      return state;
    }

    const elapsedSeconds = Math.max(0, Math.floor((Date.now() - new Date(state.startedAt).getTime()) / 1000));
    const remainingSeconds = Math.max(0, state.remainingSeconds - elapsedSeconds);
    return {
      ...state,
      remainingSeconds
    };
  }

  getCurrentWeekDates(): string[] {
    const today = new Date();
    const day = today.getDay();
    const mondayOffset = day === 0 ? -6 : 1 - day;
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);

    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);
      return formatDateKey(date);
    });
  }

  private mergeWithDefaults(savedData: unknown): WorkbenchData {
    if (!savedData || typeof savedData !== "object") {
      return structuredClone(DEFAULT_DATA);
    }

    const partial = savedData as Partial<WorkbenchData>;
    const sections = Array.isArray(partial.sections)
      ? this.migrateSections(partial.sections)
      : structuredClone(DEFAULT_DATA.sections);

    const merged: WorkbenchData = {
      ...structuredClone(DEFAULT_DATA),
      ...partial,
      dataVersion: "0.7.0",
      banner: {
        ...DEFAULT_DATA.banner,
        ...partial.banner
      },
      userSettings: {
        ...DEFAULT_DATA.userSettings,
        ...partial.userSettings
      },
      sections,
      moduleLayouts: this.migrateModuleLayouts(partial),
      habits: partial.habits ?? {},
      todayFocusTasks: Array.isArray(partial.todayFocusTasks)
        ? partial.todayFocusTasks
        : structuredClone(DEFAULT_DATA.todayFocusTasks),
      researchProjects: Array.isArray(partial.researchProjects)
        ? partial.researchProjects.map((project) => this.normalizeResearchProject(project))
        : structuredClone(DEFAULT_DATA.researchProjects).map((project) => this.normalizeResearchProject(project)),
      researchPapers: Array.isArray(partial.researchPapers)
        ? partial.researchPapers.map((paper) => this.normalizeResearchPaper(paper))
        : structuredClone(DEFAULT_DATA.researchPapers).map((paper) => this.normalizeResearchPaper(paper)),
      literatureNotes: Array.isArray(partial.literatureNotes)
        ? partial.literatureNotes.map((note) => this.normalizeLiteratureNote(note)).filter((note) => note.notePath)
        : this.createInitialLiteratureNotes(partial),
      paperStatuses: this.mergePaperStatuses(partial),
      paperVenues: this.mergePaperVenues(partial),
      paperTags: this.mergePaperTags(partial),
      experimentPlans: Array.isArray(partial.experimentPlans)
        ? partial.experimentPlans.map((item) => this.normalizeExperiment(item, "plan"))
        : structuredClone(DEFAULT_DATA.experimentPlans),
      experimentRecords: Array.isArray(partial.experimentRecords)
        ? partial.experimentRecords.map((item) => this.normalizeExperiment(item, "records"))
        : structuredClone(DEFAULT_DATA.experimentRecords),
      researchDeadlines: Array.isArray(partial.researchDeadlines)
        ? partial.researchDeadlines
        : structuredClone(DEFAULT_DATA.researchDeadlines),
      researchMemos: Array.isArray(partial.researchMemos)
        ? partial.researchMemos
        : structuredClone(DEFAULT_DATA.researchMemos),
      dataAnalysisTasks: Array.isArray(partial.dataAnalysisTasks)
        ? partial.dataAnalysisTasks
        : structuredClone(DEFAULT_DATA.dataAnalysisTasks),
      bookTags: this.mergeBookTags(partial),
      books: Array.isArray(partial.books)
        ? partial.books.map((book) => this.normalizeBook(book))
        : structuredClone(DEFAULT_DATA.books).map((book) => this.normalizeBook(book)),
      wantToReadItems: Array.isArray(partial.wantToReadItems)
        ? partial.wantToReadItems.map((item) => this.normalizeWantToReadItem(item))
        : this.createInitialWantToReadItems(partial),
      readingQuotes: Array.isArray(partial.readingQuotes)
        ? partial.readingQuotes.map((quote) => this.normalizeReadingQuote(quote))
        : structuredClone(DEFAULT_DATA.readingQuotes).map((quote) => this.normalizeReadingQuote(quote)),
      readingPlans: Array.isArray(partial.readingPlans)
        ? partial.readingPlans.map((plan) => this.normalizeReadingPlan(plan))
        : this.createInitialReadingPlans(partial),
      readingNotes: Array.isArray(partial.readingNotes)
        ? partial.readingNotes.map((note) => this.normalizeReadingNote(note)).filter((note) => note.notePath && note.bookId)
        : this.createInitialReadingNotes(partial),
      workouts: Array.isArray(partial.workouts)
        ? partial.workouts.map((workout) => this.normalizeWorkout(workout))
        : structuredClone(DEFAULT_DATA.workouts).map((workout) => this.normalizeWorkout(workout)),
      bodyMeasurements: Array.isArray(partial.bodyMeasurements)
        ? partial.bodyMeasurements.map((item) => this.normalizeBodyMeasurement(item))
        : structuredClone(DEFAULT_DATA.bodyMeasurements),
      fitnessGoals: Array.isArray(partial.fitnessGoals)
        ? partial.fitnessGoals.map((item) => this.normalizeFitnessGoal(item))
        : structuredClone(DEFAULT_DATA.fitnessGoals),
      healthReminders: Array.isArray(partial.healthReminders)
        ? partial.healthReminders.map((item) => this.normalizeHealthReminder(item))
        : structuredClone(DEFAULT_DATA.healthReminders),
      healthReminderLogs: Array.isArray(partial.healthReminderLogs)
        ? partial.healthReminderLogs
        : structuredClone(DEFAULT_DATA.healthReminderLogs),
      transactions: Array.isArray(partial.transactions)
        ? partial.transactions
        : structuredClone(DEFAULT_DATA.transactions),
      budgets: Array.isArray(partial.budgets) ? partial.budgets : structuredClone(DEFAULT_DATA.budgets),
      accounts: Array.isArray(partial.accounts)
        ? partial.accounts.map((account) => this.normalizeAccount(account))
        : structuredClone(DEFAULT_DATA.accounts).map((account) => this.normalizeAccount(account)),
      savingGoals: Array.isArray(partial.savingGoals)
        ? partial.savingGoals
        : structuredClone(DEFAULT_DATA.savingGoals),
      bills: Array.isArray(partial.bills) ? partial.bills : structuredClone(DEFAULT_DATA.bills),
      financeTodos: Array.isArray(partial.financeTodos)
        ? partial.financeTodos.map((item) => this.normalizeFinanceTodo(item))
        : structuredClone(DEFAULT_DATA.financeTodos),
      tasks: Array.isArray(partial.tasks)
        ? partial.tasks.map((item) => this.normalizeTask(item))
        : structuredClone(DEFAULT_DATA.tasks).map((item) => this.normalizeTask(item)),
      taskProjects: Array.isArray(partial.taskProjects)
        ? partial.taskProjects.map((item) => this.normalizeTaskProject(item))
        : structuredClone(DEFAULT_DATA.taskProjects),
      taskSettings: {
        ...DEFAULT_DATA.taskSettings,
        ...partial.taskSettings
      },
      goals: Array.isArray(partial.goals) ? partial.goals : structuredClone(DEFAULT_DATA.goals),
      goalActions: Array.isArray(partial.goalActions)
        ? partial.goalActions.map((action) => this.normalizeGoalAction(action))
        : this.createInitialGoalActions(partial),
      objectives: Array.isArray(partial.objectives)
        ? partial.objectives.map((item) => this.normalizeObjective(item))
        : structuredClone(DEFAULT_DATA.objectives).map((item) => this.normalizeObjective(item)),
      keyResults: Array.isArray(partial.keyResults)
        ? partial.keyResults.map((item) => this.normalizeKeyResult(item))
        : structuredClone(DEFAULT_DATA.keyResults).map((item) => this.normalizeKeyResult(item)),
      milestones: Array.isArray(partial.milestones)
        ? partial.milestones
        : structuredClone(DEFAULT_DATA.milestones),
      risks: Array.isArray(partial.risks) ? partial.risks : structuredClone(DEFAULT_DATA.risks),
      reviewItems: Array.isArray(partial.reviewItems)
        ? partial.reviewItems.map((item) => this.normalizeReviewItem(item))
        : structuredClone(DEFAULT_DATA.reviewItems),
      calendarSettings: {
        ...DEFAULT_DATA.calendarSettings,
        ...partial.calendarSettings
      },
      calendarTodos: Array.isArray(partial.calendarTodos)
        ? partial.calendarTodos
        : structuredClone(DEFAULT_DATA.calendarTodos),
      apexHabitSettings: {
        ...DEFAULT_DATA.apexHabitSettings,
        ...partial.apexHabitSettings,
        customHabits: Array.isArray(partial.apexHabitSettings?.customHabits)
          ? partial.apexHabitSettings.customHabits
          : structuredClone(DEFAULT_DATA.apexHabitSettings.customHabits)
      },
      checkInDefinitions: this.mergeCheckInDefinitions(partial),
      checkInRecords: this.mergeCheckInRecords(partial),
      quickActions: Array.isArray(partial.quickActions)
        ? partial.quickActions
        : structuredClone(DEFAULT_DATA.quickActions),
      focusSettings: {
        ...DEFAULT_DATA.focusSettings,
        ...partial.focusSettings
      },
      focusState: {
        ...DEFAULT_DATA.focusState,
        ...partial.focusState
      },
      focusRecords: Array.isArray(partial.focusRecords)
        ? partial.focusRecords.map((record) => this.normalizeFocusRecord(record))
        : structuredClone(DEFAULT_DATA.focusRecords),
      trainingPlans: Array.isArray(partial.trainingPlans)
        ? partial.trainingPlans.map((plan) => this.normalizeTrainingPlan(plan))
        : this.createInitialTrainingPlans(partial),
      fitnessDailyRecords: Array.isArray(partial.fitnessDailyRecords)
        ? partial.fitnessDailyRecords.map((item) => this.normalizeFitnessDailyRecord(item))
        : structuredClone(DEFAULT_DATA.fitnessDailyRecords),
      fitnessHabitDefinitions: Array.isArray(partial.fitnessHabitDefinitions)
        ? partial.fitnessHabitDefinitions.map((item, index) => this.normalizeFitnessHabitDefinition(item, index))
        : structuredClone(DEFAULT_DATA.fitnessHabitDefinitions),
      fitnessHabitRecords: Array.isArray(partial.fitnessHabitRecords)
        ? partial.fitnessHabitRecords
        : structuredClone(DEFAULT_DATA.fitnessHabitRecords),
      investmentWatchItems: Array.isArray(partial.investmentWatchItems)
        ? partial.investmentWatchItems.map((item) => this.normalizeInvestmentWatchItem(item))
        : structuredClone(DEFAULT_DATA.investmentWatchItems),
      investmentSnapshots: Array.isArray(partial.investmentSnapshots)
        ? partial.investmentSnapshots
        : this.createInitialInvestmentSnapshots(Array.isArray(partial.investmentWatchItems) ? partial.investmentWatchItems : DEFAULT_DATA.investmentWatchItems),
      priorityMatrixItems: Array.isArray(partial.priorityMatrixItems)
        ? partial.priorityMatrixItems
        : structuredClone(DEFAULT_DATA.priorityMatrixItems),
      theme: {
        ...DEFAULT_DATA.theme,
        ...partial.theme
      }
    };
    return this.repairFitnessRelations(this.repairResearchRelations(this.repairBookTagRelations(merged)));
  }

  private normalizeBodyMeasurement(measurement: BodyMeasurement): BodyMeasurement {
    const timestamp = measurement.createdAt ?? `${measurement.date || todayKey()}T00:00:00.000Z`;
    return {
      id: measurement.id ?? `measure-${measurement.date || Date.now()}`,
      date: measurement.date || todayKey(),
      weight: Number(measurement.weight) || 0,
      bmi: Number(measurement.bmi) || 0,
      waist: Number(measurement.waist) || 0,
      chest: Number(measurement.chest) || 0,
      hip: Number(measurement.hip) || 0,
      note: measurement.note ?? "",
      createdAt: timestamp,
      updatedAt: measurement.updatedAt ?? timestamp
    };
  }

  private normalizeWorkout(workout: Workout): Workout {
    const timestamp = workout.createdAt ?? `${workout.date || todayKey()}T00:00:00.000Z`;
    const workoutType = this.normalizeWorkoutType(workout.workoutType ?? workout.type);
    const durationMinutes = Number(workout.durationMinutes ?? workout.duration) || 0;
    return {
      ...workout,
      id: workout.id ?? `workout-${Date.now()}`,
      title: workout.title?.trim() || workout.note?.trim() || `${workoutType}训练`,
      date: workout.date || todayKey(),
      type: workout.type ?? workoutType,
      workoutType,
      duration: durationMinutes,
      durationMinutes,
      calories: Number(workout.calories) || 0,
      distanceKm: workout.distanceKm !== undefined && Number(workout.distanceKm) > 0 ? Number(workout.distanceKm) : undefined,
      exerciseDetails: workout.exerciseDetails ?? "",
      feeling: workout.feeling ?? "",
      resultSummary: workout.resultSummary ?? "",
      markdownPath: typeof workout.markdownPath === "string" && workout.markdownPath.length > 0 ? workout.markdownPath : undefined,
      completed: workout.completed ?? true,
      note: workout.note ?? "",
      createdAt: timestamp,
      updatedAt: workout.updatedAt ?? timestamp
    };
  }

  private normalizeWorkoutType(type: Workout["type"] | Workout["workoutType"] | undefined): NonNullable<Workout["workoutType"]> {
    if (type === "跑步" || type === "力量" || type === "骑行" || type === "游泳" || type === "瑜伽" || type === "其它") return type;
    if (type === "拉伸") return "瑜伽";
    if (type === "有氧") return "跑步";
    return "其它";
  }

  private normalizeAccount(account: Account): Account {
    return {
      ...account,
      id: account.id ?? `account-${Date.now()}`,
      name: account.name || "未命名账户",
      type: account.type || "其他",
      balance: Number(account.balance) || 0,
      icon: this.accountTypeIcon(account.type)
    };
  }

  private accountTypeIcon(type?: Account["type"]): string {
    if (type === "现金") return "wallet";
    if (type === "储蓄卡") return "landmark";
    if (type === "信用卡") return "credit-card";
    if (type === "支付宝" || type === "微信钱包") return "smartphone";
    if (type === "投资账户" || type === "证券") return "chart-no-axes-combined";
    return "circle-dollar-sign";
  }

  private normalizeFitnessGoal(goal: FitnessGoal): FitnessGoal {
    const timestamp = goal.createdAt ?? `${goal.startDate || goal.deadline || todayKey()}T00:00:00.000Z`;
    const currentValue = Number(goal.currentValue ?? goal.current ?? 0);
    const targetValue = Number(goal.targetValue ?? goal.target ?? 0);
    const progress = Math.max(0, Math.min(100, Number(goal.progress ?? (targetValue === 0 ? 0 : Math.round((currentValue / targetValue) * 100))) || 0));
    const status = this.getNormalizedFitnessGoalStatus({
      ...goal,
      currentValue,
      targetValue,
      progress
    });
    return {
      ...goal,
      id: goal.id ?? `fitness-goal-${Date.now()}`,
      title: goal.title || "健身目标",
      type: goal.type ?? "其它",
      description: goal.description ?? "",
      currentValue,
      targetValue,
      unit: goal.unit || goal.targetUnit || "",
      targetUnit: goal.targetUnit || goal.unit || "",
      progress,
      startDate: goal.startDate ?? todayKey(),
      deadline: goal.deadline || todayKey(),
      completedDate: status === "completed" ? goal.completedDate ?? todayKey() : goal.completedDate,
      status,
      createdAt: timestamp,
      updatedAt: goal.updatedAt ?? timestamp
    };
  }

  private getNormalizedFitnessGoalStatus(goal: FitnessGoal): FitnessGoal["status"] {
    if (goal.status === "archived") return "archived";
    if (goal.status === "completed" || goal.completedDate || goal.progress === 100) return "completed";
    if (goal.startDate && todayKey() < goal.startDate) return "planned";
    if (goal.deadline && goal.deadline < todayKey()) return "overdue";
    return "active";
  }

  private normalizeTrainingPlan(plan: TrainingPlan): TrainingPlan {
    const timestamp = plan.createdAt ?? `${plan.startDate || todayKey()}T00:00:00.000Z`;
    const startDate = plan.startDate || todayKey();
    const endDate = plan.endDate && plan.endDate >= startDate ? plan.endDate : startDate;
    const status = this.getNormalizedTrainingPlanStatus({ ...plan, startDate, endDate });
    return {
      id: plan.id ?? `training-plan-${Date.now()}`,
      title: plan.title || "训练计划",
      fitnessGoalId: plan.fitnessGoalId,
      startDate,
      endDate,
      weeklyFrequency: Math.max(0, Number(plan.weeklyFrequency) || 0),
      description: plan.description ?? "",
      note: plan.note ?? "",
      markdownPath: typeof plan.markdownPath === "string" && plan.markdownPath.length > 0 ? plan.markdownPath : undefined,
      status,
      completedDate: status === "completed" ? plan.completedDate ?? todayKey() : plan.completedDate,
      createdAt: timestamp,
      updatedAt: plan.updatedAt ?? timestamp
    };
  }

  private withComputedTrainingPlanStatus(plan: TrainingPlan): TrainingPlan {
    return { ...plan, status: this.getNormalizedTrainingPlanStatus(plan) };
  }

  private getNormalizedTrainingPlanStatus(plan: TrainingPlan): NonNullable<TrainingPlan["status"]> {
    if (plan.status === "completed" || plan.completedDate) return "completed";
    if (todayKey() < plan.startDate) return "planned";
    if (todayKey() > plan.endDate) return "overdue";
    return "active";
  }

  private createInitialTrainingPlans(partial: Partial<WorkbenchData>): TrainingPlan[] {
    if (!Array.isArray(partial.workouts)) {
      return structuredClone(DEFAULT_DATA.trainingPlans).map((plan) => this.normalizeTrainingPlan(plan));
    }
    const firstGoalId = (Array.isArray(partial.fitnessGoals) ? partial.fitnessGoals : DEFAULT_DATA.fitnessGoals)[0]?.id;
    const pending = partial.workouts.filter((workout) => !workout.completed);
    if (pending.length === 0) {
      return structuredClone(DEFAULT_DATA.trainingPlans).map((plan) => this.normalizeTrainingPlan(plan));
    }
    return pending.map((workout) => this.normalizeTrainingPlan({
      id: `training-plan-${workout.id}`,
      title: workout.note || `${workout.type}训练计划`,
      fitnessGoalId: firstGoalId,
      startDate: workout.date,
      endDate: workout.date,
      weeklyFrequency: 1,
      description: `${workout.type} · ${workout.duration}min`,
      note: workout.note,
      createdAt: nowIso(),
      updatedAt: nowIso()
    }));
  }

  private normalizeHealthReminder(reminder: HealthReminder): HealthReminder {
    const timestamp = reminder.createdAt ?? nowIso();
    return {
      id: reminder.id ?? `health-${Date.now()}`,
      title: reminder.title || "健康提醒",
      date: reminder.date ?? todayKey(),
      time: reminder.time ?? "09:00",
      repeatType: reminder.repeatType ?? "once",
      repeatDays: reminder.repeatDays ?? [],
      note: reminder.note ?? "",
      enabled: reminder.enabled ?? true,
      createdAt: timestamp,
      updatedAt: reminder.updatedAt ?? timestamp
    };
  }

  private normalizeFitnessDailyRecord(record: FitnessDailyRecord): FitnessDailyRecord {
    return {
      date: record.date || todayKey(),
      waterCups: Number(record.waterCups) || 0,
      waterGoal: Number(record.waterGoal) || 8,
      waterNote: record.waterNote ?? "",
      sleepHours: Number(record.sleepHours) || 0,
      sleepGoal: Number(record.sleepGoal) || 8,
      bedtime: record.bedtime ?? "",
      wakeTime: record.wakeTime ?? "",
      sleepNote: record.sleepNote ?? "",
      updatedAt: record.updatedAt ?? nowIso()
    };
  }

  private normalizeFitnessHabitDefinition(definition: FitnessHabitDefinition, index: number): FitnessHabitDefinition {
    const timestamp = definition.createdAt ?? nowIso();
    return {
      id: definition.id ?? `fitness-habit-${Date.now()}-${index}`,
      name: definition.name || "自定义习惯",
      targetName: definition.targetName || "每日目标",
      targetValue: Number(definition.targetValue) || 0,
      unit: definition.unit || "",
      order: Number(definition.order) || (index + 1) * 10,
      createdAt: timestamp,
      updatedAt: definition.updatedAt ?? timestamp
    };
  }

  private normalizeFinanceTodo(todo: FinanceTodo): FinanceTodo {
    const timestamp = todo.createdAt ?? nowIso();
    return {
      id: todo.id ?? `finance-todo-${Date.now()}`,
      title: todo.title || "理财待办",
      completed: todo.completed ?? false,
      date: todo.date ?? todayKey(),
      note: todo.note ?? "",
      createdAt: timestamp,
      updatedAt: todo.updatedAt ?? timestamp
    };
  }

  private mergeCheckInDefinitions(partial: Partial<WorkbenchData>): CheckInDefinition[] {
    const definitions = new Map<string, CheckInDefinition>();
    const add = (definition: Partial<CheckInDefinition>, index = 0): void => {
      if (!definition.id) return;
      const existing = definitions.get(definition.id);
      const normalized = this.normalizeCheckInDefinition(definition, index, existing);
      definitions.set(normalized.id, normalized);
    };
    createDefaultCheckInDefinitions().forEach((definition, index) => add(definition, index));
    (partial.apexHabitSettings?.customHabits ?? []).forEach((habit, index) => {
      add({
        id: habit.id.replace(/^custom-/, ""),
        moduleId: "overview",
        title: habit.label,
        enabled: habit.enabled,
        order: habit.order,
        icon: "sparkles",
        color: "#ff8fbc"
      }, index);
    });
    (partial.checkInDefinitions ?? []).forEach((definition, index) => add(definition, index));
    return [...definitions.values()].sort((left, right) => {
      if (left.moduleId === right.moduleId) return left.order - right.order;
      return this.getCheckInModuleOrder(left.moduleId) - this.getCheckInModuleOrder(right.moduleId);
    });
  }

  private mergeCheckInRecords(partial: Partial<WorkbenchData>): CheckInRecord[] {
    const records = new Map<string, CheckInRecord>();
    const add = (record: Partial<CheckInRecord>): void => {
      if (!record.checkInId || !record.date) return;
      const date = record.date.slice(0, 10);
      const key = `${record.checkInId}::${date}`;
      if (records.has(key)) return;
      records.set(key, {
        id: record.id ?? `checkin-record-${record.checkInId}-${date}`,
        checkInId: record.checkInId,
        date,
        completedAt: Number(record.completedAt) || Date.now()
      });
    };
    (partial.checkInRecords ?? []).forEach(add);
    Object.entries(partial.habits ?? {}).forEach(([checkInId, byDate]) => {
      Object.entries(byDate ?? {}).forEach(([date, completed]) => {
        if (completed) add({ checkInId, date, completedAt: new Date(`${date}T12:00:00`).getTime() });
      });
    });
    return [...records.values()].sort((left, right) => left.date.localeCompare(right.date));
  }

  private normalizeCheckInDefinition(definition: Partial<CheckInDefinition>, index: number, existing?: CheckInDefinition): CheckInDefinition {
    const now = Date.now();
    return {
      id: definition.id ?? existing?.id ?? `checkin-${now}-${index}`,
      moduleId: definition.moduleId ?? existing?.moduleId ?? "overview",
      title: definition.title ?? existing?.title ?? "未命名打卡",
      icon: definition.icon ?? existing?.icon ?? "circle",
      color: definition.color ?? existing?.color ?? "#ff8fbc",
      enabled: definition.enabled ?? existing?.enabled ?? true,
      archived: definition.archived ?? existing?.archived ?? false,
      inactiveFrom: definition.inactiveFrom ?? existing?.inactiveFrom,
      order: Number(definition.order ?? existing?.order ?? (index + 1) * 10),
      createdAt: Number(definition.createdAt ?? existing?.createdAt ?? now),
      updatedAt: Number(definition.updatedAt ?? existing?.updatedAt ?? now)
    };
  }

  private dedupeCheckInRecordsInMemory(): void {
    const records = new Map<string, CheckInRecord>();
    this.data.checkInRecords.forEach((record) => {
      const key = `${record.checkInId}::${record.date}`;
      if (!records.has(key)) records.set(key, record);
    });
    this.data.checkInRecords = [...records.values()];
  }

  private getCheckInModuleOrder(moduleId: string): number {
    const order = ["overview", "research", "reading", "fitness", "finance", "goals"].indexOf(moduleId);
    return order === -1 ? 99 : order;
  }

  private normalizeTask(task: Task): Task {
    const timestamp = task.createdAt ?? nowIso();
    const status = this.normalizeTaskStatus(task.status);
    const recurrence = task.recurrence && task.recurrence.frequency !== "none"
      ? {
        frequency: this.normalizeRecurrenceFrequency(task.recurrence.frequency),
        interval: Math.max(1, Number(task.recurrence.interval) || 1),
        nextDate: task.recurrence.nextDate,
        enabled: task.recurrence.enabled ?? true,
        lastGeneratedDate: task.recurrence.lastGeneratedDate
      }
      : task.recurrence?.frequency === "none"
        ? { frequency: "none" as const, enabled: false }
        : undefined;
    return {
      ...task,
      id: task.id ?? `task-${Date.now()}`,
      title: task.title || "未命名任务",
      description: task.description ?? "",
      status,
      priority: this.normalizeTaskPriority(task.priority),
      sourceModule: task.sourceModule ?? "general",
      projectId: task.projectId || undefined,
      goalId: task.goalId || undefined,
      parentTaskId: task.parentTaskId || undefined,
      tags: Array.isArray(task.tags) ? task.tags.filter(Boolean) : [],
      plannedDate: task.plannedDate || undefined,
      startDate: task.startDate || undefined,
      dueDate: task.dueDate || undefined,
      completedDate: status === "done" ? task.completedDate ?? todayKey() : task.completedDate,
      estimatedMinutes: Number(task.estimatedMinutes) > 0 ? Number(task.estimatedMinutes) : undefined,
      actualMinutes: Number(task.actualMinutes) > 0 ? Number(task.actualMinutes) : undefined,
      recurrence,
      linkedNote: task.linkedNote || undefined,
      createdAt: timestamp,
      updatedAt: task.updatedAt ?? timestamp
    };
  }

  private normalizeTaskProject(project: TaskProject): TaskProject {
    return {
      id: project.id ?? `task-project-${Date.now()}`,
      name: project.name || "未命名项目",
      description: project.description ?? "",
      createdAt: project.createdAt ?? nowIso()
    };
  }

  private normalizeTaskStatus(status: TaskStatus | undefined): TaskStatus {
    if (status === "inbox" || status === "todo" || status === "doing" || status === "waiting" || status === "done" || status === "cancelled") return status;
    return "inbox";
  }

  private normalizeTaskPriority(priority: TaskPriority | undefined): TaskPriority {
    if (priority === "high" || priority === "medium" || priority === "low" || priority === "none") return priority;
    return "none";
  }

  private normalizeRecurrenceFrequency(frequency: string | undefined): "daily" | "weekly" | "monthly" | "custom" {
    if (frequency === "daily" || frequency === "weekly" || frequency === "monthly" || frequency === "custom") return frequency;
    return "daily";
  }

  private nextRecurrenceDate(date: string, frequency: string, interval = 1): string {
    const next = new Date(`${date}T00:00:00`);
    const step = Math.max(1, Number(interval) || 1);
    if (frequency === "weekly") next.setDate(next.getDate() + 7 * step);
    else if (frequency === "monthly") next.setMonth(next.getMonth() + step);
    else next.setDate(next.getDate() + step);
    return formatDateKey(next);
  }

  private normalizeBook(book: BookItem): BookItem {
    const readingStatus = book.readingStatus ?? this.readingStatusFromLegacy(book.status);
    const timestamp = book.createdAt ?? nowIso();
    const tagIds = Array.from(new Set([
      ...(Array.isArray(book.tagIds) ? book.tagIds : []),
      ...(Array.isArray(book.tags) ? book.tags.map((tag) => this.definitionId("book-tag", tag)) : [])
    ]));
    const tagNames = tagIds
      .map((id) => this.data?.bookTags?.find((tag) => tag.id === id)?.name ?? DEFAULT_DATA.bookTags.find((tag) => tag.id === id)?.name)
      .filter(Boolean) as string[];
    const normalized: BookItem = {
      ...book,
      id: book.id ?? `book-${Date.now()}`,
      title: book.title || "未命名书籍",
      author: book.author || "未知作者",
      totalPages: Math.max(1, Number(book.totalPages) || 1),
      currentPage: Math.max(0, Math.min(Number(book.currentPage) || 0, Math.max(1, Number(book.totalPages) || 1))),
      status: this.legacyBookStatus(readingStatus),
      readingStatus,
      shelfStatus: book.shelfStatus ?? "on-shelf",
      coverPath: typeof book.coverPath === "string" && book.coverPath.length > 0 ? book.coverPath : undefined,
      coverUrl: typeof (book.coverUrl ?? book.cover) === "string" && (book.coverUrl ?? book.cover)?.length ? book.coverUrl ?? book.cover : undefined,
      bookFilePath: typeof book.bookFilePath === "string" && book.bookFilePath.length > 0 ? book.bookFilePath : undefined,
      notePath: typeof book.notePath === "string" && book.notePath.length > 0 ? book.notePath : undefined,
      startDate: book.startDate,
      finishDate: readingStatus === "finished" ? book.finishDate : book.finishDate,
      createdAt: timestamp,
      updatedAt: book.updatedAt ?? timestamp,
      tagIds,
      tags: tagNames.length > 0 ? tagNames : Array.isArray(book.tags) ? book.tags : []
    };
    if (normalized.readingStatus === "reading") normalized.startDate = normalized.startDate || formatDateKey(new Date());
    if (normalized.readingStatus === "finished") {
      normalized.currentPage = normalized.totalPages;
      normalized.startDate = normalized.startDate || formatDateKey(new Date());
      normalized.finishDate = normalized.finishDate || formatDateKey(new Date());
    }
    return normalized;
  }

  private normalizeWantToReadItem(item: WantToReadItem): WantToReadItem {
    const timestamp = item.createdAt ?? nowIso();
    return {
      id: item.id ?? `want-read-${Date.now()}`,
      title: item.title || "未命名书籍",
      author: item.author ?? "",
      summary: item.summary ?? "",
      status: item.status === "added" ? "added" : "pending",
      bookId: item.bookId,
      createdAt: timestamp,
      updatedAt: item.updatedAt ?? timestamp
    };
  }

  private normalizeBookTag(tag: BookTagDefinition, index = 0): BookTagDefinition {
    return {
      id: tag.id || this.definitionId("book-tag", tag.name || `标签${index + 1}`),
      name: tag.name || `标签${index + 1}`,
      color: tag.color || "#f8a8c4",
      order: tag.order ?? (index + 1) * 10
    };
  }

  private normalizeReadingQuote(quote: ReadingQuote): ReadingQuote {
    return {
      id: quote.id ?? `quote-${Date.now()}`,
      text: quote.text || "",
      source: quote.source ?? "",
      bookId: quote.bookId,
      note: quote.note ?? "",
      style: quote.style ?? "default",
      backgroundColor: quote.backgroundColor ?? "#fff7fb"
    };
  }

  private normalizeResearchPaper(paper: ResearchPaper): ResearchPaper {
    const now = Date.now();
    const statusName = typeof paper.status === "string" ? paper.status : "未读";
    const venueName = typeof paper.venue === "string" ? paper.venue : "";
    const tagNames = Array.isArray(paper.tags) ? paper.tags : [];
    const statusId = paper.statusId || this.paperStatusIdFromName(statusName);
    const venueId = paper.venueId || (venueName ? this.definitionId("venue", venueName) : undefined);
    const tagIds = Array.from(new Set([
      ...(Array.isArray(paper.tagIds) ? paper.tagIds : []),
      ...tagNames.map((tag) => this.definitionId("paper-tag", tag))
    ]));
    const statusDefinition = this.data?.paperStatuses?.find((item) => item.id === statusId)
      ?? DEFAULT_DATA.paperStatuses.find((item) => item.id === statusId);
    return {
      ...paper,
      id: paper.id ?? `paper-${now}`,
      title: paper.title || "未命名论文",
      venue: venueName || this.data?.paperVenues?.find((item) => item.id === venueId)?.name || "",
      venueId,
      year: Number(paper.year) || new Date().getFullYear(),
      status: statusDefinition?.name ?? statusName,
      statusId,
      readingProgress: Math.max(0, Math.min(100, Number(paper.readingProgress) || 0)),
      paperUrl: paper.paperUrl,
      doi: paper.doi,
      readingStartDate: paper.readingStartDate,
      readingEndDate: paper.readingEndDate,
      researchProjectId: paper.researchProjectId,
      tags: tagNames,
      tagIds,
      notePath: paper.notePath,
      createdAt: paper.createdAt ?? now,
      updatedAt: paper.updatedAt ?? now,
      zoteroItemKey: paper.zoteroItemKey,
      citekey: paper.citekey
    };
  }

  private normalizeResearchProject(project: ResearchProject): ResearchProject {
    const tagIds = Array.from(new Set([
      ...(Array.isArray(project.tagIds) ? project.tagIds : []),
      ...(Array.isArray(project.tags) ? project.tags : [])
        .map((tag) => this.data?.paperTags?.find((definition) => definition.name.toLowerCase() === tag.toLowerCase())?.id)
        .filter(Boolean) as string[]
    ]));
    return {
      ...project,
      title: project.title || "未命名项目",
      description: project.description ?? "",
      progress: Math.max(0, Math.min(100, Number(project.progress) || 0)),
      tags: Array.isArray(project.tags) ? project.tags : [],
      tagIds
    };
  }

  private normalizeLiteratureNote(note: LiteratureNote): LiteratureNote {
    const now = Date.now();
    return {
      id: note.id ?? `literature-note-${now}`,
      title: note.title || "文献笔记",
      notePath: typeof note.notePath === "string" ? note.notePath : "",
      paperReadingId: note.paperReadingId,
      createdAt: note.createdAt ?? now,
      updatedAt: note.updatedAt ?? note.createdAt ?? now
    };
  }

  private normalizeExperiment(experiment: ExperimentPlan, mode: "plan" | "records"): ExperimentPlan {
    return {
      ...experiment,
      id: experiment.id ?? `experiment-${Date.now()}`,
      title: experiment.title || "未命名实验",
      date: experiment.date || todayKey(),
      status: experiment.status || "计划中",
      notePath: typeof experiment.notePath === "string" && experiment.notePath.length > 0 ? experiment.notePath : undefined,
      researchProjectId: mode === "plan" ? experiment.researchProjectId : undefined,
      experimentPlanId: mode === "records" ? experiment.experimentPlanId : undefined
    };
  }

  private repairResearchRelations(data: WorkbenchData): WorkbenchData {
    const projectIds = new Set(data.researchProjects.map((project) => project.id));
    const paperIds = new Set(data.researchPapers.map((paper) => paper.id));
    const planIds = new Set(data.experimentPlans.map((plan) => plan.id));
    data.researchPapers.forEach((paper) => {
      if (paper.researchProjectId && !projectIds.has(paper.researchProjectId)) paper.researchProjectId = undefined;
    });
    data.experimentPlans.forEach((plan) => {
      if (plan.researchProjectId && !projectIds.has(plan.researchProjectId)) plan.researchProjectId = undefined;
    });
    data.literatureNotes.forEach((note) => {
      if (note.paperReadingId && !paperIds.has(note.paperReadingId)) note.paperReadingId = undefined;
    });
    data.experimentRecords.forEach((record) => {
      if (record.experimentPlanId && !planIds.has(record.experimentPlanId)) record.experimentPlanId = undefined;
    });
    return data;
  }

  private repairBookTagRelations(data: WorkbenchData): WorkbenchData {
    const tagIds = new Set(data.bookTags.map((tag) => tag.id));
    data.books.forEach((book) => {
      book.tagIds = (book.tagIds ?? []).filter((id) => tagIds.has(id));
      book.tags = (book.tagIds ?? [])
        .map((id) => data.bookTags.find((tag) => tag.id === id)?.name)
        .filter(Boolean) as string[];
    });
    return data;
  }

  private repairFitnessRelations(data: WorkbenchData): WorkbenchData {
    const goalIds = new Set(data.fitnessGoals.map((goal) => goal.id));
    const planIds = new Set(data.trainingPlans.map((plan) => plan.id));
    data.trainingPlans.forEach((plan) => {
      if (plan.fitnessGoalId && !goalIds.has(plan.fitnessGoalId)) plan.fitnessGoalId = undefined;
    });
    data.workouts.forEach((workout) => {
      if (workout.trainingPlanId && !planIds.has(workout.trainingPlanId)) workout.trainingPlanId = undefined;
      if (workout.fitnessGoalId && !goalIds.has(workout.fitnessGoalId)) workout.fitnessGoalId = undefined;
    });
    return data;
  }

  private createInitialLiteratureNotes(partial: Partial<WorkbenchData>): LiteratureNote[] {
    if (!Array.isArray(partial.researchPapers)) {
      return structuredClone(DEFAULT_DATA.literatureNotes).map((note) => this.normalizeLiteratureNote(note)).filter((note) => note.notePath);
    }
    return partial.researchPapers
      .filter((paper) => typeof paper.notePath === "string" && paper.notePath.length > 0)
      .map((paper) => this.normalizeLiteratureNote({
        id: `literature-note-${paper.id}`,
        title: `${paper.title || "文献"} 笔记`,
        notePath: paper.notePath ?? "",
        paperReadingId: paper.id,
        createdAt: paper.createdAt ?? Date.now(),
        updatedAt: paper.updatedAt ?? Date.now()
      }));
  }

  private mergePaperStatuses(partial: Partial<WorkbenchData>): PaperStatusDefinition[] {
    const map = new Map<string, PaperStatusDefinition>();
    structuredClone(DEFAULT_DATA.paperStatuses).forEach((item) => map.set(item.id, item));
    if (Array.isArray(partial.paperStatuses)) {
      partial.paperStatuses.forEach((item) => map.set(item.id, item));
    }
    if (Array.isArray(partial.researchPapers)) {
      partial.researchPapers.forEach((paper) => {
        if (paper.status && !map.has(this.paperStatusIdFromName(paper.status))) {
          const id = this.paperStatusIdFromName(paper.status);
          map.set(id, { id, name: paper.status, color: "#f8a8c4", order: map.size * 10 + 10 });
        }
      });
    }
    return [...map.values()].sort((a, b) => a.order - b.order);
  }

  private mergePaperVenues(partial: Partial<WorkbenchData>): VenueDefinition[] {
    const map = new Map<string, VenueDefinition>();
    structuredClone(DEFAULT_DATA.paperVenues).forEach((item) => map.set(item.id, item));
    if (Array.isArray(partial.paperVenues)) {
      partial.paperVenues.forEach((item) => map.set(item.id, item));
    }
    if (Array.isArray(partial.researchPapers)) {
      partial.researchPapers.forEach((paper) => {
        if (!paper.venue) return;
        const id = paper.venueId || this.definitionId("venue", paper.venue);
        if (!map.has(id)) map.set(id, { id, name: paper.venue, type: "other", color: "#76c7f2" });
      });
    }
    return [...map.values()];
  }

  private mergePaperTags(partial: Partial<WorkbenchData>): PaperTagDefinition[] {
    const map = new Map<string, PaperTagDefinition>();
    structuredClone(DEFAULT_DATA.paperTags).forEach((item) => map.set(item.id, item));
    if (Array.isArray(partial.paperTags)) {
      partial.paperTags.forEach((item) => map.set(item.id, item));
    }
    if (Array.isArray(partial.researchPapers)) {
      partial.researchPapers.forEach((paper) => {
        (paper.tags ?? []).forEach((tag) => {
          const id = this.definitionId("paper-tag", tag);
          if (!map.has(id)) map.set(id, { id, name: tag, color: "#ffd166" });
        });
      });
    }
    return [...map.values()];
  }

  private mergeBookTags(partial: Partial<WorkbenchData>): BookTagDefinition[] {
    const map = new Map<string, BookTagDefinition>();
    structuredClone(DEFAULT_DATA.bookTags).forEach((item, index) => map.set(item.id, this.normalizeBookTag(item, index)));
    if (Array.isArray(partial.bookTags)) {
      partial.bookTags.forEach((item, index) => map.set(item.id, this.normalizeBookTag(item, index)));
    }
    if (Array.isArray(partial.books)) {
      partial.books.forEach((book) => {
        (book.tags ?? []).forEach((name) => {
          const id = this.definitionId("book-tag", name);
          if (!map.has(id)) map.set(id, { id, name, color: "#f8a8c4", order: map.size * 10 + 10 });
        });
      });
    }
    return [...map.values()].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }

  private createInitialWantToReadItems(partial: Partial<WorkbenchData>): WantToReadItem[] {
    if (!Array.isArray(partial.books)) return structuredClone(DEFAULT_DATA.wantToReadItems).map((item) => this.normalizeWantToReadItem(item));
    return partial.books
      .map((book) => this.normalizeBook(book))
      .filter((book) => book.readingStatus === "want-to-read")
      .map((book) => this.normalizeWantToReadItem({
        id: `want-read-${book.id}`,
        title: book.title,
        author: book.author,
        summary: book.description ?? "",
        status: "pending",
        createdAt: book.createdAt ?? nowIso(),
        updatedAt: book.updatedAt ?? book.createdAt ?? nowIso()
      }));
  }

  private syncLegacyBookTags(): void {
    this.data.books.forEach((book) => {
      const ids = Array.isArray(book.tagIds) ? book.tagIds : [];
      book.tags = ids
        .map((id) => this.data.bookTags.find((tag) => tag.id === id)?.name)
        .filter(Boolean) as string[];
    });
  }

  private paperStatusIdFromName(name: string): string {
    if (name === "未开始" || name === "未读") return "paper-status-unread";
    if (name === "计划阅读") return "paper-status-planned";
    if (name === "进行中" || name === "阅读中") return "paper-status-reading";
    if (name === "已完成" || name === "已读") return "paper-status-finished";
    if (name === "暂停") return "paper-status-paused";
    return this.definitionId("paper-status", name);
  }

  private definitionId(prefix: string, name: string): string {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    if (slug) return `${prefix}-${slug}`;
    let hash = 0;
    for (let index = 0; index < name.length; index += 1) {
      hash = ((hash << 5) - hash + name.charCodeAt(index)) | 0;
    }
    return `${prefix}-${Math.abs(hash)}`;
  }

  private findExistingZoteroPaper(item: ZoteroPaperImportInput): ResearchPaper | undefined {
    return this.data.researchPapers.find((paper) => {
      if (item.zoteroItemKey && paper.zoteroItemKey === item.zoteroItemKey) return true;
      if (item.citekey && paper.citekey === item.citekey) return true;
      if (item.doi && paper.doi?.toLowerCase() === item.doi.toLowerCase()) return true;
      if (item.paperUrl && paper.paperUrl === item.paperUrl) return true;
      return false;
    });
  }

  private async ensurePaperVenue(name: string): Promise<string> {
    const existing = this.data.paperVenues.find((venue) => venue.name.toLowerCase() === name.toLowerCase());
    if (existing) return existing.id;
    const id = this.definitionId("venue", name);
    this.data.paperVenues.push({ id, name, type: "other", color: "#76c7f2" });
    return id;
  }

  private async ensurePaperTags(tags: string[]): Promise<string[]> {
    return tags.filter(Boolean).map((name) => {
      const existing = this.data.paperTags.find((tag) => tag.name.toLowerCase() === name.toLowerCase());
      if (existing) return existing.id;
      const id = this.definitionId("paper-tag", name);
      this.data.paperTags.push({ id, name, color: "#ffd166" });
      return id;
    });
  }

  private readingStatusFromLegacy(status: BookItem["status"] | undefined): NonNullable<BookItem["readingStatus"]> {
    if (status === "在读") return "reading";
    if (status === "已读") return "finished";
    return "want-to-read";
  }

  private legacyBookStatus(status: BookItem["readingStatus"]): BookItem["status"] {
    if (status === "reading") return "在读";
    if (status === "finished") return "已读";
    return "想读";
  }

  private normalizeReadingPlan(plan: ReadingPlan): ReadingPlan {
    const timestamp = plan.createdAt ?? nowIso();
    const today = todayKey();
    const startDate = plan.startDate || today;
    const endDate = plan.endDate && plan.endDate >= startDate ? plan.endDate : startDate;
    const progress = Math.max(0, Math.min(100, Number(plan.progress ?? (plan.status === "completed" ? 100 : 0)) || 0));
    const completedDate = plan.completedDate ?? plan.completedAt?.slice(0, 10);
    const status = progress >= 100 || plan.status === "completed" || completedDate ? "completed" : plan.status ?? "planned";
    const completedAt = status === "completed" ? plan.completedAt ?? `${completedDate ?? today}T00:00:00.000Z` : undefined;
    return {
      ...plan,
      id: plan.id ?? `reading-plan-${Date.now()}`,
      bookId: plan.bookId,
      startDate,
      endDate,
      targetPages: plan.targetPages === undefined ? undefined : Math.max(0, Number(plan.targetPages) || 0),
      goal: plan.goal ?? (plan.targetPages ? `${plan.targetPages} 页` : "读完本书"),
      progress,
      note: plan.note ?? "",
      status,
      completedDate: status === "completed" ? completedDate ?? today : undefined,
      completedAt,
      createdAt: timestamp,
      updatedAt: plan.updatedAt ?? timestamp
    };
  }

  private withComputedReadingPlanStatus(plan: ReadingPlan): ReadingPlan {
    const completedDate = plan.completedDate ?? plan.completedAt?.slice(0, 10);
    if (plan.progress === 100 || plan.status === "completed" || completedDate) {
      return { ...plan, status: "completed", completedDate: completedDate ?? todayKey() };
    }
    const today = todayKey();
    if (today < plan.startDate) return { ...plan, status: "planned" };
    if (today > plan.endDate) return { ...plan, status: "overdue" };
    return { ...plan, status: "active" };
  }

  private normalizeReadingNote(note: ReadingNote): ReadingNote {
    const timestamp = note.createdAt ?? nowIso();
    return {
      id: note.id ?? `reading-note-${Date.now()}`,
      title: note.title || this.fileName(note.notePath) || "阅读笔记",
      notePath: typeof note.notePath === "string" ? note.notePath : "",
      bookId: note.bookId,
      createdAt: timestamp,
      updatedAt: note.updatedAt ?? timestamp
    };
  }

  private createInitialReadingPlans(partial: Partial<WorkbenchData>): ReadingPlan[] {
    if (!Array.isArray(partial.books)) {
      return structuredClone(DEFAULT_DATA.readingPlans).map((plan) => this.normalizeReadingPlan(plan));
    }
    const timestamp = nowIso();
    return partial.books
      .map((book) => this.normalizeBook(book))
      .filter((book) => book.readingStatus === "reading")
      .map((book) => this.normalizeReadingPlan({
        id: `reading-plan-${book.id}`,
        bookId: book.id,
        startDate: book.startDate || todayKey(),
        endDate: book.finishDate || todayKey(),
        targetPages: book.totalPages,
        goal: "读完整本书",
        progress: book.totalPages > 0 ? Math.round((book.currentPage / book.totalPages) * 100) : 0,
        note: "由旧阅读状态迁移生成。",
        status: "active",
        createdAt: timestamp,
        updatedAt: timestamp
      }));
  }

  private createInitialReadingNotes(partial: Partial<WorkbenchData>): ReadingNote[] {
    const books = Array.isArray(partial.books) ? partial.books : DEFAULT_DATA.books;
    return books
      .map((book) => this.normalizeBook(book))
      .filter((book) => typeof book.notePath === "string" && book.notePath.length > 0)
      .map((book) => this.normalizeReadingNote({
        id: `reading-note-${book.id}`,
        title: `${book.title} 阅读笔记`,
        notePath: book.notePath ?? "",
        bookId: book.id,
        createdAt: book.createdAt ?? nowIso(),
        updatedAt: book.updatedAt ?? book.createdAt ?? nowIso()
      }));
  }

  private fileName(path: string): string {
    return path.split(/[\\/]/).pop()?.replace(/\.md$/i, "") ?? "";
  }

  private createInitialGoalActions(partial: Partial<WorkbenchData>): GoalAction[] {
    const goals = Array.isArray(partial.goals) ? partial.goals : DEFAULT_DATA.goals;
    const fallbackGoal = goals[0];
    const actions: GoalAction[] = [];
    goals.forEach((goal, index) => {
      actions.push(this.normalizeGoalAction({
        id: `goal-action-root-${goal.id}`,
        goalId: goal.id,
        title: `${goal.title} 拆解`,
        description: goal.description,
        status: goal.status === "已完成" ? "completed" : goal.status === "未开始" ? "todo" : "in-progress",
        deadline: goal.deadline,
        progress: goal.progress,
        note: "",
        createdAt: Date.now() + index,
        updatedAt: Date.now() + index
      }));
    });
    if (Array.isArray(partial.milestones)) {
      partial.milestones.forEach((milestone, index) => {
        actions.push(this.normalizeGoalAction({
          id: `goal-action-milestone-${milestone.id}`,
          goalId: milestone.goalId || fallbackGoal?.id || "goal-default",
          title: milestone.title,
          status: milestone.status === "已完成" ? "completed" : milestone.status === "未开始" ? "todo" : "in-progress",
          deadline: milestone.date,
          progress: milestone.status === "已完成" ? 100 : 0,
          isMilestone: true,
          milestoneDate: milestone.date,
          note: "",
          createdAt: Date.now() + 100 + index,
          updatedAt: Date.now() + 100 + index
        }));
      });
    }
    if (Array.isArray(partial.priorityMatrixItems)) {
      partial.priorityMatrixItems.forEach((item, index) => {
        actions.push(this.normalizeGoalAction({
          id: `goal-action-priority-${item.id}`,
          goalId: fallbackGoal?.id || "goal-default",
          title: item.title,
          status: item.completed ? "completed" : "todo",
          progress: item.completed ? 100 : 0,
          importance: item.quadrant.includes("important") && !item.quadrant.includes("not-important") ? "important" : "not-important",
          urgency: item.quadrant.includes("urgent") && !item.quadrant.includes("not-urgent") ? "urgent" : "not-urgent",
          note: item.note,
          createdAt: Date.now() + 200 + index,
          updatedAt: Date.now() + 200 + index
        }));
      });
    }
    return actions;
  }

  private syncGoalActionSegments(action: GoalAction): void {
    const normalized = this.normalizeGoalAction(action);
    const existingMonthly = new Map(this.data.keyResults
      .filter((item) => item.autoGenerated && item.sourceGoalActionId === normalized.id)
      .map((item) => [`${item.segmentStartDate}|${item.segmentEndDate}`, item]));
    const existingQuarterly = new Map(this.data.objectives
      .filter((item) => item.autoGenerated && item.sourceGoalActionId === normalized.id)
      .map((item) => [`${item.segmentStartDate}|${item.segmentEndDate}`, item]));
    this.removeAutoSegmentsForGoalAction(normalized.id);

    if (!normalized.startDate || !normalized.deadline) return;
    if (normalized.durationDays && normalized.durationDays <= 30) {
      this.getMonthSegments(normalized.startDate, normalized.deadline).forEach((segment, index) => {
        const key = `${segment.startDate}|${segment.endDate}`;
        const previous = existingMonthly.get(key);
        this.data.keyResults.push(this.normalizeKeyResult({
          id: previous?.id ?? `kr-auto-${normalized.id}-${segment.year}-${segment.month}-${index}`,
          objectiveId: previous?.objectiveId ?? "",
          title: normalized.title,
          progress: normalized.status === "completed" ? 100 : previous?.segmentProgress ?? previous?.progress ?? normalized.progress ?? 0,
          completed: normalized.status === "completed",
          completedDate: normalized.status === "completed" ? normalized.completedDate ?? formatDateKey(new Date()) : undefined,
          year: segment.year,
          month: segment.month,
          autoGenerated: true,
          sourceGoalActionId: normalized.id,
          segmentType: "monthly",
          segmentStartDate: segment.startDate,
          segmentEndDate: segment.endDate,
          segmentNote: previous?.segmentNote ?? "",
          segmentProgress: normalized.status === "completed" ? 100 : previous?.segmentProgress ?? previous?.progress ?? normalized.progress ?? 0,
          updatedAt: Date.now()
        }));
      });
      return;
    }

    this.getQuarterSegments(normalized.startDate, normalized.deadline).forEach((segment, index) => {
      const key = `${segment.startDate}|${segment.endDate}`;
      const previous = existingQuarterly.get(key);
      this.data.objectives.push(this.normalizeObjective({
        id: previous?.id ?? `objective-auto-${normalized.id}-${segment.year}-q${segment.quarterNumber}-${index}`,
        title: normalized.title,
        quarter: `${segment.year} Q${segment.quarterNumber}`,
        year: segment.year,
        quarterNumber: segment.quarterNumber,
        progress: normalized.status === "completed" ? 100 : previous?.segmentProgress ?? previous?.progress ?? normalized.progress ?? 0,
        completedDate: normalized.status === "completed" ? normalized.completedDate ?? formatDateKey(new Date()) : undefined,
        autoGenerated: true,
        sourceGoalActionId: normalized.id,
        segmentType: "quarterly",
        segmentStartDate: segment.startDate,
        segmentEndDate: segment.endDate,
        segmentNote: previous?.segmentNote ?? "",
        segmentProgress: normalized.status === "completed" ? 100 : previous?.segmentProgress ?? previous?.progress ?? normalized.progress ?? 0,
        updatedAt: Date.now()
      }));
    });
  }

  private syncGoalActionWithAncestors(action: GoalAction): void {
    let current: GoalAction | undefined = action;
    const seen = new Set<string>();
    while (current && !seen.has(current.id)) {
      seen.add(current.id);
      this.syncGoalActionSegments(this.withGoalActionComputedState(current));
      current = current.parentId ? this.data.goalActions.find((item) => item.id === current?.parentId) : undefined;
    }
  }

  private removeAutoSegmentsForGoalAction(actionId: string): void {
    this.data.keyResults = this.data.keyResults.filter((item) => !(item.autoGenerated && item.sourceGoalActionId === actionId));
    this.data.objectives = this.data.objectives.filter((item) => !(item.autoGenerated && item.sourceGoalActionId === actionId));
  }

  private getNaturalDurationDays(startDate: string, deadline: string): number {
    const start = this.parseDateOnly(startDate);
    const end = this.parseDateOnly(deadline);
    if (!start || !end) return 1;
    return Math.max(1, Math.floor((end.getTime() - start.getTime()) / 86400000) + 1);
  }

  private getMonthSegments(startDate: string, deadline: string): Array<{ year: number; month: number; startDate: string; endDate: string }> {
    const start = this.parseDateOnly(startDate);
    const end = this.parseDateOnly(deadline);
    if (!start || !end) return [];
    const segments: Array<{ year: number; month: number; startDate: string; endDate: string }> = [];
    const cursor = new Date(start.getFullYear(), start.getMonth(), 1);
    while (cursor <= end) {
      const year = cursor.getFullYear();
      const month = cursor.getMonth() + 1;
      const monthStart = new Date(year, cursor.getMonth(), 1);
      const monthEnd = new Date(year, cursor.getMonth() + 1, 0);
      const segmentStart = start > monthStart ? start : monthStart;
      const segmentEnd = end < monthEnd ? end : monthEnd;
      segments.push({ year, month, startDate: formatDateKey(segmentStart), endDate: formatDateKey(segmentEnd) });
      cursor.setMonth(cursor.getMonth() + 1);
    }
    return segments;
  }

  private getQuarterSegments(startDate: string, deadline: string): Array<{ year: number; quarterNumber: 1 | 2 | 3 | 4; startDate: string; endDate: string }> {
    const start = this.parseDateOnly(startDate);
    const end = this.parseDateOnly(deadline);
    if (!start || !end) return [];
    const segments: Array<{ year: number; quarterNumber: 1 | 2 | 3 | 4; startDate: string; endDate: string }> = [];
    const cursor = new Date(start.getFullYear(), Math.floor(start.getMonth() / 3) * 3, 1);
    while (cursor <= end) {
      const year = cursor.getFullYear();
      const quarterNumber = this.getQuarter(cursor);
      const quarterStart = new Date(year, (quarterNumber - 1) * 3, 1);
      const quarterEnd = new Date(year, quarterNumber * 3, 0);
      const segmentStart = start > quarterStart ? start : quarterStart;
      const segmentEnd = end < quarterEnd ? end : quarterEnd;
      segments.push({ year, quarterNumber, startDate: formatDateKey(segmentStart), endDate: formatDateKey(segmentEnd) });
      cursor.setMonth(cursor.getMonth() + 3);
    }
    return segments;
  }

  private getQuarter(date: Date): 1 | 2 | 3 | 4 {
    return Math.floor(date.getMonth() / 3) + 1 as 1 | 2 | 3 | 4;
  }

  private parseDateOnly(value: string): Date | null {
    const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return null;
    return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  }

  private normalizeInvestmentWatchItem(item: InvestmentWatchItem): InvestmentWatchItem {
    return {
      id: item.id ?? `watch-${Date.now()}`,
      name: item.name || "投资观察",
      code: item.code || "",
      price: Number(item.price) || 0,
      changePercent: Number(item.changePercent) || 0,
      type: item.type || "其它",
      note: item.note ?? ""
    };
  }

  private createInitialInvestmentSnapshots(items: InvestmentWatchItem[]): InvestmentSnapshot[] {
    const date = todayKey();
    const createdAt = nowIso();
    return items.map((item) => ({
      id: `snapshot-${item.id}-${date}`,
      investmentId: item.id,
      date,
      price: Number(item.price) || 0,
      changePercent: Number(item.changePercent) || 0,
      note: item.note ?? "",
      createdAt
    }));
  }

  private migrateSections(sections: DashboardSectionConfig[]): DashboardSectionConfig[] {
    const pages: DashboardPage[] = ["overview", "research", "reading", "fitness", "finance", "goals", "modules"];
    const migrated = sections.filter((section) => section.type !== "module-settings");

    pages.forEach((page) => {
      if (!sections.some((section) => section.page === page)) {
        migrated.push(...structuredClone(DEFAULT_DATA.sections.filter((section) => section.page === page)));
      }
    });
    migrated.forEach((section) => {
      if (section.type === "water-sleep-habits") {
        section.title = "习惯";
      }
      if (section.type === "quarterly-okr") {
        section.title = "季度目标";
      }
      if (section.type === "monthly-key-results") {
        section.title = "月度目标";
      }
    });

    const hasNewOverviewLayout = migrated.some((section) => section.type === "weekly-completion");
    if (!hasNewOverviewLayout) {
      return this.withRequiredSections([
        ...structuredClone(DEFAULT_DATA.sections.filter((section) => section.page === "overview")),
        ...migrated.filter((section) => section.page !== "overview")
      ]);
    }

    return this.withRequiredSections(migrated);
  }

  private migrateModuleLayouts(partial: Partial<WorkbenchData>): Record<DashboardPage, ModuleLayoutConfig> {
    const legacy = partial as Partial<WorkbenchData> & { layoutMode?: ModuleLayoutMode };
    const fallbackMode = legacy.layoutMode ?? partial.userSettings?.overviewLayout ?? DEFAULT_DATA.userSettings.overviewLayout;
    const layouts = structuredClone(DEFAULT_MODULE_LAYOUTS);
    (Object.keys(layouts) as DashboardPage[]).forEach((page) => {
      const saved = partial.moduleLayouts?.[page];
      layouts[page] = this.normalizeModuleLayout(saved ?? { ...layouts[page], mode: fallbackMode });
    });
    return layouts;
  }

  private normalizeModuleLayout(layout: Partial<ModuleLayoutConfig> | undefined): ModuleLayoutConfig {
    const mode: ModuleLayoutMode = layout?.mode === "compact" || layout?.mode === "minimal" || layout?.mode === "custom"
      ? layout.mode
      : "default";
    const requestedColumns = Number(layout?.columns) || this.columnsForLayoutMode(mode);
    const columns = mode === "minimal"
      ? 1
      : mode === "default"
        ? 12
        : mode === "compact"
          ? 16
          : Math.max(2, Math.min(12, requestedColumns));
    const sections: NonNullable<ModuleLayoutConfig["sections"]> = {};
    Object.entries(layout?.sections ?? {}).forEach(([sectionId, sectionLayout]) => {
      sections[sectionId] = {
        order: sectionLayout.order,
        colSpan: sectionLayout.colSpan === undefined ? undefined : Math.max(1, Math.min(columns, Number(sectionLayout.colSpan) || 1)),
        rowSpan: sectionLayout.rowSpan === undefined ? undefined : Math.max(1, Math.min(12, Number(sectionLayout.rowSpan) || 1))
      };
    });
    return {
      mode,
      columns,
      templateId: typeof layout?.templateId === "string" ? layout.templateId : undefined,
      sections
    };
  }

  private ensureSectionLayout(page: DashboardPage, sectionId: string, fallbackOrder: number): void {
    const layout = this.data.moduleLayouts[page] ?? structuredClone(DEFAULT_MODULE_LAYOUTS[page]);
    layout.sections = layout.sections ?? {};
    layout.sections[sectionId] = {
      order: fallbackOrder,
      colSpan: 1,
      rowSpan: 1,
      ...layout.sections[sectionId]
    };
    this.data.moduleLayouts[page] = this.normalizeModuleLayout(layout);
  }

  private getSectionLayoutOrder(section: DashboardSectionConfig, layout: ModuleLayoutConfig): number {
    return layout.sections?.[section.id]?.order ?? section.order;
  }

  private columnsForLayoutMode(mode: ModuleLayoutMode): number {
    if (mode === "compact") return 16;
    if (mode === "minimal") return 1;
    return 12;
  }

  private normalizeFocusRecord(record: FocusRecord): FocusRecord {
    const createdAt = record.createdAt ?? record.endedAt ?? new Date().toISOString();
    const date = record.date ?? createdAt.slice(0, 10);
    const actualDuration = record.actualDurationMinutes ?? record.duration ?? 0;
    const plannedDuration = record.plannedDurationMinutes ?? record.plannedDuration ?? actualDuration;
    return {
      ...record,
      date,
      createdAt,
      duration: actualDuration,
      actualDurationMinutes: actualDuration,
      plannedDuration,
      plannedDurationMinutes: plannedDuration
    };
  }

  private withRequiredSections(sections: DashboardSectionConfig[]): DashboardSectionConfig[] {
    const migrated = [...sections];
    if (!migrated.some((section) => section.type === "section-manager")) {
      const sectionManager = DEFAULT_DATA.sections.find((section) => section.type === "section-manager");
      if (sectionManager) {
        migrated.push(structuredClone(sectionManager));
      }
    }
    if (!migrated.some((section) => section.page === "finance" && section.type === "finance-ledger")) {
      const ledger = DEFAULT_DATA.sections.find((section) => section.type === "finance-ledger");
      if (ledger) {
        migrated.push(structuredClone(ledger));
      }
    }
    if (!migrated.some((section) => section.page === "research" && section.type === "paper-field-manager")) {
      const paperFields = DEFAULT_DATA.sections.find((section) => section.type === "paper-field-manager");
      if (paperFields) {
        migrated.push(structuredClone(paperFields));
      }
    }

    return migrated;
  }
}

export const DEFAULT_HABITS = [
  { id: "reading", label: "阅读" },
  { id: "fitness", label: "健身" },
  { id: "finance", label: "理财" },
  { id: "writing", label: "写作" },
  { id: "study", label: "学习" }
];

export const RESEARCH_HABITS = [
  { id: "research-reading-paper", label: "阅读论文" },
  { id: "research-experiment", label: "实验" },
  { id: "research-writing", label: "写作" },
  { id: "research-data", label: "整理数据" },
  { id: "research-meeting", label: "组会准备" }
];

export const READING_HABITS = [
  { id: "reading-pages", label: "读书" },
  { id: "reading-note", label: "写笔记" },
  { id: "reading-quote", label: "摘录" },
  { id: "reading-review", label: "复盘" },
  { id: "reading-plan", label: "计划" }
];

export const FITNESS_HABITS = [
  { id: "fitness-workout", label: "训练" },
  { id: "fitness-water", label: "饮水" },
  { id: "fitness-sleep", label: "睡眠" },
  { id: "fitness-stretch", label: "拉伸" },
  { id: "fitness-recovery", label: "恢复" }
];

export interface ZoteroPaperImportInput {
  zoteroItemKey?: string;
  citekey?: string;
  title: string;
  venue?: string;
  year?: number;
  doi?: string;
  paperUrl?: string;
  tags: string[];
}

export const FINANCE_HABITS = [
  { id: "finance-record", label: "记账" },
  { id: "finance-budget", label: "预算" },
  { id: "finance-review", label: "复盘" },
  { id: "finance-save", label: "储蓄" },
  { id: "finance-invest", label: "观察" }
];

export const GOAL_HABITS = [
  { id: "goals-plan", label: "计划" },
  { id: "goals-action", label: "行动" },
  { id: "goals-review", label: "复盘" },
  { id: "goals-focus", label: "聚焦" },
  { id: "goals-adjust", label: "调整" }
];

export function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
