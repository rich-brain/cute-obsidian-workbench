import { App, Modal, Notice, Setting, setIcon } from "obsidian";
import { formatDateKey, type DashboardStore } from "../../core/DashboardStore";
import type { BodyMeasurement, FitnessGoal, FitnessHabitDefinition, HealthReminder, TrainingPlan, Workout } from "../../types/dashboard";
import { applyResizableModal } from "../ResizableModal";
import { MarkdownFilePicker, openVaultMarkdown } from "../research/MarkdownFilePicker";
import { StatisticsCalendar, type FitnessCalendarIndicator } from "./StatisticsCalendar";

type GoalTab = "all" | "active" | "completed" | "overdue" | "past";
type HealthStatsMode = "all" | "water" | "sleep" | "custom";
const FITNESS_GOAL_TYPES: NonNullable<FitnessGoal["type"]>[] = ["减重", "减脂", "增肌", "跑步", "力量", "运动频率", "其它"];
const WORKOUT_TYPES: NonNullable<Workout["workoutType"]>[] = ["跑步", "力量", "骑行", "游泳", "瑜伽", "其它"];

function today(): string {
  return formatDateKey(new Date());
}

function nowIso(): string {
  return new Date().toISOString();
}

function createField(container: HTMLElement, label: string, type: string, value: string): HTMLInputElement {
  const isPicker = type === "date" || type === "time";
  const row = container.createDiv({ cls: `cow-fitness-form-row ${isPicker ? "is-picker" : ""}` });
  row.createEl("label", { text: label });
  const input = row.createEl("input", { attr: { type, value } });
  if (isPicker) {
    row.addEventListener("click", (event) => {
      if (event.target instanceof HTMLInputElement && event.target !== input) return;
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
    this.contentEl.createEl("h2", { text: "编辑习惯" });
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
      const habitId = input.dataset.fitnessHabitId ?? "";
      const note = this.contentEl.querySelector<HTMLTextAreaElement>(`[data-fitness-habit-note-id="${habitId}"]`);
      await this.store.updateFitnessHabitRecord(this.date, habitId, { actualValue: toNumber(input), note: note?.value.trim() ?? "" });
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
    const note = row.createEl("textarea", { text: daily?.note ?? "", attr: { placeholder: "今日备注" } });
    note.dataset.fitnessHabitNoteId = definition.id;
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
    this.contentEl.createEl("h2", { text: "习惯统计" });
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
    const typeRow = this.contentEl.createDiv({ cls: "cow-fitness-form-row" });
    typeRow.createEl("label", { text: "目标类型" });
    const type = typeRow.createEl("select");
    FITNESS_GOAL_TYPES.forEach((item) => type.createEl("option", { value: item, text: item }));
    type.value = this.goal?.type ?? "其它";
    const current = createField(this.contentEl, "当前值", "number", String(this.goal?.currentValue ?? this.goal?.current ?? 0));
    const target = createField(this.contentEl, "目标值", "number", String(this.goal?.targetValue ?? this.goal?.target ?? 0));
    const unit = createField(this.contentEl, "单位", "text", this.goal?.targetUnit ?? this.goal?.unit ?? "");
    const progress = createField(this.contentEl, "进度 %", "number", String(this.goal?.progress ?? 0));
    const startDate = createField(this.contentEl, "开始日期", "date", this.goal?.startDate ?? today());
    const deadline = createField(this.contentEl, "截止日期", "date", this.goal?.deadline ?? today());
    const description = createTextArea(this.contentEl, "描述", this.goal?.description ?? "");
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      const values: FitnessGoal = {
        id: this.goal?.id ?? `fitness-goal-${Date.now()}`,
        title: title.value.trim() || "健身目标",
        type: type.value as FitnessGoal["type"],
        description: description.value.trim(),
        currentValue: toNumber(current),
        targetValue: toNumber(target),
        unit: unit.value.trim(),
        targetUnit: unit.value.trim(),
        progress: Math.max(0, Math.min(100, toNumber(progress))),
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

export function openFitnessGoalDetailModal(app: App, store: DashboardStore, onDone: () => void, goal: FitnessGoal): void {
  new FitnessGoalDetailModal(app, store, onDone, goal).open();
}

class FitnessGoalDetailModal extends Modal {
  constructor(app: App, private readonly store: DashboardStore, private readonly onDone: () => void, private readonly goal: FitnessGoal) {
    super(app);
  }

  onOpen(): void {
    setupStatsModal(this, "cute-fitness-detail-modal");
    this.render();
  }

  private render(): void {
    const goal = this.store.getFitnessGoals().find((item) => item.id === this.goal.id) ?? this.goal;
    const status = getGoalStatus(goal);
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-fitness-modal", "cow-fitness-detail-modal");
    const header = this.contentEl.createDiv({ cls: "cow-fitness-detail-header" });
    header.createEl("h2", { text: goal.title });
    header.createSpan({ cls: `cow-status is-${statusColor(status)}`, text: goalStatusLabel(status) });

    const summary = this.contentEl.createDiv({ cls: "cow-fitness-detail-grid" });
    this.detailItem(summary, "类型", goal.type ?? "其它");
    this.detailItem(summary, "目标值", `${goal.targetValue ?? goal.target ?? 0}${goal.targetUnit ?? goal.unit ?? ""}`);
    this.detailItem(summary, "开始日期", goal.startDate ?? "--");
    this.detailItem(summary, "截止日期", goal.deadline ?? "--");
    this.detailItem(summary, "当前进度", `${goal.progress ?? calculateGoalPercent(goal)}%`);
    this.detailItem(summary, "完成日期", goal.completedDate ?? "--");
    if (goal.description) this.contentEl.createEl("p", { text: goal.description });

    this.renderTrainingPlans();
    this.renderRelatedWorkouts();
    this.renderRelatedHabits();
    this.renderBodyMeasurements();

    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "编辑目标", attr: { type: "button" } }).addEventListener("click", () => {
      openFitnessGoalModal(this.app, this.store, () => {
        this.onDone();
        this.render();
      }, goal);
    });
    actions.createEl("button", { text: "关闭", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", () => this.close());
  }

  private detailItem(container: HTMLElement, label: string, value: string): void {
    const item = container.createDiv({ cls: "cow-stats-card" });
    item.createSpan({ text: label });
    item.createEl("strong", { text: value });
  }

  private renderTrainingPlans(): void {
    const section = this.contentEl.createDiv({ cls: "cow-fitness-detail-section" });
    section.createEl("strong", { text: "关联训练计划" });
    const plans = this.store.getTrainingPlans().filter((plan) => plan.fitnessGoalId === this.goal.id);
    if (plans.length === 0) {
      section.createDiv({ cls: "cow-empty-state", text: "暂无关联训练计划。" });
      return;
    }
    const list = section.createDiv({ cls: "cow-data-list" });
    plans.forEach((plan) => {
      const execution = calculatePlanExecution(plan, this.store.getWorkouts());
      const row = list.createEl("button", { cls: "cow-data-card cow-click-card", attr: { type: "button" } });
      row.createEl("strong", { text: plan.title });
      row.createDiv({ cls: "cow-meta-line", text: `${formatDateRange(plan.startDate, plan.endDate)} · ${trainingPlanStatusLabel(plan.status ?? "active")} · 执行率 ${execution.rate}%` });
      row.addEventListener("click", () => openTrainingPlanDetailModal(this.app, this.store, this.onDone, plan));
    });
  }

  private renderRelatedWorkouts(): void {
    const section = this.contentEl.createDiv({ cls: "cow-fitness-detail-section" });
    section.createEl("strong", { text: "相关运动记录" });
    const plans = this.store.getTrainingPlans().filter((plan) => plan.fitnessGoalId === this.goal.id);
    const planIds = new Set(plans.map((plan) => plan.id));
    const workouts = this.store.getWorkouts()
      .filter((workout) => workout.fitnessGoalId === this.goal.id || (workout.trainingPlanId ? planIds.has(workout.trainingPlanId) : false))
      .slice(0, 5);
    if (workouts.length === 0) {
      section.createDiv({ cls: "cow-empty-state", text: "暂无运动记录。" });
      return;
    }
    const list = section.createDiv({ cls: "cow-data-list" });
    workouts.forEach((workout) => {
      const row = list.createEl("button", { cls: "cow-data-card cow-click-card", attr: { type: "button" } });
      row.createEl("strong", { text: workoutTitle(workout) });
      row.createDiv({ cls: "cow-meta-line", text: `${workout.date} · ${workoutTypeLabel(workout)} · ${workoutDuration(workout)}min` });
      row.addEventListener("click", () => openWorkoutRecordDetailModal(this.app, this.store, this.onDone, workout));
    });
  }

  private renderRelatedHabits(): void {
    const section = this.contentEl.createDiv({ cls: "cow-fitness-detail-section" });
    section.createEl("strong", { text: "相关习惯" });
    const list = section.createDiv({ cls: "cow-data-list" });
    this.store.getFitnessHabitDefinitions().slice(0, 4).forEach((habit) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: habit.name });
      row.createDiv({ cls: "cow-meta-line", text: `${habit.targetName} ${habit.targetValue}${habit.unit}` });
    });
  }

  private renderBodyMeasurements(): void {
    const section = this.contentEl.createDiv({ cls: "cow-fitness-detail-section" });
    section.createEl("strong", { text: "身体数据变化" });
    const measurements = this.store.getBodyMeasurements().slice(-3);
    if (measurements.length === 0) {
      section.createDiv({ cls: "cow-empty-state", text: "暂无身体数据。" });
      return;
    }
    const list = section.createDiv({ cls: "cow-data-list" });
    measurements.forEach((item) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: item.date });
      row.createDiv({ cls: "cow-meta-line", text: `体重 ${item.weight}kg · BMI ${item.bmi} · 腰围 ${item.waist}cm` });
    });
  }
}

