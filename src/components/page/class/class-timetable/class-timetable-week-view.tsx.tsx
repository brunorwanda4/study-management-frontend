"use client";

import {
  addHours,
  eachDayOfInterval,
  eachHourOfInterval,
  endOfWeek,
  format,
  getHours,
  getMinutes,
  isSameDay,
  isToday,
  startOfDay,
  startOfWeek,
} from "date-fns";
import type React from "react";
import { useMemo } from "react";

const DefaultMinStartHour = 6; // safety clamp
const DefaultMaxEndHour = 22; // safety clamp
const WeekCellsHeight = 64;

import { weekDays } from "@/lib/const/common-details-const";

import { DraggableEvent } from "@/components/page/class/class-timetable/draggable-event";
import type {
  PopulatedClassTimetable,
  PopulatedPeriod,
} from "@/lib/schema/class/class-timetable-schema";
import type { WeekDay } from "@/lib/schema/common-details-schema";
import { cn } from "@/lib/utils";
import type { CalendarEvent, EventColor } from "./types";

/* -----------------------
   Time utilities
   ----------------------- */
function parseHHMM(time: string) {
  const [h, m] = time.split(":").map(Number);
  return { hours: h, minutes: m };
}

function fmtTimeShort(date: Date) {
  // e.g., "8:00 AM"
  return format(date, "h:mm a");
}

function fmtTime24(date: Date) {
  // e.g., "08:00"
  return format(date, "HH:mm");
}

/* -------------------------------------------------- */
/* CURRENT TIME RED-LINE INDICATOR (dynamic hours)   */
/* -------------------------------------------------- */
const useCurrentTimeIndicator = (
  currentDate: Date,
  view: "week" | "day" | "month",
  startHour: number,
  endHour: number,
) => {
  const now = new Date();
  const startOfCurrentDay = startOfDay(now);
  const startOfViewDay = startOfDay(currentDate);

  const isSameView =
    view === "week"
      ? isSameDay(startOfCurrentDay, startOfViewDay) ||
        (now > startOfViewDay && now < addHours(startOfViewDay, 24 * 7))
      : isSameDay(startOfCurrentDay, startOfViewDay);

  const visible = isSameView && isToday(now);

  const minutesSinceStart =
    (now.getHours() - startHour) * 60 + now.getMinutes();
  const totalMinutes = (endHour - startHour) * 60;

  return {
    currentTimePosition: Math.max(
      0,
      Math.min(100, (minutesSinceStart / totalMinutes) * 100),
    ),
    currentTimeVisible: visible,
  };
};

/* -------------------------------------------------- */
/* DROPPABLE CELL                                     */
/* -------------------------------------------------- */
const DroppableCell: React.FC<{
  className: string;
  id: string;
  onClick?: () => void;
}> = ({ className, id, onClick }) => (
  <div className={className} data-droppable-id={id} onClick={onClick} />
);

/* -------------------------------------------------- */
/* Compute period times (centralized)                 */
/* -------------------------------------------------- */
function computePeriodTimes(dayStartOn: string, period: PopulatedPeriod) {
  const { hours, minutes } = parseHHMM(dayStartOn);

  // Base date is today's date (time of day matters, date portion is arbitrary for layout)
  const base = startOfDay(new Date());
  base.setHours(hours, minutes, 0, 0);

  const startDatetime = new Date(base.getTime() + period.start_offset * 60000);
  const endDatetime = new Date(
    startDatetime.getTime() + period.duration_minutes * 60000,
  );

  return {
    ...period,
    start_datetime: startDatetime,
    end_datetime: endDatetime,
    start_time: fmtTimeShort(startDatetime),
    start_time_24: fmtTime24(startDatetime),
    end_time: fmtTimeShort(endDatetime),
    end_time_24: fmtTime24(endDatetime),
  };
}

/* -------------------------------------------------- */
/* MAIN COMPONENT                                     */
/* -------------------------------------------------- */
interface ClassTimetableWeekViewProps {
  timetable: PopulatedClassTimetable;
  currentDate: Date;
  onPeriodSelect: (period: PopulatedPeriod, day: WeekDay) => void;
  isClassTimetable?: boolean;
}

