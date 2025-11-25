"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useId, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export default function ChangeClassCode() {
  const id = useId();
  const [copied, setCopied] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCopy = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className=" flex gap-4 flex-row">
      <div className="relative w-44">
        <Input
          className="pe-9 "
          defaultValue="CODE123"
          id={id}
          readOnly
          ref={inputRef}
          type="text"
        />
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                aria-label={copied ? "Copied" : "Copy to clipboard"}
                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed"
                disabled={copied}
                onClick={handleCopy}
                type="button"
              >
                <div
                  className={cn(
                    "transition-all",
                    copied ? "scale-100 opacity-100" : "scale-0 opacity-0",
                  )}
                >
                  <CheckIcon
                    aria-hidden="true"
                    className="stroke-success"
                    size={16}
                  />
                </div>
                <div
                  className={cn(
                    "absolute transition-all",
                    copied ? "scale-0 opacity-0" : "scale-100 opacity-100",
                  )}
                >
                  <CopyIcon aria-hidden="true" size={16} />
                </div>
              </button>
            </TooltipTrigger>
            <TooltipContent className="px-2 py-1 text-xs">
              Copy to code
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Button variant={"outline"} library="daisy">
        Change Code
      </Button>
    </div>
  );
}
