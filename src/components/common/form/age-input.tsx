"use client";

import { Label } from "@/components/ui/label";
import type { Age } from "@/lib/schema/common-details-schema";
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

interface AgePickerProps {
  // Accepts either a Date, an AgeObj ({year,month,day}), or null/undefined.
  value?: Date | Age | null;
  // Emits either Date | null or AgeObj | undefined depending on `output`.
  onChange?: (value: Date | Age | null | undefined) => void;
  // Default output is "age" so forms that expect the Age object receive it.
  output?: "date" | "age";
  label?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
}

export default function AgeInput({
  value,
  onChange,
  output = "age", // <- default to object output to match your schema
  label, // = "Date of Birth"
  disabled,
  error,
  className,
}: AgePickerProps) {
  const tz = getLocalTimeZone();
  const todayCal = today(tz);

  // compute allowed range based on your AgeSchema:
  // - earliest allowed date is Jan 1, 1900 (minYear)
  // - allowed birthdates are in [today - 95 years, today - 3 years]
  const now = new Date();
  const maxBirth = new Date(
    now.getFullYear() - 3,
    now.getMonth(),
    now.getDate(),
  );
  const minBirthCandidate = new Date(
    now.getFullYear() - 95,
    now.getMonth(),
    now.getDate(),
  );
  const minYear = new Date(1900, 0, 1);
  const chosenMinBirth =
    minBirthCandidate > minYear ? minBirthCandidate : minYear;

  // convert to CalendarDate shape accepted by DatePicker (using toZoned + today().set)
  const minValue = toZoned(
    todayCal.set({
      year: chosenMinBirth.getFullYear(),
      month: chosenMinBirth.getMonth() + 1,
      day: chosenMinBirth.getDate(),
    }),
    tz,
  );
  const maxValue = toZoned(
    todayCal.set({
      year: maxBirth.getFullYear(),
      month: maxBirth.getMonth() + 1,
      day: maxBirth.getDate(),
    }),
    tz,
  );

  // normalize incoming value into a JS Date for internal usage
  const valueToDate = (v?: Date | Age | null): Date | null => {
    if (!v) return null;
    if (v instanceof Date) return v;
    if (
      typeof v === "object" &&
      v !== null &&
      "year" in v &&
      "month" in v &&
      "day" in v
    ) {
      const y = Number((v as Age).year);
      const m = Number((v as Age).month);
      const d = Number((v as Age).day);
      if (!Number.isNaN(y) && !Number.isNaN(m) && !Number.isNaN(d)) {
        return new Date(y, m - 1, d);
      }
    }
    return null;
  };

  // convert a Date into Age
  const dateToAgeObj = (d: Date | null | undefined): Age | undefined => {
    if (!d) return undefined;
    return {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate(),
    };
  };

  const internalDate = valueToDate(value);

  const displayAge = useMemo(() => {
    if (!internalDate) return "";
    const todayDate = new Date();
    let age = todayDate.getFullYear() - internalDate.getFullYear();
    const m = todayDate.getMonth() - internalDate.getMonth();
    if (m < 0 || (m === 0 && todayDate.getDate() < internalDate.getDate())) {
      age--;
    }
    return `${age} years old`;
  }, [internalDate]);

  // DatePicker passes a calendar object (has .toDate()). Map and emit correct shape per `output`.
  const handleChange = (selectedDate: any) => {
    const d: Date | null = selectedDate ? selectedDate.toDate() : null;
    if (output === "age") {
      onChange?.(dateToAgeObj(d)); // AgeObj | undefined
    } else {
      onChange?.(d); // Date | null
    }
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
                    // purely visual disabled styling for out-of-range dates
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

      {displayAge && (
        <p className="text-xs text-muted-foreground">{displayAge}</p>
      )}

      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
}
