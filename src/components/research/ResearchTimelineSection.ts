import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { openDeadlineModal } from "../SectionContentActions";

export class ResearchTimelineSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const list = container.createDiv({ cls: "cow-timeline" });
    this.store.getResearchDeadlines().forEach((ddl) => {
      const item = list.createDiv({ cls: `cow-timeline-item priority-${ddl.priority}` });
      item.createEl("time", { text: ddl.date });
      item.createEl("strong", { text: ddl.title });
      item.createSpan({ text: ddl.type });
      const actions = item.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑 DDL" } });
      setIcon(edit, "pencil");
      edit.addEventListener("click", () => openDeadlineModal(this.app, async (values) => {
        await this.store.updateResearchDeadline(ddl.id, values);
        this.onDataChanged();
      }, ddl));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除 DDL" } });
      setIcon(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteResearchDeadline(ddl.id);
        this.onDataChanged();
      });
    });
  }
}
