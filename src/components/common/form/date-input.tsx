"use client";

import { Calendar } from "@/components/ui/calendar-rac";
import { DateField, DateInput } from "@/components/ui/datefield-rac";
import { cn } from "@/lib/utils";
import { formatToMicroISOString } from "@/lib/utils/format-date";

import {
  Button,
  DatePicker,
  Dialog,
  Group,
  Label,
  Popover,
} from "react-aria-components";

import {
  CalendarDate,
  CalendarDateTime,
  type DateValue,
} from "@internationalized/date";

import { CalendarIcon } from "lucide-react";

// -----------------------------------------------------
// TIME POPOVER COMPONENT
// -----------------------------------------------------
interface TimePopoverProps {
  date: CalendarDateTime;
  onTimeChange: (t: { hour?: number; minute?: number }) => void;
}

function TimePopover({ date, onTimeChange }: TimePopoverProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  return (
    <Popover className="card bg-base-100 border border-base-300 p-2 z-50">
      <Dialog className="p-2">
        <div className="flex gap-6">
          {/* HOURS */}
          <div className="flex-1">
            <div className="font-medium mb-1">Hour</div>
            <div className="max-h-48 overflow-auto border rounded p-1">
              {hours.map((h) => (
                <button
                  key={h}
                  className="w-full text-left px-2 py-1 rounded hover:bg-base-200"
                  onClick={() => onTimeChange({ hour: h })}
                  type="button"
                >
                  {String(h).padStart(2, "0")}
                </button>
              ))}
            </div>
          </div>

          {/* MINUTES */}
          <div className="flex-1">
            <div className="font-medium mb-1">Minute</div>
            <div className="max-h-48 overflow-auto border rounded p-1">
              {minutes.map((m) => (
                <button
                  key={m}
                  type="button"
                  className="w-full text-left px-2 py-1 rounded hover:bg-base-200"
                  onClick={() => onTimeChange({ minute: m })}
                >
                  {String(m).padStart(2, "0")}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Dialog>
    </Popover>
  );
}

// -----------------------------------------------------
// UTIL: Convert CalendarDate → CalendarDateTime
// -----------------------------------------------------
function ensureDateTime(
  date: CalendarDate | null | undefined,
): CalendarDateTime | null {
  if (!date) return null;

  // Already CalendarDateTime
  if (date instanceof CalendarDateTime) return date;

  return new CalendarDateTime(date.year, date.month, date.day, 0, 0);
}

// -----------------------------------------------------
// MAIN COMPONENT
// -----------------------------------------------------
export interface DateStringInputProps {
  value?: string | null;
  onChange?: (value?: string | null) => void;
  label?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
  inputType?: "input" | "calendar" | "date-time";
}

export default function DateStringInput({
  value,
  onChange,
  label,
  disabled,
  error,
  className,
  inputType = "calendar",
}: DateStringInputProps) {
  // Convert ISO → CalendarDate
  const toCalendarDate = (
    isoString?: string | null,
  ): CalendarDate | undefined => {
    if (!isoString) return undefined;

    const dateOnly = isoString.split("T")[0]?.trim();
    if (!dateOnly) return undefined;

    const match = dateOnly.match(/^(\d+)-(\d{1,2})-(\d{1,2})$/);
    if (!match) return undefined;

    const [, yStr, mStr, dStr] = match;

    const y = Number(yStr);
    const m = Number(mStr);
    const d = Number(dStr);

    if (m < 1 || m > 12 || d < 1 || d > 31) return undefined;

    try {
      return new CalendarDate(y, m, d);
    } catch {
      return undefined;
    }
  };

  // Format output to ISO / custom year
  const formatOutputDate = (dateObj: DateValue | null): string | null => {
    if (!dateObj) return null;

    const y = dateObj.year;
    const m = String(dateObj.month).padStart(2, "0");
    const d = String(dateObj.day).padStart(2, "0");

    if ("hour" in dateObj) {
      try {
        return formatToMicroISOString(dateObj.toDate("UTC"));
      } catch {}
    }

    if (String(y).length === 4) {
      try {
        return formatToMicroISOString(dateObj.toDate("UTC"));
      } catch {}
    }

    return `${y}-${m}-${d}`;
  };

  // Wrap onChange
  const handleChange = (selected: DateValue | null) => {
    if (!selected) return onChange?.(null);
    onChange?.(formatOutputDate(selected));
  };

  // -----------------------------------------------------
  // 1) DATE PICKER WITH CALENDAR
  // -----------------------------------------------------
  if (inputType === "calendar") {
    return (
      <DatePicker
        onChange={handleChange}
        value={toCalendarDate(value)}
        className={cn("*:not-first:mt-2", className)}
        isDisabled={disabled}
      >
        {label && <Label className="font-medium text-sm">{label}</Label>}

        <div className="flex">
          <Group className="w-full">
            <DateInput className="pe-9" />
          </Group>

          <Button
            isDisabled={disabled}
            className="-ms-9 -me-px z-10 flex w-9 items-center justify-center
              rounded-e-md text-muted-foreground/80"
          >
            <CalendarIcon size={16} />
          </Button>
        </div>

        <Popover
          className="card bg-base-100 border border-base-300 z-50"
          offset={4}
        >
          <Dialog className="p-2 max-h-[inherit] overflow-auto">
            <Calendar isDisabled={disabled} />
          </Dialog>
        </Popover>
      </DatePicker>
    );
  }

  // -----------------------------------------------------
  // 2) DATE-TIME PICKER (Calendar + Time)
  // -----------------------------------------------------
  if (inputType === "date-time") {
    return (
      <DatePicker
        onChange={(d) => handleChange(d)}
        value={ensureDateTime(toCalendarDate(value))}
        className={cn("*:not-first:mt-2", className)}
        isDisabled={disabled}
        granularity="minute"
      >
        {label && <Label className="font-medium text-sm">{label}</Label>}

        <div className="flex">
          <Group className="w-full">
            <DateInput className="pe-9" />
          </Group>

          <Button
            className="-ms-9 -me-px z-10 flex w-9 items-center justify-center
            rounded-e-md text-muted-foreground/80"
          >
            <CalendarIcon size={16} />
          </Button>
        </div>

        <Popover
          className="card bg-base-100 border border-base-300 z-50"
          offset={4}
        >
          <Dialog className="p-2 max-h-[inherit] overflow-auto">
            <Calendar isDisabled={disabled} />
          </Dialog>
        </Popover>
      </DatePicker>
    );
  }

  // -----------------------------------------------------
  // 3) INPUT-ONLY MODE WITH TIME POPOVER
  // -----------------------------------------------------
  const currentDate = ensureDateTime(toCalendarDate(value));

  return (
    <DateField
      value={currentDate ?? undefined}
      onChange={handleChange}
      className={cn("*:not-first:mt-2", className)}
      hourCycle={24}
      granularity="minute"
      isDisabled={disabled}
    >
      {label && <Label className="font-medium text-sm">{label}</Label>}

      <div className="relative flex items-center">
        <DateInput className="pe-9" />

        {/* OPEN TIME POPOVER BUTTON */}
        <Button
          className="-ms-9 -me-px z-10 flex w-9 items-center justify-center
          rounded-e-md text-muted-foreground/80"
        >
          <CalendarIcon size={16} />
        </Button>

        {currentDate && (
          <TimePopover
            date={currentDate}
            onTimeChange={({ hour, minute }) => {
              if (!currentDate) return;

              const updated = new CalendarDateTime(
                currentDate.year,
                currentDate.month,
                currentDate.day,
                hour ?? currentDate.hour,
                minute ?? currentDate.minute,
              );

              handleChange(updated);
            }}
          />
        )}
      </div>
    </DateField>
  );
}
