"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
import {
  CountrySelect,
  FlagComponent,
  PhoneInput,
} from "@/components/common/form/phone-input";
import RadioInput from "@/components/common/form/radio-input";
import {
  GenderDetails,
  TeacherTypeDetails,
} from "@/lib/const/common-details-const";
import { useToast } from "@/lib/context/toast/ToastContext";
import {
  type Teacher,
  type TeacherBase,
  TeacherBaseSchema,
} from "@/lib/schema/school/teacher-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import * as RPNInput from "react-phone-number-input";
interface Props {
  auth: AuthContext;
  teacher?: Teacher;
  isSchool?: boolean;
}

const TeacherForm = ({ auth, teacher, isSchool }: Props) => {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  // -------------------------------------
  // Initialize form
  // -------------------------------------
  const form = useForm<TeacherBase>({
    resolver: zodResolver(TeacherBaseSchema),
    defaultValues: {
      name: teacher?.name ? teacher?.name : undefined,
      email: teacher?.email ? teacher?.email : undefined,
      phone: teacher?.phone ? teacher?.phone : undefined,
      image: teacher?.image ? teacher?.image : undefined,
      gender: teacher?.gender ? teacher?.gender : undefined,
      type: teacher?.type ? teacher?.type : "Regular",
      class_ids: teacher?.class_ids ? teacher?.class_ids : undefined,
      subject_ids: teacher?.subject_ids ? teacher?.subject_ids : undefined,
      is_active: teacher?.is_active ? teacher?.is_active : true,
      tags: teacher?.tags ?? [],
      creator_id: auth.user.id ?? undefined,
      school_id: isSchool ? auth?.school?.id : undefined,
    },
    mode: "onChange",
  });

  // -------------------------------------
  // Submit handler
  // -------------------------------------
  const handleSubmit = (values: TeacherBase) => {
    setError(undefined);
    setSuccess(undefined);
    startTransition(async () => {
      try {
        const endpoint =
          teacher && isSchool
            ? `/school/teachers/${teacher._id || teacher.id}`
            : isSchool
              ? "/school/teachers"
              : teacher
                ? `/teachers/${teacher._id || teacher.id}`
                : "/teachers";

        const response = await apiRequest<typeof values, TeacherBase>(
          teacher ? "put" : "post",
          endpoint,
          values,
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
          : "Teacher created successfully!";
        setSuccess(message);
        showToast({
          title: teacher ? "Teacher Updated" : "Teacher Created",
          description: response.data.name,
          type: "success",
        });

        if (!teacher) form.reset();
      } catch (err) {
        setError(
          `Unexpected error occurred [${String(err)}]. Please try again.`,
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
        <div className=" flex flex-col lg:flex-row gap-2">
          {/* Image Upload */}
          <div className=" w-full flex flex-col gap-2">
            <CommonFormField
              control={form.control}
              name="image"
              fieldType="avatar"
              label="Profile image"
              avatarProps={{ avatarProps: { size: "2xl" } }}
            />
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter teacher's name"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            {!teacher?.user_id && (
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="example@school.com"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Phone */}
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Controller
                      name={field.name}
                      control={form.control}
                      render={({ field }) => (
                        <RPNInput.default
                          {...field}
                          className="flex rounded-lg border-l-0"
                          international
                          flagComponent={FlagComponent}
                          countrySelectComponent={CountrySelect}
                          inputComponent={PhoneInput}
                          defaultCountry="RW"
                          placeholder="Enter phone number"
                          onChange={(value) => field.onChange(value ?? "")}
                          disabled={isPending}
                        />
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Gender */}
          <div className=" w-full flex flex-col gap-2">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <RadioInput
                      items={GenderDetails}
                      value={field.value}
                      onChange={field.onChange}
                      className=" grid-cols-3 gap-2"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Teacher Type */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teacher Type</FormLabel>
                  <FormControl>
                    <RadioInput
                      items={TeacherTypeDetails}
                      value={field.value}
                      onChange={field.onChange}
                      className=" grid-cols-3 gap-2"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Classes */}
            {/* <FormField
            control={form.control}
            name="class_ids"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Classes</FormLabel>
                <FormControl>
                  <SelectWithSearch
                    multiple
                    options={classOptions}
                    value={field.value ?? []}
                    onChange={field.onChange}
                    placeholder="Select classes"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

            {/* Subjects */}
            {/* <FormField
            control={form.control}
            name="subject_ids"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subjects</FormLabel>
                <FormControl>
                  <SelectWithSearch
                    multiple
                    options={subjectOptions}
                    value={field.value ?? []}
                    onChange={field.onChange}
                    placeholder="Select subjects"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

            {/* Tags */}
            {/* <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g., Senior, Physics, Mentor"
                      disabled={isPending}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value
                            .split(",")
                            .map((tag) => tag.trim())
                            .filter(Boolean),
                        )
                      }
                      value={field.value?.join(", ") ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            {/* Active */}
            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem className="flex flex-row-reverse justify-start gap-2">
                  <FormLabel>Active</FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value ?? false}
                      onCheckedChange={field.onChange}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Messages */}
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
            {teacher ? "Update Teacher" : "Add Teacher"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default TeacherForm;
