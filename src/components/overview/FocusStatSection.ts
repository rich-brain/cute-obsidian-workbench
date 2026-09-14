import { App, Modal, Notice, setIcon, Setting } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { StatisticsService } from "../../services/StatisticsService";
import type { FocusState } from "../../types/dashboard";

const FOCUS_BACKGROUNDS = [
  { id: "solid", label: "纯色" },
  { id: "pink", label: "粉色渐变" },
  { id: "forest", label: "森林" },
  { id: "sky", label: "天空" },
  { id: "night", label: "夜晚" },
  { id: "desk", label: "书桌" },
  { id: "minimal", label: "极简" }
];

export class FocusStatSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const stats = new StatisticsService(this.store).getFocusStats();
    const state = this.store.getFocusState();
    const root = container.createDiv({ cls: "cow-focus-stat-card" });

    const top = root.createDiv({ cls: "cow-focus-stat-top" });
    const art = top.createDiv({ cls: "cow-stat-art is-blue" });
    setIcon(art.createSpan(), state.mode === "break" ? "coffee" : "headphones");
    const summary = top.createDiv();
    summary.createEl("strong", { text: this.formatMinutes(stats.todayMinutes) });
    summary.createSpan({ text: `今日 ${stats.todayPomodoros} 个番茄 · 本周 ${this.formatMinutes(stats.weekMinutes)}` });

    root.createDiv({ cls: "cow-focus-timer", text: this.formatSeconds(state.remainingSeconds) });
    root.createDiv({
      cls: "cow-focus-status",
      text: `${state.isRunning ? (state.isPaused ? "已暂停" : "进行中") : "未开始"} · ${state.mode === "focus" ? "专注" : "休息"}${state.currentTask ? ` · ${state.currentTask}` : ""}`
    });

    const actions = root.createDiv({ cls: "cow-focus-actions" });
    const primary = actions.createEl("button", { cls: "mod-cta", attr: { type: "button" } });
    setIcon(primary.createSpan(), state.isRunning ? (state.isPaused ? "play" : "pause") : "play");
    primary.createSpan({ text: state.isRunning ? (state.isPaused ? "继续" : "暂停") : "开始专注" });
    primary.addEventListener("click", async () => {
      if (!state.isRunning) {
        new FocusSetupModal(this.app, this.store, this.onDataChanged).open();
        return;
      }
      if (state.isPaused) {
        await this.store.resumeFocusSession();
      } else {
        await this.store.pauseFocusSession();
      }
      this.onDataChanged();
    });

    const detail = actions.createEl("button", { attr: { type: "button" } });
    setIcon(detail.createSpan(), "timer");
    detail.createSpan({ text: "查看记录" });
    detail.addEventListener("click", () => new FocusSessionModal(this.app, this.store, this.onDataChanged).open());
  }

  private formatMinutes(minutes: number): string {
    if (minutes < 60) return `${minutes}min`;
    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;
    return rest === 0 ? `${hours}h` : `${hours}h ${rest}min`;
  }

  private formatSeconds(seconds: number): string {
    const safe = Math.max(0, seconds);
    const mins = Math.floor(safe / 60);
    const secs = safe % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }
}

class FocusSetupModal extends Modal {
  private duration: number;
  private customDuration = "";
  private task = "";
  private background: string;

  constructor(
    app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {
    super(app);
    const settings = store.getFocusSettings();
    this.duration = settings.focusDuration;
    this.background = settings.defaultBackground ?? "pink";
  }

  onOpen(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: "开始专注" });
    this.contentEl.createEl("p", { text: "先选一个合适的番茄长度，再进入沉浸式专注。" });

    const presets = this.contentEl.createDiv({ cls: "cow-focus-preset-grid" });
    [25, 45, 60, 90].forEach((minutes) => {
      const button = presets.createEl("button", { cls: this.duration === minutes ? "is-active" : "", attr: { type: "button" } });
      button.createSpan({ text: `${minutes} 分钟` });
      button.addEventListener("click", () => {
        this.duration = minutes;
        this.customDuration = "";
        this.onOpen();
      });
    });

    new Setting(this.contentEl).setName("自定义分钟数").addText((text) => text.setValue(this.customDuration).onChange((value) => {
      this.customDuration = value;
      const next = Number(value);
      if (Number.isFinite(next) && next > 0) this.duration = Math.round(next);
    }));
    new Setting(this.contentEl).setName("专注事项").addText((text) => text.setPlaceholder("这次准备专注做什么？").setValue(this.task).onChange((value) => {
      this.task = value;
    }));

