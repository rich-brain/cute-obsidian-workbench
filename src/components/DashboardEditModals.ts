import { App, Modal, Notice, setIcon } from "obsidian";
import { formatDateKey } from "../core/DashboardStore";
import { CrudItemModal } from "./CrudItemModal";
import type {
  Account,
  BodyMeasurement,
  Budget,
  FitnessDailyRecord,
  FitnessGoal,
  InvestmentWatchItem,
  PriorityMatrixItem,
  Transaction
} from "../types/dashboard";
import { applyResizableModal } from "./ResizableModal";
import { getAccountTypeIcon } from "./finance/accountIcons";

const ACCOUNT_TYPES = ["现金", "储蓄卡", "信用卡", "投资账户", "支付宝", "微信钱包", "证券", "其他"];
const QUADRANTS = [
  { value: "important-urgent", label: "重要且紧急" },
  { value: "important-not-urgent", label: "重要不紧急" },
  { value: "not-important-urgent", label: "不重要但紧急" },
  { value: "not-important-not-urgent", label: "不重要不紧急" }
];

export function openBodyMeasurementModal(app: App, onSubmit: (values: BodyMeasurement) => Promise<void>, item?: BodyMeasurement): void {
  new CrudItemModal(app, item ? "编辑围度记录" : "记录身体数据", {
    date: item?.date ?? formatDateKey(new Date()),
    weight: item?.weight ?? 0,
    bmi: item?.bmi ?? 0,
    waist: item?.waist ?? 0,
    chest: item?.chest ?? 0,
    hip: item?.hip ?? 0
  }, [
    { key: "date", name: "日期" },
    { key: "weight", name: "体重", type: "number" },
    { key: "bmi", name: "BMI", type: "number" },
    { key: "waist", name: "腰围", type: "number" },
    { key: "chest", name: "胸围", type: "number" },
    { key: "hip", name: "臀围", type: "number" }
  ], async (values) => onSubmit({ ...values, id: item?.id ?? `measure-${Date.now()}` })).open();
}

export function openFitnessDailyModal(app: App, record: FitnessDailyRecord, onSubmit: (values: FitnessDailyRecord) => Promise<void>): void {
  new CrudItemModal(app, "编辑习惯", { ...record }, [
    { key: "date", name: "日期" },
    { key: "waterCups", name: "饮水杯数", type: "number" },
    { key: "waterGoal", name: "饮水目标", type: "number" },
    { key: "sleepHours", name: "睡眠时长", type: "number" },
    { key: "sleepGoal", name: "睡眠目标", type: "number" },
    { key: "bedtime", name: "入睡时间" },
    { key: "wakeTime", name: "起床时间" }
  ], onSubmit).open();
}

export function openFitnessGoalModal(app: App, onSubmit: (values: FitnessGoal) => Promise<void>, goal?: FitnessGoal): void {
  new CrudItemModal(app, goal ? "编辑健身目标" : "新增健身目标", {
    title: goal?.title ?? "",
    current: goal?.current ?? 0,
    target: goal?.target ?? 0,
    unit: goal?.unit ?? "kg",
    deadline: goal?.deadline ?? formatDateKey(new Date())
  }, [
    { key: "title", name: "目标名称" },
    { key: "current", name: "当前值", type: "number" },
    { key: "target", name: "目标值", type: "number" },
    { key: "unit", name: "单位" },
    { key: "deadline", name: "截止日期" }
  ], async (values) => onSubmit({ ...values, id: goal?.id ?? `fitness-goal-${Date.now()}` })).open();
}

export function openBudgetModal(app: App, onSubmit: (values: Budget) => Promise<void>, budget?: Budget): void {
  new CrudItemModal(app, budget ? "编辑支出分类" : "新增支出分类", {
    category: budget?.category ?? "",
    amount: budget?.amount ?? 0,
    spent: budget?.spent ?? 0,
    color: budget?.color ?? "#ff7fb4"
  }, [
    { key: "category", name: "分类名称" },
    { key: "amount", name: "预算金额", type: "number" },
    { key: "color", name: "颜色" }
  ], async (values) => onSubmit({ ...values, id: budget?.id ?? `budget-${Date.now()}`, spent: budget?.spent ?? 0 })).open();
}

export function openAccountModal(app: App, onSubmit: (values: Account) => Promise<void>, account?: Account): void {
  new AccountModal(app, onSubmit, account).open();
}

class AccountModal extends Modal {
  constructor(app: App, private readonly onSubmit: (values: Account) => Promise<void>, private readonly account?: Account) {
    super(app);
  }

