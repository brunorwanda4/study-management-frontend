"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"; // useWatch is implicitly used via form.watch
import { useState, useTransition, useEffect } from "react";
import { UsersIcon } from "lucide-react"; // Import the icon for classes

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
import { FormError, FormSuccess } from "@/components/myComponents/form-message";
import {
  SendJoinSchoolRequestDto,
  sendJoinSchoolRequestSchema,
} from "@/lib/schema/school/school-join-school/send-join-school-request.schema";
import { UserSchool } from "@/lib/utils/auth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SchoolStaffRoles } from "@/lib/context/school.context";
import { ViewDataClassDto } from "@/lib/schema/class/view-data-class.dto";
import { CreateSchoolJoinRequest } from "@/service/school/school-join-request.service";
import { ClassCombobox, ComboboxItem } from "./class-combobox";

// Import the new Combobox component

interface props {
  currentSchool: UserSchool;
  classes: ViewDataClassDto[];
}

export default function SendJoinSchoolRequestForm({
  currentSchool,
  classes,
}: props) {
  const [error, setError] = useState<undefined | null | string>("");
  const [success, setSuccess] = useState<undefined | null | string>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<SendJoinSchoolRequestDto>({
    resolver: zodResolver(sendJoinSchoolRequestSchema),
    defaultValues: {
      email: "",
      schoolId: currentSchool.schoolId,
      role: undefined,
      staffRole: undefined,
      classId: undefined,
    },
    mode: "onChange",
  });

  const selectedRole = form.watch("role");

  useEffect(() => {
    if (selectedRole !== "SCHOOLSTAFF") {
      form.resetField("staffRole", { defaultValue: undefined });
    }
    if (selectedRole !== "STUDENT") {
      // Reset classId ONLY if the role changes AWAY from STUDENT
      form.resetField("classId", { defaultValue: undefined });
    }
    // Trigger validation when role changes to potentially show required fields
    if (selectedRole) {
         form.trigger(['staffRole', 'classId']); // Trigger validation for dependent fields
    }
  }, [selectedRole, form]);


  function onSubmit(data: SendJoinSchoolRequestDto) {
    setError(null);
    setSuccess(null);

    startTransition(async () => {
      const sendRequest = await CreateSchoolJoinRequest(data);
      if (sendRequest.data) {
        setSuccess(`Request sent successfully for ${sendRequest.data.name}! ☺️`);
        form.reset(); // Reset the entire form on success
      } else {
        setError(
          sendRequest.message || "An error occurred while sending the request."
        );
      }
    });
  }

  // --- Prepare data for the ClassCombobox ---
  const classItems: ComboboxItem[] = classes.map((classItem) => ({
    value: classItem.id, // The value to store in the form
    label: classItem.name, // The display label
    icon: UsersIcon, // Use the imported icon
    number: classItem._count.students, // Display student count
  }));
  // --- End Data Preparation ---


  return (
    <Form {...form}>
      <form
        className=" w-full space-y-4 flex flex-col"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* Email Field (no changes) */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className=" space-y-2 flex flex-col">
              <FormLabel className=" ">Email Address *</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  disabled={isPending}
                  placeholder="example@email.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Role Field (no changes) */}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className=" space-y-2 flex flex-col">
              <FormLabel className=" ">Select Role *</FormLabel>
              <Select
                 // Use field.onChange directly for simpler state update
                onValueChange={field.onChange}
                value={field.value || ""} // Ensure value is controlled
                disabled={isPending}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select joiner role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="STUDENT">Student</SelectItem>
                  <SelectItem value="TEACHER">Teacher</SelectItem>
                  <SelectItem value="SCHOOLSTAFF">School Staff</SelectItem>{" "}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Staff Role Field (no changes) */}
        {selectedRole === "SCHOOLSTAFF" && (
          <FormField
            control={form.control}
            name="staffRole"
            render={({ field }) => (
              <FormItem className=" space-y-2 flex flex-col">
                <FormLabel className=" ">Specific Staff Role *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select staff role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {SchoolStaffRoles.map((staffRole) => (
                      <SelectItem key={staffRole.value} value={staffRole.value}>
                        {staffRole.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* --- Class Field (Using ClassCombobox) --- */}
        {selectedRole === "STUDENT" && (
          <FormField
            control={form.control}
            name="classId" // Correct field name
            render={({ field }) => (
              <FormItem className=" space-y-2 flex flex-col">
                <FormLabel className=" ">Select Class *</FormLabel>
                 {/* Use FormControl to wrap the custom component for label association etc. */}
                <FormControl>
                    <ClassCombobox
                        // id={field.id} // RHF usually handles id via FormItem/Label
                        items={classItems}
                        value={field.value} // Pass the field's current value
                        onChange={field.onChange} // Pass the field's change handler
                        placeholder="Select student's class"
                        searchPlaceholder="Search classes..."
                        emptyMessage={classes.length === 0 ? "No classes available." : "No class found."}
                        disabled={isPending || classes.length === 0}
                    />
                </FormControl>
                <FormMessage /> {/* Shows validation errors for classId */}
              </FormItem>
            )}
          />
        )}
        {/* --- End Class Field --- */}


        {/* Error/Success Messages */}
        <div className=" ">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>

        {/* Submit Button */}
        <Button
          library="daisy" // Removed if not standard Shadcn/Radix prop
          disabled={isPending}
          className=" w-full"
          variant={"info"} // Use standard Shadcn variants or configure custom ones
          type="submit"
        >
          {isPending ? "Sending..." : "Send Request"}
        </Button>
      </form>
    </Form>
  );
}