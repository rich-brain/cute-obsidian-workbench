import { App } from "obsidian";
import type { DashboardPage, DashboardSectionConfig } from "../types/dashboard";
import { DashboardSection } from "./DashboardSection";
import { AddSectionButton } from "./AddSectionButton";
import type { DashboardStore } from "../core/DashboardStore";
import { GRID_CONFIG, resolveModuleLayout } from "../core/DashboardLayoutEngine";

const SUMMARY_SECTIONS = new Set(["weekly-completion", "pending-tasks", "today-focus-stat", "checkin-streak", "task-stats"]);
const COMPACT_SECTIONS = new Set(["quick-actions", "research-memo", "health-reminders", "finance-todos", "task-quick-add", "task-inbox", "data-source-status"]);
const PRIMARY_SECTIONS = new Set(["reading-queue", "bookshelf", "finance-ledger", "workout-log", "goal-breakdown", "yearly-goals", "task-today", "task-board"]);
const VISUAL_SECTIONS = new Set(["contribution-heatmap", "fitness-stats", "income-expense-trend", "reading-stats", "reading-heatmap", "fitness-heatmap", "expense-heatmap", "task-week"]);
const MANAGER_SECTIONS = new Set(["section-manager", "paper-field-manager", "reading-tag-manager"]);

function sectionDensity(type: string): string {
  if (type === "monthly-calendar" || type === "month-calendar") return "calendar";
  if (SUMMARY_SECTIONS.has(type)) return "summary";
  if (COMPACT_SECTIONS.has(type)) return "compact";
  if (PRIMARY_SECTIONS.has(type)) return "primary";
  if (VISUAL_SECTIONS.has(type)) return "visual";
  if (MANAGER_SECTIONS.has(type) || type.endsWith("-settings")) return "manager";
  return "list";
}