export function openTrainingPlanModal(app: App, store: DashboardStore, onDone: () => void, plan?: TrainingPlan): void {
  new TrainingPlanModal(app, store, onDone, plan).open();
}

export function openWorkoutRecordModal(app: App, store: DashboardStore, onDone: () => void, workout?: Workout): void {
  new WorkoutRecordModal(app, store, onDone, workout).open();
}

class WorkoutRecordModal extends Modal {
  private markdownPath: string;

  constructor(app: App, private readonly store: DashboardStore, private readonly onDone: () => void, private readonly workout?: Workout) {
    super(app);
    this.markdownPath = workout?.markdownPath ?? "";
  }

  onOpen(): void {
    setupEditModal(this, "cute-fitness-edit-modal");
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-fitness-modal");
    this.contentEl.createEl("h2", { text: this.workout ? "编辑运动日志" : "新增运动日志" });

    const form = this.contentEl.createDiv({ cls: "cow-fitness-form-grid" });
    const title = createField(form, "训练名称", "text", workoutTitle(this.workout ?? this.emptyWorkout()));
    const date = createField(form, "训练日期", "date", this.workout?.date ?? today());

    const typeRow = form.createDiv({ cls: "cow-fitness-form-row" });
    typeRow.createEl("label", { text: "训练类型" });
    const workoutType = typeRow.createEl("select");
    WORKOUT_TYPES.forEach((type) => workoutType.createEl("option", { text: type, value: type }));
    workoutType.value = this.workout?.workoutType ?? workoutTypeLabel(this.workout ?? this.emptyWorkout());

    const planRow = form.createDiv({ cls: "cow-fitness-form-row" });
    planRow.createEl("label", { text: "所属训练计划" });
    const planSelect = planRow.createEl("select");
    planSelect.createEl("option", { value: "", text: "不关联" });
    this.store.getTrainingPlans().forEach((plan) => planSelect.createEl("option", { value: plan.id, text: plan.title }));
    planSelect.value = this.workout?.trainingPlanId ?? "";

    const goalRow = form.createDiv({ cls: "cow-fitness-form-row" });
    goalRow.createEl("label", { text: "关联健身目标" });
    const goalSelect = goalRow.createEl("select");
    goalSelect.createEl("option", { value: "", text: "不关联" });
    this.store.getFitnessGoals().forEach((goal) => goalSelect.createEl("option", { value: goal.id, text: goal.title }));
    goalSelect.value = this.workout?.fitnessGoalId ?? this.store.getTrainingPlans().find((plan) => plan.id === planSelect.value)?.fitnessGoalId ?? "";

    const duration = createField(form, "训练时长（分钟）", "number", String(workoutDuration(this.workout ?? this.emptyWorkout()) || 30));
    const distance = createField(form, "跑步距离（km）", "number", String(this.workout?.distanceKm ?? ""));
    duration.setAttr("min", "0");
    distance.setAttr("min", "0");
    distance.setAttr("step", "0.01");

    planSelect.addEventListener("change", () => {
      const planGoalId = this.store.getTrainingPlans().find((plan) => plan.id === planSelect.value)?.fitnessGoalId;
      if (planGoalId) goalSelect.value = planGoalId;
    });

    const exerciseDetails = createTextArea(this.contentEl, "具体运动内容", this.workout?.exerciseDetails ?? "");
    const resultSummary = createTextArea(this.contentEl, "结果摘要", this.workout?.resultSummary ?? "");
    const feeling = createTextArea(this.contentEl, "训练感受", this.workout?.feeling ?? "");
    const note = createTextArea(this.contentEl, "备注", this.workout?.note ?? "");
    new MarkdownFilePicker(this.app, {
      label: "关联训练记录笔记",
      placeholder: "搜索 Vault 中的 Markdown 文件……",
      value: this.markdownPath,
      onChange: (path) => this.markdownPath = path
    }).render(this.contentEl);

    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      const selectedType = workoutType.value as NonNullable<Workout["workoutType"]>;
      const values: Workout = {
        id: this.workout?.id ?? `workout-${Date.now()}`,
        title: title.value.trim() || `${selectedType}训练`,
        date: date.value || today(),
        type: selectedType,
        workoutType: selectedType,
        trainingPlanId: planSelect.value || undefined,
        fitnessGoalId: goalSelect.value || undefined,
        duration: Math.max(0, toNumber(duration)),
        durationMinutes: Math.max(0, toNumber(duration)),
        calories: this.workout?.calories ?? 0,
        distanceKm: toNumber(distance) > 0 ? toNumber(distance) : undefined,
        exerciseDetails: exerciseDetails.value.trim(),
        resultSummary: resultSummary.value.trim(),
        feeling: feeling.value.trim(),
        note: note.value.trim(),
        markdownPath: this.markdownPath || undefined,
        completed: this.workout?.completed ?? true,
        createdAt: this.workout?.createdAt ?? nowIso(),
        updatedAt: nowIso()
      };
      if (this.workout) await this.store.updateWorkout(this.workout.id, values);
      else await this.store.addWorkout(values);
      this.onDone();
      this.close();
    });
  }

  private emptyWorkout(): Workout {
    return {
      id: "",
      title: "",
      date: today(),
      type: "力量",
      workoutType: "力量",
      duration: 30,
      durationMinutes: 30,
      calories: 0,
      completed: true,
      note: ""
    };
  }
}

