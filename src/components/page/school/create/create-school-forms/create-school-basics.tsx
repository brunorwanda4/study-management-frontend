"use client";

import {
  FormMessageError,
  FormMessageSuccess,
} from "@/components/auth/forms/form-message";
import MyImage from "@/components/my-components/myImage";
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
import { cn } from "@/lib/utils";
import {
  CreateSchoolSchema,
  CreateSchoolTypes,
} from "@/utils/schema/school-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

const CreateSchoolBasics = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<undefined | null | string>("");
  const [success, setSuccess] = useState<undefined | null | string>("");
  const form = useForm<CreateSchoolTypes>({
    resolver: zodResolver(CreateSchoolSchema),
    defaultValues: {
      name: "",
      description: "",
      type: undefined,
      crriculum: undefined,
      education_levels: undefined,
      affiliation: undefined,
      logo: "",
      school_members: undefined,
    },
  });

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    setError("");
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // Check if the file is an image
      if (!file.type.includes("image")) {
        return setError("Please select an image file");
      }

      // Check if the file size is greater than 2MB (2MB = 2 * 1024 * 1024 bytes)
      const maxSizeInBytes = 2 * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        return setError(
          "Sorry your image it to high try other image which is not less than 2MB!."
        );
      }

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const handleOnSubmit = (values: CreateSchoolTypes) => {
    setError(null);
    setSuccess(null);
    startTransition(() => {
      console.log(values);
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)}>
        <div className=" flex space-x-4 justify-between  w-full">
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={isPending}
                      placeholder="(e.g., Excella international school school)"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Your school name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem className={cn("flex gap-2 items-center")}>
                <FormLabel
                  htmlFor="image"
                  className={cn("flex flex-col")}
                >
                  <div className=" gap-3 items-center">
                  <MyImage
                    src={field.value ? field.value : "/1.jpg"}
                    className={cn("size-24")}
                    classname=" card"
                    alt="Profile"
                  />
                  <span
                    className={cn(
                      "cursor-pointer",
                      !field.value && "text-info"
                    )}
                  >
                    School Logo
                  </span>
                  </div>
                </FormLabel>
                <FormControl>
                  <div className={cn("flex flex-col")}>
                    <Input
                      disabled={isPending}
                      type="file"
                      id="image"
                      accept="image/*"
                      placeholder="Add profile photo"
                      className={cn(
                        "border-none outline-none bg-transparent hidden"
                      )}
                      onChange={(e) => handleImage(e, field.onChange)}
                    />
                  </div>
                </FormControl>
                <FormDescription>Logo school use</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className=" mt-2">
          <FormMessageError message={error} />
          <FormMessageSuccess message={success} />
        </div>
      </form>
    </Form>
  );
};

export default CreateSchoolBasics;
