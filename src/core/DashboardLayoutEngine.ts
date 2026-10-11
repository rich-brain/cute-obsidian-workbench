import type { DashboardPage, DashboardSectionConfig, ModuleLayoutConfig, SectionLayoutItem } from "../types/dashboard";

export const GRID_CONFIG = { columns: 12, rowHeight: 40, gap: 16 } as const;

export const TASK_LAYOUT_SECTIONS: DashboardSectionConfig[] = [
  ["task-quick-add", "快速添加任务", 10, "full"],
  ["task-today", "今日任务", 20, "lg"],
  ["task-inbox", "任务收集箱", 30, "sm"],
  ["task-stats", "任务统计", 40, "sm"],
  ["task-week", "本周计划", 50, "full"],
  ["task-board", "任务看板", 60, "full"],
  ["task-projects", "项目与任务组", 70, "lg"],
  ["task-recurring", "周期任务", 80, "md"]
].map(([type, title, order, width]) => ({
  id: String(type), page: "tasks", type: String(type), title: String(title),
  order: Number(order), enabled: true, width: width as DashboardSectionConfig["width"], height: "md"
}));

export interface ResolvedModuleLayout {
  columns: number;
  items: SectionLayoutItem[];
}

const SUMMARY_TYPES = new Set(["weekly-completion", "pending-tasks", "today-focus-stat", "checkin-streak", "enabled-modules-overview"]);
const WIDE_TYPES = new Set(["monthly-calendar", "month-calendar", "habit-overview", "reading-queue", "bookshelf", "reading-heatmap", "fitness-stats", "income-expense-trend", "priority-matrix", "home-layout-manager", "section-manager", "research-checkin", "reading-checkin", "fitness-checkin", "finance-checkin", "goals-checkin"]);
const FULL_TYPES = new Set(["contribution-heatmap"]);

type Geometry = readonly [x: number, y: number, w: number, h: number];

// Default placements are keyed by the stable Section type; user-created Sections
// are appended below these placements without changing saved custom layouts.
const DEFAULT_GEOMETRY: Partial<Record<DashboardPage, Record<string, Geometry>>> = {
  overview: {
    "weekly-completion": [0, 0, 3, 4], "pending-tasks": [3, 0, 3, 4],
    "today-focus-stat": [6, 0, 3, 4], "checkin-streak": [9, 0, 3, 4],
    "monthly-calendar": [0, 4, 6, 10], "today-focus": [6, 4, 6, 10],
    "habit-overview": [0, 14, 6, 10], "recent-notes": [6, 14, 6, 5],
    "monthly-progress": [6, 19, 6, 5],
    "quick-actions": [0, 24, 4, 7], "contribution-heatmap": [4, 24, 8, 7]
  },
  research: {
    "reading-queue": [0, 0, 8, 11], "research-projects": [8, 0, 4, 11],
    "experiment-plan": [0, 11, 4, 9], "literature-notes": [4, 11, 4, 9],
    "experiment-records": [8, 11, 4, 9],
    "research-timeline": [0, 20, 6, 9], "data-analysis-tasks": [6, 20, 6, 9],
    "paper-field-manager": [0, 29, 6, 9], "research-memo": [6, 29, 6, 9],
    "research-checkin": [0, 38, 12, 9]
  },
  reading: {
    "current-reading": [0, 0, 6, 9], "reading-plan": [6, 0, 6, 9],
    "bookshelf": [0, 9, 12, 10],
    "reading-notes": [0, 19, 6, 9], "reading-quotes": [6, 19, 6, 9],
    "wishlist-books": [0, 28, 6, 8], "reading-tag-manager": [6, 28, 6, 8],
    "reading-checkin": [0, 36, 6, 8], "finished-books": [6, 36, 6, 8],
    "reading-stats": [0, 44, 6, 9], "reading-heatmap": [6, 44, 6, 9],
    "ai-reading-review": [0, 53, 12, 7]
  },
  fitness: {
    "body-measurements": [0, 0, 4, 9], "fitness-stats": [4, 0, 8, 9],
    "fitness-goals": [0, 9, 6, 9], "workout-plan": [6, 9, 6, 9],
    "workout-log": [0, 18, 8, 10], "water-sleep-habits": [8, 18, 4, 10],
    "today-workout": [0, 28, 4, 8], "fitness-checkin": [4, 28, 4, 8],
    "health-reminders": [8, 28, 4, 8],
    "cardio-strength-plan": [0, 36, 12, 8],
    "fitness-heatmap": [0, 44, 12, 8]
  },
  finance: {
    "monthly-budget": [0, 0, 4, 8], "account-overview": [4, 0, 4, 8],
    "expense-categories": [8, 0, 4, 8],
    "income-expense-trend": [0, 8, 8, 10], "investment-watch": [8, 8, 4, 10],
    "finance-ledger": [0, 18, 8, 11], "finance-todos": [8, 18, 4, 11],
    "saving-goals": [0, 29, 6, 8], "bill-reminders": [6, 29, 6, 8],
    "finance-checkin": [0, 37, 6, 8], "expense-heatmap": [6, 37, 6, 8]
  },
  tasks: {
    "task-quick-add": [0, 0, 12, 4],
    "task-today": [0, 4, 8, 10], "task-stats": [8, 4, 4, 5],
    "task-inbox": [8, 9, 4, 5],
    "task-week": [0, 14, 12, 9], "task-board": [0, 23, 12, 10],
    "task-projects": [0, 33, 6, 9], "task-recurring": [6, 33, 6, 9]
  },
  goals: {
    "yearly-goals": [0, 0, 8, 10], "long-term-progress": [8, 0, 4, 10],
    "quarterly-okr": [0, 10, 6, 9], "monthly-key-results": [6, 10, 6, 9],
    "goal-breakdown": [0, 19, 8, 11], "milestone-timeline": [8, 19, 4, 11],
    "priority-matrix": [0, 30, 12, 10],
    "review-checklist": [0, 40, 4, 8], "risks-blockers": [4, 40, 4, 8],
    "goals-checkin": [8, 40, 4, 8]
  },
  modules: {
    "section-manager": [0, 0, 6, 10], "home-layout-manager": [6, 0, 6, 10],
    "enabled-modules-overview": [0, 10, 4, 8],
    "banner-background-settings": [4, 10, 4, 8], "calendar-widget-settings": [8, 10, 4, 8],
    "apex-habit-settings": [0, 18, 4, 8], "quick-action-settings": [4, 18, 4, 8],
    "theme-color-settings": [8, 18, 4, 8], "data-source-status": [0, 26, 12, 7]
  }
};

