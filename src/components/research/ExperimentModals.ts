import { App, Modal, Notice, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import type { ExperimentPlan } from "../../types/dashboard";
import { applyResizableModal } from "../ResizableModal";

export function openExperimentEditModal(app: App, store: DashboardStore, mode: "plan" | "records", onDone: () => void, item?: ExperimentPlan): void {
  new ExperimentEditModal(app, store, mode, onDone, item).open();
}

class ExperimentEditModal extends Modal {
  private title: string;
  private date: string;
  private status: ExperimentPlan["status"];
  private notePath: string;
  private researchProjectId: string;
  private experimentPlanId: string;

  constructor(
    app: App,
    private readonly store: DashboardStore,
    private readonly mode: "plan" | "records",
    private readonly onDone: () => void,
    private readonly item?: ExperimentPlan
  ) {
    super(app);
    this.title = item?.title ?? "";
    this.date = item?.date ?? todayKey();
    this.status = item?.status ?? "计划中";
    this.notePath = item?.notePath ?? "";
    this.researchProjectId = item?.researchProjectId ?? "";
    this.experimentPlanId = item?.experimentPlanId ?? "";
  }

  onOpen(): void {
    applyResizableModal(this, {
      className: "cute-experiment-modal",
      width: "min(760px, 90vw)",
      maxWidth: "96vw",
      maxHeight: "92vh",
      minWidth: "min(520px, 90vw)",
      minHeight: "min(360px, 78vh)"
    });
    this.render();
  }

  private render(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-experiment-modal");
    this.contentEl.createEl("h2", { text: this.item ? "编辑实验" : this.mode === "plan" ? "新增实验计划" : "新增实验记录" });
    const form = this.contentEl.createDiv({ cls: "cow-paper-form" });
    inputField(form, "标题", this.title, (value) => this.title = value);
    dateField(form, "日期", this.date, (value) => this.date = value);
    selectField(form, "状态", this.status, ["未开始", "计划中", "进行中", "已完成"].map((value) => ({ value, label: value })), (value) => this.status = value as ExperimentPlan["status"]);
    if (this.mode === "plan") {
      selectField(form, "研究项目", this.researchProjectId, [
        { value: "", label: "未关联" },
        ...this.store.getResearchProjects().map((project) => ({ value: project.id, label: project.title }))
      ], (value) => this.researchProjectId = value);
    }
    if (this.mode === "records") {
      selectField(form, "所属实验计划", this.experimentPlanId, [
        { value: "", label: "无" },
        ...this.store.getExperimentPlans().map((plan) => ({ value: plan.id, label: plan.title }))
      ], (value) => this.experimentPlanId = value);
    }
    inputField(form, "Markdown 路径", this.notePath, (value) => this.notePath = value);
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", () => void this.save());
  }

  private async save(): Promise<void> {
    if (!this.title.trim()) {
      new Notice("请输入标题。");
      return;
    }
    const payload: ExperimentPlan = {
      id: this.item?.id ?? `experiment-${Date.now()}`,
      title: this.title.trim(),
      date: this.date,
      status: this.status,
      notePath: this.notePath || undefined,
      researchProjectId: this.mode === "plan" ? this.researchProjectId || undefined : undefined,
      experimentPlanId: this.mode === "records" ? this.experimentPlanId || undefined : undefined
    };
    if (this.item) await this.store.updateExperiment(this.mode, this.item.id, payload);
    else await this.store.addExperiment(this.mode, payload);
    this.onDone();
    this.close();
  }
}

export class ExperimentPlanDetailModal extends Modal {
  constructor(app: App, private readonly store: DashboardStore, private readonly plan: ExperimentPlan, private readonly onDone: () => void) {
    super(app);
  }

  onOpen(): void {
    applyResizableModal(this, {
      className: "cute-experiment-modal",
      width: "min(760px, 90vw)",
      maxWidth: "96vw",
      maxHeight: "92vh",
      minWidth: "min(520px, 90vw)",
      minHeight: "min(360px, 78vh)"
    });
    this.render();
  }

  private render(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-experiment-modal");
    this.contentEl.createEl("h2", { text: this.plan.title });
    const project = this.store.getResearchProjects().find((item) => item.id === this.plan.researchProjectId);
    this.contentEl.createDiv({ cls: "cow-meta-line", text: `${this.plan.date} · ${this.plan.status} · ${project?.title ?? "未关联项目"}` });
    this.contentEl.createEl("h3", { text: "实验记录" });
    const records = this.store.getExperimentRecords().filter((record) => record.experimentPlanId === this.plan.id);
    const list = this.contentEl.createDiv({ cls: "cow-data-list" });
    if (records.length === 0) {
      list.createDiv({ cls: "cow-empty-state", text: "暂无关联实验记录。" });
      return;
    }
    records.forEach((record) => {
      const row = list.createEl("button", { cls: "cow-data-card cow-click-card", attr: { type: "button" } });
      row.createEl("strong", { text: record.title });
      row.createDiv({ cls: "cow-meta-line", text: `${record.date} · ${record.status}` });
      row.addEventListener("click", () => new ExperimentRecordDetailModal(this.app, this.store, record, this.onDone).open());
    });
  }
}

export class ExperimentRecordDetailModal extends Modal {
  constructor(app: App, private readonly store: DashboardStore, private readonly record: ExperimentPlan, private readonly onDone: () => void) {
    super(app);
  }

  onOpen(): void {
    applyResizableModal(this, {
      className: "cute-experiment-modal",
      width: "min(680px, 90vw)",
      maxWidth: "96vw",
      maxHeight: "90vh",
      minWidth: "min(480px, 90vw)",
      minHeight: "min(320px, 74vh)"
    });
    this.render();
  }

  private render(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-experiment-modal");
    this.contentEl.createEl("h2", { text: this.record.title });
    this.contentEl.createDiv({ cls: "cow-meta-line", text: `${this.record.date} · ${this.record.status}` });
    const plan = this.store.getExperimentPlans().find((item) => item.id === this.record.experimentPlanId);
    const link = this.contentEl.createEl("button", { cls: "cow-bottom-add", attr: { type: "button" } });
    setIcon(link.createSpan(), "link");
    link.createSpan({ text: plan ? `所属实验计划：${plan.title}` : "未关联实验计划" });
    if (plan) link.addEventListener("click", () => new ExperimentPlanDetailModal(this.app, this.store, plan, this.onDone).open());
  }
}

export class DeleteExperimentPlanModal extends Modal {
  constructor(app: App, private readonly store: DashboardStore, private readonly plan: ExperimentPlan, private readonly onDone: () => void) {
    super(app);
  }

  onOpen(): void {
    applyResizableModal(this, {
      className: "cute-experiment-modal",
      width: "min(620px, 90vw)",
      maxWidth: "96vw",
      maxHeight: "86vh",
      minWidth: "min(420px, 90vw)",
      minHeight: "min(260px, 70vh)"
    });
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    const records = this.store.getExperimentRecords().filter((record) => record.experimentPlanId === this.plan.id);
    this.contentEl.createEl("h2", { text: "删除实验计划？" });
    this.contentEl.createEl("p", { text: records.length > 0 ? `存在 ${records.length} 条实验记录关联到该计划。` : "没有实验记录关联到该计划。" });
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    if (records.length > 0) {
      actions.createEl("button", { text: "解除关联", attr: { type: "button" } }).addEventListener("click", () => void this.deleteWithMigration(undefined));
      const other = this.store.getExperimentPlans().find((plan) => plan.id !== this.plan.id);
      if (other) {
        actions.createEl("button", { text: `迁移到：${other.title}`, attr: { type: "button" } }).addEventListener("click", () => void this.deleteWithMigration(other.id));
      }
    } else {
      actions.createEl("button", { text: "删除", cls: "mod-warning", attr: { type: "button" } }).addEventListener("click", () => void this.deleteWithMigration(undefined));
    }
  }

  private async deleteWithMigration(targetPlanId: string | undefined): Promise<void> {
    await this.store.migrateExperimentRecordsToPlan(this.plan.id, targetPlanId);
    await this.store.deleteExperiment("plan", this.plan.id);
    this.onDone();
    this.close();
  }
}

function inputField(container: HTMLElement, label: string, value: string, onInput: (value: string) => void): void {
  const row = container.createDiv({ cls: "cow-book-form-row" });
  row.createEl("label", { text: label });
  const input = row.createEl("input", { attr: { type: "text", value } });
  input.addEventListener("input", () => onInput(input.value));
}

function dateField(container: HTMLElement, label: string, value: string, onChange: (value: string) => void): void {
  const row = container.createDiv({ cls: "cow-book-form-row is-picker" });
  row.createEl("label", { text: label });
  const input = row.createEl("input", { attr: { type: "date", value } });
  row.addEventListener("click", () => {
    input.focus();
    try {
      (input as HTMLInputElement & { showPicker?: () => void }).showPicker?.();
    } catch {
      input.focus();
    }
  });
  input.addEventListener("change", () => onChange(input.value));
}

function selectField(container: HTMLElement, label: string, value: string, options: Array<{ value: string; label: string }>, onChange: (value: string) => void): void {
  const row = container.createDiv({ cls: "cow-book-form-row" });
  row.createEl("label", { text: label });
  const select = row.createEl("select");
  options.forEach((option) => select.createEl("option", { value: option.value, text: option.label }));
  select.value = value;
  select.addEventListener("change", () => onChange(select.value));
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}