export function openWorkoutRecordDetailModal(app: App, store: DashboardStore, onDone: () => void, workout: Workout): void {
  new WorkoutRecordDetailModal(app, store, onDone, workout).open();
}

class WorkoutRecordDetailModal extends Modal {
  constructor(app: App, private readonly store: DashboardStore, private readonly onDone: () => void, private readonly workout: Workout) {
    super(app);
  }

  onOpen(): void {
    setupStatsModal(this, "cute-fitness-detail-modal");
    this.render();
  }

  private render(): void {
    const workout = this.store.getWorkouts().find((item) => item.id === this.workout.id) ?? this.workout;
    const plan = workout.trainingPlanId ? this.store.getTrainingPlans().find((item) => item.id === workout.trainingPlanId) : undefined;
    const goal = workout.fitnessGoalId ? this.store.getFitnessGoals().find((item) => item.id === workout.fitnessGoalId) : undefined;
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-fitness-modal", "cow-fitness-detail-modal");
    this.contentEl.createEl("h2", { text: workoutTitle(workout) });
    const summary = this.contentEl.createDiv({ cls: "cow-fitness-detail-grid" });
    this.detailItem(summary, "日期", workout.date);
    this.detailItem(summary, "类型", workoutTypeLabel(workout));
    this.detailItem(summary, "时长", `${workoutDuration(workout)} min`);
    this.detailItem(summary, "距离", workout.distanceKm ? `${workout.distanceKm} km` : "--");
    this.detailItem(summary, "配速", workout.workoutType === "跑步" || workout.type === "跑步" ? calculatePace(workout) : "--");
    this.detailItem(summary, "关联计划", plan?.title ?? "未关联");
    this.detailItem(summary, "关联目标", goal?.title ?? "未关联");

    this.textBlock("具体运动内容", workout.exerciseDetails);
    this.textBlock("结果摘要", workout.resultSummary);
    this.textBlock("训练感受", workout.feeling);
    this.textBlock("备注", workout.note);

    const note = this.contentEl.createDiv({ cls: "cow-fitness-detail-section" });
    note.createEl("strong", { text: "关联训练记录笔记" });
    if (workout.markdownPath) {
      const button = note.createEl("button", { cls: "cow-data-card cow-click-card", attr: { type: "button" } });
      button.createEl("strong", { text: fileName(workout.markdownPath) });
      button.createDiv({ cls: "cow-meta-line", text: workout.markdownPath });
      button.addEventListener("click", () => void openVaultMarkdown(this.app, workout.markdownPath));
    } else {
      note.createDiv({ cls: "cow-empty-state", text: "暂无关联训练记录笔记。" });
    }

    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    if (plan) actions.createEl("button", { text: "查看计划", attr: { type: "button" } }).addEventListener("click", () => openTrainingPlanDetailModal(this.app, this.store, this.onDone, plan));
    actions.createEl("button", { text: "编辑日志", attr: { type: "button" } }).addEventListener("click", () => openWorkoutRecordModal(this.app, this.store, () => {
      this.onDone();
      this.render();
    }, workout));
    actions.createEl("button", { text: "关闭", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", () => this.close());
  }

  private detailItem(container: HTMLElement, label: string, value: string): void {
    const item = container.createDiv({ cls: "cow-stats-card" });
    item.createSpan({ text: label });
    item.createEl("strong", { text: value });
  }

  private textBlock(label: string, value?: string): void {
    if (!value) return;
    const block = this.contentEl.createDiv({ cls: "cow-fitness-detail-section" });
    block.createEl("strong", { text: label });
    block.createEl("p", { text: value });
  }
}

class TrainingPlanModal extends Modal {
  private markdownPath: string;

  constructor(app: App, private readonly store: DashboardStore, private readonly onDone: () => void, private readonly plan?: TrainingPlan) {
    super(app);
    this.markdownPath = plan?.markdownPath ?? "";
  }

  onOpen(): void {
    setupEditModal(this, "cute-fitness-edit-modal");
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-fitness-modal");
    this.contentEl.createEl("h2", { text: this.plan ? "编辑训练计划" : "新增训练计划" });
    const title = createField(this.contentEl, "计划名称", "text", this.plan?.title ?? "");
    const goalRow = this.contentEl.createDiv({ cls: "cow-fitness-form-row" });
    goalRow.createEl("label", { text: "所属健身目标" });
    const goalSelect = goalRow.createEl("select");
    goalSelect.createEl("option", { value: "", text: "不关联" });
    this.store.getFitnessGoals().forEach((goal) => goalSelect.createEl("option", { value: goal.id, text: goal.title }));
    goalSelect.value = this.plan?.fitnessGoalId ?? "";
    const startDate = createField(this.contentEl, "开始日期", "date", this.plan?.startDate ?? today());
    const endDate = createField(this.contentEl, "结束日期", "date", this.plan?.endDate ?? today());
    const weeklyFrequency = createField(this.contentEl, "每周训练频率", "number", String(this.plan?.weeklyFrequency ?? 3));
    const description = createTextArea(this.contentEl, "训练内容", this.plan?.description ?? "");
    const note = createTextArea(this.contentEl, "备注", this.plan?.note ?? "");
    new MarkdownFilePicker(this.app, {
      label: "关联训练方案笔记",
      placeholder: "搜索 Vault 中的 Markdown 文件……",
      value: this.markdownPath,
      onChange: (path) => this.markdownPath = path
    }).render(this.contentEl);

    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      const values: TrainingPlan = {
        id: this.plan?.id ?? `training-plan-${Date.now()}`,
        title: title.value.trim() || "训练计划",
        fitnessGoalId: goalSelect.value || undefined,
        startDate: startDate.value || today(),
        endDate: endDate.value && endDate.value >= (startDate.value || today()) ? endDate.value : startDate.value || today(),
        weeklyFrequency: Math.max(0, toNumber(weeklyFrequency)),
        description: description.value.trim(),
        note: note.value.trim(),
        markdownPath: this.markdownPath || undefined,
        status: this.plan?.status ?? "active",
        completedDate: this.plan?.completedDate,
        createdAt: this.plan?.createdAt ?? nowIso(),
        updatedAt: nowIso()
      };
      if (this.plan) await this.store.updateTrainingPlan(this.plan.id, values);
      else await this.store.addTrainingPlan(values);
      this.onDone();
      this.close();
    });
  }
}

