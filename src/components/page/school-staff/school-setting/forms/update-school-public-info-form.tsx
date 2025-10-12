"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import { ChangeEvent, useState, useTransition } from "react";
import { useForm } from "react-hook-form"; // Import useFieldArray if handling socialMedia dynamically

import { Locale } from "@/i18n"; // Assuming you might need this

// Import Shadcn UI Components
import { FormError, FormSuccess } from "@/components/common/form-message"; // Assuming this exists
import MyImage from "@/components/common/myImage"; // Assuming this exists
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MultipleSelector, { Option } from "@/components/ui/multiselect";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator"; // For visual separation
import { Textarea } from "@/components/ui/textarea";
import { schoolLogoImage } from "@/lib/context/images";
import {
  schoolEducationLevel,
  schoolLabs,
  SchoolSportsExtracurricular,
} from "@/lib/context/school.context"; // Adjust import path
import {
  AffiliationTypeEnum,
  AttendanceSystemEnum,
  SchoolDto,
  SchoolMembers,
  SchoolTypeEnum,
} from "@/lib/schema/school/school.dto";
import { updateSchoolSchoolService } from "@/service/school/school.service";
import {
  PublicSchoolUpdateDto,
  PublicSchoolUpdateSchema,
} from "./schema/update-school-public-info";

interface Props {
  lang: Locale;
  initialData: SchoolDto;
}

// Helper to convert array of strings to array of Option for MultipleSelector
const stringsToOptions = (items: string[] | null | undefined): Option[] => {
  if (!items) return [];
  return items.map((item) => ({ label: item, value: item }));
};

// Helper to convert array of Option back to array of strings
const optionsToStrings = (options: Option[] | null | undefined): string[] => {
  if (!options) return [];
  return options.map((option) => option.value);
};

