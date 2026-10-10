import type { DashboardStore } from "../core/DashboardStore";
import type { DashboardPage, DashboardSectionConfig } from "../types/dashboard";

const LONG_PRESS_DELAY = 420;
const MOVE_TOLERANCE = 8;

interface SectionLayoutInteractionOptions {
  store: DashboardStore;
  page: DashboardPage;
  section: DashboardSectionConfig;
  grid: HTMLElement;
  sectionEl: HTMLElement;
  menuButton: HTMLElement;
  onDataChanged: () => void;
}

export function attachSectionLayoutInteractions(options: SectionLayoutInteractionOptions): void {
  attachLongPressDrag(options);
  attachResizeHandle(options);
}

function attachLongPressDrag(options: SectionLayoutInteractionOptions): void {
  const { grid, menuButton, sectionEl } = options;
  let timer: number | undefined;
  let pointerId: number | undefined;
  let startX = 0;
  let startY = 0;
  let dragging = false;
  let target: HTMLElement | undefined;
  let insertAfter = false;
  let suppressClick = false;

  const clearTimer = (): void => {
    if (timer !== undefined) {
      window.clearTimeout(timer);
      timer = undefined;
    }
  };

  const clearVisuals = (): void => {
    sectionEl.removeClass("is-layout-dragging");
    grid.removeClass("is-section-dragging");
    target?.removeClass("is-layout-drop-target", "is-layout-drop-after");
    target = undefined;
  };

  const finish = async (): Promise<void> => {
    clearTimer();
    if (!dragging) return;
    dragging = false;
    suppressClick = true;
    const dropTarget = target;
    const shouldInsertAfter = insertAfter;
    clearVisuals();
    if (!dropTarget || dropTarget === sectionEl) return;

    const orderedIds = Array.from(grid.querySelectorAll<HTMLElement>(":scope > .cow-section"))
      .sort((left, right) => {
        const leftRect = left.getBoundingClientRect();
        const rightRect = right.getBoundingClientRect();
        if (Math.abs(leftRect.top - rightRect.top) > 8) return leftRect.top - rightRect.top;
        return leftRect.left - rightRect.left;
      })
      .map((element) => element.dataset.sectionId)
      .filter((id): id is string => Boolean(id));
    const sourceIndex = orderedIds.indexOf(options.section.id);
    const targetId = dropTarget.dataset.sectionId;
    if (sourceIndex < 0 || !targetId) return;
    orderedIds.splice(sourceIndex, 1);
    const targetIndex = orderedIds.indexOf(targetId);
    if (targetIndex < 0) return;
    orderedIds.splice(targetIndex + (shouldInsertAfter ? 1 : 0), 0, options.section.id);
    await options.store.reorderSectionLayout(options.page, orderedIds);
    options.onDataChanged();
  };

  const onMove = (event: PointerEvent): void => {
    if (pointerId !== event.pointerId) return;
    if (!dragging) {
      if (Math.hypot(event.clientX - startX, event.clientY - startY) > MOVE_TOLERANCE) clearTimer();
      return;
    }

    const next = document.elementFromPoint(event.clientX, event.clientY)?.closest<HTMLElement>(".cow-section");
    if (!next || next.parentElement !== grid || next === sectionEl) {
      target?.removeClass("is-layout-drop-target", "is-layout-drop-after");
      target = undefined;
      return;
    }

    if (target !== next) {
      target?.removeClass("is-layout-drop-target", "is-layout-drop-after");
      target = next;
      target.addClass("is-layout-drop-target");
    }
    insertAfter = event.clientY > next.getBoundingClientRect().top + next.getBoundingClientRect().height / 2;
    target.toggleClass("is-layout-drop-after", insertAfter);
  };

  const onUp = (event: PointerEvent): void => {
    if (pointerId !== event.pointerId) return;
    pointerId = undefined;
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
    window.removeEventListener("pointercancel", onCancel);
    void finish();
  };

  const onCancel = (event: PointerEvent): void => {
    if (pointerId !== event.pointerId) return;
    pointerId = undefined;
    clearTimer();
    dragging = false;
    clearVisuals();
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
    window.removeEventListener("pointercancel", onCancel);
  };

  menuButton.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    pointerId = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;
    timer = window.setTimeout(() => {
      dragging = true;
      timer = undefined;
      sectionEl.addClass("is-layout-dragging");
      grid.addClass("is-section-dragging");
      menuButton.setAttr("aria-label", `正在拖动${options.section.title}`);
    }, LONG_PRESS_DELAY);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onCancel);
  });

  menuButton.addEventListener("click", (event) => {
    if (!suppressClick) return;
    suppressClick = false;
    event.preventDefault();
    event.stopImmediatePropagation();
  }, true);
}

