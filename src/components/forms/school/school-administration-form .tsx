"use client";

import { useTransition } from "react";
import { useForm, useFieldArray } from "react-hook-form"; // No longer need ControllerRenderProps, FieldPath for the helper, but keep useFieldArray
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription, // Import FormDescription
  FormField,
  FormItem,
  FormLabel, // Import FormLabel
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// Import icons if needed for buttons (like remove)
// import { MinusCircle } from "lucide-react";

// 1. Define the Zod Schema for the form data
const SchoolAdministrationSchema = z.object({
  headmasterName: z
    .string()
    .min(2, { message: "Headmaster name is required." }),
  headmasterEmail: z
    .string()
    .email({ message: "Invalid email address." })
    .optional()
    .or(z.literal("")),
  headmasterPhone: z.string().optional(),

  principalName: z.string().min(2, { message: "Principal name is required." }),
  principalEmail: z
    .string()
    .email({ message: "Invalid email address." })
    .optional()
    .or(z.literal("")),
  principalPhone: z.string().optional(),

  numberOfTeachers: z.coerce
    .number()
    .int()
    .min(0, { message: "Number of teachers cannot be negative." }),

  additionalAdministration: z
    .array(
      z.object({
        role: z.string().min(2, { message: "Role is required." }),
        name: z.string().min(2, { message: "Name is required." }),
        email: z
          .string()
          .email({ message: "Invalid email address." })
          .optional()
          .or(z.literal("")),
        phone: z.string().optional(),
      })
    )
    .default([])
    .optional(),
});

// Define the DTO type based on the schema
type SchoolAdministrationDto = z.infer<typeof SchoolAdministrationSchema>;

// Component Props Interface (adjust if needed)
// interface SchoolAdministrationFormProps {
//   // Add any props the component needs, e.g., initial data, onSubmit handler
// }

const SchoolAdministrationForm =
  (/* { initialData }: SchoolAdministrationFormProps */) => {
    // 2. Initialize react-hook-form
    const form = useForm<SchoolAdministrationDto>({
      resolver: zodResolver(SchoolAdministrationSchema),
      defaultValues: {
        headmasterName: "",
        headmasterEmail: "",
        headmasterPhone: "",
        principalName: "",
        principalEmail: "",
        principalPhone: "",
        numberOfTeachers: 0,
        additionalAdministration: [],
        // ...initialData
      },
      mode: "onChange",
    });

    // 3. Use useFieldArray for the dynamic 'additionalAdministration' field
    const { fields, append, remove } = useFieldArray({
      name: "additionalAdministration",
      control: form.control,
    });

    // Optional: State for loading/submission transition
    const [isPending, startTransition] = useTransition();

    // 4. Define the onSubmit function
    function onSubmit(values: SchoolAdministrationDto) {
      console.log("Form submitted with values:", values);
      // Handle the form submission logic here (e.g., API call)

      // Example of a transition wrapper
      startTransition(() => {
        // Perform your async submission logic here
        // await saveSchoolDetails(values);
        // Handle success/error messages
      });
    }

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" basic-card  space-y-4"
        >
          {/* Headmaster Details */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Headmaster</h3>
            <FormDescription>
              Enter the headmaster&apos;s information.
            </FormDescription>{" "}
            {/* Example FormDescription */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="headmasterName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name*</FormLabel> {/* Using FormLabel */}
                    <FormControl>
                      <Input placeholder="Headmaster Name" {...field} />
                    </FormControl>
                    {/* <FormDescription>This is the headmaster's full name.</FormDescription> */}{" "}
                    {/* Another place for description */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="headmasterEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel> {/* Using FormLabel */}
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="headmaster@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="headmasterPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel> {/* Using FormLabel */}
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="e.g., +123 456 7890"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Principal Details */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Principal</h3>
            <FormDescription>
              Enter the principal&apos;s information.
            </FormDescription>{" "}
            {/* Example FormDescription */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="principalName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name*</FormLabel> {/* Using FormLabel */}
                    <FormControl>
                      <Input placeholder="Principal Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="principalEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel> {/* Using FormLabel */}
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="principal@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="principalPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel> {/* Using FormLabel */}
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="e.g., +123 456 7890"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Number of Teachers */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">School Statistics</h3>
            <FormDescription>
              Provide some key statistics about the school.
            </FormDescription>{" "}
            {/* Example FormDescription */}
            <FormField
              control={form.control}
              name="numberOfTeachers"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/3">
                  <FormLabel>Number of Teachers*</FormLabel>{" "}
                  {/* Using FormLabel */}
                  <FormControl>
                    {/* Note: Type "number" input returns string, Zod's .coerce.number() handles conversion */}
                    <Input
                      type="number"
                      placeholder="e.g., 50"
                      {...field}
                      // Handle the change event specifically for numbers if not using coerce
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value === "" ? 0 : parseInt(value, 10)); // Use parseInt and handle empty string
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    The total count of teaching staff.
                  </FormDescription>{" "}
                  {/* Example FormDescription */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Additional Administration (Dynamic Fields) */}
          <div className="space-y-6  ">
            <h3 className="text-lg font-medium">Other Administrators</h3>
            <FormDescription>
              Add details for other key administrative staff members.
            </FormDescription>{" "}
            {/* Example FormDescription */}
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="relative space-y-2 bg-accent/10"
              >
                {/* Remove Button */}
                <Button
                  type="button"
                  variant="destructive"
                  size="lg"
                  onClick={() => remove(index)}
                  className="absolute top-2 right-2"
                >
                  {/* You could use an icon here instead of text */}
                  {/* <MinusCircle className="h-4 w-4" /> */}
                  Remove
                </Button>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <FormField
                    control={form.control}
                    name={`additionalAdministration.${index}.role`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role*</FormLabel> {/* Using FormLabel */}
                        <FormControl>
                          <Input
                            placeholder="e.g., Vice Principal"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          The specific role of this administrator.
                        </FormDescription>
                        {/* Example FormDescription */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`additionalAdministration.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name*</FormLabel>{" "}
                        {/* Using FormLabel */}
                        <FormControl>
                          <Input placeholder="Administrator Name" {...field} />
                        </FormControl>
                        <FormDescription>
                          Full name of school staff
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`additionalAdministration.${index}.email`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>{" "}
                        {/* Using FormLabel */}
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="email@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`additionalAdministration.${index}.phone`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>{" "}
                        {/* Using FormLabel */}
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="e.g., +123 456 7890"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
            {/* Add Administrator Button */}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                append({ role: "", name: "", email: "", phone: "" })
              }
              className="mt-4"
              disabled={isPending}
            >
              {/* Or icon + text */}
              Add New Administrator
            </Button>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full mt-6" disabled={isPending}>
            Save Administration Details
            {isPending && (
              <span
                role="status"
                aria-label="Saving..."
                className="ml-2 h-4 w-4 animate-spin rounded-full border-2 border-foreground border-e-transparent"
              ></span>
            )}
          </Button>
        </form>
      </Form>
    );
  };

export default SchoolAdministrationForm;
