import type { Hono } from "hono";

export function registerHealthRoutes(app: Hono) {
  app.get("/health", (c) => {
    return c.json({
      status: "healthy",
      service: "Angola Holidays API",
      version: "1.0.0",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
    });
  });
}
