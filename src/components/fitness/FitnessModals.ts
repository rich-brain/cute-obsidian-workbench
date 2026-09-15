import { App, Modal, Notice, Setting, setIcon } from "obsidian";
import { formatDateKey, type DashboardStore } from "../../core/DashboardStore";
import type { BodyMeasurement, FitnessGoal, FitnessHabitDefinition, HealthReminder } from "../../types/dashboard";
import { applyResizableModal } from "../ResizableModal";
import { StatisticsCalendar, type FitnessCalendarIndicator } from "./StatisticsCalendar";

type GoalTab = "all" | "active" | "completed" | "overdue" | "past";
type HealthStatsMode = "all" | "water" | "sleep" | "custom";

function today(): string {
  return formatDateKey(new Date());
}

function nowIso(): string {
  return new Date().toISOString();
}

function createField(container: HTMLElement, label: string, type: string, value: string): HTMLInputElement {
  const row = container.createDiv({ cls: "cow-fitness-form-row" });
  row.createEl("label", { text: label });
  const input = row.createEl("input", { attr: { type, value } });
  return input;
}

function createTextArea(container: HTMLElement, label: string, value: string): HTMLTextAreaElement {
  const row = container.createDiv({ cls: "cow-fitness-form-row" });
  row.createEl("label", { text: label });
  return row.createEl("textarea", { text: value });
}

function toNumber(input: HTMLInputElement): number {
  return Number(input.value) || 0;
}

function setupEditModal(modal: Modal, className: string): void {
  applyResizableModal(modal, {
    className,
    width: "min(760px, 90vw)",
    maxWidth: "94vw",
    maxHeight: "88vh",
    minWidth: "min(420px, 90vw)",
    minHeight: "min(320px, 80vh)"
  });
}

function setupStatsModal(modal: Modal, className: string): void {
  applyResizableModal(modal, {
    className,
    width: "min(1050px, 92vw)",
    height: "min(720px, 86vh)",
    maxWidth: "96vw",
    maxHeight: "92vh",
    minWidth: "min(620px, 92vw)",
    minHeight: "min(420px, 86vh)"
  });
}

export function openBodyMeasurementModal(app: App, store: DashboardStore, onDone: () => void, item?: BodyMeasurement): void {
  new BodyMeasurementModal(app, store, onDone, item).open();
}

class BodyMeasurementModal extends Modal {
  constructor(
    app: App,
    private readonly store: DashboardStore,
    private readonly onDone: () => void,
    private readonly item?: BodyMeasurement
  ) {
    super(app);
  }

  onOpen(): void {
    setupEditModal(this, "cute-fitness-edit-modal");
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-fitness-modal");
    this.contentEl.createEl("h2", { text: this.item ? "编辑身体数据" : "记录身体数据" });
    const form = this.contentEl.createDiv({ cls: "cow-fitness-form-grid" });
    const date = createField(form, "日期", "date", this.item?.date ?? today());
    const weight = createField(form, "体重", "number", String(this.item?.weight ?? ""));
    const bmi = createField(form, "BMI", "number", String(this.item?.bmi ?? ""));
    const waist = createField(form, "腰围", "number", String(this.item?.waist ?? ""));
    const chest = createField(form, "胸围", "number", String(this.item?.chest ?? ""));
    const hip = createField(form, "臀围", "number", String(this.item?.hip ?? ""));
    const note = createTextArea(this.contentEl, "备注", this.item?.note ?? "");
    [weight, bmi, waist, chest, hip].forEach((input) => input.setAttr("step", "0.1"));

    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      const values: BodyMeasurement = {
        id: this.item?.id ?? `measure-${Date.now()}`,
        date: date.value || today(),
        weight: toNumber(weight),
        bmi: toNumber(bmi),
        waist: toNumber(waist),
        chest: toNumber(chest),
        hip: toNumber(hip),
        note: note.value.trim(),
        createdAt: this.item?.createdAt ?? nowIso(),
        updatedAt: nowIso()
      };
      if (this.item) {
        await this.store.updateBodyMeasurement(this.item.id ?? this.item.date, values);
        this.onDone();
        this.close();
        return;
      }
      const sameDate = this.store.getBodyMeasurements().find((record) => record.date === values.date);
      if (sameDate) {
        new SameDayMeasurementModal(this.app, async (mode) => {
          if (mode === "update") {
            await this.store.updateBodyMeasurement(sameDate.id ?? sameDate.date, { ...values, id: sameDate.id });
          } else {
            await this.store.addBodyMeasurement({ ...values, id: `measure-${Date.now()}` });
          }
          this.onDone();
          this.close();
        }).open();
        return;
      }
      await this.store.addBodyMeasurement(values);
      this.onDone();
      this.close();
    });
  }
}

