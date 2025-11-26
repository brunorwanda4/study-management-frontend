"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ClassClassTeacherSettingsSchema } from "@/lib/schema/class/class-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

const ClassClassTeacherPermissionsSchema =
  ClassClassTeacherSettingsSchema.shape.allowed_actions;
type ClassClassTeacherPermissions = z.infer<
  typeof ClassClassTeacherPermissionsSchema
>;

const ClassClassTeacherPermissionForm = () => {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<ClassClassTeacherPermissions>({
    resolver: zodResolver(ClassClassTeacherPermissionsSchema),
    defaultValues: {
      can_edit_class_info: true,
      can_add_students: true,
      can_remove_students: true,
      can_manage_subjects: true,
      can_manage_timetable: false,
      can_assign_roles: true,
      can_send_parent_notifications: true,
      can_add_teachers: true,
      can_approve_requests: true,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = (values: ClassClassTeacherPermissions) => {
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
            label="Can edit class info"
            name="can_edit_class_info"
            type="checkbox"
            fieldType="checkbox"
            control={form.control}
          />
          <CommonFormField
            label="Can add students"
            name="can_add_students"
            type="checkbox"
            fieldType="checkbox"
            control={form.control}
          />
          <CommonFormField
            label="Can remove students"
            name="can_remove_students"
            type="checkbox"
            fieldType="checkbox"
            control={form.control}
          />
          <CommonFormField
            label="Can approve requests"
            name="can_approve_requests"
            type="checkbox"
            fieldType="checkbox"
            control={form.control}
          />
          <CommonFormField
            label="Can manage subjects"
            name="can_manage_subjects"
            type="checkbox"
            fieldType="checkbox"
            control={form.control}
          />
          <CommonFormField
            label="Can manage timetable"
            name="can_manage_timetable"
            type="checkbox"
            fieldType="checkbox"
            control={form.control}
          />
          <CommonFormField
            label="Can assign roles"
            name="can_assign_roles"
            type="checkbox"
            fieldType="checkbox"
            control={form.control}
          />
          <CommonFormField
            label="Can send parent notifications"
            name="can_send_parent_notifications"
            type="checkbox"
            fieldType="checkbox"
            control={form.control}
          />
          <CommonFormField
            label="Can add teachers"
            name="can_add_teachers"
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

export default ClassClassTeacherPermissionForm;
