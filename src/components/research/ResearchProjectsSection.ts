import { setIcon, type App } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { openResearchProjectModal } from "../SectionContentActions";
import { DeleteResearchProjectModal, ResearchProjectDetailModal } from "./ResearchProjectModals";

export class ResearchProjectsSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getResearchProjects().forEach((project) => {
      const row = list.createEl("button", { cls: "cow-data-card cow-click-card", attr: { type: "button" } });
      const head = row.createDiv({ cls: "cow-list-item-head" });
      head.createEl("strong", { text: project.title });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑项目" } });
      setIcon(edit, "pencil");
      edit.addEventListener("click", (event) => {
        event.stopPropagation();
        openResearchProjectModal(this.app, async (values) => {
          await this.store.updateResearchProject(project.id, { ...values, tags: values.tagsText.split(/[,，]/).map((tag) => tag.trim()).filter(Boolean) });
          this.onDataChanged();
        }, project);
      });
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除项目" } });
      setIcon(remove, "trash-2");
      remove.addEventListener("click", (event) => {
        event.stopPropagation();
        new DeleteResearchProjectModal(this.app, this.store, project, this.onDataChanged).open();
      });
      const meta = row.createDiv({ cls: "cow-meta-line" });
      meta.createSpan({ cls: "cow-status is-green", text: project.status });
      meta.createSpan({ text: `${project.startDate} -> ${project.deadline}` });
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: "cow-month-progress-fill is-green", attr: { style: `width: ${project.progress}%` } });
      const tags = row.createDiv({ cls: "cow-tag-row" });
      project.tags.forEach((tag) => tags.createSpan({ text: tag }));
      row.addEventListener("click", () => new ResearchProjectDetailModal(this.app, this.store, project, this.onDataChanged).open());
    });
  }
}
