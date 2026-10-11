import type { DashboardPage } from "../types/dashboard";

let editingPage: DashboardPage | null = null;
const listeners = new Set<() => void>();

export function isLayoutEditing(page: DashboardPage): boolean {
  return editingPage === page;
}

export function toggleLayoutEditing(page: DashboardPage): void {
  editingPage = editingPage === page ? null : page;
  listeners.forEach((listener) => listener());
}

export function stopLayoutEditing(): void {
  if (!editingPage) return;
  editingPage = null;
  listeners.forEach((listener) => listener());
}

export function onLayoutEditingChanged(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
