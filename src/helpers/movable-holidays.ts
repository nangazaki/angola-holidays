/**
 * Calculates the date of Easter Sunday for a given year using the
 * Anonymous Gregorian algorithm (also known as the Meeus/Jones/Butcher algorithm).
 *
 * @param year - The year for which to calculate Easter
 * @returns A Date object representing Easter Sunday
 */
export function calculateEaster(year: number): Date {
  const century = Math.floor(year / 100);
  const goldenNumber = year % 19; // Position in the 19-year Metonic cycle

  // Calculate the "epact" - the moon's age at the beginning of the year
  const h =
    (century -
      Math.floor(century / 4) -
      Math.floor((8 * century + 13) / 25) +
      19 * goldenNumber +
      15) %
    30;

  // Adjust epact for the moon's cycle
  const i =
    h -
    Math.floor(h / 28) *
      (1 -
        Math.floor(h / 28) *
          Math.floor(29 / (h + 1)) *
          Math.floor((21 - goldenNumber) / 11));

  // Calculate the day of the week for the Paschal full moon
  const j =
    (year + Math.floor(year / 4) + i + 2 - century + Math.floor(century / 4)) %
    7;

  // Number of days from March 21 to the Sunday after the full moon
  const l = i - j;

  // Determine month and day of Easter
  const month = 3 + Math.floor((l + 40) / 44); // 3 = March
  const day = l + 28 - 31 * Math.floor(month / 4);

  return new Date(year, month - 1, day);
}

/**
 * Calculates Easter Sunday and related movable holidays.
 *
 * @param year - The target year
 * @returns An object with Easter Sunday, Good Friday, and Carnival dates
 */
export function getMovableHolidays(year: number) {
  const easter = calculateEaster(year);

  // Clone date utility
  const cloneDate = (date: Date) => new Date(date.getTime());

  // Good Friday = Easter - 2 days
  const goodFriday = cloneDate(easter);
  goodFriday.setDate(easter.getDate() - 2);

  // Carnival (Tuesday) = Easter - 47 days
  const carnival = cloneDate(easter);
  carnival.setDate(easter.getDate() - 47);

  return {
    easter,
    goodFriday,
    carnival,
  };
}
