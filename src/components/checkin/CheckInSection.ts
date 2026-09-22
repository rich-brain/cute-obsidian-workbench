import { setIcon } from "obsidian";
import { formatDateKey, type DashboardStore } from "../../core/DashboardStore";
import { PAGE_LABELS } from "../../core/PageLabels";
import type { CheckInDefinition, DashboardPage } from "../../types/dashboard";
import { CheckInService } from "../../services/CheckInService";

const MODULE_ORDER: DashboardPage[] = ["overview", "research", "reading", "fitness", "finance", "goals"];

export class CheckInSection {
  private readonly service: CheckInService;

  constructor(
    private readonly store: DashboardStore,
    private readonly moduleId: DashboardPage | "all",
    private readonly onDataChanged: () => void
  ) {
    this.service = new CheckInService(store);
  }

  render(container: HTMLElement): void {
    const host = container.createDiv({ cls: "cow-checkin-section" });
    host.addEventListener("cow-checkin-date-change", () => this.rerenderSection(host));
    if (this.moduleId === "all") {
      this.renderOverview(host);
      return;
    }
    this.renderModule(host, this.moduleId);
  }

  private renderOverview(container: HTMLElement): void {
    const today = formatDateKey(new Date());
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
      const grid = section.createDiv({ cls: "cow-checkin-grid" });
      group.forEach((definition) => this.renderItem(grid, definition, today));
    });
    const extra = definitions.filter((definition) => !rendered.has(definition.moduleId));
    if (extra.length > 0) {
      const section = container.createDiv({ cls: "cow-checkin-module-group" });
      section.createEl("h4", { text: "其它" });
      const grid = section.createDiv({ cls: "cow-checkin-grid" });
      extra.forEach((definition) => this.renderItem(grid, definition, today));
    }
  }

  private renderModule(container: HTMLElement, moduleId: DashboardPage): void {
    const today = formatDateKey(new Date());
    const definitions = this.service.getDefinitions(moduleId);
    if (definitions.length === 0) {
      container.createDiv({ cls: "cow-empty-state", text: "还没有启用的打卡项目，可点击右上角自定义添加。" });
      return;
    }
    const grid = container.createDiv({ cls: "cow-checkin-grid" });
    definitions.forEach((definition) => this.renderItem(grid, definition, today));
    container.createDiv({ cls: "cow-meta-line", text: `今天：${today}` });
  }

  private renderItem(container: HTMLElement, definition: CheckInDefinition, date: string): void {
    const completed = this.service.isCompleted(definition.id, date);
    const button = container.createEl("button", {
      cls: `cow-checkin-item ${completed ? "is-done" : ""}`,
      attr: { type: "button", "aria-label": `${definition.title} ${date}`, title: definition.title }
    });
    button.style.setProperty("--checkin-color", definition.color ?? "#ff8fbc");
    const icon = button.createSpan({ cls: "cow-checkin-item-icon" });
    setIcon(icon, definition.icon || "circle");
    button.createSpan({ cls: "cow-checkin-item-title", text: definition.title });
    const mark = button.createSpan({ cls: "cow-checkin-item-status" });
    if (completed) setIcon(mark, "check");
    else mark.setText("○");
    button.addEventListener("click", async () => {
      await this.service.toggleCheckIn(definition.id, date);
      this.rerenderSection(container.closest(".cow-checkin-section") as HTMLElement | null);
    });
  }

  private rerenderSection(host: HTMLElement | null): void {
    if (!host) {
      this.onDataChanged();
      return;
    }
    host.empty();
    if (this.moduleId === "all") this.renderOverview(host);
    else this.renderModule(host, this.moduleId);
  }
}
