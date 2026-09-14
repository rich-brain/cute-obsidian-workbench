import type { App } from "obsidian";

export class ContributionHeatmapSection {
  constructor(private readonly app: App) {}

  render(container: HTMLElement): void {
    const root = container.createDiv({ cls: "cow-contribution" });
    const counts = this.getDailyCreateCounts();

    for (let month = 0; month < 12; month += 1) {
      const monthEl = root.createDiv({ cls: "cow-contribution-month" });
      monthEl.createEl("strong", { text: `${month + 1}月` });
      const grid = monthEl.createDiv({ cls: "cow-contribution-grid" });
      const days = new Date(new Date().getFullYear(), month + 1, 0).getDate();
      for (let day = 1; day <= days; day += 1) {
        const key = `${new Date().getFullYear()}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        const count = counts.get(key) ?? 0;
        grid.createSpan({ cls: `level-${Math.min(4, count)}` });
      }
    }
  }

  private getDailyCreateCounts(): Map<string, number> {
    const counts = new Map<string, number>();
    this.app.vault.getMarkdownFiles().forEach((file) => {
      const date = new Date(file.stat.ctime);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    });
    return counts;
  }
}