class SameDayMeasurementModal extends Modal {
  constructor(app: App, private readonly onChoose: (mode: "update" | "new") => Promise<void>) {
    super(app);
  }

  onOpen(): void {
    setupEditModal(this, "cute-fitness-confirm-modal");
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: "当天已有记录" });
    this.contentEl.createEl("p", { text: "默认建议更新当天记录，也可以保留为新增记录。" });
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "新增记录", attr: { type: "button" } }).addEventListener("click", async () => {
      await this.onChoose("new");
      this.close();
    });
    actions.createEl("button", { text: "更新当天记录", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      await this.onChoose("update");
      this.close();
    });
  }
}

export class BodyMeasurementStatisticsModal extends Modal {
  constructor(app: App, private readonly store: DashboardStore, private readonly onDone: () => void) {
    super(app);
  }

  onOpen(): void {
    setupStatsModal(this, "cute-fitness-stats-modal");
    this.render();
  }

  private render(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-fitness-modal", "cow-fitness-stats-modal");
    this.contentEl.createEl("h2", { text: "身体数据统计" });
    const measurements = this.store.getBodyMeasurements();
    const first = measurements[0];
    const latest = measurements[measurements.length - 1];
    const stats = this.contentEl.createDiv({ cls: "cow-stats-card-grid" });
    [
      ["体重变化", this.formatDelta(latest?.weight, first?.weight, "kg")],
      ["BMI变化", this.formatDelta(latest?.bmi, first?.bmi, "")],
      ["腰围变化", this.formatDelta(latest?.waist, first?.waist, "cm")],
      ["胸围变化", this.formatDelta(latest?.chest, first?.chest, "cm")],
      ["臀围变化", this.formatDelta(latest?.hip, first?.hip, "cm")]
    ].forEach(([label, value]) => {
      const card = stats.createDiv({ cls: "cow-stats-card" });
      card.createEl("strong", { text: value });
      card.createSpan({ text: label });
    });
    const calendarRoot = this.contentEl.createDiv();
    new StatisticsCalendar({
      getIndicators: (dateKey) => measurements.some((item) => item.date === dateKey) ? ["pink"] : [],
      renderDayDetails: (container, dateKey) => this.renderMeasurementDetails(container, dateKey)
    }).render(calendarRoot);
  }

  private renderMeasurementDetails(container: HTMLElement, dateKey: string): void {
    const records = this.store.getBodyMeasurements().filter((item) => item.date === dateKey);
    if (records.length === 0) {
      container.createEl("p", { cls: "cow-empty-state", text: "这一天没有身体数据。" });
      return;
    }
    records.forEach((record) => {
      const row = container.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: `${record.weight}kg · BMI ${record.bmi}` });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `腰围 ${record.waist}cm · 胸围 ${record.chest}cm · 臀围 ${record.hip}cm` });
      if (record.note) row.createEl("p", { text: record.note });
      const actions = row.createDiv({ cls: "cow-list-item-actions" });
      actions.createEl("button", { text: "编辑", attr: { type: "button" } }).addEventListener("click", () => openBodyMeasurementModal(this.app, this.store, () => {
        this.onDone();
        this.render();
      }, record));
      actions.createEl("button", { text: "删除", cls: "mod-warning", attr: { type: "button" } }).addEventListener("click", async () => {
        await this.store.deleteBodyMeasurement(record.id ?? record.date);
        this.onDone();
        this.render();
      });
    });
  }

  private formatDelta(latest?: number, first?: number, unit = ""): string {
    if (latest === undefined || first === undefined) return "--";
    const delta = Math.round((latest - first) * 10) / 10;
    return `${delta > 0 ? "+" : ""}${delta}${unit}`;
  }
}

