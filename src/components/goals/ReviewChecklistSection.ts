import { App, setIcon } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";
import { openReviewItemModal } from "./ReviewModals";

export class ReviewChecklistSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly onDataChanged: () => void
  ) {}

  render(container: HTMLElement): void {
    const list = container.createDiv({ cls: "cow-data-list cow-review-list" });
    this.store.getReviewItems()
      .slice()
      .sort((left, right) => right.date.localeCompare(left.date))
      .forEach((review) => {
        const row = list.createDiv({ cls: `cow-data-card cow-review-item ${review.status === "done" ? "is-complete" : ""}` });
        const head = row.createDiv({ cls: "cow-list-item-head" });
        const title = head.createDiv({ cls: "cow-review-item-title" });
        title.createEl("time", { text: review.date });
        title.createEl("strong", { text: review.status === "done" ? `✓ ${review.title}` : review.title });
        const actions = head.createDiv({ cls: "cow-list-item-actions" });
        const toggle = actions.createEl("button", { attr: { type: "button", "aria-label": "切换复盘状态" } });
        setIcon(toggle, review.status === "done" ? "rotate-ccw" : "check");
        toggle.addEventListener("click", async () => {
          await this.store.updateReviewItem(review.id, { status: review.status === "done" ? "todo" : "done" });
          this.onDataChanged();
        });
        const edit = actions.createEl("button", { attr: { type: "button", "aria-label": "编辑复盘" } });
        setIcon(edit, "pencil");
        edit.addEventListener("click", () => openReviewItemModal(this.app, this.store, this.onDataChanged, review));
        const remove = actions.createEl("button", { attr: { type: "button", "aria-label": "删除复盘" } });
        setIcon(remove, "trash-2");
        remove.addEventListener("click", async () => {
          await this.store.deleteReviewItem(review.id);
          this.onDataChanged();
        });
        row.createEl("p", { text: review.content || "还没有记录复盘内容。" });
      });

    const add = container.createEl("button", { cls: "cow-bottom-add-button", attr: { type: "button" } });
    setIcon(add.createSpan(), "plus");
    add.createSpan({ text: "添加" });
    add.addEventListener("click", () => openReviewItemModal(this.app, this.store, this.onDataChanged));
  }
}
