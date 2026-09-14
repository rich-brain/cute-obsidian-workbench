import type { DashboardStore } from "../../core/DashboardStore";

export class ResearchMemoSection {
  constructor(private readonly store: DashboardStore) {}

  render(container: HTMLElement): void {
    const list = container.createEl("ul", { cls: "cow-memo-list" });
    this.store.getResearchMemos().forEach((memo) => list.createEl("li", { text: memo }));
  }
}