const SECTION_MINIMUMS: Record<string, { w: number; h: number }> = {
  "reading-queue": { w: 6, h: 7 }, "research-projects": { w: 4, h: 6 },
  "paper-field-manager": { w: 6, h: 5 }, "data-analysis-tasks": { w: 6, h: 5 },
  "research-timeline": { w: 6, h: 5 }, "bookshelf": { w: 8, h: 6 },
  "current-reading": { w: 6, h: 5 }, "reading-plan": { w: 6, h: 5 },
  "reading-notes": { w: 6, h: 5 }, "reading-quotes": { w: 6, h: 5 },
  "wishlist-books": { w: 6, h: 5 }, "reading-tag-manager": { w: 6, h: 5 },
  "finished-books": { w: 6, h: 5 }, "reading-stats": { w: 6, h: 6 },
  "body-measurements": { w: 4, h: 5 }, "fitness-stats": { w: 6, h: 6 },
  "fitness-goals": { w: 6, h: 5 }, "workout-plan": { w: 6, h: 5 },
  "workout-log": { w: 6, h: 6 }, "income-expense-trend": { w: 6, h: 6 },
  "finance-ledger": { w: 6, h: 6 }, "monthly-budget": { w: 4, h: 5 },
  "account-overview": { w: 4, h: 5 }, "expense-categories": { w: 4, h: 5 },
  "yearly-goals": { w: 6, h: 6 }, "quarterly-okr": { w: 6, h: 5 },
  "monthly-key-results": { w: 6, h: 5 }, "goal-breakdown": { w: 6, h: 6 },
  "milestone-timeline": { w: 4, h: 6 }, "priority-matrix": { w: 6, h: 6 },
  "goals-checkin": { w: 4, h: 5 },
  "fitness-checkin": { w: 4, h: 5 },
  "home-layout-manager": { w: 6, h: 6 }, "section-manager": { w: 6, h: 6 },
  "task-quick-add": { w: 6, h: 3 }, "task-today": { w: 6, h: 5 },
  "task-week": { w: 8, h: 6 }, "task-board": { w: 8, h: 6 },
  "task-projects": { w: 6, h: 5 }, "task-recurring": { w: 6, h: 5 },
  "today-focus": { w: 3, h: 4 }, "monthly-progress": { w: 3, h: 4 },
  "monthly-calendar": { w: 6, h: 8 }
};

export function sectionMinimum(section: DashboardSectionConfig): { w: number; h: number } {
  if (SECTION_MINIMUMS[section.type]) return SECTION_MINIMUMS[section.type];
  if (section.type.startsWith("task-")) return { w: 3, h: 4 };
  if (SUMMARY_TYPES.has(section.type)) return { w: 3, h: 3 };
  if (WIDE_TYPES.has(section.type) || section.type.includes("calendar") || section.type.includes("heatmap")) return { w: 6, h: 6 };
  if (section.type === "today-focus" || section.type === "monthly-progress") return { w: 3, h: 4 };
  return { w: 4, h: 4 };
}

