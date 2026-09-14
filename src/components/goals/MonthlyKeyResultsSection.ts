import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { KeyResultModal } from "./GoalModals";
import { CrudItemModal } from "../CrudItemModal";

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
      const actions = item.createDiv({ cls: "cow-list-item-actions" });
      const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑 KR" } });
      setIcon(edit, "pencil");
      edit.addEventListener("click", () => {
        new CrudItemModal(this.app, "编辑 KR", {
          title: kr.title,
          progress: kr.progress,
          completed: kr.completed
        }, [
          { key: "title", name: "标题" },
          { key: "progress", name: "进度", type: "number" },
          { key: "completed", name: "已完成", type: "checkbox" }
        ], async (values) => {
          await this.store.updateKeyResult(kr.id, values);
          this.onDataChanged();
        }).open();
      });
      const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除 KR" } });
      setIcon(remove, "trash-2");
      remove.addEventListener("click", async () => {
        await this.store.deleteKeyResult(kr.id);
        this.onDataChanged();
      });
    });
  }
}
