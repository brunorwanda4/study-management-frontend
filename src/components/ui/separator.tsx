"use client";

import { cn } from "@/lib/utils";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as React from "react";

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
        "bg-base-300 shrink-0",
        orientation === "horizontal"
          ? "my-2 h-[1px] w-full"
          : "mx-2 h-auto w-[1px] self-stretch",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