export function openDailyHealthHabitModal(app: App, store: DashboardStore, onDone: () => void, date = today()): void {
  new DailyHealthHabitModal(app, store, onDone, date).open();
}

class DailyHealthHabitModal extends Modal {
  private date: string;

  constructor(app: App, private readonly store: DashboardStore, private readonly onDone: () => void, date: string) {
    super(app);
    this.date = date;
  }

  onOpen(): void {
    setupEditModal(this, "cute-fitness-edit-modal");
    this.render();
  }

  private render(): void {
    const record = this.store.getFitnessDailyRecord(this.date);
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-fitness-modal");
    this.contentEl.createEl("h2", { text: "编辑饮水与睡眠" });
    const dateInput = createField(this.contentEl, "日期", "date", this.date);
    dateInput.addEventListener("change", () => {
      this.date = dateInput.value || today();
      this.render();
    });

    const water = this.contentEl.createDiv({ cls: "cow-fitness-form-section" });
    water.createEl("h3", { text: "饮水" });
    const waterGoal = createField(water, "饮水目标（杯）", "number", String(record.waterGoal));
    const waterCups = createField(water, "今日饮水杯数", "number", String(record.waterCups));
    const waterStep = water.createDiv({ cls: "cow-fitness-stepper" });
    waterStep.createEl("button", { text: "-", attr: { type: "button" } }).addEventListener("click", () => waterCups.value = String(Math.max(0, toNumber(waterCups) - 1)));
    waterStep.createEl("button", { text: "+", attr: { type: "button" } }).addEventListener("click", () => waterCups.value = String(toNumber(waterCups) + 1));
    const waterNote = createTextArea(water, "饮水备注", record.waterNote ?? "");

    const sleep = this.contentEl.createDiv({ cls: "cow-fitness-form-section" });
    sleep.createEl("h3", { text: "睡眠" });
    const sleepGoal = createField(sleep, "睡眠目标（小时）", "number", String(record.sleepGoal));
    const sleepHours = createField(sleep, "睡眠时长（小时）", "number", String(record.sleepHours));
    const bedtime = createField(sleep, "入睡时间", "time", record.bedtime ?? "");
    const wakeTime = createField(sleep, "起床时间", "time", record.wakeTime ?? "");
    const sleepNote = createTextArea(sleep, "睡眠备注", record.sleepNote ?? "");

    const custom = this.contentEl.createDiv({ cls: "cow-fitness-form-section" });
    const customHead = custom.createDiv({ cls: "cow-fitness-subhead" });
    customHead.createEl("h3", { text: "自定义习惯" });
    customHead.createEl("button", { text: "+ 添加习惯", attr: { type: "button" } }).addEventListener("click", () => {
      new FitnessHabitDefinitionModal(this.app, this.store, () => this.render()).open();
    });
    this.store.getFitnessHabitDefinitions().forEach((definition) => this.renderCustomHabit(custom, definition));

    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      await this.store.updateFitnessDailyRecord(this.date, {
        waterGoal: toNumber(waterGoal),
        waterCups: toNumber(waterCups),
        waterNote: waterNote.value.trim(),
        sleepGoal: toNumber(sleepGoal),
        sleepHours: toNumber(sleepHours),
        bedtime: bedtime.value,
        wakeTime: wakeTime.value,
        sleepNote: sleepNote.value.trim()
      });
      const rows = this.contentEl.querySelectorAll<HTMLInputElement>("[data-fitness-habit-id]");
      for (const input of Array.from(rows)) {
        await this.store.updateFitnessHabitRecord(this.date, input.dataset.fitnessHabitId ?? "", { actualValue: toNumber(input) });
      }
      this.onDone();
      this.close();
    });
  }

  private renderCustomHabit(container: HTMLElement, definition: FitnessHabitDefinition): void {
    const daily = this.store.getFitnessHabitRecords(this.date).find((item) => item.habitId === definition.id);
    const row = container.createDiv({ cls: "cow-fitness-habit-row" });
    const body = row.createDiv();
    body.createEl("strong", { text: definition.name });
    body.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${definition.targetName}: ${definition.targetValue}${definition.unit}` });
    const input = row.createEl("input", { attr: { type: "number", value: String(daily?.actualValue ?? 0) } });
    input.dataset.fitnessHabitId = definition.id;
    const actions = row.createDiv({ cls: "cow-list-item-actions" });
    actions.createEl("button", { text: "↑", attr: { type: "button", "aria-label": "上移" } }).addEventListener("click", async () => {
      await this.store.moveFitnessHabitDefinition(definition.id, -1);
      this.render();
    });
    actions.createEl("button", { text: "↓", attr: { type: "button", "aria-label": "下移" } }).addEventListener("click", async () => {
      await this.store.moveFitnessHabitDefinition(definition.id, 1);
      this.render();
    });
    const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑习惯" } });
    setIcon(edit, "pencil");
    edit.addEventListener("click", () => new FitnessHabitDefinitionModal(this.app, this.store, () => this.render(), definition).open());
    const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除习惯" } });
    setIcon(remove, "trash-2");
    remove.addEventListener("click", async () => {
      await this.store.deleteFitnessHabitDefinition(definition.id);
      this.render();
    });
  }
}

class FitnessHabitDefinitionModal extends Modal {
  constructor(
    app: App,
    private readonly store: DashboardStore,
    private readonly onDone: () => void,
    private readonly definition?: FitnessHabitDefinition
  ) {
    super(app);
  }

  onOpen(): void {
    setupEditModal(this, "cute-fitness-edit-modal");
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-fitness-modal");
    this.contentEl.createEl("h2", { text: this.definition ? "编辑自定义习惯" : "新增自定义习惯" });
    const name = createField(this.contentEl, "习惯名称", "text", this.definition?.name ?? "");
    const targetName = createField(this.contentEl, "目标名称", "text", this.definition?.targetName ?? "");
    const targetValue = createField(this.contentEl, "目标值", "number", String(this.definition?.targetValue ?? 0));
    const unit = createField(this.contentEl, "单位", "text", this.definition?.unit ?? "");
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      const values = {
        name: name.value.trim() || "自定义习惯",
        targetName: targetName.value.trim() || "每日目标",
        targetValue: toNumber(targetValue),
        unit: unit.value.trim()
      };
      if (this.definition) {
        await this.store.updateFitnessHabitDefinition(this.definition.id, values);
      } else {
        await this.store.addFitnessHabitDefinition(values);
      }
      this.onDone();
      this.close();
    });
  }
}

export class HealthHabitStatisticsModal extends Modal {
  private mode: HealthStatsMode = "all";

  constructor(app: App, private readonly store: DashboardStore) {
    super(app);
  }

  onOpen(): void {
    setupStatsModal(this, "cute-fitness-stats-modal");
    this.render();
  }

  private render(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-fitness-modal", "cow-fitness-stats-modal");
    this.contentEl.createEl("h2", { text: "饮水与睡眠统计" });
    const filters = this.contentEl.createDiv({ cls: "cow-focus-filter-row" });
    [
      ["all", "全部"],
      ["water", "饮水"],
      ["sleep", "睡眠"],
      ["custom", "自定义习惯"]
    ].forEach(([id, label]) => {
      const button = filters.createEl("button", { cls: this.mode === id ? "is-active" : "", text: label, attr: { type: "button" } });
      button.addEventListener("click", () => {
        this.mode = id as HealthStatsMode;
        this.render();
      });
    });
    const root = this.contentEl.createDiv();
    new StatisticsCalendar({
      getIndicators: (dateKey) => this.getHabitIndicators(dateKey),
      renderDayDetails: (container, dateKey) => this.renderHealthDetails(container, dateKey)
    }).render(root);
  }

  private getHabitIndicators(dateKey: string): FitnessCalendarIndicator[] {
    const record = this.store.getFitnessDailyRecord(dateKey);
    const custom = this.store.getFitnessHabitRecords(dateKey);
    const dots: FitnessCalendarIndicator[] = [];
    if ((this.mode === "all" || this.mode === "water") && (record.waterCups > 0 || record.waterNote)) dots.push("blue");
    if ((this.mode === "all" || this.mode === "sleep") && (record.sleepHours > 0 || record.bedtime || record.wakeTime)) dots.push("purple");
    if ((this.mode === "all" || this.mode === "custom") && custom.length > 0) dots.push("green");
    return dots;
  }

  private renderHealthDetails(container: HTMLElement, dateKey: string): void {
    const record = this.store.getFitnessDailyRecord(dateKey);
    const list = container.createDiv({ cls: "cow-data-list" });
    list.createDiv({ cls: "cow-data-card" }).createEl("strong", { text: `饮水 ${record.waterCups}/${record.waterGoal} 杯` });
    if (record.waterNote) list.createDiv({ cls: "cow-data-card" }).createEl("p", { text: record.waterNote });
    list.createDiv({ cls: "cow-data-card" }).createEl("strong", { text: `睡眠 ${record.sleepHours}/${record.sleepGoal} 小时` });
    list.createDiv({ cls: "cow-data-card" }).createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${record.bedtime || "--"} - ${record.wakeTime || "--"}` });
    this.store.getFitnessHabitDefinitions().forEach((definition) => {
      const daily = this.store.getFitnessHabitRecords(dateKey).find((item) => item.habitId === definition.id);
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: definition.name });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${daily?.actualValue ?? 0}/${definition.targetValue}${definition.unit}` });
    });
  }
}

export function openFitnessGoalModal(app: App, store: DashboardStore, onDone: () => void, goal?: FitnessGoal): void {
  new FitnessGoalModal(app, store, onDone, goal).open();
}

class FitnessGoalModal extends Modal {
  constructor(app: App, private readonly store: DashboardStore, private readonly onDone: () => void, private readonly goal?: FitnessGoal) {
    super(app);
  }

  onOpen(): void {
    setupEditModal(this, "cute-fitness-edit-modal");
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-fitness-modal");
    this.contentEl.createEl("h2", { text: this.goal ? "编辑健身目标" : "新增健身目标" });
    const title = createField(this.contentEl, "目标名称", "text", this.goal?.title ?? "");
    const current = createField(this.contentEl, "当前值", "number", String(this.goal?.currentValue ?? this.goal?.current ?? 0));
    const target = createField(this.contentEl, "目标值", "number", String(this.goal?.targetValue ?? this.goal?.target ?? 0));
    const unit = createField(this.contentEl, "单位", "text", this.goal?.unit ?? "");
    const startDate = createField(this.contentEl, "开始日期", "date", this.goal?.startDate ?? today());
    const deadline = createField(this.contentEl, "截止日期", "date", this.goal?.deadline ?? today());
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      const values: FitnessGoal = {
        id: this.goal?.id ?? `fitness-goal-${Date.now()}`,
        title: title.value.trim() || "健身目标",
        currentValue: toNumber(current),
        targetValue: toNumber(target),
        unit: unit.value.trim(),
        startDate: startDate.value || today(),
        deadline: deadline.value || today(),
        completedDate: this.goal?.completedDate,
        status: this.goal?.status ?? "active",
        createdAt: this.goal?.createdAt ?? nowIso(),
        updatedAt: nowIso()
      };
      if (this.goal) {
        await this.store.updateFitnessGoal(this.goal.id, values);
      } else {
        await this.store.addFitnessGoal(values);
      }
      this.onDone();
      this.close();
    });
  }
}

export class FitnessGoalStatisticsModal extends Modal {
  private tab: GoalTab = "all";

  constructor(app: App, private readonly store: DashboardStore, private readonly onDone: () => void) {
    super(app);
  }

  onOpen(): void {
    setupStatsModal(this, "cute-fitness-stats-modal");
    this.render();
  }

  private render(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-fitness-modal", "cow-fitness-stats-modal");
    this.contentEl.createEl("h2", { text: "健身目标统计" });
    const goals = this.store.getFitnessGoals();
    const active = goals.filter((goal) => getGoalStatus(goal) === "active");
    const completed = goals.filter((goal) => getGoalStatus(goal) === "completed");
    const overdue = goals.filter((goal) => getGoalStatus(goal) === "overdue");
    const stats = this.contentEl.createDiv({ cls: "cow-stats-card-grid" });
    [
      ["进行中", active.length],
      ["已完成", completed.length],
      ["已逾期", overdue.length],
      ["完成率", `${goals.length ? Math.round((completed.length / goals.length) * 100) : 0}%`]
    ].forEach(([label, value]) => {
      const card = stats.createDiv({ cls: "cow-stats-card" });
      card.createEl("strong", { text: String(value) });
      card.createSpan({ text: String(label) });
    });
    const tabs = this.contentEl.createDiv({ cls: "cow-focus-filter-row" });
    [
      ["all", "全部"],
      ["active", "进行中"],
      ["completed", "已完成"],
      ["overdue", "已逾期"],
      ["past", "往日目标"]
    ].forEach(([id, label]) => {
      tabs.createEl("button", { cls: this.tab === id ? "is-active" : "", text: label, attr: { type: "button" } }).addEventListener("click", () => {
        this.tab = id as GoalTab;
        this.render();
      });
    });
    const calendarRoot = this.contentEl.createDiv();
    new StatisticsCalendar({
      getIndicators: (dateKey) => this.getGoalIndicators(dateKey),
      renderDayDetails: (container, dateKey) => this.renderGoalDetails(container, dateKey)
    }).render(calendarRoot);
    this.renderGoalList(this.contentEl.createDiv({ cls: "cow-data-list cow-fitness-history-list" }));
  }

  private getGoalIndicators(dateKey: string): FitnessCalendarIndicator[] {
    const dots: FitnessCalendarIndicator[] = [];
    this.store.getFitnessGoals().forEach((goal) => {
      if (goal.startDate === dateKey) dots.push("blue");
      if (goal.deadline === dateKey) dots.push("yellow");
      if (goal.completedDate === dateKey) dots.push("green");
    });
    return dots;
  }

  private renderGoalDetails(container: HTMLElement, dateKey: string): void {
    const goals = this.store.getFitnessGoals().filter((goal) => goal.startDate === dateKey || goal.deadline === dateKey || goal.completedDate === dateKey);
    if (goals.length === 0) {
      container.createEl("p", { cls: "cow-empty-state", text: "这一天没有相关目标。" });
      return;
    }
    goals.forEach((goal) => container.createDiv({ cls: "cow-data-card" }).createEl("strong", { text: goal.title }));
  }

  private renderGoalList(container: HTMLElement): void {
    this.store.getFitnessGoals().filter((goal) => {
      const status = getGoalStatus(goal);
      if (this.tab === "past") return status === "completed" && Boolean(goal.completedDate && goal.completedDate < today());
      if (this.tab === "all") return true;
      return status === this.tab;
    }).forEach((goal) => {
      const row = container.createDiv({ cls: `cow-data-card cow-fitness-goal-${getGoalStatus(goal)}` });
      row.createEl("strong", { text: goal.title });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${goal.currentValue ?? goal.current ?? 0}/${goal.targetValue ?? goal.target ?? 0}${goal.unit} · ${goal.deadline}` });
    });
  }
}

