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
      Number.isNaN(birthDate.getTime()) ||
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
export const formatTimeAgo = (dateInput: string | Date | undefined) => {
  if (!dateInput) return null;

  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);

  if (diffSec < 60) return `${diffSec} sec ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hr ago`;
  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;
};

export function minutesToTimeString(start: string, offset: number) {
  const [t, modifier] = start.split(" ");
  let [hours, mins] = t.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  const date = new Date();
  date.setHours(hours);
  date.setMinutes(mins + offset);

  let h = date.getHours();
  const ampm = h >= 12 ? "PM" : "AM";

  h = h % 12;
  if (h === 0) h = 12;

  const m = date.getMinutes().toString().padStart(2, "0");
  return `${h}:${m} ${ampm}`;
}

export function formatToMicroISOString(d: Date) {
  const pad = (n: number, width = 2) => String(n).padStart(width, "0");
  const YYYY = d.getUTCFullYear();
  const MM = pad(d.getUTCMonth() + 1);
  const DD = pad(d.getUTCDate());
  const hh = pad(d.getUTCHours());
  const mm = pad(d.getUTCMinutes());
  const ss = pad(d.getUTCSeconds());
  const ms = String(d.getUTCMilliseconds()).padStart(3, "0");
  const micro = ms + "000"; // append three zeros to get microsecond precision
  return `${YYYY}-${MM}-${DD}T${hh}:${mm}:${ss}.${micro}Z`;
}
