export class ReviewChecklistSection {
  render(container: HTMLElement): void {
    const list = container.createEl("ul", { cls: "cow-focus-list" });
    ["本周最重要的目标推进了吗？", "哪些任务只是忙碌感？", "下周要砍掉什么？", "需要谁的帮助或反馈？"].forEach((item) => {
      const row = list.createEl("li");
      row.createEl("input", { type: "checkbox" });
      row.createSpan({ text: item });
    });
  }
}
