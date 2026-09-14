import type { App } from "obsidian";
import type { DashboardPage, DashboardPageDefinition } from "../types/dashboard";
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
    const definition = this.store.getPages().find((item) => item.id === this.page) as DashboardPageDefinition;
    const pageEl = container.createDiv({ cls: "cow-page" });
    const heading = pageEl.createDiv({ cls: "cow-page-heading" });
    heading.createEl("h1", { text: definition.label });
    heading.createEl("p", { text: definition.description });
    new DashboardGrid(this.app, this.store, this.page, this.onDataChanged).render(pageEl);
  }
}
