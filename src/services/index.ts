import { getAllHolidaysByYear } from "../data/index.js";
import { formatResponse } from "../helpers/format-response.js";
import { getDateWithAngolaUTC } from "../helpers/get-date-with-angola-utc.js";
import type { Language } from "../types/index.js";

export class HolidaysService {
  private holidays: any[] = [];

  constructor(private readonly lang: Language) {}

  setHolidays(year = new Date().getFullYear()) {
    this.holidays = getAllHolidaysByYear(year);
  }

  getHolidays(year = new Date().getFullYear()): any[] {
    this.setHolidays(year);
    return formatResponse(this.holidays, this.lang);
  }

  getByRange(startDate: Date, endDate: Date) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      throw new Error("A data inicial deve ser anterior à data final");
    }

    const startYear = start.getFullYear();
    const endYear = end.getFullYear();
    const allHolidays: any[] = [];

    for (let year = startYear; year <= endYear; year++) {
      allHolidays.push(...getAllHolidaysByYear(year));
    }

    const holidaysInRange = allHolidays.filter((holiday) => {
      const hDate = new Date(holiday.date);
      return hDate >= start && hDate <= end;
    });

    return formatResponse(holidaysInRange, this.lang);
  }

  isHoliday(date: Date) {
    this.setHolidays(date.getFullYear());

    const hasHolidayWithTheDate = this.holidays.some((holiday) => {
      const hDate = new Date(holiday.date);
      return (
        hDate.getFullYear() === date.getFullYear() &&
        hDate.getMonth() === date.getMonth() &&
        hDate.getDate() === date.getDate()
      );
    });

    return {
      date: getDateWithAngolaUTC(date),
      isHoliday: hasHolidayWithTheDate,
    };
  }

  getUpcoming(days: number = 30): any[] {
    const today = new Date();
    const limit = new Date();
    limit.setDate(today.getDate() + days);

    this.setHolidays();

    const upcomingHolidays = this.holidays.filter((holiday) => {
      const hDate = new Date(holiday.date);
      return hDate >= today && hDate <= limit;
    });

    return formatResponse(upcomingHolidays, this.lang);
  }
}
