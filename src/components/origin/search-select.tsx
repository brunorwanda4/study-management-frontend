"use client";

import {  useState } from "react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
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
import { Option } from "../ui/multiselect";

export const SchoolStaffRoles: Option[] = [
  {
    value: "HeadTeacher",
    label: "Head Teacher",
  },
  {
    value: "DeputyHeadTeacher",
    label: "Deputy Head Teacher",
  },
  {
    value: "DirectorOfStudies",
    label: "Director of Studies", // Often responsible for academic affairs
  },
  {
    value: "HeadOfDepartment",
    label: "Head of Department", // For specific subjects or faculties
  },
  {
    value: "Librarian",
    label: "Librarian",
  },
  {
    value: "SchoolSecretary",
    label: "School Secretary", // Administrative support
  },
  {
    value: "Accountant",
    label: "Accountant", // School finances
  },
  {
    value: "SchoolCounselor",
    label: "School Counselor", // Guidance and counselling
  },
  {
    value: "Janitor",
    label: "Janitor", // Cleaning and maintenance
  },
  {
    value: "SecurityGuard",
    label: "Security Guard", // School security
  },
  {
    value: "Cook",
    label: "Cook", // For schools with feeding programs
  },
  {
    value: "Nurse",
    label: "Nurse", // School health services
  },
  {
    value: "LabTechnician",
    label: "Lab Technician", // For science labs
  },
];

export default function Component() {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  return (
    <div className="*:not-first:mt-2">
      <Label >Select with search</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="bg-background hover:bg-background border-base-300 w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
          >
            <span className={cn("truncate", !value && " ")}>
              {value
                ? SchoolStaffRoles.find((framework) => framework.value === value)
                    ?.label
                : "Select framework"}
            </span>
            <ChevronDownIcon
              size={16}
              className=" /80 shrink-0"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="border-base-300 w-full min-w-[var(--radix-popper-anchor-width)] p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {SchoolStaffRoles.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {framework.label}
                    {value === framework.value && (
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
