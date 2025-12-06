"use client";
import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { SubjectCategories } from "@/lib/const/common-details-const";
import { useToast } from "@/lib/context/toast/ToastContext";
import { transformTopic } from "@/lib/helpers/subject-topic";
import type { Class } from "@/lib/schema/class/class-schema";
import type { PaginatedClasses } from "@/lib/schema/relations-schema";
import type {
    PaginatedTeacher,
    Teacher,
} from "@/lib/schema/school/teacher-schema";
import {
    ClassSubjectSchema,
    type ClassSubject,
} from "@/lib/schema/subject/class-subject-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { TopicsInput } from "../../admin/subjects/topics-input";

interface ClassSubjectFormProps {
  sub?: ClassSubject;
  cls?: Class;
  auth: AuthContext;
}

const ClassSubjectForm = ({ sub, cls, auth }: ClassSubjectFormProps) => {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const [classes, setClasses] = useState<Class[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  useEffect(() => {
    const fetchMainClasses = async () => {
      try {
        const [classesRes, teachersRes] = await Promise.all([
          !cls
            ? apiRequest<void, PaginatedClasses>(
                "get",
                "/school/classes",
                undefined,
                {
                  token: auth.token,
                  schoolToken: auth.schoolToken,
                },
              )
            : { data: [] },
          apiRequest<void, PaginatedTeacher>(
            "get",
            "/school/teachers",
            undefined,
            {
              token: auth.token,
              schoolToken: auth.schoolToken,
            },
          ),
        ]);

        if (classesRes.data) {
          setClasses(classesRes.data.classes);
        }

        if (teachersRes.data) {
          setTeachers(teachersRes.data.teachers);
        }
      } catch (error) {
        showToast({
          title: "Error to get class or class subjects",
          description: `"Failed to fetch main classes:", ${error}`,
          type: "error",
        });
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchMainClasses();
  }, [auth.token, showToast, classes]);

  const form = useForm<ClassSubject>({
    resolver: zodResolver(ClassSubjectSchema),
    defaultValues: {
      name: sub?.name || "",
      description: sub?.description || "",
      teacher_id: sub?.teacher_id || "",
      class_id: sub?.class_id || "",
      code: sub?.code || "",
      credits: sub?.credits || 0,
      topics: sub?.topics || [],
    },
  });

  const onSubmit = (values: ClassSubject) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const apiData = {
        ...values,

        class_id: cls?._id ? cls._id : values.class_id,

        estimated_hours: Number(values.estimated_hours),
        credits: values.credits ? Number(values.credits) : undefined,

        topics: values.topics?.map(transformTopic),
      };

      const res = await apiRequest<typeof apiData, ClassSubject>(
        sub ? "put" : "post",
        sub
          ? `/school/class-subjects/${sub._id || sub.id}`
          : "/school/class-subjects",
        apiData,
        {
          token: auth.token,
          schoolToken: auth.schoolToken,
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
        form.reset();
        setSuccess(
          sub ? "Subject updated successfully" : "Subject created successfully",
        );
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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
            {!cls && (
              <div className=" w-fill">
                {loadingOptions ? (
                  <div className="skeleton h-12 rounded-md" />
                ) : (
                  <CommonFormField
                    label="Class "
                    name="class_id"
                    fieldType="searchSelect"
                    placeholder="Select classes"
                    control={form.control}
                    selectOptions={classes.map((item) => ({
                      value: item._id || "",
                      label: `${item.name} `,
                      disable: item.is_active === false,
                    }))}
                  />
                )}
              </div>
            )}

            {loadingOptions ? (
              <div className="skeleton h-12 rounded-md" />
            ) : (
              <CommonFormField
                label="Teacher "
                name="teacher_id"
                fieldType="searchSelect"
                placeholder="Select teacher"
                control={form.control}
                selectOptions={teachers.map((t) => ({
                  value: t._id,
                  label: t.name,
                }))}
              />
            )}
            <TopicsInput control={form.control} name="topics" />
          </div>
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />

        <DialogFooter className="px-6 pb-6 sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="outline" library="daisy">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant="info"
            disabled={isPending}
            className="w-full sm:w-auto"
            role={isPending ? "loading" : undefined}
            library="daisy"
          >
            {sub ? "Update Subject" : "Add Subject"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default ClassSubjectForm;
