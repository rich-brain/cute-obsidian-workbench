export type DashboardPage =
  | "overview"
  | "research"
  | "reading"
  | "fitness"
  | "finance"
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

export interface WorkbenchSettings {
  showLeftSidebar: boolean;
  weekStartsOn: "sunday" | "monday";
  dateFormat: string;
  overviewLayout: "default" | "compact" | "minimal";
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
  status: "进行中" | "撰写中" | "已完成" | "未开始";
  progress: number;
  startDate: string;
  deadline: string;
  tags: string[];
}

export interface ResearchPaper {
  id: string;
  title: string;
  venue: string;
  year: number;
  status: "未开始" | "进行中" | "已完成";
  readingProgress: number;
  notePath?: string;
}

export interface ExperimentPlan {
  id: string;
  title: string;
  date: string;
  status: "未开始" | "计划中" | "进行中" | "已完成";
  notePath?: string;
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
  totalPages: number;
  currentPage: number;
  status: "在读" | "想读" | "已读";
  rating?: number;
  startDate?: string;
  finishDate?: string;
  notePath?: string;
  tags: string[];
}

export interface ReadingQuote {
  id: string;
  text: string;
  source: string;
}

export interface Workout {
  id: string;
  date: string;
  type: "有氧" | "力量" | "拉伸" | "休息";
  duration: number;
  calories: number;
  completed: boolean;
  note: string;
}

export interface HealthReminder {
  id: string;
  title: string;
}

export interface BodyMeasurement {
  id?: string;
  date: string;
  weight: number;
  bmi: number;
  waist: number;
  chest: number;
  hip: number;
}

export interface FitnessGoal {
  id: string;
  title: string;
  current: number;
  target: number;
  unit: string;
  deadline: string;
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
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  progress: number;
  deadline: string;
  status: "未开始" | "进行中" | "已完成" | "暂停";
}

export interface Objective {
  id: string;
  title: string;
  quarter: string;
  progress: number;
}

export interface KeyResult {
  id: string;
  objectiveId: string;
  title: string;
  progress: number;
  completed: boolean;
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
}

export interface FitnessDailyRecord {
  date: string;
  waterCups: number;
  waterGoal: number;
  sleepHours: number;
  sleepGoal: number;
  bedtime: string;
  wakeTime: string;
}

export interface InvestmentWatchItem {
  id: string;
  name: string;
  code: string;
  price: number;
  changePercent: number;
  type: string;
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
  banner: BannerSettings;
  habits: Record<string, Record<string, boolean>>;
  todayFocusTasks: TodayFocusTask[];
  researchProjects: ResearchProject[];
  researchPapers: ResearchPaper[];
  experimentPlans: ExperimentPlan[];
  experimentRecords: ExperimentPlan[];
  researchDeadlines: ResearchDeadline[];
  researchMemos: string[];
  dataAnalysisTasks: DataAnalysisTask[];
  books: BookItem[];
  readingQuotes: ReadingQuote[];
  workouts: Workout[];
  bodyMeasurements: BodyMeasurement[];
  fitnessGoals: FitnessGoal[];
  healthReminders: HealthReminder[];
  transactions: Transaction[];
  budgets: Budget[];
  accounts: Account[];
  savingGoals: SavingGoal[];
  bills: Bill[];
  financeTodos: FinanceTodo[];
  goals: Goal[];
  objectives: Objective[];
  keyResults: KeyResult[];
  milestones: Milestone[];
  risks: Risk[];
  calendarSettings: CalendarSettings;
  calendarTodos: CalendarTodo[];
  apexHabitSettings: ApexHabitSettings;
  quickActions: QuickActionConfig[];
  focusSettings: FocusSettings;
  focusState: FocusState;
  focusRecords: FocusRecord[];
  fitnessDailyRecords: FitnessDailyRecord[];
  investmentWatchItems: InvestmentWatchItem[];
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
