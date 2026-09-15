import { App, Modal, Notice, setIcon } from "obsidian";
import { formatDateKey, type DashboardStore } from "../../core/DashboardStore";
import type { Budget, FinanceTodo, InvestmentWatchItem, Transaction } from "../../types/dashboard";
import { applyResizableModal } from "../ResizableModal";
import { AddTransactionModal } from "./AddTransactionModal";

type PeriodFilter = "week" | "month" | "year";

function today(): string {
  return formatDateKey(new Date());
}

function monthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function currency(value: number): string {
  return `¥${Math.round(value * 100) / 100}`;
}

function createInput(container: HTMLElement, label: string, type: string, value: string): HTMLInputElement {
  const row = container.createDiv({ cls: `cow-finance-form-row ${type === "date" || type === "time" ? "is-picker" : ""}` });
  row.createEl("label", { text: label });
  const input = row.createEl("input", { attr: { type, value } });
  if (type === "date" || type === "time") {
    row.addEventListener("click", () => {
      input.focus();
      try {
        (input as HTMLInputElement & { showPicker?: () => void }).showPicker?.();
      } catch {
        input.focus();
      }
    });
  }
  return input;
}

function createTextarea(container: HTMLElement, label: string, value: string): HTMLTextAreaElement {
  const row = container.createDiv({ cls: "cow-finance-form-row" });
  row.createEl("label", { text: label });
  return row.createEl("textarea", { text: value });
}

function setupEditModal(modal: Modal): void {
  applyResizableModal(modal, {
    className: "cute-finance-edit-modal",
    width: "min(760px, 90vw)",
    maxWidth: "94vw",
    maxHeight: "88vh",
    minWidth: "min(420px, 90vw)",
    minHeight: "min(320px, 80vh)"
  });
}

function setupStatsModal(modal: Modal): void {
  applyResizableModal(modal, {
    className: "cute-finance-stats-modal",
    width: "min(1050px, 92vw)",
    height: "min(720px, 86vh)",
    maxWidth: "96vw",
    maxHeight: "92vh",
    minWidth: "min(620px, 92vw)",
    minHeight: "min(420px, 86vh)"
  });
}

function transactionsForMonth(store: DashboardStore, key: string): Transaction[] {
  return store.getTransactions().filter((item) => item.date.startsWith(key));
}

function sumTransactions(transactions: Transaction[], type: Transaction["type"]): number {
  return transactions.filter((item) => item.type === type).reduce((sum, item) => sum + item.amount, 0);
}

function renderSummaryCards(container: HTMLElement, items: Array<[string, string | number]>): void {
  const grid = container.createDiv({ cls: "cow-stats-card-grid" });
  items.forEach(([label, value]) => {
    const card = grid.createDiv({ cls: "cow-stats-card" });
    card.createEl("strong", { text: String(value) });
    card.createSpan({ text: label });
  });
}

class FinanceCalendar {
  private month = new Date();
  private selected = today();

  constructor(
    private readonly getDots: (date: string) => string[],
    private readonly renderDetails: (container: HTMLElement, date: string) => void
  ) {}

  render(container: HTMLElement): void {
    container.empty();
    const root = container.createDiv({ cls: "cow-finance-calendar-layout" });
    const calendar = root.createDiv({ cls: "cow-finance-calendar-panel" });
    const details = root.createDiv({ cls: "cow-finance-calendar-details" });
    const header = calendar.createDiv({ cls: "cow-finance-calendar-header" });
    header.createEl("button", { text: "<", attr: { type: "button" } }).addEventListener("click", () => {
      this.month = new Date(this.month.getFullYear(), this.month.getMonth() - 1, 1);
      this.render(container);
    });
    header.createEl("strong", { text: `${this.month.getFullYear()}年${this.month.getMonth() + 1}月` });
    header.createEl("button", { text: ">", attr: { type: "button" } }).addEventListener("click", () => {
      this.month = new Date(this.month.getFullYear(), this.month.getMonth() + 1, 1);
      this.render(container);
    });
    header.createEl("button", { text: "今天", attr: { type: "button" } }).addEventListener("click", () => {
      this.month = new Date();
      this.selected = today();
      this.render(container);
    });
    const grid = calendar.createDiv({ cls: "cow-finance-calendar-grid" });
    ["一", "二", "三", "四", "五", "六", "日"].forEach((day) => grid.createSpan({ cls: "cow-weekday", text: day }));
    const first = new Date(this.month.getFullYear(), this.month.getMonth(), 1);
    const offset = (first.getDay() + 6) % 7;
    const days = new Date(this.month.getFullYear(), this.month.getMonth() + 1, 0).getDate();
    for (let index = 0; index < offset; index += 1) grid.createSpan({ cls: "cow-calendar-empty" });
    for (let day = 1; day <= days; day += 1) {
      const date = formatDateKey(new Date(this.month.getFullYear(), this.month.getMonth(), day));
      const button = grid.createEl("button", { cls: `cow-finance-calendar-day ${date === this.selected ? "is-selected" : ""} ${date === today() ? "is-today" : ""}`, attr: { type: "button" } });
      button.createSpan({ text: String(day) });
      const dots = button.createDiv({ cls: "cow-calendar-dots" });
      this.getDots(date).slice(0, 4).forEach((dot) => dots.createSpan({ cls: dot }));
      button.addEventListener("click", () => {
        this.selected = date;
        this.render(container);
      });
    }
    details.createEl("h3", { text: this.selected });
    this.renderDetails(details, this.selected);
  }
}

