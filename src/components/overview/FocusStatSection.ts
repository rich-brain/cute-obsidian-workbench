import { App, Modal, Notice, setIcon, Setting } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { StatisticsService } from "../../services/StatisticsService";
import type { FocusRecord, FocusState } from "../../types/dashboard";

const FOCUS_BACKGROUNDS = [
  { id: "pink", label: "默认粉色" },
  { id: "cream", label: "奶油渐变" },
  { id: "sky", label: "天空" },
  { id: "forest", label: "森林" },
  { id: "night", label: "夜晚" },
  { id: "desk", label: "书桌" },
  { id: "minimal-dark", label: "极简深色" }
];

type FocusRecordFilter = "today" | "week" | "month" | "all" | "date";

export class FocusStatSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const stats = new StatisticsService(this.store).getFocusStats();
    const state = this.store.getFocusState();
    const root = container.createDiv({ cls: "cow-focus-summary-card" });

    const top = root.createDiv({ cls: "cow-focus-summary-top" });
    const art = top.createDiv({ cls: "cow-stat-art is-blue" });
    setIcon(art.createSpan(), "headphones");
    const summary = top.createDiv({ cls: "cow-focus-summary-copy" });
    summary.createEl("strong", { text: this.formatMinutes(stats.todayMinutes) });
    summary.createSpan({ text: `今日 ${stats.todayPomodoros} 个番茄 · 本周 ${this.formatMinutes(stats.weekMinutes)}` });

    if (state.isRunning) {
      root.createDiv({
        cls: "cow-focus-summary-status",
        text: `专注中${state.currentTask ? `：${state.currentTask}` : ""}`
      });
    }

    const actions = root.createDiv({ cls: "cow-focus-summary-actions" });
    const primary = actions.createEl("button", { cls: "mod-cta", attr: { type: "button" } });
    setIcon(primary.createSpan(), state.isRunning ? "maximize-2" : "play");
    primary.createSpan({ text: state.isRunning ? "返回专注" : "开始专注" });
    primary.addEventListener("click", () => {
      if (state.isRunning) {
        new FocusSessionWindow(this.app, this.store, this.onDataChanged).open();
        return;
      }
      new FocusSetupModal(this.app, this.store, this.onDataChanged).open();
    });

    const records = actions.createEl("button", { attr: { type: "button" } });
    setIcon(records.createSpan(), "list-checks");
    records.createSpan({ text: "查看记录" });
    records.addEventListener("click", () => new FocusRecordsModal(this.app, this.store, this.onDataChanged).open());
  }

  private formatMinutes(minutes: number): string {
    return `${minutes} min`;
  }
}

class FocusSetupModal extends Modal {
  private duration = 25;
  private customDuration = "";
  private task = "";
  private background = "pink";
  private backgroundDataUrl: string | undefined;
  private error = "";

  constructor(
    app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {
    super(app);
    this.background = store.getFocusSettings().defaultBackground ?? "pink";
  }

  onOpen(): void {
    this.render();
  }

  private render(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-focus-setup-modal");
    this.contentEl.createEl("h2", { text: "开始专注" });
    this.contentEl.createEl("p", { text: "选择时间、写下专注内容，再进入沉浸式窗口。" });

    this.contentEl.createEl("h3", { text: "选择专注时间" });
    const presets = this.contentEl.createDiv({ cls: "cow-focus-preset-grid" });
    [15, 25, 45, 60, 90].forEach((minutes) => {
      const button = presets.createEl("button", {
        cls: this.duration === minutes && !this.customDuration ? "is-active" : "",
        attr: { type: "button" }
      });
      button.createSpan({ text: `${minutes} 分钟` });
      button.addEventListener("click", () => {
        this.duration = minutes;
        this.customDuration = "";
        this.error = "";
        this.render();
      });
    });

    new Setting(this.contentEl)
      .setName("自定义时间")
      .setDesc("单位：分钟，范围 1-180。")
      .addText((text) => text.setValue(this.customDuration).onChange((value) => {
        this.customDuration = value.trim();
        const next = Number(this.customDuration);
        if (this.customDuration && (!Number.isFinite(next) || next < 1 || next > 180)) {
          this.error = "请输入 1 到 180 之间的分钟数。";
          return;
        }
        if (this.customDuration) {
          this.duration = Math.round(next);
        }
        this.error = "";
        this.render();
      }));

    this.contentEl.createDiv({ cls: "cow-focus-selected-duration", text: `本次专注：${this.duration} 分钟` });
    if (this.error) {
      this.contentEl.createDiv({ cls: "cow-form-error", text: this.error });
    }

    new Setting(this.contentEl)
      .setName("专注内容")
      .addText((text) => text
        .setPlaceholder("这次准备专注做什么？")
        .setValue(this.task)
        .onChange((value) => {
          this.task = value;
        }));

    this.contentEl.createEl("h3", { text: "选择专注背景" });
    const backgrounds = this.contentEl.createDiv({ cls: "cow-focus-background-picker" });
    FOCUS_BACKGROUNDS.forEach((background) => this.renderBackgroundButton(backgrounds, background.id, background.label));

    const fileInput = this.contentEl.createEl("input", {
      cls: "cow-hidden-input",
      attr: { type: "file", accept: "image/*" }
    });
    fileInput.addEventListener("change", () => {
      const file = fileInput.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        this.background = "custom";
        this.backgroundDataUrl = String(reader.result);
        this.render();
      };
      reader.readAsDataURL(file);
    });

    const custom = backgrounds.createEl("button", {
      cls: `cow-focus-bg-custom ${this.background === "custom" ? "is-active" : ""}`,
      attr: { type: "button" }
    });
    custom.createSpan({ text: "自定义背景" });
    custom.addEventListener("click", () => fileInput.click());

    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    const start = actions.createEl("button", { cls: "mod-cta", text: "开始专注", attr: { type: "button" } });
    start.addEventListener("click", async () => {
      if (this.duration < 1 || this.duration > 180) {
        this.error = "请输入 1 到 180 之间的分钟数。";
        this.render();
        return;
      }
      await this.store.startFocusSession(this.task, this.duration, this.background, this.backgroundDataUrl);
      this.onDataChanged();
      this.close();
      new FocusSessionWindow(this.app, this.store, this.onDataChanged).open();
    });
  }

