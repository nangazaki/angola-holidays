import type { Context } from "hono";

export const errorHandler = (err: Error, c: Context) => {
  console.error("API Error:", {
    error: err.message,
    stack: err.stack,
    path: c.req.path,
    method: c.req.method,
  });

  return c.json(
    {
      status: "error",
      message: "Internal server error",
      ...(process.env.NODE_ENV === "development" && {
        details: err.message,
        stack: err.stack,
      }),
    },
    500
  );
};
