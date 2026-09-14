import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { KeyResultModal } from "./GoalModals";

export class MonthlyKeyResultsSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const add = container.createEl("button", { cls: "cow-small-action", attr: { type: "button" } });
    setIcon(add.createSpan(), "plus");
    add.createSpan({ text: "新增 KR" });
    add.addEventListener("click", () => {
      new KeyResultModal(this.app, this.store.getObjectives(), async (kr) => {
        await this.store.addKeyResult(kr);
        this.onDataChanged();
      }).open();
    });

    const list = container.createEl("ul", { cls: "cow-focus-list" });
    this.store.getKeyResults().forEach((kr) => {
      const item = list.createEl("li");
      const checkbox = item.createEl("input", { type: "checkbox" });
      checkbox.checked = kr.completed;
      checkbox.addEventListener("change", async () => {
        await this.store.toggleKeyResult(kr.id);
        this.onDataChanged();
      });
      item.createSpan({ cls: "cow-pill is-purple", text: `${kr.progress}%` });
      item.createSpan({ cls: kr.completed ? "is-complete" : "", text: kr.title });
    });
  }
}
