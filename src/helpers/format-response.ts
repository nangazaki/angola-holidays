export function formatResponse(data: any, lang: string) {
  const formatHoliday = (holiday: any) => ({
    date: holiday.date,
    name: holiday.name?.[lang] ?? holiday.name,
    type: holiday.type?.[lang] ?? holiday.type,
    description: holiday.description?.[lang] ?? holiday.description,
  });

  if (Array.isArray(data)) {
    return data.map(formatHoliday);
  }

  if (Array.isArray(data.holidays)) {
    return {
      ...data,
      holidays: data.holidays.map(formatHoliday),
    };
  }

  return data;
}