  private renderBackgroundButton(container: HTMLElement, id: string, label: string): void {
    const button = container.createEl("button", {
      cls: `cow-focus-bg-${id} ${this.background === id ? "is-active" : ""}`,
      attr: { type: "button" }
    });
    button.createSpan({ text: label });
    button.addEventListener("click", () => {
      this.background = id;
      this.backgroundDataUrl = undefined;
      this.render();
    });
  }
}

class FocusSessionWindow extends Modal {
  private timer?: number;
  private maximized = false;
  private completed = false;
  private completionTask = "";
  private completionDuration = 0;

  constructor(
    app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {
    super(app);
  }

  onOpen(): void {
    this.render();
    this.timer = window.setInterval(() => void this.tick(), 1000);
  }

  onClose(): void {
    if (this.timer) {
      window.clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  private render(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-focus-session-window", `cow-focus-bg-${this.store.getFocusState().background ?? "pink"}`);
    if (this.maximized) {
      this.contentEl.addClass("is-maximized");
    }

    const state = this.store.getFocusState();
    if (state.backgroundDataUrl) {
      this.contentEl.style.backgroundImage = `linear-gradient(rgba(255, 248, 253, 0.62), rgba(255, 248, 253, 0.62)), url("${state.backgroundDataUrl}")`;
    }

    this.renderWindowControls();
    if (this.completed) {
      this.renderCompleted();
      return;
    }

    const body = this.contentEl.createDiv({ cls: "cow-focus-window-body" });
    body.createSpan({ cls: "cow-focus-window-label", text: state.currentTask ? "正在专注：" : "专注时间" });
    body.createEl("h2", { text: state.currentTask || "保持当下这一轮" });
    body.createDiv({ cls: "cow-focus-session-countdown", text: this.formatSeconds(state.remainingSeconds) });
    body.createDiv({ cls: "cow-focus-session-status", text: state.isPaused ? "已暂停" : "专注中" });

    const actions = body.createDiv({ cls: "cow-focus-window-actions" });
    const toggle = actions.createEl("button", { cls: "mod-cta", attr: { type: "button" } });
    setIcon(toggle.createSpan(), state.isPaused ? "play" : "pause");
    toggle.createSpan({ text: state.isPaused ? "继续" : "暂停" });
    toggle.addEventListener("click", async () => {
      if (state.isPaused) {
        await this.store.resumeFocusSession();
      } else {
        await this.store.pauseFocusSession();
      }
      this.onDataChanged();
      this.render();
    });

    const end = actions.createEl("button", { attr: { type: "button" } });
    setIcon(end.createSpan(), "square");
    end.createSpan({ text: "结束" });
    end.addEventListener("click", () => new EndFocusConfirmModal(this.app, this.store, async () => {
      this.onDataChanged();
      this.close();
    }).open());
  }

  private renderWindowControls(): void {
    const controls = this.contentEl.createDiv({ cls: "cow-focus-window-controls" });
    controls.createEl("button", { text: "—", attr: { type: "button", "aria-label": "最小化" } })
      .addEventListener("click", () => {
        this.onDataChanged();
        this.close();
      });
    controls.createEl("button", { text: this.maximized ? "▣" : "□", attr: { type: "button", "aria-label": this.maximized ? "恢复窗口" : "最大化" } })
      .addEventListener("click", () => {
        this.maximized = !this.maximized;
        this.render();
      });
    controls.createEl("button", { text: "×", attr: { type: "button", "aria-label": "关闭" } })
      .addEventListener("click", () => {
        if (this.store.getFocusState().isRunning) {
          new CloseFocusWindowModal(this.app, this.store, async () => {
            this.onDataChanged();
            this.close();
          }).open();
          return;
        }
        this.close();
      });
  }

  private renderCompleted(): void {
    const stats = new StatisticsService(this.store).getFocusStats();
    const body = this.contentEl.createDiv({ cls: "cow-focus-window-body cow-focus-complete-body" });
    body.createEl("h2", { text: "🎉 专注完成" });
    body.createDiv({ cls: "cow-focus-session-countdown", text: `${this.completionDuration} min` });
    body.createSpan({ text: `内容：${this.completionTask || "专注"}` });
    body.createSpan({ text: `今日累计：${stats.todayMinutes} min · 今日番茄：${stats.todayPomodoros} 个` });
    const actions = body.createDiv({ cls: "cow-focus-window-actions" });
    actions.createEl("button", { text: "完成", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "再来一次", attr: { type: "button" } }).addEventListener("click", () => {
      this.close();
      new FocusSetupModal(this.app, this.store, this.onDataChanged).open();
    });
  }

  private async tick(): Promise<void> {
    const state = this.store.getFocusState();
    if (state.isRunning && !state.isPaused && state.remainingSeconds <= 0) {
      this.completionTask = state.currentTask ?? "专注";
      this.completionDuration = state.plannedDuration ?? this.store.getFocusSettings().focusDuration;
      await this.store.completeCurrentFocusPhase();
      this.completed = true;
      this.onDataChanged();
      new Notice("专注完成");
    }
    this.render();
  }

  private formatSeconds(seconds: number): string {
    const safe = Math.max(0, seconds);
    const mins = Math.floor(safe / 60);
    const secs = safe % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }
}

class CloseFocusWindowModal extends Modal {
  constructor(
    app: App,
    private readonly store: DashboardStore,
    private readonly onDone: () => Promise<void>
  ) {
    super(app);
  }

  onOpen(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: "当前专注尚未结束" });
    this.contentEl.createEl("p", { text: "请选择继续后台专注，或结束本次专注。" });
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "继续后台专注", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      await this.onDone();
      this.close();
    });
    actions.createEl("button", { text: "结束本次专注", cls: "mod-warning", attr: { type: "button" } }).addEventListener("click", () => {
      this.close();
      new EndFocusConfirmModal(this.app, this.store, this.onDone).open();
    });
  }
}

