import type { SectionCapabilities } from "../types/dashboard";

const ADDABLE_SECTION_TYPES = new Set([
  "research-projects",
  "experiment-plan",
  "experiment-records",
  "data-analysis-tasks",
  "literature-notes",
  "research-timeline",
  "research-memo",
  "reading-notes",
  "reading-quotes",
  "reading-tag-manager",
  "wishlist-books",
  "workout-plan",
  "workout-log",
  "account-overview",
  "saving-goals",
  "bill-reminders",
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
