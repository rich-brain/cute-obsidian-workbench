import { App, Modal } from "obsidian";
import type { DashboardPage, DashboardSectionConfig, SectionLayoutItem } from "../types/dashboard";
import { DashboardSection } from "./DashboardSection";
import { AddSectionButton, AddSectionModal } from "./AddSectionButton";
import type { DashboardStore } from "../core/DashboardStore";
import { addDraftSection, getDraftLayout, getDraftSections, isLayoutEditing, removeDraftSection, resetDraftLayout, stopLayoutEditing, updateDraftLayout } from "../core/LayoutEditState";
import { createDefaultLayout, GRID_CONFIG, moveLayoutItem, resolveModuleLayout, resizeLayoutItem, sectionMinimum } from "../core/DashboardLayoutEngine";

const SUMMARY_SECTIONS = new Set(["weekly-completion", "pending-tasks", "today-focus-stat", "checkin-streak", "task-stats"]);
const COMPACT_SECTIONS = new Set(["quick-actions", "research-memo", "health-reminders", "finance-todos", "task-quick-add", "task-inbox", "data-source-status"]);
const PRIMARY_SECTIONS = new Set(["reading-queue", "bookshelf", "finance-ledger", "workout-log", "goal-breakdown", "yearly-goals", "task-today", "task-board"]);
const VISUAL_SECTIONS = new Set(["contribution-heatmap", "fitness-stats", "income-expense-trend", "reading-stats", "reading-heatmap", "fitness-heatmap", "expense-heatmap", "task-week"]);
const MANAGER_SECTIONS = new Set(["home-layout-manager", "section-manager", "paper-field-manager", "reading-tag-manager"]);

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
    const layout = this.store.getModuleLayout(this.page);
    const sections = [...(this.renderCustomSection ? this.store.getLayoutSections(this.page) : this.store.getSectionsForPage(this.page)), ...getDraftSections(this.page)];
    const editing = isLayoutEditing(this.page);
    if (editing) {
      const toolbar = container.createDiv({ cls: "cow-layout-edit-toolbar" });
      toolbar.createEl("strong", { text: "编辑布局" });
      toolbar.createEl("span", { text: "拖动标题移动板块，拖动右下角调整尺寸。" });
      if (!this.renderCustomSection) toolbar.createEl("button", { text: "添加板块", attr: { type: "button" } }).addEventListener("click", () => {
        new AddSectionModal(this.app, this.page, this.store.getAvailableModules(this.page), async (moduleType) => {
          const definition = this.store.getAvailableModules(this.page).find((item) => item.type === moduleType);
          const order = Math.max(0, ...this.store.getAllSections().filter((item) => item.page === this.page).map((item) => item.order)) + 10;
          addDraftSection(this.page, {
            id: `${this.page}-${moduleType}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            page: this.page,
            type: moduleType,
            title: definition?.title ?? moduleType,
            order,
            enabled: true,
            width: definition?.defaultWidth ?? "md",
            height: definition?.defaultHeight ?? "sm",
            config: {}
          });
          this.onDataChanged();
        }).open();
      });
      const reset = toolbar.createEl("button", { text: "重置布局", attr: { type: "button" } });
      reset.addEventListener("click", () => this.confirmReset());
      toolbar.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => {
        stopLayoutEditing();
        this.onDataChanged();
      });
      toolbar.createEl("button", { text: "完成布局", cls: "mod-cta", attr: { type: "button" } }).addEventListener("click", () => void this.finish());
    }

    const grid = container.createDiv({ cls: `cow-dashboard-grid cow-layout-engine cow-dashboard-page-${this.page} cow-module-layout-${layout.mode}` });
    if (editing) grid.addClass("is-layout-editing");

    const elements = new Map<string, HTMLElement>();
    sections.forEach((section: DashboardSectionConfig) => {
      const sectionEl = this.renderCustomSection ? this.renderCustomSection(grid, section)
        : new DashboardSection(this.app, this.store, section, async (removedSection) => {
          if (!removeDraftSection(this.page, removedSection.id)) await this.store.removeSection(removedSection.id);
          this.onDataChanged();
        }, this.onDataChanged).render(grid);
      sectionEl.dataset.sectionId = section.id;
      sectionEl.addClass(`cow-density-${sectionDensity(section.type)}`);
      elements.set(section.id, sectionEl);
      if (editing) this.decorateEditableSection(grid, sectionEl, section, sections, elements);
    });

    const apply = (draft?: SectionLayoutItem[]) => {
      const resolved = resolveModuleLayout(this.page, sections, this.store.getModuleLayout(this.page), grid.clientWidth, draft ?? getDraftLayout(this.page));
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
        element.style.maxHeight = editing
          ? `min(${height}px, var(--wb-section-max-height, 66.6667vh))`
          : `min(${height}px, var(--wb-density-max, 440px), var(--wb-section-max-height, 66.6667vh))`;
      }
    };
    this.paint = apply;
    apply();
    let lastWidth = grid.clientWidth;
    const pageHost = grid.closest<HTMLElement>(".cow-page-host");
    let lastHeight = pageHost?.clientHeight;
    const observer = new ResizeObserver(() => {
      if (!grid.isConnected || (grid.clientWidth === lastWidth && pageHost?.clientHeight === lastHeight)) return;
      lastWidth = grid.clientWidth;
      lastHeight = pageHost?.clientHeight;
      apply();
      if (!editing) window.requestAnimationFrame(() => this.fitNaturalHeights(grid, sections, elements));
    });
    observer.observe(grid.parentElement ?? grid);
    if (pageHost) observer.observe(pageHost);
    grid.addEventListener("cow-layout-destroy", () => observer.disconnect(), { once: true });
    if (!editing) window.requestAnimationFrame(() => this.fitNaturalHeights(grid, sections, elements));

    if (!editing && !this.renderCustomSection) new AddSectionButton(this.app, this.page, this.store.getAvailableModules(this.page), async (moduleType) => {
      await this.store.addSection(this.page, moduleType);
      this.onDataChanged();
    }).render(container);
  }

  private paint?: (draft?: SectionLayoutItem[]) => void;

  private fitNaturalHeights(grid: HTMLElement, sections: DashboardSectionConfig[], elements: Map<string, HTMLElement>): void {
    if (!grid.isConnected || isLayoutEditing(this.page)) return;
    const source = resolveModuleLayout(this.page, sections, this.store.getModuleLayout(this.page), grid.clientWidth);
    const naturalRows = new Map<string, number>();
    source.items.forEach((item) => {
      const element = elements.get(item.sectionId);
      if (!element) return;
      const header = element.querySelector<HTMLElement>(".cow-section-header");
      const body = element.querySelector<HTMLElement>(".cow-section-content");
      const style = getComputedStyle(element);
      const padding = Number.parseFloat(style.paddingTop) + Number.parseFloat(style.paddingBottom);
      const natural = body ? (header?.offsetHeight ?? 0) + Number.parseFloat(getComputedStyle(header ?? element).marginBottom) + body.scrollHeight + padding : element.scrollHeight;
      const minimum = Number.parseFloat(style.minHeight) || 0;
      const maximum = Number.parseFloat(style.maxHeight) || natural;
      const height = Math.min(maximum, Math.max(minimum, natural));
      const rows = Math.max(1, Math.ceil((height + GRID_CONFIG.gap) / (GRID_CONFIG.rowHeight + GRID_CONFIG.gap)));
      naturalRows.set(item.sectionId, rows);
    });
    const placed = resolveModuleLayout(this.page, sections, this.store.getModuleLayout(this.page), grid.clientWidth, undefined, naturalRows).items;
    for (const item of placed) {
      const element = elements.get(item.sectionId);
      if (element) {
        element.style.gridColumn = `${item.x + 1} / span ${item.w}`;
        element.style.gridRow = `${item.y + 1} / span ${item.h}`;
      }
    }
  }

  private async finish(): Promise<void> {
    const draft = getDraftLayout(this.page);
    if (draft) await this.store.commitModuleLayout(this.page, draft, getDraftSections(this.page));
    stopLayoutEditing();
    this.onDataChanged();
  }

  private confirmReset(): void {
    const modal = new Modal(this.app);
    modal.contentEl.createEl("h2", { text: "重置为新版默认布局？" });
    modal.contentEl.createEl("p", { text: "当前编辑中的布局会被替换。点击完成布局后才会保存。" });
    const actions = modal.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消" }).addEventListener("click", () => modal.close());
    actions.createEl("button", { text: "重置布局", cls: "mod-warning" }).addEventListener("click", () => {
      const sections = this.store.getLayoutSections(this.page);
      resetDraftLayout(this.page, createDefaultLayout(this.page, sections));
      modal.close();
      this.onDataChanged();
    });
    modal.open();
  }

  private decorateEditableSection(
    grid: HTMLElement,
    sectionEl: HTMLElement,
    section: DashboardSectionConfig,
    sections: DashboardSectionConfig[],
    elements: Map<string, HTMLElement>
  ): void {
    sectionEl.addClass("is-layout-editing");
    const header = sectionEl.querySelector<HTMLElement>(".cow-section-header");
    if (!header) return;
    const grip = document.createElement("button");
    grip.type = "button";
    grip.className = "cow-layout-grip";
    grip.title = "拖动调整位置";
    grip.setAttribute("aria-label", "拖动调整位置");
    grip.textContent = "⋮⋮";
    header.prepend(grip);

    const resize = document.createElement("button");
    resize.type = "button";
    resize.className = "cow-layout-resize-handle";
    resize.title = "调整网格尺寸";
    resize.setAttribute("aria-label", "调整网格尺寸");
    sectionEl.append(resize);
    grip.addEventListener("pointerdown", (event) => this.startPointerOperation(event, "move", grid, sectionEl, section, sections, elements));
    resize.addEventListener("pointerdown", (event) => this.startPointerOperation(event, "resize", grid, sectionEl, section, sections, elements));
  }

  private startPointerOperation(
    event: PointerEvent,
    kind: "move" | "resize",
    grid: HTMLElement,
    sectionEl: HTMLElement,
    section: DashboardSectionConfig,
    sections: DashboardSectionConfig[],
    elements: Map<string, HTMLElement>
  ): void {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    const original = structuredClone(getDraftLayout(this.page) ?? []);
    const start = original.find((item) => item.sectionId === section.id);
    if (!start) return;
    const startX = event.clientX;
    const startY = event.clientY;
    const columns = Number(grid.dataset.columns) || 12;
    const columnUnit = (grid.clientWidth + GRID_CONFIG.gap) / columns;
    const rowUnit = GRID_CONFIG.rowHeight + GRID_CONFIG.gap;
    const scale = GRID_CONFIG.columns / columns;
    const placeholder = grid.createDiv({ cls: "cow-layout-placeholder" });
    const badge = sectionEl.createSpan({ cls: "cow-layout-size-badge" });
    const scrollHost = grid.closest<HTMLElement>(".cow-page-host");
    let latest = original;
    let cancelled = false;
    let lastPointer = event;
    let scrollFrame = 0;
    sectionEl.addClass("is-layout-dragging");
    const paintPlaceholder = (item: SectionLayoutItem) => {
      const resolved = resolveModuleLayout(this.page, sections, { ...this.store.getModuleLayout(this.page), mode: "custom", items: latest }, grid.clientWidth);
      const target = resolved.items.find((entry) => entry.sectionId === item.sectionId);
      if (!target) return;
      placeholder.style.gridColumn = `${target.x + 1} / span ${target.w}`;
      placeholder.style.gridRow = `${target.y + 1} / span ${target.h}`;
      badge.textContent = `${item.w} × ${item.h}`;
    };
    const onMove = (move: PointerEvent) => {
      lastPointer = move;
      if (kind === "move") {
        const x = Math.max(0, Math.min(12 - start.w, start.x + Math.round(((move.clientX - startX) / columnUnit) * scale)));
        const y = Math.max(0, start.y + Math.round((move.clientY - startY + (scrollHost?.scrollTop ?? 0) - scrollStart) / rowUnit));
        latest = moveLayoutItem(original, section.id, x, y);
      } else {
        const min = sectionMinimum(section);
        const ceiling = Number.parseFloat(getComputedStyle(grid).getPropertyValue("--wb-section-max-height")) || (grid.closest<HTMLElement>(".cow-page-host")?.clientHeight ?? 900) * 2 / 3;
        const maxH = Math.max(min.h, Math.floor((ceiling + GRID_CONFIG.gap) / rowUnit));
        const w = Math.max(min.w, Math.min(12 - start.x, start.w + Math.round(((move.clientX - startX) / columnUnit) * scale)));
        const h = Math.max(min.h, Math.min(maxH, start.h + Math.round((move.clientY - startY) / rowUnit)));
        latest = resizeLayoutItem(original, section, w, h);
      }
      this.paint?.(latest);
      paintPlaceholder(latest.find((item) => item.sectionId === section.id) ?? start);
    };
    const scrollStart = scrollHost?.scrollTop ?? 0;
    const autoScroll = () => {
      if (scrollHost) {
        const box = scrollHost.getBoundingClientRect();
        const amount = lastPointer.clientY < box.top + 36 ? -8 : lastPointer.clientY > box.bottom - 36 ? 8 : 0;
        if (amount) {
          const before = scrollHost.scrollTop;
          scrollHost.scrollTop += amount;
          if (scrollHost.scrollTop !== before) onMove(lastPointer);
        }
      }
      scrollFrame = window.requestAnimationFrame(autoScroll);
    };
    const cleanup = () => {
      window.cancelAnimationFrame(scrollFrame);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onEnd);
      document.removeEventListener("keydown", onKey);
      grid.removeEventListener("cow-layout-destroy", onDestroy);
      sectionEl.removeClass("is-layout-dragging");
      placeholder.remove();
      badge.remove();
      if (cancelled) this.paint?.(original);
    };
    const onEnd = () => {
      if (!cancelled) updateDraftLayout(this.page, latest);
      cleanup();
    };
    const onKey = (key: KeyboardEvent) => {
      if (key.key !== "Escape") return;
      key.preventDefault();
      cancelled = true;
      cleanup();
    };
    const onDestroy = () => {
      cancelled = true;
      cleanup();
    };
    paintPlaceholder(start);
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onEnd);
    document.addEventListener("keydown", onKey);
    grid.addEventListener("cow-layout-destroy", onDestroy, { once: true });
    scrollFrame = window.requestAnimationFrame(autoScroll);
  }
}
