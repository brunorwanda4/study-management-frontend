"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { TopicsInput } from "@/components/page/admin/subjects/topics-input";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { SubjectCategories } from "@/lib/const/common-details-const";
import { useToast } from "@/lib/context/toast/ToastContext";
import type { MainClassModel } from "@/lib/schema/admin/main-classes-schema";
import {
  type TemplateSubject,
  TemplateSubjectSchema,
  type TemplateTopic,
} from "@/lib/schema/subject/template-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
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

interface props {
  mainClass?: MainClassModel;
  auth: AuthContext;
  sub?: TemplateSubject;
}

const SubjectTemplateForm = ({ mainClass, auth, sub }: props) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const [mainClasses, setMainClasses] = useState<MainClassModel[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  useEffect(() => {
    const fetchMainClasses = async () => {
      try {
        const [classes] = await Promise.all([
          !mainClass
            ? apiRequest<void, MainClassModel[]>(
                "get",
                "/main-classes",
                undefined,
                { token: auth.token },
              )
            : { data: [] },
        ]);

        if (classes.data) {
          setMainClasses(classes.data);
        }
      } catch (error) {
        showToast({
          title: "Error to get main class or main subjects",
          description: `"Failed to fetch main classes:", ${error}`,
          type: "error",
        });
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchMainClasses();
  }, [auth.token, showToast, mainClass]);

  const form = useForm<createTemplateSubject>({
    resolver: zodResolver(createTemplateSubjectSchema),
    defaultValues: {
      name: sub?.name ? sub.name : "",
      description: sub?.description ? sub.description : "",
      code: sub?.code ? sub.code : "",
      estimated_hours: sub?.estimated_hours ? sub.estimated_hours : "",
      category: sub?.category ? sub.category : undefined,
      topics: sub?.topics ? sub.topics : [],
      created_by: auth.user.id,
      credits: sub?.credits ? sub.credits : "60",
      prerequisites: sub?.prerequisites ? sub.prerequisites : [],
    },
    mode: "onChange",
  });

  const onSubject = (values: createTemplateSubject) => {
    setError("");
    setSuccess("");

    const transformTopic = (topic: TemplateTopic): any => {
      return {
        order: topic.order,
        title: topic.title,

        estimated_hours: topic.estimated_hours
          ? Number(topic.estimated_hours)
          : undefined,

        credits: topic.credits ? Number(topic.credits) : undefined,
        description: topic.description ? topic.description : "",

        subtopics: topic.subtopics?.length
          ? topic.subtopics.map(transformTopic)
          : undefined,
      };
    };

    startTransition(async () => {
      const apiData = {
        ...values,

        prerequisites: values.prerequisites?.map((p) => p.value),

        estimated_hours: Number(values.estimated_hours),
        credits: values.credits ? Number(values.credits) : undefined,

        topics: values.topics?.map(transformTopic),
      };

      const res = await apiRequest<typeof apiData, TemplateSubject>(
        sub ? "put" : "post",
        sub ? `/template-subjects/${sub._id || sub.id}` : "/template-subjects",
        apiData,
        {
          token: auth.token,
        },
      );

      if (!res.data) {
        setError(res.message);
        showToast({
          title: "Error",
          description: res.message,
          type: "error",
        });
      } else {
        setSuccess(
          sub ? "Subject updated successfully" : "Subject created successfully",
        );
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubject)}
        className=" w-full flex flex-col gap-4"
      >
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          <div className=" flex flex-col gap-4 lg:w-1/2">
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
              disabled={isPending}
            />
            <CommonFormField
              label="Subject code"
              name="code"
              type="text"
              fieldType="input"
              placeholder="MATH101, SCI201"
              className="uppercase"
              control={form.control}
              disabled={isPending}
              required
            />
            <CommonFormField
              label="Category"
              name="category"
              fieldType="select"
              placeholder="Select subject category"
              control={form.control}
              selectOptions={SubjectCategories.map((item) => ({
                value: item,
                label: item,
              }))}
            />
            <CommonFormField
              label="Hours"
              name="estimated_hours"
              type="number"
              fieldType="input"
              inputProps={{
                min: 1,
                max: 1000,
                defaultValue: 60,
                numberMode: "hours",
              }}
              placeholder="e.g., 120"
              className=""
              control={form.control}
              disabled={isPending}
              required
            />
            <CommonFormField
              label="Credits"
              name="credits"
              type="number"
              fieldType="input"
              inputProps={{
                min: 1,
                max: 1000,
                defaultValue: 60,
                numberMode: "percent",
              }}
              placeholder="e.g., 120"
              className=""
              control={form.control}
              disabled={isPending}
              required
            />
          </div>
          <div className=" flex flex-col gap-4 lg:w-1/2">
            {loadingOptions ? (
              <div className="skeleton h-12 rounded-md" />
            ) : (
              <CommonFormField
                label="Prerequisites (main classes)"
                name="prerequisites"
                fieldType="multipleSelect"
                placeholder="Select classes"
                control={form.control}
                selectOptions={mainClasses.map((item) => ({
                  value: item._id || "",
                  label: `${item.name} `,
                  disable: item.disable,
                }))}
              />
            )}
            <TopicsInput control={form.control} name="topics" />
          </div>
        </div>

        <FormError message={error} />
        <FormSuccess message={success} />
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant={"outline"}
              type="button"
              className=""
              library={"daisy"}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant={"info"}
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto"
            library={"daisy"}
            role={isPending ? "loading" : undefined}
          >
            {sub ? "Edit template subject" : "Create template subject"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default SubjectTemplateForm;
