"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UsersIcon } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { FormError, FormSuccess } from "@/components/common/form-message";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import {
  SchoolStaffTypes,
  StudentStatuses,
  TeacherTypes,
} from "@/lib/const/common-details-const";
import { useToast } from "@/lib/context/toast/ToastContext";
import type { Class } from "@/lib/schema/class/class-schema";
import {
  type CreateJoinSchoolRequest,
  CreateJoinSchoolRequestSchema,
} from "@/lib/schema/school/school-join-school/create-join-school-request-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { ClassCombobox, type ComboboxItem } from "./class-combobox";

/* -------------------------------------------------------------------------- */
/*                                COMPONENT                                   */
/* -------------------------------------------------------------------------- */

interface Props {
  auth: AuthContext;
  classes: Class[];
}

export default function SendJoinSchoolRequestForm({ auth, classes }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  /* ----------------------------- Form Setup ----------------------------- */
  const form = useForm<CreateJoinSchoolRequest>({
    resolver: zodResolver(CreateJoinSchoolRequestSchema),
    defaultValues: {
      sent_by: auth.user.id,
      email: "",
      school_id: auth.school?.id,
      role: undefined,
      message: undefined,
      class_id: undefined,
      type: undefined,
    },
    mode: "onChange",
  });

  const selectedRole = form.watch("role");

  /* ----------------------- Reset conditional fields ---------------------- */
  useEffect(() => {
    if (selectedRole !== "Staff") {
      form.resetField("type", { defaultValue: undefined });
    }
    if (selectedRole !== "Student") {
      form.resetField("class_id", { defaultValue: undefined });
    }

    form.trigger(["type", "class_id"]);
  }, [selectedRole, form]);

  /* ----------------------------- Submit Logic ----------------------------- */
  function onSubmit(data: CreateJoinSchoolRequest) {
    setError(null);
    setSuccess(null);

    startTransition(async () => {
      const sendRequest = await apiRequest<CreateJoinSchoolRequest>(
        "post",
        "/join-school-requests",
        data,
        {
          token: auth.token,
          schoolToken: auth.schoolToken,
        },
      );

      if (sendRequest?.data) {
        showToast({
          title: "Request sent successfully",
          type: "success",
        });
        setSuccess("Request sent successfully ☺️");
        form.reset();
      } else {
        showToast({
          title: "Some thing went wrong",
          description: sendRequest.message,
          type: "error",
        });
        setError(
          sendRequest?.message ||
            "An error occurred while sending the join request.",
        );
      }
    });
  }

  /* ----------------------------- Class Combobox ---------------------------- */
  const classItems: ComboboxItem[] = classes.map((classItem) => ({
    value: classItem.id || classItem._id || "",
    label: classItem.name,
    icon: UsersIcon,
  }));

  /* --------------------------- Role-based options -------------------------- */
  const joinSchoolTypes =
    selectedRole === "Staff"
      ? SchoolStaffTypes
      : selectedRole === "Student"
        ? StudentStatuses
        : TeacherTypes;

  /* ------------------------------- JSX Form ------------------------------- */
  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-2">
              <FormLabel>Email Address *</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="example@email.com"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Role Field */}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-2">
              <FormLabel>Select Role *</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value || ""}
                disabled={isPending}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select joiner role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Student">Student</SelectItem>
                  <SelectItem value="Teacher">Teacher</SelectItem>
                  <SelectItem value="Staff">School Staff</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Conditional Type Field (based on role) */}
        {selectedRole && (
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-2">
                <FormLabel>
                  {selectedRole === "Staff"
                    ? "Staff Type"
                    : selectedRole === "Student"
                      ? "Student Status"
                      : "Teacher Type"}{" "}
                  *
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={`Select ${selectedRole.toLowerCase()} type`}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {joinSchoolTypes.map((type) => (
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
        )}

        {/* Class Field (only for Students) */}
        {selectedRole === "Student" && (
          <FormField
            control={form.control}
            name="class_id"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-2">
                <FormLabel>Select Class *</FormLabel>
                <FormControl>
                  <ClassCombobox
                    items={classItems}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select student's class"
                    searchPlaceholder="Search classes..."
                    emptyMessage={
                      classes.length === 0
                        ? "No classes available."
                        : "No class found."
                    }
                    disabled={isPending || classes.length === 0}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Message Field */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-2">
              <FormLabel>Message (optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write a short message for your request..."
                  disabled={isPending}
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Error / Success messages */}
        <div>
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>

        <Button
          disabled={isPending}
          className="w-full"
          library="daisy"
          variant="info"
          type="submit"
          role={isPending ? "loading" : undefined}
        >
          {isPending ? "Sending..." : "Send Request"}
        </Button>
      </form>
    </Form>
  );
}
