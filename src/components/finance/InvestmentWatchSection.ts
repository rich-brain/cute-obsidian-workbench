export class InvestmentWatchSection {
  render(container: HTMLElement): void {
    const list = container.createDiv({ cls: "cow-data-list" });
    [
      ["指数基金", "观察估值，不追涨"],
      ["现金仓位", "保持 3-6 个月安全垫"],
      ["学习笔记", "记录观点，不做自动交易"]
    ].forEach(([title, note]) => {
      const row = list.createDiv({ cls: "cow-data-card" });
      row.createEl("strong", { text: title });
      row.createDiv({ cls: "cow-meta-line" }).createSpan({ text: note });
    });
  }
}
