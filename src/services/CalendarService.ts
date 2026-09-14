export class CalendarService {
  getToday(): Date {
    return new Date();
  }

  getDateKey(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  getMonthTitle(date: Date): string {
    return `${date.getFullYear()}年${date.getMonth() + 1}月`;
  }

  getWeekdayLabel(date: Date): string {
    return ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"][date.getDay()];
  }

  addMonths(date: Date, amount: number): Date {
    return new Date(date.getFullYear(), date.getMonth() + amount, 1);
  }

  isSameDate(left: Date, right: Date): boolean {
    return this.getDateKey(left) === this.getDateKey(right);
  }

  getMonthCells(month: Date, weekStartsOn: "sunday" | "monday" = "sunday"): Array<Date | null> {
    const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
    const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    const cells: Array<Date | null> = [];
    const offset = weekStartsOn === "monday" ? (firstDay.getDay() + 6) % 7 : firstDay.getDay();

    for (let index = 0; index < offset; index += 1) {
      cells.push(null);
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push(new Date(month.getFullYear(), month.getMonth(), day));
    }

    while (cells.length % 7 !== 0) {
      cells.push(null);
    }

    return cells;
  }
}
