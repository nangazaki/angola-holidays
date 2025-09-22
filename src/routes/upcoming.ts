import type { Hono } from "hono";
import { getRequestLang } from "../src/middleware/get-request-lang.js";
import { UpcomingHolidaysSchema } from "../src/schemas/index.js";
import { createResponse } from "../src/helpers/response.js";
import { getLocalizedMessage } from "../src/helpers/messages.js";
import { HolidaysService } from "../src/services/index.js";

export function registerUpcomingRoutes(app: Hono) {
  app.get("/upcoming", (c) => {
    const lang = getRequestLang(c);
    const qDays = c.req.query("days");

    const parsed = UpcomingHolidaysSchema.safeParse({ days: qDays, lang });
    if (!parsed.success) {
      return c.json(
        createResponse("error", null, getLocalizedMessage(lang, "invalidDays")),
        400
      );
    }

    const { days } = parsed.data;
    const service = new HolidaysService(lang);
    const fromDate = new Date().toISOString().split("T")[0];

    const upcoming = service.getUpcoming(days);

    return c.json(
      createResponse("success", {
        days,
        fromDate,
        count: upcoming.length,
        upcoming,
      })
    );
  });
}
