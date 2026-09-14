import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { openObjectiveModal } from "../SectionContentActions";

export class QuarterlyOkrSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getObjectives().forEach((objective) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      const head = row.createDiv({ cls: "cow-list-item-head" });
      head.createEl("strong", { text: objective.title });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑 OKR" } });
      setIcon(edit, "pencil");
      edit.addEventListener("click", () => openObjectiveModal(this.app, async (values) => {
        await this.store.updateObjective(objective.id, values);
        this.onDataChanged();
      }, objective));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除 OKR" } });
      setIcon(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteObjective(objective.id);
        this.onDataChanged();
      });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${objective.quarter} · ${objective.progress}%` });
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: "cow-month-progress-fill is-pink", attr: { style: `width: ${objective.progress}%` } });
    });
  }
}
