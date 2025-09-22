import { Hono } from "hono";
import { compress } from "hono/compress";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { registerAPIDoc } from "./routes/doc.js";
import { registerHealthRoutes } from "./routes/health.js";
import { registerHolidayRoutes } from "./routes/holidays.js";
import { registerUpcomingRoutes } from "./routes/upcoming.js";
import { getLocalizedMessage } from "./helpers/messages.js";
import { createResponse } from "./helpers/response.js";
import { getRequestLang } from "./middleware/get-request-lang.js";
import { errorHandler, rateLimit } from "./middleware/index.js";

const app = new Hono();

// Middlewares
app.use("*", secureHeaders());
app.use("*", compress());
app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "OPTIONS"],
  })
);
app.use(rateLimit);
app.use(logger());
app.onError(errorHandler);

// Routes
registerAPIDoc(app);
registerHealthRoutes(app);
registerHolidayRoutes(app);
registerUpcomingRoutes(app);

app.get("*", (c) => {
  const lang = getRequestLang(c);
  return c.json(
    createResponse("error", null, getLocalizedMessage(lang, "notFound")),
    404
  );
});

export default app;
