"use client";

import {
  addHours,
  eachHourOfInterval,
  format,
  getHours,
  getMinutes,
  isSameDay,
  isToday,
  startOfDay,
} from "date-fns";
import type React from "react";
import { useMemo } from "react";

const StartHour = 9; // Example: 7 AM
const EndHour = 22; // Example: 10 PM
const WeekCellsHeight = 64; // Example: 64px per hour

// Assuming these components are available.
// You might need to adjust the import paths.
import { DraggableEvent } from "./draggable-event";

import { weekDays } from "@/lib/const/common-details-const";
import type {
  PopulatedClassTimetable,
  PopulatedPeriod,
} from "@/lib/schema/class/class-timetable-schema";
import type { WeekDay } from "@/lib/schema/common-details-schema";
import { cn } from "@/lib/utils";
import type { CalendarEvent, EventColor } from "./types";

// Mock implementation of useCurrentTimeIndicator if not available
const useCurrentTimeIndicator = (
  currentDate: Date,
  view: "week" | "day" | "month",
) => {
  const now = new Date();
  const startOfCurrentDay = startOfDay(now);
  const startOfViewDay = startOfDay(currentDate);

  const isSameView =
    view === "week"
      ? isSameDay(startOfCurrentDay, startOfViewDay) ||
        (now > startOfViewDay &&
          now < addHours(startOfViewDay, 24 * 7)) /* crude week check */
      : isSameDay(startOfCurrentDay, startOfViewDay);

  const visible = isSameView && isToday(now);

  const minutesSinceStart =
    (now.getHours() - StartHour) * 60 + now.getMinutes();
  const totalMinutesInView = (EndHour - StartHour) * 60;
  const position = (minutesSinceStart / totalMinutesInView) * 100;

  return {
    currentTimePosition: Math.max(0, Math.min(100, position)),
    currentTimeVisible: visible,
  };
};

// Mock DroppableCell if not available
const DroppableCell: React.FC<{
  className: string;
  id: string;
  onClick?: () => void;
}> = ({ className, id, onClick }) => {
  return <div className={className} data-droppable-id={id} onClick={onClick} />;
};

interface ClassTimetableWeekViewProps {
  /** The full timetable data object */
  timetable: PopulatedClassTimetable;
  /** The current date, used for "today" highlighting */
  currentDate: Date;
  /** Callback when a period is clicked */
  onPeriodSelect: (period: PopulatedPeriod, day: WeekDay) => void;
  /** Flag to maintain component structure if needed elsewhere */
  isClassTimetable?: boolean;
}

interface PositionedEvent {
  event: CalendarEvent & { originalPeriod: PopulatedPeriod };
  top: number;
  height: number;
  left: number;
  width: number;
  zIndex: number;
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

  const hours = useMemo(() => {
    const dayStart = startOfDay(currentDate);
    return eachHourOfInterval({
      end: addHours(dayStart, EndHour - 1),
      start: addHours(dayStart, StartHour),
    });
  }, [currentDate]);

  const hasHolidays = useMemo(() => {
    return timetable.weekly_schedule.some((s) => s.is_holiday);
  }, [timetable.weekly_schedule]);