export function openHealthReminderModal(app: App, store: DashboardStore, onDone: () => void, reminder?: HealthReminder): void {
  new HealthReminderModal(app, store, onDone, reminder).open();
}

class HealthReminderModal extends Modal {
  constructor(app: App, private readonly store: DashboardStore, private readonly onDone: () => void, private readonly reminder?: HealthReminder) {
    super(app);
  }

  onOpen(): void {
    setupEditModal(this, "cute-fitness-edit-modal");
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-fitness-modal");
    this.contentEl.createEl("h2", { text: this.reminder ? "编辑健康提醒" : "新增健康提醒" });
    const title = createField(this.contentEl, "提醒名称", "text", this.reminder?.title ?? "");
    const date = createField(this.contentEl, "日期", "date", this.reminder?.date ?? today());
    const time = createField(this.contentEl, "时间", "time", this.reminder?.time ?? "09:00");
    const repeat = this.contentEl.createDiv({ cls: "cow-fitness-form-row" });
    repeat.createEl("label", { text: "重复" });
    const repeatSelect = repeat.createEl("select");
    [
      ["once", "仅一次"],
      ["daily", "每天"],
      ["weekdays", "工作日"],
      ["weekly", "每周"],
      ["custom", "自定义星期"]
    ].forEach(([value, label]) => repeatSelect.createEl("option", { text: label, value }));
    repeatSelect.value = this.reminder?.repeatType ?? "once";
    const note = createTextArea(this.contentEl, "备注", this.reminder?.note ?? "");
    const enabledRow = this.contentEl.createDiv({ cls: "cow-fitness-form-row is-inline" });
    const enabled = enabledRow.createEl("input", { attr: { type: "checkbox" } });
    enabled.checked = this.reminder?.enabled ?? true;
    enabledRow.createEl("label", { text: "启用提醒" });
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      const values: HealthReminder = {
        id: this.reminder?.id ?? `health-${Date.now()}`,
        title: title.value.trim() || "健康提醒",
        date: date.value || today(),
        time: time.value || "09:00",
        repeatType: repeatSelect.value as HealthReminder["repeatType"],
        repeatDays: this.reminder?.repeatDays ?? [],
        note: note.value.trim(),
        enabled: enabled.checked,
        createdAt: this.reminder?.createdAt ?? nowIso(),
        updatedAt: nowIso()
      };
      if (this.reminder) {
        await this.store.updateHealthReminder(this.reminder.id, values);
      } else {
        await this.store.addHealthReminder(values);
      }
      this.onDone();
      this.close();
    });
  }
}

