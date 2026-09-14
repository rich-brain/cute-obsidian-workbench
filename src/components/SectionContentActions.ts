import { App, Notice } from "obsidian";
import { CrudItemModal, type CrudField } from "./CrudItemModal";
import type { DashboardStore } from "../core/DashboardStore";
import type {
  DataAnalysisTask,
  DashboardSectionConfig,
  ExperimentPlan,
  FinanceTodo,
  HealthReminder,
  Objective,
  ReadingQuote,
  ResearchDeadline,
  ResearchPaper,
  ResearchProject,
  SavingGoal,
  Bill,
  Workout
} from "../types/dashboard";
import { AddBookModal } from "./reading/AddBookModal";
import { AddTransactionModal } from "./finance/AddTransactionModal";
import { GoalEditorModal, KeyResultModal, MilestoneModal, RiskModal } from "./goals/GoalModals";
import { formatDateKey } from "../core/DashboardStore";

export function openAddContentModal(app: App, store: DashboardStore, section: DashboardSectionConfig, onDataChanged: () => void): void {
  const refresh = () => onDataChanged();
  switch (section.type) {
    case "research-projects":
      openResearchProjectModal(app, async (values) => {
        await store.addResearchProject({ ...values, id: `project-${Date.now()}`, tags: splitTags(values.tagsText) });
        refresh();
      });
      break;
    case "reading-queue":
    case "literature-notes":
      openResearchPaperModal(app, async (values) => {
        await store.addResearchPaper({ ...values, id: `paper-${Date.now()}` });
        refresh();
      });
      break;
    case "experiment-plan":
    case "experiment-records":
      openExperimentModal(app, async (values) => {
        await store.addExperiment(section.type === "experiment-plan" ? "plan" : "records", { ...values, id: `experiment-${Date.now()}` });
        refresh();
      });
      break;
    case "data-analysis-tasks":
      openDataAnalysisTaskModal(app, async (values) => {
        await store.addDataAnalysisTask({ ...values, id: `analysis-${Date.now()}` });
        refresh();
      });
      break;
    case "research-timeline":
      openDeadlineModal(app, async (values) => {
        await store.addResearchDeadline({ ...values, id: `deadline-${Date.now()}` });
        refresh();
      });
      break;
    case "research-memo":
      openTextModal(app, "新增科研 Memo", "Memo", "", async (text) => {
        await store.addResearchMemo(text);
        refresh();
      });
      break;
    case "bookshelf":
    case "reading-plan":
    case "reading-notes":
    case "wishlist-books":
      new AddBookModal(app, async (book) => {
        await store.addBook(section.type === "wishlist-books" ? { ...book, status: "想读" } : book);
        refresh();
      }).open();
      break;
    case "reading-quotes":
      openQuoteModal(app, async (values) => {
        await store.addReadingQuote({ ...values, id: `quote-${Date.now()}` });
        refresh();
      });
      break;
    case "workout-plan":
    case "workout-log":
      openWorkoutModal(app, async (values) => {
        await store.addWorkout({ ...values, id: `workout-${Date.now()}` });
        refresh();
      }, section.type === "workout-log");
      break;
    case "health-reminders":
      openTextModal(app, "新增健康提醒", "提醒", "", async (text) => {
        await store.addHealthReminder(text);
        refresh();
      });
      break;
    case "saving-goals":
      openSavingGoalModal(app, async (values) => {
        await store.addSavingGoal({ ...values, id: `saving-${Date.now()}` });
        refresh();
      });
      break;
    case "bill-reminders":
      openBillModal(app, async (values) => {
        await store.addBill({ ...values, id: `bill-${Date.now()}` });
        refresh();
      });
      break;
    case "finance-todos":
      openTextModal(app, "新增记账待办", "待办", "", async (text) => {
        await store.addFinanceTodo(text);
        refresh();
      });
      break;
    case "yearly-goals":
      new GoalEditorModal(app, undefined, async (goal) => {
        await store.addGoal(goal);
        refresh();
      }).open();
      break;
    case "quarterly-okr":
      openObjectiveModal(app, async (values) => {
        await store.addObjective({ ...values, id: `objective-${Date.now()}` });
        refresh();
      });
      break;
    case "monthly-key-results":
      new KeyResultModal(app, store.getObjectives(), async (kr) => {
        await store.addKeyResult(kr);
        refresh();
      }).open();
      break;
    case "milestone-timeline":
      new MilestoneModal(app, store.getGoals(), async (milestone) => {
        await store.addMilestone(milestone);
        refresh();
      }).open();
      break;
    case "risks-blockers":
      new RiskModal(app, async (risk) => {
        await store.addRisk(risk);
        refresh();
      }).open();
      break;
    case "today-focus":
      void store.addTodayFocusTask("新的待办任务").then(refresh);
      break;
    default:
      new Notice("这个模块暂未提供添加入口。");
  }
}

