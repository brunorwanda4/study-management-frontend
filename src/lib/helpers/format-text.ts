// src/lib/formatCollectionName.ts

/**
 * Convert text name like "main_class" into "main class".
 * @param name - The raw collection name from backend
 * @returns A human readable name
 */
export function formatText(name: string): string {
  return name.replace(/_/g, " ");
}
