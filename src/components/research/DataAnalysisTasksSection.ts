export class DataAnalysisTasksSection {
  render(container: HTMLElement): void {
    const tasks = [
      ["scRNA-seq 数据预处理", 80, "进行中"],
      ["差异基因分析", 100, "已完成"],
      ["可视化图表生成", 30, "进行中"],
      ["论文图表整理", 50, "进行中"]
    ] as const;
    const list = container.createDiv({ cls: "cow-data-list" });
    tasks.forEach(([title, progress, status]) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: title });
      const meta = row.createDiv({ cls: "cow-meta-line" });
      meta.createSpan({ cls: "cow-status is-green", text: status });
      meta.createSpan({ text: `${progress}%` });
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: "cow-month-progress-fill is-green", attr: { style: `width: ${progress}%` } });
    });
  }
}
