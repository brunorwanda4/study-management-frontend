// components/forms/basic-information.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChangeEvent, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import MyImage from "@/components/myComponents/myImage";
import { schoolLogoImage } from "@/lib/context/images";
import { SchoolMembers, SchoolTypeEnum } from "@/lib/schema/school.dto";
import { BasicInformationDto, BasicInformationSchema } from "./schema/basic-information";

interface BasicInformationFormProps {
  initialData: BasicInformationDto;
}

export const BasicInformationForm = ({
  initialData,
}: BasicInformationFormProps) => {
  const [error, setError] = useState<string | null>("");
  const [isPending, startTransition] = useState(false);
  const { theme } = useTheme();

  const form = useForm<BasicInformationDto>({
    resolver: zodResolver(BasicInformationSchema),
    defaultValues: {
      logo: initialData?.logo ?? undefined,
      name: initialData?.name ?? undefined,
      username: initialData?.username ?? undefined,
      description: initialData?.description ?? undefined,
      schoolType: initialData?.schoolType ?? undefined,
      schoolMembers: initialData?.schoolMembers ?? undefined,
    },
  });

  const handleLogoChange = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    setError("");
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (!file.type.includes("image")) {
        return setError("Please select an image file for the logo.");
      }
      const maxSizeInBytes = 2 * 1024 * 1024; // 2MB limit
      if (file.size > maxSizeInBytes) {
        return setError("Logo image size should be less than 2MB.");
      }
      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleSubmit = (values: BasicInformationDto) => {
    setError(null);
    startTransition(true);

    console.log(values)
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="space-y-6">
          <h3 className="text-xl font-semibold mb-4 border-b pb-2">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Green Hills Academy" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School Username</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., greenhills" {...field} />
                  </FormControl>
                  <FormDescription>
                    Unique identifier (usually cannot be changed).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="schoolType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value ?? ""}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select school type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent data-theme={theme}>
                      {SchoolTypeEnum.options.map((type) => (
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
              name="schoolMembers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Body</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value ?? ""}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select student body type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent data-theme={theme}>
                      {SchoolMembers.options.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Gender mix of students the school accepts.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem className="mt-4 flex flex-col gap-2">
                <FormLabel>School Logo</FormLabel>
                <div className="flex items-center gap-4">
                  <Label htmlFor="logo-upload" className="cursor-pointer">
                    <MyImage
                      src={field.value || schoolLogoImage}
                      className="size-24 border rounded"
                      classname="object-contain"
                      alt="School Logo Preview"
                    />
                  </Label>
                  <FormControl>
                    <Input
                      id="logo-upload"
                      disabled={isPending}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onClick={(e) => (e.currentTarget.value = "")}
                      onChange={(e) => handleLogoChange(e, field.onChange)}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById("logo-upload")?.click()}
                    disabled={isPending}
                  >
                    {field.value ? "Change Logo" : "Upload Logo"}
                  </Button>
                  {field.value && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => field.onChange(undefined)}
                      disabled={isPending}
                      className="text-destructive hover:text-destructive"
                    >
                      Remove
                    </Button>
                  )}
                </div>
                <FormDescription>
                  Max 2MB. Recommended: square aspect ratio.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about the school"
                    className="resize-y min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full md:w-auto" disabled={isPending}>
          {isPending ? "Saving..." : "Save Basic Information"}
        </Button>
      </form>
    </Form>
  );
};