export class MonthlyFinanceSummaryModal extends Modal {
  private month = new Date();

  constructor(app: App, private readonly store: DashboardStore, private readonly onDone: () => void) {
    super(app);
  }

  onOpen(): void {
    setupEditModal(this);
    this.render();
  }

  private render(): void {
    const key = monthKey(this.month);
    const transactions = transactionsForMonth(this.store, key);
    const incomeValue = sumTransactions(transactions, "income");
    const expenseValue = sumTransactions(transactions, "expense");
    const remainingValue = this.store.getMonthlyBudgetLimit() - expenseValue;
    const savingRateValue = incomeValue > 0 ? Math.round(((incomeValue - expenseValue) / incomeValue) * 100) : 0;
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-finance-modal");
    const header = this.contentEl.createDiv({ cls: "cow-finance-month-header" });
    header.createEl("button", { text: "<", attr: { type: "button" } }).addEventListener("click", () => {
      this.month = new Date(this.month.getFullYear(), this.month.getMonth() - 1, 1);
      this.render();
    });
    header.createEl("h2", { text: `${this.month.getFullYear()}年${this.month.getMonth() + 1}月` });
    header.createEl("button", { text: ">", attr: { type: "button" } }).addEventListener("click", () => {
      this.month = new Date(this.month.getFullYear(), this.month.getMonth() + 1, 1);
      this.render();
    });
    const form = this.contentEl.createDiv({ cls: "cow-finance-form-grid" });
    const income = createInput(form, "本月收入", "number", String(incomeValue));
    const expense = createInput(form, "本月支出", "number", String(expenseValue));
    const remaining = createInput(form, "预算剩余", "number", String(remainingValue));
    const savingRate = createInput(form, "储蓄率（自动）", "number", String(savingRateValue));
    savingRate.disabled = true;
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      await this.applyAdjustment("income", Number(income.value) - incomeValue, key);
      await this.applyAdjustment("expense", Number(expense.value) - expenseValue, key);
      await this.store.setMonthlyBudgetLimit((Number(expense.value) || 0) + (Number(remaining.value) || 0));
      this.onDone();
      this.close();
    });
  }

  private async applyAdjustment(type: Transaction["type"], delta: number, key: string): Promise<void> {
    if (Math.abs(delta) < 0.01) return;
    await this.store.addTransaction({
      id: `tx-adjust-${type}-${Date.now()}`,
      type,
      category: type === "income" ? "月度收入调整" : "月度支出调整",
      amount: Math.abs(delta),
      date: `${key}-01`,
      note: "月度收支管理调整"
    });
  }
}

export class MonthlyBudgetStatisticsModal extends Modal {
  private year = new Date().getFullYear();

  constructor(app: App, private readonly store: DashboardStore) {
    super(app);
  }

  onOpen(): void {
    setupStatsModal(this);
    this.render();
  }

