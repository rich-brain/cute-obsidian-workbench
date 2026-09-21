import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import type { Workout } from "../../types/dashboard";
import {
  openWorkoutRecordDetailModal,
  openWorkoutRecordModal,
  workoutDuration,
  workoutTitle,
  workoutTypeLabel
} from "./FitnessModals";

export class WorkoutLogSection {
  private dateFilter = "";
  private typeFilter = "";
  private planFilter = "";
  private goalFilter = "";

  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const root = container.createDiv({ cls: "cow-workout-log" });
    this.renderContent(root);
  }

  private renderContent(root: HTMLElement): void {
    root.empty();
    this.renderFilters(root);
    const list = root.createDiv({ cls: "cow-data-list" });
    const workouts = this.getFilteredWorkouts();
    if (workouts.length === 0) {
      list.createDiv({ cls: "cow-empty-state", text: "暂无符合条件的运动日志。" });
      return;
    }
    workouts.forEach((workout) => this.renderWorkout(list, workout));
  }

  private renderFilters(root: HTMLElement): void {
    const filters = root.createDiv({ cls: "cow-workout-filter-row" });
    const date = filters.createEl("input", { attr: { type: "date", value: this.dateFilter, "aria-label": "按日期筛选" } });
    date.addEventListener("change", () => {
      this.dateFilter = date.value;
      this.renderContent(root);
    });

    const type = filters.createEl("select", { attr: { "aria-label": "按训练类型筛选" } });
    [["", "全部类型"], ["跑步", "跑步"], ["力量", "力量"], ["骑行", "骑行"], ["游泳", "游泳"], ["瑜伽", "瑜伽"], ["其它", "其它"]].forEach(([value, label]) => {
      type.createEl("option", { value, text: label });
    });
    type.value = this.typeFilter;
    type.addEventListener("change", () => {
      this.typeFilter = type.value;
      this.renderContent(root);
    });

    const plan = filters.createEl("select", { attr: { "aria-label": "按训练计划筛选" } });
    plan.createEl("option", { value: "", text: "全部计划" });
    this.store.getTrainingPlans().forEach((item) => plan.createEl("option", { value: item.id, text: item.title }));
    plan.value = this.planFilter;
    plan.addEventListener("change", () => {
      this.planFilter = plan.value;
      this.renderContent(root);
    });

    const goal = filters.createEl("select", { attr: { "aria-label": "按健身目标筛选" } });
    goal.createEl("option", { value: "", text: "全部目标" });
    this.store.getFitnessGoals().forEach((item) => goal.createEl("option", { value: item.id, text: item.title }));
    goal.value = this.goalFilter;
    goal.addEventListener("change", () => {
      this.goalFilter = goal.value;
      this.renderContent(root);
    });
  }

  private renderWorkout(container: HTMLElement, workout: Workout): void {
    const plan = workout.trainingPlanId ? this.store.getTrainingPlans().find((item) => item.id === workout.trainingPlanId) : undefined;
    const goal = workout.fitnessGoalId ? this.store.getFitnessGoals().find((item) => item.id === workout.fitnessGoalId) : undefined;
    const row = container.createDiv({ cls: "cow-data-card cow-workout-card" });
    row.addEventListener("click", () => openWorkoutRecordDetailModal(this.app, this.store, this.onDataChanged, workout));
    const head = row.createDiv({ cls: "cow-list-item-head" });
    head.createEl("strong", { text: workoutTitle(workout) });
    const actions = head.createDiv({ cls: "cow-list-item-actions" });
    const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑运动日志" } });
    setIcon(edit, "pencil");
    edit.addEventListener("click", (event) => {
      event.stopPropagation();
      openWorkoutRecordModal(this.app, this.store, this.onDataChanged, workout);
    });
    const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除运动日志" } });
    setIcon(remove, "trash-2");
    remove.addEventListener("click", async (event) => {
      event.stopPropagation();
      await this.store.deleteWorkout(workout.id);
      this.onDataChanged();
    });
    row.createDiv({ cls: "cow-meta-line" }).createSpan({
      text: `${workout.date} · ${workoutTypeLabel(workout)} · ${workoutDuration(workout)}min${workout.distanceKm ? ` · ${workout.distanceKm}km` : ""}`
    });
    row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${plan?.title ?? "未关联计划"} · ${goal?.title ?? "未关联目标"}` });
    if (workout.resultSummary) row.createEl("p", { text: workout.resultSummary });
  }

  private getFilteredWorkouts(): Workout[] {
    return this.store.getWorkouts()
      .filter((workout) => !this.dateFilter || workout.date === this.dateFilter)
      .filter((workout) => !this.typeFilter || workoutTypeLabel(workout) === this.typeFilter)
      .filter((workout) => !this.planFilter || workout.trainingPlanId === this.planFilter)
      .filter((workout) => !this.goalFilter || workout.fitnessGoalId === this.goalFilter)
      .sort((left, right) => right.date.localeCompare(left.date));
  }
}
