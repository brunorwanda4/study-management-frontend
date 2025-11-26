"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ClassTeachersSettingsSchema } from "@/lib/schema/class/class-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

const ClassTeacherPermissionsSchema =
  ClassTeachersSettingsSchema.shape.permissions;
type ClassTeacherPermissions = z.infer<typeof ClassTeacherPermissionsSchema>;

const ClassTeacherPermissionForm = () => {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<ClassTeacherPermissions>({
    resolver: zodResolver(ClassTeacherPermissionsSchema),
    defaultValues: {
      can_edit_marks: true,
      can_take_attendance: true,
      can_remove_students: true,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = (values: ClassTeacherPermissions) => {
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
            label="Can edit marks"
            name="can_edit_marks"
            type="checkbox"
            fieldType="checkbox"
            control={form.control}
          />
          <CommonFormField
            label="Can take attendance"
            name="can_take_attendance"
            type="checkbox"
            fieldType="checkbox"
            control={form.control}
          />
          <CommonFormField
            label="can remove students"
            name="can_remove_students"
            type="checkbox"
            fieldType="checkbox"
            control={form.control}
          />
        </div>
        {(error || success) && (
          <div className=" flex flex-col">
            <FormError message={error} />
            <FormSuccess message={success} />
          </div>
        )}
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

export default ClassTeacherPermissionForm;
