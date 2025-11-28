"use client";

import { Label } from "react-aria-components";

import { DateField, DateInput } from "@/components/ui/datefield-rac";

export default function Component() {
  return (
    <DateField className="*:not-first:mt-2" granularity="minute" hourCycle={24}>
      <Label className="font-medium text-foreground text-sm">
        Date and time input
      </Label>
      <DateInput />
    </DateField>
  );
}
