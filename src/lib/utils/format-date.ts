/**
 * Format a date string or Date object into a readable string.
 * Example output: "October 8, 2025"
 */
export function formatReadableDate(
  date: string | Date | null | undefined,
  options?: Intl.DateTimeFormatOptions,
): string {
  if (!date) return "N/A";

  const d = date instanceof Date ? date : new Date(date);

  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...(options || {}),
  });
}
