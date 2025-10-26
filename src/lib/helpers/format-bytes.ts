// utils/bytes.ts (or wherever you keep utilities)

export function parseBytes(input: string): number {
  const units = ["B", "KB", "MB", "GB", "TB"];
  const match = input.trim().match(/^([\d.]+)\s*(\w+)$/i);

  if (!match) return 0;

  const value = parseFloat(match[1]);
  const unit = match[2].toUpperCase();

  const index = units.findIndex((u) => unit.startsWith(u));
  if (index === -1) return value;

  return value * Math.pow(1024, index);
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
