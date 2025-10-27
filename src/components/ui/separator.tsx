"use client";

import { cn } from "@/lib/utils";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import type * as React from "react";

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-base-content/20 shrink-0",
        orientation === "horizontal"
          ? "my-2 h-px w-full"
          : "mx-2 h-auto w-px self-stretch",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };

