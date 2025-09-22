import { rateLimiter } from "hono-rate-limiter";

export const rateLimit = rateLimiter({
  windowMs: 10 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-6",
  keyGenerator: (ctx) =>
    ctx.req.header("x-forwarded-for") ||
    ctx.req.header("x-real-ip") ||
    ctx.req.header("cf-connecting-ip") ||
    "anonymous",
  message: {
    status: "error",
    message: "Too many requests, please try again later",
    retryAfter: "10 minutes",
  },
});
