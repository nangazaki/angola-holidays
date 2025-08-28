import { getDateWithAngolaUTC } from "../helpers/get-date-with-angola-utc.js";
import { getMovableHolidays } from "../helpers/movable-holidays.js";
import type { Holiday } from "../types/index.js";

/**
 * Lista base de feriados fixos (sem ano).
 */
const fixedHolidaysData = [
  {
    month: 0,
    day: 1,
    name: { pt: "Ano Novo", en: "New Year" },
    type: { pt: "Feriado Nacional", en: "National Holiday" },
    description: {
      pt: "Celebra o início do novo ano.",
      en: "Celebrates the beginning of the new year.",
    },
  },
  {
    month: 1,
    day: 4,
    name: { pt: "Dia do Início da Luta Armada", en: "Armed Struggle Day" },
    type: { pt: "Feriado Nacional", en: "National Holiday" },
    description: {
      pt: "Marca o início da luta armada de libertação nacional.",
      en: "Marks the beginning of the armed struggle for national liberation.",
    },
  },
  {
    month: 2,
    day: 4,
    name: { pt: "Dia da Mulher", en: "Women's Day" },
    type: { pt: "Feriado Nacional", en: "National Holiday" },
    description: {
      pt: "Celebra as conquistas sociais, econômicas e políticas das mulheres.",
      en: "Celebrates women's social, economic, and political achievements.",
    },
  },
  {
    month: 2,
    day: 8,
    name: {
      pt: "Dia Internacional da Mulher",
      en: "International Women's Day",
    },
    type: { pt: "Feriado Nacional", en: "National Holiday" },
    description: {
      pt: "Reconhece o papel das mulheres na sociedade.",
      en: "Recognizes the role of women in society.",
    },
  },
  {
    month: 2,
    day: 23,
    name: {
      pt: "Dia da Libertação da África Austral",
      en: "Southern Africa Liberation Day",
    },
    type: { pt: "Feriado Nacional", en: "National Holiday" },
    description: {
      pt: "Comemora a libertação dos povos da África Austral.",
      en: "Commemorates the liberation of Southern African peoples.",
    },
  },
  {
    month: 3,
    day: 4,
    name: { pt: "Dia da Paz", en: "Peace Day" },
    type: { pt: "Feriado Nacional", en: "National Holiday" },
    description: {
      pt: "Celebra a paz e reconciliação nacional.",
      en: "Celebrates peace and national reconciliation.",
    },
  },
  {
    month: 4,
    day: 1,
    name: { pt: "Dia do Trabalhador", en: "Labour Day" },
    type: { pt: "Feriado Nacional", en: "National Holiday" },
    description: {
      pt: "Homenageia os trabalhadores e suas conquistas.",
      en: "Honours workers and their achievements.",
    },
  },
  {
    month: 8,
    day: 17,
    name: { pt: "Dia do Herói Nacional", en: "National Hero Day" },
    type: { pt: "Feriado Nacional", en: "National Holiday" },
    description: {
      pt: "Homenageia o herói nacional Agostinho Neto.",
      en: "Honours national hero Agostinho Neto.",
    },
  },
  {
    month: 10,
    day: 2,
    name: { pt: "Dia dos Finados", en: "All Souls' Day" },
    type: { pt: "Feriado Nacional", en: "National Holiday" },
    description: {
      pt: "Dia de homenagem aos mortos.",
      en: "Day of remembrance for the dead.",
    },
  },
  {
    month: 10,
    day: 11,
    name: { pt: "Dia da Independência", en: "Independence Day" },
    type: { pt: "Feriado Nacional", en: "National Holiday" },
    description: {
      pt: "Celebra a independência nacional de Angola.",
      en: "Celebrates Angola's national independence.",
    },
  },
  {
    month: 11,
    day: 25,
    name: { pt: "Natal", en: "Christmas Day" },
    type: { pt: "Feriado Nacional", en: "National Holiday" },
    description: {
      pt: "Celebra o nascimento de Jesus Cristo.",
      en: "Celebrates the birth of Jesus Christ.",
    },
  },
];

/**
 * Gera feriados fixos com possíveis dias de ponte.
 */
function getFixedHolidaysByYear(year: number): Holiday[] {
  const holidays: Holiday[] = [];

  fixedHolidaysData.forEach((h) => {
    const date = new Date(year, h.month, h.day);
    const dayOfWeek = date.getDay();

    const baseHoliday: Holiday = {
      date: getDateWithAngolaUTC(date),
      name: h.name,
      type: h.type,
      description: h.description,
    };

    // Adiciona feriado original
    holidays.push(baseHoliday);

    // Ponte na segunda (se feriado cair na terça)
    if (dayOfWeek === 2) {
      const bridge = new Date(year, h.month, h.day - 1);

      if (bridge.getFullYear() !== year) return;

      holidays.push({
        ...baseHoliday,
        date: getDateWithAngolaUTC(new Date(year, h.month, h.day - 1)),
        name: { pt: "Ponte (segunda-feira)", en: "Bridge Holiday (Monday)" },
        description: {
          pt: "Dia de descanso associado ao feriado.",
          en: "Rest day associated with the holiday.",
        },
      });
    }

    // Ponte na sexta (se feriado cair na quinta)
    if (dayOfWeek === 4) {
      const bridge = new Date(year, h.month, h.day + 1);

      if (bridge.getFullYear() !== year) return;

      holidays.push({
        ...baseHoliday,
        date: getDateWithAngolaUTC(new Date(year, h.month, h.day + 1)),
        name: { pt: "Ponte (sexta-feira)", en: "Bridge Holiday (Friday)" },
        description: {
          pt: "Dia de descanso associado ao feriado.",
          en: "Rest day associated with the holiday.",
        },
      });
    }
  });

  return holidays;
}

/**
 * Retorna todos os feriados do ano (fixos + móveis) ordenados por data.
 */
export function getAllHolidaysByYear(year: number): Holiday[] {
  const fixed = getFixedHolidaysByYear(year);
  const movableDates = getMovableHolidays(year);

  const movable: Holiday[] = [
    {
      date: getDateWithAngolaUTC(movableDates.carnival),
      name: { pt: "Carnaval", en: "Carnival" },
      type: { pt: "Feriado Nacional", en: "National Holiday" },
      description: {
        pt: "Celebração popular com desfiles e festas.",
        en: "Popular celebration with parades and festivities.",
      },
      isMovable: true,
    },
    {
      date: getDateWithAngolaUTC(movableDates.goodFriday),
      name: { pt: "Sexta-feira Santa", en: "Good Friday" },
      type: { pt: "Feriado Nacional", en: "National Holiday" },
      description: {
        pt: "Comemora a crucificação de Jesus Cristo.",
        en: "Commemorates the crucifixion of Jesus Christ.",
      },
      isMovable: true,
    },
    {
      date: getDateWithAngolaUTC(movableDates.easter),
      name: { pt: "Páscoa", en: "Easter" },
      type: { pt: "Feriado Nacional", en: "National Holiday" },
      description: {
        pt: "Celebra a ressurreição de Jesus Cristo.",
        en: "Celebrates the resurrection of Jesus Christ.",
      },
      isMovable: true,
    },
  ];

  return [...fixed, ...movable].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}
