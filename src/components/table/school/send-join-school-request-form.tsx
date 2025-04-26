"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"; // Import useWatch

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
import { useState, useTransition } from "react";
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
import { SchoolStaffRoles } from "@/lib/context/school.context";

interface props {
  currentSchool: UserSchool;
}

export default function SendJoinSchoolRequestForm({ currentSchool }: props) {
  const [error, setError] = useState<undefined | null | string>("");
  const [success, setSuccess] = useState<undefined | null | string>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<SendJoinSchoolRequestDto>({
    resolver: zodResolver(sendJoinSchoolRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      schoolId: currentSchool.schoolId,
      role: undefined, // Explicitly set default for select if needed
      staffRole: "", // Add default value for the new field
      classId: "", // Add if you have this field
    },
    mode: "onChange", // Optional: Validate on change for better UX with conditional fields
  });

  const selectedRole = form.watch("role");

  function onSubmit(data: SendJoinSchoolRequestDto) {
    setError(null);
    setSuccess(null);

    // If role is not SCHOOLSTAFF, explicitly remove or nullify staffRole
    // This prevents sending unnecessary data if the user selected staff,
    // entered a role, then changed their mind back to student/teacher.
    // Zod refine handles validation, but this cleans the submitted data.
    const submissionData = {
      ...data,
      staffRole: data.role === "SCHOOLSTAFF" ? data.staffRole : undefined,
    };

    console.log("Data before processing:", data);
    console.log("Data being submitted:", submissionData);

    startTransition(async () => {
      // --- Replace with your actual API call ---
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Simulating API call with:", submissionData);
      // Example success/error handling
      if (submissionData.email === "error@example.com") {
        setError("Simulated API error occurred.");
      } else {
        setSuccess(`Request sent successfully for ${submissionData.email}! ☺️`);
        // Reset form on success (optional)
        // form.reset();
      }
      // --- End of simulation ---

      // const join = await JoinSchoolByUsernameAndCode(submissionData); // Use submissionData
      // if (join.data) {
      //   setSuccess(`To join school successfully! ☺️`);
      //   form.reset(); // Optionally reset form on success
      // } else {
      //   setError(join.message);
      // }
    });
  }

  return (
    <Form {...form}>
      <form className=" w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <div className=" md:flex-row flex space-x-4 flex-col w-full">
          <div className=" flex flex-col space-y-2 w-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel className="  ">
                    Email Address *
                  </FormLabel>
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

            {/* Name Field (Optional) */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="  ">
                    Full Name (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={isPending}
                      placeholder="e.g., Bruno Happy"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Field (Optional) */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="  ">
                    Phone Number (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      // Consider type="tel" for better mobile UX
                      type="tel"
                      disabled={isPending}
                      placeholder="+251 911 234 567"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Role Select Field */}
          <div className=" flex flex-col space-y-2 w-full">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="  ">Select Role *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isPending} // Disable select when pending
                  >
                    <FormControl>
                      <SelectTrigger>
                        {/* Show placeholder if no value, otherwise show selected value */}
                        <SelectValue placeholder="Select joiner role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="STUDENT">Student</SelectItem>
                      <SelectItem value="TEACHER">Teacher</SelectItem>
                      <SelectItem value="SCHOOLSTAFF">
                        School Staff
                      </SelectItem>{" "}
                      {/* Updated Label */}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedRole === "SCHOOLSTAFF" && (
              <FormField
                control={form.control}
                name="staffRole" // Target the correct field name
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="  ">Specific Staff Role *</FormLabel>{" "}
                    {/* Updated Label */}
                    {/* Replace Input with Select */}
                    <Select
                      onValueChange={field.onChange}
                      // Use field.value which comes from defaultValues or user selection
                      value={field.value}
                      disabled={isPending}
                    >
                      <FormControl>
                        <SelectTrigger>
                          {/* Show placeholder */}
                          <SelectValue placeholder="Select staff role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* Map over the imported SchoolStaffRoles */}
                        {SchoolStaffRoles.map((staffRole) => (
                          <SelectItem
                            key={staffRole.value}
                            value={staffRole.value}
                          >
                            {staffRole.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage /> {/* Show validation errors */}
                  </FormItem>
                )}
              />
            )}

            {/* Optional: Conditional 'Other Staff Role' Input */}
            {/* {selectedRole === "SCHOOLSTAFF" && selectedStaffRole === "OTHER" && (
                       <FormField
                         control={form.control}
                         name="otherStaffRole"
                         render={({ field }) => (
                           <FormItem>
                             <FormLabel>Specify Other Role *</FormLabel>
                             <FormControl>
                               <Input type="text" disabled={isPending} placeholder="Enter the specific role" {...field} />
                             </FormControl>
                             <FormMessage />
                           </FormItem>
                         )}
                       />
                    )} */}
          </div>
        </div>
        <div className=" mt-4">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
        {/* Submit Button */}
        <Button
          library="daisy"
          disabled={isPending}
          className=" w-full"
          variant={"info"}
          type="submit"
        >
          {isPending ? "Sending..." : "Send Request"}
        </Button>
      </form>
    </Form>
  );
}