class EndFocusConfirmModal extends Modal {
  constructor(
    app: App,
    private readonly store: DashboardStore,
    private readonly onDone: () => Promise<void>
  ) {
    super(app);
  }

  onOpen(): void {
    const elapsed = this.getElapsedText();
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: "结束本次专注？" });
    this.contentEl.createEl("p", { text: `已专注：${elapsed}` });
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "结束并保存", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      await this.store.endFocusSession(false, true);
      await this.onDone();
      this.close();
    });
    actions.createEl("button", { text: "结束但不保存", cls: "mod-warning", attr: { type: "button" } }).addEventListener("click", async () => {
      await this.store.endFocusSession(false, false);
      await this.onDone();
      this.close();
    });
  }

  private getElapsedText(): string {
    const state = this.store.getFocusState();
    const planned = (state.plannedDuration ?? this.store.getFocusSettings().focusDuration) * 60;
    const elapsed = Math.max(0, planned - state.remainingSeconds);
    return `${Math.floor(elapsed / 60)} 分 ${String(elapsed % 60).padStart(2, "0")} 秒`;
  }
}

class FocusRecordsModal extends Modal {
  private filter: FocusRecordFilter = "today";
  private dateValue = new Date().toISOString().slice(0, 10);

  constructor(
    app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {
    super(app);
  }

  onOpen(): void {
    this.render();
  }

  private render(): void {
    const stats = new StatisticsService(this.store).getFocusStats();
    const records = this.getFilteredRecords();
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-focus-records-modal");
    this.contentEl.createEl("h2", { text: "专注记录" });

    const statGrid = this.contentEl.createDiv({ cls: "cow-stats-card-grid" });
    [["今日专注", `${stats.todayMinutes} min`], ["今日番茄", stats.todayPomodoros], ["本周专注", `${stats.weekMinutes} min`], ["本月专注", `${stats.monthMinutes} min`]].forEach(([label, value]) => {
      const card = statGrid.createDiv({ cls: "cow-stats-card" });
      card.createEl("strong", { text: String(value) });
      card.createSpan({ text: String(label) });
    });

    const filters = this.contentEl.createDiv({ cls: "cow-focus-filter-row" });
    [
      ["today", "今天"],
      ["week", "本周"],
      ["month", "本月"],
      ["all", "全部"],
      ["date", "日期"]
    ].forEach(([id, label]) => {
      const button = filters.createEl("button", { cls: this.filter === id ? "is-active" : "", attr: { type: "button" } });
      button.createSpan({ text: label });
      button.addEventListener("click", () => {
        this.filter = id as FocusRecordFilter;
        this.render();
      });
    });
    if (this.filter === "date") {
      new Setting(this.contentEl).setName("日期").addText((text) => text.setValue(this.dateValue).onChange((value) => {
        this.dateValue = value.trim();
        this.render();
      }));
    }

    const list = this.contentEl.createDiv({ cls: "cow-focus-record-list" });
    if (records.length === 0) {
      list.createEl("p", { cls: "cow-empty-state", text: "没有匹配的专注记录。" });
      return;
    }
    records.forEach((record) => this.renderRecord(list, record));
  }

  private renderRecord(container: HTMLElement, record: FocusRecord): void {
    const row = container.createDiv({ cls: "cow-focus-record-row" });
    const body = row.createDiv();
    body.createEl("strong", { text: record.date });
    body.createSpan({ text: `${this.formatTime(record.startedAt)} - ${this.formatTime(record.endedAt)} · ${record.task || "专注"}` });
    body.createSpan({ text: `${record.actualDurationMinutes ?? record.duration} min / 计划 ${record.plannedDurationMinutes ?? record.plannedDuration ?? record.duration} min · ${record.completed ? "已完成" : "提前结束"}` });
    const actions = row.createDiv({ cls: "cow-list-item-actions" });
    const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑记录" } });
    setIcon(edit, "pencil");
    edit.addEventListener("click", () => new EditFocusRecordModal(this.app, this.store, record, () => {
      this.onDataChanged();
      this.render();
    }).open());
    const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除记录" } });
    setIcon(remove, "trash-2");
    remove.addEventListener("click", () => new DeleteFocusRecordModal(this.app, this.store, record, async () => {
      this.onDataChanged();
      this.render();
    }).open());
  }

  private getFilteredRecords(): FocusRecord[] {
    const records = this.store.getFocusRecords();
    const today = new Date().toISOString().slice(0, 10);
    if (this.filter === "today") return records.filter((record) => record.date === today);
    if (this.filter === "date") return records.filter((record) => record.date === this.dateValue);
    if (this.filter === "month") return records.filter((record) => record.date.startsWith(today.slice(0, 7)));
    if (this.filter === "week") {
      const week = new Set(this.store.getCurrentWeekDates());
      return records.filter((record) => week.has(record.date));
    }
    return records;
  }

  private formatTime(value?: string): string {
    if (!value) return "--:--";
    return new Date(value).toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
  }
}

class EditFocusRecordModal extends Modal {
  private date: string;
  private task: string;
  private duration: number;

