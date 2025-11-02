"use client";

import {
  composeRenderProps,
  type DateFieldProps,
  DateField as DateFieldRac,
  type DateInputProps as DateInputPropsRac,
  DateInput as DateInputRac,
  type DateSegmentProps,
  DateSegment as DateSegmentRac,
  type DateValue as DateValueRac,
  type TimeFieldProps,
  TimeField as TimeFieldRac,
  type TimeValue as TimeValueRac,
} from "react-aria-components";

import { cn } from "@/lib/utils";

function DateField<T extends DateValueRac>({
  className,
  children,
  ...props
}: DateFieldProps<T>) {
  return (
    <DateFieldRac
      className={composeRenderProps(className, (className) => cn(className))}
      {...props}
    >
      {children}
    </DateFieldRac>
  );
}

function TimeField<T extends TimeValueRac>({
  className,
  children,
  ...props
}: TimeFieldProps<T>) {
  return (
    <TimeFieldRac
      className={composeRenderProps(className, (className) => cn(className))}
      {...props}
    >
      {children}
    </TimeFieldRac>
  );
}

function DateSegment({ className, ...props }: DateSegmentProps) {
  return (
    <DateSegmentRac
      className={composeRenderProps(className, (className) =>
        cn(
          "inline rounded p-0.5 text-foreground caret-transparent outline-hidden data-disabled:cursor-not-allowed data-disabled:opacity-50 data-focused:bg-accent data-focused:text-foreground data-invalid:text-destructive data-invalid:data-focused:bg-destructive data-invalid:data-focused:text-white data-placeholder:text-muted-foreground/70 data-focused:data-placeholder:text-foreground data-invalid:data-placeholder:text-destructive data-invalid:data-focused:data-placeholder:text-white data-[type=literal]:px-0 data-[type=literal]:text-muted-foreground/70",
          className,
        ),
      )}
      {...props}
      data-invalid
    />
  );
}

const dateInputStyle =
  "relative inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none data-focus-within:border-ring data-focus-within:ring-ring/50 data-focus-within:ring-[3px] data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive";

interface DateInputProps extends DateInputPropsRac {
  className?: string;
  unstyled?: boolean;
}

function DateInput({
  className,
  unstyled = false,
  ...props
}: Omit<DateInputProps, "children">) {
  return (
    <DateInputRac
      className={composeRenderProps(className, (className) =>
        cn(!unstyled && dateInputStyle, className),
      )}
      {...props}
    >
      {(segment) => <DateSegment segment={segment} />}
    </DateInputRac>
  );
}

export { DateField, DateInput, dateInputStyle, DateSegment, TimeField };
export type { DateInputProps };