export function openTrainingPlanDetailModal(app: App, store: DashboardStore, onDone: () => void, plan: TrainingPlan): void {
  new TrainingPlanDetailModal(app, store, onDone, plan).open();
}

class TrainingPlanDetailModal extends Modal {
  constructor(app: App, private readonly store: DashboardStore, private readonly onDone: () => void, private readonly plan: TrainingPlan) {
    super(app);
  }

  onOpen(): void {
    setupStatsModal(this, "cute-fitness-detail-modal");
    this.render();
  }

  private render(): void {
    const plan = this.store.getTrainingPlans().find((item) => item.id === this.plan.id) ?? this.plan;
    const goal = plan.fitnessGoalId ? this.store.getFitnessGoals().find((item) => item.id === plan.fitnessGoalId) : undefined;
    const workouts = this.store.getWorkouts().filter((workout) => workout.trainingPlanId === plan.id);
    const execution = calculatePlanExecution(plan, this.store.getWorkouts());
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-fitness-modal", "cow-fitness-detail-modal");
    this.contentEl.createEl("h2", { text: plan.title });
    const summary = this.contentEl.createDiv({ cls: "cow-fitness-detail-grid" });
    this.detailItem(summary, "关联目标", goal?.title ?? "未关联");
    this.detailItem(summary, "周期", formatDateRange(plan.startDate, plan.endDate));
    this.detailItem(summary, "每周频率", `${plan.weeklyFrequency ?? 0} 次`);
    this.detailItem(summary, "状态", trainingPlanStatusLabel(plan.status ?? "active"));
    this.detailItem(summary, "本周期计划", `${execution.planned} 次`);
    this.detailItem(summary, "实际训练", `${execution.actual} 次`);
    this.detailItem(summary, "执行率", `${execution.rate}%`);
    if (plan.description) this.contentEl.createEl("p", { text: plan.description });
    if (plan.note) this.contentEl.createEl("p", { text: plan.note });
    const note = this.contentEl.createDiv({ cls: "cow-fitness-detail-section" });
    note.createEl("strong", { text: "关联训练方案笔记" });
    if (plan.markdownPath) {
      const button = note.createEl("button", { cls: "cow-data-card cow-click-card", attr: { type: "button" } });
      button.createEl("strong", { text: fileName(plan.markdownPath) });
      button.createDiv({ cls: "cow-meta-line", text: plan.markdownPath });
      button.addEventListener("click", () => void openVaultMarkdown(this.app, plan.markdownPath));
    } else {
      note.createDiv({ cls: "cow-empty-state", text: "暂无关联训练方案笔记。" });
    }
    const logs = this.contentEl.createDiv({ cls: "cow-fitness-detail-section" });
    logs.createEl("strong", { text: "运动日志" });
    if (workouts.length === 0) {
      logs.createDiv({ cls: "cow-empty-state", text: "暂无关联运动日志。" });
    } else {
      const list = logs.createDiv({ cls: "cow-data-list" });
      workouts.forEach((workout) => {
        const row = list.createEl("button", { cls: "cow-data-card cow-click-card", attr: { type: "button" } });
        row.createEl("strong", { text: workoutTitle(workout) });
        row.createDiv({ cls: "cow-meta-line", text: `${workout.date} · ${workoutTypeLabel(workout)} · ${workoutDuration(workout)}min` });
        if (workout.resultSummary) row.createEl("p", { text: workout.resultSummary });
        row.addEventListener("click", () => openWorkoutRecordDetailModal(this.app, this.store, this.onDone, workout));
      });
    }
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "编辑计划", attr: { type: "button" } }).addEventListener("click", () => openTrainingPlanModal(this.app, this.store, () => {
      this.onDone();
      this.render();
    }, plan));
    actions.createEl("button", { text: "关闭", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", () => this.close());
  }

  private detailItem(container: HTMLElement, label: string, value: string): void {
    const item = container.createDiv({ cls: "cow-stats-card" });
    item.createSpan({ text: label });
    item.createEl("strong", { text: value });
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
  if (goal.status === "completed" || goal.completedDate || goal.progress === 100) return "completed";
  if (goal.startDate && today() < goal.startDate) return "planned";
  if (goal.deadline && goal.deadline < today()) return "overdue";
  return "active";
}

function calculateGoalPercent(goal: FitnessGoal): number {
  if (typeof goal.progress === "number") return Math.max(0, Math.min(100, Math.round(goal.progress)));
  const current = goal.currentValue ?? goal.current ?? 0;
  const target = goal.targetValue ?? goal.target ?? 0;
  return target === 0 ? 0 : Math.max(0, Math.min(100, Math.round((current / target) * 100)));
}

function goalStatusLabel(status: NonNullable<FitnessGoal["status"]>): string {
  if (status === "planned") return "未开始";
  if (status === "completed") return "已完成";
  if (status === "overdue") return "已逾期";
  if (status === "archived") return "已归档";
  return "进行中";
}

export function workoutTitle(workout: Workout): string {
  return workout.title?.trim() || workout.note?.trim() || workout.exerciseDetails?.split("\n")[0]?.trim() || `${workout.workoutType ?? workout.type}训练`;
}

export function workoutTypeLabel(workout: Workout): string {
  return workout.workoutType ?? (workout.type === "有氧" ? "跑步" : workout.type === "拉伸" ? "瑜伽" : workout.type === "休息" ? "其它" : workout.type);
}

export function workoutDuration(workout: Workout): number {
  return Number(workout.durationMinutes ?? workout.duration) || 0;
}

export function calculatePace(workout: Workout): string {
  const distance = Number(workout.distanceKm) || 0;
  const duration = workoutDuration(workout);
  if (distance <= 0 || duration <= 0) return "--";
  const minutesPerKm = duration / distance;
  const minutes = Math.floor(minutesPerKm);
  const seconds = Math.round((minutesPerKm - minutes) * 60).toString().padStart(2, "0");
  return `${minutes}'${seconds}"/km`;
}

export interface PlanExecutionSummary {
  planned: number;
  actual: number;
  rate: number;
}

export function calculatePlanExecution(plan: TrainingPlan, workouts: Workout[], referenceDate = today()): PlanExecutionSummary {
  const start = plan.startDate || referenceDate;
  const end = plan.endDate && plan.endDate < referenceDate ? plan.endDate : referenceDate;
  const frequency = Number(plan.weeklyFrequency) || 0;
  if (frequency <= 0 || end < start) return { planned: 0, actual: workouts.filter((workout) => workout.trainingPlanId === plan.id).length, rate: 0 };
  const days = Math.max(1, Math.floor((new Date(`${end}T00:00:00`).getTime() - new Date(`${start}T00:00:00`).getTime()) / 86400000) + 1);
  const planned = Math.max(1, Math.ceil((days / 7) * frequency));
  const actual = workouts.filter((workout) => workout.trainingPlanId === plan.id && workout.date >= start && workout.date <= end).length;
  return { planned, actual, rate: planned ? Math.round((actual / planned) * 100) : 0 };
}

function trainingPlanStatusLabel(status: NonNullable<TrainingPlan["status"]>): string {
  if (status === "planned") return "未开始";
  if (status === "completed") return "已完成";
  if (status === "overdue") return "已逾期";
  return "进行中";
}

function statusColor(status: string): string {
  if (status === "completed") return "green";
  if (status === "overdue") return "red";
  if (status === "planned") return "yellow";
  return "blue";
}

function formatDateRange(startDate: string, endDate: string): string {
  return `${startDate} - ${endDate}`;
}

function fileName(path: string): string {
  return path.split(/[\\/]/).pop()?.replace(/\.md$/i, "") ?? path;
}
