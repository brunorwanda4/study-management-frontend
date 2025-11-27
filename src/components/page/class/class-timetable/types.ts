import type { PopulatedPeriod } from "@/lib/schema/class/class-timetable-schema";

export type CalendarView = "month" | "week" | "day" | "agenda";

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  color?: EventColor;
  location?: string;
  /** Optional field to store the original timetable period data */
  originalPeriod?: PopulatedPeriod;
}

export type EventColor =
  | "sky"
  | "amber"
  | "violet"
  | "rose"
  | "emerald"
  | "orange"
  | string; // Allow any string for custom colors
