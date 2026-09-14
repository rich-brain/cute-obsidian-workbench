import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { RiskModal } from "./GoalModals";
import { CrudItemModal } from "../CrudItemModal";

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
      const actions = row.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑风险" } });
      setIcon(edit, "pencil");
      edit.addEventListener("click", () => {
        new CrudItemModal(this.app, "编辑风险", {
          title: risk.title,
          level: risk.level,
          solution: risk.solution
        }, [
          { key: "title", name: "风险" },
          { key: "level", name: "等级", type: "select", options: [{ value: "low", label: "低" }, { value: "medium", label: "中" }, { value: "high", label: "高" }] },
          { key: "solution", name: "方案", type: "textarea" }
        ], async (values) => {
          await this.store.updateRisk(risk.id, values);
          this.onDataChanged();
        }).open();
      });
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除风险" } });
      setIcon(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteRisk(risk.id);
        this.onDataChanged();
      });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ cls: `cow-status is-${risk.level === "high" ? "yellow" : "blue"}`, text: risk.level });
      row.createEl("p", { text: risk.solution });
    });
  }
}