export function openTextModal(app: App, title: string, fieldName: string, initialValue: string, onSubmit: (value: string) => Promise<void>): void {
  new CrudItemModal(app, title, { value: initialValue }, [{ key: "value", name: fieldName, type: "textarea" }], async (values) => {
    const value = String(values.value ?? "").trim();
    if (!value) return;
    await onSubmit(value);
  }).open();
}

export function openResearchProjectModal(app: App, onSubmit: (values: Omit<ResearchProject, "id" | "tags"> & { tagsText: string }) => Promise<void>, project?: ResearchProject): void {
  new CrudItemModal(app, project ? "编辑研究项目" : "新增研究项目", {
    title: project?.title ?? "",
    status: project?.status ?? "进行中",
    progress: project?.progress ?? 0,
    startDate: project?.startDate ?? formatDateKey(new Date()),
    deadline: project?.deadline ?? formatDateKey(new Date()),
    tagsText: project?.tags.join(", ") ?? ""
  }, [
    { key: "title", name: "标题" },
    { key: "status", name: "状态", type: "select", options: statusOptions(["未开始", "进行中", "撰写中", "已完成"]) },
    { key: "progress", name: "进度", type: "number" },
    { key: "startDate", name: "开始日期" },
    { key: "deadline", name: "截止日期" },
    { key: "tagsText", name: "标签" }
  ], onSubmit).open();
}

export function openResearchPaperModal(app: App, onSubmit: (values: Omit<ResearchPaper, "id">) => Promise<void>, paper?: ResearchPaper): void {
  new CrudItemModal(app, paper ? "编辑论文" : "新增论文", {
    title: paper?.title ?? "",
    venue: paper?.venue ?? "",
    year: paper?.year ?? new Date().getFullYear(),
    status: paper?.status ?? "未开始",
    readingProgress: paper?.readingProgress ?? 0,
    notePath: paper?.notePath ?? ""
  }, [
    { key: "title", name: "标题" },
    { key: "venue", name: "会议/期刊" },
    { key: "year", name: "年份", type: "number" },
    { key: "status", name: "状态", type: "select", options: statusOptions(["未开始", "进行中", "已完成"]) },
    { key: "readingProgress", name: "阅读进度", type: "number" },
    { key: "notePath", name: "笔记路径" }
  ], onSubmit).open();
}

export function openExperimentModal(app: App, onSubmit: (values: Omit<ExperimentPlan, "id">) => Promise<void>, item?: ExperimentPlan): void {
  new CrudItemModal(app, item ? "编辑实验" : "新增实验", {
    title: item?.title ?? "",
    date: item?.date ?? formatDateKey(new Date()),
    status: item?.status ?? "计划中",
    notePath: item?.notePath ?? ""
  }, [
    { key: "title", name: "标题" },
    { key: "date", name: "日期" },
    { key: "status", name: "状态", type: "select", options: statusOptions(["未开始", "计划中", "进行中", "已完成"]) },
    { key: "notePath", name: "笔记路径" }
  ], onSubmit).open();
}

export function openDataAnalysisTaskModal(app: App, onSubmit: (values: Omit<DataAnalysisTask, "id">) => Promise<void>, task?: DataAnalysisTask): void {
  new CrudItemModal(app, task ? "编辑数据分析任务" : "新增数据分析任务", {
    title: task?.title ?? "",
    progress: task?.progress ?? 0,
    status: task?.status ?? "进行中"
  }, [
    { key: "title", name: "标题" },
    { key: "progress", name: "进度", type: "number" },
    { key: "status", name: "状态", type: "select", options: statusOptions(["未开始", "进行中", "已完成"]) }
  ], onSubmit).open();
}