  private render(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-finance-modal", "cow-finance-stats-modal");
    const header = this.contentEl.createDiv({ cls: "cow-finance-month-header" });
    header.createEl("button", { text: "上一年", attr: { type: "button" } }).addEventListener("click", () => {
      this.year -= 1;
      this.render();
    });
    header.createEl("h2", { text: `${this.year} 年预算统计` });
    header.createEl("button", { text: "下一年", attr: { type: "button" } }).addEventListener("click", () => {
      this.year += 1;
      this.render();
    });
    const grid = this.contentEl.createDiv({ cls: "cow-finance-year-grid" });
    for (let month = 1; month <= 12; month += 1) {
      const key = `${this.year}-${String(month).padStart(2, "0")}`;
      const tx = transactionsForMonth(this.store, key);
      const income = sumTransactions(tx, "income");
      const expense = sumTransactions(tx, "expense");
      const remaining = this.store.getMonthlyBudgetLimit() - expense;
      const card = grid.createDiv({ cls: "cow-data-card" });
      card.createEl("strong", { text: `${month}月` });
      card.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `收入 ${currency(income)} · 支出 ${currency(expense)}` });
      card.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `剩余 ${currency(remaining)} · 储蓄率 ${income > 0 ? Math.round(((income - expense) / income) * 100) : 0}%` });
    }
  }
}

export function openExpenseCategoryModal(app: App, store: DashboardStore, onDone: () => void, budget?: Budget): void {
  new ExpenseCategoryModal(app, store, onDone, budget).open();
}

class ExpenseCategoryModal extends Modal {
  constructor(app: App, private readonly store: DashboardStore, private readonly onDone: () => void, private readonly budget?: Budget) {
    super(app);
  }

  onOpen(): void {
    setupEditModal(this);
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-finance-modal");
    this.contentEl.createEl("h2", { text: this.budget ? "编辑分类" : "新增分类" });
    const category = createInput(this.contentEl, "分类名称", "text", this.budget?.category ?? "");
    const amount = createInput(this.contentEl, "预算金额", "number", String(this.budget?.amount ?? 0));
    const color = createInput(this.contentEl, "颜色", "color", this.budget?.color ?? "#ff7fb4");
    const icon = createInput(this.contentEl, "图标", "text", this.budget?.icon ?? "wallet");
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      const values: Budget = {
        id: this.budget?.id ?? `budget-${Date.now()}`,
        category: category.value.trim() || "其它",
        amount: Number(amount.value) || 0,
        spent: this.budget?.spent ?? 0,
        color: color.value,
        icon: icon.value.trim() || "wallet"
      };
      if (this.budget) await this.store.updateBudget(this.budget.id, values);
      else await this.store.addBudget(values);
      this.onDone();
      this.close();
    });
  }
}

export class ExpenseCategoryStatisticsModal extends Modal {
  private month = new Date();

  constructor(app: App, private readonly store: DashboardStore) {
    super(app);
  }

  onOpen(): void {
    setupStatsModal(this);
    this.render();
  }

  private render(): void {
    const key = monthKey(this.month);
    const expenses = transactionsForMonth(this.store, key).filter((tx) => tx.type === "expense");
    const total = sumTransactions(expenses, "expense");
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-finance-modal", "cow-finance-stats-modal");
    this.renderMonthHeader("支出分类统计");
    const groups = new Map<string, { amount: number; count: number }>();
    expenses.forEach((tx) => {
      const group = groups.get(tx.category) ?? { amount: 0, count: 0 };
      group.amount += tx.amount;
      group.count += 1;
      groups.set(tx.category, group);
    });
    const list = this.contentEl.createDiv({ cls: "cow-data-list" });
    Array.from(groups.entries()).sort((a, b) => b[1].amount - a[1].amount).forEach(([category, value]) => {
      const row = list.createDiv({ cls: "cow-finance-category-row" });
      row.createEl("strong", { text: category });
      const percent = total > 0 ? Math.round((value.amount / total) * 100) : 0;
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: "cow-month-progress-fill is-pink", attr: { style: `width: ${percent}%` } });
      row.createSpan({ text: `${currency(value.amount)} · ${percent}% · ${value.count}笔` });
    });
  }

  private renderMonthHeader(title: string): void {
    const header = this.contentEl.createDiv({ cls: "cow-finance-month-header" });
    header.createEl("button", { text: "<", attr: { type: "button" } }).addEventListener("click", () => {
      this.month = new Date(this.month.getFullYear(), this.month.getMonth() - 1, 1);
      this.render();
    });
    header.createEl("h2", { text: `${title} · ${this.month.getFullYear()}年${this.month.getMonth() + 1}月` });
    header.createEl("button", { text: ">", attr: { type: "button" } }).addEventListener("click", () => {
      this.month = new Date(this.month.getFullYear(), this.month.getMonth() + 1, 1);
      this.render();
    });
  }
}

