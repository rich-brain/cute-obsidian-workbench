import { App, Modal, Notice, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { PAGE_LABELS } from "../../core/PageLabels";
import type { CheckInDefinition, DashboardPage } from "../../types/dashboard";
import { applyResizableModal } from "../ResizableModal";

const COLORS = ["#ff8fbc", "#ffd166", "#7bd88f", "#9ecbff", "#c9a7ff", "#ffb4a2"];

function setup(modal: Modal, className: string): void {
  applyResizableModal(modal, {
    className,
    width: "min(780px, 92vw)",
    height: "min(680px, 86vh)",
    maxWidth: "96vw",
    maxHeight: "92vh",
    minWidth: "min(380px, 92vw)",
    minHeight: "min(320px, 82vh)"
  });
}

export function openCheckInManagerModal(app: App, store: DashboardStore, moduleId: DashboardPage | "overview", onDone: () => void): void {
  new CheckInManagerModal(app, store, moduleId, onDone).open();
}

export function openCheckInHistoryModal(app: App, store: DashboardStore, moduleId?: DashboardPage | "overview"): void {
  new CheckInHistoryModal(app, store, moduleId).open();
}

class CheckInManagerModal extends Modal {
  constructor(
    app: App,
    private readonly store: DashboardStore,
    private readonly moduleId: DashboardPage | "overview",
    private readonly onDone: () => void
  ) {
    super(app);
  }

  onOpen(): void {
    setup(this, "cute-checkin-manager-modal");
    this.render();
  }

  private render(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-checkin-modal");
    this.contentEl.createEl("h2", { text: `${PAGE_LABELS[this.moduleId as DashboardPage] ?? "打卡"} · 自定义打卡` });
    const list = this.contentEl.createDiv({ cls: "cow-checkin-manager-list" });
    const definitions = this.store.getCheckInDefinitions(this.moduleId, false);
    if (definitions.length === 0) {
      list.createDiv({ cls: "cow-empty-state", text: "还没有打卡项目。" });
    }
    definitions.forEach((definition, index) => this.renderDefinition(list, definition, index, definitions.length));
    const add = this.contentEl.createDiv({ cls: "cow-checkin-add-row" });
    const title = add.createEl("input", { attr: { type: "text", placeholder: "新增打卡项目名称" } });
    const icon = add.createEl("input", { attr: { type: "text", placeholder: "图标，如 book-open" } });
    const button = add.createEl("button", { text: "新增", cls: "mod-cta", attr: { type: "button" } });
    button.addEventListener("click", async () => {
      const name = title.value.trim();
      if (!name) {
        new Notice("请输入打卡项目名称。");
        return;
      }
      await this.store.addCheckInDefinition({
        moduleId: this.moduleId,
        title: name,
        icon: icon.value.trim() || "circle",
        color: COLORS[definitions.length % COLORS.length]
      });
      this.onDone();
      this.render();
    });
  }

  private renderDefinition(container: HTMLElement, definition: CheckInDefinition, index: number, total: number): void {
    const row = container.createDiv({ cls: "cow-checkin-manager-row" });
    const handle = row.createSpan({ cls: "cow-checkin-manager-icon" });
    setIcon(handle, definition.icon || "circle");
    const title = row.createEl("input", { attr: { type: "text", value: definition.title } });
    const icon = row.createEl("input", { attr: { type: "text", value: definition.icon ?? "circle", placeholder: "icon" } });
    const color = row.createEl("input", { attr: { type: "color", value: definition.color ?? "#ff8fbc", title: "颜色" } });
    const enabled = row.createEl("input", { attr: { type: "checkbox", title: "启用" } });
    enabled.checked = definition.enabled;
    const save = row.createEl("button", { text: "保存", attr: { type: "button" } });
    save.addEventListener("click", async () => {
      await this.store.updateCheckInDefinition(definition.id, {
        title: title.value.trim() || definition.title,
        icon: icon.value.trim() || "circle",
        color: color.value,
        enabled: enabled.checked
      });
      this.onDone();
      this.render();
    });
    const up = row.createEl("button", { text: "上移", attr: { type: "button" } });
    up.disabled = index === 0;
    up.addEventListener("click", () => void this.move(definition, -1));
    const down = row.createEl("button", { text: "下移", attr: { type: "button" } });
    down.disabled = index === total - 1;
    down.addEventListener("click", () => void this.move(definition, 1));
    row.createEl("button", { text: "删除", cls: "mod-warning", attr: { type: "button" } }).addEventListener("click", async () => {
      if (!confirm(`删除“${definition.title}”打卡项目？历史记录会保留。`)) return;
      await this.store.archiveCheckInDefinition(definition.id);
      this.onDone();
      this.render();
    });
  }

  private async move(definition: CheckInDefinition, direction: -1 | 1): Promise<void> {
    const definitions = this.store.getCheckInDefinitions(this.moduleId);
    const index = definitions.findIndex((item) => item.id === definition.id);
    const target = definitions[index + direction];
    if (!target) return;
    const ordered = [...definitions];
    ordered[index] = target;
    ordered[index + direction] = definition;
    await this.store.reorderCheckInDefinitions(this.moduleId, ordered.map((item) => item.id));
    this.onDone();
    this.render();
  }
}

class CheckInHistoryModal extends Modal {
  private month = new Date();
  private selectedModule = "all";
  private selectedDefinitionId = "all";
  private timer?: number;

  constructor(app: App, private readonly store: DashboardStore, private readonly moduleId?: DashboardPage | "overview") {
    super(app);
    this.selectedModule = moduleId && moduleId !== "overview" ? moduleId : "all";
  }

  onOpen(): void {
    setup(this, "cute-checkin-history-modal");
    this.timer = window.setInterval(() => this.render(), 60_000);
    this.render();
  }

  onClose(): void {
    if (this.timer) {
      window.clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  private render(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-checkin-modal");
    const definitions = this.getFilteredDefinitions();
    const header = this.contentEl.createDiv({ cls: "cow-checkin-history-header" });
    const prev = header.createEl("button", { attr: { type: "button", "aria-label": "上一月" } });
    setIcon(prev, "chevron-left");
    prev.addEventListener("click", () => {
      this.month = new Date(this.month.getFullYear(), this.month.getMonth() - 1, 1);
      this.render();
    });
    header.createEl("h2", { text: `${this.month.getFullYear()}年${this.month.getMonth() + 1}月打卡历史` });
    const next = header.createEl("button", { attr: { type: "button", "aria-label": "下一月" } });
    setIcon(next, "chevron-right");
    next.addEventListener("click", () => {
      this.month = new Date(this.month.getFullYear(), this.month.getMonth() + 1, 1);
      this.render();
    });

    this.renderFilters();
    this.renderSummary(definitions);
    this.renderCalendar(definitions);
  }

  private renderFilters(): void {
    const filters = this.contentEl.createDiv({ cls: "cow-checkin-history-filters" });
    const moduleSelect = filters.createEl("select");
    moduleSelect.createEl("option", { value: "all", text: "全部模块" });
    const modules = [...new Set(this.store.getCheckInDefinitions(undefined, true).map((item) => item.moduleId))];
    modules.forEach((moduleId) => moduleSelect.createEl("option", { value: moduleId, text: PAGE_LABELS[moduleId as DashboardPage] ?? moduleId }));
    moduleSelect.value = this.selectedModule;
    if (this.moduleId && this.moduleId !== "overview") moduleSelect.disabled = true;
    moduleSelect.addEventListener("change", () => {
      this.selectedModule = moduleSelect.value;
      this.selectedDefinitionId = "all";
      this.render();
    });

    const itemSelect = filters.createEl("select");
    itemSelect.createEl("option", { value: "all", text: "全部打卡项目" });
    this.getModuleScopedDefinitions().forEach((definition) => itemSelect.createEl("option", { value: definition.id, text: definition.title }));
    itemSelect.value = this.selectedDefinitionId;
    itemSelect.addEventListener("change", () => {
      this.selectedDefinitionId = itemSelect.value;
      this.render();
    });
  }

  private renderSummary(definitions: CheckInDefinition[]): void {
    const days = this.getMonthDateKeys();
    const statuses: Array<"completed" | "missed" | "today" | "future" | "na"> = [];
    days.forEach((date) => {
      definitions.forEach((definition) => statuses.push(this.getDayStatus(definition, date)));
    });
    const applicable = statuses.filter((status) => status !== "future" && status !== "na");
    const completed = statuses.filter((status) => status === "completed").length;
    const missed = statuses.filter((status) => status === "missed").length;
    const cards = this.contentEl.createDiv({ cls: "cow-stats-card-grid" });
    [
      ["本月打卡", `${completed} / ${applicable.length}`],
      ["完成率", `${applicable.length ? Math.round((completed / applicable.length) * 100) : 0}%`],
      ["漏打", missed],
      ["连续打卡", `${this.getCurrentStreak(definitions)}天`]
    ].forEach(([label, value]) => {
      const card = cards.createDiv({ cls: "cow-stats-card" });
      card.createEl("strong", { text: String(value) });
      card.createSpan({ text: String(label) });
    });
  }

  private renderCalendar(definitions: CheckInDefinition[]): void {
    const grid = this.contentEl.createDiv({ cls: "cow-checkin-history-calendar" });
    ["一", "二", "三", "四", "五", "六", "日"].forEach((day) => grid.createDiv({ cls: "cow-checkin-history-weekday", text: day }));
    const first = new Date(this.month.getFullYear(), this.month.getMonth(), 1);
    const leading = (first.getDay() + 6) % 7;
    for (let index = 0; index < leading; index += 1) grid.createDiv({ cls: "cow-checkin-history-day is-empty" });
    this.getMonthDateKeys().forEach((date) => {
      const day = grid.createDiv({ cls: "cow-checkin-history-day" });
      day.createEl("strong", { text: date.slice(-2) });
      const dots = day.createDiv({ cls: "cow-checkin-history-dots" });
      definitions.forEach((definition) => {
        const status = this.getDayStatus(definition, date);
        const dot = dots.createSpan({ cls: `cow-checkin-history-dot is-${status}`, attr: { title: `${definition.title} · ${this.statusLabel(status)}` } });
        if (status === "completed") dot.setText("✓");
        if (status === "missed") dot.setText("×");
        if (status === "today") dot.setText("○");
      });
    });
  }

  private getModuleScopedDefinitions(): CheckInDefinition[] {
    const all = this.store.getCheckInDefinitions(undefined, true);
    if (this.moduleId && this.moduleId !== "overview") return all.filter((definition) => definition.moduleId === this.moduleId);
    if (this.selectedModule !== "all") return all.filter((definition) => definition.moduleId === this.selectedModule);
    return all;
  }

  private getFilteredDefinitions(): CheckInDefinition[] {
    return this.getModuleScopedDefinitions().filter((definition) => this.selectedDefinitionId === "all" || definition.id === this.selectedDefinitionId);
  }

  private getMonthDateKeys(): string[] {
    const days = new Date(this.month.getFullYear(), this.month.getMonth() + 1, 0).getDate();
    return Array.from({ length: days }, (_, index) => this.toDateKey(new Date(this.month.getFullYear(), this.month.getMonth(), index + 1)));
  }

  private getDayStatus(definition: CheckInDefinition, date: string): "completed" | "missed" | "today" | "future" | "na" {
    const today = this.toDateKey(new Date());
    if (date > today) return "future";
    if (!this.isDefinitionApplicable(definition, date)) return "na";
    if (this.store.isCheckInCompleted(definition.id, date)) return "completed";
    if (date === today) return "today";
    return "missed";
  }

  private isDefinitionApplicable(definition: CheckInDefinition, date: string): boolean {
    const activeFrom = this.toDateKey(new Date(definition.createdAt));
    if (date < activeFrom) return false;
    if (definition.inactiveFrom && date >= definition.inactiveFrom) return false;
    return true;
  }

  private getCurrentStreak(definitions: CheckInDefinition[]): number {
    let streak = 0;
    const today = new Date();
    for (let offset = 0; offset < 366; offset += 1) {
      const date = new Date(today);
      date.setDate(today.getDate() - offset);
      const key = this.toDateKey(date);
      const applicable = definitions.filter((definition) => this.isDefinitionApplicable(definition, key));
      if (applicable.length === 0) continue;
      if (!applicable.every((definition) => this.store.isCheckInCompleted(definition.id, key))) break;
      streak += 1;
    }
    return streak;
  }

  private statusLabel(status: "completed" | "missed" | "today" | "future" | "na"): string {
    return {
      completed: "已完成",
      missed: "漏打",
      today: "今天未完成",
      future: "未来",
      na: "不适用"
    }[status];
  }

  private toDateKey(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
}
