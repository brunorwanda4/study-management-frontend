"use client";

import {
  CheckIcon,
  ChevronDownIcon,
  PlusCircleIcon,
  XCircleIcon,
} from "lucide-react";
import { useId, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Option } from "@/lib/schema/common-details-schema";
import { cn } from "@/lib/utils";

interface SelectWithSearchProps {
  options: Option[] | string[]; // accept string[] or Option[]
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  label?: string | React.ReactNode;
  allowCustomOption?: boolean; // enable custom/new option creation
  onCreateOption?: (value: string) => void; // called when user creates a new option
  allowClear?: boolean; // show "Don't select" clear item
}

export default function SelectWithSearch({
  options,
  value,
  onChange,
  placeholder = "Select option",
  disabled = false,
  label,
  allowCustomOption = false,
  onCreateOption,
  allowClear = true,
}: SelectWithSearchProps) {
  const id = useId();
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  // normalize options to Option[]
  const normalizedOptions = useMemo<Option[]>(
    () =>
      (options ?? []).map((opt) =>
        typeof opt === "string" ? { value: opt, label: opt } : opt,
      ),
    [options],
  );

  const selectedLabel = normalizedOptions.find(
    (opt) => opt.value === value,
  )?.label;

  return (
    <div className="w-full space-y-2">
      {label && <Label htmlFor={id}>{label}</Label>}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            type="button"
            variant="outline"
            aria-expanded={open}
            disabled={disabled}
            className="bg-background hover:bg-background border border-base-content/50 w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
          >
            <span
              className={cn(
                "truncate",
                !selectedLabel && "text-muted-foreground",
              )}
            >
              {selectedLabel ?? placeholder}
            </span>
            <ChevronDownIcon
              size={16}
              className="text-muted-foreground/80 shrink-0"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="border-input w-full min-w-(--radix-popper-anchor-width) p-0"
          align="start"
        >
          <Command>
            <CommandInput
              placeholder="Search..."
              value={search}
              onValueChange={(val: string) => setSearch(val)}
            />
            <CommandList>
              <CommandEmpty>
                No results found.
                {allowCustomOption && search && (
                  <div
                    role="button"
                    tabIndex={0}
                    className="text-primary mt-2 flex cursor-pointer items-center gap-2 hover:underline"
                    onClick={() => {
                      onChange(search);
                      if (onCreateOption) onCreateOption(search);
                      setOpen(false);
                      setSearch("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        onChange(search);
                        if (onCreateOption) onCreateOption(search);
                        setOpen(false);
                        setSearch("");
                      }
                    }}
                  >
                    <PlusCircleIcon size={16} />
                    Add "{search}"
                  </div>
                )}
              </CommandEmpty>

              {allowClear && value && (
                <CommandGroup>
                  <CommandItem
                    value="__clear__"
                    onSelect={() => {
                      onChange("");
                      setOpen(false);
                      setSearch("");
                    }}
                  >
                    <XCircleIcon
                      size={16}
                      className="text-muted-foreground mr-2"
                    />
                    Don’t select
                  </CommandItem>
                </CommandGroup>
              )}

              <CommandGroup>
                {normalizedOptions.map((opt) => (
                  <CommandItem
                    key={opt.value}
                    value={opt.value}
                    className="cursor-pointer"
                    onSelect={(currentValue: string) => {
                      onChange(currentValue);
                      setOpen(false);
                      setSearch("");
                    }}
                  >
                    {opt.label}
                    {value === opt.value && (
                      <CheckIcon size={16} className="ml-auto" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
