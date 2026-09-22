export type DashboardPage =
  | "overview"
  | "research"
  | "reading"
  | "fitness"
  | "finance"
  | "tasks"
  | "goals"
  | "modules";

export interface DashboardPageDefinition {
  id: DashboardPage;
  label: string;
  icon: string;
  description: string;
}

export interface DashboardSectionConfig {
  id: string;
  page: DashboardPage;
  type: string;
  title: string;
  order: number;
  enabled: boolean;
  width?: "sm" | "md" | "lg" | "full";
  height?: "sm" | "md" | "lg";
  position?: {
    x?: number;
    y?: number;
  };
  config?: Record<string, unknown>;
}

export type ModuleLayoutMode = "default" | "compact" | "minimal" | "custom";

export interface SectionLayoutConfig {
  order?: number;
  colSpan?: number;
  rowSpan?: number;
}

export interface ModuleLayoutConfig {
  mode: ModuleLayoutMode;
  columns?: number;
  templateId?: string;
  sections?: Record<string, SectionLayoutConfig>;
}

export interface WorkbenchSettings {
  showLeftSidebar: boolean;
  weekStartsOn: "sunday" | "monday";
  dateFormat: string;
  overviewLayout: "default" | "compact" | "minimal";
  zoteroJsonPath?: string;
}

export interface TodayFocusTask {
  id: string;
  label: string;
  category: "科研" | "阅读" | "健身" | "理财" | "个人";
  completed: boolean;
  date?: string;
}

export interface ResearchProject {
  id: string;
  title: string;
  description?: string;
  status: "进行中" | "撰写中" | "已完成" | "未开始";
  progress: number;
  startDate: string;
  deadline: string;
  tags: string[];
  tagIds?: string[];
}

export interface ResearchPaper {
  id: string;
  title: string;
  venue?: string;
  venueId?: string;
  year?: number;
  status?: "未开始" | "进行中" | "已完成" | string;
  statusId?: string;
  readingProgress: number;
  paperUrl?: string;
  doi?: string;
  readingStartDate?: string;
  readingEndDate?: string;
  researchProjectId?: string;
  tags?: string[];
  tagIds: string[];
  notePath?: string;
  createdAt: number;
  updatedAt: number;
  zoteroItemKey?: string;
  citekey?: string;
}

export interface LiteratureNote {
  id: string;
  title: string;
  notePath: string;
  paperReadingId?: string;
  createdAt: number;
  updatedAt: number;
}

export interface PaperStatusDefinition {
  id: string;
  name: string;
  color: string;
  order: number;
}

export interface VenueDefinition {
  id: string;
  name: string;
  type: "conference" | "journal" | "other";
  color: string;
}

export interface PaperTagDefinition {
  id: string;
  name: string;
  color: string;
}

export interface ExperimentPlan {
  id: string;
  title: string;
  date: string;
  status: "未开始" | "计划中" | "进行中" | "已完成";
  notePath?: string;
  researchProjectId?: string;
  experimentPlanId?: string;
}

export interface ResearchDeadline {
  id: string;
  title: string;
  date: string;
  type: "会议" | "DDL" | "组会" | "汇报";
  priority: "low" | "medium" | "high";
}

export interface DataAnalysisTask {
  id: string;
  title: string;
  progress: number;
  status: "未开始" | "进行中" | "已完成";
}

export interface BookItem {
  id: string;
  title: string;
  author: string;
  cover?: string;
  coverUrl?: string;
  coverPath?: string;
  publisher?: string;
  publishDate?: string;
  isbn10?: string;
  isbn13?: string;
  category?: string;
  description?: string;
  totalPages: number;
  currentPage: number;
  status: "在读" | "想读" | "已读";
  readingStatus?: "want-to-read" | "reading" | "finished";
  shelfStatus?: "on-shelf" | "off-shelf";
  rating?: number;
  startDate?: string;
  finishDate?: string;
  notePath?: string;
  bookFilePath?: string;
  tagIds?: string[];
  createdAt?: string;
  updatedAt?: string;
  tags: string[];
}

