import type { App } from "obsidian";
import type { DashboardPage } from "../types/dashboard";
import type { DashboardStore } from "../core/DashboardStore";
import { DashboardGrid } from "../components/DashboardGrid";

export class BaseDashboardPage {
  constructor(
    protected readonly app: App,
    protected readonly store: DashboardStore,
    protected readonly page: DashboardPage,
    protected readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const pageEl = container.createDiv({ cls: `cow-page cow-module-page cow-page-${this.page}` });
    new DashboardGrid(this.app, this.store, this.page, this.onDataChanged).render(pageEl);
  }
}