export class TransactionManagerModal extends Modal {
  private filter = "";

  constructor(app: App, private readonly store: DashboardStore, private readonly onDone: () => void) {
    super(app);
  }

  onOpen(): void {
    setupStatsModal(this);
    this.render();
  }

  private render(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-finance-modal", "cow-finance-stats-modal");
    this.contentEl.createEl("h2", { text: "管理收支记录" });
    const filter = createInput(this.contentEl, "筛选", "text", this.filter);
    filter.addEventListener("input", () => {
      this.filter = filter.value;
      this.render();
    });
    const list = this.contentEl.createDiv({ cls: "cow-data-list" });
    this.store.getTransactions().filter((tx) => `${tx.date} ${tx.category} ${tx.note}`.includes(this.filter)).slice().reverse().forEach((tx) => this.renderTransactionRow(list, tx));
  }

  private renderTransactionRow(container: HTMLElement, tx: Transaction): void {
    const row = container.createDiv({ cls: "cow-data-card" });
    const head = row.createDiv({ cls: "cow-list-item-head" });
    const body = head.createDiv();
    body.createEl("strong", { text: `${tx.type === "income" ? "+" : "-"}${currency(tx.amount)} · ${tx.category}` });
    body.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${tx.date} · ${tx.note || "无备注"}` });
    const actions = head.createDiv({ cls: "cow-list-item-actions" });
    const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑" } });
    setIcon(edit, "pencil");
    edit.addEventListener("click", () => new AddTransactionModal(this.app, async (values) => {
      await this.store.updateTransaction(tx.id, values);
      this.onDone();
      this.render();
    }, tx, this.store.getBudgets()).open());
    const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除" } });
    setIcon(remove, "trash-2");
    remove.addEventListener("click", async () => {
      await this.store.deleteTransaction(tx.id);
      this.onDone();
      this.render();
    });
  }
}

export class IncomeExpenseStatisticsModal extends Modal {
  private period: PeriodFilter = "month";
  private month = new Date();

  constructor(app: App, private readonly store: DashboardStore) {
    super(app);
  }

  onOpen(): void {
    setupStatsModal(this);
    this.render();
  }

  private render(): void {
    const key = monthKey(this.month);
    let tx = this.store.getTransactions();
    if (this.period === "month") tx = transactionsForMonth(this.store, key);
    if (this.period === "year") tx = tx.filter((item) => item.date.startsWith(String(this.month.getFullYear())));
    if (this.period === "week") {
      const week = new Set(this.store.getCurrentWeekDates());
      tx = tx.filter((item) => week.has(item.date));
    }
    const income = sumTransactions(tx, "income");
    const expense = sumTransactions(tx, "expense");
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-finance-modal", "cow-finance-stats-modal");
    this.contentEl.createEl("h2", { text: "收支趋势统计" });
    const filters = this.contentEl.createDiv({ cls: "cow-focus-filter-row" });
    ([["week", "本周"], ["month", "本月"], ["year", "本年"]] as Array<[PeriodFilter, string]>).forEach(([id, label]) => {
      filters.createEl("button", { cls: this.period === id ? "is-active" : "", text: label, attr: { type: "button" } }).addEventListener("click", () => {
        this.period = id;
        this.render();
      });
    });
    renderSummaryCards(this.contentEl, [["收入", currency(income)], ["支出", currency(expense)], ["净结余", currency(income - expense)]]);
    const list = this.contentEl.createDiv({ cls: "cow-data-list" });
    tx.slice().sort((a, b) => a.date.localeCompare(b.date)).forEach((item) => {
      list.createDiv({ cls: "cow-data-card" }).createEl("strong", { text: `${item.date} · ${item.type === "income" ? "+" : "-"}${currency(item.amount)} · ${item.category}` });
    });
  }
}

export function openFinanceTodoModal(app: App, store: DashboardStore, onDone: () => void, todo?: FinanceTodo): void {
  new FinanceTodoModal(app, store, onDone, todo).open();
}

class FinanceTodoModal extends Modal {
  constructor(app: App, private readonly store: DashboardStore, private readonly onDone: () => void, private readonly todo?: FinanceTodo) {
    super(app);
  }

  onOpen(): void {
    setupEditModal(this);
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-finance-modal");
    this.contentEl.createEl("h2", { text: this.todo ? "编辑记账待办" : "新建记账待办" });
    const title = createInput(this.contentEl, "标题", "text", this.todo?.title ?? "");
    const date = createInput(this.contentEl, "日期", "date", this.todo?.date ?? today());
    const note = createTextarea(this.contentEl, "备注", this.todo?.note ?? "");
    const completedRow = this.contentEl.createDiv({ cls: "cow-finance-form-row is-inline" });
    const completed = completedRow.createEl("input", { attr: { type: "checkbox" } });
    completed.checked = this.todo?.completed ?? false;
    completedRow.createEl("label", { text: "已完成" });
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      const values: FinanceTodo = {
        id: this.todo?.id ?? `finance-todo-${Date.now()}`,
        title: title.value.trim() || "理财待办",
        date: date.value || today(),
        note: note.value.trim(),
        completed: completed.checked,
        createdAt: this.todo?.createdAt ?? new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      if (this.todo) await this.store.updateFinanceTodo(this.todo.id, values);
      else await this.store.addFinanceTodo(values);
      this.onDone();
      this.close();
    });
  }
}

export class FinanceTodoStatisticsModal extends Modal {
  constructor(app: App, private readonly store: DashboardStore, private readonly onDone: () => void) {
    super(app);
  }

  onOpen(): void {
    setupStatsModal(this);
    this.render();
  }

  private render(): void {
    const todos = this.store.getFinanceTodos();
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-finance-modal", "cow-finance-stats-modal");
    this.contentEl.createEl("h2", { text: "记账待办统计" });
    renderSummaryCards(this.contentEl, [["总待办", todos.length], ["已完成", todos.filter((item) => item.completed).length], ["未完成", todos.filter((item) => !item.completed).length], ["完成率", `${todos.length ? Math.round((todos.filter((item) => item.completed).length / todos.length) * 100) : 0}%`]]);
    new FinanceCalendar(
      (date) => todos.some((todo) => (todo.date ?? today()) === date) ? ["is-task"] : [],
      (container, date) => this.renderTodoDetails(container, date)
    ).render(this.contentEl.createDiv());
  }

  private renderTodoDetails(container: HTMLElement, date: string): void {
    this.store.getFinanceTodos().filter((todo) => (todo.date ?? today()) === date).forEach((todo) => {
      const row = container.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: `${todo.completed ? "✓ " : ""}${todo.title}` });
      if (todo.note) row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: todo.note });
      const actions = row.createDiv({ cls: "cow-list-item-actions" });
      actions.createEl("button", { text: "编辑", attr: { type: "button" } }).addEventListener("click", () => openFinanceTodoModal(this.app, this.store, () => {
        this.onDone();
        this.render();
      }, todo));
      actions.createEl("button", { text: todo.completed ? "取消完成" : "完成", attr: { type: "button" } }).addEventListener("click", async () => {
        await this.store.updateFinanceTodo(todo.id, { completed: !todo.completed });
        this.onDone();
        this.render();
      });
      actions.createEl("button", { text: "删除", cls: "mod-warning", attr: { type: "button" } }).addEventListener("click", async () => {
        await this.store.deleteFinanceTodo(todo.id);
        this.onDone();
        this.render();
      });
    });
  }
}

export function openInvestmentModal(app: App, store: DashboardStore, onDone: () => void, item?: InvestmentWatchItem): void {
  new InvestmentModal(app, store, onDone, item).open();
}

class InvestmentModal extends Modal {
  constructor(app: App, private readonly store: DashboardStore, private readonly onDone: () => void, private readonly item?: InvestmentWatchItem) {
    super(app);
  }

  onOpen(): void {
    setupEditModal(this);
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-finance-modal");
    this.contentEl.createEl("h2", { text: this.item ? "编辑投资观察" : "新增投资观察" });
    const name = createInput(this.contentEl, "名称", "text", this.item?.name ?? "");
    const code = createInput(this.contentEl, "代码", "text", this.item?.code ?? "");
    const price = createInput(this.contentEl, "当前价格", "number", String(this.item?.price ?? 0));
    const change = createInput(this.contentEl, "变化百分比", "number", String(this.item?.changePercent ?? 0));
    const type = createInput(this.contentEl, "类型", "text", this.item?.type ?? "");
    const note = createTextarea(this.contentEl, "备注", this.item?.note ?? "");
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      const values: InvestmentWatchItem = {
        id: this.item?.id ?? `watch-${Date.now()}`,
        name: name.value.trim() || "投资观察",
        code: code.value.trim(),
        price: Number(price.value) || 0,
        changePercent: Number(change.value) || 0,
        type: type.value.trim() || "其它",
        note: note.value.trim()
      };
      if (this.item) await this.store.updateInvestmentWatchItem(this.item.id, values);
      else await this.store.addInvestmentWatchItem(values);
      this.onDone();
      this.close();
    });
  }
}

export class InvestmentStatisticsModal extends Modal {
  constructor(app: App, private readonly store: DashboardStore) {
    super(app);
  }

  onOpen(): void {
    setupStatsModal(this);
    this.render();
  }

  private render(): void {
    const snapshots = this.store.getInvestmentSnapshots();
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-finance-modal", "cow-finance-stats-modal");
    this.contentEl.createEl("h2", { text: "投资观察统计" });
    new FinanceCalendar(
      (date) => snapshots.some((snapshot) => snapshot.date === date) ? ["is-note"] : [],
      (container, date) => {
        snapshots.filter((snapshot) => snapshot.date === date).forEach((snapshot) => {
          const item = this.store.getInvestmentWatchItems().find((watch) => watch.id === snapshot.investmentId);
          const row = container.createDiv({ cls: "cow-data-card" });
          row.createEl("strong", { text: item?.name ?? "投资观察" });
          row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${currency(snapshot.price)} · ${snapshot.changePercent}% · ${snapshot.note || "无备注"}` });
        });
      }
    ).render(this.contentEl.createDiv());
  }
}

