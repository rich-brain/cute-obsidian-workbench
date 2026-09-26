import { App, Modal, Notice, setIcon } from "obsidian";
import { formatDateKey, type DashboardStore } from "../../core/DashboardStore";
import type { DailyFocusEntry } from "../../types/dashboard";
import { DailyFocusService } from "../../services/DailyFocusService";
import { TodayFocusTaskModal } from "./TodoStatisticsModal";
import { applyResizableModal } from "../ResizableModal";

const GROUPS: Array<{ id: string; title: string; test: (entry: DailyFocusEntry, today: string) => boolean }> = [
  { id: "today", title: "今日应完成", test: (entry, today) => entry.kind !== "deadline" && (entry.date === today || entry.dueDate === today) && entry.status !== "overdue" },
  { id: "deadline", title: "今日 DDL", test: (entry, today) => entry.kind === "deadline" && entry.dueDate === today && entry.status !== "overdue" },
  { id: "overdue", title: "已逾期", test: (entry) => entry.status === "overdue" },
  { id: "upcoming", title: "即将到期", test: (entry, today) => Boolean(entry.dueDate && entry.dueDate > today) }
];

const MODULE_LABELS: Record<string, string> = {
  overview: "手动",
  research: "科研",
  reading: "阅读",
  fitness: "健身",
  finance: "理财",
  goals: "目标",
  tasks: "任务"
};

function sourceLabel(entry: DailyFocusEntry): string {
  return MODULE_LABELS[entry.sourceModule] ?? entry.sourceModule;
}

export class TodayFocusSection {
  private readonly service: DailyFocusService;

  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {
    this.service = new DailyFocusService(store);
  }

  render(container: HTMLElement): void {
    const host = container.createDiv({ cls: "cow-daily-focus" });
    this.renderContent(host);
  }

  private renderContent(host: HTMLElement): void {
    host.empty();
    const today = formatDateKey(new Date());
    const entries = this.service.getEntriesForDate(today);
    const used = new Set<string>();
    GROUPS.forEach((group) => {
      const items = entries.filter((entry) => group.test(entry, today));
      items.forEach((entry) => used.add(entry.id));
      this.renderGroup(host, group.title, items);
    });
    this.renderGroup(host, "其它事项", entries.filter((entry) => !used.has(entry.id)));
    if (entries.length === 0) {
      host.createDiv({ cls: "cow-empty-state cow-daily-focus-empty", text: "今天暂时没有需要处理的事项 🐶" });
    }
    const add = host.createEl("button", { cls: "cow-task-add-strip", text: "+ 添加手动今日事项", attr: { type: "button" } });
    add.addEventListener("click", () => {
      new TodayFocusTaskModal(this.app, today, async (values) => {
        await this.store.addTodayFocusTask(values.label, values.category, values.date);
        this.renderContent(host);
      }).open();
    });
  }

  private renderGroup(container: HTMLElement, title: string, entries: DailyFocusEntry[]): void {
    if (entries.length === 0) return;
    const group = container.createDiv({ cls: "cow-daily-focus-group" });
    group.createEl("h4", { text: title });
    const list = group.createEl("ul", { cls: "cow-focus-list cow-daily-focus-list" });
    entries.forEach((entry) => this.renderEntry(list, entry, container));
  }

