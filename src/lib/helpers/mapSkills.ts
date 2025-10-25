export function mapSkills(
  skills: string[] | { id: string; text: string }[] | undefined,
) {
  if (!skills) return [];
  if (typeof skills[0] === "object") {
    return skills as { id: string; text: string }[];
  }
  return (skills as string[]).map((s) => ({
    id: crypto.randomUUID(),
    text: s,
  }));
}
