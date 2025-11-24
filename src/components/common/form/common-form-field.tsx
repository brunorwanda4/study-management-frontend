"use client";

import {
  FormControl,
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
import type { Control, FieldPath, FieldValues } from "react-hook-form";

interface CommonFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
  type?: string; // HTML input type (text, password, number, etc.)

  // Specific to Select fields
  fieldType?: "input" | "select" | "textarea";
  selectOptions?: { value: string; label: string }[];
}

export function CommonFormField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "",
  disabled = false,
  required = false,
  type = "text",
  fieldType = "input",
  selectOptions = [],
}: CommonFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        // Safe value handling for Select components to avoid uncontrolled/controlled warnings
        const stringValue = field.value?.toString() ?? "";

        return (
          <FormItem className="flex flex-col space-y-2">
            <FormLabel>
              {label} {required && <span className="text-error">*</span>}
            </FormLabel>
            <FormControl>
              {fieldType === "select" ? (
                <Select
                  onValueChange={field.onChange}
                  value={stringValue}
                  disabled={disabled}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          placeholder || `Select ${label.toLowerCase()}`
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {selectOptions.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  {...field}
                  type={type}
                  disabled={disabled}
                  placeholder={placeholder}
                  value={stringValue}
                />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
