"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError, FormSuccess } from "@/components/myComponents/form-message";
import { ClassDto, ClassSchema } from "@/lib/schema/class/class.schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClassType } from "@/lib/schema/class/create-class.dto";
import { ImageUpload } from "@/components/myComponents/image-upload";
import { Card } from "@/components/ui/card";

interface Props {
  classData: ClassDto;
}

export default function UpdateClassPublicInfoForm({
  classData,
}: Props) {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<ClassDto>({
    resolver: zodResolver(ClassSchema),
    defaultValues: {
      ...classData,
      schoolId: classData.schoolId || undefined,
      creatorId: classData.creatorId || undefined,
      image: classData.image || undefined,
      classType: classData.classType || undefined,
      educationLever: classData.educationLever || undefined,
      curriculum: classData.curriculum || undefined,
      classTeacherId: classData.classTeacherId || undefined,
    },
    mode: "onChange",
  });

  async function onSubmit(data: ClassDto) {
    setError(undefined);
    setSuccess(undefined);

    startTransition(async () => {
    //   const result = await updateClassPublicInfo(data);
    //   if (result.data) {
    //     setSuccess("Class information updated successfully!");
    //     if (onSuccess) {
    //       onSuccess(result.data);
    //     }
    //   } else {
    //     setError(result.message || "Failed to update class information");
    //   }
    });

    console.log(data)
  }

  return (
    <Card className=" p-4">
      <Form {...form}>
      <form
        className="w-full space-y-4 flex flex-col"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* Class Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-2 flex flex-col">
              <FormLabel>Class Name *</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="Enter class name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Class Code Field */}
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem className="space-y-2 flex flex-col">
              <FormLabel>Class Code *</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="Enter class code"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Class Username Field */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="space-y-2 flex flex-col">
              <FormLabel>Class Username *</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="Enter class username"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Class Type Field */}
        <FormField
          control={form.control}
          name="classType"
          render={({ field }) => (
            <FormItem className="space-y-2 flex flex-col">
              <FormLabel>Class Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value || ""}
                disabled={isPending}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(ClassType).map((type) => (
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

        {/* Education Level Field */}
        <FormField
          control={form.control}
          name="educationLever"
          render={({ field }) => (
            <FormItem className="space-y-2 flex flex-col">
              <FormLabel>Education Level</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="Enter education level"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Curriculum Field */}
        <FormField
          control={form.control}
          name="curriculum"
          render={({ field }) => (
            <FormItem className="space-y-2 flex flex-col">
              <FormLabel>Curriculum</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="Enter curriculum"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image Upload Field */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="space-y-2 flex flex-col">
              <FormLabel>Class Image</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value || ""}
                  onChange={field.onChange}
                  disabled={isPending}
                  className="w-full"
                  imageClassName="h-32 w-32 rounded-lg border-2 "
                  maxSize={3 * 1024 * 1024} // 3MB for this specific case
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Error/Success Messages */}
        <div className="">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>

        <Button disabled={isPending} className="w-full" type="submit">
          {isPending ? "Updating..." : "Update Class Information"}
        </Button>
      </form>
    </Form>
    </Card>
  );
}
