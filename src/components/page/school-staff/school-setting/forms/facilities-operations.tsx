// components/forms/facilities-operations.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MultipleSelector from "@/components/ui/multiselect";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AttendanceSystems } from "@/lib/const/common-details-const";
import {
  SchoolSportsExtracurricular,
  schoolLabs,
} from "@/lib/context/school.context";
import type { Option } from "@/lib/schema/common-details-schema";
import {
  type FacilitiesOperationsDto,
  FacilitiesOperationsSchema,
} from "./schema/facilities-operations";

interface FacilitiesOperationsFormProps {
  initialData: FacilitiesOperationsDto;
}

const stringsToOptions = (items: string[] | null | undefined): Option[] => {
  if (!items) return [];
  return items.map((item) => ({ label: item, value: item }));
};

const optionsToStrings = (options: Option[] | null | undefined): string[] => {
  if (!options) return [];
  return options.map((option) => option.value);
};

export const FacilitiesOperationsForm = ({
  initialData,
}: FacilitiesOperationsFormProps) => {
  const [error, setError] = useState<string | null>("");
  const [isPending, startTransition] = useState(false);
  const { theme } = useTheme();

  const form = useForm<FacilitiesOperationsDto>({
    resolver: zodResolver(FacilitiesOperationsSchema),
    defaultValues: {
      studentCapacity: initialData?.studentCapacity ?? undefined,
      uniformRequired: initialData?.uniformRequired ?? undefined,
      attendanceSystem: initialData?.attendanceSystem ?? undefined,
      scholarshipAvailable: initialData?.scholarshipAvailable ?? undefined,
      classrooms: initialData?.classrooms ?? undefined,
      library: initialData?.library ?? undefined,
      labs: initialData?.labs ?? [],
      sportsExtracurricular: initialData?.sportsExtracurricular ?? [],
      onlineClasses: initialData?.onlineClasses ?? undefined,
    },
  });

  const handleSubmit = (values: FacilitiesOperationsDto) => {
    setError(null);
    startTransition(true);

    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="space-y-6">
          <h3 className="mb-4 border-b pb-2 text-xl font-semibold">
            Facilities & Operations
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FormField
              control={form.control}
              name="studentCapacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Capacity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      placeholder="Total student capacity"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? undefined
                            : parseInt(e.target.value, 10),
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="classrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Classrooms</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      placeholder="Number of classrooms"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? undefined
                            : parseInt(e.target.value, 10),
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="attendanceSystem"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attendance System</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select attendance system" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent data-theme={theme}>
                      {AttendanceSystems.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="uniformRequired"
              render={({ field }) => (
                <FormItem className="space-y-3 pt-2">
                  <FormLabel>Uniform Required?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                      value={
                        field.value === undefined
                          ? undefined
                          : String(field.value)
                      }
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-y-0 space-x-2">
                        <FormControl>
                          <RadioGroupItem value="true" id="uniform-yes" />
                        </FormControl>
                        <Label htmlFor="uniform-yes" className="font-normal">
                          Yes
                        </Label>
                      </FormItem>
                      <FormItem className="flex items-center space-y-0 space-x-2">
                        <FormControl>
                          <RadioGroupItem value="false" id="uniform-no" />
                        </FormControl>
                        <Label htmlFor="uniform-no" className="font-normal">
                          No
                        </Label>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="scholarshipAvailable"
              render={({ field }) => (
                <FormItem className="space-y-3 pt-2">
                  <FormLabel>Scholarships Available?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                      value={
                        field.value === undefined
                          ? undefined
                          : String(field.value)
                      }
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-y-0 space-x-2">
                        <FormControl>
                          <RadioGroupItem value="true" id="scholarship-yes" />
                        </FormControl>
                        <Label
                          htmlFor="scholarship-yes"
                          className="font-normal"
                        >
                          Yes
                        </Label>
                      </FormItem>
                      <FormItem className="flex items-center space-y-0 space-x-2">
                        <FormControl>
                          <RadioGroupItem value="false" id="scholarship-no" />
                        </FormControl>
                        <Label htmlFor="scholarship-no" className="font-normal">
                          No
                        </Label>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="library"
              render={({ field }) => (
                <FormItem className="space-y-3 pt-2">
                  <FormLabel>Library Available?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                      value={
                        field.value === undefined
                          ? undefined
                          : String(field.value)
                      }
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-y-0 space-x-2">
                        <FormControl>
                          <RadioGroupItem value="true" id="library-yes" />
                        </FormControl>
                        <Label htmlFor="library-yes" className="font-normal">
                          Yes
                        </Label>
                      </FormItem>
                      <FormItem className="flex items-center space-y-0 space-x-2">
                        <FormControl>
                          <RadioGroupItem value="false" id="library-no" />
                        </FormControl>
                        <Label htmlFor="library-no" className="font-normal">
                          No
                        </Label>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="onlineClasses"
              render={({ field }) => (
                <FormItem className="space-y-3 pt-2">
                  <FormLabel>Online Classes Offered?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                      value={
                        field.value === undefined
                          ? undefined
                          : String(field.value)
                      }
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-y-0 space-x-2">
                        <FormControl>
                          <RadioGroupItem value="true" id="online-yes" />
                        </FormControl>
                        <Label htmlFor="online-yes" className="font-normal">
                          Yes
                        </Label>
                      </FormItem>
                      <FormItem className="flex items-center space-y-0 space-x-2">
                        <FormControl>
                          <RadioGroupItem value="false" id="online-no" />
                        </FormControl>
                        <Label htmlFor="online-no" className="font-normal">
                          No
                        </Label>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="labs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Labs Available</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      value={stringsToOptions(field.value)}
                      onChange={(options) =>
                        field.onChange(optionsToStrings(options))
                      }
                      defaultOptions={schoolLabs}
                      placeholder="Select labs..."
                      creatable
                      hidePlaceholderWhenSelected
                    />
                  </FormControl>
                  <FormDescription>
                    Select or add available lab types.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sportsExtracurricular"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sports & Extracurricular</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      value={stringsToOptions(field.value)}
                      onChange={field.onChange}
                      defaultOptions={SchoolSportsExtracurricular}
                      placeholder="Select activities..."
                      creatable
                      hidePlaceholderWhenSelected
                    />
                  </FormControl>
                  <FormDescription>
                    Select or add sports/activities offered.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" className="w-full md:w-auto" disabled={isPending}>
          {isPending ? "Saving..." : "Save Facilities & Operations"}
        </Button>
      </form>
    </Form>
  );
};
