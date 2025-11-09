"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { FormError, FormSuccess } from "@/components/common/form-message";
import SelectWithSearch from "@/components/common/select-with-search";
import { useToast } from "@/lib/context/toast/ToastContext";

import {
  addOrUpdateClassTeacherSchema,
  type addOrUpdateClassTeacher,
  type Class,
} from "@/lib/schema/class/class-schema";
import type { PaginatedClasses } from "@/lib/schema/relations-schema";
import type { Teacher, TeacherBase } from "@/lib/schema/school/teacher-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";

interface Props {
  auth: AuthContext;
  teacher?: Teacher;
  cls?: Class;
}

const ClassTeacherForm = ({ auth, teacher, cls }: Props) => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  // -------------------------------------
  // Fetch options
  // -------------------------------------
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const teacherRequest = teacher
          ? Promise.resolve({ data: [] as Teacher[] })
          : apiRequest<void, Teacher[]>("get", "/school/teachers", undefined, {
              token: auth.token,
              schoolToken: auth.schoolToken,
            });

        const classRequest = apiRequest<void, PaginatedClasses>(
          "get",
          "/school/classes",
          undefined,
          {
            token: auth.token,
            schoolToken: auth.schoolToken,
          },
        );

        const [teachersRes, classesRes] = await Promise.all([
          teacher ? { data: [] } : teacherRequest,
          cls ? { data: { classes: [] } } : classRequest,
        ]);

        if (teachersRes.data) {
          // const activeTeachers = teachersRes.data.filter((t) => !t.is_active);
          // setTeachers(activeTeachers);
          setTeachers(teachersRes.data);
        }

        if (classesRes.data) {
          // const activeClasses = classesRes.data.filter((c) => !c.is_active);
          // setClasses(activeClasses);
          setClasses(classesRes.data.classes);
        }
      } catch (err) {
        console.error("Failed to fetch options:", err);
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, [auth, teacher]);

  // -------------------------------------
  // Form setup
  // -------------------------------------
  const form = useForm<addOrUpdateClassTeacher>({
    resolver: zodResolver(addOrUpdateClassTeacherSchema),
    defaultValues: {
      class_id: cls ? cls?._id || cls.id : undefined,
      teacher_id: teacher ? teacher?._id || teacher?.id : undefined,
    },
    mode: "onChange",
  });

  // -------------------------------------
  // Submit handler
  // -------------------------------------
  const handleSubmit = (values: addOrUpdateClassTeacher) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(async () => {
      try {
        const api_data: addOrUpdateClassTeacher = {
          class_id: cls?._id || values.class_id,
          teacher_id: teacher?._id || values.teacher_id,
        };
        const response = await apiRequest<void, TeacherBase>(
          "post",
          `/school/classes/${api_data.class_id}/teachers/${api_data.teacher_id}/assign`,
          undefined,
          { token: auth.token, schoolToken: auth.schoolToken },
        );

        if (!response.data) {
          setError(response.message);
          showToast({
            title: "Error",
            description: response.message,
            type: "error",
          });
          return;
        }

        const message = teacher
          ? "Teacher updated successfully!"
          : "Teacher assigned successfully!";
        setSuccess(message);

        showToast({
          title: teacher ? "Teacher Updated" : "Teacher Assigned",
          description: response.data.name,
          type: "success",
        });

        if (!teacher) form.reset();
      } catch (err) {
        setError(
          `Unexpected error occurred: ${String(err)}. Please try again.`,
        );
      }
    });
  };

  // -------------------------------------
  // Render
  // -------------------------------------
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Class Selector */}
        {!cls && (
          <FormField
            name="class_id"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Choose Class</FormLabel>
                <SelectWithSearch
                  options={classes.map((c) => ({
                    value: String(c.id ?? c._id),
                    label: c.name,
                  }))}
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  placeholder={
                    loadingOptions ? "Loading classes..." : "Select a class"
                  }
                  disabled={isPending || loadingOptions}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Teacher Selector */}
        {!teacher && (
          <FormField
            name="teacher_id"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Choose Teacher</FormLabel>
                <SelectWithSearch
                  options={teachers.map((t) => ({
                    value: String(t.id ?? t._id),
                    label: t.name,
                  }))}
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  placeholder={
                    loadingOptions ? "Loading teachers..." : "Select a teacher"
                  }
                  disabled={isPending || loadingOptions}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Feedback Messages */}
        <FormError message={error} />
        <FormSuccess message={success} />

        {/* Footer */}
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
            Add teacher
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default ClassTeacherForm;