function attachResizeHandle(options: SectionLayoutInteractionOptions): void {
  const handle = options.sectionEl.createDiv({
    cls: "cow-section-resize-handle",
    attr: { role: "button", tabindex: "0", "aria-label": `调整${options.section.title}大小`, title: "拖动调整宽高" }
  });
  let pointerId: number | undefined;
  let startX = 0;
  let startY = 0;
  let startCol = 1;
  let startRow = 1;
  let nextCol = 1;
  let nextRow = 1;

  const getSpan = (axis: "col" | "row"): number => {
    const layout = options.store.getModuleLayout(options.page);
    const saved = layout.sections?.[options.section.id];
    if (axis === "row") return saved?.rowSpan ?? 1;
    if (saved?.colSpan) return saved.colSpan;
    const className = Array.from(options.sectionEl.classList).find((name) => name.startsWith("wb-span-"));
    return Number(className?.replace("wb-span-", "")) || 4;
  };

  const clear = (): void => {
    options.sectionEl.removeClass("is-layout-resizing");
    options.sectionEl.removeAttribute("data-layout-size");
  };

  const onMove = (event: PointerEvent): void => {
    if (pointerId !== event.pointerId) return;
    const layout = options.store.getModuleLayout(options.page);
    const columns = layout.mode === "custom" ? layout.columns ?? 12 : 12;
    const styles = window.getComputedStyle(options.grid);
    const gap = Number.parseFloat(styles.columnGap) || 0;
    const columnSize = Math.max(1, (options.grid.getBoundingClientRect().width - gap * (columns - 1)) / columns);
    const rowSize = Math.max(96, options.sectionEl.getBoundingClientRect().height / Math.max(1, startRow));
    nextCol = Math.max(1, Math.min(columns, startCol + Math.round((event.clientX - startX) / (columnSize + gap))));
    nextRow = Math.max(1, Math.min(12, startRow + Math.round((event.clientY - startY) / rowSize)));
    options.sectionEl.style.gridColumn = `span ${nextCol}`;
    options.sectionEl.style.gridRow = `span ${nextRow}`;
    options.sectionEl.dataset.layoutSize = `${nextCol} × ${nextRow}`;
  };

  const onUp = (event: PointerEvent): void => {
    if (pointerId !== event.pointerId) return;
    pointerId = undefined;
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
    window.removeEventListener("pointercancel", onCancel);
    clear();
    void options.store.applySectionSize(options.page, options.section.id, nextCol, nextRow).then(options.onDataChanged);
  };

  const onCancel = (event: PointerEvent): void => {
    if (pointerId !== event.pointerId) return;
    pointerId = undefined;
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
    window.removeEventListener("pointercancel", onCancel);
    options.sectionEl.style.removeProperty("grid-column");
    options.sectionEl.style.removeProperty("grid-row");
    clear();
  };

  handle.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    pointerId = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;
    startCol = getSpan("col");
    startRow = getSpan("row");
    nextCol = startCol;
    nextRow = startRow;
    options.sectionEl.addClass("is-layout-resizing");
    options.sectionEl.dataset.layoutSize = `${startCol} × ${startRow}`;
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onCancel);
  });
}
