import { formatDateKey, type DashboardStore } from "../../core/DashboardStore";
import { PAGE_LABELS } from "../../core/PageLabels";
import type { CheckInDefinition, DashboardPage } from "../../types/dashboard";
import { CheckInService } from "../../services/CheckInService";

const MODULE_ORDER: DashboardPage[] = ["overview", "research", "reading", "fitness", "finance", "goals"];
const WEEK_LABELS = ["一", "二", "三", "四", "五", "六", "日"];
type CheckInCellStatus = "completed" | "missed" | "today" | "future" | "na";

export class CheckInSection {
  private readonly service: CheckInService;
  private weekStart = this.getCurrentWeekStart();
  private followCurrentWeek = true;

  constructor(
    private readonly store: DashboardStore,
    private readonly moduleId: DashboardPage | "all",
    private readonly onDataChanged: () => void
  ) {
    this.service = new CheckInService(store);
  }

  render(container: HTMLElement): void {
    const host = container.createDiv({ cls: `cow-checkin-section ${this.moduleId === "all" ? "is-overview-compact" : ""}` });
    host.addEventListener("cow-checkin-date-change", () => {
      if (this.followCurrentWeek) this.weekStart = this.getCurrentWeekStart();
      this.rerenderSection(host);
    });
    this.renderWeekNav(host);
    if (this.moduleId === "all") {
      this.renderOverview(host);
      return;
    }
    this.renderModule(host, this.moduleId);
  }

  private renderOverview(container: HTMLElement): void {
    const definitions = this.service.getAllDefinitions();
    if (definitions.length === 0) {
      container.createDiv({ cls: "cow-empty-state", text: "还没有启用的打卡项目。" });
      return;
    }
    const rendered = new Set<string>();
    MODULE_ORDER.forEach((moduleId) => {
      const group = definitions.filter((definition) => definition.moduleId === moduleId);
      if (group.length === 0) return;
      rendered.add(moduleId);
      const section = container.createDiv({ cls: "cow-checkin-module-group" });
      section.createEl("h4", { text: moduleId === "overview" ? "通用" : PAGE_LABELS[moduleId] });
      this.renderWeeklyTable(section, group);
    });
    const extra = definitions.filter((definition) => !rendered.has(definition.moduleId));
    if (extra.length > 0) {
      const section = container.createDiv({ cls: "cow-checkin-module-group" });
      section.createEl("h4", { text: "其它" });
      this.renderWeeklyTable(section, extra);
    }
  }

  private renderModule(container: HTMLElement, moduleId: DashboardPage): void {
    const definitions = this.service.getDefinitions(moduleId);
    if (definitions.length === 0) {
      container.createDiv({ cls: "cow-empty-state", text: "还没有启用的打卡项目，可点击右上角自定义添加。" });
      return;
    }
    this.renderWeeklyTable(container, definitions);
  }

  private renderWeekNav(container: HTMLElement): void {
    const dates = this.getWeekDates();
    const nav = container.createDiv({ cls: "cow-checkin-week-nav" });
    nav.createEl("button", { text: "‹", attr: { type: "button", "aria-label": "上一周" } }).addEventListener("click", () => {
      this.followCurrentWeek = false;
      this.weekStart.setDate(this.weekStart.getDate() - 7);
      this.rerenderSection(container);
    });
    nav.createEl("strong", { text: `本周 ${this.shortDate(dates[0])} - ${this.shortDate(dates[6])}` });
    nav.createEl("button", { text: "回到本周", attr: { type: "button" } }).addEventListener("click", () => {
      this.followCurrentWeek = true;
      this.weekStart = this.getCurrentWeekStart();
      this.rerenderSection(container);
    });
    nav.createEl("button", { text: "›", attr: { type: "button", "aria-label": "下一周" } }).addEventListener("click", () => {
      this.followCurrentWeek = false;
      this.weekStart.setDate(this.weekStart.getDate() + 7);
      this.rerenderSection(container);
    });
  }

