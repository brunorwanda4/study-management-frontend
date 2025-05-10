"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChangeEvent, useState, useTransition } from "react";
import { useTheme } from "next-themes";

import {
  AffiliationTypeEnum,
  AttendanceSystemEnum,
  CreateSchoolDto,
  CreateSchoolSchema,
  SchoolMembers,
  SchoolTypeEnum,
} from "@/lib/schema/school.dto"; // Adjust import path
import { Locale } from "@/i18n"; // Assuming you might need this

// Import Shadcn UI Components
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// Import Custom Components (Ensure these exist)
import MyImage from "@/components/myComponents/myImage"; // Assuming this exists
import { FormError, FormSuccess } from "@/components/myComponents/form-message"; // Assuming this exists
import MultipleSelector from "../../ui/multiselect";
import {
  SchoolCurriculum,
  schoolEducationLevel,
  schoolLabs,
  SchoolSportsExtracurricular,
} from "@/lib/context/school.context";
import { useRouter } from "next/navigation";
import { createSchoolService } from "@/service/school/school.service";
import { useToast } from "@/lib/context/toast/ToastContext";

interface Props {
  lang: Locale;
  userId: string;
}

const CreateSchoolForm = ({ lang, userId }: Props) => {
  const [error, setError] = useState<string | null | undefined>("");
  const [success, setSuccess] = useState<string | null | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { theme } = useTheme();
  const router = useRouter();
  const { showToast } = useToast();
  const form = useForm<CreateSchoolDto>({
    resolver: zodResolver(CreateSchoolSchema),
    defaultValues: {
      creatorId: userId,
      username: "",
      logo: undefined,
      name: "",
      description: "",
      schoolType: undefined,
      curriculum: [],
      educationLevel: [],
      schoolMembers: undefined,
      accreditationNumber: "",
      affiliation: undefined,
      address: {
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "Rwanda", // Default or make it selectable
        googleMapUrl: undefined,
      },
      contact: {
        phone: "",
        email: "",
      },
      website: undefined,
      socialMedia: [], // Simplified or omitted for now
      studentCapacity: undefined,
      uniformRequired: true,
      attendanceSystem: undefined,
      scholarshipAvailable: false,
      classrooms: undefined,
      library: true,
      labs: [],
      sportsExtracurricular: [],
      onlineClasses: true,
    },
  });

  // Image handler adapted for Logo
  const handleLogoChange = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
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
        fieldChange(imageDataUrl);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const onSubmit = (values: CreateSchoolDto) => {
    setSuccess(null);
    setError(null);
    startTransition(async () => {
      const create = await createSchoolService(values);
      if (create?.data?.id) {
        setSuccess("School is registered successful ☺️");
        showToast({
          type: "success",
          title: (
            <div>
              <MyImage src={"/logo.png"} className=" size-10" />
              <h3>space-together</h3>
            </div>
          ),
          description: (
            <div>
              {create.data.logo && (
                <MyImage src={create.data.logo} role="ICON" />
              )}
              <h3 className=" text-lg">{create.data.name}</h3>
              Has been created successful 🌻
            </div>
          ),
          duration: 4000,
        });
        router.push(`/${lang}/s-t/new/${create.data.id}/academic`);
      } else if (create?.message) {
        showToast({
          type: "error",
          title: "Some thing went wrong to create school 🌋",
          description: create.message,
          duration: 3000,
        });
        setError(`message : ${create.message}`);
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 basic-card shadow-sm"
      >
        {/* Section: Basic Info */}
        <div className="">
          <h3 className="text-lg font-medium mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* School Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School Name *</FormLabel>
                  <FormControl>
                    <Input
                      autoFocus
                      placeholder="e.g., Green Hills Academy"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* School school member */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School Username *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., greenhills" {...field} />
                  </FormControl>
                  <FormDescription>
                    Unique identifier for the school.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* school type  */}
            <FormField
              control={form.control}
              name="schoolType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School Type *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
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
                  <FormDescription>School type of you school</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* School member */}
            <FormField
              control={form.control}
              name="schoolMembers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select school type" />
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
                    Student gender school receive
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
                  <Label htmlFor="logo-upload" className="cursor-pointer">
                    <MyImage
                      src={
                        field.value ||
                        "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg"
                      } // Default placeholder
                      className="size-24 border rounded" // Adjust styling as needed
                      classname=" object-contain" // Adjust styling as needed
                      alt="School Logo"
                    />
                  </Label>
                  <FormControl>
                    <Input
                      id="logo-upload"
                      disabled={isPending}
                      type="file"
                      accept="image/*"
                      placeholder="Upload Logo"
                      className="hidden" // Hide default input, trigger via label/MyImage
                      onChange={(e) => handleLogoChange(e, field.onChange)}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      document.getElementById("logo-upload")?.click()
                    }
                    disabled={isPending}
                  >
                    {field.value ? "Change Logo" : "Upload Logo"}
                  </Button>
                </div>
                <FormDescription>
                  Recommended size: 200x200px, Max 2MB.
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
                    className="resize-y min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Section: Academic Details */}
        <div className="">
          <h3 className="text-lg font-medium mb-4">Academic Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Curriculum */}
            <FormField
              control={form.control}
              name="curriculum"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Curriculum *</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      value={field.value}
                      onChange={field.onChange}
                      defaultOptions={SchoolCurriculum}
                      placeholder="e.g., REB, TVET"
                      hidePlaceholderWhenSelected
                    />
                  </FormControl>
                  <FormDescription>
                    Enter one or more curricula, separated by commas.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Education Level */}
            <FormField
              control={form.control}
              name="educationLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Education Levels Offered *</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      value={field.value}
                      onChange={field.onChange}
                      defaultOptions={schoolEducationLevel}
                      placeholder="e.g., Primary, Ordinary Level"
                      hidePlaceholderWhenSelected
                    />
                  </FormControl>
                  <FormDescription>
                    Enter levels, separated by commas.
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
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select school Affiliation" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent data-theme={theme}>
                      {AffiliationTypeEnum.options.map((type) => (
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
          </div>
        </div>

        {/* Section: Contact & Location */}
        <div className="">
          <h3 className="text-lg font-medium mb-4">Contact & Location</h3>
          {/* Address Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FormField
              control={form.control}
              name="address.street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input placeholder="Street address" {...field} />
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
                    <Input placeholder="City" {...field} />
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
                    <Input placeholder="Province or State" {...field} />
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
                    <Input placeholder="Postal Code" {...field} />
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
                    <Input placeholder="Country" {...field} />
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
                  <FormLabel>Google map URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., https://www.google.com/maps/place/Eiffel+Tower/@48.8583701,2.2922926,17z"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Contact Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Social Media (Simplified) - Add more complex logic if needed */}
          <FormDescription className="mt-4">
            Provide website OR social media links (add social links in
            description or dedicated section later).
          </FormDescription>
        </div>
        <div className="">
          <h3 className="text-lg font-medium mb-4">Facilities & Operations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      min="1"
                      placeholder="Total student capacity"
                      {...field}
                      // Ensure value is passed as number
                      onChange={(e) =>
                        field.onChange(
                          parseInt(e.target.value, 10) || undefined
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
                      min="1"
                      placeholder="Number of classrooms"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          parseInt(e.target.value, 10) || undefined
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
                    defaultValue={field.value}
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
                <FormItem className="space-y-2 pt-2">
                  <FormLabel>Uniform Required?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      } // Convert string value back to boolean
                      defaultValue={
                        field.value === undefined
                          ? undefined
                          : String(field.value)
                      }
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="true" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="false" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
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
                <FormItem className="space-y-2 pt-2">
                  <FormLabel>Scholarships Available?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                      defaultValue={
                        field.value === undefined
                          ? undefined
                          : String(field.value)
                      }
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="true" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="false" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
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
                <FormItem className="space-y-2 pt-2">
                  <FormLabel>Library Available?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                      defaultValue={
                        field.value === undefined
                          ? undefined
                          : String(field.value)
                      }
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="true" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="false" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
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
                <FormItem className="space-y-2 pt-2">
                  <FormLabel>Online Classes Offered?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                      defaultValue={
                        field.value === undefined
                          ? undefined
                          : String(field.value)
                      }
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="true" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="false" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
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
              name="labs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Labs Available</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      value={field.value}
                      onChange={field.onChange}
                      defaultOptions={schoolLabs}
                      placeholder="e.g., Science Lab, Computer Lab"
                      hidePlaceholderWhenSelected
                    />
                  </FormControl>
                  <FormDescription>
                    Enter lab types, separated by commas.
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
                      value={field.value}
                      onChange={field.onChange}
                      defaultOptions={SchoolSportsExtracurricular}
                      placeholder="e.g., Football, Debate Club, Music"
                      hidePlaceholderWhenSelected
                    />
                  </FormControl>
                  <FormDescription>
                    Enter activities, separated by commas.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Submission Area */}
        <div className="mt-2">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>

        <Button
          disabled={isPending}
          type="submit"
          library="daisy"
          variant={"info"}
          className="w-full"
          // variant="primary" // Or your desired variant
        >
          {isPending ? (
            <>
              <div
                role="status"
                aria-label="Loading"
                className="loading loading-spinner mr-2 h-4 w-4" // Adjust spinner styling
              />
              Creating School...
            </>
          ) : (
            "Create School"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CreateSchoolForm;
