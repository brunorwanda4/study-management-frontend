// Ensure this is at the top of your .tsx file for Next.js App Router client components
"use client";

import AddSocialMedia, {
  detectSocialMediaPlatform,
} from "@/components/common/form/add-social-media";
import MyImage from "@/components/common/myImage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { DefaultPlatform } from "@/lib/const/social-media-const";
import { useToast } from "@/lib/context/toast/ToastContext";
import { School } from "@/lib/schema/school/school-schema";
import { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import React, { useState, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  ContactLocationDto,
  ContactLocationSchema,
} from "./schema/contact-location";

interface ContactLocationFormProps {
  auth: AuthContext;
  initialData?: School;
  onSuccess?: (data: ContactLocationDto) => void; // Optional: Callback for successful submission
  onError?: (error: Error) => void; // Optional: Callback for error
}

export const ContactLocationForm: React.FC<ContactLocationFormProps> = ({
  auth,
  initialData,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();
  const form = useForm<ContactLocationDto>({
    resolver: zodResolver(ContactLocationSchema),
    defaultValues: {
      address: initialData?.address ?? {
        street: "",
        city: "",
        state: "",
        postal_code: "",
        country: "Rwanda",
        google_map_url: "",
      },
      contact: initialData?.contact ?? { phone: "", email: "" },
      website: initialData?.website ?? "",
      social_media:
        initialData?.social_media?.map((sm) => ({
          platform: sm.platform || detectSocialMediaPlatform(sm.url || ""),
          url: sm.url || "",
        })) ?? [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "social_media",
    control: form.control,
  });

  const handleFormSubmit = async (values: ContactLocationDto) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    startTransition(async () => {
      const res = await apiRequest<ContactLocationDto, School>(
        "put",
        `/school/${initialData?.id || initialData?._id}`,
        values,
        {
          token: auth.token,
          schoolToken: auth.schoolToken,
        },
      );
      if (res.data) {
        showToast({
          type: "success",
          title: "To update school basic information success!",
          description: "You have been update school basic information",
          duration: 3000,
        });

        form.reset(res.data, {
          // Reset form with new values, clears dirty state
          keepValues: true, // Keeps the current UI values (which should be `result`)
          keepDirty: false,
          keepErrors: false,
          keepTouched: false,
          keepIsValid: true, // Assume submission makes it valid
          keepSubmitCount: true,
        });
      } else {
        showToast({
          type: "error",
          title: "Some thing went wrong to update school information",
          description: res.message,
          duration: 4000,
        });
      }
    });
  };

  return (
    <Card className="p-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="space-y-8"
        >
          <h3 className="mb-6 pb-3 text-2xl font-semibold">
            Update School Contact & Location
          </h3>

          {/* Address Fields */}
          <fieldset className="space-y-4 rounded-lg p-4">
            <legend className="px-1 text-lg font-medium">
              Address Details
            </legend>
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
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
              {/* ... other address fields (city, state, postalCode, country) ... */}
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
                name="address.postal_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Postal Code <span className="text-xs">(Optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 5000" {...field} />
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
                        // Value is handled by defaultValues and field state
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.google_map_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Google Maps URL{" "}
                      <span className="text-xs">(Optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://maps.google.com/?q=..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </fieldset>

          {/* Contact Fields */}
          <fieldset className="space-y-4 rounded-lg p-4">
            <legend className="px-1 text-lg font-medium">
              Contact Information
            </legend>
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
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
              <FormField
                control={form.control}
                name="contact.whatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex space-x-2">
                      <MyImage src="/icons/whatsapp.png" role="ICON" />
                      <span> Whatsapp number</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="+250 7925 3727"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </fieldset>

          {/* Website Field */}
          <fieldset className="space-y-4 rounded-lg p-4">
            <legend className="px-1 text-lg font-medium">
              Online Presence
            </legend>
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Website <span className="text-xs">(Optional)</span>
                  </FormLabel>
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
          </fieldset>

          {/* Social Media Section */}
          <fieldset className="space-y-4 rounded-lg p-4">
            <legend className="mb-1 px-1 text-lg font-medium">
              Social Media <span className="text-xs">(Optional)</span>
            </legend>
            <FormDescription className="text-sm">
              Add social media links. The platform will be auto-detected, or you
              can select it manually.
            </FormDescription>
            <div className="mt-3 space-y-4">
              {fields.map((item, index) => (
                <AddSocialMedia<ContactLocationDto>
                  key={item.id ?? index}
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
              variant="outline" // Standard shadcn variant
              onClick={
                () =>
                  append({
                    platform: DefaultPlatform,
                    url: "",
                    // id: crypto.randomUUID(),
                  }) // Ensure new item matches SocialMediaLink type
              }
              className="gap-2" // For spacing between icon and text
            >
              <PlusCircle className="h-4 w-4" /> Add Social Media
            </Button>
          </fieldset>

          {/* Success and Error Message Display */}
          {successMessage && (
            <p className="bg-green-100 p-3 text-sm font-medium text-green-600 dark:bg-green-900/30 dark:text-green-400">
              {successMessage}
            </p>
          )}
          {errorMessage && (
            <p className="bg-red-100 p-3 text-sm font-medium text-red-600 dark:bg-red-900/30 dark:text-red-400">
              {errorMessage}
            </p>
          )}

          <Button
            type="submit"
            library={"daisy"}
            variant={"info"} // Standard shadcn variant, e.g., "default" or "destructive" or "secondary"
            // disabled={isPending}
            disabled={
              isPending ||
              (!form.formState.isDirty && !form.formState.isSubmitSuccessful)
            }
            className="min-w-[120px]" // Give button a min width for consistent look
          >
            {isPending ? (
              <div className="flex items-center justify-center">
                <svg
                  className="mr-3 -ml-1 h-5 w-5 animate-spin text-current" // Use text-current for spinner color
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
