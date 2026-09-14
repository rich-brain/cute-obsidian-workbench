import { App, Modal, Setting } from "obsidian";
import type { Transaction } from "../../types/dashboard";
import { formatDateKey } from "../../core/DashboardStore";

export class AddTransactionModal extends Modal {
  private type: Transaction["type"] = "expense";
  private category = "餐饮";
  private amount = 0;
  private date = formatDateKey(new Date());
  private note = "";

  constructor(
    app: App,
    private readonly onSubmit: (transaction: Transaction) => Promise<void>
  ) {
    super(app);
  }

  onOpen(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: "新增记账" });

    new Setting(this.contentEl).setName("类型").addDropdown((dropdown) => {
      dropdown.addOption("expense", "支出");
      dropdown.addOption("income", "收入");
      dropdown.setValue(this.type);
      dropdown.onChange((value) => {
        this.type = value as Transaction["type"];
      });
    });
    new Setting(this.contentEl).setName("分类").addText((text) => {
      text.setValue(this.category);
      text.onChange((value) => {
        this.category = value.trim() || "未分类";
      });
    });
    new Setting(this.contentEl).setName("金额").addText((text) => {
      text.inputEl.type = "number";
      text.onChange((value) => {
        this.amount = Number(value) || 0;
      });
    });
    new Setting(this.contentEl).setName("日期").addText((text) => {
      text.setValue(this.date);
      text.onChange((value) => {
        this.date = value.trim() || formatDateKey(new Date());
      });
    });
    new Setting(this.contentEl).setName("备注").addText((text) => {
      text.onChange((value) => {
        this.note = value.trim();
      });
    });

    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "保存", attr: { type: "button" } }).addEventListener("click", async () => {
      if (this.amount <= 0) {
        return;
      }
      await this.onSubmit({
        id: `tx-${Date.now()}`,
        type: this.type,
        category: this.category,
        amount: this.amount,
        date: this.date,
        note: this.note
      });
      this.close();
    });
  }
}
