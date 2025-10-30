"use client";

import MyImage from "@/components/common/myImage";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useId } from "react";

import type { CommonDetails } from "@/lib/schema/common-details-schema";

interface CheckboxInputProps {
  items: Record<string, CommonDetails>;
  values?: string[]; // multiple selection
  onChange?: (values: string[]) => void;
  showDescription?: boolean;
  showTooltip?: boolean;
  className?: string; // items in component name and image
  classname?: string; // for all component
  disabled?: boolean;
}

export default function CheckboxInput({
  items,
  values = [],
  onChange,
  showDescription = false,
  showTooltip = false,
  className,
  classname,
  disabled,
}: CheckboxInputProps) {
  const id = useId();

  // Handles checkbox toggle logic
  const toggleValue = (key: string) => {
    const updated = values.includes(key)
      ? values.filter((v) => v !== key)
      : [...values, key];
    onChange?.(updated);
  };

  const Content = ({ item, keyId }: { item: CommonDetails; keyId: string }) => (
    <div className={cn("flex gap-4 items-center cursor-pointer", className)}>
      {item.image && (
        <MyImage
          src={item.image}
          className={cn(showDescription ? "size-12" : "size-6")}
          role="ICON"
          aria-hidden="true"
          classname="object-contain"
        />
      )}
      <div>
        <Label htmlFor={keyId}>{item.name}</Label>
        {showDescription && (
          <p className="text-sm text-muted-foreground">{item.description}</p>
        )}
      </div>
    </div>
  );

  return (
    <TooltipProvider delayDuration={100}>
      <div className={cn("grid grid-cols-2 gap-4", classname)}>
        {Object.entries(items).map(([key, item]) => {
          const keyId = `${id}-${key}`;
          const isChecked = values.includes(key);
          const content = <Content item={item} keyId={keyId} />;

          return (
            <div
              key={keyId}
              className={cn(
                "relative flex flex-col gap-4 rounded-md border border-base-content/50 p-2 shadow-xs outline-none",
                isChecked && "border-primary/50",
              )}
            >
              <div className="flex justify-between gap-2">
                <Checkbox
                  disabled={disabled}
                  id={keyId}
                  checked={isChecked}
                  onCheckedChange={() => toggleValue(key)}
                  className="order-1 after:absolute after:inset-0 top-2 w-fit"
                />
                {showTooltip && item.description && !showDescription ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="w-full">{content}</div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  content
                )}
              </div>
            </div>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