  private renderEntry(list: HTMLElement, entry: DailyFocusEntry, host: HTMLElement): void {
    const item = list.createEl("li", { cls: `cow-daily-focus-entry is-${entry.status} is-${entry.sourceModule}` });
    if (entry.canComplete) {
      const checkbox = item.createEl("input", { type: "checkbox", attr: { "aria-label": `完成${entry.title}` } });
      checkbox.checked = entry.status === "completed";
      checkbox.addEventListener("change", async () => {
        await this.service.completeEntry(entry);
        this.renderContent(host);
      });
    } else {
      item.createSpan({ cls: `cow-daily-focus-status ${entry.kind === "deadline" ? "is-deadline" : ""}`, text: entry.status === "overdue" ? "!" : "●" });
    }
    item.createSpan({ cls: `cow-pill cow-source-pill ${this.sourceClass(entry)}`, text: sourceLabel(entry) });
    const body = item.createDiv({ cls: "cow-daily-focus-body" });
    const title = body.createEl(entry.canOpenSource ? "button" : "span", {
      cls: entry.status === "completed" ? "is-complete cow-focus-task-title cow-daily-focus-title" : "cow-focus-task-title cow-daily-focus-title",
      text: entry.title,
      attr: entry.canOpenSource ? { type: "button", title: entry.title } : { title: entry.title }
    });
    if (entry.canOpenSource) {
      title.addEventListener("click", () => this.service.openSource(entry, this.app, () => this.renderContent(host)));
    }
    if (entry.subtitle) body.createDiv({ cls: "cow-meta-line", text: entry.subtitle });
    item.createSpan({ cls: `cow-daily-focus-date ${entry.status === "overdue" ? "is-overdue" : ""}`, text: this.dateLabel(entry) });
    const actions = item.createDiv({ cls: "cow-list-item-actions" });
    if (entry.canOpenSource) {
      const open = actions.createEl("button", { attr: { type: "button", "aria-label": "打开来源" } });
      setIcon(open, "external-link");
      open.addEventListener("click", () => this.service.openSource(entry, this.app, () => this.renderContent(host)));
    }
    if (entry.sourceModule === "overview" && entry.sourceType === "today-focus-task") {
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除手动事项" } });
      setIcon(remove, "trash-2");
      remove.addEventListener("click", async () => {
        if (!confirm(`删除“${entry.title}”？`)) return;
        await this.store.deleteTodayFocusTask(entry.sourceId);
        this.renderContent(host);
      });
    }
    if (!entry.canComplete && !entry.canOpenSource) {
      const info = actions.createEl("button", { attr: { type: "button", "aria-label": "提醒说明" } });
      setIcon(info, "info");
      info.addEventListener("click", () => new Notice("这是来源模块的只读提醒，不会在今日焦点中直接改业务状态。"));
    }
  }

  private sourceClass(entry: DailyFocusEntry): string {
    return `is-source-${entry.sourceModule}`;
  }

  private dateLabel(entry: DailyFocusEntry): string {
    const today = formatDateKey(new Date());
    const target = entry.dueDate ?? entry.date;
    if (!target) return "";
    if (target === today) return entry.kind === "deadline" ? "今天" : "今日";
    const diff = this.diffDays(today, target);
    if (diff === 1) return "明天";
    if (diff === -1) return "逾期1天";
    if (diff < -1) return `逾期${Math.abs(diff)}天`;
    if (diff > 1 && diff <= 3) return `${diff}天后`;
    return target;
  }

  private diffDays(from: string, to: string): number {
    const start = new Date(`${from}T00:00:00`);
    const end = new Date(`${to}T00:00:00`);
    return Math.round((end.getTime() - start.getTime()) / 86_400_000);
  }
}

export class DailyFocusStatisticsModal extends Modal {
  private readonly service: DailyFocusService;
  private date: Date;

  constructor(
    app: App,
    private readonly store: DashboardStore,
    date = new Date()
  ) {
    super(app);
    this.date = date;
    this.service = new DailyFocusService(store);
    applyResizableModal(this, {
      className: "cute-daily-focus-stat-modal",
      width: "min(860px, 92vw)",
      height: "min(640px, 84vh)",
      maxWidth: "96vw",
      maxHeight: "92vh",
      minWidth: "min(340px, 92vw)",
      minHeight: "min(360px, 78vh)"
    });
  }

  onOpen(): void {
    this.render();
  }

