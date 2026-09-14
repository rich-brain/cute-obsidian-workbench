import type { DashboardStore } from "../../core/DashboardStore";

export class ResearchTimelineSection {
  constructor(private readonly store: DashboardStore) {}

  render(container: HTMLElement): void {
    const list = container.createDiv({ cls: "cow-timeline" });
    this.store.getResearchDeadlines().forEach((ddl) => {
      const item = list.createDiv({ cls: `cow-timeline-item priority-${ddl.priority}` });
      item.createEl("time", { text: ddl.date });
      item.createEl("strong", { text: ddl.title });
      item.createSpan({ text: ddl.type });
    });
  }
}