  private renderWeeklyTable(container: HTMLElement, definitions: CheckInDefinition[]): void {
    const dates = this.getWeekDates();
    const table = container.createDiv({ cls: "cow-checkin-week-table" });
    table.createDiv({ cls: "cow-checkin-week-corner", text: "打卡项目" });
    dates.forEach((date, index) => {
      const key = formatDateKey(date);
      const header = table.createDiv({ cls: `cow-checkin-week-day ${key === formatDateKey(new Date()) ? "is-today" : ""}` });
      header.createSpan({ text: WEEK_LABELS[index] });
      header.createEl("strong", { text: String(date.getDate()) });
    });
    definitions.forEach((definition) => this.renderWeeklyRow(table, definition, dates));
    this.renderSummary(container, definitions, dates);
  }

  private renderWeeklyRow(table: HTMLElement, definition: CheckInDefinition, dates: Date[]): void {
    const row = table.createDiv({ cls: "cow-checkin-week-row", attr: { "data-checkin-id": definition.id } });
    row.style.setProperty("--checkin-color", definition.color || "var(--cow-pink-strong)");
    const main = row.createDiv({ cls: "cow-checkin-week-row-main" });
    this.renderWeekLabel(main, definition);
    dates.forEach((date) => this.renderWeekCell(main, definition, formatDateKey(date), table, row, dates));

    const progress = this.getWeeklyProgress(definition, dates);
    const progressMeta = row.createDiv({ cls: "cow-checkin-week-progress-meta" });
    progressMeta.createSpan({ text: `${progress.completed} / ${progress.eligible}` });
    progressMeta.createSpan({ text: `${progress.percent}%` });
    const track = row.createDiv({ cls: "cow-checkin-week-progress-track", attr: { "aria-label": `本周完成 ${progress.completed}/${progress.eligible}，${progress.percent}%` } });
    const fill = track.createDiv({ cls: "cow-checkin-week-progress-fill" });
    fill.style.width = `${progress.percent}%`;
    fill.style.backgroundColor = definition.color || "var(--cow-pink-strong)";
  }

  private renderWeekLabel(container: HTMLElement, definition: CheckInDefinition): void {
    const label = container.createDiv({ cls: "cow-checkin-week-name", attr: { title: definition.title } });
    label.style.setProperty("--checkin-color", definition.color || "var(--cow-pink-strong)");
    label.createSpan({ text: definition.title });
  }

  private renderWeekCell(container: HTMLElement, definition: CheckInDefinition, key: string, table: HTMLElement, row: HTMLElement, dates: Date[]): void {
    const status = this.getCellStatus(definition, key);
    const cell = container.createEl("button", {
      cls: `cow-checkin-week-cell is-${status}`,
      attr: { type: "button", title: `${key}\n${definition.title}\n${this.statusLabel(status)}`, "aria-label": `${definition.title} ${key} ${this.statusLabel(status)}` }
    });
    cell.style.setProperty("--checkin-color", definition.color || "var(--cow-pink-strong)");
    cell.setText(this.statusMark(status));
    const clickable = key === formatDateKey(new Date()) && status !== "future" && status !== "na";
    cell.disabled = !clickable;
    if (clickable) {
      cell.addEventListener("click", async () => {
        await this.service.toggleCheckIn(definition.id, key);
        this.refreshWeeklyRow(table, row, definition, dates);
      });
    }
  }

  private refreshWeeklyRow(table: HTMLElement, row: HTMLElement, definition: CheckInDefinition, dates: Date[]): void {
    const main = row.querySelector<HTMLElement>(".cow-checkin-week-row-main");
    if (!main) return;
    main.empty();
    this.renderWeekLabel(main, definition);
    dates.forEach((date) => this.renderWeekCell(main, definition, formatDateKey(date), table, row, dates));

    const progress = this.getWeeklyProgress(definition, dates);
    row.querySelectorAll<HTMLElement>(".cow-checkin-week-progress-meta span").forEach((item, index) => {
      item.setText(index === 0 ? `${progress.completed} / ${progress.eligible}` : `${progress.percent}%`);
    });
    const fill = row.querySelector<HTMLElement>(".cow-checkin-week-progress-fill");
    const track = row.querySelector<HTMLElement>(".cow-checkin-week-progress-track");
    if (fill) fill.style.width = `${progress.percent}%`;
    track?.setAttribute("aria-label", `本周完成 ${progress.completed}/${progress.eligible}，${progress.percent}%`);
    const summaryContainer = table.parentElement;
    const existingSummary = summaryContainer?.querySelector<HTMLElement>(":scope > .cow-checkin-week-summary");
    if (summaryContainer && existingSummary) {
      const replacement = this.createSummary(this.getDefinitionsForTable(table), dates);
      existingSummary.replaceWith(replacement);
    }
  }