export interface WantToReadItem {
  id: string;
  title: string;
  author?: string;
  summary?: string;
  status: "pending" | "added";
  bookId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookTagDefinition {
  id: string;
  name: string;
  color: string;
  order?: number;
}

export interface ReadingPlan {
  id: string;
  bookId: string;
  startDate: string;
  endDate: string;
  targetPages?: number;
  goal?: string;
  progress?: number;
  note?: string;
  status: "planned" | "active" | "completed" | "overdue";
  completedDate?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReadingNote {
  id: string;
  title: string;
  notePath: string;
  bookId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReadingQuote {
  id: string;
  text: string;
  source: string;
  bookId?: string;
  note?: string;
  style?: "default" | "sticky" | "soft" | "card";
  backgroundColor?: string;
}

export interface Workout {
  id: string;
  title?: string;
  date: string;
  type: "有氧" | "力量" | "拉伸" | "休息" | "跑步" | "骑行" | "游泳" | "瑜伽" | "其它";
  workoutType?: "跑步" | "力量" | "骑行" | "游泳" | "瑜伽" | "其它";
  trainingPlanId?: string;
  fitnessGoalId?: string;
  duration: number;
  durationMinutes?: number;
  calories: number;
  distanceKm?: number;
  exerciseDetails?: string;
  feeling?: string;
  resultSummary?: string;
  markdownPath?: string;
  completed: boolean;
  note: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TrainingPlan {
  id: string;
  title: string;
  fitnessGoalId?: string;
  startDate: string;
  endDate: string;
  weeklyFrequency?: number;
  description?: string;
  note?: string;
  markdownPath?: string;
  status?: "planned" | "active" | "completed" | "overdue";
  completedDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface HealthReminder {
  id: string;
  title: string;
  date?: string;
  time?: string;
  repeatType?: "once" | "daily" | "weekdays" | "weekly" | "custom";
  repeatDays?: number[];
  note?: string;
  enabled?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface BodyMeasurement {
  id?: string;
  date: string;
  weight: number;
  bmi: number;
  waist: number;
  chest: number;
  hip: number;
  note?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FitnessGoal {
  id: string;
  title: string;
  type?: "减重" | "减脂" | "增肌" | "跑步" | "力量" | "运动频率" | "其它";
  description?: string;
  current?: number;
  target?: number;
  currentValue?: number;
  targetValue?: number;
  unit?: string;
  targetUnit?: string;
  progress?: number;
  startDate?: string;
  deadline: string;
  completedDate?: string;
  status?: "planned" | "active" | "completed" | "overdue" | "archived";
  createdAt?: string;
  updatedAt?: string;
}

export interface FitnessHabitDefinition {
  id: string;
  name: string;
  targetName: string;
  targetValue: number;
  unit: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface FitnessHabitRecord {
  date: string;
  habitId: string;
  actualValue: number;
  note?: string;
  updatedAt: string;
}

export interface HealthReminderLog {
  id: string;
  reminderId: string;
  date: string;
  scheduledTime: string;
  triggeredAt?: string;
  status: "triggered" | "completed" | "missed" | "dismissed";
  note?: string;
}

export interface Transaction {
  id: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  date: string;
  note: string;
  accountId?: string;
}

export interface Budget {
  id: string;
  category: string;
  amount: number;
  spent: number;
  color?: string;
  icon?: string;
  role?: "category" | "monthly-limit";
  period?: string;
}

export interface Account {
  id: string;
  name: string;
  type: "现金" | "储蓄卡" | "信用卡" | "投资账户" | "支付宝" | "微信钱包" | "证券" | "其他";
  balance: number;
  icon?: string;
}

export interface SavingGoal {
  id: string;
  title: string;
  current: number;
  target: number;
  deadline: string;
}

export interface Bill {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  paid: boolean;
}

export interface FinanceTodo {
  id: string;
  title: string;
  completed: boolean;
  date?: string;
  note?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type TaskStatus = "inbox" | "todo" | "doing" | "waiting" | "done" | "cancelled";
export type TaskPriority = "high" | "medium" | "low" | "none";
export type TaskSourceModule = "research" | "reading" | "fitness" | "finance" | "goal" | "general";
export type RecurrenceFrequency = "none" | "daily" | "weekly" | "monthly" | "custom";

export interface RecurrenceConfig {
  frequency: RecurrenceFrequency;
  interval?: number;
  nextDate?: string;
  enabled?: boolean;
  lastGeneratedDate?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  sourceModule?: TaskSourceModule;
  projectId?: string;
  goalId?: string;
  parentTaskId?: string;
  tags?: string[];
  plannedDate?: string;
  startDate?: string;
  dueDate?: string;
  completedDate?: string;
  estimatedMinutes?: number;
  actualMinutes?: number;
  recurrence?: RecurrenceConfig;
  linkedNote?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskProject {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface TaskSettings {
  filterStatus?: TaskStatus | "all";
  filterPriority?: TaskPriority | "all";
  filterProjectId?: string;
  filterStartDate?: string;
  filterEndDate?: string;
  filterTag?: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  progress: number;
  deadline: string;
  status: "未开始" | "进行中" | "已完成" | "暂停";
  startDate?: string;
  completedDate?: string;
  updatedAt?: number;
}

export interface GoalAction {
  id: string;
  goalId: string;
  parentId?: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "completed" | "overdue";
  startDate?: string;
  deadline?: string;
  completedDate?: string;
  progress?: number;
  progressMode?: "auto" | "manual";
  durationDays?: number;
  isMilestone?: boolean;
  milestoneDate?: string;
  importance?: "important" | "not-important";
  urgency?: "urgent" | "not-urgent";
  note?: string;
  collapsed?: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface Objective {
  id: string;
  title: string;
  quarter: string;
  progress: number;
  year?: number;
  quarterNumber?: 1 | 2 | 3 | 4;
  completedDate?: string;
  updatedAt?: number;
  autoGenerated?: boolean;
  sourceGoalActionId?: string;
  segmentType?: "quarterly";
  segmentStartDate?: string;
  segmentEndDate?: string;
  segmentNote?: string;
  segmentProgress?: number;
}

export interface KeyResult {
  id: string;
  objectiveId: string;
  title: string;
  progress: number;
  completed: boolean;
  year?: number;
  month?: number;
  completedDate?: string;
  updatedAt?: number;
  autoGenerated?: boolean;
  sourceGoalActionId?: string;
  segmentType?: "monthly";
  segmentStartDate?: string;
  segmentEndDate?: string;
  segmentNote?: string;
  segmentProgress?: number;
}

export interface Milestone {
  id: string;
  goalId: string;
  title: string;
  date: string;
  status: "未开始" | "进行中" | "已完成";
}

export interface Risk {
  id: string;
  title: string;
  level: "low" | "medium" | "high";
  solution: string;
  goalId?: string;
  status?: "todo" | "in-progress" | "resolved";
  discoveredDate?: string;
  resolvedDate?: string;
  note?: string;
}

export interface ReviewItem {
  id: string;
  date: string;
  title: string;
  content: string;
  status: "todo" | "done";
  createdAt: string;
  updatedAt: string;
}

export interface BannerSettings {
  message: string;
  subtitle?: string;
  background: string;
  imageDataUrl?: string;
  backgroundPosition: string;
  overlay: boolean;
  opacity: number;
  bannerAvatar?: WorkbenchAvatarSettings;
  sidebarAvatar?: WorkbenchAvatarSettings;
}

export interface WorkbenchAvatarSettings {
  type: "preset" | "image";
  value: string;
}

export interface CalendarSettings {
  showNoteMarkers: boolean;
  showTaskMarkers: boolean;
  showEventMarkers: boolean;
  weekStartsOn: "sunday" | "monday";
  highlightColor: string;
}

export interface CalendarTodo {
  id: string;
  title: string;
  date: string;
  completed: boolean;
  category: string;
  createdAt: string;
}

export interface CustomHabitItem {
  id: string;
  label: string;
  enabled: boolean;
  order: number;
}

export interface ApexHabitSettings {
  showOnOverview: boolean;
  showStreak: boolean;
  showWeeklyProgress: boolean;
  customHabits: CustomHabitItem[];
}

export interface QuickActionConfig {
  id: string;
  label: string;
  enabled: boolean;
  order: number;
  type: "new-note" | "daily-note" | "search" | "templates" | "graph" | "custom";
  target?: string;
}

export interface FocusSettings {
  focusDuration: number;
  breakDuration: number;
  autoStartBreak: boolean;
  autoStartNextFocus: boolean;
  defaultBackground?: string;
}

export interface FocusState {
  isRunning: boolean;
  isPaused: boolean;
  mode: "focus" | "break";
  startedAt?: string;
  pausedAt?: string;
  remainingSeconds: number;
  currentTask?: string;
  background?: string;
  backgroundDataUrl?: string;
  plannedDuration?: number;
}

export interface FocusRecord {
  id: string;
  date: string;
  task: string;
  duration: number;
  completed: boolean;
  createdAt: string;
  startedAt?: string;
  endedAt?: string;
  plannedDuration?: number;
  background?: string;
  backgroundDataUrl?: string;
  plannedDurationMinutes?: number;
  actualDurationMinutes?: number;
}

export interface FitnessDailyRecord {
  date: string;
  waterCups: number;
  waterGoal: number;
  waterNote?: string;
  sleepHours: number;
  sleepGoal: number;
  bedtime: string;
  wakeTime: string;
  sleepNote?: string;
  updatedAt?: string;
}

export interface InvestmentWatchItem {
  id: string;
  name: string;
  code: string;
  price: number;
  changePercent: number;
  type: string;
  note?: string;
}

export interface InvestmentSnapshot {
  id: string;
  investmentId: string;
  date: string;
  price: number;
  changePercent: number;
  note?: string;
  createdAt: string;
}

export interface PriorityMatrixItem {
  id: string;
  title: string;
  quadrant: "important-urgent" | "important-not-urgent" | "not-important-urgent" | "not-important-not-urgent";
  note: string;
  completed: boolean;
}

export interface ThemeSettings {
  cuteBg: string;
  cuteCard: string;
  cutePrimary: string;
  cuteSecondary: string;
  cuteText: string;
  cuteBorder: string;
  cuteRadius: number;
  cuteShadow: string;
  cardOpacity: number;
  textureStrength: number;
  fontSize: number;
}

export interface WorkbenchData {
  dataVersion: string;
  currentPage: DashboardPage;
  sections: DashboardSectionConfig[];
  moduleLayouts: Record<DashboardPage, ModuleLayoutConfig>;
  banner: BannerSettings;
  habits: Record<string, Record<string, boolean>>;
  todayFocusTasks: TodayFocusTask[];
  researchProjects: ResearchProject[];
  researchPapers: ResearchPaper[];
  literatureNotes: LiteratureNote[];
  paperStatuses: PaperStatusDefinition[];
  paperVenues: VenueDefinition[];
  paperTags: PaperTagDefinition[];
  experimentPlans: ExperimentPlan[];
  experimentRecords: ExperimentPlan[];
  researchDeadlines: ResearchDeadline[];
  researchMemos: string[];
  dataAnalysisTasks: DataAnalysisTask[];
  books: BookItem[];
  wantToReadItems: WantToReadItem[];
  bookTags: BookTagDefinition[];
  readingPlans: ReadingPlan[];
  readingNotes: ReadingNote[];
  readingQuotes: ReadingQuote[];
  workouts: Workout[];
  trainingPlans: TrainingPlan[];
  bodyMeasurements: BodyMeasurement[];
  fitnessGoals: FitnessGoal[];
  healthReminders: HealthReminder[];
  healthReminderLogs: HealthReminderLog[];
  transactions: Transaction[];
  budgets: Budget[];
  accounts: Account[];
  savingGoals: SavingGoal[];
  bills: Bill[];
  financeTodos: FinanceTodo[];
  tasks: Task[];
  taskProjects: TaskProject[];
  taskSettings: TaskSettings;
  goals: Goal[];
  goalActions: GoalAction[];
  objectives: Objective[];
  keyResults: KeyResult[];
  milestones: Milestone[];
  risks: Risk[];
  reviewItems: ReviewItem[];
  calendarSettings: CalendarSettings;
  calendarTodos: CalendarTodo[];
  apexHabitSettings: ApexHabitSettings;
  quickActions: QuickActionConfig[];
  focusSettings: FocusSettings;
  focusState: FocusState;
  focusRecords: FocusRecord[];
  fitnessDailyRecords: FitnessDailyRecord[];
  fitnessHabitDefinitions: FitnessHabitDefinition[];
  fitnessHabitRecords: FitnessHabitRecord[];
  investmentWatchItems: InvestmentWatchItem[];
  investmentSnapshots: InvestmentSnapshot[];
  priorityMatrixItems: PriorityMatrixItem[];
  theme: ThemeSettings;
  userSettings: WorkbenchSettings;
}

export interface AvailableModuleDefinition {
  type: string;
  title: string;
  description: string;
  page: DashboardPage | "all";
  icon: string;
  defaultWidth?: DashboardSectionConfig["width"];
  defaultHeight?: DashboardSectionConfig["height"];
}

export interface SectionCapabilities {
  canAdd?: boolean;
  canEdit?: boolean;
  canDeleteItems?: boolean;
  canOpenStats?: boolean;
  canManage?: boolean;
}

export interface CustomSectionInput {
  id: string;
  page: DashboardPage;
  title: string;
  description: string;
  type: "custom-text" | "custom-todo-list" | "custom-link-list" | "custom-memo";
  color: string;
  order?: number;
}