  private render(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-daily-focus-stat-modal");
    const dateKey = formatDateKey(this.date);
    const entries = this.service.getEntriesForDate(dateKey);
    const completed = entries.filter((entry) => entry.status === "completed").length;
    const overdue = entries.filter((entry) => entry.status === "overdue").length;
    const pending = entries.length - completed;
    const rate = entries.length === 0 ? 0 : Math.round((completed / entries.length) * 100);

    const header = this.contentEl.createDiv({ cls: "cow-stats-modal-header cow-daily-focus-stat-header" });
    const prev = header.createEl("button", { attr: { type: "button", "aria-label": "上一天" } });
    setIcon(prev, "chevron-left");
    prev.addEventListener("click", () => {
      this.date.setDate(this.date.getDate() - 1);
      this.render();
    });
    const title = header.createDiv({ cls: "cow-daily-focus-stat-title" });
    title.createEl("h2", { text: "今日焦点统计" });
    const picker = title.createEl("input", { type: "date", value: dateKey });
    picker.addEventListener("change", () => {
      if (!picker.value) return;
      this.date = new Date(`${picker.value}T00:00:00`);
      this.render();
    });
    const next = header.createEl("button", { attr: { type: "button", "aria-label": "下一天" } });
    setIcon(next, "chevron-right");
    next.addEventListener("click", () => {
      this.date.setDate(this.date.getDate() + 1);
      this.render();
    });

    const summary = this.contentEl.createDiv({ cls: "cow-stats-card-grid" });
    [
      ["完成", `${completed} / ${entries.length}`],
      ["完成率", `${rate}%`],
      ["待处理", pending],
      ["已逾期", overdue]
    ].forEach(([label, value]) => {
      const card = summary.createDiv({ cls: "cow-stats-card" });
      card.createEl("strong", { text: String(value) });
      card.createSpan({ text: String(label) });
    });

    const moduleStats = this.getModuleStats(entries);
    const moduleGrid = this.contentEl.createDiv({ cls: "cow-daily-focus-module-stats" });
    if (moduleStats.length === 0) {
      moduleGrid.createEl("p", { cls: "cow-empty-state", text: "这一天没有今日焦点事项。" });
    } else {
      moduleStats.forEach((stat) => {
        const card = moduleGrid.createDiv({ cls: "cow-daily-focus-module-card" });
        card.createSpan({ cls: `cow-pill cow-source-pill is-source-${stat.moduleId}`, text: stat.label });
        const value = card.createEl("strong", { text: `${stat.completed} / ${stat.total}` });
        value.setAttr("title", `${stat.label} 完成 ${stat.completed} / ${stat.total}`);
        const track = card.createDiv({ cls: "cow-daily-focus-stat-track" });
        track.createDiv({ attr: { style: `width:${stat.total ? Math.round((stat.completed / stat.total) * 100) : 0}%` } });
      });
    }

    const list = this.contentEl.createDiv({ cls: "cow-data-list cow-daily-focus-stat-list" });
    entries.forEach((entry) => {
      const row = list.createDiv({ cls: `cow-data-card cow-daily-focus-stat-row is-${entry.status}` });
      row.createSpan({ cls: `cow-pill cow-source-pill is-source-${entry.sourceModule}`, text: sourceLabel(entry) });
      const body = row.createDiv();
      body.createEl("strong", { text: entry.title });
      body.createDiv({ cls: "cow-meta-line", text: [entry.subtitle, entry.dueDate ? `截止 ${entry.dueDate}` : entry.date].filter(Boolean).join(" · ") });
      row.createSpan({ cls: `cow-daily-focus-date ${entry.status === "overdue" ? "is-overdue" : ""}`, text: entry.status === "completed" ? "已完成" : this.dateLabel(entry, dateKey) });
    });

    this.contentEl.createEl("p", {
      cls: "cow-muted-note",
      text: "历史统计基于仍存在的来源数据和当前完成状态动态计算；本轮不保存今日焦点快照。"
    });
  }

  private getModuleStats(entries: DailyFocusEntry[]): Array<{ moduleId: string; label: string; total: number; completed: number }> {
    const result = new Map<string, { moduleId: string; label: string; total: number; completed: number }>();
    entries.forEach((entry) => {
      const current = result.get(entry.sourceModule) ?? { moduleId: entry.sourceModule, label: sourceLabel(entry), total: 0, completed: 0 };
      current.total += 1;
      if (entry.status === "completed") current.completed += 1;
      result.set(entry.sourceModule, current);
    });
    return Array.from(result.values());
  }

  private dateLabel(entry: DailyFocusEntry, baseDate: string): string {
    const target = entry.dueDate ?? entry.date;
    if (!target) return "";
    if (target === baseDate) return entry.kind === "deadline" ? "当天 DDL" : "当天";
    const diff = Math.round((new Date(`${target}T00:00:00`).getTime() - new Date(`${baseDate}T00:00:00`).getTime()) / 86_400_000);
    if (diff === 1) return "次日";
    if (diff === -1) return "逾期1天";
    if (diff < -1) return `逾期${Math.abs(diff)}天`;
    return target;
  }
}
