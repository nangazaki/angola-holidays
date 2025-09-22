import type { Language } from "../types/index.js";

export const getLocalizedMessage = (lang: Language, key: string) => {
  const messages: Record<Language, Record<string, string>> = {
    pt: {
      invalidDate: "Data inválida. Use o formato YYYY-MM-DD",
      invalidDays: "Número de dias inválido. Use um valor entre 1 e 365",
      invalidYear: "Ano inválido",
      invalidParams: "Parâmetros de consulta inválidos",
      notFound: "Recurso não encontrado",
      tooManyRequests: "Muitas requisições, tente novamente em alguns minutos", // Adicionado
    },
    en: {
      invalidDate: "Invalid date. Use YYYY-MM-DD format",
      invalidDays: "Invalid number of days. Use a value between 1 and 365",
      invalidYear: "Invalid year",
      invalidParams: "Invalid query parameters",
      notFound: "Resource not found",
      tooManyRequests: "Too many requests, please try again in a few minutes", // Adicionado
    },
  };

  // Garante que a chave existe em 'pt' como fallback
  return messages[lang]?.[key] || messages.pt[key] || "Unknown error";
};
