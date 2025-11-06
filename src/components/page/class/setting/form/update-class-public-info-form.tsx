"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
// Components
import { FormError, FormSuccess } from "@/components/common/form-message";
import { ImageUpload } from "@/components/common/image-upload";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
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
import { useToast } from "@/lib/context/toast/ToastContext";
import { ClassType } from "@/lib/schema/class/create-class.dto";
import {
  type ClassUpdateDto,
  ClassUpdateSchema,
} from "@/lib/schema/class/update-class-schema";
import type { ClassWithOthers } from "@/lib/schema/relations-schema";

interface UpdateClassPublicInfoFormProps {
  classData: ClassWithOthers;
}

export default function UpdateClassPublicInfoForm({
  classData,
}: UpdateClassPublicInfoFormProps) {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const form = useForm<ClassUpdateDto>({
    resolver: zodResolver(ClassUpdateSchema),
    defaultValues: {
      name: classData.name || undefined,
      code: classData.code || undefined,
      username: classData.username || undefined,
      image: classData.image || undefined,
      classType: classData.type || undefined,
      educationLever: undefined,
      curriculum: undefined,
      // Omit fields that shouldn't be updated like id, createdAt, etc.
    },
    mode: "onChange",
  });

  const handleSubmit = async (data: ClassUpdateDto) => {
    setError(undefined);
    setSuccess(undefined);

    // startTransition(async () => {
    //   try {
    //     const result = await apiRequest<ClassUpdateDto, Class>("put", );

    //     if (result.data) {
    //       setSuccess("Class information updated successfully!");
    //       showToast({
    //         type: "success",
    //         title: "Class update successful 🌻",
    //         description: `${result.data.name} update class successful`,
    //         duration: 4000,
    //       });
    //       // Reset form to new values
    //       form.reset({
    //         ...data,
    //         // Ensure we don't reset to undefined values
    //         name: result.data.name,
    //         code: result.data.code,
    //         username: result.data.username,
    //         image: result.data.image || undefined,
    //         classType: result.data.classType || undefined,
    //         educationLever: result.data.educationLever || undefined,
    //         curriculum: result.data.curriculum || undefined,
    //       });
    //     } else {
    //       throw new Error(
    //         result.message || "Failed to update class information",
    //       );
    //     }
    //   } catch (error) {
    //     const errorMessage =
    //       error instanceof Error ? error.message : "An unknown error occurred";
    //     showToast({
    //       type: "error",
    //       title: "Something went wrong to update class 🌋",
    //       description: errorMessage,
    //       duration: 3000,
    //     });
    //     setError(errorMessage);
    //   }
    // });
  };

  const renderFormField = (
    name: keyof ClassUpdateDto,
    label: string,
    placeholder: string,
    isRequired = false,
    isSelect = false,
    selectItems?: { value: string; label: string }[],
  ) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        // Convert field value to string if it's a Date or other non-string type
        const stringValue = field.value?.toString() ?? "";

        return (
          <FormItem className="flex flex-col space-y-2">
            <FormLabel>
              {label} {isRequired && "*"}
            </FormLabel>
            <FormControl>
              {isSelect ? (
                <Select
                  onValueChange={field.onChange}
                  value={stringValue}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={`Select ${label.toLowerCase()}`}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {selectItems?.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  disabled={isPending}
                  placeholder={placeholder}
                  {...field}
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

  return (
    <Card className="p-4">
      <CardHeader className="border-b-0">
        <CardTitle>Class public information</CardTitle>
      </CardHeader>

      <Form {...form}>
        <form
          className="w-full space-y-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="space-y-4 md:flex md:space-y-0 md:space-x-4">
            {/* Left Column */}
            <div className="space-y-4 md:w-1/2">
              {renderFormField("name", "Class Name", "Enter class name", true)}
              {renderFormField("code", "Class Code", "Enter class code", true)}
              {renderFormField(
                "username",
                "Class Username",
                "Enter class username",
                true,
              )}

              {renderFormField(
                "classType",
                "Class Type",
                "Select class type",
                false,
                true,
                Object.values(ClassType).map((type) => ({
                  value: type,
                  label: type,
                })),
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-4 md:w-1/2">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-2">
                    <FormLabel>Class Image</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value?.toString() ?? ""}
                        onChange={field.onChange}
                        disabled={isPending}
                        className="w-full"
                        imageClassName="h-32 w-32 rounded-lg border-2"
                        maxSize={3 * 1024 * 1024}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {renderFormField(
                "educationLever",
                "Education Level",
                "Enter education level",
              )}
              {renderFormField("curriculum", "Curriculum", "Enter curriculum")}
            </div>
          </div>

          <div>
            <FormError message={error} />
            <FormSuccess message={success} />
          </div>

          <Button
            disabled={
              isPending ||
              (!form.formState.isDirty && !form.formState.isSubmitSuccessful)
            }
            library="daisy"
            variant="info"
            type="submit"
          >
            {isPending ? "Updating..." : "Update Class Information"}
          </Button>
        </form>
      </Form>
    </Card>
  );
}
