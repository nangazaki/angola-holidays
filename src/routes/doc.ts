import type { Hono } from "hono";

export function registerAPIDoc(app: Hono) {
  app.get("/", (c) => {
    return c.json({
      name: "Angola Holidays API",
      version: "0.0.1",
      description:
        "API para consultar feriados nacionais de Angola | API to query Angola's national holidays",
      documentation: "https://github.com/nangazaki/angola-holidays#readme",
      source: "https://github.com/nangazaki/angola-holidays",
      license: "MIT",
      author: "Nangazaki",
      endpoints: [
        {
          path: "/health",
          method: "GET",
          description: "Health check endpoint",
        },
        {
          path: "/holidays",
          method: "GET",
          description:
            "Lista os feriados de um determinado ano | List holidays for a specific year",
          queryParams: {
            year: {
              type: "number",
              required: false,
              default: "current year",
              example: 2025,
              description: "Ano desejado | Desired year",
            },
            lang: {
              type: "string",
              required: false,
              default: "pt",
              options: ["pt", "en"],
              example: "pt",
              description: "Idioma da resposta | Response language",
            },
          },
          examples: {
            basic: "/holidays",
            withYear: "/holidays?year=2025",
            withLang: "/holidays?year=2025&lang=en",
          },
        },
        {
          path: "/upcoming",
          method: "GET",
          description: "Lista os próximos feriados | List upcoming holidays",
          queryParams: {
            days: {
              type: "number",
              required: false,
              default: 30,
              min: 1,
              max: 365,
              example: 30,
              description:
                "Número de dias a partir de hoje | Number of days from today",
            },
            lang: {
              type: "string",
              required: false,
              default: "pt",
              options: ["pt", "en"],
              example: "pt",
              description: "Idioma da resposta | Response language",
            },
          },
          examples: {
            basic: "/upcoming",
            withDays: "/upcoming?days=60",
            withLang: "/upcoming?days=30&lang=en",
          },
        },
        {
          path: "/holidays/check",
          method: "GET",
          description:
            "Verifica se uma data é feriado | Check if a date is a holiday",
          queryParams: {
            date: {
              type: "string",
              format: "YYYY-MM-DD",
              required: true,
              example: "2025-04-04",
              description: "Data no formato ISO | Date in ISO format",
            },
            lang: {
              type: "string",
              required: false,
              default: "pt",
              options: ["pt", "en"],
              example: "pt",
              description: "Idioma da resposta | Response language",
            },
          },
          examples: {
            basic: "/holidays/check?date=2025-04-04",
            withLang: "/holidays/check?date=2025-04-04&lang=en",
          },
        },
      ],
      rateLimit: {
        windowMs: "10 minutes",
        maxRequests: 100,
        headers: [
          "X-RateLimit-Limit",
          "X-RateLimit-Remaining",
          "X-RateLimit-Reset",
        ],
      },
    });
  });
}