const UpdateSchoolPublicInfoForm = ({ initialData }: Props) => {
  const [error, setError] = useState<string | null | undefined>("");
  const [success, setSuccess] = useState<string | null | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { theme } = useTheme();
  const form = useForm<PublicSchoolUpdateDto>({
    resolver: zodResolver(PublicSchoolUpdateSchema),
    defaultValues: {
      logo: initialData?.logo ?? undefined,
      name: initialData?.name ?? undefined,
      username: initialData?.username ?? undefined, // Make sure username is in initialData
      description: initialData?.description ?? undefined,
      schoolType: initialData?.schoolType ?? undefined,
      schoolMembers: initialData?.schoolMembers ?? undefined,
      curriculum: initialData?.curriculum ?? [], // Should be string[] | undefined
      educationLevel: initialData?.educationLevel ?? [], // Should be string[] | undefined
      accreditationNumber: initialData?.accreditationNumber ?? undefined,
      affiliation: initialData?.affiliation ?? undefined, // Use correct enum if available
      address: {
        street: initialData?.address?.street ?? undefined,
        city: initialData?.address?.city ?? undefined,
        state: initialData?.address?.state ?? undefined,
        postalCode: initialData?.address?.postalCode ?? undefined,
        country: initialData?.address?.country ?? "Rwanda", // Default or from data
        googleMapUrl: initialData?.address?.googleMapUrl ?? undefined,
      },
      contact: {
        phone: initialData?.contact?.phone ?? undefined,
        email: initialData?.contact?.email ?? undefined,
      },
      website: initialData?.website ?? undefined,
      socialMedia: initialData?.socialMedia ?? undefined, // TODO: Handle with useFieldArray if needed
      studentCapacity: initialData?.studentCapacity ?? undefined,
      uniformRequired: initialData?.uniformRequired ?? undefined,
      attendanceSystem: initialData?.attendanceSystem ?? undefined,
      scholarshipAvailable: initialData?.scholarshipAvailable ?? undefined,
      classrooms: initialData?.classrooms ?? undefined,
      library: initialData?.library ?? undefined,
      labs: initialData?.labs ?? [], // Should be string[] | undefined
      sportsExtracurricular: initialData?.sportsExtracurricular ?? [], // Should be string[] | undefined
      onlineClasses: initialData?.onlineClasses ?? undefined,
    },
  });
  const handleLogoChange = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void,
  ) => {
    setError("");
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (!file.type.includes("image")) {
        return setError("Please select an image file for the logo.");
      }
      const maxSizeInBytes = 2 * 1024 * 1024; // 2MB limit
      if (file.size > maxSizeInBytes) {
        return setError("Logo image size should be less than 2MB.");
      }
      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl); // Update form state
      };
      fileReader.readAsDataURL(file);
    }
  };

  const onSubmit = (values: PublicSchoolUpdateDto) => {
    setSuccess(null);
    setError(null);

    const dataToSubmit: PublicSchoolUpdateDto = {
      ...values,
      studentCapacity: values.studentCapacity
        ? Number(values.studentCapacity)
        : undefined,
      classrooms: values.classrooms ? Number(values.classrooms) : undefined,
    };

    console.log("Submitting Update Data:", dataToSubmit); // Debugging

    startTransition(async () => {
      const update = await updateSchoolSchoolService(
        initialData?.id,
        dataToSubmit,
      ); // Use the update service
      if (update?.data) {
        // Adjust based on your service response structure
        setSuccess("School information updated successfully ✅");
        // Optional: refresh data or redirect
        // router.refresh(); // Or invalidate cache if using a data fetching library
        // router.push(`/${lang}/s-t/dashboard/${schoolId}`); // Example redirect
      } else if (update?.error) {
        setError(`Update failed: ${update.message || update.error}`);
      } else {
        setError("An unknown error occurred during the update.");
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="basic-card space-y-8 p-6 shadow-sm md:p-8" // Added padding
      >
        {/* --- Section: Basic Information --- */}
        <div className="space-y-6">
          <h3 className="mb-4 border-b pb-2 text-xl font-semibold">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* School Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Green Hills Academy"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* School Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., greenhills"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormDescription>
                    Unique identifier (usually cannot be changed).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* School Type */}
            <FormField
              control={form.control}
              name="schoolType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? ""} // Use value, not defaultValue after initial load
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select school type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent data-theme={theme}>
                      {SchoolTypeEnum.options.map((type) => (
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

            {/* School Members */}
            <FormField
              control={form.control}
              name="schoolMembers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Body</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select student body type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent data-theme={theme}>
                      {SchoolMembers.options.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Gender mix of students the school accepts.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Logo Upload */}
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem className="mt-4 flex flex-col gap-2">
                <FormLabel>School Logo</FormLabel>
                <div className="flex items-center gap-4">
                  <Label
                    htmlFor="logo-update-upload"
                    className="cursor-pointer"
                  >
                    <MyImage
                      src={field.value || schoolLogoImage} // Placeholder
                      className="size-24 rounded border"
                      classname="object-contain"
                      alt="School Logo Preview"
                    />
                  </Label>
                  <FormControl>
                    <Input
                      id="logo-update-upload" // Unique ID
                      disabled={isPending}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      // Reset field value before triggering onChange to allow re-uploading same file
                      onClick={(e) => (e.currentTarget.value = "")}
                      onChange={(e) => handleLogoChange(e, field.onChange)}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      document.getElementById("logo-update-upload")?.click()
                    }
                    disabled={isPending}
                  >
                    {field.value ? "Change Logo" : "Upload Logo"}
                  </Button>
                  {field.value && ( // Add a remove button
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => field.onChange(undefined)} // Set value to undefined to clear
                      disabled={isPending}
                      className="text-destructive hover:text-destructive"
                    >
                      Remove
                    </Button>
                  )}
                </div>
                <FormDescription>
                  Max 2MB. Recommended: square aspect ratio.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about the school"
                    className="min-h-[100px] resize-y"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator className="my-8" />

        {/* --- Section: Academic Details --- */}
        <div className="space-y-6">
          <h3 className="mb-4 border-b pb-2 text-xl font-semibold">
            Academic Details
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Curriculum */}

            {/* Education Level */}
            <FormField
              control={form.control}
              name="educationLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Education Levels Offered</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      value={stringsToOptions(field.value)}
                      onChange={field.onChange}
                      defaultOptions={schoolEducationLevel} // Assuming this is Option[]
                      placeholder="Select levels..."
                      creatable
                      hidePlaceholderWhenSelected
                    />
                  </FormControl>
                  <FormDescription>
                    Select or add education levels provided.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Accreditation Number */}
            <FormField
              control={form.control}
              name="accreditationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Accreditation Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Optional accreditation number"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Affiliation */}
            <FormField
              control={form.control}
              name="affiliation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Affiliation</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select school affiliation" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent data-theme={theme}>
                      {/* Make sure AffiliationTypeEnum is defined and imported */}
                      {AffiliationTypeEnum?.options?.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      )) ?? (
                        <SelectItem value="none" disabled>
                          No affiliations defined
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator className="my-8" />

        {/* --- Section: Contact & Location --- */}
        <div className="space-y-6">
          <h3 className="mb-4 border-b pb-2 text-xl font-semibold">
            Contact & Location
          </h3>
          {/* Address Fields */}
          <div className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="address.street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Street address"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="City"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Province / State</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Province or State"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Postal Code"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Country"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.googleMapUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Google Maps URL</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://maps.google.com/..."
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Contact Fields */}
          <div className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="contact.phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="School phone number"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Official school email"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Website */}
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://www.schoolwebsite.com"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Social Media - TODO: Implement using useFieldArray for dynamic adding/removing */}
          <div className="space-y-2">
            <Label>Social Media</Label>
            <FormDescription>
              Update social media links. (Note: Dynamic adding/removing requires
              further implementation with useFieldArray).
            </FormDescription>
            {/* Placeholder for where dynamic fields would go */}
            {/* Example static (less ideal):
                         <FormField control={form.control} name="socialMedia[0].url" render={...} /> // Not recommended for arrays
                         */}
            <p className="text-muted-foreground rounded border p-4 text-sm">
              [Social Media Links section requires implementation using
              useFieldArray]
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        {/* --- Section: Facilities & Operations --- */}
        <div className="space-y-6">
          <h3 className="mb-4 border-b pb-2 text-xl font-semibold">
            Facilities & Operations
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Student Capacity */}
            <FormField
              control={form.control}
              name="studentCapacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Capacity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0" // Allow 0 capacity? Or 1?
                      step="1"
                      placeholder="Total student capacity"
                      {...field}
                      value={field.value ?? ""}
                      // Ensure value is passed as number or undefined
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? undefined
                            : parseInt(e.target.value, 10),
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Classrooms */}
            <FormField
              control={form.control}
              name="classrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Classrooms</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0" // Allow 0 classrooms?
                      step="1"
                      placeholder="Number of classrooms"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? undefined
                            : parseInt(e.target.value, 10),
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Attendance System */}
            <FormField
              control={form.control}
              name="attendanceSystem"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attendance System</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select attendance system" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent data-theme={theme}>
                      {AttendanceSystemEnum.options.map((type) => (
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

            {/* Uniform Required */}
            <FormField
              control={form.control}
              name="uniformRequired"
              render={({ field }) => (
                <FormItem className="space-y-3 pt-2">
                  {" "}
                  {/* Increased spacing */}
                  <FormLabel>Uniform Required?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                      value={
                        field.value === undefined
                          ? undefined
                          : String(field.value)
                      } // Controlled component needs string value
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-y-0 space-x-2">
                        <FormControl>
                          <RadioGroupItem value="true" id="uniform-yes" />
                        </FormControl>
                        <Label htmlFor="uniform-yes" className="font-normal">
                          Yes
                        </Label>
                      </FormItem>
                      <FormItem className="flex items-center space-y-0 space-x-2">
                        <FormControl>
                          <RadioGroupItem value="false" id="uniform-no" />
                        </FormControl>
                        <Label htmlFor="uniform-no" className="font-normal">
                          No
                        </Label>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Scholarship Available */}
            <FormField
              control={form.control}
              name="scholarshipAvailable"
              render={({ field }) => (
                <FormItem className="space-y-3 pt-2">
                  <FormLabel>Scholarships Available?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                      value={
                        field.value === undefined
                          ? undefined
                          : String(field.value)
                      }
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-y-0 space-x-2">
                        <FormControl>
                          <RadioGroupItem value="true" id="scholarship-yes" />
                        </FormControl>
                        <Label
                          htmlFor="scholarship-yes"
                          className="font-normal"
                        >
                          Yes
                        </Label>
                      </FormItem>
                      <FormItem className="flex items-center space-y-0 space-x-2">
                        <FormControl>
                          <RadioGroupItem value="false" id="scholarship-no" />
                        </FormControl>
                        <Label htmlFor="scholarship-no" className="font-normal">
                          No
                        </Label>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Library Available */}
            <FormField
              control={form.control}
              name="library"
              render={({ field }) => (
                <FormItem className="space-y-3 pt-2">
                  <FormLabel>Library Available?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                      value={
                        field.value === undefined
                          ? undefined
                          : String(field.value)
                      }
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-y-0 space-x-2">
                        <FormControl>
                          <RadioGroupItem value="true" id="library-yes" />
                        </FormControl>
                        <Label htmlFor="library-yes" className="font-normal">
                          Yes
                        </Label>
                      </FormItem>
                      <FormItem className="flex items-center space-y-0 space-x-2">
                        <FormControl>
                          <RadioGroupItem value="false" id="library-no" />
                        </FormControl>
                        <Label htmlFor="library-no" className="font-normal">
                          No
                        </Label>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Online Classes */}
            <FormField
              control={form.control}
              name="onlineClasses"
              render={({ field }) => (
                <FormItem className="space-y-3 pt-2">
                  <FormLabel>Online Classes Offered?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                      value={
                        field.value === undefined
                          ? undefined
                          : String(field.value)
                      }
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-y-0 space-x-2">
                        <FormControl>
                          <RadioGroupItem value="true" id="online-yes" />
                        </FormControl>
                        <Label htmlFor="online-yes" className="font-normal">
                          Yes
                        </Label>
                      </FormItem>
                      <FormItem className="flex items-center space-y-0 space-x-2">
                        <FormControl>
                          <RadioGroupItem value="false" id="online-no" />
                        </FormControl>
                        <Label htmlFor="online-no" className="font-normal">
                          No
                        </Label>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Labs */}
            <FormField
              control={form.control}
              name="labs" // This field holds string[] | undefined
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Labs Available</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      // Convert string[] from form state to Option[] for the component
                      value={stringsToOptions(field.value)}
                      // The component's onChange likely gives Option[], convert back to string[] for the form state
                      onChange={(options: Option[]) =>
                        field.onChange(optionsToStrings(options))
                      }
                      defaultOptions={schoolLabs} // Assuming this is Option[]
                      placeholder="Select labs..."
                      creatable
                      hidePlaceholderWhenSelected
                    />
                  </FormControl>
                  <FormDescription>
                    Select or add available lab types.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Sports & Extracurricular */}
            <FormField
              control={form.control}
              name="sportsExtracurricular"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sports & Extracurricular</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      value={stringsToOptions(field.value)} // Expects Option[]
                      onChange={field.onChange}
                      defaultOptions={SchoolSportsExtracurricular} // Assuming Option[]
                      placeholder="Select activities..."
                      creatable
                      hidePlaceholderWhenSelected
                    />
                  </FormControl>
                  <FormDescription>
                    Select or add sports/activities offered.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator className="my-8" />

        {/* --- Form Actions --- */}
        <FormSuccess message={success} />
        <FormError message={error} />

        <Button
          type="submit"
          className="w-full md:w-auto"
          disabled={
            isPending ||
            (!form.formState.isDirty && !form.formState.isSubmitSuccessful)
          }
        >
          {isPending ? "Saving Changes..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
};

export default UpdateSchoolPublicInfoForm;
