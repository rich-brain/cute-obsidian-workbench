export class AiReadingReviewSection {
  render(container: HTMLElement): void {
    const card = container.createDiv({ cls: "cow-ai-review" });
    card.createEl("strong", { text: "AI 阅读复盘准备中" });
    card.createEl("p", { text: "后续会根据阅读笔记、摘录和进度生成阶段总结、主题脉络和下一步阅读建议。" });
  }
}
