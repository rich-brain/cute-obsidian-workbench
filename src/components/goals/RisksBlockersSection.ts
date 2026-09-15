import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { openRiskModal } from "./GoalActionModals";

export class RisksBlockersSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getRisks().forEach((risk) => {
      const goal = risk.goalId ? this.store.getGoals().find((item) => item.id === risk.goalId) : undefined;
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: risk.title });
      const actions = row.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑风险" } });
      setIcon(edit, "pencil");
      edit.addEventListener("click", () => openRiskModal(this.app, this.store, this.onDataChanged, risk));
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除风险" } });
      setIcon(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteRisk(risk.id);
        this.onDataChanged();
      });
      const meta = row.createDiv({ cls: "cow-meta-line" });
      meta.createSpan({ cls: `cow-status is-${risk.level === "high" ? "yellow" : "blue"}`, text: risk.level });
      meta.createSpan({ text: `${risk.status ?? "todo"}${goal ? ` · ${goal.title}` : ""}${risk.discoveredDate ? ` · ${risk.discoveredDate}` : ""}` });
      row.createEl("p", { text: risk.solution });
    });
  }
}