  // Process periods for each day to calculate positions
  const processedDayPeriods = useMemo(() => {
    const result: PositionedEvent[][] = weekDays.map((dayName) => {
      const schedule = scheduleMap.get(dayName);

      // If no schedule, or it's a holiday, or no start time, return empty
      if (!schedule || schedule.is_holiday || !schedule.start_on) {
        return [];
      }

      // Get the base start time for the day
      const [startHour, startMinute] = schedule.start_on.split(":").map(Number);

      // We use a dummy date just for time calculations within the day
      const dayBaseDate = startOfDay(new Date());
      dayBaseDate.setHours(startHour, startMinute, 0, 0);

      const positionedPeriods: PositionedEvent[] = [];

      // Sort periods by order
      const sortedPeriods = [...schedule.periods].sort(
        (a, b) => a.order - b.order,
      );

      for (const period of sortedPeriods) {
        // Calculate the absolute start and end time for this period
        const periodStartDate = new Date(
          dayBaseDate.getTime() + period.start_offset * 60000,
        );
        const periodEndDate = new Date(
          periodStartDate.getTime() + period.duration_minutes * 60000,
        );

        // Convert times to fractional hours (e.g., 9:30 -> 9.5)
        const startHourWithMinutes =
          getHours(periodStartDate) + getMinutes(periodStartDate) / 60;
        const endHourWithMinutes =
          getHours(periodEndDate) + getMinutes(periodEndDate) / 60;

        // Calculate visual position
        const top = (startHourWithMinutes - StartHour) * WeekCellsHeight;
        const height =
          (endHourWithMinutes - startHourWithMinutes) * WeekCellsHeight;

        // Create a CalendarEvent-like object for rendering
        let title: string = period.title || period.type;
        let description: string | undefined = period.description;
        let color: EventColor = (period.color_code as EventColor) || "sky";

        switch (period.type) {
          case "subject":
            title = period.subject?.name || "Subject";
            description = period.teacher?.name;
            color = (period.color_code as EventColor) || "sky";
            break;
          case "break":
            title = period.title || "Morning Break";
            color = "amber";
            break;
          case "lunch":
            title = period.title || "Lunch Time";
            color = "orange";
            break;
          case "free":
            title = period.title || "Free Period";
            color = "emerald";
            break;
        }

        const calendarEvent: CalendarEvent & {
          originalPeriod: PopulatedPeriod;
        } = {
          id: period.period_id || `${dayName}-${period.order}`,
          title: title,
          description: description,
          start: periodStartDate,
          end: periodEndDate,
          allDay: false,
          color: color,
          originalPeriod: period, // Attach original data
        };

        positionedPeriods.push({
          event: calendarEvent,
          height: Math.max(0, height), // Ensure height is not negative
          left: 0,
          top: top,
          width: 1,
          zIndex: 10,
        });
      }

      return positionedPeriods;
    });

    return result;
  }, [weekDays, scheduleMap]);

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
  );

  return (
    <div className="flex h-full flex-col" data-slot="class-timetable-week-view">
      {/* Header Row */}
      <div className="sticky top-0 z-30 grid grid-cols-8 border-border/70 border-b bg-background/80 backdrop-blur-md">
        {/* Timezone Column */}
        <div className="py-2 text-center text-muted-foreground/70 text-sm">
          <span className="max-[479px]:sr-only">{format(new Date(), "O")}</span>
        </div>
        {/* Day Columns */}
        {weekDays.map((dayName) => (
          <div
            className="py-2 text-center text-muted-foreground/70 text-sm data-today:font-medium data-today:text-foreground capitalize"
            data-today={todayDayName === dayName || undefined}
            key={dayName}
          >
            <span aria-hidden="true" className="sm:hidden">
              {dayName.slice(0, 3)}
            </span>
            <span className="max-sm:hidden">{dayName}</span>
          </div>
        ))}
      </div>

      {/* "All Day" / Holiday Row */}
      {hasHolidays && (
        <div className="border-border/70 border-b bg-muted/50">
          <div className="grid grid-cols-8">
            {/* "All day" label cell */}
            <div className="relative border-border/70 border-r">
              <span className="absolute bottom-0 left-0 h-6 w-16 max-w-full pe-2 text-right text-[10px] text-muted-foreground/70 sm:pe-4 sm:text-xs">
                All day
              </span>
            </div>
            {/* Holiday cells */}
            {weekDays.map((dayName) => {
              const schedule = scheduleMap.get(dayName);
              const isHoliday = schedule?.is_holiday ?? false;

              return (
                <div
                  className="relative border-border/70 border-r p-1 last:border-r-0 h-10" // Give a fixed height
                  data-today={todayDayName === dayName || undefined}
                  key={dayName}
                >
                  {isHoliday && (
                    <div className="flex items-center justify-center h-full bg-slate-200 dark:bg-slate-700 rounded-sm text-xs font-semibold text-slate-600 dark:text-slate-300">
                      Holiday
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid flex-1 grid-cols-8 overflow-hidden">
        {/* Time Gutter */}
        <div className="grid auto-cols-fr border-border/70 border-r">
          {hours.map((hour, index) => (
            <div
              className="relative"
              key={hour.toString()}
              style={{ minHeight: `${WeekCellsHeight}px` }}
            >
              <div className="border-border/70 border-b h-full w-full">
                {index > 0 && (
                  <span className="-top-3 absolute left-0 flex h-6 w-16 max-w-full items-center justify-end pe-2 text-[10px] sm:pe-4 sm:text-xs bg-base-100">
                    {format(hour, "h a")}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Day Columns with Periods */}
        {weekDays
          ? weekDays.map((dayName, dayIndex) => (
              <div
                className="relative grid auto-cols-fr border-border/70 border-r last:border-r-0"
                data-today={todayDayName === dayName || undefined}
                key={dayName}
              >
                {/* Positioned periods */}
                {(processedDayPeriods[dayIndex] ?? []).map(
                  (positionedEvent) => (
                    <div
                      className="absolute z-10 px-0.5"
                      key={positionedEvent.event.id}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        height: `${positionedEvent.height}px`,
                        left: `${positionedEvent.left * 100}%`,
                        top: `${positionedEvent.top}px`,
                        width: `${positionedEvent.width * 100}%`,
                        zIndex: positionedEvent.zIndex,
                      }}
                    >
                      <div className="size-full">
                        <DraggableEvent
                          event={positionedEvent.event}
                          height={positionedEvent.height}
                          onClick={(e) =>
                            handlePeriodClick(positionedEvent.event, dayName, e)
                          }
                          showTime
                          view="week"
                        />
                      </div>
                    </div>
                  ),
                )}
                {/* Current time indicator */}
                {currentTimeVisible && todayDayName === dayName && (
                  <div
                    className="pointer-events-none absolute right-0 left-0 z-20"
                    style={{ top: `${currentTimePosition}%` }}
                  >
                    <div className="relative flex items-center">
                      <div className="-left-1 absolute h-2 w-2 rounded-full bg-primary" />
                      <div className="h-0.5 w-full bg-primary" />
                    </div>
                  </div>
                )}
                {/* Hour cells for structure and click-to-create */}
                {hours.map((hour) => {
                  return (
                    <div
                      className="relative border-border/70 border-b last:border-b-0"
                      key={hour.toString()}
                      style={{ minHeight: `${WeekCellsHeight}px` }}
                    >
                      {/* Quarter-hour intervals */}
                      {[0, 1, 2, 3].map((quarter) => {
                        const quarterHourTime = getHours(hour) + quarter * 0.25;
                        return (
                          <DroppableCell
                            className={cn(
                              "absolute w-full",
                              quarter === 0 && "top-0 h-1/4",
                              quarter === 1 && "top-1/4 h-1/4",
                              quarter === 2 && "top-1/2 h-1/4",
                              quarter === 3 && "top-3/4 h-1/4",
                            )}
                            id={`week-cell-${dayName}-${quarterHourTime}`}
                            key={`${hour.toString()}-${quarter}`}
                            // onClick={() => {
                            //   // Removed onEventCreate as timetable is static
                            // }}
                          />
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ))
          : "bruno"}
      </div>
    </div>
  );
}
