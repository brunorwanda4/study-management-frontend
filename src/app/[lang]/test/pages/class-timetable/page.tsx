"use client";

import { UserSmCard } from "@/components/cards/user-card";
import { examplePopulatedTimetable } from "@/components/test/class-timetable-example";
import {
  eachDayOfInterval,
  endOfWeek,
  format,
  isToday,
  startOfWeek,
} from "date-fns";
import { useMemo } from "react";

/* -------------------------------------------------------------------------- */
/*                               YOUR REAL DATA                               */
/* -------------------------------------------------------------------------- */

interface Timetable {
  _id: string;
  created_at: string;
  updated_at: string;
  class_id: string;
  academic_year: string;
  weekly_schedule: {
    day:
      | "Monday"
      | "Tuesday"
      | "Wednesday"
      | "Thursday"
      | "Friday"
      | "Saturday"
      | "Sunday";
    is_holiday: boolean;
    periods: {
      period_id: string;
      type: "subject" | "free" | "break" | "lunch";
      order: number;
      start_offset: number;
      duration_minutes: number;
      subject?: {
        name: string;
        id?: string;
        _id?: string;
        code?: string | null;
      };
      description?: string;
      teacher?: {
        name: string;
        image?: string;
        id?: string;
        _id?: string;
        user_id?: string;
      };
      subject_id?: string;
    }[];
    start_on?: string;
  }[];
  class: any;
}

/* Example record */
const timetable: Timetable = examplePopulatedTimetable;

/* -------------------------------------------------------------------------- */
/*                                TIME HELPERS                                */
/* -------------------------------------------------------------------------- */

function minutesToTimeString(start: string, offset: number) {
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

const START_TIME = "9:00 AM";

/* -------------------------------------------------------------------------- */
/*                                MAIN VIEW                                   */
/* -------------------------------------------------------------------------- */

export default function ClassTimetable() {
  const currentDate = new Date();

  /* Convert weekly_schedule to a shape easy for rendering */
  const normalizedDays = useMemo(() => {
    const map: Record<string, Timetable["weekly_schedule"][number]> = {};
    timetable.weekly_schedule.forEach((d) => {
      map[d.day.toLowerCase()] = d;
    });
    return map;
  }, []);

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const maxPeriods = Math.max(
    ...timetable.weekly_schedule.map((d) => d.periods.length),
  );

  /* ---------------------------------------------------------------------- */
  /*                          Cell Renderer (NEW)                           */
  /* ---------------------------------------------------------------------- */

  function renderCell(day: string, index: number) {
    const dayData = normalizedDays[day.toLowerCase()];
    if (!dayData || dayData.is_holiday) {
      return (
        <div className="border border-base-content/50 h-32 flex items-center justify-center text-muted-foreground">
          Holiday
        </div>
      );
    }

    const entry = dayData.periods[index];

    if (!entry) {
      return (
        <div className="border border-base-content/50 h-32 flex items-center justify-center text-muted-foreground/60">
          Empty
        </div>
      );
    }

    /* SUBJECT */
    if (entry.type === "subject") {
      return (
        <div className="border border-base-content/50 h-32 flex flex-col gap-1 px-2 py-1">
          <p className="text-base font-medium line-clamp-1">
            {entry.subject?.name ?? "Unknown Subject"}
          </p>

          {entry.teacher && (
            <UserSmCard
              name={entry.teacher.name}
              avatarProps={{ size: "2xs", src: entry.teacher.image }}
              className="text-sm"
            />
          )}

          <div className="mt-auto flex flex-col gap-1 pb-1">
            <div className="flex bg-warning/20 p-1 justify-between text-sm">
              <span className="font-medium">{entry.subject?.code ?? "-"}</span>
              <span>{entry.duration_minutes} min</span>
            </div>

            <div className="flex bg-info/20 p-1 text-center text-sm justify-center">
              View details
            </div>
          </div>
        </div>
      );
    }

    /* FREE */
    if (entry.type === "free") {
      return (
        <div className="border border-base-content/50 bg-base-content/10 h-32 flex flex-col items-center justify-center p-2">
          Free period
          {entry.description && (
            <p className="text-sm text-center line-clamp-2">
              {entry.description}
            </p>
          )}
        </div>
      );
    }

    /* BREAK */
    if (entry.type === "break") {
      return (
        <div className="border border-base-content/50 bg-base-content/20 h-32 flex items-center justify-center">
          Break
        </div>
      );
    }

    /* LUNCH */
    if (entry.type === "lunch") {
      return (
        <div className="border border-base-content/50 bg-primary/20 h-32 flex items-center justify-center">
          Lunch
        </div>
      );
    }

    return null;
  }

  const days = useMemo(() => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
    const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
    return eachDayOfInterval({ start: weekStart, end: weekEnd });
  }, [currentDate]);
  /* ---------------------------------------------------------------------- */
  /*                               RENDER UI                                */
  /* ---------------------------------------------------------------------- */

  return (
    <div className="min-h-screen p-8">
      <div className="bg-base-100 p-8">
        {/* Sticky Header */}
        <div className="sticky top-0 z-30 grid grid-cols-8  bg-background/80 backdrop-blur-md">
          <div className="py-2 text-center text-sm text-muted-foreground/70">
            <span className="max-[479px]:sr-only">
              {format(new Date(), "O")}
            </span>
          </div>

          {days.map((day) => (
            <div
              key={day.toString()}
              data-today={isToday(day) || undefined}
              className="py-2 text-center text-sm text-muted-foreground/70 data-today:font-medium data-today:text-foreground"
            >
              <span aria-hidden className="sm:hidden">
                {format(day, "E")[0]} {format(day, "d")}
              </span>
              <span className="max-sm:hidden">{format(day, "EEE dd")}</span>
            </div>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-8">
          {Array.from({ length: maxPeriods }).map((_, i) => {
            const timeLabel = minutesToTimeString(START_TIME, i * 40);

            return (
              <div key={i} className="contents">
                <div className="border border-base-content/50 h-32 flex items-end p-2">
                  {timeLabel}
                </div>

                {daysOfWeek.map((day) => (
                  <div key={day + i}>{renderCell(day, i)}</div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
