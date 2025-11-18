import type { Hono } from "hono";
import { getRequestLang } from "../middleware/get-request-lang.js";
import {
  CheckDateIsHolidaySchema,
  GetHolidaysByRange,
  GetHolidaysSchema,
} from "../schemas/index.js";
import { createResponse } from "../helpers/response.js";
import { getLocalizedMessage } from "../helpers/messages.js";
import { HolidaysService } from "../services/index.js";
import type { Language } from "../types/index.js";

export function registerHolidayRoutes(app: Hono) {
  app.get("/holidays", (c) => {
    const lang = getRequestLang(c);
    const qYear = c.req.query("year");

    const parsed = GetHolidaysSchema.safeParse({ year: qYear, lang });
    if (!parsed.success) {
      return c.json(
        createResponse(
          "error",
          null,
          getLocalizedMessage(lang, "invalidParams")
        ),
        400
      );
    }

    const { year } = parsed.data;
    const service = new HolidaysService(lang as Language);
    const holidays = service.getHolidays(year);

    return c.json(
      createResponse("success", { year, count: holidays.length, holidays })
    );
  });

  app.get("/holidays-by-range", (c) => {
    const lang = getRequestLang(c);
    const qStart = c.req.query("startDate");
    const qEnd = c.req.query("endDate");

    if (!qStart || !qEnd) {
      return c.json(
        createResponse(
          "error",
          {
            errors: "d",
          },
          getLocalizedMessage(lang, "invalidDate")
        ),
        400
      );
    }

    const parsed = GetHolidaysByRange.safeParse({
      startDate: qStart,
      endDate: qEnd,
    });
    if (!parsed.success) {
      return c.json(
        createResponse(
          "error",
          {
            errors: parsed.error?.issues.map((issue: any) => ({
              field: issue.path.join("."),
              message: issue.message,
            })),
          },
          getLocalizedMessage(lang, "invalidDate")
        ),
        400
      );
    }

    const { startDate, endDate } = parsed.data;
    const service = new HolidaysService(lang as Language);
    const result = service.getByRange(startDate, endDate);

    return c.json(createResponse("success", { ...result }));
  });

  app.get("/holidays/check", (c) => {
    const lang = getRequestLang(c);
    const qDate = c.req.query("date");

    if (!qDate) {
      return c.json(
        createResponse("error", null, getLocalizedMessage(lang, "invalidDate")),
        400
      );
    }

    const parsed = CheckDateIsHolidaySchema.safeParse({ lang, date: qDate });
    if (!parsed.success) {
      return c.json(
        createResponse(
          "error",
          {
            errors: parsed.error.issues.map((issue: any) => ({
              field: issue.path.join("."),
              message: issue.message,
            })),
          },
          getLocalizedMessage(lang, "invalidDate")
        ),
        400
      );
    }

    const { date: parsedDate } = parsed.data;
    const service = new HolidaysService(lang as Language);
    const result = service.isHoliday(parsedDate);

    return c.json(createResponse("success", { ...result }));
  });
}
