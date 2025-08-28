import type { Context } from "hono";
import type { Language } from "../types/index.js";

const ACCEPTED_LANGUAGES = ["pt", "en"];

export function getRequestLang(context: Context) {
  const langQuery = context.req.query("lang");

  if (langQuery && ACCEPTED_LANGUAGES.indexOf(langQuery)) {
    return langQuery as Language;
  }

  return "pt" as Language;
}
