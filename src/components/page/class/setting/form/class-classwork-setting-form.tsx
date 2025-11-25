"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ClassStudentSettingsSchema } from "@/lib/schema/class/class-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

const ClassClassworkSettingSchema =
  ClassStudentSettingsSchema.shape.classwork_rules;
type ClassClassworkSetting = z.infer<typeof ClassClassworkSettingSchema>;

const ClassClassworkSettingForm = () => {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [isPending] = useTransition();

  const form = useForm<ClassClassworkSetting>({
    resolver: zodResolver(ClassClassworkSettingSchema),
    defaultValues: {
      allow_resubmission: true,
      max_late_days: "3",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = (values: ClassClassworkSetting) => {
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
            label="Allow resubmission"
            name="allow_resubmission"
            type="checkbox"
            fieldType="checkbox"
            control={form.control}
          />
          <div className=" w-30">
            <CommonFormField
              label="Max late days"
              name="max_late_days"
              type="number"
              fieldType="input"
              className=" w-full"
              inputProps={{
                numberMode: "day",
                numberProps: { minValue: 1, maxValue: 10 },
              }}
              control={form.control}
            />
          </div>
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

export default ClassClassworkSettingForm;
