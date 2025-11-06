// src/lib/formatCollectionName.ts

/**
 * Convert text name like "main_class" into "main class".
 * @param name - The raw collection name from backend
 * @returns A human readable name
 */
export function formatText(name: string): string {
  return name.replace(/_/g, " ");
}

/**
 * Convert text like "FullTime" into "Full time".
 * Handles multiple camel case words like "PartTimeTeacher" → "Part time teacher".
 * @param text - The raw text in camel case format.
 * @returns A human readable text with spaces and lowercase words.
 */
export function splitCamelCase(text: string): string {
  const result = text.replace(/([a-z])([A-Z])/g, "$1 $2");
  const [first, ...rest] = result.split(" ");
  return [first, ...rest.map((w) => w.toLowerCase())].join(" ");
}
