"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChangeEvent, useState, useTransition } from "react";
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
import {
  BasicInformationDto,
  BasicInformationSchema,
} from "./schema/basic-information";
import { Card } from "@/components/ui/card";
import { updateSchoolSchoolService } from "@/service/school/school.service";
import { useToast } from "@/lib/context/toast/ToastContext";
import { FormError } from "@/components/myComponents/form-message";

interface BasicInformationFormProps {
  initialData: BasicInformationDto;
  schoolId: string;
}

export const BasicInformationForm = ({
  initialData,
  schoolId,
}: BasicInformationFormProps) => {
  const [error, setError] = useState<string | null>("");
  const [isPending, startTransition] = useTransition();
  const { theme } = useTheme();
  const { showToast } = useToast();

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
    startTransition(async () => {
      const res = await updateSchoolSchoolService(schoolId, values);
      if (res.data) {
        showToast({
          type: "success",
          title: "To update school basic information success!",
          description: "You have been update school basic information",
          duration: 3000,
        });
      } else {
        showToast({
          type: "error",
          title: "Some thing went wrong to update school information",
          description: res.message,
          duration: 4000,
        });
      }
    });
  };

  return (
    <Card className=" p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className=" space-y-4">
          <h3 className="text-xl font-semibold mb-4 pb-2">
            Basic Information
          </h3>
          <div className="space-x-6 flex w-full">
            <div className="flex flex-col space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School Name</FormLabel>
                    <FormControl>
                      <Input
                        className=" w-[30rem]"
                        placeholder="e.g., Green Hills Academy"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Full legal or commonly used name of your school.
                    </FormDescription>
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
                      <Input
                        className=" w-[30rem]"
                        placeholder="e.g., greenhills"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Unique identifier for the school. Used in URLs or login;
                      usually cannot be changed later.
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
                    <Select
                      onValueChange={field.onChange}
                      value={field.value ?? ""}
                    >
                      <FormControl>
                        <SelectTrigger className=" w-40">
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
                    <FormDescription>
                      Defines the educational level or specialization of your
                      institution (e.g., Primary, Secondary, Vocational).
                    </FormDescription>
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
                    <Select
                      onValueChange={field.onChange}
                      value={field.value ?? ""}
                    >
                      <FormControl>
                        <SelectTrigger className=" w-40">
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
                      Gender composition of students your school enrolls (e.g.,
                      Co-educational, Boys only, Girls only).
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
                        className="resize-y min-h-[100px] w-[30rem]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide an overview including history, values, mission, or
                      key achievements.
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
                <FormItem className="mt-4 flex flex-col gap-2 items-center">
                  <FormLabel>School Logo</FormLabel>
                  <div className="flex items-center gap-4 flex-col">
                    <Label htmlFor="logo-upload" className="cursor-pointer">
                      <MyImage
                        src={field.value || schoolLogoImage}
                        className="size-48 border border-base-300 shadow-sm"
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
                      onClick={() =>
                        document.getElementById("logo-upload")?.click()
                      }
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
                    Upload your school’s logo (max 2MB). Preferably square
                    dimensions for best display.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <Button
            type="submit"
            className="w-full md:w-auto"
            library={"daisy"}
            variant={"info"}
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save Basic Information"}
          </Button>
        </form>
      </Form>
    </Card>
  );
};