export class HealthReminderStatisticsModal extends Modal {
  constructor(app: App, private readonly store: DashboardStore) {
    super(app);
  }

  onOpen(): void {
    setupStatsModal(this, "cute-fitness-stats-modal");
    this.render();
  }

  private render(): void {
    const logs = this.store.getHealthReminderLogs();
    const week = new Set(this.store.getCurrentWeekDates());
    const weekLogs = logs.filter((log) => week.has(log.date));
    const completed = weekLogs.filter((log) => log.status === "completed" || log.status === "triggered").length;
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-fitness-modal", "cow-fitness-stats-modal");
    this.contentEl.createEl("h2", { text: "健康提醒统计" });
    const stats = this.contentEl.createDiv({ cls: "cow-stats-card-grid" });
    [
      ["本周提醒次数", weekLogs.length],
      ["已完成", completed],
      ["错过", weekLogs.filter((log) => log.status === "missed").length],
      ["完成率", `${weekLogs.length ? Math.round((completed / weekLogs.length) * 100) : 0}%`]
    ].forEach(([label, value]) => {
      const card = stats.createDiv({ cls: "cow-stats-card" });
      card.createEl("strong", { text: String(value) });
      card.createSpan({ text: String(label) });
    });
    const root = this.contentEl.createDiv();
    new StatisticsCalendar({
      getIndicators: (dateKey) => logs.some((log) => log.date === dateKey) ? ["red"] : [],
      renderDayDetails: (container, dateKey) => this.renderReminderDetails(container, dateKey)
    }).render(root);
  }

  private renderReminderDetails(container: HTMLElement, dateKey: string): void {
    const logs = this.store.getHealthReminderLogs().filter((log) => log.date === dateKey);
    if (logs.length === 0) {
      container.createEl("p", { cls: "cow-empty-state", text: "这一天没有提醒记录。" });
      return;
    }
    logs.forEach((log) => {
      const reminder = this.store.getHealthReminders().find((item) => item.id === log.reminderId);
      const row = container.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: reminder?.title ?? "健康提醒" });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${log.scheduledTime} · ${log.triggeredAt ? new Date(log.triggeredAt).toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }) : "--"} · ${log.status}` });
      if (log.note) row.createEl("p", { text: log.note });
    });
  }
}

export function getGoalStatus(goal: FitnessGoal): NonNullable<FitnessGoal["status"]> {
  if (goal.status === "archived") return "archived";
  if (goal.status === "completed" || goal.completedDate) return "completed";
  if (goal.deadline && goal.deadline < today()) return "overdue";
  return "active";
}

