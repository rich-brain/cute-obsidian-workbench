import { formatDateKey, type DashboardStore } from "../../core/DashboardStore";
import type { BodyMeasurement, TrainingPlan, Workout } from "../../types/dashboard";
import { calculatePlanExecution, workoutDuration } from "./FitnessModals";

type TrendRange = "week" | "month" | "quarter" | "custom";
type TrendCategory = "body" | "workout" | "execution";

interface TrendMetric {
  id: string;
  label: string;
  unit: string;
}

interface TrendPoint {
  date: string;
  value: number;
}

const BODY_METRICS: TrendMetric[] = [
  { id: "weight", label: "体重", unit: "kg" },
  { id: "bmi", label: "BMI", unit: "" },
  { id: "waist", label: "腰围", unit: "cm" },
  { id: "hip", label: "臀围", unit: "cm" },
  { id: "chest", label: "胸围", unit: "cm" }
];

const WORKOUT_METRICS: TrendMetric[] = [
  { id: "count", label: "训练次数", unit: "次" },
  { id: "duration", label: "总训练时长", unit: "min" },
  { id: "distance", label: "跑步距离", unit: "km" },
  { id: "frequency", label: "训练频率", unit: "次/日" }
];

const EXECUTION_METRICS: TrendMetric[] = [
  { id: "habitRate", label: "习惯完成率", unit: "%" },
  { id: "planRate", label: "训练计划完成率", unit: "%" }
];

export class FitnessStatsSection {
  private range: TrendRange = "week";
  private category: TrendCategory = "body";
  private metric = "weight";
  private customStart = formatDateKey(new Date());
  private customEnd = formatDateKey(new Date());

  constructor(private readonly store: DashboardStore) {}

  render(container: HTMLElement): void {
    const root = container.createDiv({ cls: "cow-fitness-trend" });
    this.renderContent(root);
  }

  private renderContent(root: HTMLElement): void {
    root.empty();
    this.renderControls(root);
    const range = this.getRange();
    const metric = this.getMetrics().find((item) => item.id === this.metric) ?? this.getMetrics()[0];
    if (!metric) {
      root.createDiv({ cls: "cow-empty-state", text: "暂无可用指标。" });
      return;
    }
    const points = this.getTrendPoints(metric.id, range.start, range.end);
    const chart = root.createDiv({ cls: "cow-fitness-trend-chart" });
    if (points.length === 0) {
      chart.createDiv({ cls: "cow-empty-state", text: "暂无数据" });
      return;
    }
    this.renderSvgChart(chart, points, metric);
    this.renderSummary(root, points, metric);
  }

  private renderControls(root: HTMLElement): void {
    const ranges = root.createDiv({ cls: "cow-fitness-trend-toolbar" });
    [
      ["week", "周"],
      ["month", "月"],
      ["quarter", "季度"],
      ["custom", "自定义"]
    ].forEach(([id, label]) => {
      const button = ranges.createEl("button", { cls: this.range === id ? "is-active" : "", text: label, attr: { type: "button" } });
      button.addEventListener("click", () => {
        this.range = id as TrendRange;
        this.renderContent(root);
      });
    });
    if (this.range === "custom") {
      const start = ranges.createEl("input", { attr: { type: "date", value: this.customStart, "aria-label": "趋势开始日期" } });
      const end = ranges.createEl("input", { attr: { type: "date", value: this.customEnd, "aria-label": "趋势结束日期" } });
      start.addEventListener("change", () => {
        this.customStart = start.value || this.customStart;
        this.renderContent(root);
      });
      end.addEventListener("change", () => {
        this.customEnd = end.value || this.customEnd;
        this.renderContent(root);
      });
    }

    const filters = root.createDiv({ cls: "cow-fitness-trend-filters" });
    const category = filters.createEl("select", { attr: { "aria-label": "趋势分类" } });
    [
      ["body", "身体指标"],
      ["workout", "运动"],
      ["execution", "习惯 / 执行"]
    ].forEach(([value, label]) => category.createEl("option", { value, text: label }));
    category.value = this.category;
    category.addEventListener("change", () => {
      this.category = category.value as TrendCategory;
      this.metric = this.getMetrics()[0]?.id ?? "";
      this.renderContent(root);
    });

    const metric = filters.createEl("select", { attr: { "aria-label": "趋势指标" } });
    this.getMetrics().forEach((item) => metric.createEl("option", { value: item.id, text: item.label }));
    metric.value = this.metric;
    metric.addEventListener("change", () => {
      this.metric = metric.value;
      this.renderContent(root);
    });
  }

