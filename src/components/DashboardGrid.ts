import type { App } from "obsidian";
import type { DashboardPage, DashboardSectionConfig } from "../types/dashboard";
import { DashboardSection } from "./DashboardSection";
import { AddSectionButton } from "./AddSectionButton";
import type { DashboardStore } from "../core/DashboardStore";
import { isLayoutEditing } from "../core/LayoutEditState";

export class DashboardGrid {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly page: DashboardPage,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const layout = this.store.getModuleLayout(this.page);
    const grid = container.createDiv({ cls: `cow-dashboard-grid cow-dashboard-page-${this.page} cow-module-layout-${layout.mode}` });
    grid.style.setProperty("--layout-columns", String(layout.columns ?? 12));
    const sections = this.store.getSectionsForPage(this.page);

    const editing = isLayoutEditing(this.page);
    if (editing) {
      const toolbar = container.createDiv({ cls: "cow-layout-edit-toolbar" });
      toolbar.createEl("strong", { text: "编辑布局" });
      toolbar.createEl("span", { text: "拖动标题区域调整顺序，右下角调整网格尺寸。" });
      const reset = toolbar.createEl("button", { text: "重置布局", attr: { type: "button" } });
      reset.addEventListener("click", () => void this.store.setModuleLayoutMode(this.page, "default").then(this.onDataChanged));
    }

    sections.forEach((section: DashboardSectionConfig) => {
      const sectionEl = new DashboardSection(this.app, this.store, section, async (removedSection) => {
        await this.store.removeSection(removedSection.id);
        this.onDataChanged();
      }, this.onDataChanged).render(grid);
      if (editing) this.decorateEditableSection(grid, sectionEl, section.id);
    });

    new AddSectionButton(this.app, this.page, this.store.getAvailableModules(this.page), async (moduleType) => {
      await this.store.addSection(this.page, moduleType);
      this.onDataChanged();
    }).render(container);
  }

  private decorateEditableSection(grid: HTMLElement, sectionEl: HTMLElement, sectionId: string): void {
    sectionEl.addClass("is-layout-editing");
    sectionEl.draggable = true;
    const header = sectionEl.querySelector<HTMLElement>(".cow-section-header");
    if (!header) return;
    const grip = document.createElement("span");
    grip.className = "cow-layout-grip";
    grip.setAttribute("title", "拖动调整位置");
    grip.setAttribute("aria-label", "拖动调整位置");
    grip.textContent = "⋮⋮";
    header.prepend(grip);

    const resize = document.createElement("span");
    resize.className = "cow-layout-resize-handle";
    resize.setAttribute("title", "调整网格尺寸");
    resize.setAttribute("aria-label", "调整网格尺寸");
    sectionEl.append(resize);

    sectionEl.addEventListener("dragstart", (event) => {
      if (!(event.target instanceof HTMLElement) || !event.target.closest(".cow-layout-grip")) {
        event.preventDefault();
        return;
      }
      event.dataTransfer?.setData("text/plain", sectionId);
      sectionEl.addClass("is-layout-dragging");
      grid.addClass("is-layout-dragging");
    });
    sectionEl.addEventListener("dragend", () => {
      sectionEl.removeClass("is-layout-dragging");
      grid.removeClass("is-layout-dragging");
      grid.querySelectorAll(".is-layout-drop-target").forEach((item) => item.removeClass("is-layout-drop-target"));
    });
    sectionEl.addEventListener("dragover", (event) => {
      event.preventDefault();
      sectionEl.addClass("is-layout-drop-target");
    });
    sectionEl.addEventListener("dragleave", () => sectionEl.removeClass("is-layout-drop-target"));
    sectionEl.addEventListener("drop", (event) => {
      event.preventDefault();
      const sourceId = event.dataTransfer?.getData("text/plain");
      if (!sourceId || sourceId === sectionId) return;
      const ordered = Array.from(grid.querySelectorAll<HTMLElement>(".cow-section[data-section-id]"))
        .map((item) => item.dataset.sectionId ?? "")
        .filter(Boolean);
      const sourceIndex = ordered.indexOf(sourceId);
      const targetIndex = ordered.indexOf(sectionId);
      if (sourceIndex < 0 || targetIndex < 0) return;
      ordered.splice(sourceIndex, 1);
      ordered.splice(targetIndex, 0, sourceId);
      void this.store.reorderSectionLayout(this.page, ordered).then(this.onDataChanged);
    });

    resize.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const startX = event.clientX;
      const startY = event.clientY;
      const startWidth = this.store.getModuleLayout(this.page).sections?.[sectionId]?.colSpan ?? 4;
      const startHeight = this.store.getModuleLayout(this.page).sections?.[sectionId]?.rowSpan ?? 1;
      const columns = this.store.getModuleLayout(this.page).columns ?? 12;
      const gridWidth = Math.max(1, grid.getBoundingClientRect().width);
      const columnWidth = gridWidth / columns;
      const badge = document.createElement("span");
      badge.className = "cow-layout-size-badge";
      sectionEl.append(badge);
      const move = (moveEvent: PointerEvent) => {
        const colSpan = Math.max(1, Math.min(columns, startWidth + Math.round((moveEvent.clientX - startX) / columnWidth)));
        const rowSpan = Math.max(1, Math.min(12, startHeight + Math.round((moveEvent.clientY - startY) / 40)));
        badge.textContent = `${colSpan} × ${rowSpan}`;
        sectionEl.style.gridColumn = `span ${colSpan}`;
        sectionEl.style.gridRow = `span ${rowSpan}`;
        sectionEl.dataset.draftColSpan = String(colSpan);
        sectionEl.dataset.draftRowSpan = String(rowSpan);
      };
      const end = () => {
        document.removeEventListener("pointermove", move);
        document.removeEventListener("pointerup", end);
        const colSpan = Number(sectionEl.dataset.draftColSpan ?? startWidth);
        const rowSpan = Number(sectionEl.dataset.draftRowSpan ?? startHeight);
        badge.remove();
        delete sectionEl.dataset.draftColSpan;
        delete sectionEl.dataset.draftRowSpan;
        void this.store.applySectionSize(this.page, sectionId, colSpan, rowSpan).then(this.onDataChanged);
      };
      document.addEventListener("pointermove", move);
      document.addEventListener("pointerup", end, { once: true });
    });
  }
}