    this.contentEl.createEl("h3", { text: "选择专注背景" });
    const backgrounds = this.contentEl.createDiv({ cls: "cow-focus-background-grid" });
    FOCUS_BACKGROUNDS.forEach((background) => {
      const button = backgrounds.createEl("button", { cls: `cow-focus-bg-${background.id} ${this.background === background.id ? "is-active" : ""}`, attr: { type: "button" } });
      button.createSpan({ text: background.label });
      button.addEventListener("click", () => {
        this.background = background.id;
        this.onOpen();
      });
    });

    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    const start = actions.createEl("button", { cls: "mod-cta", text: "开始专注", attr: { type: "button" } });
    start.addEventListener("click", async () => {
      await this.store.startFocusSession(this.task, this.duration, this.background);
      this.onDataChanged();
      this.close();
      new FocusSessionModal(this.app, this.store, this.onDataChanged).open();
    });
  }
}

class FocusSessionModal extends Modal {
  private timer?: number;

  constructor(
    app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {
    super(app);
  }

  onOpen(): void {
    this.render();
    this.timer = window.setInterval(() => this.tick(), 1000);
  }

  onClose(): void {
    if (this.timer) {
      window.clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  private render(): void {
    this.contentEl.empty();
    const settings = this.store.getFocusSettings();
    const state = this.store.getFocusState();
    const stats = new StatisticsService(this.store).getFocusStats();
    this.contentEl.addClass("cow-modal", "cow-focus-session-modal", `cow-focus-bg-${state.background ?? "pink"}`);

    this.contentEl.createEl("h2", { text: state.currentTask || "今日专注" });
    this.contentEl.createEl("p", {
      text: `默认 ${settings.focusDuration} 分钟专注 / ${settings.breakDuration} 分钟休息，今日累计 ${stats.todayMinutes} 分钟。`
    });

    const timer = this.contentEl.createDiv({ cls: "cow-focus-modal-timer" });
    timer.createSpan({ text: state.mode === "focus" ? "专注中" : "休息中" });
    timer.createEl("strong", { text: this.formatSeconds(state.remainingSeconds) });
    timer.createSpan({ text: this.getStateLabel(state) });

    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions cow-focus-modal-actions" });
    this.renderAction(actions, state.isRunning ? (state.isPaused ? "继续" : "暂停") : "开始", state.isRunning && !state.isPaused ? "pause" : "play", async () => {
      if (!state.isRunning) {
        new FocusSetupModal(this.app, this.store, this.onDataChanged).open();
        this.close();
        return;
      } else if (state.isPaused) {
        await this.store.resumeFocusSession();
      } else {
        await this.store.pauseFocusSession();
      }
      this.onDataChanged();
      this.render();
    }, true);
    this.renderAction(actions, "提前结束", "square", async () => {
      const savePartial = this.store.getFocusState().remainingSeconds < (this.store.getFocusState().plannedDuration ?? settings.focusDuration) * 60 - 60;
      await this.store.endFocusSession(savePartial);
      this.onDataChanged();
      this.render();
    });
    this.renderAction(actions, "关闭", "x", async () => this.close());

    const records = this.contentEl.createDiv({ cls: "cow-focus-records" });
    records.createEl("h3", { text: "最近记录" });
    const recent = stats.recentRecords;
    if (recent.length === 0) {
      records.createEl("p", { cls: "cow-empty-state", text: "还没有专注记录。" });
    } else {
      recent.forEach((record) => {
        const row = records.createDiv({ cls: "cow-focus-record-item" });
        row.createEl("strong", { text: record.task });
        row.createSpan({ text: `${record.date} · ${record.duration} 分钟${record.completed ? " · 已完成" : ""}` });
      });
    }
  }

  private async tick(): Promise<void> {
    const state = this.store.getFocusState();
    if (state.isRunning && !state.isPaused && state.remainingSeconds <= 0) {
      await this.store.completeCurrentFocusPhase();
      this.onDataChanged();
      new Notice(state.mode === "focus" ? "专注完成，休息一下吧。" : "休息完成，可以开始下一轮啦。");
    }
    this.render();
  }

  private renderAction(container: HTMLElement, label: string, icon: string, onClick: () => Promise<void>, primary = false): void {
    const button = container.createEl("button", { cls: primary ? "mod-cta" : "", attr: { type: "button" } });
    setIcon(button.createSpan(), icon);
    button.createSpan({ text: label });
    button.addEventListener("click", () => void onClick());
  }

  private getStateLabel(state: FocusState): string {
    if (!state.isRunning) return "准备开始";
    return state.isPaused ? "已暂停" : "正在计时";
  }

  private formatSeconds(seconds: number): string {
    const safe = Math.max(0, seconds);
    const mins = Math.floor(safe / 60);
    const secs = safe % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }
}
