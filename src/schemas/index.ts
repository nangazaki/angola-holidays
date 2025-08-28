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
