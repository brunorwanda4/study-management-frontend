// Ensure this is at the top of your .tsx file for Next.js App Router client components
"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // Assume these are shadcn/ui components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { PlusCircle, Trash2 } from "lucide-react"; // Using lucide for these
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BsFacebook,
  BsInstagram,
  BsLink45Deg,
  BsLinkedin,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";
import {
  ContactLocationDto,
  ContactLocationSchema,
} from "./schema/contact-location";

const detectSocialMediaPlatform = (url: string): string => {
  if (!url || typeof url !== "string") return "Other";
  for (const platform of socialMediaPlatformsList) {
    if (platform.urlRegex.test(url)) {
      return platform.name;
    }
  }
  return "Other";
};

// Define social media platforms and their properties
const socialMediaPlatformsList = [
  {
    name: "Facebook",
    urlRegex: /facebook\.com/i,
    icon: <BsFacebook className="w-5 h-5" />,
  },
  {
    name: "Twitter",
    urlRegex: /twitter\.com|x\.com/i,
    icon: <BsTwitter className="w-5 h-5" />,
  }, // Added x.com
  {
    name: "Instagram",
    urlRegex: /instagram\.com/i,
    icon: <BsInstagram className="w-5 h-5" />,
  },
  {
    name: "LinkedIn",
    urlRegex: /linkedin\.com/i,
    icon: <BsLinkedin className="w-5 h-5" />,
  },
  {
    name: "YouTube",
    urlRegex: /youtube\.com|youtu\.be/i,
    icon: <BsYoutube className="w-5 h-5" />,
  },
  { name: "Other", urlRegex: /.*/i, icon: <BsLink45Deg className="w-5 h-5" /> }, // Catch-all
];

// Function to get the social media icon component based on platform name
const getSocialMediaIconComponent = (platformName?: string) => {
  if (!platformName)
    return socialMediaPlatformsList.find((p) => p.name === "Other")?.icon;
  const platform = socialMediaPlatformsList.find(
    (p) => p.name.toLowerCase() === platformName.toLowerCase()
  );
  return platform
    ? platform.icon
    : socialMediaPlatformsList.find((p) => p.name === "Other")?.icon;
};




// Interface for individual Social Media Item props
interface SocialMediaItemProps {
  index: number;
  control: any;
  remove: (index: number) => void;
  setValue: Function; // From useForm
  getValues: Function; // From useForm
  watch: Function; // From useForm
}