export function ClassTimetableWeekView({
  timetable,
  currentDate,
  onPeriodSelect,
}: ClassTimetableWeekViewProps) {
  const scheduleMap = useMemo(() => {
    return new Map(timetable.weekly_schedule.map((s) => [s.day, s]));
  }, [timetable.weekly_schedule]);

  const todayDayName = useMemo(() => {
    return format(currentDate, "eeee").toLowerCase() as WeekDay;
  }, [currentDate]);

  const hasHolidays = useMemo(
    () => timetable.weekly_schedule.some((s) => s.is_holiday),
    [timetable.weekly_schedule],
  );

  /* -------------------------------------------------- */
  /* PROCESS PERIODS → EVENTS WITH TIMES                */
  /* -------------------------------------------------- */
  const processedDayPeriods = useMemo(() => {
    return weekDays.map((dayName) => {
      const schedule = scheduleMap.get(dayName);
      if (!schedule || schedule.is_holiday || !schedule.start_on) return [];

      // compute all periods with datetime/time strings
      const sortedPeriods = [...schedule.periods].sort(
        (a, b) => a.order - b.order,
      );

      const events: Array<{
        event: CalendarEvent & {
          originalPeriod: PopulatedPeriod;
          start_time?: string;
          end_time?: string;
          start_datetime?: Date;
          end_datetime?: Date;
        };
        top: number;
        height: number;
        left: number;
        width: number;
        zIndex: number;
      }> = [];

      // compute base day starting datetime
      const [startHour, startMinute] = schedule.start_on.split(":").map(Number);
      const dayBase = startOfDay(new Date());
      dayBase.setHours(startHour, startMinute, 0, 0);

      for (const period of sortedPeriods) {
        // Use computePeriodTimes to get accurate datetimes and formatted strings
        const computed = computePeriodTimes(schedule.start_on!, period);

        const periodStart = computed.start_datetime!;
        const periodEnd = computed.end_datetime!;

        const startFloat = getHours(periodStart) + getMinutes(periodStart) / 60;
        const endFloat = getHours(periodEnd) + getMinutes(periodEnd) / 60;

        // We'll compute top/height relative to a dynamic start hour later; for now compute raw pixel values using default cells
        const top = (startFloat - DefaultMinStartHour) * WeekCellsHeight;
        const height = (endFloat - startFloat) * WeekCellsHeight;

        let title = period.title || period.type;
        let description = period.description;
        let color: EventColor = (period.color_code as EventColor) || "sky";

        switch (period.type) {
          case "subject":
            title = period.subject?.name || "Subject";
            description = period.teacher?.name;
            color = (period.color_code as EventColor) || "sky";
            break;
          case "break":
            title = period.title || "Break";
            color = "amber";
            break;
          case "lunch":
            title = period.title || "Lunch";
            color = "orange";
            break;
          case "free":
            title = "Free Period";
            color = "emerald";
            break;
        }

        const event: CalendarEvent & { originalPeriod: PopulatedPeriod } = {
          id: period.period_id || `${dayName}-${period.order}`,
          title,
          description,
          start: periodStart,
          end: periodEnd,
          color,
          allDay: false,
          originalPeriod: period,
        };

        // Attach formatted times inside the event (optional but useful for DraggableEvent)
        (event as any).start_time = computed.start_time;
        (event as any).end_time = computed.end_time;
        (event as any).start_time_24 = computed.start_time_24;
        (event as any).end_time_24 = computed.end_time_24;
        (event as any).start_datetime = computed.start_datetime;
        (event as any).end_datetime = computed.end_datetime;

        events.push({
          event,
          top,
          height: Math.max(height, 0),
          left: 0,
          width: 1,
          zIndex: 10,
        });
      }

      return events;
    });
  }, [scheduleMap, timetable.weekly_schedule]);

  const { viewStartHour, viewEndHour } = useMemo(() => {
    let minStart = Number.POSITIVE_INFINITY;
    let maxEnd = Number.NEGATIVE_INFINITY;

    for (const dayEvents of processedDayPeriods) {
      for (const e of dayEvents) {
        if (!e.event.start) continue;
        const s = getHours(e.event.start) + getMinutes(e.event.start) / 60;
        const en = getHours(e.event.end) + getMinutes(e.event.end) / 60;
        if (s < minStart) minStart = s;
        if (en > maxEnd) maxEnd = en;
      }
    }

    // Fallback to default clamp if no events
    if (!Number.isFinite(minStart)) minStart = DefaultMinStartHour;
    if (!Number.isFinite(maxEnd)) maxEnd = DefaultMaxEndHour;

    // Floor start, ceil end and clamp to 0..23 range (and enforce minimum span of 1 hour)
    let startHour = Math.max(0, Math.floor(minStart));
    let endHour = Math.min(23, Math.ceil(maxEnd));

    if (endHour <= startHour) {
      // ensure at least one hour window
      endHour = Math.min(23, startHour + 1);
    }

    // safety clamps to defaults as well
    startHour = Math.max(DefaultMinStartHour, Math.min(23, startHour));
    endHour = Math.max(
      DefaultMinStartHour + 1,
      Math.min(DefaultMaxEndHour, endHour),
    );

    return { viewStartHour: startHour, viewEndHour: endHour };
  }, [processedDayPeriods]);

  const hours = useMemo(() => {
    const dayStart = startOfDay(currentDate);
    return eachHourOfInterval({
      start: addHours(dayStart, viewStartHour),
      end: addHours(dayStart, viewEndHour - 1),
    });
  }, [currentDate, viewStartHour, viewEndHour]);

  const positionedDayPeriods = useMemo(() => {
    const out = processedDayPeriods.map((dayEvents) =>
      dayEvents.map((e) => {
        // Use start and end datetimes
        const s = e.event.start!;
        const en = e.event.end!;
        const startFloat = getHours(s) + getMinutes(s) / 60;
        const endFloat = getHours(en) + getMinutes(en) / 60;

        const top = (startFloat - viewStartHour) * WeekCellsHeight;
        const height = (endFloat - startFloat) * WeekCellsHeight;

        return {
          ...e,
          top,
          height: Math.max(height, 0),
        };
      }),
    );

    return out;
  }, [processedDayPeriods, viewStartHour]);

  const handlePeriodClick = (
    event: CalendarEvent & { originalPeriod: PopulatedPeriod },
    dayName: WeekDay,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation();
    onPeriodSelect(event.originalPeriod, dayName);
  };

  const { currentTimePosition, currentTimeVisible } = useCurrentTimeIndicator(
    currentDate,
    "week",
    viewStartHour,
    viewEndHour,
  );

  const days = useMemo(() => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
    const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
    return eachDayOfInterval({ start: weekStart, end: weekEnd });
  }, [currentDate]);

  return (
    <div className="flex h-full flex-col" data-slot="class-timetable-week-view">
      {/* HEADER */}
      <div className="sticky top-0 z-30 grid grid-cols-8 border-b border-border/70 bg-background/80 backdrop-blur-md">
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

      {/* HOLIDAY ROW */}
      {hasHolidays && (
        <div className="border-b border-border/70 bg-muted/50">
          <div className="grid grid-cols-8">
            <div className="relative border-r border-border/70">
              <span className="absolute bottom-0 left-0 h-6 w-16 pe-2 text-right text-[10px] text-muted-foreground/70 sm:pe-4 sm:text-xs">
                All day
              </span>
            </div>

            {weekDays.map((dayName) => {
              const schedule = scheduleMap.get(dayName);
              return (
                <div
                  key={dayName}
                  className="relative h-10 border-r border-border/70 p-1 last:border-r-0"
                  data-today={todayDayName === dayName || undefined}
                >
                  {schedule?.is_holiday && (
                    <div className="flex h-full items-center justify-center rounded-sm bg-slate-200 text-xs font-semibold text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                      Holiday
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MAIN GRID */}
      <div className="grid flex-1 grid-cols-8 overflow-hidden">
        {/* TIME COLUMN */}
        <div className="grid auto-cols-fr border-r border-border/70">
          {hours.map((hour) => (
            <div
              key={hour.toString()}
              className="relative border-b border-border/70"
            >
              <div className="flex h-full items-end justify-stretch">
                <span className="h-6 w-16 bg-base-100 pe-2 text-right text-[10px] sm:pe-4 sm:text-xs">
                  {format(hour, "h a")}
                </span>
              </div>
            </div>
          ))}
        </div>

        {weekDays.map((dayName, dayIndex) => (
          <div
            key={dayName}
            className="relative grid auto-cols-fr border-r border-border/70 last:border-r-0"
            data-today={todayDayName === dayName || undefined}
          >
            {/* EVENTS */}
            {positionedDayPeriods[dayIndex]?.map((pos) => (
              <div
                key={pos.event.id}
                className="absolute z-10 px-0.5"
                onClick={(e) => e.stopPropagation()}
                style={{
                  top: `${pos.top}px`,
                  height: `${pos.height}px`,
                  left: `${pos.left * 100}%`,
                  width: `${pos.width * 100}%`,
                  zIndex: pos.zIndex,
                }}
              >
                <DraggableEvent
                  event={pos.event}
                  height={pos.height}
                  onClick={(e) => handlePeriodClick(pos.event, dayName, e)}
                  showTime
                  view="week"
                />
                {/* Optional: show start/end time badge inside event if DraggableEvent doesn't */}
                <div className="text-[10px] pt-0.5">
                  {(pos.event as any).start_time} -{" "}
                  {(pos.event as any).end_time}
                </div>
              </div>
            ))}

            {/* RED LINE */}
            {currentTimeVisible && todayDayName === dayName && (
              <div
                className="pointer-events-none absolute left-0 right-0 z-20"
                style={{ top: `${currentTimePosition}%` }}
              >
                <div className="relative flex items-center">
                  <div className="-left-1 absolute h-2 w-2 rounded-full bg-primary" />
                  <div className="h-0.5 w-full bg-primary" />
                </div>
              </div>
            )}

            {/* GRID CELLS */}
            {hours.map((hour) => (
              <div
                key={hour.toString()}
                className="relative border-b border-border/70"
                style={{ minHeight: `${WeekCellsHeight}px` }}
              >
                {[0, 1, 2, 3].map((q) => {
                  const id = `${dayName}-${format(hour, "HH")}-${q}`;
                  return (
                    <DroppableCell
                      key={id}
                      id={id}
                      className={cn(
                        "absolute w-full",
                        q === 0
                          ? "top-0 h-1/4"
                          : q === 1
                            ? "top-1/4 h-1/4"
                            : q === 2
                              ? "top-1/2 h-1/4"
                              : "top-3/4 h-1/4",
                      )}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
