import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { getRequestLang } from "./middleware/get-request-lang.js";
import {
  CheckDateIsHolidaySchema,
  GetHolidaysSchema,
} from "./schemas/index.js";
import { HolidaysService } from "./services/index.js";
import type { Language } from "./types/index.js";

const app = new Hono();

app.use("*", cors());
app.use(logger());

app.get("/", (ctx) => {
  return ctx.json({
    name: "Angola Holidays API",
    version: "1.0.0",
    description:
      "API para consultar feriados nacionais, verificar se uma data é feriado e obter próximos feriados.",
    endpoints: [
      {
        path: "/holidays",
        method: "GET",
        description: "Lista os feriados de um determinado ano.",
        queryParams: {
          year: {
            type: "number",
            required: false,
            example: 2025,
            description:
              "Ano desejado. Se não for enviado, retorna o ano atual.",
          },
          lang: {
            type: "string",
            required: false,
            example: "pt",
            description: "Idioma da resposta (pt ou en).",
          },
        },
      },
      {
        path: "/upcoming",
        method: "GET",
        description: "Lista os próximos feriados a partir da data atual.",
        queryParams: {
          days: {
            type: "number",
            required: false,
            example: 30,
            description: "Número de dias a partir de hoje (1 a 365).",
          },
          lang: {
            type: "string",
            required: false,
            example: "pt",
            description: "Idioma da resposta (pt ou en).",
          },
        },
      },
      {
        path: "/holidays/check",
        method: "GET",
        description: "Verifica se uma data é feriado.",
        queryParams: {
          date: {
            type: "string (YYYY-MM-DD)",
            required: true,
            example: "2025-04-04",
            description: "Data no formato ISO.",
          },
          lang: {
            type: "string",
            required: false,
            example: "pt",
            description: "Idioma da resposta (pt ou en).",
          },
        },
      },
    ],
  });
});

app.get("/holidays", (ctx) => {
  const lang = getRequestLang(ctx);
  const holidays = new HolidaysService(lang as Language);

  const qYear = ctx.req.query("year");

  const parsedQuery = GetHolidaysSchema.safeParse({
    year: qYear,
    lang,
  });

  if (!parsedQuery.success) {
    ctx.status(400);
    return ctx.json({
      status: "error",
      message: "Invalid query parameters",
      errors: parsedQuery.error.issues.map((issue) => issue.message),
    });
  }

  const { year } = parsedQuery.data;

  ctx.status(200);
  return ctx.json(holidays.getHolidays(year));
});

app.get("/upcoming", (ctx) => {
  const days = ctx.req.query("days") || 30;

  const numDays = parseInt(String(days), 10);
  if (isNaN(numDays) || numDays < 1 || numDays > 365) {
    ctx.status(400);
    return ctx.json({
      error: "Número de dias inválido. Use um valor entre 1 e 365",
    });
  }

  const lang = getRequestLang(ctx);
  const holidays = new HolidaysService(lang);

  ctx.status(200);
  return ctx.json({
    days: numDays,
    fromDate: new Date().toISOString().split("T")[0],
    upcoming: holidays.getUpcoming(numDays),
  });
});

app.get("/holidays/check", (ctx) => {
  const date = ctx.req.query("date");

  if (!date) {
    ctx.status(400);
    return ctx.json({
      error: "Data inválida",
    });
  }

  const lang = getRequestLang(ctx);

  const parsedParam = CheckDateIsHolidaySchema.safeParse({ lang, date });
  if (!parsedParam.success) {
    ctx.status(400);
    return ctx.json({
      status: "error",
      message: "Invalid query parameters",
      errors: parsedParam.error.issues.map((issue) => issue.message),
    });
  }

  const { date: parsedDate } = parsedParam.data;

  const holidays = new HolidaysService(lang);

  ctx.status(200);
  return ctx.json(holidays.isHoliday(parsedDate));
});

app.get("*", (c) => {
  return c.json({ message: "Not found!" });
});

export default app;
