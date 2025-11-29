"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { CommonFormField } from "@/components/common/form/common-form-field";
import {
  CountrySelect,
  FlagComponent,
  PhoneInput,
} from "@/components/common/form/phone-input";
import RadioInput from "@/components/common/form/radio-input";
import SelectWithSearch from "@/components/common/select-with-search";
import {
  GenderDetails,
  StudentStatusDetails,
} from "@/lib/const/common-details-const";
import { useToast } from "@/lib/context/toast/ToastContext";
import type { Class } from "@/lib/schema/class/class-schema";
import type { PaginatedClasses } from "@/lib/schema/relations-schema";
import {
  StudentBaseSchema,
  type Student,
  type StudentBase,
} from "@/lib/schema/school/student-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import * as RPNInput from "react-phone-number-input";

interface Props {
  auth: AuthContext;
  student?: Student;
  isSchool?: boolean;
  cls?: Class;
}

const StudentForm = ({ auth, student, isSchool, cls }: Props) => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const classRequest = apiRequest<void, PaginatedClasses>(
          "get",
          "/school/classes",
          undefined,
          {
            token: auth.token,
            schoolToken: auth.schoolToken,
          },
        );

        const [classesRes] = await Promise.all([
          cls ? { data: { classes: [] } } : classRequest,
        ]);

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
  }, [auth, cls]);

  // -------------------------------------
  // Initialize form
  // -------------------------------------
  const form = useForm<StudentBase>({
    resolver: zodResolver(StudentBaseSchema),
    defaultValues: {
      name: student?.name ?? undefined,
      email: student?.email ?? undefined,
      phone: student?.phone ?? undefined,
      image: student?.image ?? undefined,
      gender: student?.gender ?? undefined,
      date_of_birth: student?.date_of_birth ?? undefined,
      class_id: student?.class_id ?? undefined,
      registration_number: student?.registration_number ?? undefined,
      admission_year:
        student?.admission_year !== undefined
          ? String(student.admission_year)
          : undefined,

      status: student?.status ?? "Active",
      is_active: student?.is_active ?? true,
      tags: student?.tags ?? [],
      creator_id: auth.user.id ?? undefined,
      school_id: isSchool ? auth?.school?.id : undefined,
    },
    mode: "onChange",
  });

  // -------------------------------------
  // Submit handler
  // -------------------------------------
  const handleSubmit = (values: StudentBase) => {
    setError(undefined);
    setSuccess(undefined);
    startTransition(async () => {
      try {
        const api_data = {
          ...values,
          admission_year: Number(values.admission_year),
          school_id: isSchool ? auth?.school?.id : undefined,
        };
        console.log("🤣", api_data);
        const endpoint =
          student && isSchool
            ? `/school/students/${student._id || student.id}`
            : isSchool
              ? "/school/students"
              : student
                ? `/students/${student._id || student.id}`
                : "/students";

        const response = await apiRequest<typeof api_data, Student>(
          student ? "put" : "post",
          endpoint,
          api_data,
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

        const message = student
          ? "Student updated successfully!"
          : "Student created successfully!";
        setSuccess(message);
        showToast({
          title: student ? "Student Updated" : "Student Created",
          description: response.data.name,
          type: "success",
        });

        if (!student) form.reset();
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
        <div className="flex flex-col lg:flex-row gap-2">
          {/* Left Column */}
          <div className="w-full flex flex-col gap-2">
            {/* Image Upload */}
            <CommonFormField
              control={form.control}
              name="image"
              fieldType="avatar"
              label="Profile image"
              avatarProps={{ avatarProps: { size: "3xl" } }}
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
                      placeholder="Enter student's full name"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="example@student.com"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Phone Number</FormLabel>
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

          {/* Right Column */}
          <div className="w-full flex flex-col gap-2">
            {/* Gender */}
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
                      className="grid-cols-3 gap-2"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <RadioInput
                      items={StudentStatusDetails}
                      value={field.value}
                      onChange={field.onChange}
                      className="grid-cols-3 gap-2"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Registration Number */}
            <FormField
              control={form.control}
              name="registration_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registration Number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter registration number"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Admission Year */}
            <FormField
              control={form.control}
              name="admission_year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Admission Year</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      placeholder="Enter admission year"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!cls && (
              <FormField
                name="class_id"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Class</FormLabel>
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
            {student ? "Update Student" : "Add Student"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default StudentForm;
