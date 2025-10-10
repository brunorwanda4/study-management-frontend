"use client";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

// --------------
// ShadCN-style variants
// --------------
const shadcnBadgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary/10 text-primary hover:bg-primary/20",
        secondary:
          "border-transparent bg-secondary/10 text-secondary hover:bg-secondary/20",
        destructive:
          "border-transparent bg-destructive/10 text-destructive hover:bg-destructive/20",
        outline: "text-foreground border border-border hover:bg-accent/50",
        success:
          "border-transparent bg-success/10 text-success hover:bg-success/20",
        warning:
          "border-transparent bg-warning/10 text-warning hover:bg-warning/20",
        info: "border-transparent bg-info/10 text-info hover:bg-info/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

// --------------
// DaisyUI-style variants
// --------------
const daisyBadgeVariants = cva("badge", {
  variants: {
    variant: {
      default: "badge-neutral",
      primary: "badge-primary",
      secondary: "badge-secondary",
      accent: "badge-accent",
      info: "badge-info",
      success: "badge-success",
      warning: "badge-warning",
      error: "badge-error",
      outline: "badge-outline",
    },
    size: {
      sm: "badge-sm",
      md: "badge-md",
      lg: "badge-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

// --------------
// Type Definitions
// --------------
export type ShadcnBadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  asChild?: boolean;
  library?: "shadcn";
} & VariantProps<typeof shadcnBadgeVariants>;

export type DaisyBadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  asChild?: boolean;
  library: "daisy";
} & VariantProps<typeof daisyBadgeVariants>;

type UniversalBadgeProps = ShadcnBadgeProps | DaisyBadgeProps;

// --------------
// Component
// --------------
const Badge = React.forwardRef<HTMLSpanElement, UniversalBadgeProps>(
  ({ className, asChild = false, library = "shadcn", ...props }, ref) => {
    const Comp = asChild ? Slot : "span";

    const styles =
      library === "daisy"
        ? daisyBadgeVariants({
            ...(props as DaisyBadgeProps),
            className,
          })
        : shadcnBadgeVariants({
            ...(props as ShadcnBadgeProps),
            className,
          });

    return (
      <Comp
        ref={ref}
        data-slot="badge"
        className={cn("inline-flex cursor-default", styles)}
        {...props}
      />
    );
  },
);

Badge.displayName = "Badge";

export { Badge, daisyBadgeVariants, shadcnBadgeVariants };
