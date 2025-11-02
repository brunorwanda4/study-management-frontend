"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Weekdays } from "@/lib/const/common-details-const";
import type {
  DailyAvailability,
  TimeRange,
  Weekday,
} from "@/lib/schema/common-details-schema";
import { cn } from "@/lib/utils";
import { Copy, Plus, Trash } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

interface DailyAvailabilityInputProps {
  value?: DailyAvailability[] | null;
  onChange?: (value?: DailyAvailability[]) => void;
  disabled?: boolean;
  error?: string;
  label?: string;
  className?: string;
}

// ---------------- Helpers ----------------
const emptyRange = (): TimeRange => ({ start: "09:00", end: "17:00" });

const timeToMinutes = (t: string) => {
  const [hh = "0", mm = "0"] = t.split(":");
  return Number(hh) * 60 + Number(mm);
};

const makeEmptyMap = (): Record<Weekday, TimeRange[]> => ({
  Mon: [],
  Tue: [],
  Wed: [],
  Thu: [],
  Fri: [],
  Sat: [],
  Sun: [],
});

const toMap = (
  arr?: DailyAvailability[] | null,
): Record<Weekday, TimeRange[]> => {
  const map = makeEmptyMap();
  (arr || []).forEach((d) => {
    map[d.day].push({ ...d.time_range });
  });
  return map;
};

const flatten = (
  map: Record<Weekday, TimeRange[]>,
  enabledOnly?: Record<Weekday, boolean>,
) => {
  const out: DailyAvailability[] = [];
  (Weekdays as readonly Weekday[]).forEach((day) => {
    if (enabledOnly && !enabledOnly[day]) return;
    map[day].forEach((r) => {
      out.push({ day, time_range: r });
    });
  });
  return out;
};

const hasOverlaps = (ranges: TimeRange[]) => {
  if (!ranges.length) return false;
  const sorted = [...ranges].sort(
    (a, b) => timeToMinutes(a.start) - timeToMinutes(b.start),
  );
  for (let i = 0; i < sorted.length; i++) {
    const a = sorted[i];
    if (!a.start || !a.end) return true;
    if (timeToMinutes(a.start) >= timeToMinutes(a.end)) return true;
    const b = sorted[i + 1];
    if (b && timeToMinutes(a.end) > timeToMinutes(b.start)) return true;
  }
  return false;
};

const enabledFromValue = (value?: DailyAvailability[] | null) => {
  const enabled: Record<Weekday, boolean> = {
    Mon: false,
    Tue: false,
    Wed: false,
    Thu: false,
    Fri: false,
    Sat: false,
    Sun: false,
  };
  (value || []).forEach((d) => {
    enabled[d.day] = true;
  });
  return enabled;
};

// Presets for quick apply
const PRESETS: {
  label: string;
  apply: (map: Record<Weekday, TimeRange[]>) => Record<Weekday, TimeRange[]>;
}[] = [
  {
    label: "Weekdays 9–5",
    apply: (map) => {
      const next = makeEmptyMap();
      ["Mon", "Tue", "Wed", "Thu", "Fri"].forEach(
        (d) => (next[d as Weekday] = [{ start: "09:00", end: "17:00" }]),
      );
      return { ...map, ...next };
    },
  },
  {
    label: "All days 9–5",
    apply: (map) => {
      const next = makeEmptyMap();
      (Weekdays as readonly Weekday[]).forEach(
        (d) => (next[d] = [{ start: "09:00", end: "17:00" }]),
      );
      return { ...map, ...next };
    },
  },
  {
    label: "Clear all",
    apply: (map) => makeEmptyMap(),
  },
];

