import { App, Modal, Notice, setIcon, Setting } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { StatisticsService } from "../../services/StatisticsService";
import type { FocusState } from "../../types/dashboard";

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
        await this.store.startFocusSession("");
        this.onDataChanged();
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

class FocusSessionModal extends Modal {
  private taskValue = "";
  private timer?: number;

  constructor(
    app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {
    super(app);
    this.taskValue = store.getFocusState().currentTask ?? "";
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
    this.contentEl.addClass("cow-modal");
    const settings = this.store.getFocusSettings();
    const state = this.store.getFocusState();
    const stats = new StatisticsService(this.store).getFocusStats();

    this.contentEl.createEl("h2", { text: "今日专注" });
    this.contentEl.createEl("p", {
      text: `默认 ${settings.focusDuration} 分钟专注 / ${settings.breakDuration} 分钟休息，今日累计 ${stats.todayMinutes} 分钟。`
    });

    const timer = this.contentEl.createDiv({ cls: "cow-focus-modal-timer" });
    timer.createSpan({ text: state.mode === "focus" ? "专注中" : "休息中" });
    timer.createEl("strong", { text: this.formatSeconds(state.remainingSeconds) });
    timer.createSpan({ text: this.getStateLabel(state) });

    new Setting(this.contentEl)
      .setName("本次任务")
      .addText((text) => text.setValue(this.taskValue).setPlaceholder("例如：整理论文笔记").onChange((value) => {
        this.taskValue = value;
      }));

    new Setting(this.contentEl)
      .setName("专注时长")
      .setDesc("单位：分钟")
      .addText((text) => text.setValue(String(settings.focusDuration)).onChange((value) => {
        const next = Number(value);
        if (Number.isFinite(next) && next > 0) {
          void this.store.updateFocusSettings({ focusDuration: next });
        }
      }));

    new Setting(this.contentEl)
      .setName("休息时长")
      .setDesc("单位：分钟")
      .addText((text) => text.setValue(String(settings.breakDuration)).onChange((value) => {
        const next = Number(value);
        if (Number.isFinite(next) && next > 0) {
          void this.store.updateFocusSettings({ breakDuration: next });
        }
      }));

    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions cow-focus-modal-actions" });
    this.renderAction(actions, state.isRunning ? (state.isPaused ? "继续" : "暂停") : "开始", state.isRunning && !state.isPaused ? "pause" : "play", async () => {
      if (!state.isRunning) {
        await this.store.startFocusSession(this.taskValue);
      } else if (state.isPaused) {
        await this.store.resumeFocusSession();
      } else {
        await this.store.pauseFocusSession();
      }
      this.onDataChanged();
      this.render();
    }, true);
    this.renderAction(actions, "结束", "square", async () => {
      await this.store.endFocusSession(false);
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
