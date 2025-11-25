"use client";

import { CommonFormField } from "@/components/common/form/common-form-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ClassStudentSettingsSchema } from "@/lib/schema/class/class-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

const ClassStudentPermissionsSchema =
  ClassStudentSettingsSchema.shape.permissions;
type ClassStudentPermissions = z.infer<typeof ClassStudentPermissionsSchema>;

const ClassStudentPermissionForm = () => {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<ClassStudentPermissions>({
    resolver: zodResolver(ClassStudentPermissionsSchema),
    defaultValues: {
      can_chat: false,
      can_upload_homework: true,
      can_comment: true,
      can_view_all_students: true,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = (values: ClassStudentPermissions) => {
    setError("");
    setSuccess("");
    console.log(values);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col gap-8"
      >
        <div className=" flex flex-col gap-4">
          <CommonFormField
            label="Can chat in class group"
            name="can_chat"
            type="checkbox"
            fieldType="checkbox"
            control={form.control}
          />
          <CommonFormField
            label="Can comment"
            name="can_comment"
            type="checkbox"
            fieldType="checkbox"
            control={form.control}
          />
          <CommonFormField
            label="Can upload class work"
            name="can_upload_homework"
            type="checkbox"
            fieldType="checkbox"
            control={form.control}
          />
          <CommonFormField
            label="Can view all students"
            name="can_view_all_students"
            type="checkbox"
            fieldType="checkbox"
            control={form.control}
          />
        </div>
        <Button
          variant={"info"}
          disabled={isPending}
          role={isPending ? "loading" : undefined}
          library="daisy"
          className=" w-fit"
        >
          Save changes
        </Button>
      </form>
    </Form>
  );
};

export default ClassStudentPermissionForm;
