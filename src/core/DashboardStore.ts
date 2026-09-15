import type {
  AvailableModuleDefinition,
  Account,
  ApexHabitSettings,
  Bill,
  BookItem,
  BodyMeasurement,
  Budget,
  CalendarTodo,
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
  HealthReminder,
  HealthReminderLog,
  InvestmentWatchItem,
  KeyResult,
  Milestone,
  Objective,
  QuickActionConfig,
  PriorityMatrixItem,
  ReadingQuote,
  ResearchDeadline,
  ResearchPaper,
  ResearchProject,
  Risk,
  SavingGoal,
  TodayFocusTask,
  Transaction,
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
  { type: "water-sleep-habits", title: "饮水与睡眠习惯", description: "恢复相关习惯记录。", page: "fitness", icon: "moon", defaultWidth: "md" },
  { type: "fitness-stats", title: "热量消耗与运动时长", description: "统计本周运动量。", page: "fitness", icon: "flame", defaultWidth: "md" },
  { type: "workout-log", title: "运动日志", description: "最近完成的训练记录。", page: "fitness", icon: "notebook-text", defaultWidth: "md" },
  { type: "fitness-goals", title: "健身目标进度", description: "追踪健身目标完成度。", page: "fitness", icon: "target", defaultWidth: "md" },
  { type: "health-reminders", title: "健康提醒", description: "恢复、热身和休息提醒。", page: "fitness", icon: "bell-ring", defaultWidth: "md" },
  { type: "fitness-heatmap", title: "月度运动热力图", description: "按日展示运动活跃度。", page: "fitness", icon: "activity", defaultWidth: "md" },
  { type: "monthly-budget", title: "本月预算", description: "预算、支出和剩余额度。", page: "finance", icon: "wallet-cards", defaultWidth: "md" },
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
  { type: "quarterly-okr", title: "季度 OKR", description: "季度 Objective 与 KR。", page: "goals", icon: "target", defaultWidth: "md" },
  { type: "monthly-key-results", title: "月度关键结果", description: "本月需要推进的 KR。", page: "goals", icon: "list-checks", defaultWidth: "md" },
  { type: "goal-breakdown", title: "目标拆解", description: "把目标拆到行动层。", page: "goals", icon: "git-branch", defaultWidth: "md" },
  { type: "milestone-timeline", title: "里程碑时间线", description: "目标里程碑和日期。", page: "goals", icon: "milestone", defaultWidth: "md" },
  { type: "priority-matrix", title: "优先级矩阵", description: "重要紧急四象限。", page: "goals", icon: "layout-dashboard", defaultWidth: "md" },
  { type: "goals-checkin", title: "本周目标打卡", description: "目标推进习惯打卡。", page: "goals", icon: "calendar-check", defaultWidth: "md" },
  { type: "review-checklist", title: "复盘清单", description: "周复盘和月复盘事项。", page: "goals", icon: "clipboard-check", defaultWidth: "md" },
  { type: "risks-blockers", title: "风险与阻碍", description: "识别风险并记录解决方案。", page: "goals", icon: "triangle-alert", defaultWidth: "md" },
  { type: "long-term-progress", title: "长期进展", description: "目标长期趋势和完成率。", page: "goals", icon: "trending-up", defaultWidth: "md" },
  { type: "enabled-modules-overview", title: "已启用模块概览", description: "统计当前页面和整个工作台启用模块。", page: "modules", icon: "panel-top", defaultWidth: "md" },
  { type: "home-layout-manager", title: "首页布局管理", description: "切换默认、紧凑或极简布局。", page: "modules", icon: "layout-template", defaultWidth: "md" },
  { type: "section-manager", title: "功能分区管理", description: "按页面管理启用、隐藏、删除、排序、颜色、宽度和自定义分区。", page: "modules", icon: "rows-3", defaultWidth: "full", defaultHeight: "lg" },
  { type: "module-settings", title: "模块开关与排序", description: "管理模块启用状态和拖动排序。", page: "modules", icon: "sliders-horizontal", defaultWidth: "full" },
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

const DEFAULT_DATA: WorkbenchData = {
  dataVersion: "0.3.3",
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
      order: 70,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "reading-wishlist",
      page: "reading",
      type: "wishlist-books",
      title: "想读清单",
      order: 80,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "reading-stats",
      page: "reading",
      type: "reading-stats",
      title: "阅读进度统计",
      order: 90,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "reading-heatmap",
      page: "reading",
      type: "reading-heatmap",
      title: "月度阅读热力图",
      order: 100,
      enabled: true,
      width: "md",
      height: "md"
    },
    {
      id: "reading-ai-review",
      page: "reading",
      type: "ai-reading-review",
      title: "AI 阅读复盘",
      order: 110,
      enabled: true,
      width: "md",
      height: "md"
    },
    createSection("fitness", "today-workout", "今日训练", 10),
    createSection("fitness", "workout-plan", "训练计划", 20),
    createSection("fitness", "fitness-checkin", "本周健身打卡", 30),
    createSection("fitness", "body-measurements", "体重与围度记录", 40),
    createSection("fitness", "cardio-strength-plan", "有氧 / 力量安排", 50),
    createSection("fitness", "water-sleep-habits", "饮水与睡眠习惯", 60),
    createSection("fitness", "fitness-stats", "热量消耗与运动时长", 70),
    createSection("fitness", "workout-log", "运动日志", 80),
    createSection("fitness", "fitness-goals", "健身目标进度", 90),
    createSection("fitness", "health-reminders", "健康提醒", 100),
    createSection("fitness", "fitness-heatmap", "月度运动热力图", 110),
    createSection("finance", "monthly-budget", "本月预算", 10),
    createSection("finance", "expense-categories", "支出分类", 20),
    createSection("finance", "account-overview", "账户总览", 30),
    createSection("finance", "saving-goals", "储蓄目标", 40),
    createSection("finance", "bill-reminders", "账单提醒", 50),
    createSection("finance", "finance-checkin", "本周理财打卡", 60),
    createSection("finance", "income-expense-trend", "收支趋势", 70),
    createSection("finance", "finance-todos", "本月记账待办", 80),
    createSection("finance", "investment-watch", "投资观察", 90),
    createSection("finance", "expense-heatmap", "月度支出热力图", 100),
    createSection("goals", "yearly-goals", "年度目标", 10),
    createSection("goals", "quarterly-okr", "季度 OKR", 20),
    createSection("goals", "monthly-key-results", "月度关键结果", 30),
    createSection("goals", "goal-breakdown", "目标拆解", 40),
    createSection("goals", "milestone-timeline", "里程碑时间线", 50),
    createSection("goals", "priority-matrix", "优先级矩阵", 60),
    createSection("goals", "goals-checkin", "本周目标打卡", 70),
    createSection("goals", "review-checklist", "复盘清单", 80),
    createSection("goals", "risks-blockers", "风险与阻碍", 90),
    createSection("goals", "long-term-progress", "长期进展", 100),
    createSection("modules", "enabled-modules-overview", "已启用模块概览", 10),
    createSection("modules", "home-layout-manager", "首页布局管理", 20),
    createSection("modules", "section-manager", "功能分区管理", 30, "full", "lg"),
    createSection("modules", "module-settings", "模块开关与排序", 40, "full", "lg"),
    createSection("modules", "banner-background-settings", "Banner 背景设置", 50),
    createSection("modules", "calendar-widget-settings", "日历组件设置", 60),
    createSection("modules", "apex-habit-settings", "Apex 打卡模块设置", 70),
    createSection("modules", "quick-action-settings", "快捷操作配置", 80),
    createSection("modules", "theme-color-settings", "主题与配色", 90),
    createSection("modules", "data-source-status", "数据源", 100)
  ],
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
    { id: "paper-survey-llm", title: "A Survey on Multimodal LLMs", venue: "CVPR", year: 2024, status: "进行中", readingProgress: 62 },
    { id: "paper-single-cell", title: "Single-cell foundation models", venue: "Nature", year: 2024, status: "未开始", readingProgress: 0 },
    { id: "paper-gnn-drug", title: "Graph Neural Networks for Drug Discovery", venue: "ICLR", year: 2024, status: "进行中", readingProgress: 45 }
  ],
  experimentPlans: [
    { id: "exp-cell-drug", title: "细胞系传代与药物处理", date: "2026-09-14", status: "进行中" },
    { id: "exp-western", title: "Western Blot 实验", date: "2026-09-16", status: "未开始" },
    { id: "exp-flow", title: "流式细胞术 FACS", date: "2026-09-18", status: "计划中" }
  ],
  experimentRecords: [
    { id: "record-drug", title: "细胞药物处理记录", date: "2026-09-13", status: "已完成" },
    { id: "record-wb", title: "WB 条带结果", date: "2026-09-12", status: "已完成" },
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
      tags: ["习惯"]
    },
    {
      id: "book-thinking",
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      totalPages: 499,
      currentPage: 0,
      status: "想读",
      tags: ["心理学"]
    }
  ],
  readingQuotes: [
    { id: "quote-1", text: "专注不是拒绝世界，而是选择此刻真正重要的事。", source: "深度工作" },
    { id: "quote-2", text: "微小习惯会在时间里复利。", source: "Atomic Habits" }
  ],
  workouts: [
    { id: "workout-1", date: "2026-09-14", type: "力量", duration: 45, calories: 320, completed: false, note: "下肢力量 + 核心" },
    { id: "workout-2", date: "2026-09-12", type: "有氧", duration: 35, calories: 260, completed: true, note: "椭圆机中等强度" },
    { id: "workout-3", date: "2026-09-10", type: "拉伸", duration: 20, calories: 80, completed: true, note: "肩颈和髋部放松" }
  ],
  bodyMeasurements: [
    { id: "measure-2026-09-01", date: "2026-09-01", weight: 58.8, bmi: 21.6, waist: 70, chest: 84, hip: 91, note: "", createdAt: "2026-09-01T08:00:00.000Z", updatedAt: "2026-09-01T08:00:00.000Z" },
    { id: "measure-2026-09-08", date: "2026-09-08", weight: 58.2, bmi: 21.4, waist: 69, chest: 84, hip: 90, note: "", createdAt: "2026-09-08T08:00:00.000Z", updatedAt: "2026-09-08T08:00:00.000Z" },
    { id: "measure-2026-09-14", date: "2026-09-14", weight: 57.9, bmi: 21.3, waist: 68, chest: 84, hip: 90, note: "", createdAt: "2026-09-14T08:00:00.000Z", updatedAt: "2026-09-14T08:00:00.000Z" }
  ],
  fitnessGoals: [
    { id: "fitness-goal-weight", title: "稳定体重", currentValue: 57.9, targetValue: 56.5, unit: "kg", startDate: "2026-09-01", deadline: "2026-12-31", status: "active", createdAt: "2026-09-01T08:00:00.000Z", updatedAt: "2026-09-14T08:00:00.000Z" },
    { id: "fitness-goal-cardio", title: "本月有氧", currentValue: 210, targetValue: 600, unit: "min", startDate: "2026-09-01", deadline: "2026-09-30", status: "active", createdAt: "2026-09-01T08:00:00.000Z", updatedAt: "2026-09-14T08:00:00.000Z" },
    { id: "fitness-goal-strength", title: "力量训练", currentValue: 6, targetValue: 12, unit: "次", startDate: "2026-09-01", deadline: "2026-09-30", status: "active", createdAt: "2026-09-01T08:00:00.000Z", updatedAt: "2026-09-14T08:00:00.000Z" }
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
    return this.data.sections
      .filter((section) => section.page === page && section.enabled)
      .sort((left, right) => left.order - right.order);
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
    await this.save();
    return section;
  }

  async removeSection(sectionId: string): Promise<void> {
    this.data.sections = this.data.sections.filter((section) => section.id !== sectionId);
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
      }
    });
    await this.save();
  }

  async setOverviewLayout(layout: WorkbenchData["userSettings"]["overviewLayout"]): Promise<void> {
    this.data.userSettings.overviewLayout = layout;
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
    this.data.apexHabitSettings.customHabits.push({
      id: `habit-${Date.now()}`,
      label,
      enabled: true,
      order: nextOrder
    });
    await this.save();
  }

  async updateCustomHabit(habitId: string, updates: Partial<WorkbenchData["apexHabitSettings"]["customHabits"][number]>): Promise<void> {
    const habit = this.data.apexHabitSettings.customHabits.find((item) => item.id === habitId);
    if (!habit) return;
    Object.assign(habit, updates);
    await this.save();
  }

  async deleteCustomHabit(habitId: string): Promise<void> {
    this.data.apexHabitSettings.customHabits = this.data.apexHabitSettings.customHabits.filter((item) => item.id !== habitId);
    await this.save();
  }

  async reorderCustomHabits(orderedIds: string[]): Promise<void> {
    const orderMap = new Map(orderedIds.map((id, index) => [id, (index + 1) * 10]));
    this.data.apexHabitSettings.customHabits.forEach((habit) => {
      const order = orderMap.get(habit.id);
      if (order !== undefined) habit.order = order;
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
    await this.save();
  }

  getResearchPapers(): ResearchPaper[] {
    return this.data.researchPapers;
  }

  async addResearchPaper(paper: ResearchPaper): Promise<void> {
    this.data.researchPapers.push(paper);
    await this.save();
  }

  async updateResearchPaper(paperId: string, updates: Partial<ResearchPaper>): Promise<void> {
    const paper = this.data.researchPapers.find((item) => item.id === paperId);
    if (!paper) return;
    Object.assign(paper, updates);
    await this.save();
  }

  async deleteResearchPaper(paperId: string): Promise<void> {
    this.data.researchPapers = this.data.researchPapers.filter((item) => item.id !== paperId);
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
    } else {
      this.data.experimentRecords = this.data.experimentRecords.filter((item) => item.id !== experimentId);
    }
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

  async addReadingQuote(quote: ReadingQuote): Promise<void> {
    this.data.readingQuotes.push(quote);
    await this.save();
  }

  async updateReadingQuote(quoteId: string, updates: Partial<ReadingQuote>): Promise<void> {
    const quote = this.data.readingQuotes.find((item) => item.id === quoteId);
    if (!quote) return;
    Object.assign(quote, updates);
    await this.save();
  }

  async deleteReadingQuote(quoteId: string): Promise<void> {
    this.data.readingQuotes = this.data.readingQuotes.filter((item) => item.id !== quoteId);
    await this.save();
  }

  async addBook(book: BookItem): Promise<void> {
    this.data.books.push(book);
    await this.save();
  }

  async updateBook(bookId: string, updates: Partial<BookItem>): Promise<void> {
    const book = this.data.books.find((item) => item.id === bookId);
    if (!book) return;
    Object.assign(book, updates);
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
    await this.save();
  }

  async completeBook(bookId: string): Promise<void> {
    const book = this.data.books.find((item) => item.id === bookId);
    if (!book) {
      return;
    }

    book.status = "已读";
    book.currentPage = book.totalPages;
    book.finishDate = formatDateKey(new Date());
    await this.save();
  }

  getWorkouts(): Workout[] {
    return this.data.workouts;
  }

  async addWorkout(workout: Workout): Promise<void> {
    this.data.workouts.push(workout);
    await this.save();
  }

  async updateWorkout(workoutId: string, updates: Partial<Workout>): Promise<void> {
    const workout = this.data.workouts.find((item) => item.id === workoutId);
    if (!workout) return;
    Object.assign(workout, updates);
    await this.save();
  }

  async deleteWorkout(workoutId: string): Promise<void> {
    this.data.workouts = this.data.workouts.filter((item) => item.id !== workoutId);
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
    return this.data.transactions;
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
    return this.data.budgets;
  }

  getMonthlyBudgetLimit(): number {
    return this.data.budgets.reduce((sum, budget) => sum + budget.amount, 0);
  }

  async setMonthlyBudgetLimit(amount: number): Promise<void> {
    const budget = this.data.budgets[0] ?? { id: "budget-monthly", category: "月预算", amount: 0, spent: 0 };
    const currentTotal = this.getMonthlyBudgetLimit();
    const delta = Math.max(0, amount) - currentTotal;
    budget.amount = Math.max(0, budget.amount + delta);
    if (!this.data.budgets.some((item) => item.id === budget.id)) {
      this.data.budgets.unshift(budget);
    }
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
    this.data.accounts.push(account);
    await this.save();
  }

  async updateAccount(accountId: string, updates: Partial<Account>): Promise<void> {
    const account = this.data.accounts.find((item) => item.id === accountId);
    if (!account) return;
    Object.assign(account, updates);
    await this.save();
  }

  async deleteAccount(accountId: string): Promise<void> {
    this.data.accounts = this.data.accounts.filter((item) => item.id !== accountId);
    await this.save();
  }

  getInvestmentWatchItems(): InvestmentWatchItem[] {
    return this.data.investmentWatchItems;
  }

  async addInvestmentWatchItem(item: InvestmentWatchItem): Promise<void> {
    this.data.investmentWatchItems.push(item);
    await this.save();
  }

  async updateInvestmentWatchItem(itemId: string, updates: Partial<InvestmentWatchItem>): Promise<void> {
    const item = this.data.investmentWatchItems.find((entry) => entry.id === itemId);
    if (!item) return;
    Object.assign(item, updates);
    await this.save();
  }

  async deleteInvestmentWatchItem(itemId: string): Promise<void> {
    this.data.investmentWatchItems = this.data.investmentWatchItems.filter((item) => item.id !== itemId);
    await this.save();
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

  async addFinanceTodo(title: string): Promise<void> {
    this.data.financeTodos.push({ id: `finance-todo-${Date.now()}`, title, completed: false });
    await this.save();
  }

  async updateFinanceTodo(todoId: string, updates: Partial<FinanceTodo>): Promise<void> {
    const todo = this.data.financeTodos.find((item) => item.id === todoId);
    if (!todo) return;
    Object.assign(todo, updates);
    await this.save();
  }

  async deleteFinanceTodo(todoId: string): Promise<void> {
    this.data.financeTodos = this.data.financeTodos.filter((item) => item.id !== todoId);
    await this.save();
  }

  getGoals(): Goal[] {
    return this.data.goals;
  }

  getObjectives(): Objective[] {
    return this.data.objectives;
  }

  async addObjective(objective: Objective): Promise<void> {
    this.data.objectives.push(objective);
    await this.save();
  }

  async updateObjective(objectiveId: string, updates: Partial<Objective>): Promise<void> {
    const objective = this.data.objectives.find((item) => item.id === objectiveId);
    if (!objective) return;
    Object.assign(objective, updates);
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

  getRisks(): Risk[] {
    return this.data.risks;
  }

  async addGoal(goal: Goal): Promise<void> {
    this.data.goals.push(goal);
    await this.save();
  }

  async deleteGoal(goalId: string): Promise<void> {
    this.data.goals = this.data.goals.filter((item) => item.id !== goalId);
    this.data.milestones = this.data.milestones.filter((item) => item.goalId !== goalId);
    await this.save();
  }

  async updateGoal(goalId: string, updates: Partial<Goal>): Promise<void> {
    const goal = this.data.goals.find((item) => item.id === goalId);
    if (!goal) {
      return;
    }
    Object.assign(goal, updates);
    goal.progress = Math.max(0, Math.min(100, goal.progress));
    await this.save();
  }

  async updateGoalProgress(goalId: string, progress: number): Promise<void> {
    await this.updateGoal(goalId, { progress });
  }

  async addKeyResult(keyResult: KeyResult): Promise<void> {
    this.data.keyResults.push(keyResult);
    await this.save();
  }

  async updateKeyResult(keyResultId: string, updates: Partial<KeyResult>): Promise<void> {
    const keyResult = this.data.keyResults.find((item) => item.id === keyResultId);
    if (!keyResult) return;
    Object.assign(keyResult, updates);
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
    this.data.transactions.push(transaction);
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
    return this.data.budgets.reduce((sum, budget) => sum + Math.max(0, budget.amount - budget.spent), 0);
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
    return this.data.transactions.filter((transaction) => transaction.date.startsWith(prefix));
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
    this.data.budgets.forEach((budget) => {
      budget.spent = this.getCurrentMonthTransactions()
        .filter((transaction) => transaction.type === "expense" && transaction.category === budget.category)
        .reduce((sum, transaction) => sum + transaction.amount, 0);
    });
  }

  private setSectionEnabledInMemory(sectionId: string, enabled: boolean): void {
    const section = this.data.sections.find((item) => item.id === sectionId);
    if (section) {
      section.enabled = enabled;
    }
  }

  isHabitCompleted(habitId: string, date: string): boolean {
    return Boolean(this.data.habits[habitId]?.[date]);
  }

  async toggleHabit(habitId: string, date: string): Promise<void> {
    this.data.habits[habitId] = this.data.habits[habitId] ?? {};
    this.data.habits[habitId][date] = !this.data.habits[habitId][date];
    await this.save();
  }

  getWeeklyCompletionRate(): number {
    const habitCompletion: boolean[] = [];
    this.getCurrentWeekDates().forEach((date) => {
      DEFAULT_HABITS.forEach((habit) => {
        habitCompletion.push(this.isHabitCompleted(habit.id, date));
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
      const allDone = DEFAULT_HABITS.every((habit) => this.isHabitCompleted(habit.id, key));
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

    return {
      ...structuredClone(DEFAULT_DATA),
      ...partial,
      dataVersion: "0.3.3",
      banner: {
        ...DEFAULT_DATA.banner,
        ...partial.banner
      },
      userSettings: {
        ...DEFAULT_DATA.userSettings,
        ...partial.userSettings
      },
      sections,
      habits: partial.habits ?? {},
      todayFocusTasks: Array.isArray(partial.todayFocusTasks)
        ? partial.todayFocusTasks
        : structuredClone(DEFAULT_DATA.todayFocusTasks),
      researchProjects: Array.isArray(partial.researchProjects)
        ? partial.researchProjects
        : structuredClone(DEFAULT_DATA.researchProjects),
      researchPapers: Array.isArray(partial.researchPapers)
        ? partial.researchPapers
        : structuredClone(DEFAULT_DATA.researchPapers),
      experimentPlans: Array.isArray(partial.experimentPlans)
        ? partial.experimentPlans
        : structuredClone(DEFAULT_DATA.experimentPlans),
      experimentRecords: Array.isArray(partial.experimentRecords)
        ? partial.experimentRecords
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
      books: Array.isArray(partial.books) ? partial.books : structuredClone(DEFAULT_DATA.books),
      readingQuotes: Array.isArray(partial.readingQuotes)
        ? partial.readingQuotes
        : structuredClone(DEFAULT_DATA.readingQuotes),
      workouts: Array.isArray(partial.workouts) ? partial.workouts : structuredClone(DEFAULT_DATA.workouts),
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
      accounts: Array.isArray(partial.accounts) ? partial.accounts : structuredClone(DEFAULT_DATA.accounts),
      savingGoals: Array.isArray(partial.savingGoals)
        ? partial.savingGoals
        : structuredClone(DEFAULT_DATA.savingGoals),
      bills: Array.isArray(partial.bills) ? partial.bills : structuredClone(DEFAULT_DATA.bills),
      financeTodos: Array.isArray(partial.financeTodos)
        ? partial.financeTodos
        : structuredClone(DEFAULT_DATA.financeTodos),
      goals: Array.isArray(partial.goals) ? partial.goals : structuredClone(DEFAULT_DATA.goals),
      objectives: Array.isArray(partial.objectives)
        ? partial.objectives
        : structuredClone(DEFAULT_DATA.objectives),
      keyResults: Array.isArray(partial.keyResults)
        ? partial.keyResults
        : structuredClone(DEFAULT_DATA.keyResults),
      milestones: Array.isArray(partial.milestones)
        ? partial.milestones
        : structuredClone(DEFAULT_DATA.milestones),
      risks: Array.isArray(partial.risks) ? partial.risks : structuredClone(DEFAULT_DATA.risks),
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
        ? partial.investmentWatchItems
        : structuredClone(DEFAULT_DATA.investmentWatchItems),
      priorityMatrixItems: Array.isArray(partial.priorityMatrixItems)
        ? partial.priorityMatrixItems
        : structuredClone(DEFAULT_DATA.priorityMatrixItems),
      theme: {
        ...DEFAULT_DATA.theme,
        ...partial.theme
      }
    };
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

  private normalizeFitnessGoal(goal: FitnessGoal): FitnessGoal {
    const timestamp = goal.createdAt ?? `${goal.startDate || goal.deadline || todayKey()}T00:00:00.000Z`;
    const currentValue = Number(goal.currentValue ?? goal.current ?? 0);
    const targetValue = Number(goal.targetValue ?? goal.target ?? 0);
    const status = this.getNormalizedFitnessGoalStatus({
      ...goal,
      currentValue,
      targetValue
    });
    return {
      ...goal,
      id: goal.id ?? `fitness-goal-${Date.now()}`,
      title: goal.title || "健身目标",
      currentValue,
      targetValue,
      unit: goal.unit || "",
      startDate: goal.startDate ?? todayKey(),
      deadline: goal.deadline || todayKey(),
      status,
      createdAt: timestamp,
      updatedAt: goal.updatedAt ?? timestamp
    };
  }

  private getNormalizedFitnessGoalStatus(goal: FitnessGoal): FitnessGoal["status"] {
    if (goal.status === "archived") return "archived";
    if (goal.status === "completed" || goal.completedDate) return "completed";
    if (goal.deadline && goal.deadline < todayKey()) return "overdue";
    return "active";
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

  private migrateSections(sections: DashboardSectionConfig[]): DashboardSectionConfig[] {
    const pages: DashboardPage[] = ["overview", "research", "reading", "fitness", "finance", "goals", "modules"];
    const migrated = [...sections];

    pages.forEach((page) => {
      if (!sections.some((section) => section.page === page)) {
        migrated.push(...structuredClone(DEFAULT_DATA.sections.filter((section) => section.page === page)));
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