  private renderSvgChart(container: HTMLElement, points: TrendPoint[], metric: TrendMetric): void {
    const width = 720;
    const height = 220;
    const padding = 28;
    const values = points.map((point) => point.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", `${metric.label}趋势图`);
    svg.classList.add("cow-fitness-trend-svg");
    const coords = points.map((point, index) => {
      const x = padding + (points.length === 1 ? (width - padding * 2) / 2 : (index / (points.length - 1)) * (width - padding * 2));
      const y = height - padding - ((point.value - min) / range) * (height - padding * 2);
      return { ...point, x, y };
    });
    const area = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    area.setAttribute("points", coords.map((point) => `${point.x},${point.y}`).join(" "));
    area.setAttribute("fill", "none");
    area.setAttribute("stroke", "var(--cute-primary)");
    area.setAttribute("stroke-width", "4");
    area.setAttribute("stroke-linecap", "round");
    area.setAttribute("stroke-linejoin", "round");
    svg.appendChild(area);
    coords.forEach((point) => {
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", String(point.x));
      circle.setAttribute("cy", String(point.y));
      circle.setAttribute("r", "5");
      circle.setAttribute("fill", "var(--cute-secondary)");
      const title = document.createElementNS("http://www.w3.org/2000/svg", "title");
      title.textContent = `${point.date}\n${metric.label}: ${this.formatValue(point.value, metric.unit)}`;
      circle.appendChild(title);
      svg.appendChild(circle);
    });
    container.appendChild(svg);
  }

  private renderSummary(root: HTMLElement, points: TrendPoint[], metric: TrendMetric): void {
    const first = points[0];
    const latest = points[points.length - 1];
    const delta = latest.value - first.value;
    const summary = root.createDiv({ cls: "cow-fitness-trend-summary" });
    summary.createSpan({ text: `起始 ${this.formatValue(first.value, metric.unit)}` });
    summary.createSpan({ text: `当前 ${this.formatValue(latest.value, metric.unit)}` });
    summary.createSpan({ text: `变化 ${delta > 0 ? "+" : ""}${this.formatValue(Math.round(delta * 10) / 10, metric.unit)}` });
  }

  private getMetrics(): TrendMetric[] {
    if (this.category === "workout") return WORKOUT_METRICS;
    if (this.category === "execution") return EXECUTION_METRICS;
    return BODY_METRICS.filter((metric) => this.store.getBodyMeasurements().some((item) => Number((item as unknown as Record<string, number>)[metric.id]) > 0));
  }

  private getTrendPoints(metricId: string, start: string, end: string): TrendPoint[] {
    if (this.category === "body") return this.getBodyPoints(metricId, start, end);
    if (this.category === "workout") return this.getWorkoutPoints(metricId, start, end);
    return this.getExecutionPoints(metricId, start, end);
  }

  private getBodyPoints(metricId: string, start: string, end: string): TrendPoint[] {
    return this.store.getBodyMeasurements()
      .filter((item) => item.date >= start && item.date <= end)
      .map((item) => ({ date: item.date, value: Number((item as unknown as Record<string, number>)[metricId]) || 0 }))
      .filter((point) => point.value > 0);
  }

  private getWorkoutPoints(metricId: string, start: string, end: string): TrendPoint[] {
    const days = this.enumerateDates(start, end);
    const workouts = this.store.getWorkouts().filter((item) => item.date >= start && item.date <= end);
    return days.map((date) => {
      const daily = workouts.filter((item) => item.date === date);
      if (metricId === "duration") return { date, value: daily.reduce((sum, item) => sum + workoutDuration(item), 0) };
      if (metricId === "distance") return { date, value: Math.round(daily.reduce((sum, item) => sum + (Number(item.distanceKm) || 0), 0) * 100) / 100 };
      if (metricId === "frequency") return { date, value: daily.length > 0 ? 1 : 0 };
      return { date, value: daily.length };
    }).filter((point) => point.value > 0);
  }

  private getExecutionPoints(metricId: string, start: string, end: string): TrendPoint[] {
    const days = this.enumerateDates(start, end);
    if (metricId === "planRate") {
      const plans = this.store.getTrainingPlans();
      return days.map((date) => ({ date, value: this.calculateDailyPlanRate(date, plans) })).filter((point) => point.value > 0);
    }
    return days.map((date) => ({ date, value: this.calculateDailyHabitRate(date) })).filter((point) => point.value > 0);
  }

  private calculateDailyPlanRate(date: string, plans: TrainingPlan[]): number {
    const activePlans = plans.filter((plan) => plan.startDate <= date && plan.endDate >= date && (plan.weeklyFrequency ?? 0) > 0);
    if (activePlans.length === 0) return 0;
    const rates = activePlans.map((plan) => calculatePlanExecution(plan, this.store.getWorkouts(), date).rate);
    return Math.round(rates.reduce((sum, item) => sum + item, 0) / rates.length);
  }

  private calculateDailyHabitRate(date: string): number {
    const definitions = this.store.getFitnessHabitDefinitions();
    if (definitions.length === 0) return 0;
    const records = this.store.getFitnessHabitRecords(date);
    const completed = definitions.filter((definition) => {
      const record = records.find((item) => item.habitId === definition.id);
      return record && record.actualValue >= definition.targetValue;
    }).length;
    return Math.round((completed / definitions.length) * 100);
  }

  private getRange(): { start: string; end: string } {
    const now = new Date();
    const end = formatDateKey(now);
    if (this.range === "custom") {
      return this.customStart <= this.customEnd
        ? { start: this.customStart, end: this.customEnd }
        : { start: this.customEnd, end: this.customStart };
    }
    const start = new Date(now);
    if (this.range === "week") start.setDate(now.getDate() - 6);
    if (this.range === "month") start.setDate(now.getDate() - 29);
    if (this.range === "quarter") start.setDate(now.getDate() - 89);
    return { start: formatDateKey(start), end };
  }

  private enumerateDates(start: string, end: string): string[] {
    const dates: string[] = [];
    const cursor = new Date(`${start}T00:00:00`);
    const last = new Date(`${end}T00:00:00`);
    while (cursor <= last) {
      dates.push(formatDateKey(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }
    return dates;
  }

  private formatValue(value: number, unit: string): string {
    const rounded = Math.round(value * 10) / 10;
    return `${rounded}${unit}`;
  }
}