  private getDefinitionsForTable(table: HTMLElement): CheckInDefinition[] {
    const ids = new Set(Array.from(table.querySelectorAll<HTMLElement>(".cow-checkin-week-row")).map((row) => row.dataset.checkinId));
    return this.service.getAllDefinitions().filter((definition) => ids.has(definition.id));
  }

  private renderSummary(container: HTMLElement, definitions: CheckInDefinition[], dates: Date[]): void {
    container.append(this.createSummary(definitions, dates));
  }

  private createSummary(definitions: CheckInDefinition[], dates: Date[]): HTMLElement {
    let total = 0;
    let completed = 0;
    dates.forEach((date) => {
      const key = formatDateKey(date);
      definitions.forEach((definition) => {
        if (!this.isDefinitionApplicable(definition, key)) return;
        total += 1;
        if (this.service.isCompleted(definition.id, key)) {
          completed += 1;
        }
      });
    });
    const summary = document.createElement("div");
    summary.className = "cow-checkin-week-summary";
    summary.textContent = `本周完成：${completed} / ${total} · 完成率：${total ? Math.round((completed / total) * 100) : 0}%`;
    return summary;
  }

  private getWeeklyProgress(definition: CheckInDefinition, dates: Date[]): { completed: number; eligible: number; percent: number } {
    const eligibleDates = dates.map((date) => formatDateKey(date)).filter((date) => this.isDefinitionApplicable(definition, date));
    const completed = eligibleDates.filter((date) => this.service.isCompleted(definition.id, date)).length;
    const eligible = eligibleDates.length;
    return { completed, eligible, percent: eligible ? Math.round((completed / eligible) * 100) : 0 };
  }

  private getCellStatus(definition: CheckInDefinition, date: string): CheckInCellStatus {
    const today = formatDateKey(new Date());
    if (!this.isDefinitionApplicable(definition, date)) return "na";
    if (date > today) return "future";
    if (this.service.isCompleted(definition.id, date)) return "completed";
    if (date === today) return "today";
    return "missed";
  }

  private isDefinitionApplicable(definition: CheckInDefinition, date: string): boolean {
    const activeFrom = formatDateKey(new Date(definition.createdAt));
    if (date < activeFrom) return false;
    if (definition.inactiveFrom && date >= definition.inactiveFrom) return false;
    return true;
  }

  private statusMark(status: CheckInCellStatus): string {
    if (status === "completed") return "✓";
    if (status === "missed") return "×";
    if (status === "today") return "○";
    if (status === "na") return "—";
    return "";
  }

  private statusLabel(status: CheckInCellStatus): string {
    return {
      completed: "已完成",
      missed: "漏打",
      today: "今日未完成",
      future: "未来",
      na: "不适用"
    }[status];
  }

  private getWeekDates(): Date[] {
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(this.weekStart);
      date.setDate(this.weekStart.getDate() + index);
      return date;
    });
  }

  private getCurrentWeekStart(): Date {
    const today = new Date();
    const monday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
    return monday;
  }

  private shortDate(date: Date): string {
    return `${date.getMonth() + 1}/${date.getDate()}`;
  }

  private rerenderSection(host: HTMLElement | null): void {
    if (!host) {
      this.onDataChanged();
      return;
    }
    host.empty();
    this.renderWeekNav(host);
    if (this.moduleId === "all") this.renderOverview(host);
    else this.renderModule(host, this.moduleId);
  }
}
