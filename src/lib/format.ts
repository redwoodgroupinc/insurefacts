/** Formats a date in the reader's local style, e.g. "11 October 2026" (en-GB) or "October 11, 2026" (en-US). */
export function formatDate(date: Date, lang = 'en-US'): string {
  return new Intl.DateTimeFormat(lang, { dateStyle: 'long', timeZone: 'UTC' }).format(date);
}

/** YYYY-MM-DD, for <time datetime> attributes. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Country name as used mid-sentence: "the United States", "the United Kingdom", "Canada", "Australia". */
export function countryName(country: { code: string; name: string }): string {
  return country.code === 'us' || country.code === 'uk' ? `the ${country.name}` : country.name;
}