function finiteInteger(value: unknown, fallback: number): number {
  const number = Number(value);
  return Number.isFinite(number) ? Math.round(number) : fallback;
}

function defaultWidth(section: DashboardSectionConfig, page: DashboardPage): number {
  const taskWidths: Record<string, number> = {
    "task-quick-add": 12, "task-today": 6, "task-inbox": 3, "task-stats": 3,
    "task-week": 12, "task-board": 12, "task-projects": 6, "task-recurring": 6
  };
  if (taskWidths[section.type]) return taskWidths[section.type];
  if (SUMMARY_TYPES.has(section.type)) return page === "overview" ? 3 : 4;
  if (FULL_TYPES.has(section.type) || section.type === "bookshelf") return 12;
  if (section.type === "monthly-calendar") return 6;
  if (section.type === "today-focus" || section.type === "monthly-progress") return 3;
  if (WIDE_TYPES.has(section.type)) return 6;
  if (section.width === "full") return 12;
  if (section.width === "lg") return 8;
  return 4;
}

function defaultHeight(section: DashboardSectionConfig): number {
  if (section.type === "task-quick-add") return 4;
  return SUMMARY_TYPES.has(section.type) ? 5 : section.type.includes("calendar") ? 10 : 12;
}

export function sanitizeItem(section: DashboardSectionConfig, value: Partial<SectionLayoutItem>): SectionLayoutItem {
  const minimum = sectionMinimum(section);
  const w = Math.max(minimum.w, Math.min(GRID_CONFIG.columns, finiteInteger(value.w, defaultWidth(section, section.page))));
  const h = Math.max(minimum.h, Math.min(32, finiteInteger(value.h, defaultHeight(section))));
  const x = Math.max(0, Math.min(GRID_CONFIG.columns - w, finiteInteger(value.x, 0)));
  return { sectionId: section.id, x, y: Math.max(0, Math.min(512, finiteInteger(value.y, 0))), w, h };
}

