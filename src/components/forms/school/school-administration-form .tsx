"use client";

import { useState, useTransition } from "react";
import {
  useForm,
  useFieldArray,
  ControllerRenderProps,
  FieldPath,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, ChevronDownIcon, MinusCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl, // Keep FormControl import as it's used for standard inputs
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SchoolStaffRoles } from "@/lib/context/school.context";
import { AuthUserDto } from "@/lib/utils/auth";
import { Locale } from "@/i18n";
import {
  SchoolAdministrationDto,
  SchoolAdministrationSchema,
} from "@/lib/schema/school.dto";
import { administrationSchoolRequestToJoinSchool } from "@/service/school/school.service";
import { useRouter } from "next/navigation";
import { FormError, FormSuccess } from "@/components/myComponents/form-message";

const RoleSelectCombobox = ({
  field,
}: {
  field: ControllerRenderProps<
    SchoolAdministrationDto,
    FieldPath<SchoolAdministrationDto>
  >;
}) => {
  const [open, setOpen] = useState(false);

  const selectedRoleLabel = SchoolStaffRoles.find(
    (role) => role.value === field.value
  )?.value;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {/* REMOVED FormControl WRAPPER HERE */}
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between px-3 font-normal"
        >
          <span
            className={cn("truncate", !field.value && "text-muted-foreground")}
          >
            {selectedRoleLabel || "Select a role"}
          </span>
          <ChevronDownIcon
            size={16}
            className="text-muted-foreground/80 shrink-0 ml-2"
            aria-hidden="true"
          />
        </Button>
        {/* REMOVED CLOSING FormControl TAG HERE */}
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popper-anchor-width)] p-0">
        <Command>
          <CommandInput placeholder="Search role..." />
          <CommandList>
            <CommandEmpty>No role found.</CommandEmpty>
            <CommandGroup>
              {SchoolStaffRoles.map((role) => (
                <CommandItem
                  key={role.value}
                  value={role.value}
                  onSelect={(currentValue) => {
                    field.onChange(
                      currentValue === field.value ? "" : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  {role.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      field.value === role.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

interface props {
  currentUser: AuthUserDto;
  lang: Locale;
  schoolId: string;
}

const SchoolAdministrationForm = ({ currentUser, schoolId, lang }: props) => {
  const [error, setError] = useState<string | null | undefined>("");
  const [success, setSuccess] = useState<string | null | undefined>("");
  const router = useRouter();
  const form = useForm<SchoolAdministrationDto>({
    resolver: zodResolver(SchoolAdministrationSchema),
    defaultValues: {
      schoolId: schoolId,
      headmasterName: currentUser.name ? currentUser.name : "",
      headmasterEmail: currentUser.email ? currentUser.email : "",
      headmasterPhone: "",
      DirectorOfStudies: "",
      principalEmail: "",
      principalPhone: "",
      numberOfTeachers: 30,
      additionalAdministration: [],
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    name: "additionalAdministration",
    control: form.control,
  });

  const [isPending, startTransition] = useTransition();

  function onSubmit(values: SchoolAdministrationDto) {
    startTransition(async () => {
      const academic = await administrationSchoolRequestToJoinSchool(values);
      if (academic.data) {
        setSuccess(academic.data.message);
        router.push(`/${lang}/s-t`);
      } else {
        setError(`${academic.message}`);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" basic-card  space-y-4" // Added back basic styling classes
      >
        {/* Headmaster Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Headmaster</h3>
          <FormDescription>
            Enter the headmaster&apos;s information.
          </FormDescription>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="headmasterName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Headmaster Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="headmasterEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address*</FormLabel>
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
                  <FormLabel>Phone Number*</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="e.g., +1234567890"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Director of Studies Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Director of Studies</h3>
          <FormDescription>
            Enter the director of Studies information.
          </FormDescription>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="DirectorOfStudies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Director Name" {...field} />
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
                  <FormLabel>Email Address*</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="director@example.com"
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
                  <FormLabel>Phone Number*</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="e.g., +1234567890"
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
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">School Statistics</h3>
          <FormDescription>
            Provide some key statistics about the school.
          </FormDescription>
          <FormField
            control={form.control}
            name="numberOfTeachers"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/3">
                <FormLabel>Number of Teachers*</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="e.g., 50"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Use parseInt and handle empty string, default to 0 if invalid parse
                      field.onChange(
                        value === "" ? 0 : parseInt(value, 10) || 0
                      );
                    }}
                    // Ensure the input displays the number value correctly
                    value={field.value}
                  />
                </FormControl>
                <FormDescription>
                  The total count of teaching staff.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Additional Administration (Dynamic Fields) */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Other Administrators</h3>
          <FormDescription>
            Add details for other key administrative staff members.
          </FormDescription>
          {fields.map((field, index) => (
            <div key={field.id} className="relative space-y-4">
              {/* Remove Button */}
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => remove(index)}
                className="absolute top-2 right-2 h-8 w-8 p-0"
              >
                <MinusCircle className="h-4 w-4" />
                <span className="sr-only">Remove Administrator</span>
              </Button>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {/* ROLE SELECT FIELD - USING CUSTOM COMBOBOX */}
                <FormField
                  control={form.control}
                  name={`additionalAdministration.${index}.role`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Role*</FormLabel>
                      {/* Use the wrapper component */}
                      <RoleSelectCombobox field={field} />
                      <FormDescription>
                        The specific role of this administrator.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`additionalAdministration.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name*</FormLabel>
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
                      <FormLabel>Email Address*</FormLabel>
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
                      <FormLabel>Phone Number*</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="e.g., +1234567890"
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
            onClick={() => append({ role: "", name: "", email: "", phone: "" })}
            className="mt-4"
            disabled={isPending}
          >
            Add New Administrator
          </Button>
        </div>
        <div>
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
        {/* Submit Button */}
        <Button type="submit" className="w-full mt-6" disabled={isPending}>
          {isPending && (
            <span
              role="status"
              aria-label="Saving..."
              className="ml-2 h-4 w-4 animate-spin rounded-full border-2 border-foreground border-e-transparent"
            ></span>
          )}
          Save Administration Details {isPending && "..."}
        </Button>
      </form>
    </Form>
  );
};

export default SchoolAdministrationForm;
