const PROGRESS_ITEMS = [
  { label: "科研", value: 70, className: "is-pink" },
  { label: "阅读", value: 60, className: "is-yellow" },
  { label: "健身", value: 40, className: "is-green" },
  { label: "理财", value: 75, className: "is-blue" },
  { label: "目标管理", value: 50, className: "is-purple" }
];

export class MonthlyProgressSection {
  render(container: HTMLElement): void {
    PROGRESS_ITEMS.forEach((item) => {
      const row = container.createDiv({ cls: "cow-month-progress-row" });
      row.createSpan({ text: item.label });
      const track = row.createDiv({ cls: "cow-month-progress-track" });
      track.createDiv({ cls: `cow-month-progress-fill ${item.className}`, attr: { style: `width: ${item.value}%` } });
      row.createSpan({ text: `${item.value}%` });
    });
  }
}
