export class PriorityMatrixSection {
  render(container: HTMLElement): void {
    const items = [
      ["重要且紧急", "本周必须交付的关键结果"],
      ["重要不紧急", "长期目标、健康节奏、能力建设"],
      ["不重要但紧急", "临时消息、流程性处理"],
      ["不重要不紧急", "低价值消耗，尽量减少"]
    ];
    const grid = container.createDiv({ cls: "cow-priority-grid" });
    items.forEach(([title, text]) => {
      const cell = grid.createDiv();
      cell.createEl("strong", { text: title });
      cell.createSpan({ text });
    });
  }
}
