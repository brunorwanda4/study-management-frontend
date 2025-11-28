"use client";

import { Calendar } from "@/components/ui/calendar-rac";
import { DateField, DateInput } from "@/components/ui/datefield-rac";
import { cn } from "@/lib/utils";
import { formatToMicroISOString } from "@/lib/utils/format-date";
// 1. Import CalendarDate class
import { CalendarDate } from "@internationalized/date";
import { CalendarIcon } from "lucide-react";
import {
  Button,
  DatePicker,
  Dialog,
  Group,
  Label,
  Popover,
} from "react-aria-components";

interface DateStringInputProps {
  value?: string | null;
  onChange?: (value?: string | null) => void;
  label?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
  calendar?: boolean;
  isIOS?: boolean;
}

export default function DateStringInput({
  value,
  onChange,
  label,
  disabled,
  error,
  className,
  isIOS = true,
  calendar = true,
}: DateStringInputProps) {
  // Format output date (keep year EXACTLY as user typed)
  const formatOutputDate = (calendarDate: any) => {
    if (!calendarDate) return null;

    const y = calendarDate.year;
    const m = String(calendarDate.month).padStart(2, "0");
    const d = String(calendarDate.day).padStart(2, "0");

    // If a normal 4-digit year, keep micro-ISO (compatible with your backend)
    if (String(y).length === 4) {
      try {
        // Convert to JS Date for formatting utility
        const js = calendarDate.toDate("UTC");
        return formatToMicroISOString(js);
      } catch {
        return `${y}-${m}-${d}`;
      }
    }

    // Otherwise return raw exact numeric year
    return `${y}-${m}-${d}`;
  };

  // Convert incoming string → CalendarDate object
  const toCalendarDate = (isoString?: string | null) => {
    if (!isoString) return undefined;

    const dateOnly = isoString.split("T")[0].trim();
    if (!dateOnly) return undefined;

    // Accept ANY numeric year
    const match = dateOnly.match(/^(\d+)-(\d{1,2})-(\d{1,2})$/);
    if (!match) return undefined;

    const [, yStr, mStr, dStr] = match;

    const y = Number(yStr);
    const m = Number(mStr);
    const d = Number(dStr);

    if (m < 1 || m > 12 || d < 1 || d > 31) return undefined;

    // 2. THE FIX: Always return a CalendarDate instance
    // Even if the year is weird (e.g. 5 digits or 2 digits), CalendarDate handles it.
    try {
      return new CalendarDate(y, m, d);
    } catch (e) {
      console.error("Invalid date construction", e);
      return undefined;
    }
  };

  const handleChange = (selectedDate: any) => {
    if (!selectedDate) {
      onChange?.(null);
      return;
    }

    const output = formatOutputDate(selectedDate);
    onChange?.(output);
  };

  // Calendar picker UI
  if (calendar) {
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
            className="-ms-9 -me-px z-10 flex w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none"
          >
            <CalendarIcon size={16} />
          </Button>
        </div>

        <Popover
          className="data-entering:fade-in-0 data-entering:zoom-in-95 data-exiting:fade-out-0 data-exiting:zoom-out-95
            z-50 card bg-base-100 border-base-300"
          offset={4}
        >
          <Dialog className="max-h-[inherit] overflow-auto p-2">
            <Calendar isDisabled={disabled} />
          </Dialog>
        </Popover>
      </DatePicker>
    );
  }

  // DateInput only
  return (
    <DateField
      onChange={handleChange}
      className={cn("*:not-first:mt-2", className)}
      hourCycle={24}
      isDisabled={disabled}
      value={toCalendarDate(value)}
    >
      {label && <Label>{label}</Label>}
      <DateInput />
    </DateField>
  );
}
