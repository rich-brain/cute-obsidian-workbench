import type { App } from "obsidian";
import type { DashboardPage, DashboardSectionConfig } from "../types/dashboard";
import { DashboardSection } from "./DashboardSection";
import { AddSectionButton } from "./AddSectionButton";
import type { DashboardStore } from "../core/DashboardStore";

export class DashboardGrid {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly page: DashboardPage,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const grid = container.createDiv({ cls: "cow-dashboard-grid" });
    const sections = this.store.getSectionsForPage(this.page);

    sections.forEach((section: DashboardSectionConfig) => {
      new DashboardSection(this.app, this.store, section, async (removedSection) => {
        await this.store.removeSection(removedSection.id);
        this.onDataChanged();
      }, this.onDataChanged).render(grid);
    });

    new AddSectionButton(this.app, this.page, this.store.getAvailableModules(this.page), async (moduleType) => {
      await this.store.addSection(this.page, moduleType);
      this.onDataChanged();
    }).render(container);
  }
}
