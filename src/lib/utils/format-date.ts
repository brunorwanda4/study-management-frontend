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

export const calculateAge = (
  dob: { year: number; month: number; day: number } | undefined,
): number | null => {
  if (
    !dob ||
    typeof dob.year !== "number" ||
    typeof dob.month !== "number" ||
    typeof dob.day !== "number"
  ) {
    return null;
  }
  try {
    // Create date in UTC to avoid timezone issues affecting the date part
    const birthDate = new Date(Date.UTC(dob.year, dob.month - 1, dob.day)); // month is 0-indexed
    // Check if the date components resulted in a valid date
    if (
      isNaN(birthDate.getTime()) ||
      birthDate.getUTCFullYear() !== dob.year ||
      birthDate.getUTCMonth() !== dob.month - 1 ||
      birthDate.getUTCDate() !== dob.day
    ) {
      console.warn("Invalid date components for age calculation:", dob);
      return null;
    }

    const today = new Date();
    // Use UTC dates for comparison to avoid timezone shifts affecting age calculation
    const todayUTC = new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()),
    );

    let age = todayUTC.getUTCFullYear() - birthDate.getUTCFullYear();
    const m = todayUTC.getUTCMonth() - birthDate.getUTCMonth();

    if (m < 0 || (m === 0 && todayUTC.getUTCDate() < birthDate.getUTCDate())) {
      age--;
    }
    return age < 0 ? 0 : age; // Ensure age isn't negative due to future date
  } catch (e) {
    console.error("Error calculating age:", e, "Input:", dob);
    return null; // Handle potential errors during date creation/calculation
  }
};
