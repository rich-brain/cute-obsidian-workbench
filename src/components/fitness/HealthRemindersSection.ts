export class HealthRemindersSection {
  render(container: HTMLElement): void {
    const list = container.createEl("ul", { cls: "cow-memo-list" });
    ["训练前热身 8 分钟。", "久坐 50 分钟后起身活动。", "力量日后补充蛋白质和睡眠。", "状态差时允许降强度，不硬扛。"].forEach((item) => {
      list.createEl("li", { text: item });
    });
  }
}
