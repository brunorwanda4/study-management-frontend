"use client";

import { UserSmCard } from "@/components/cards/user-card";
import { START_TIME } from "@/components/page/class/class-timetable/constants";
import { weekDays } from "@/lib/const/common-details-const";
import type { PopulatedClassTimetable } from "@/lib/schema/class/class-timetable-schema";
import { minutesToTimeString } from "@/lib/utils/format-date";
import {
  eachDayOfInterval,
  endOfWeek,
  format,
  isToday,
  startOfWeek,
} from "date-fns";
import { useMemo } from "react";

interface ClassTimetableWeekViewProps {
  currentDate: Date;
  timetable: PopulatedClassTimetable;
}

export default function ClassTimetableWeekView({
  currentDate,
  timetable,
}: ClassTimetableWeekViewProps) {
  /* Convert weekly_schedule to a shape easy for rendering */
  const normalizedDays = useMemo(() => {
    const map: Record<
      string,
      PopulatedClassTimetable["weekly_schedule"][number]
    > = {};
    timetable.weekly_schedule.forEach((d) => {
      map[d.day.toLowerCase()] = d;
    });
    return map;
  }, []);

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
          <p
            title={entry.subject?.name}
            className="text-base font-medium line-clamp-1"
          >
            {entry.subject?.name ?? "Unknown Subject"}
          </p>

          {entry.teacher && (
            <UserSmCard
              name={entry.teacher.name}
              avatarProps={{ size: "2xs", src: entry.teacher.image }}
              className="text-sm "
              nameClassname=" line-clamp-1"
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
    <div className="">
      {/* Sticky Header */}
      <div className="sticky border-b border-b-base-content/50 top-0 z-30 grid grid-cols-8  bg-background/80 backdrop-blur-md">
        <div className="py-2 text-center text-sm text-muted-foreground/70">
          <span className="max-[479px]:sr-only">{format(new Date(), "O")}</span>
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

              {weekDays.map((day) => (
                <div key={day + i}>{renderCell(day, i)}</div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
