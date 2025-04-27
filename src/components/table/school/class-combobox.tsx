"use client";

import { useState } from "react";
import { ChevronDownIcon, LucideIcon } from "lucide-react"; // Using UsersIcon as a placeholder

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils"; // Assuming you have a utility for class names

// Define the expected item structure
export interface ComboboxItem {
  value: string;
  label: string;
  icon: LucideIcon;
  number: number;
}

interface ClassComboboxProps {
  items: ComboboxItem[];
  value: string | undefined; // Current value from react-hook-form
  onChange: (value: string) => void; // Function to update react-hook-form
  placeholder: string;
  searchPlaceholder: string;
  emptyMessage: string;
  disabled?: boolean;
  id?: string; // For label association
  className?: string; // Allow passing custom classes
}

export function ClassCombobox({
  items,
  value,
  onChange,
  placeholder,
  searchPlaceholder,
  emptyMessage,
  disabled = false,
  id,
  className,
}: ClassComboboxProps) {
  const [open, setOpen] = useState<boolean>(false);

  const selectedItem = items.find((item) => item.value === value);
  const Icon = selectedItem?.icon ?? null; // Get icon if item is selected

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label={placeholder} // Improved accessibility
          disabled={disabled}
          className={cn(
            " hover:bg-base-300 border-base-content/20 w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]",
            className // Allow external styling
          )}
        >
          {selectedItem ? (
            <span className="flex min-w-0 items-center gap-2">
              {Icon && <Icon className="size-4 shrink-0" />}
              <span className="truncate">{selectedItem.label}</span>
            </span>
          ) : (
            <span className="">{placeholder}</span>
          )}
          <ChevronDownIcon
            size={16}
            className=" /80 shrink-0"
            aria-hidden="true"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="border-base-content/20 w-full min-w-[var(--radix-popper-anchor-width)] p-0"
        align="start"
        // Avoid portal issues if needed, though usually fine
        // portal={false}
      >
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value} // Use value for Command filtering
                  onSelect={(currentValue) => {
                    // Find the item's actual value case-insensitively if needed,
                    // but Command uses the `value` prop directly.
                    const selectedValue = items.find(
                      (i) => i.value.toLowerCase() === currentValue.toLowerCase()
                    )?.value;

                    if (selectedValue) {
                      // Only call onChange if a valid selection happened
                      // Toggle behavior: If selecting the same item again, clear it (optional)
                      // onChange(selectedValue === value ? "" : selectedValue);
                      onChange(selectedValue); // Directly set the value
                      setOpen(false);
                    }
                  }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <item.icon className="  size-4 shrink-0" />
                    {item.label}
                  </div>
                  <span className="  text-xs">
                    {item.number.toLocaleString()}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}