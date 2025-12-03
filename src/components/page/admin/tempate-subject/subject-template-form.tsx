"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/lib/context/toast/ToastContext";
import { TemplateSubjectSchema } from "@/lib/schema/subject/template-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

export const createTemplateSubjectSchema = TemplateSubjectSchema.pick({
  name: true,
  description: true,
  code: true,
  category: true,
  estimated_hours: true,
  credits: true,
  prerequisites: true,
  topics: true,
  created_by: true,
});

export type createTemplateSubject = z.infer<typeof createTemplateSubjectSchema>;

const SubjectTemplateForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const form = useForm<createTemplateSubject>({
    resolver: zodResolver(createTemplateSubjectSchema),
    defaultValues: {
      name: "",
      description: "",
      code: "",
      estimated_hours: "",
      category: undefined,
      topics: [],
    },
  });

  const onSubject = (values: createTemplateSubject) => {};
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubject)}>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className=" flex flex-col gap-4">
            <CommonFormField
              label="Name"
              name="name"
              type="text"
              fieldType="input"
              placeholder="Subject name..."
              required
              control={form.control}
            />
            <CommonFormField
              label="Description"
              name="description"
              type="text"
              fieldType="textarea"
              placeholder="Description..."
              control={form.control}
            />
          </div>
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button
          variant={"info"}
          type="submit"
          disabled={isPending}
          className="w-full sm:w-auto"
          library={"daisy"}
          role={isPending ? "loading" : undefined}
        >
          Create template subject
        </Button>
      </form>
    </Form>
  );
};

export default SubjectTemplateForm;
