import { App, Modal, Notice } from "obsidian";
import type { Budget, Transaction } from "../../types/dashboard";
import { formatDateKey } from "../../core/DashboardStore";
import { applyResizableModal } from "../ResizableModal";

const INCOME_CATEGORIES = ["工资", "奖金", "兼职", "投资", "退款", "其它"];

function today(): string {
  return formatDateKey(new Date());
}

function createClickableInput(container: HTMLElement, label: string, type: string, value: string): HTMLInputElement {
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

export class AddTransactionModal extends Modal {
  private type: Transaction["type"];

  constructor(
    app: App,
    private readonly onSubmit: (transaction: Transaction) => Promise<void>,
    private readonly transaction?: Transaction,
    private readonly budgets: Budget[] = []
  ) {
    super(app);
    this.type = transaction?.type ?? "expense";
  }

  onOpen(): void {
    applyResizableModal(this, {
      className: "cute-finance-edit-modal",
      width: "min(760px, 90vw)",
      maxWidth: "94vw",
      maxHeight: "88vh",
      minWidth: "min(420px, 90vw)",
      minHeight: "min(320px, 80vh)"
    });
    this.render();
  }

  private render(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-finance-modal");
    this.contentEl.createEl("h2", { text: this.transaction ? "编辑记账" : "新增记账" });

    const segment = this.contentEl.createDiv({ cls: "cow-finance-segment" });
    (["expense", "income"] as const).forEach((type) => {
      const button = segment.createEl("button", {
        cls: this.type === type ? "is-active" : "",
        text: type === "expense" ? "支出" : "收入",
        attr: { type: "button" }
      });
      button.addEventListener("click", () => {
        this.type = type;
        this.render();
      });
    });

    const form = this.contentEl.createDiv({ cls: "cow-finance-form-grid" });
    const categoryRow = form.createDiv({ cls: "cow-finance-form-row" });
    categoryRow.createEl("label", { text: "分类" });
    const category = categoryRow.createEl("select");
    const options = this.type === "income" ? INCOME_CATEGORIES : this.getExpenseCategories();
    options.forEach((item) => category.createEl("option", { text: item, value: item }));
    category.value = this.transaction?.category && options.includes(this.transaction.category) ? this.transaction.category : options[0] ?? "其它";

    const amount = createClickableInput(form, "金额", "number", String(this.transaction?.amount ?? ""));
    amount.min = "0.01";
    amount.step = "0.01";
    const date = createClickableInput(form, "日期", "date", this.transaction?.date ?? today());
    const noteRow = this.contentEl.createDiv({ cls: "cow-finance-form-row" });
    noteRow.createEl("label", { text: "备注" });
    const note = noteRow.createEl("textarea", { text: this.transaction?.note ?? "" });

    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "保存记账", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      const numericAmount = Number(amount.value) || 0;
      if (numericAmount <= 0) {
        new Notice("金额必须大于 0。");
        return;
      }
      await this.onSubmit({
        id: this.transaction?.id ?? `tx-${Date.now()}`,
        type: this.type,
        category: category.value || "其它",
        amount: Math.abs(numericAmount),
        date: date.value || today(),
        note: note.value.trim(),
        accountId: this.transaction?.accountId
      });
      this.close();
    });
  }

  private getExpenseCategories(): string[] {
    const categories = this.budgets.map((budget) => budget.category).filter(Boolean);
    return categories.length > 0 ? categories : ["餐饮", "居住", "交通", "购物", "学习", "娱乐", "其它"];
  }
}

