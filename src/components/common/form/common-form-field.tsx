"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, type inputProps } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import UploadImage, { type updateImageProps } from "../cards/form/upload-image";
import { UploadAvatar, type UploadAvatarProps } from "./avatar-upload";

interface CommonFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
  type?: string;
  className?: string;
  classname?: string;

  fieldType?: "input" | "select" | "textarea" | "image" | "avatar" | "checkbox";
  selectOptions?: { value: string; label: string }[];

  // components props
  imageProps?: updateImageProps;
  inputProps?: inputProps;
  avatarProps?: Pick<UploadAvatarProps, "avatarProps">;
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
  description,
  className,
  classname,
  imageProps,
  inputProps,
  avatarProps = { avatarProps: { size: "3xl" } },
}: CommonFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const stringValue = field.value?.toString() ?? "";

        // Decide what to render based on fieldType
        const renderField = () => {
          switch (fieldType) {
            case "textarea":
              return (
                <Textarea
                  {...field}
                  disabled={disabled}
                  placeholder={placeholder}
                  value={stringValue}
                  className={className}
                />
              );

            case "image":
              return (
                <UploadImage
                  value={stringValue}
                  disabled={disabled}
                  onChange={field.onChange}
                  description={imageProps?.description}
                  {...imageProps}
                />
              );

            case "avatar":
              return (
                <UploadAvatar
                  value={stringValue}
                  disabled={disabled}
                  onChange={field.onChange}
                  description={description}
                  {...avatarProps}
                />
              );

            case "select":
              return (
                <Select
                  onValueChange={field.onChange}
                  value={stringValue}
                  disabled={disabled}
                >
                  <FormControl>
                    <SelectTrigger className={className}>
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
              );

            case "checkbox":
              return (
                <Checkbox
                  {...field}
                  disabled={disabled}
                  value={stringValue}
                  className={className}
                />
              );

            default:
              return (
                <Input
                  {...field}
                  type={type}
                  disabled={disabled}
                  placeholder={placeholder}
                  value={stringValue}
                  className={className}
                  {...inputProps}
                />
              );
          }
        };

        return (
          <FormItem
            className={cn(
              "flex flex-col ",
              fieldType === "checkbox" && " flex flex-row-reverse w-fit",
              classname,
            )}
          >
            <FormLabel>
              {label} {required && <span className="text-error">*</span>}
            </FormLabel>

            <FormControl>{renderField()}</FormControl>
            <FormMessage />
            {description && <FormDescription>{description}</FormDescription>}
          </FormItem>
        );
      }}
    />
  );
}
