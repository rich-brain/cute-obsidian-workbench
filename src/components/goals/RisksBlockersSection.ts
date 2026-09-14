import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { RiskModal } from "./GoalModals";

export class RisksBlockersSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const add = container.createEl("button", { cls: "cow-small-action", attr: { type: "button" } });
    setIcon(add.createSpan(), "plus");
    add.createSpan({ text: "添加风险" });
    add.addEventListener("click", () => {
      new RiskModal(this.app, async (risk) => {
        await this.store.addRisk(risk);
        this.onDataChanged();
      }).open();
    });

    const list = container.createDiv({ cls: "cow-data-list" });
    this.store.getRisks().forEach((risk) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: risk.title });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ cls: `cow-status is-${risk.level === "high" ? "yellow" : "blue"}`, text: risk.level });
      row.createEl("p", { text: risk.solution });
    });
  }
}
