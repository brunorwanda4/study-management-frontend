"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"; // useWatch is implicitly used via form.watch

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
import { useState, useTransition, useEffect } from "react"; // Added useEffect
import { FormError, FormSuccess } from "@/components/myComponents/form-message";
import {
  SendJoinSchoolRequestDto,
  sendJoinSchoolRequestSchema,
} from "@/lib/schema/school/send-join-school-request.schema";
import { UserSchool } from "@/lib/utils/auth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SchoolStaffRoles } from "@/lib/context/school.context"; // Keep for staff roles

// Define a type for your class data (adjust as needed)
interface ClassData {
  id: string;
  name: string; // e.g., "Grade 10A", "Physics Class"
}

const clasess: ClassData[] = [
  {
    id: "1",
    name: "L5 SOD",
  },
  {
    id: "2",
    name: "L3 SOD",
  },
  {
    id: "3",
    name: "L5 NIT",
  },
];

interface props {
  currentSchool: UserSchool;
  // classes: ClassData[]; // <-- Pass the available classes for the school here
}

export default function SendJoinSchoolRequestForm({
  currentSchool,
  // classes = [],
}: props) {
  // Default classes to empty array
  const [error, setError] = useState<undefined | null | string>("");
  const [success, setSuccess] = useState<undefined | null | string>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<SendJoinSchoolRequestDto>({
    resolver: zodResolver(sendJoinSchoolRequestSchema),
    defaultValues: {
      email: "",
      schoolId: currentSchool.schoolId,
      role: undefined,
      staffRole: undefined, // Use undefined or "" based on your schema/preference
      classId: undefined, // Use undefined or ""
    },
    mode: "onChange",
  });

  const selectedRole = form.watch("role"); 

  useEffect(() => {
    if (selectedRole !== "SCHOOLSTAFF") {
      form.resetField("staffRole", { defaultValue: undefined }); // Or ""
    }
    if (selectedRole !== "STUDENT") {
      form.resetField("classId", { defaultValue: undefined }); // Or ""
    }
    // Re-trigger validation if needed after reset
    if (selectedRole) {
      form.trigger();
    }
  }, [selectedRole, form]);

  function onSubmit(data: SendJoinSchoolRequestDto) {
    setError(null);
    setSuccess(null);

    // Prepare submission data, only include relevant conditional fields
    const submissionData: Partial<SendJoinSchoolRequestDto> = {
      // Use Partial<> if some fields might be undefined
      email: data.email,
      schoolId: data.schoolId,
      role: data.role,
    };

    if (data.role === "SCHOOLSTAFF") {
      submissionData.staffRole = data.staffRole;
    } else if (data.role === "STUDENT") {
      submissionData.classId = data.classId;
    }

    console.log("Data before processing:", data);
    console.log("Data being submitted:", submissionData); // Log the cleaned data

    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      console.log("Simulating API call with:", submissionData);

      // Example success/error handling (use submissionData)
      if (submissionData.email === "error@example.com") {
        setError("Simulated API error occurred.");
      } else {
        setSuccess(`Request sent successfully for ${submissionData.email}! ☺️`);
        // form.reset(); // Optionally reset the form on success
      }
    });
  }

  return (
    <Form {...form}>
      <form
        className=" w-full space-y-4 flex flex-col"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* Email Field (no changes needed) */}
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

        {/* Role Select Field (no changes needed) */}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className=" space-y-2 flex flex-col">
              <FormLabel className=" ">Select Role *</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value); // Update the form state
                  // Triggering validation here ensures dependent fields are checked immediately
                  form.trigger(["staffRole", "classId"]);
                }}
                value={field.value || ""} // Handle undefined case
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

        {/* Conditional Staff Role Select */}
        {selectedRole === "SCHOOLSTAFF" && (
          <FormField
            control={form.control}
            name="staffRole"
            render={({ field }) => (
              <FormItem className=" space-y-2 flex flex-col">
                <FormLabel className=" ">Specific Staff Role *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""} // Handle undefined case
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
                <FormMessage /> {/* Shows validation errors for staffRole */}
              </FormItem>
            )}
          />
        )}

        {/* Conditional Class Select - THIS IS THE UPDATED SECTION */}
        {selectedRole === "STUDENT" && (
          <FormField
            control={form.control}
            name="classId" // Correct field name
            render={({ field }) => (
              <FormItem className=" space-y-2 flex flex-col">
                {/* Updated Label */}
                <FormLabel className=" ">Select Class *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""} // Handle undefined case
                  disabled={isPending || clasess.length === 0} // Disable if no classes
                >
                  <FormControl>
                    <SelectTrigger>
                      {/* Updated Placeholder */}
                      <SelectValue placeholder="Select student's class" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {/* Map over the actual classes data */}
                    {clasess.length === 0 ? (
                      <SelectItem value="-" disabled>
                        No classes available
                      </SelectItem>
                    ) : (
                      clasess.map((classItem) => (
                        <SelectItem key={classItem.id} value={classItem.id}>
                          {classItem.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <FormMessage /> {/* Shows validation errors for classId */}
              </FormItem>
            )}
          />
        )}

        {/* Error/Success Messages */}
        <div className=" ">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>

        {/* Submit Button */}
        <Button
          library="daisy" // Assuming this is a custom prop/style
          disabled={isPending}
          className=" w-full"
          variant={"info"} // Assuming this is a custom prop/style
          type="submit"
        >
          {isPending ? "Sending..." : "Send Request"}
        </Button>
      </form>
    </Form>
  );
}