  onOpen(): void {
    applyResizableModal(this, {
      className: "cute-finance-edit-modal",
      width: "min(640px, 90vw)",
      maxWidth: "94vw",
      maxHeight: "88vh",
      minWidth: "min(360px, 90vw)",
      minHeight: "min(280px, 80vh)"
    });
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-finance-modal");
    this.contentEl.createEl("h2", { text: this.account ? "编辑账户" : "新增账户" });

    const form = this.contentEl.createDiv({ cls: "cow-finance-form-grid" });
    const nameRow = form.createDiv({ cls: "cow-finance-form-row" });
    nameRow.createEl("label", { text: "账户名称" });
    const name = nameRow.createEl("input", { attr: { type: "text", value: this.account?.name ?? "" } });

    const typeRow = form.createDiv({ cls: "cow-finance-form-row" });
    typeRow.createEl("label", { text: "账户类型" });
    const type = typeRow.createEl("select");
    ACCOUNT_TYPES.forEach((item) => type.createEl("option", { value: item, text: item }));
    type.value = this.account?.type ?? "储蓄卡";

    const balanceRow = form.createDiv({ cls: "cow-finance-form-row" });
    balanceRow.createEl("label", { text: "余额" });
    const balance = balanceRow.createEl("input", { attr: { type: "number", value: String(this.account?.balance ?? 0), step: "0.01" } });

    const preview = this.contentEl.createDiv({ cls: "cow-account-icon-preview" });
    const renderPreview = (): void => {
      preview.empty();
      const icon = preview.createSpan({ cls: "cow-account-icon" });
      setIcon(icon, getAccountTypeIcon(type.value as Account["type"]));
      preview.createSpan({ text: `${type.value} · ${name.value.trim() || "未命名账户"}` });
    };
    type.addEventListener("change", renderPreview);
    name.addEventListener("input", renderPreview);
    renderPreview();

    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      const accountType = type.value as Account["type"];
      await this.onSubmit({
        id: this.account?.id ?? `account-${Date.now()}`,
        name: name.value.trim() || "未命名账户",
        type: accountType,
        balance: Number(balance.value) || 0,
        icon: getAccountTypeIcon(accountType)
      });
      this.close();
    });
  }
}

export function openInvestmentWatchModal(app: App, onSubmit: (values: InvestmentWatchItem) => Promise<void>, item?: InvestmentWatchItem): void {
  new CrudItemModal(app, item ? "编辑投资观察" : "新增投资观察", {
    name: item?.name ?? "",
    code: item?.code ?? "",
    price: item?.price ?? 0,
    changePercent: item?.changePercent ?? 0,
    type: item?.type ?? "指数"
  }, [
    { key: "name", name: "名称" },
    { key: "code", name: "代码" },
    { key: "price", name: "当前价格", type: "number" },
    { key: "changePercent", name: "变化百分比", type: "number" },
    { key: "type", name: "类型" }
  ], async (values) => onSubmit({ ...values, id: item?.id ?? `watch-${Date.now()}` })).open();
}

export function openPriorityItemModal(app: App, onSubmit: (values: PriorityMatrixItem) => Promise<void>, item?: PriorityMatrixItem): void {
  new CrudItemModal(app, item ? "编辑优先级任务" : "新增优先级任务", {
    title: item?.title ?? "",
    quadrant: item?.quadrant ?? "important-urgent",
    note: item?.note ?? "",
    completed: item?.completed ?? false
  }, [
    { key: "title", name: "标题" },
    { key: "quadrant", name: "象限", type: "select", options: QUADRANTS },
    { key: "note", name: "备注", type: "textarea" },
    { key: "completed", name: "已完成", type: "checkbox" }
  ], async (values) => onSubmit({ ...values, id: item?.id ?? `priority-${Date.now()}` })).open();
}

export function showUsedCategoryNotice(category: string): void {
  new Notice(`“${category}”仍有记账记录，暂不能删除。`);
}

export function openTransactionModal(app: App, onSubmit: (values: Transaction) => Promise<void>, transaction?: Transaction): void {
  new CrudItemModal(app, transaction ? "编辑收支记录" : "新增收支记录", {
    type: transaction?.type ?? "expense",
    category: transaction?.category ?? "餐饮",
    amount: transaction?.amount ?? 0,
    date: transaction?.date ?? formatDateKey(new Date()),
    accountId: transaction?.accountId ?? "",
    note: transaction?.note ?? ""
  }, [
    { key: "type", name: "类型", type: "select", options: [{ value: "expense", label: "支出" }, { value: "income", label: "收入" }] },
    { key: "category", name: "分类" },
    { key: "amount", name: "金额", type: "number" },
    { key: "date", name: "日期" },
    { key: "accountId", name: "账户" },
    { key: "note", name: "备注" }
  ], async (values) => onSubmit({ ...values, id: transaction?.id ?? `tx-${Date.now()}` })).open();
}