// ---------------- Component ----------------
export default function DailyAvailabilityInput({
  value,
  onChange,
  disabled,
  error,
  label,
  className,
}: DailyAvailabilityInputProps) {
  const [map, setMap] = useState<Record<Weekday, TimeRange[]>>(() =>
    toMap(value),
  );
  const [enabledDays, setEnabledDays] = useState<Record<Weekday, boolean>>(() =>
    enabledFromValue(value),
  );

  // 🧩 FIX: track internal updates
  const isInternalUpdate = useRef(false);

  // 🧩 FIX: only reset map when value changes from outside
  useEffect(() => {
    if (isInternalUpdate.current) {
      isInternalUpdate.current = false;
      return;
    }
    setMap(toMap(value));
    setEnabledDays(enabledFromValue(value));
  }, [value]);

  const dayErrors = useMemo(() => {
    const errors: Partial<Record<Weekday, string>> = {};
    (Weekdays as readonly Weekday[]).forEach((day) => {
      if (!enabledDays[day]) return;
      const ranges = map[day];
      if (ranges.length === 0) {
        errors[day] = "No time ranges added";
        return;
      }
      if (hasOverlaps(ranges)) {
        errors[day] = "Time ranges invalid or overlapping";
      }
    });
    return errors;
  }, [map, enabledDays]);

  // 🧩 FIX: mark internal updates to prevent overwriting
  useEffect(() => {
    const hasAnyErrors = Object.values(dayErrors).some(Boolean);
    isInternalUpdate.current = true;
    if (hasAnyErrors) {
      onChange?.(flatten(map));
    } else {
      onChange?.(flatten(map, enabledDays));
    }
  }, [map, enabledDays, dayErrors, onChange]);

  const handleToggleDay = (day: Weekday) => {
    setEnabledDays((prev) => {
      const next = { ...prev, [day]: !prev[day] };
      if (next[day]) {
        setMap((m) => {
          if (m[day].length === 0) return { ...m, [day]: [emptyRange()] };
          return m;
        });
      }
      return next;
    });
  };

  const addRange = (day: Weekday) =>
    setMap((m) => ({ ...m, [day]: [...m[day], emptyRange()] }));

  const removeRange = (day: Weekday, idx: number) =>
    setMap((m) => ({ ...m, [day]: m[day].filter((_, i) => i !== idx) }));

  const updateRange = (
    day: Weekday,
    idx: number,
    key: keyof TimeRange,
    val: string,
  ) => {
    setMap((m) => {
      const copy = m[day].map((r, i) => (i === idx ? { ...r, [key]: val } : r));
      return { ...m, [day]: copy };
    });
  };

  const copyFromPrevious = (dayIndex: number) => {
    if (dayIndex === 0) return;
    const prevDay = Weekdays[dayIndex - 1] as Weekday;
    const curDay = Weekdays[dayIndex] as Weekday;
    setMap((m) => ({ ...m, [curDay]: m[prevDay].map((r) => ({ ...r })) }));
    setEnabledDays((s) => ({ ...s, [curDay]: Boolean(s[prevDay]) }));
  };

  const applyPreset = (presetIndex: number) => {
    const preset = PRESETS[presetIndex];
    setMap((m) => preset.apply(m));
    const nextEnabled = { ...enabledFromValue() } as Record<Weekday, boolean>;
    if (preset.label === "Clear all") {
      setEnabledDays(nextEnabled);
      return;
    }
    (Weekdays as readonly Weekday[]).forEach((d) => {
      nextEnabled[d] = true;
    });
    setEnabledDays(nextEnabled);
  };

  return (
    <div className={cn("space-y-3 w-full", className)}>
      <div className="flex items-center justify-between">
        {label && <Label>{label}</Label>}

        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button type="button" size="sm" variant="outline">
                Presets
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="flex flex-col">
                {PRESETS.map((p, i) => (
                  <button
                    key={p.label}
                    className="text-left px-2 py-1 rounded hover:bg-muted"
                    onClick={() => applyPreset(i)}
                    type="button"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <div className="text-sm text-muted-foreground">
            Add your weekly availability
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {(Weekdays as readonly Weekday[]).map((day, idx) => {
          const ranges = map[day] ?? [];
          const isEnabled = enabledDays[day];
          return (
            <div
              key={day}
              className={cn(
                "border rounded-md p-3",
                isEnabled ? "bg-base-300" : "bg-muted/40",
                "flex flex-col gap-2",
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={isEnabled}
                    onCheckedChange={() => handleToggleDay(day)}
                    disabled={disabled}
                    id={`avail-${day}`}
                  />
                  <label
                    htmlFor={`avail-${day}`}
                    className="font-medium select-none"
                  >
                    {day}
                  </label>

                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={!isEnabled || disabled}
                    onClick={() => addRange(day)}
                    type="button"
                  >
                    <Plus className="mr-1" size={14} /> Add
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={idx === 0 || disabled}
                    onClick={() => copyFromPrevious(idx)}
                    title="Copy previous day ranges"
                    type="button"
                  >
                    <Copy size={14} />
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground">
                  {isEnabled ? `${ranges.length} range(s)` : "Not available"}
                </div>
              </div>

              <div className="grid gap-2">
                {isEnabled &&
                  ranges.map((r, i) => {
                    const invalid =
                      timeToMinutes(r.start) >= timeToMinutes(r.end);
                    return (
                      <div key={i} className="flex items-center gap-2">
                        <div className="flex flex-col w-1/2">
                          <Label className="text-xs">Start</Label>
                          <Input
                            disabled={disabled}
                            type="time"
                            value={r.start}
                            onChange={(e) =>
                              updateRange(day, i, "start", e.target.value)
                            }
                          />
                        </div>

                        <div className="flex flex-col w-1/2">
                          <Label className="text-xs">End</Label>
                          <Input
                            disabled={disabled}
                            type="time"
                            value={r.end}
                            onChange={(e) =>
                              updateRange(day, i, "end", e.target.value)
                            }
                          />
                        </div>

                        <div className="flex items-end">
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => removeRange(day, i)}
                            disabled={disabled}
                            type="button"
                          >
                            <Trash size={14} />
                          </Button>
                        </div>

                        {invalid && (
                          <div className="text-sm text-destructive">
                            Start must be before end
                          </div>
                        )}
                      </div>
                    );
                  })}

                {isEnabled && ranges.length === 0 && (
                  <div className="text-sm text-muted-foreground">
                    No ranges set — add one to indicate when you're available.
                  </div>
                )}

                {isEnabled && dayErrors[day] && (
                  <div className="text-sm text-destructive">
                    {dayErrors[day]}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {error && <FormMessage>{error}</FormMessage>}
    </div>
  );
}