export function openDeadlineModal(app: App, onSubmit: (values: Omit<ResearchDeadline, "id">) => Promise<void>, deadline?: ResearchDeadline): void {
  new CrudItemModal(app, deadline ? "编辑会议 / DDL" : "新增会议 / DDL", {
    title: deadline?.title ?? "",
    date: deadline?.date ?? formatDateKey(new Date()),
    type: deadline?.type ?? "DDL",
    priority: deadline?.priority ?? "medium"
  }, [
    { key: "title", name: "标题" },
    { key: "date", name: "日期" },
    { key: "type", name: "类型", type: "select", options: statusOptions(["会议", "DDL", "组会", "汇报"]) },
    { key: "priority", name: "优先级", type: "select", options: [{ value: "low", label: "低" }, { value: "medium", label: "中" }, { value: "high", label: "高" }] }
  ], onSubmit).open();
}

export function openQuoteModal(app: App, onSubmit: (values: Omit<ReadingQuote, "id">) => Promise<void>, quote?: ReadingQuote): void {
  new CrudItemModal(app, quote ? "编辑金句" : "新增金句", {
    text: quote?.text ?? "",
    source: quote?.source ?? ""
  }, [
    { key: "text", name: "摘录", type: "textarea" },
    { key: "source", name: "来源" }
  ], onSubmit).open();
}

export function openWorkoutModal(app: App, onSubmit: (values: Omit<Workout, "id">) => Promise<void>, completed = false, workout?: Workout): void {
  new CrudItemModal(app, workout ? "编辑训练" : "新增训练", {
    date: workout?.date ?? formatDateKey(new Date()),
    type: workout?.type ?? "力量",
    duration: workout?.duration ?? 30,
    calories: workout?.calories ?? 0,
    completed: workout?.completed ?? completed,
    note: workout?.note ?? ""
  }, [
    { key: "date", name: "日期" },
    { key: "type", name: "类型", type: "select", options: statusOptions(["有氧", "力量", "拉伸", "休息"]) },
    { key: "duration", name: "时长", type: "number" },
    { key: "calories", name: "热量", type: "number" },
    { key: "completed", name: "已完成", type: "checkbox" },
    { key: "note", name: "备注" }
  ], onSubmit).open();
}

export function openSavingGoalModal(app: App, onSubmit: (values: Omit<SavingGoal, "id">) => Promise<void>, goal?: SavingGoal): void {
  new CrudItemModal(app, goal ? "编辑储蓄目标" : "新增储蓄目标", {
    title: goal?.title ?? "",
    current: goal?.current ?? 0,
    target: goal?.target ?? 0,
    deadline: goal?.deadline ?? formatDateKey(new Date())
  }, [
    { key: "title", name: "标题" },
    { key: "current", name: "当前金额", type: "number" },
    { key: "target", name: "目标金额", type: "number" },
    { key: "deadline", name: "截止日期" }
  ], onSubmit).open();
}

export function openBillModal(app: App, onSubmit: (values: Omit<Bill, "id">) => Promise<void>, bill?: Bill): void {
  new CrudItemModal(app, bill ? "编辑账单" : "新增账单", {
    title: bill?.title ?? "",
    amount: bill?.amount ?? 0,
    dueDate: bill?.dueDate ?? formatDateKey(new Date()),
    paid: bill?.paid ?? false
  }, [
    { key: "title", name: "标题" },
    { key: "amount", name: "金额", type: "number" },
    { key: "dueDate", name: "到期日" },
    { key: "paid", name: "已支付", type: "checkbox" }
  ], onSubmit).open();
}

export function openObjectiveModal(app: App, onSubmit: (values: Omit<Objective, "id">) => Promise<void>, objective?: Objective): void {
  new CrudItemModal(app, objective ? "编辑 OKR" : "新增 OKR", {
    title: objective?.title ?? "",
    quarter: objective?.quarter ?? "2026 Q4",
    progress: objective?.progress ?? 0
  }, [
    { key: "title", name: "标题" },
    { key: "quarter", name: "季度" },
    { key: "progress", name: "进度", type: "number" }
  ], onSubmit).open();
}

function splitTags(value: string): string[] {
  return value.split(/[,，]/).map((tag) => tag.trim()).filter(Boolean);
}

function statusOptions(values: string[]): Array<{ value: string; label: string }> {
  return values.map((value) => ({ value, label: value }));
}