export function collides(a: SectionLayoutItem, b: SectionLayoutItem): boolean {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function findSpace(item: SectionLayoutItem, placed: SectionLayoutItem[], columns: number): SectionLayoutItem {
  for (let y = Math.max(0, item.y); y < 10000; y += 1) {
    if (item.x + item.w > columns) break;
    const candidate = { ...item, y };
    if (placed.every((other) => !collides(candidate, other))) return candidate;
  }
  return { ...item, x: 0, y: placed.reduce((bottom, other) => Math.max(bottom, other.y + other.h), 0) };
}

export function compactLayout(items: SectionLayoutItem[], anchoredId?: string, columns: number = GRID_CONFIG.columns): SectionLayoutItem[] {
  const sorted = [...items].sort((a, b) => a.y - b.y || a.x - b.x || a.sectionId.localeCompare(b.sectionId));
  if (anchoredId) {
    const index = sorted.findIndex((item) => item.sectionId === anchoredId);
    if (index > 0) sorted.unshift(...sorted.splice(index, 1));
  }
  const placed: SectionLayoutItem[] = [];
  for (const item of sorted) placed.push(findSpace({ ...item, w: Math.min(columns, item.w), x: Math.min(item.x, columns - Math.min(columns, item.w)) }, placed, columns));
  // Only remove vertical gaps. Never reduce a user's width to resolve a collision.
  for (const item of placed) {
    if (item.sectionId === anchoredId) continue;
    while (item.y > 0 && placed.every((other) => other === item || !collides({ ...item, y: item.y - 1 }, other))) item.y -= 1;
  }
  return placed.sort((a, b) => a.y - b.y || a.x - b.x || a.sectionId.localeCompare(b.sectionId));
}

export function sanitizeLayout(sections: DashboardSectionConfig[], values: SectionLayoutItem[]): SectionLayoutItem[] {
  const byId = new Map(values.filter((value) => value && typeof value.sectionId === "string").map((value) => [value.sectionId, value]));
  let nextY = values.reduce((bottom, value) => Number.isFinite(value?.y) && Number.isFinite(value?.h) ? Math.max(bottom, value.y + value.h) : bottom, 0);
  const items = sections.map((section) => {
    const saved = byId.get(section.id);
    if (saved) return sanitizeItem(section, saved);
    const item = sanitizeItem(section, { x: 0, y: nextY });
    nextY += item.h;
    return item;
  });
  return compactLayout(items);
}

export function createDefaultLayout(page: DashboardPage, sections: DashboardSectionConfig[], mode: ModuleLayoutConfig["mode"] = "default"): SectionLayoutItem[] {
  const ordered = [...sections].sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
  if (mode === "default") {
    const geometry = DEFAULT_GEOMETRY[page] ?? {};
    const planned = ordered.filter((section) => geometry[section.type]);
    const extras = ordered.filter((section) => !geometry[section.type]);
    const items = planned.map((section) => {
      const [x, y, w, h] = geometry[section.type];
      return sanitizeItem(section, { x, y, w, h });
    });
    let nextY = items.reduce((bottom, item) => Math.max(bottom, item.y + item.h), 0);
    for (const section of extras) {
      const item = sanitizeItem(section, { x: 0, y: nextY });
      items.push(item);
      nextY += item.h;
    }
    return compactLayout(items);
  }
  const overviewOrder = ["weekly-completion", "pending-tasks", "today-focus-stat", "checkin-streak", "monthly-calendar", "today-focus", "monthly-progress", "habit-overview", "recent-notes", "quick-actions"];
  if (page === "overview") ordered.sort((a, b) => {
    const left = overviewOrder.indexOf(a.type);
    const right = overviewOrder.indexOf(b.type);
    return (left < 0 ? 100 + a.order : left) - (right < 0 ? 100 + b.order : right);
  });
  let cursorX = 0;
  let cursorY = 0;
  let rowHeight = 0;
  const items: SectionLayoutItem[] = [];
  for (const section of ordered) {
    const w = mode === "minimal" ? 12 : mode === "compact" ? Math.max(sectionMinimum(section).w, Math.min(12, defaultWidth(section, page) - 1)) : defaultWidth(section, page);
    const h = defaultHeight(section);
    if (cursorX + w > 12) { cursorY += rowHeight; cursorX = 0; rowHeight = 0; }
    items.push({ sectionId: section.id, x: cursorX, y: cursorY, w, h });
    cursorX += w;
    rowHeight = Math.max(rowHeight, h);
  }
  return items;
}

export function migrateLegacyLayout(sections: DashboardSectionConfig[], legacy: ModuleLayoutConfig): SectionLayoutItem[] {
  const ordered = [...sections].sort((a, b) => (legacy.sections?.[a.id]?.order ?? a.order) - (legacy.sections?.[b.id]?.order ?? b.order));
  let x = 0;
  let y = 0;
  let rowHeight = 0;
  return ordered.map((section) => {
    const old = legacy.sections?.[section.id];
    const w = Math.max(sectionMinimum(section).w, Math.min(12, finiteInteger(old?.colSpan, defaultWidth(section, section.page))));
    const h = old?.rowSpan && old.rowSpan > 1
      ? Math.max(sectionMinimum(section).h, finiteInteger(old.rowSpan, defaultHeight(section)))
      : defaultHeight(section);
    if (x + w > 12) { y += rowHeight; x = 0; rowHeight = 0; }
    const item = sanitizeItem(section, { x, y, w, h });
    x += w;
    rowHeight = Math.max(rowHeight, h);
    return item;
  });
}

export function resolveModuleLayout(
  page: DashboardPage,
  sections: DashboardSectionConfig[],
  layout: ModuleLayoutConfig,
  viewportWidth: number,
  draft?: SectionLayoutItem[],
  naturalRows?: ReadonlyMap<string, number>
): ResolvedModuleLayout {
  const desktop = sanitizeLayout(sections, draft ?? (layout.mode === "custom" ? layout.items ?? [] : createDefaultLayout(page, sections, layout.mode)));
  const withNaturalHeight = (items: SectionLayoutItem[], columns: number): ResolvedModuleLayout => ({
    columns,
    items: naturalRows ? compactLayout(items.map((item) => ({ ...item, h: Math.min(item.h, naturalRows.get(item.sectionId) ?? item.h) })), undefined, columns) : items
  });
  if (viewportWidth >= 1260) return withNaturalHeight(desktop, 12);
  if (viewportWidth < 720) {
    return withNaturalHeight(compactLayout(desktop.map((item) => ({ ...item, x: 0, w: 1 })), undefined, 1), 1);
  }
  return withNaturalHeight(compactLayout(desktop.map((item) => ({ ...item, x: Math.min(5, Math.floor(item.x / 2)), w: Math.min(6, Math.max(3, Math.ceil(item.w / 2))) })).map((item) => ({ ...item, x: Math.min(item.x, 6 - item.w) })), undefined, 6), 6);
}

export function moveLayoutItem(items: SectionLayoutItem[], sectionId: string, x: number, y: number): SectionLayoutItem[] {
  const next = items.map((item) => item.sectionId === sectionId ? { ...item, x, y } : { ...item });
  return compactLayout(next, sectionId);
}

export function resizeLayoutItem(items: SectionLayoutItem[], section: DashboardSectionConfig, w: number, h: number): SectionLayoutItem[] {
  const next = items.map((item) => item.sectionId === section.id ? sanitizeItem(section, { ...item, w, h }) : { ...item });
  return compactLayout(next, section.id);
}
