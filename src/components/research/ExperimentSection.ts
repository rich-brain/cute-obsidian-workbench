import { App, Notice } from "obsidian";
import type { DashboardStore } from "../../core/DashboardStore";

export class ExperimentSection {
  constructor(
    private readonly app: App,
    private readonly store: DashboardStore,
    private readonly mode: "plan" | "records"
  ) {}

  render(container: HTMLElement): void {
    const items = this.mode === "plan" ? this.store.getExperimentPlans() : this.store.getExperimentRecords();
    const list = container.createDiv({ cls: "cow-data-list" });
    items.forEach((item) => {
      const button = list.createEl("button", { cls: "cow-data-card cow-click-card", attr: { type: "button" } });
      button.createEl("strong", { text: item.title });
      const meta = button.createDiv({ cls: "cow-meta-line" });
      meta.createSpan({ cls: "cow-status is-yellow", text: item.status });
      meta.createSpan({ text: item.date });
      button.addEventListener("click", () => void this.openNote(item.notePath));
    });
  }

  private async openNote(notePath?: string): Promise<void> {
    if (!notePath) {
      new Notice("这条实验记录还没有绑定 Markdown。");
      return;
    }
    const file = this.app.vault.getFileByPath(notePath);
    if (!file) {
      new Notice(`没有找到笔记：${notePath}`);
      return;
    }
    await this.app.workspace.getLeaf(false).openFile(file);
  }
}
