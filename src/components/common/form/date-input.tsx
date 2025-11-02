"use client";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { getLocalTimeZone, today, toZoned } from "@internationalized/date";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";
import {
  Button as ButtonDate,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateInput,
  DatePicker,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Popover,
} from "react-aria-components";

interface DateStringInputProps {
  /** ISO string (e.g. "2025-10-30T19:58:03.179441Z") */
  value?: string | null;
  onChange?: (value?: string | null) => void;
  label?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
}

// Format a JS Date to ISO with *microsecond* precision like: 2025-10-30T19:58:03.179441Z
// We take the millisecond precision from Date and append three zeros to make microseconds.
function formatToMicroISOString(d: Date) {
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

export default function DateStringInput({
  value,
  onChange,
  label,
  disabled,
  error,
  className,
}: DateStringInputProps) {
  const tz = getLocalTimeZone();
  const todayCal = today(tz);

  // allowed range: Jan 1, 1965 up to today
  const minYear = new Date(1965, 0, 1);
  const minValue = toZoned(
    todayCal.set({
      year: minYear.getFullYear(),
      month: minYear.getMonth() + 1,
      day: minYear.getDate(),
    }),
    tz,
  );
  const maxValue = todayCal;

  // convert incoming ISO string to Date (or null)
  const valueToDate = (v?: string | null): Date | null => {
    if (!v) return null;
    const d = new Date(v);
    if (Number.isNaN(d.getTime())) return null;
    return d;
  };

  const internalDate = valueToDate(value);

  // Display a user-friendly preview of chosen date/time (local)
  const display = useMemo(() => {
    if (!internalDate) return "";

    const now = new Date();
    let years = now.getFullYear() - internalDate.getFullYear();
    let months = now.getMonth() - internalDate.getMonth();
    let days = now.getDate() - internalDate.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const parts: string[] = [];
    if (years > 0) parts.push(`${years} year${years > 1 ? "s" : ""}`);
    if (months > 0) parts.push(`${months} month${months > 1 ? "s" : ""}`);
    if (days > 0) parts.push(`${days} day${days > 1 ? "s" : ""}`);

    return parts.length > 0 ? `${parts.join(" and ")} ago` : "Today";
  }, [internalDate]);

  // DatePicker delivers a calendar date object with .toDate(). Convert and emit ISO micro string.
  const handleChange = (selectedDate: any) => {
    const d: Date | null = selectedDate ? selectedDate.toDate() : null;
    if (!d) {
      onChange?.(null);
      return;
    }
    const iso = formatToMicroISOString(d);
    onChange?.(iso);
  };

  return (
    <div className={cn("space-y-2 w-full", className)}>
      {label && <Label>{label}</Label>}

      <DatePicker
        onChange={handleChange}
        value={
          internalDate
            ? toZoned(
                todayCal.set({
                  year: internalDate.getFullYear(),
                  month: internalDate.getMonth() + 1,
                  day: internalDate.getDate(),
                }),
                tz,
              )
            : null
        }
        minValue={minValue}
        maxValue={maxValue}
        isDisabled={disabled}
        className="space-y-2"
      >
        <div className="flex">
          <Group className="inline-flex h-10 w-full rounded-md bg-base-100 px-3 py-2 text-base ring-offset-background items-center shadow-sm shadow-black/5 transition-shadow data-focus-within:border-ring data-disabled:opacity-50 border border-base-content/50">
            <DateInput>
              {(segment) => (
                <>
                  {(segment.type === "year" ||
                    segment.type === "month" ||
                    segment.type === "day") && (
                    <>
                      <DateSegment
                        segment={segment}
                        className="inline rounded p-0.5 caret-transparent outline-none data-focused:bg-accent data-invalid:text-destructive"
                      />
                      {segment.type !== "year" && <span>/</span>}
                    </>
                  )}
                </>
              )}
            </DateInput>
          </Group>

          <ButtonDate className="z-10 -me-px -ms-9 flex w-9 items-center justify-center rounded-e-lg hover:text-info">
            <CalendarIcon size={16} strokeWidth={2} />
          </ButtonDate>
        </div>

        <Popover
          offset={4}
          className="z-50 rounded-lg border border-base-300 bg-base-200 shadow-lg outline-none"
        >
          <Dialog className="max-h-[inherit] overflow-auto p-2">
            <Calendar className="w-fit">
              <header className="flex w-full items-center gap-1 pb-1">
                <ButtonDate
                  slot="previous"
                  className="flex size-9 items-center justify-center rounded-lg hover:bg-accent"
                >
                  <ChevronLeft size={16} strokeWidth={2} />
                </ButtonDate>
                <Heading className="grow text-center text-sm font-medium" />
                <ButtonDate
                  slot="next"
                  className="flex size-9 items-center justify-center rounded-lg hover:bg-accent"
                >
                  <ChevronRight size={16} strokeWidth={2} />
                </ButtonDate>
              </header>
              <CalendarGrid>
                <CalendarGridHeader>
                  {(day) => (
                    <CalendarHeaderCell className="size-9 rounded-lg text-xs font-medium text-muted-foreground/80">
                      {day}
                    </CalendarHeaderCell>
                  )}
                </CalendarGridHeader>
                <CalendarGridBody>
                  {(date) => {
                    const disabledDate =
                      date.compare(minValue) < 0 || date.compare(maxValue) > 0;
                    return (
                      <CalendarCell
                        date={date}
                        className={cn(
                          "relative flex size-9 items-center justify-center rounded-lg transition-colors data-selected:bg-info data-selected:text-primary-foreground data-hovered:bg-accent",
                          date.compare(todayCal) === 0 &&
                            "after:absolute after:bottom-1 after:start-1/2 after:size-[3px] after:rounded-full after:bg-info",
                          disabledDate && "opacity-40 cursor-not-allowed",
                        )}
                      />
                    );
                  }}
                </CalendarGridBody>
              </CalendarGrid>
            </Calendar>
          </Dialog>
        </Popover>
      </DatePicker>

      {display && <p className="text-xs text-muted-foreground">{display}</p>}

      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
}
