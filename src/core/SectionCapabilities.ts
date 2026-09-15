import type { SectionCapabilities } from "../types/dashboard";

const ADDABLE_SECTION_TYPES = new Set([
  "research-projects",
  "reading-queue",
  "experiment-plan",
  "experiment-records",
  "data-analysis-tasks",
  "literature-notes",
  "research-timeline",
  "research-memo",
  "reading-plan",
  "bookshelf",
  "reading-notes",
  "reading-quotes",
  "wishlist-books",
  "workout-plan",
  "workout-log",
  "monthly-budget",
  "expense-categories",
  "account-overview",
  "income-expense-trend",
  "investment-watch",
  "saving-goals",
  "bill-reminders",
  "finance-todos",
  "yearly-goals",
  "quarterly-okr",
  "monthly-key-results",
  "milestone-timeline",
  "risks-blockers",
  "today-focus"
]);

export function getSectionCapabilities(sectionType: string): SectionCapabilities {
  const canAdd = ADDABLE_SECTION_TYPES.has(sectionType);
  return {
    canAdd,
    canEdit: canAdd,
    canDeleteItems: canAdd,
    canOpenStats: sectionType === "habit-overview" || sectionType === "monthly-progress" || sectionType === "today-focus",
    canManage: canAdd
  };
}
