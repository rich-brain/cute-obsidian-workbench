import type { DashboardPage, DashboardSectionConfig, SectionLayoutItem } from "../types/dashboard";
import { sectionMinimum } from "./DashboardLayoutEngine";

interface LayoutSession {
  page: DashboardPage;
  draft: SectionLayoutItem[];
  additions: DashboardSectionConfig[];
}

let session: LayoutSession | undefined;

export function isLayoutEditing(page: DashboardPage): boolean {
  return session?.page === page;
}

export function beginLayoutEditing(page: DashboardPage, items: SectionLayoutItem[]): void {
  session = { page, draft: structuredClone(items), additions: [] };
}

export function getDraftLayout(page: DashboardPage): SectionLayoutItem[] | undefined {
  return session?.page === page ? session.draft : undefined;
}

export function updateDraftLayout(page: DashboardPage, items: SectionLayoutItem[]): void {
  if (session?.page === page) session.draft = structuredClone(items);
}

export function resetDraftLayout(page: DashboardPage, items: SectionLayoutItem[]): void {
  if (session?.page !== page) return;
  session.draft = structuredClone(items);
  session.additions = [];
}

export function getDraftSections(page: DashboardPage): DashboardSectionConfig[] {
  return session?.page === page ? session.additions : [];
}

export function addDraftSection(page: DashboardPage, section: DashboardSectionConfig): void {
  if (session?.page !== page) return;
  const minimum = sectionMinimum(section);
  const bottom = session.draft.reduce((max, item) => Math.max(max, item.y + item.h), 0);
  session.additions.push(section);
  session.draft.push({ sectionId: section.id, x: 0, y: bottom, w: Math.max(minimum.w, 4), h: Math.max(minimum.h, 8) });
}

export function removeDraftSection(page: DashboardPage, sectionId: string): boolean {
  if (session?.page !== page) return false;
  const before = session.additions.length;
  session.additions = session.additions.filter((section) => section.id !== sectionId);
  if (before === session.additions.length) return false;
  session.draft = session.draft.filter((item) => item.sectionId !== sectionId);
  return true;
}

export function stopLayoutEditing(): void {
  session = undefined;
}
