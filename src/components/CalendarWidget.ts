export class CalendarWidget {
  render(container: HTMLElement): void {
    const now = new Date();
    const month = container.createDiv({ cls: "cow-calendar-widget" });
    month.createEl("h4", { text: `${now.getFullYear()}年${now.getMonth() + 1}月` });

    const grid = month.createDiv({ cls: "cow-calendar-widget-grid" });
    ["一", "二", "三", "四", "五", "六", "日"].forEach((weekday) => {
      grid.createSpan({ cls: "cow-weekday", text: weekday });
    });

    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const mondayBasedOffset = (firstDay.getDay() + 6) % 7;
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    for (let index = 0; index < mondayBasedOffset; index += 1) {
      grid.createSpan({ cls: "cow-empty-day" });
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      grid.createSpan({
        cls: `cow-day ${day === now.getDate() ? "is-today" : ""}`,
        text: String(day)
      });
    }
  }
}
