import { z } from "zod";

export const GetHolidaysSchema = z.object({
  lang: z.enum(["pt", "en"]).optional().default("pt"),
  year: z
    .string()
    .regex(/^\d{4}$/, "Year must be a 4-digit number")
    .transform(Number)
    .optional()
    .refine((value) => value === undefined || value >= 1975, {
      message: "Year must be greater than or equal to 1975",
    }),
});

export const GetHolidaysByRange = z
  .object({
    startDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (expected YYYY-MM-DD)")
      .transform((value) => new Date(value))
      .refine((value) => !isNaN(value.getTime()), {
        message: "Invalid date",
      }),
    endDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (expected YYYY-MM-DD)")
      .transform((value) => new Date(value))
      .refine((value) => !isNaN(value.getTime()), {
        message: "Invalid date",
      }),
  })
  .refine((data) => data.startDate <= data.endDate, {
    message: "Start date must be before or equal to end date",
    path: ["endDate"],
  });

export const CheckDateIsHolidaySchema = z.object({
  lang: z.enum(["pt", "en"]).optional().default("pt"),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
    .transform((value) => new Date(value))
    .refine((value) => !isNaN(value.getTime()), {
      message: "Invalid date",
    }),
});

export const UpcomingHolidaysSchema = z.object({
  days: z
    .string()
    .optional()
    .default("30")
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().min(1).max(365)),
  lang: z.enum(["pt", "en"]).default("pt"),
});
