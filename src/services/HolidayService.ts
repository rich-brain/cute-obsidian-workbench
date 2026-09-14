import { CalendarService } from "./CalendarService";

export interface HolidayInfo {
  name: string;
  region: "CN" | "Global";
}

const FIXED_HOLIDAYS: Record<string, HolidayInfo[]> = {
  "01-01": [
    { name: "元旦", region: "CN" },
    { name: "New Year's Day", region: "Global" }
  ],
  "02-14": [{ name: "Valentine's Day", region: "Global" }],
  "04-01": [{ name: "April Fools' Day", region: "Global" }],
  "05-01": [{ name: "劳动节", region: "CN" }],
  "09-10": [{ name: "教师节", region: "CN" }],
  "10-01": [{ name: "国庆节", region: "CN" }],
  "10-31": [{ name: "Halloween", region: "Global" }],
  "12-25": [{ name: "Christmas", region: "Global" }]
};

const CHINESE_LUNAR_HOLIDAYS: Record<number, Record<string, string>> = {
  2024: {
    "02-10": "春节",
    "02-24": "元宵节",
    "04-04": "清明节",
    "06-10": "端午节",
    "09-17": "中秋节"
  },
  2025: {
    "01-29": "春节",
    "02-12": "元宵节",
    "04-04": "清明节",
    "05-31": "端午节",
    "10-06": "中秋节"
  },
  2026: {
    "02-17": "春节",
    "03-03": "元宵节",
    "04-05": "清明节",
    "06-19": "端午节",
    "09-25": "中秋节"
  },
  2027: {
    "02-06": "春节",
    "02-20": "元宵节",
    "04-05": "清明节",
    "06-09": "端午节",
    "09-15": "中秋节"
  },
  2028: {
    "01-26": "春节",
    "02-09": "元宵节",
    "04-04": "清明节",
    "05-28": "端午节",
    "10-03": "中秋节"
  },
  2029: {
    "02-13": "春节",
    "02-27": "元宵节",
    "04-04": "清明节",
    "06-16": "端午节",
    "09-22": "中秋节"
  },
  2030: {
    "02-03": "春节",
    "02-17": "元宵节",
    "04-05": "清明节",
    "06-05": "端午节",
    "09-12": "中秋节"
  }
};

export class HolidayService {
  private readonly calendar = new CalendarService();

  getHolidays(date: Date): HolidayInfo[] {
    const key = this.calendar.getDateKey(date).slice(5);
    const holidays = [...(FIXED_HOLIDAYS[key] ?? [])];
    const lunarHoliday = CHINESE_LUNAR_HOLIDAYS[date.getFullYear()]?.[key];
    if (lunarHoliday) {
      holidays.push({ name: lunarHoliday, region: "CN" });
    }
    if (this.isThanksgiving(date)) {
      holidays.push({ name: "Thanksgiving", region: "Global" });
    }
    return holidays;
  }

  getHoliday(date: Date): string | null {
    const names = this.getHolidays(date).map((holiday) => holiday.name);
    return names.length > 0 ? names.join(" / ") : null;
  }

  private isThanksgiving(date: Date): boolean {
    if (date.getMonth() !== 10 || date.getDay() !== 4) {
      return false;
    }
    const day = date.getDate();
    return day >= 22 && day <= 28;
  }
}
