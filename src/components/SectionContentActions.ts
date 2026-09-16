import { App, Modal, Notice } from "obsidian";
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
import { openLiteratureNoteModal } from "./research/LiteratureNoteModals";
import { openExperimentEditModal } from "./research/ExperimentModals";
import { AddTransactionModal } from "./finance/AddTransactionModal";
import { GoalEditorModal, KeyResultModal, MilestoneModal, RiskModal } from "./goals/GoalModals";
import { formatDateKey } from "../core/DashboardStore";
import {
  openAccountModal,
  openBodyMeasurementModal,
  openBudgetModal,
  openFitnessDailyModal,
  openFitnessGoalModal,
  openInvestmentWatchModal,
  openPriorityItemModal,
  openTransactionModal
} from "./DashboardEditModals";
import { TodayFocusTaskModal, TodoStatisticsModal } from "./overview/TodoStatisticsModal";
import { applyResizableModal } from "./ResizableModal";

export function openAddContentModal(app: App, store: DashboardStore, section: DashboardSectionConfig, onDataChanged: () => void): void {
  const refresh = () => onDataChanged();
  switch (section.type) {
    case "research-projects":
      openResearchProjectModal(app, store, async (values) => {
        await store.addResearchProject({ ...values, id: `project-${Date.now()}` });
        refresh();
      });
      break;
    case "reading-queue":
    case "literature-notes":
      openLiteratureNoteModal(app, store, refresh);
      break;
    case "experiment-plan":
    case "experiment-records":
      openExperimentEditModal(app, store, section.type === "experiment-plan" ? "plan" : "records", refresh);
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
      new AddBookModal(app, store, async () => {
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
      new TodayFocusTaskModal(app, formatDateKey(new Date()), async (values) => {
        await store.addTodayFocusTask(values.label, values.category, values.date);
        refresh();
      }).open();
      break;
    case "body-measurements":
      openBodyMeasurementModal(app, async (values) => {
        await store.addBodyMeasurement(values);
        refresh();
      });
      break;
    case "water-sleep-habits":
      openFitnessDailyModal(app, store.getFitnessDailyRecord(), async (values) => {
        await store.updateFitnessDailyRecord(values.date, values);
        refresh();
      });
      break;
    case "fitness-goals":
      openFitnessGoalModal(app, async (values) => {
        await store.addFitnessGoal(values);
        refresh();
      });
      break;
    case "monthly-budget":
      openBudgetLimitModal(app, store.getMonthlyBudgetLimit(), async (value) => {
        await store.setMonthlyBudgetLimit(value);
        refresh();
      });
      break;
    case "expense-categories":
      openBudgetModal(app, async (values) => {
        await store.addBudget(values);
        refresh();
      });
      break;
    case "account-overview":
      openAccountModal(app, async (values) => {
        await store.addAccount(values);
        refresh();
      });
      break;
    case "income-expense-trend":
      openTransactionModal(app, async (values) => {
        await store.addTransaction(values);
        refresh();
      });
      break;
    case "investment-watch":
      openInvestmentWatchModal(app, async (values) => {
        await store.addInvestmentWatchItem(values);
        refresh();
      });
      break;
    case "priority-matrix":
      openPriorityItemModal(app, async (values) => {
        await store.addPriorityMatrixItem(values);
        refresh();
      });
      break;
    default:
      new Notice("这个模块暂未提供添加入口。");
  }
}

export function openManageContentModal(app: App, store: DashboardStore, section: DashboardSectionConfig, onDataChanged: () => void): void {
  if (section.type === "today-focus") {
    new TodoStatisticsModal(app, store, new Date(), onDataChanged).open();
    return;
  }
  openAddContentModal(app, store, section, onDataChanged);
}

export function openTextModal(app: App, title: string, fieldName: string, initialValue: string, onSubmit: (value: string) => Promise<void>): void {
  new CrudItemModal(app, title, { value: initialValue }, [{ key: "value", name: fieldName, type: "textarea" }], async (values) => {
    const value = String(values.value ?? "").trim();
    if (!value) return;
    await onSubmit(value);
  }).open();
}

function openBudgetLimitModal(app: App, initialValue: number, onSubmit: (value: number) => Promise<void>): void {
  new CrudItemModal(app, "设置月预算", { amount: initialValue }, [
    { key: "amount", name: "月预算", type: "number" }
  ], async (values) => {
    await onSubmit(Number(values.amount) || 0);
  }).open();
}

export function openResearchProjectModal(app: App, store: DashboardStore, onSubmit: (values: Omit<ResearchProject, "id">) => Promise<void>, project?: ResearchProject): void {
  new ResearchProjectEditModal(app, store, onSubmit, project).open();
}

class ResearchProjectEditModal extends Modal {
  private title: string;
  private description: string;
  private status: ResearchProject["status"];
  private progress: number;
  private startDate: string;
  private deadline: string;
  private tagIds: string[];

  constructor(
    app: App,
    private readonly store: DashboardStore,
    private readonly onSubmit: (values: Omit<ResearchProject, "id">) => Promise<void>,
    project?: ResearchProject
  ) {
    super(app);
    this.title = project?.title ?? "";
    this.description = project?.description ?? "";
    this.status = project?.status ?? "进行中";
    this.progress = project?.progress ?? 0;
    this.startDate = project?.startDate ?? formatDateKey(new Date());
    this.deadline = project?.deadline ?? formatDateKey(new Date());
    this.tagIds = [...(project?.tagIds ?? this.legacyTagIds(project))];
  }

  onOpen(): void {
    applyResizableModal(this, {
      className: "cute-research-project-edit-modal",
      width: "min(760px, 90vw)",
      maxWidth: "96vw",
      maxHeight: "92vh",
      minWidth: "min(520px, 90vw)",
      minHeight: "min(420px, 82vh)"
    });
    this.render();
  }

  private render(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-paper-modal", "cow-research-project-edit-modal");
    this.contentEl.createEl("h2", { text: this.title ? "编辑研究项目" : "新增研究项目" });
    const form = this.contentEl.createDiv({ cls: "cow-paper-form" });
    this.inputField(form, "标题", this.title, (value) => this.title = value);
    this.selectField(form, "状态", this.status, statusOptions(["未开始", "进行中", "撰写中", "已完成"]), (value) => this.status = value as ResearchProject["status"]);
    this.inputField(form, "进度", String(this.progress), (value) => this.progress = Number(value) || 0, "number");
    this.inputField(form, "开始日期", this.startDate, (value) => this.startDate = value, "date");
    this.inputField(form, "截止日期", this.deadline, (value) => this.deadline = value, "date");
    this.descriptionField(form);
    this.tagField(form);
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", () => void this.save());
  }

  private inputField(container: HTMLElement, label: string, value: string, onInput: (value: string) => void, type = "text"): void {
    const row = container.createDiv({ cls: "cow-book-form-row" });
    row.createEl("label", { text: label });
    const input = row.createEl("input", { attr: { type, value } });
    input.addEventListener("input", () => onInput(input.value));
  }

  private selectField(container: HTMLElement, label: string, value: string, options: Array<{ value: string; label: string }>, onChange: (value: string) => void): void {
    const row = container.createDiv({ cls: "cow-book-form-row" });
    row.createEl("label", { text: label });
    const select = row.createEl("select");
    options.forEach((option) => select.createEl("option", { value: option.value, text: option.label }));
    select.value = value;
    select.addEventListener("change", () => onChange(select.value));
  }

  private descriptionField(container: HTMLElement): void {
    const row = container.createDiv({ cls: "cow-book-form-row cow-project-description-field" });
    row.createEl("label", { text: "项目描述" });
    const textarea = row.createEl("textarea", { attr: { rows: "5", placeholder: "简单描述研究目标、研究内容或当前方向……" } });
    textarea.value = this.description;
    textarea.addEventListener("input", () => this.description = textarea.value);
  }

  private tagField(container: HTMLElement): void {
    const row = container.createDiv({ cls: "cow-book-form-row cow-paper-tag-picker" });
    row.createEl("label", { text: "标签" });
    const list = row.createDiv({ cls: "cow-paper-tag-options" });
    const selected = new Set(this.tagIds);
    this.store.getPaperTags().forEach((tag) => {
      const button = list.createEl("button", { cls: selected.has(tag.id) ? "is-active" : "", attr: { type: "button", style: `--paper-color: ${tag.color}` } });
      button.setText(`${selected.has(tag.id) ? "✓ " : ""}${tag.name}`);
      button.addEventListener("click", () => {
        if (selected.has(tag.id)) selected.delete(tag.id);
        else selected.add(tag.id);
        this.tagIds = [...selected];
        button.toggleClass("is-active", selected.has(tag.id));
        button.setText(`${selected.has(tag.id) ? "✓ " : ""}${tag.name}`);
      });
    });
  }

  private legacyTagIds(project: ResearchProject | undefined): string[] {
    if (!project?.tags) return [];
    return project.tags
      .map((tag) => this.store.getPaperTags().find((definition) => definition.name.toLowerCase() === tag.toLowerCase())?.id)
      .filter(Boolean) as string[];
  }

  private async save(): Promise<void> {
    if (!this.title.trim()) {
      new Notice("请输入研究项目标题。");
      return;
    }
    const tags = this.tagIds
      .map((id) => this.store.getPaperTags().find((tag) => tag.id === id)?.name)
      .filter(Boolean) as string[];
    await this.onSubmit({
      title: this.title.trim(),
      description: this.description.trim(),
      status: this.status,
      progress: Math.max(0, Math.min(100, this.progress)),
      startDate: this.startDate,
      deadline: this.deadline,
      tags,
      tagIds: [...this.tagIds]
    });
    this.close();
  }
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
  ], async (values) => {
    const now = Date.now();
    await onSubmit({
      ...values,
      tagIds: paper?.tagIds ?? [],
      createdAt: paper?.createdAt ?? now,
      updatedAt: now
    });
  }).open();
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
  new CrudItemModal(app, objective ? "编辑季度目标" : "新增季度目标", {
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
