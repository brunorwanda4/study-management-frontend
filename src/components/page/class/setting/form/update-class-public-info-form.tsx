"use client";

import { CommonFormField } from "@/components/common/form/common-form-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ClassSchema } from "@/lib/schema/class/class-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

export const UpdateClassPublicInfoSchema = ClassSchema.pick({
  name: true,
  description: true,
  capacity: true,
  image: true,
}).partial();

export type UpdateClassPublicInfo = z.infer<typeof UpdateClassPublicInfoSchema>;

interface UpdateClassPublicInfoProps {
  cls?: any;
}

const UpdateClassPublicInfo = ({ cls }: UpdateClassPublicInfoProps) => {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<UpdateClassPublicInfo>({
    resolver: zodResolver(UpdateClassPublicInfoSchema),
    defaultValues: {
      name: cls?.name,
      description: cls?.description,
      capacity: cls?.capacity,
      image: cls?.image,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const handleSubmit = (data: UpdateClassPublicInfo) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className=" flex flex-col gap-4">
            <CommonFormField
              control={form.control}
              name="name"
              label="Class Name"
              placeholder="Enter class name"
              type="input"
              required
              disabled={isPending}
              description="Class name may appear around School where you contribute or are mentioned. You can remove it at
              any time."
            />
            <CommonFormField
              control={form.control}
              name="description"
              label="Description"
              placeholder="class description..."
              required
              disabled={isPending}
              fieldType="textarea"
            />
            <CommonFormField
              control={form.control}
              name="capacity"
              label="Capacity"
              placeholder="class description..."
              required
              type="number"
              description="This is the maximum number of students that can be enrolled in the class."
              disabled={isPending}
            />
          </div>
          <div>
            <CommonFormField
              control={form.control}
              name="image"
              label="Image"
              placeholder="Upload class image"
              required
              disabled={isPending}
              fieldType="avatar"
              description="Upload a class image"
            />
          </div>
        </div>
        <Button
          library="daisy"
          type="submit"
          role={isPending ? "loading" : undefined}
          variant={"info"}
          disabled={isPending}
        >
          Update Class
        </Button>
      </form>
    </Form>
  );
};

export default UpdateClassPublicInfo;
