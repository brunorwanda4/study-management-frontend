import { useId } from "react";

import MyImage from "@/components/common/myImage";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { CommonDetails } from "@/lib/schema/common-details-schema";
import { cn } from "@/lib/utils";
// ✅ Add value + onChange props
interface RadioInputProps {
  items: Record<string, CommonDetails>;
  value?: string;
  onChange?: (value: string) => void;
  showDescription?: boolean;
  showTooltip?: boolean;
  className?: string;
  disabled?: boolean;
}

export default function RadioInput({
  items,
  value,
  onChange,
  showDescription = false,
  showTooltip = false,
  className,
  disabled,
}: RadioInputProps) {
  const id = useId();

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
          <p className="text-sm text-muted">{item.description}</p>
        )}
      </div>
    </div>
  );

  return (
    <TooltipProvider delayDuration={100}>
      <RadioGroup
        value={value}
        onValueChange={(val) => onChange?.(val)}
        className="grid-cols-2"
        disabled={disabled}
      >
        {Object.entries(items).map(([key, item]) => {
          const keyId = `${id}-${key}`;
          const content = <Content item={item} keyId={keyId} />;

          return (
            <div
              key={keyId}
              className="relative flex flex-col gap-4 rounded-md border border-base-content/50 p-2 shadow-xs outline-none data-[state=checked]:border-primary/50"
            >
              <div className="flex justify-between gap-2">
                <RadioGroupItem
                  id={keyId}
                  value={key}
                  className="order-1 after:absolute after:inset-0 top-2 w-fit"
                />
                {showTooltip && item.description && !showDescription ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="w-full">{content}</div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-sm text-muted">
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
      </RadioGroup>
    </TooltipProvider>
  );
}
