export class HabitTracker {
  render(container: HTMLElement): void {
    const rows = ["阅读", "健身", "理财", "写作", "学习"];
    const table = container.createDiv({ cls: "cow-habit-table" });
    const header = table.createDiv({ cls: "cow-habit-row cow-habit-header" });
    header.createSpan();
    ["一", "二", "三", "四", "五", "六", "日"].forEach((day) => header.createSpan({ text: day }));

    rows.forEach((row, rowIndex) => {
      const line = table.createDiv({ cls: "cow-habit-row" });
      line.createSpan({ text: row });
      for (let index = 0; index < 7; index += 1) {
        line.createSpan({ cls: index <= (rowIndex + 3) % 7 ? "is-done" : "" });
      }
    });
  }
}
