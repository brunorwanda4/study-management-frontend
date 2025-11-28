"use client";

import { DateField, DateInput } from "@/components/ui/datefield-rac";

export default function DateTimeInput() {
  return (
    <DateField className="*:not-first:mt-2" granularity="minute" hourCycle={24}>
      <DateInput />
    </DateField>
  );
}
