// Ensure this is at the top of your .tsx file for Next.js App Router client components
"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/lib/context/toast/ToastContext";
import { updateSchoolSchoolService } from "@/service/school/school.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle, Trash2 } from "lucide-react";
import React, {
  useCallback,
  useId,
  useMemo,
  useState,
  useTransition,
} from "react";
import {
  Control,
  useFieldArray,
  useForm,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import {
  ContactLocationDto,
  ContactLocationSchema,
} from "./schema/contact-location"; // Make sure SocialMediaLink type is available

// Define a type for social media platform configuration
interface SocialMediaPlatform {
  name: string;
  urlRegex: RegExp;
  urlTemplate: string;
  icon: string;
}

// Moved outside components as it's static configuration
const SOCIAL_MEDIA_PLATFORMS_LIST: SocialMediaPlatform[] = [
  {
    name: "Facebook",
    urlRegex: /facebook\.com/i,
    urlTemplate: "https://www.facebook.com/{username}",
    icon: "/icons/facebook.png",
  },
  {
    name: "Twitter",
    urlRegex: /twitter\.com|x\.com/i,
    urlTemplate: "https://www.twitter.com/{username}",
    icon: "/icons/twitter.png",
  },
  {
    name: "Instagram",
    urlRegex: /instagram\.com/i,
    urlTemplate: "https://www.instagram.com/{username}",
    icon: "/icons/instagram.png",
  },
  {
    name: "LinkedIn",
    urlRegex: /linkedin\.com/i,
    urlTemplate: "https://www.linkedin.com/in/{username}",
    icon: "/icons/linkedin.png",
  },
  {
    name: "YouTube",
    urlRegex: /youtube\.com|youtu\.be/i,
    urlTemplate: "https://www.youtube.com/@{username}", // Corrected YouTube template
    icon: "/icons/youtube.png",
  },
  {
    name: "Threads",
    urlRegex: /threads\.com|threads\.be/i,
    urlTemplate: "https://www.youtube.com/@{username}", // Corrected YouTube template
    icon: "/icons/threads.png",
  },
  {
    name: "Other",
    urlRegex: /.*/i, // Catch-all, should be last
    urlTemplate: "{username}", // Or just the direct link
    icon: "/icons/chain.png",
  },
];

const DEFAULT_PLATFORM = "Other";
const OTHER_PLATFORM_ICON =
  SOCIAL_MEDIA_PLATFORMS_LIST.find((p) => p.name === DEFAULT_PLATFORM)?.icon ||
  "/icons/linkedin.png";

const detectSocialMediaPlatform = (url: string): string => {
  if (!url || typeof url !== "string") return DEFAULT_PLATFORM;
  for (const platform of SOCIAL_MEDIA_PLATFORMS_LIST) {
    // Ensure 'Other' regex doesn't prematurely match if it's not the last one checked
    if (platform.name !== DEFAULT_PLATFORM && platform.urlRegex.test(url)) {
      return platform.name;
    }
  }
  return DEFAULT_PLATFORM; // Default if no specific platform matches
};

const getSocialMediaIconComponent = (platformName?: string): string => {
  if (!platformName) return OTHER_PLATFORM_ICON;
  const platform = SOCIAL_MEDIA_PLATFORMS_LIST.find(
    (p) => p.name.toLowerCase() === platformName.toLowerCase(),
  );
  return platform ? platform.icon : OTHER_PLATFORM_ICON;
};

interface SocialMediaItemProps {
  index: number;
  control: Control<ContactLocationDto>; // Strongly typed control
  remove: (index: number) => void;
  setValue: UseFormSetValue<ContactLocationDto>; // Strongly typed setValue
  getValues: UseFormGetValues<ContactLocationDto>; // Strongly typed getValues
  watch: UseFormWatch<ContactLocationDto>; // Strongly typed watch
}

const SocialMediaItem: React.FC<SocialMediaItemProps> = ({
  index,
  control,
  remove,
  setValue,
  getValues,
  watch,
}) => {
  // Watch the specific platform value for this item
  const platformValue =
    watch(`socialMedia.${index}.platform` as const) || DEFAULT_PLATFORM;

  const currentIcon = useMemo(
    () => getSocialMediaIconComponent(platformValue),
    [platformValue],
  );

  const [inputMode, setInputMode] = useState<"url" | "username">("url");

  const currentPlatformConfig = useMemo(
    () =>
      SOCIAL_MEDIA_PLATFORMS_LIST.find((p) => p.name === platformValue) ||
      SOCIAL_MEDIA_PLATFORMS_LIST.find((p) => p.name === DEFAULT_PLATFORM)!,
    [platformValue],
  );
  const urlTemplate = currentPlatformConfig.urlTemplate;

  const handleUsernameChange = useCallback(
    (username: string) => {
      if (username.trim() === "") {
        setValue(`socialMedia.${index}.link`, "", { shouldValidate: true });
        return;
      }
      if (urlTemplate.includes("{username}")) {
        const constructedUrl = urlTemplate.replace("{username}", username);
        setValue(`socialMedia.${index}.link`, constructedUrl, {
          shouldValidate: true,
        });
      } else {
        // If no {username} in template (e.g. for 'Other' if it's just a direct link)
        // This case might need refinement based on how 'Other' should behave with username input
        setValue(`socialMedia.${index}.link`, username, {
          shouldValidate: true,
        });
      }
    },
    [setValue, index, urlTemplate],
  );

  const extractUsername = useCallback(
    (url: string): string => {
      if (
        !url ||
        platformValue === DEFAULT_PLATFORM ||
        !urlTemplate.includes("{username}")
      )
        return "";

      const platform = SOCIAL_MEDIA_PLATFORMS_LIST.find(
        (p) => p.name === platformValue,
      );
      if (!platform) return "";

      // Attempt to extract username based on the template structure
      // This is a simplified extraction; more robust parsing might be needed for complex templates
      const prefix = platform.urlTemplate.substring(
        0,
        platform.urlTemplate.indexOf("{username}"),
      );
      const suffix = platform.urlTemplate.substring(
        platform.urlTemplate.indexOf("{username}") + "{username}".length,
      );

      if (url.startsWith(prefix) && url.endsWith(suffix)) {
        return url.substring(prefix.length, url.length - suffix.length);
      }

      // Fallback for simple path-based usernames if direct template match fails
      // (e.g. https://twitter.com/username)
      try {
        const urlObj = new URL(url.startsWith("http") ? url : `https://${url}`);
        const pathParts = urlObj.pathname.split("/").filter((part) => part);
        // This logic might need to be platform-specific if paths are not consistent
        if (
          platform.name === "LinkedIn" &&
          pathParts[0] === "in" &&
          pathParts.length > 1
        )
          return pathParts[1];
        return pathParts[0] || "";
      } catch {
        return ""; // Invalid URL
      }
    },
    [platformValue, urlTemplate],
  );

  const handleUrlInputChange = useCallback(
    (newUrl: string) => {
      setValue(`socialMedia.${index}.link`, newUrl, {
        shouldValidate: true,
        shouldDirty: true,
      });
      const detectedPlatform = detectSocialMediaPlatform(newUrl);
      const currentPlatform = getValues(
        `socialMedia.${index}.platform` as const,
      );
      if (currentPlatform !== detectedPlatform) {
        setValue(`socialMedia.${index}.platform`, detectedPlatform, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    },
    [setValue, getValues, index],
  );

  return (
    <div className="flex flex-col items-start gap-3 p-3 sm:flex-row sm:items-center">
      <div className="flex-none">
        <MyImage src={currentIcon} className="size-10" role="ICON" />
      </div>

      <div className="flex-grow space-y-3">
        {platformValue !== DEFAULT_PLATFORM && ( // Only show toggle if not "Other" or if "Other" supports username
          <div className="flex space-x-2">
            <Button
              type="button"
              library={"daisy"}
              variant={inputMode === "url" ? "info" : "outline"}
              size="sm"
              onClick={() => setInputMode("url")}
            >
              Enter URL
            </Button>
            <Button
              type="button"
              library={"daisy"}
              variant={inputMode === "username" ? "info" : "outline"}
              size="sm"
              onClick={() => setInputMode("username")}
              disabled={!urlTemplate.includes("{username}")} // Disable if platform template doesn't use username
            >
              Enter Username
            </Button>
          </div>
        )}

        {inputMode === "url" ||
        !urlTemplate.includes("{username}") ||
        platformValue === DEFAULT_PLATFORM ? (
          <FormField
            control={control}
            name={`socialMedia.${index}.link` as const}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Social Media Link</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://www.example.com/username"
                    {...field}
                    onChange={(e) => handleUrlInputChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <FormField
            control={control}
            // Still bind to link, but display/interact with username
            name={`socialMedia.${index}.link` as const}
            render={(
              { field }, // field.value here is the full link
            ) => (
              <FormItem>
                <FormLabel className="sr-only">Username</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <span className="mr-1 text-sm text-nowrap">
                      {urlTemplate.split("{username}")[0]}
                    </span>
                    <Input
                      type="text"
                      placeholder="username"
                      value={extractUsername(field.value)}
                      onChange={(e) => handleUsernameChange(e.target.value)}
                      className="flex-1"
                    />
                    {urlTemplate.split("{username}")[1] && (
                      <span className="ml-1 text-sm text-nowrap">
                        {urlTemplate.split("{username}")[1]}
                      </span>
                    )}
                  </div>
                </FormControl>
                <FormMessage />{" "}
                {/* Will show validation messages for the 'link' field */}
              </FormItem>
            )}
          />
        )}
      </div>

      <FormField
        control={control}
        name={`socialMedia.${index}.platform` as const}
        render={({ field: platformField }) => (
          <FormItem className="mt-2 w-full sm:mt-0 sm:w-48">
            <FormLabel className="sr-only">Platform</FormLabel>
            <Select
              onValueChange={(value) => {
                platformField.onChange(value);
                // If in username mode and we have a username, reconstruct URL
                if (inputMode === "username" && value !== DEFAULT_PLATFORM) {
                  const currentLink = getValues(
                    `socialMedia.${index}.link` as const,
                  );
                  const username = extractUsername(currentLink);
                  if (username) {
                    const newPlatformConfig = SOCIAL_MEDIA_PLATFORMS_LIST.find(
                      (p) => p.name === value,
                    );
                    if (newPlatformConfig?.urlTemplate.includes("{username}")) {
                      const newUrl = newPlatformConfig.urlTemplate.replace(
                        "{username}",
                        username,
                      );
                      setValue(`socialMedia.${index}.link`, newUrl, {
                        shouldValidate: true,
                      });
                    } else if (newPlatformConfig) {
                      // If new platform doesn't use username, set link to username itself or clear?
                      // This depends on desired behavior. For now, let's assume it keeps username as the link.
                      setValue(`socialMedia.${index}.link`, username, {
                        shouldValidate: true,
                      });
                    }
                  }
                } else if (
                  value === DEFAULT_PLATFORM &&
                  inputMode === "username"
                ) {
                  // If switching to 'Other' in username mode, clear the link or set to username?
                  // Let's clear it to force URL input for 'Other'
                  //setValue(`socialMedia.${index}.link`, '', { shouldValidate: true });
                }
              }}
              value={platformField.value || DEFAULT_PLATFORM}
            >
              <FormControl>
                <SelectTrigger className=" ">
                  <SelectValue placeholder="Select Platform" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {SOCIAL_MEDIA_PLATFORMS_LIST.map((p) => (
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
        variant="ghost"
        size="icon"
        onClick={() => remove(index)}
        className="mt-2 self-center sm:mt-0 sm:self-start"
        aria-label="Remove social media link"
      >
        <Trash2 className="h-5 w-5" />
      </Button>
    </div>
  );
};

interface ContactLocationFormProps {
  schoolId: string;
  initialData?: ContactLocationDto | null;
  onSuccess?: (data: ContactLocationDto) => void; // Optional: Callback for successful submission
  onError?: (error: Error) => void; // Optional: Callback for error
}

export const ContactLocationForm: React.FC<ContactLocationFormProps> = ({
  schoolId,
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
        postalCode: "",
        country: "Rwanda", // Default country
        googleMapUrl: "",
      },
      contact: initialData?.contact ?? { phone: "", email: "" },
      website: initialData?.website ?? "",
      socialMedia:
        initialData?.socialMedia?.map((sm) => ({
          id: useId, // Assuming `id` is part of SocialMediaLink for key prop if it's from DB
          link: sm.link || "",
          platform: sm.platform || detectSocialMediaPlatform(sm.link || ""),
        })) ?? [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "socialMedia",
    control: form.control,
  });

  const handleFormSubmit = async (values: ContactLocationDto) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    startTransition(async () => {
      const res = await updateSchoolSchoolService(schoolId, values);
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
                name="address.postalCode"
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
                name="address.googleMapUrl"
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
                name="contact.whatsappNumber"
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
                <SocialMediaItem
                  key={item.id} // item.id is provided by useFieldArray
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
                    platform: DEFAULT_PLATFORM,
                    link: "",
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