// Sub-component for managing a single social media entry
const SocialMediaItem: React.FC<SocialMediaItemProps> = ({
  index,
  control,
  remove,
  setValue,
  getValues,
  watch,
}) => {
  const platformValue = watch(`socialMedia.${index}.platform`); // Watch the platform value for this item
  const currentIcon = getSocialMediaIconComponent(platformValue);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 border rounded-md bg-gray-50 dark:bg-gray-800 shadow-sm">
      <div className="flex-none w-8 h-8 flex items-center justify-center text-gray-500 dark:text-gray-400 mb-2 sm:mb-0">
        {currentIcon}
      </div>
      <FormField
        control={control}
        name={`socialMedia.${index}.link`}
        render={({ field }) => (
          <FormItem className="flex-grow w-full sm:w-auto">
            <FormLabel className="sr-only">Social Media Link</FormLabel>
            <FormControl>
              <Input
                type="url"
                placeholder="https://www.example.com/username"
                {...field}
                onChange={(e) => {
                  const url = e.target.value;
                  field.onChange(url); // Update form value for link
                  const detectedPlatform = detectSocialMediaPlatform(url);
                  // Update platform field if detection changes it
                  if (
                    getValues(`socialMedia.${index}.platform`) !==
                    detectedPlatform
                  ) {
                    setValue(
                      `socialMedia.${index}.platform`,
                      detectedPlatform,
                      { shouldValidate: true, shouldDirty: true }
                    );
                  }
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`socialMedia.${index}.platform`}
        render={(
          { field: platformField } // Renamed field to platformField for clarity
        ) => (
          <FormItem className="w-full sm:w-48">
            <FormLabel className="sr-only">Social Media Platform</FormLabel>
            <Select
              onValueChange={(value) => {
                platformField.onChange(value); // Update platform value
              }}
              value={platformField.value || "Other"} // Ensure a value is always present for Select
            >
              <FormControl>
                <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                  <SelectValue placeholder="Select Platform" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {socialMediaPlatformsList.map((p) => (
                  <SelectItem key={p.name} value={p.name}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        type="button"
        variant="ghost" // More subtle than destructive for remove action within a form item
        size="icon"
        onClick={() => remove(index)}
        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600 mt-2 sm:mt-0 self-end sm:self-center"
        aria-label="Remove social media link"
      >
        <Trash2 className="h-5 w-5" />
      </Button>
    </div>
  );
};


interface ContactLocationFormProps {
  schoolId: string; // Added schoolId
  initialData?: ContactLocationDto | null;
  // The onSubmitForm prop is removed, actual submission logic will be inside this component
  // If you need to notify parent on success/error, you can add specific callbacks like onSuccess, onError
}

export const ContactLocationForm: React.FC<ContactLocationFormProps> = ({
  schoolId,
  initialData,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactLocationDto>({
    resolver: zodResolver(ContactLocationSchema),
    defaultValues: {
      address: initialData?.address ?? {
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "Rwanda",
        googleMapUrl: "",
      },
      contact: initialData?.contact ?? { phone: "", email: "" },
      website: initialData?.website ?? "",
      socialMedia:
        initialData?.socialMedia?.map((sm) => ({
          ...sm,
          platform: sm.platform || detectSocialMediaPlatform(sm.link || ""),
        })) ?? [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "socialMedia",
    control: form.control,
  });

  // Actual submission logic
  const handleFormSubmit = async (values: ContactLocationDto) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    console.log("Updating school data for school ID:", schoolId);
    console.log("Form Values:", values);

    try {
      // Replace with your actual API call
      // Example: const response = await fetch(`/api/schools/${schoolId}/contact`, {
      // method: 'PUT', // or 'PATCH'
      // headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify(values),
      // });
      // if (!response.ok) {
      // const errorData = await response.json();
      // throw new Error(errorData.message || 'Failed to update school contact information.');
      // }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // const result = await response.json(); // If your API returns data

      setSuccessMessage("School contact information updated successfully!");
      // Optionally reset form if needed, or redirect, or update UI
      // form.reset(values); // Resets dirty state, keeps new values
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Submission error:", error);
      setErrorMessage(
        error?.message || "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-4 md:p-6 shadow-lg rounded-xl bg-white dark:bg-gray-900">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="space-y-8"
        >
          <h3 className="text-2xl font-semibold mb-6 pb-3 border-b border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100">
            Update School Contact & Location
          </h3>

          {/* Address Fields */}
          <div className="space-y-4 p-4 border rounded-lg bg-slate-50 dark:bg-slate-800/50">
            <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Address Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="address.street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 123 Main St" {...field} />
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
                      <Input placeholder="e.g., Kigali" {...field} />
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
                      <Input placeholder="e.g., Kigali Province" {...field} />
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
                      <Input placeholder="e.g., 5000 (Optional)" {...field} />
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
                        placeholder="e.g., Rwanda"
                        {...field}
                        value={field.value || "Rwanda"}
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
                        placeholder="https://maps.google.com/... (Optional)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Contact Fields */}
          <div className="space-y-4 p-4 border rounded-lg bg-slate-50 dark:bg-slate-800/50">
            <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Contact Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="contact.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="e.g., +250 788 123 456"
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
                        placeholder="e.g., info@school.org"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Website Field */}
          <div className="space-y-4 p-4 border rounded-lg bg-slate-50 dark:bg-slate-800/50">
            <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Online Presence
            </h4>
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://www.schoolwebsite.com (Optional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Social Media Section */}
          <div className="space-y-4 p-4 border rounded-lg bg-slate-50 dark:bg-slate-800/50">
            <Label className="text-lg font-medium text-gray-700 dark:text-gray-300 block mb-1">
              Social Media
            </Label>
            <FormDescription className="text-sm text-gray-600 dark:text-gray-400">
              Add social media links. The platform will be auto-detected, or you
              can select it manually.
            </FormDescription>
            <div className="space-y-4 mt-3">
              {fields.map((item, index) => (
                <SocialMediaItem
                  key={item.id}
                  index={index}
                  control={form.control}
                  remove={remove}
                  setValue={form.setValue}
                  getValues={form.getValues}
                  watch={form.watch}
                />
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => append({ platform: "Other", link: "" })}
             library="daisy"
            >
              <PlusCircle className="h-4 w-4" /> Add Social Media
            </Button>
          </div>

          {/* Success and Error Message Display */}
          {successMessage && (
            <p className="text-sm font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 p-3 rounded-md">
              {successMessage}
            </p>
          )}
          {errorMessage && (
            <p className="text-sm font-medium text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 p-3 rounded-md">
              {errorMessage}
            </p>
          )}

          <Button
            type="submit"
            library="daisy"
            variant={"info"}
            disabled={
              isSubmitting ||
              (!form.formState.isDirty && !form.formState.isSubmitSuccessful)
            } // Keep enabled after successful submit if you want to allow multiple submits without changes
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </div>
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </Form>
    </Card>
  );
};