  constructor(
    app: App,
    private readonly store: DashboardStore,
    private readonly record: FocusRecord,
    private readonly onDone: () => void
  ) {
    super(app);
    this.date = record.date;
    this.task = record.task;
    this.duration = record.actualDurationMinutes ?? record.duration;
  }

  onOpen(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: "编辑专注记录" });
    new Setting(this.contentEl).setName("日期").addText((text) => text.setValue(this.date).onChange((value) => {
      this.date = value.trim();
    }));
    new Setting(this.contentEl).setName("专注内容").addText((text) => text.setValue(this.task).onChange((value) => {
      this.task = value;
    }));
    new Setting(this.contentEl).setName("实际专注时长").setDesc("单位：分钟").addText((text) => {
      text.inputEl.type = "number";
      text.setValue(String(this.duration));
      text.onChange((value) => {
        this.duration = Math.max(0, Number(value) || 0);
      });
    });
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "保存", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", async () => {
      await this.store.updateFocusRecord(this.record.id, {
        date: this.date,
        task: this.task.trim() || "专注",
        duration: this.duration,
        actualDurationMinutes: this.duration
      });
      this.onDone();
      this.close();
    });
  }
}

class DeleteFocusRecordModal extends Modal {
  constructor(
    app: App,
    private readonly store: DashboardStore,
    private readonly record: FocusRecord,
    private readonly onDone: () => Promise<void>
  ) {
    super(app);
  }

  onOpen(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: "删除这条专注记录？" });
    this.contentEl.createEl("p", { text: `${this.record.date} · ${this.record.task || "专注"}` });
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "删除", cls: "mod-warning", attr: { type: "button" } }).addEventListener("click", async () => {
      await this.store.deleteFocusRecord(this.record.id);
      await this.onDone();
      this.close();
    });
  }
}
