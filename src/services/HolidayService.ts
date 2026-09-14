import { CalendarService } from "./CalendarService";

export class HolidayService {
  private readonly calendar = new CalendarService();
  private readonly holidays: Record<string, string> = {
    "01-01": "元旦",
    "02-14": "情人节",
    "05-01": "劳动节",
    "09-10": "教师节",
    "10-01": "国庆节",
    "12-25": "圣诞节"
  };

  getHoliday(date: Date): string | null {
    const key = this.calendar.getDateKey(date).slice(5);
    return this.holidays[key] ?? null;
  }
}
