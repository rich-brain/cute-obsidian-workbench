import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { openBodyMeasurementModal } from "../DashboardEditModals";

export class BodyMeasurementsSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const measurements = this.store.getBodyMeasurements();
    const latest = measurements[measurements.length - 1];
    const action = container.createEl("button", { cls: "cow-small-action", attr: { type: "button" } });
    setIcon(action.createSpan(), "plus");
    action.createSpan({ text: "记录数据" });
    action.addEventListener("click", () => {
      openBodyMeasurementModal(this.app, async (values) => {
        await this.store.addBodyMeasurement(values);
        this.onDataChanged();
      });
    });
    const grid = container.createDiv({ cls: "cow-reading-stat-grid" });
    [
      ["体重", `${latest?.weight ?? 0}kg`],
      ["BMI", `${latest?.bmi ?? 0}`],
      ["腰围", `${latest?.waist ?? 0}cm`],
      ["臀围", `${latest?.hip ?? 0}cm`]
    ].forEach(([label, value]) => {
      const item = grid.createDiv();
      item.createEl("strong", { text: value });
      item.createSpan({ text: label });
    });
    const list = container.createDiv({ cls: "cow-data-list cow-compact-list" });
    measurements.slice(-3).reverse().forEach((item) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      const head = row.createDiv({ cls: "cow-list-item-head" });
      const body = head.createDiv();
      body.createEl("strong", { text: item.date });
      body.createDiv({ cls: "cow-meta-line" }).createSpan({ text: `${item.weight}kg · BMI ${item.bmi} · 腰围 ${item.waist}cm` });
      const actions = head.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑记录" } });
      setIcon(edit, "pencil");
      edit.addEventListener("click", () => {
        openBodyMeasurementModal(this.app, async (values) => {
          await this.store.updateBodyMeasurement(item.id ?? item.date, values);
          this.onDataChanged();
        }, item);
      });
    });
  }
}
