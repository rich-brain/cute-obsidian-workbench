import { App, Modal, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import type { ResearchProject } from "../../types/dashboard";
import { applyResizableModal } from "../ResizableModal";
import { openResearchProjectModal } from "../SectionContentActions";
import { ExperimentPlanDetailModal } from "./ExperimentModals";
import { PaperDetailModal, paperMetaText } from "./PaperQueueModals";

export class ResearchProjectDetailModal extends Modal {
  constructor(app: App, private readonly store: DashboardStore, private readonly project: ResearchProject, private readonly onDone: () => void) {
    super(app);
  }

  onOpen(): void {
    applyResizableModal(this, {
      className: "cute-research-detail-modal",
      width: "min(1050px, 92vw)",
      height: "min(720px, 86vh)",
      maxWidth: "96vw",
      maxHeight: "94vh",
      minWidth: "min(560px, 92vw)",
      minHeight: "min(420px, 82vh)"
    });
    this.render();
  }

  private render(): void {
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal", "cow-research-detail-modal");
    const project = this.store.getResearchProjects().find((item) => item.id === this.project.id) ?? this.project;
    const header = this.contentEl.createDiv({ cls: "cow-list-item-head" });
    header.createEl("h2", { text: project.title });
    const edit = header.createEl("button", { cls: "cow-section-add-button", attr: { type: "button" } });
    setIcon(edit.createSpan(), "pencil");
    edit.createSpan({ text: "编辑" });
    edit.addEventListener("click", () => openResearchProjectModal(this.app, this.store, async (values) => {
      await this.store.updateResearchProject(project.id, values);
      this.onDone();
      this.render();
    }, project));

    const summary = this.contentEl.createDiv({ cls: "cow-paper-detail-grid" });
    [
      ["状态", project.status],
      ["进度", `${project.progress}%`],
      ["周期", `${project.startDate} → ${project.deadline}`],
      ["标签", projectTagNames(this.store, project).join(" · ") || "无标签"]
    ].forEach(([label, value]) => {
      const card = summary.createDiv({ cls: "cow-data-card" });
      card.createEl("strong", { text: label });
      card.createSpan({ text: value });
    });
    const description = this.contentEl.createDiv({ cls: "cow-paper-linked-notes cow-project-detail-description" });
    description.createEl("h3", { text: "项目描述" });
    description.createEl("p", { text: project.description?.trim() || "暂无描述。" });

    const relations = this.contentEl.createDiv({ cls: "cow-research-relations" });
    this.renderPapers(relations, project);
    this.renderPlans(relations, project);
  }

  private renderPapers(container: HTMLElement, project: ResearchProject): void {
    const section = container.createDiv({ cls: "cow-paper-linked-notes" });
    section.createEl("h3", { text: "关联论文" });
    const papers = this.store.getResearchPapers().filter((paper) => paper.researchProjectId === project.id);
    if (papers.length === 0) {
      section.createDiv({ cls: "cow-empty-state", text: "暂无关联论文。" });
      return;
    }
    papers.forEach((paper) => {
      const row = section.createEl("button", { cls: "cow-data-card cow-click-card", attr: { type: "button" } });
      row.createEl("strong", { text: paper.title });
      row.createDiv({ cls: "cow-meta-line", text: paperMetaText(this.store, paper) });
      row.addEventListener("click", () => new PaperDetailModal(this.app, this.store, paper, this.onDone).open());
    });
  }

  private renderPlans(container: HTMLElement, project: ResearchProject): void {
    const section = container.createDiv({ cls: "cow-paper-linked-notes" });
    section.createEl("h3", { text: "关联实验计划" });
    const plans = this.store.getExperimentPlans().filter((plan) => plan.researchProjectId === project.id);
    if (plans.length === 0) {
      section.createDiv({ cls: "cow-empty-state", text: "暂无关联实验计划。" });
      return;
    }
    plans.forEach((plan) => {
      const row = section.createEl("button", { cls: "cow-data-card cow-click-card", attr: { type: "button" } });
      row.createEl("strong", { text: plan.title });
      row.createDiv({ cls: "cow-meta-line", text: `${plan.date} · ${plan.status}` });
      row.addEventListener("click", () => new ExperimentPlanDetailModal(this.app, this.store, plan, this.onDone).open());
    });
  }
}

function projectTagNames(store: DashboardStore, project: ResearchProject): string[] {
  const names = (project.tagIds ?? [])
    .map((id) => store.getPaperTags().find((tag) => tag.id === id)?.name)
    .filter(Boolean) as string[];
  return names.length > 0 ? names : project.tags;
}

export class DeleteResearchProjectModal extends Modal {
  constructor(app: App, private readonly store: DashboardStore, private readonly project: ResearchProject, private readonly onDone: () => void) {
    super(app);
  }

  onOpen(): void {
    applyResizableModal(this, {
      className: "cute-research-detail-modal",
      width: "min(620px, 90vw)",
      maxWidth: "96vw",
      maxHeight: "86vh",
      minWidth: "min(420px, 90vw)",
      minHeight: "min(260px, 70vh)"
    });
    const paperCount = this.store.getResearchPapers().filter((paper) => paper.researchProjectId === this.project.id).length;
    const planCount = this.store.getExperimentPlans().filter((plan) => plan.researchProjectId === this.project.id).length;
    this.contentEl.empty();
    this.contentEl.addClass("cow-modal");
    this.contentEl.createEl("h2", { text: "删除研究项目？" });
    this.contentEl.createEl("p", { text: `关联论文 ${paperCount} 篇，关联实验计划 ${planCount} 条。删除项目只会解除关联，不会删除论文、笔记或实验。` });
    const actions = this.contentEl.createDiv({ cls: "cow-modal-actions" });
    actions.createEl("button", { text: "取消", attr: { type: "button" } }).addEventListener("click", () => this.close());
    actions.createEl("button", { text: "解除关联并删除", cls: "mod-warning", attr: { type: "button" } }).addEventListener("click", () => void this.delete());
  }

  private async delete(): Promise<void> {
    await this.store.deleteResearchProject(this.project.id);
    this.onDone();
    this.close();
  }
}
