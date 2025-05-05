// components/forms/academic-details.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useTheme } from "next-themes";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import MultipleSelector, { Option } from "@/components/ui/multiselect";
import { schoolEducationLevel } from "@/lib/context/school.context";
import { AffiliationTypeEnum } from "@/lib/schema/school.dto";
import { AcademicDetailsDto, AcademicDetailsSchema } from "./schema/academic-details";

interface AcademicDetailsFormProps {
  initialData: AcademicDetailsDto;
}

const stringsToOptions = (items: string[] | null | undefined): Option[] => {
  if (!items) return [];
  return items.map((item) => ({ label: item, value: item }));
};

const optionsToStrings = (options: Option[] | null | undefined): string[] => {
  if (!options) return [];
  return options.map((option) => option.value);
};

export const AcademicDetailsForm = ({
  initialData,
}: AcademicDetailsFormProps) => {
  const [error, setError] = useState<string | null>("");
  const [isPending, startTransition] = useState(false);
  const { theme } = useTheme();

  const form = useForm<AcademicDetailsDto>({
    resolver: zodResolver(AcademicDetailsSchema),
    defaultValues: {
      curriculum: initialData?.curriculum ?? [],
      educationLevel: initialData?.educationLevel ?? [],
      accreditationNumber: initialData?.accreditationNumber ?? undefined,
      affiliation: initialData?.affiliation ?? undefined,
    },
  });

  const handleSubmit = (values: AcademicDetailsDto) => {
    setError(null);
    startTransition(true);

    console.log(values)
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="space-y-6">
          <h3 className="text-xl font-semibold mb-4 border-b pb-2">
            Academic Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="educationLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Education Levels Offered</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      value={stringsToOptions(field.value)}
                      onChange={(options) =>
                        field.onChange(optionsToStrings(options))
                      }
                      defaultOptions={schoolEducationLevel}
                      placeholder="Select levels..."
                      creatable
                      hidePlaceholderWhenSelected
                    />
                  </FormControl>
                  <FormDescription>
                    Select or add education levels provided.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="accreditationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Accreditation Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Optional accreditation number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="affiliation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Affiliation</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select school affiliation" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent data-theme={theme}>
                      {AffiliationTypeEnum?.options?.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      )) ?? (
                        <SelectItem value="none" disabled>
                          No affiliations defined
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" className="w-full md:w-auto" disabled={isPending}>
          {isPending ? "Saving..." : "Save Academic Details"}
        </Button>
      </form>
    </Form>
  );
};