export class TransactionStatisticsModal extends Modal {
  constructor(app: App, private readonly store: DashboardStore, private readonly onDone: () => void) {
    super(app);
  }

  onOpen(): void {
    setupStatsModal(this);
    this.render();
  }

  private render(): void {
    const key = monthKey(new Date());
    const tx = transactionsForMonth(this.store, key);
    const income = sumTransactions(tx, "income");
    const expense = sumTransactions(tx, "expense");
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-finance-modal", "cow-finance-stats-modal");
    this.contentEl.createEl("h2", { text: "记账统计" });
    renderSummaryCards(this.contentEl, [["本月收入", currency(income)], ["本月支出", currency(expense)], ["本月净结余", currency(income - expense)], ["本月记账笔数", tx.length]]);
    new FinanceCalendar(
      (date) => {
        const items = this.store.getTransactions().filter((item) => item.date === date);
        const dots = items.map((item) => item.type === "income" ? "is-task-done" : "is-task");
        return dots.length > 4 ? [...dots.slice(0, 4), "is-more"] : dots;
      },
      (container, date) => this.renderDayTransactions(container, date)
    ).render(this.contentEl.createDiv());
  }

  private renderDayTransactions(container: HTMLElement, date: string): void {
    const tx = this.store.getTransactions().filter((item) => item.date === date);
    const income = sumTransactions(tx, "income");
    const expense = sumTransactions(tx, "expense");
    renderSummaryCards(container, [["当日收入", currency(income)], ["当日支出", currency(expense)], ["净金额", currency(income - expense)], ["记账笔数", tx.length]]);
    tx.forEach((item) => {
      const row = container.createDiv({ cls: "cow-data-card" });
      const head = row.createDiv({ cls: "cow-list-item-head" });
      const body = head.createDiv();
      body.createEl("strong", { text: `${item.type === "income" ? "+" : "-"}${currency(item.amount)} · ${item.category}` });
      body.createDiv({ cls: "cow-meta-line" }).createSpan({ text: item.note || "无备注" });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      actions.createEl("button", { text: "编辑", attr: { type: "button" } }).addEventListener("click", () => new AddTransactionModal(this.app, async (values) => {
        await this.store.updateTransaction(item.id, values);
        this.onDone();
        this.render();
      }, item, this.store.getBudgets()).open());
      actions.createEl("button", { text: "删除", cls: "mod-warning", attr: { type: "button" } }).addEventListener("click", async () => {
        await this.store.deleteTransaction(item.id);
        this.onDone();
        this.render();
      });
    });
  }
}

