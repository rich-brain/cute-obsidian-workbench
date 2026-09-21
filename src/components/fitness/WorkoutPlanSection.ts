import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import type { TrainingPlan } from "../../types/dashboard";
import { openTrainingPlanDetailModal, openTrainingPlanModal } from "./FitnessModals";

export class WorkoutPlanSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const plans = this.store.getTrainingPlans().sort((a, b) => a.startDate.localeCompare(b.startDate));
    const list = container.createDiv({ cls: "cow-data-list cow-training-plan-list" });
    if (plans.length === 0) {
      list.createDiv({ cls: "cow-empty-state", text: "暂无训练计划。训练计划用于记录准备怎么练，不是实际运动日志。" });
      return;
    }
    plans.forEach((plan) => this.renderPlan(list, plan));
  }

  private renderPlan(container: HTMLElement, plan: TrainingPlan): void {
    const goal = plan.fitnessGoalId ? this.store.getFitnessGoals().find((item) => item.id === plan.fitnessGoalId) : undefined;
    const row = container.createDiv({ cls: `cow-data-card cow-training-plan-card is-${plan.status ?? "active"}` });
    row.setAttr("role", "button");
    row.setAttr("tabindex", "0");
    row.addEventListener("click", () => openTrainingPlanDetailModal(this.app, this.store, this.onDataChanged, plan));
    row.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openTrainingPlanDetailModal(this.app, this.store, this.onDataChanged, plan);
      }
    });
    const head = row.createDiv({ cls: "cow-list-item-head" });
    const title = head.createDiv({ cls: "cow-training-plan-title" });
    title.createEl("strong", { text: plan.title });
    title.createDiv({ cls: "cow-meta-line", text: `${goal?.title ?? "未关联目标"} · ${formatDateRange(plan.startDate, plan.endDate)} · 每周 ${plan.weeklyFrequency ?? 0} 次 · ${this.statusLabel(plan.status ?? "active")}` });
    const actions = head.createDiv({ cls: "cow-list-item-actions" });
    this.iconButton(actions, "pencil", "编辑训练计划", () => openTrainingPlanModal(this.app, this.store, this.onDataChanged, plan));
    if (plan.status !== "completed") {
      this.iconButton(actions, "check", "完成训练计划", async () => {
        await this.store.completeTrainingPlan(plan.id);
        this.onDataChanged();
      });
    }
    this.iconButton(actions, "trash-2", "删除训练计划", async () => {
      if (!confirm(`删除“${plan.title}”训练计划？不会删除关联目标或 Markdown。`)) return;
      await this.store.deleteTrainingPlan(plan.id);
      this.onDataChanged();
    });
    if (plan.description) row.createEl("p", { text: plan.description });
  }

  private iconButton(container: HTMLElement, icon: string, label: string, onClick: () => void): void {
    const button = container.createEl("button", { attr: { type: "button", "aria-label": label } });
    setIcon(button, icon);
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      void onClick();
    });
  }

  private statusLabel(status: NonNullable<TrainingPlan["status"]>): string {
    if (status === "planned") return "未开始";
    if (status === "completed") return "已完成";
    if (status === "overdue") return "已逾期";
    return "进行中";
  }
}

function formatDateRange(startDate: string, endDate: string): string {
  return `${startDate} - ${endDate}`;
}