export class DashboardGrid {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly page: DashboardPage,
    private readonly onDataChanged: () => void,
    private readonly renderCustomSection?: (grid: HTMLElement, section: DashboardSectionConfig) => HTMLElement
  ) {}

  render(container: HTMLElement): void {
    const sections = this.renderCustomSection ? this.store.getLayoutSections(this.page) : this.store.getSectionsForPage(this.page);
    const respectOrder = !this.renderCustomSection && this.store.hasCustomSectionOrder(this.page);
    const grid = container.createDiv({ cls: `cow-dashboard-grid cow-layout-engine cow-dashboard-page-${this.page} cow-module-layout-default` });

    const elements = new Map<string, HTMLElement>();
    sections.forEach((section: DashboardSectionConfig) => {
      const sectionEl = this.renderCustomSection ? this.renderCustomSection(grid, section)
        : new DashboardSection(this.app, this.store, section, async (removedSection) => {
          await this.store.removeSection(removedSection.id);
          this.onDataChanged();
        }, this.onDataChanged).render(grid);
      sectionEl.dataset.sectionId = section.id;
      const density = sectionDensity(section.type);
      sectionEl.addClass(`cow-density-${density}`);
      sectionEl.dataset.autoHeight = density === "summary" || density === "visual" || density === "calendar" ? "false" : "true";
      elements.set(section.id, sectionEl);
    });

    const apply = () => {
      const resolved = resolveModuleLayout(this.page, sections, grid.clientWidth, undefined, respectOrder);
      grid.style.gridTemplateColumns = `repeat(${resolved.columns}, minmax(0, 1fr))`;
      grid.style.gridAutoRows = `${GRID_CONFIG.rowHeight}px`;
      grid.style.gap = `${GRID_CONFIG.gap}px`;
      grid.dataset.columns = String(resolved.columns);
      for (const item of resolved.items) {
        const element = elements.get(item.sectionId);
        if (!element) continue;
        element.style.gridColumn = `${item.x + 1} / span ${item.w}`;
        element.style.gridRow = `${item.y + 1} / span ${item.h}`;
        element.style.order = "0";
        const height = item.h * GRID_CONFIG.rowHeight + (item.h - 1) * GRID_CONFIG.gap;
        element.style.maxHeight = `min(${height}px, var(--wb-density-max, 440px), var(--wb-section-max-height, 66.6667vh))`;
      }
    };
    apply();
    let reflowFrame = 0;
    const scheduleReflow = () => {
      if (reflowFrame || !grid.isConnected) return;
      reflowFrame = window.requestAnimationFrame(() => {
        reflowFrame = 0;
        this.fitNaturalHeights(grid, sections, elements, respectOrder);
      });
    };
    const contentResizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(scheduleReflow) : undefined;
    const contentMutationObserver = typeof MutationObserver !== "undefined" ? new MutationObserver(scheduleReflow) : undefined;
    if (contentResizeObserver || contentMutationObserver) {
      for (const element of elements.values()) {
        if (element.dataset.autoHeight !== "true") continue;
        const content = element.querySelector<HTMLElement>(".cow-section-content") ?? element;
        contentResizeObserver?.observe(content);
        contentMutationObserver?.observe(content, { childList: true, subtree: true, characterData: true });
      }
    }
    let lastWidth = grid.clientWidth;
    const pageHost = grid.closest<HTMLElement>(".cow-page-host");
    let lastHeight = pageHost?.clientHeight;
    const observer = new ResizeObserver(() => {
      if (!grid.isConnected || (grid.clientWidth === lastWidth && pageHost?.clientHeight === lastHeight)) return;
      lastWidth = grid.clientWidth;
      lastHeight = pageHost?.clientHeight;
      apply();
      scheduleReflow();
    });
    observer.observe(grid.parentElement ?? grid);
    if (pageHost) observer.observe(pageHost);
    grid.addEventListener("cow-layout-destroy", () => {
      observer.disconnect();
      contentResizeObserver?.disconnect();
      contentMutationObserver?.disconnect();
      window.cancelAnimationFrame(reflowFrame);
    }, { once: true });
    scheduleReflow();

    if (!this.renderCustomSection) new AddSectionButton(this.app, this.page, this.store.getAvailableModules(this.page), async (moduleType) => {
      await this.store.addSection(this.page, moduleType);
      this.onDataChanged();
    }).render(container);
  }

  private fitNaturalHeights(grid: HTMLElement, sections: DashboardSectionConfig[], elements: Map<string, HTMLElement>, respectOrder: boolean): void {
    if (!grid.isConnected) return;
    const source = resolveModuleLayout(this.page, sections, grid.clientWidth, undefined, respectOrder);
    const naturalRows = new Map<string, number>();
    source.items.forEach((item) => {
      const element = elements.get(item.sectionId);
      if (!element) return;
      const header = element.querySelector<HTMLElement>(".cow-section-header");
      const body = element.querySelector<HTMLElement>(".cow-section-content");
      const style = getComputedStyle(element);
      const inset = Number.parseFloat(style.paddingTop) + Number.parseFloat(style.paddingBottom)
        + Number.parseFloat(style.borderTopWidth) + Number.parseFloat(style.borderBottomWidth);
      const natural = body ? (header?.offsetHeight ?? 0) + Number.parseFloat(getComputedStyle(header ?? element).marginBottom) + body.scrollHeight + inset : element.scrollHeight;
      const minimum = Number.parseFloat(style.minHeight) || 0;
      const maximum = Number.parseFloat(style.maxHeight) || natural;
      const height = Math.min(maximum, Math.max(minimum, natural));
      const rows = Math.max(1, Math.ceil((height + GRID_CONFIG.gap) / (GRID_CONFIG.rowHeight + GRID_CONFIG.gap)));
      naturalRows.set(item.sectionId, rows);
    });
    const placed = resolveModuleLayout(this.page, sections, grid.clientWidth, naturalRows, respectOrder).items;
    for (const item of placed) {
      const element = elements.get(item.sectionId);
      if (!element) continue;
      const column = `${item.x + 1} / span ${item.w}`;
      const row = `${item.y + 1} / span ${item.h}`;
      if (element.style.gridColumn !== column) element.style.gridColumn = column;
      if (element.style.gridRow !== row) element.style.gridRow = row;
    }
  }
}
