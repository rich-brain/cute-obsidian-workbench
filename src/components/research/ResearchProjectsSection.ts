import type { App } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";

export class ResearchProjectsSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore
  ) {}

  render(container: HTMLElement): void {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getResearchProjects().forEach((project) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: project.title });
      const meta = row.createDiv({ cls: "cow-meta-line" });
      meta.createSpan({ cls: "cow-status is-green", text: project.status });
      meta.createSpan({ text: `${project.startDate} -> ${project.deadline}` });
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: "cow-month-progress-fill is-green", attr: { style: `width: ${project.progress}%` } });
      const tags = row.createDiv({ cls: "cow-tag-row" });
      project.tags.forEach((tag) => tags.createSpan({ text: tag }));
    });
  }
}
