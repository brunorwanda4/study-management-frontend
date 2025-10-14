"use client";

import { cn } from "@/lib/utils";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  Clock,
  DollarSign,
  Percent,
  Star,
} from "lucide-react";
import * as React from "react";
import {
  Input as AriaInput,
  Button,
  Group,
  NumberField,
  NumberFieldProps,
} from "react-aria-components";

type NumberInputMode = "currency" | "hours" | "percent" | "default" | "level";

type BaseInputProps = Omit<React.ComponentProps<"input">, "step"> & {
  type?: string;
  numberProps?: Partial<NumberFieldProps>;
  numberMode?: NumberInputMode;
  incrementIcon?: React.ReactNode;
  decrementIcon?: React.ReactNode;
};

const modeIcons: Record<NumberInputMode, React.ReactNode> = {
  currency: <DollarSign size={16} />,
  hours: <Clock size={16} />,
  percent: <Percent size={16} />,
  level: <Star size={16} />,
  default: null,
};

function Input({
  className,
  type,
  numberProps,
  numberMode = "default",
  incrementIcon,
  decrementIcon,
  ...props
}: BaseInputProps) {
  if (type === "number") {
    // Default increment/decrement icons
    const incIcon = incrementIcon ?? <ChevronUpIcon size={12} />;
    const decIcon = decrementIcon ?? <ChevronDownIcon size={12} />;
    const leftIcon = modeIcons[numberMode];

    const { step, defaultValue, ...restNumberProps } = numberProps || {};

    return (
      <NumberField
        step={step as number | undefined}
        defaultValue={defaultValue as number | undefined}
        {...restNumberProps}
      >
        <Group
          className={cn(
            "border-input relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm shadow-xs transition-[color,box-shadow] data-disabled:opacity-50 data-focus-within:ring-[3px]",
            "data-focus-within:border-ring data-focus-within:ring-ring/50",
            "data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive",
          )}
        >
          {leftIcon && (
            <div className="text-muted-foreground flex items-center px-2">
              {leftIcon}
            </div>
          )}
          <AriaInput
            className={cn(
              "bg-background text-foreground flex-1 px-3 py-2 tabular-nums outline-none",
              leftIcon ? "pl-0" : "",
              className,
            )}
            {...props}
          />
          <div className="flex h-[calc(100%+2px)] flex-col">
            <Button
              slot="increment"
              className="border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              {incIcon}
            </Button>
            <Button
              slot="decrement"
              className="border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px -mt-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              {decIcon}
            </Button>
          </div>
        </Group>
      </NumberField>
    );
  }

  // Default text input
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file: placeholder: selection:bg-primary selection:text-primary-foreground border-base-content/50 flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
