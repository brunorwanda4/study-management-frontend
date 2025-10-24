"use client";

import MyImage from "@/components/common/myImage";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DefaultPlatform,
  OtherPlatformIcon,
  SocialMediaPlatformsList,
} from "@/lib/const/social-media-const";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import {
  Control,
  FieldValues,
  Path,
  PathValue,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
  useWatch,
} from "react-hook-form";

export const detectSocialMediaPlatform = (url: string): string => {
  if (!url || typeof url !== "string") return DefaultPlatform;
  for (const platform of SocialMediaPlatformsList) {
    if (platform.name !== DefaultPlatform && platform.urlRegex.test(url)) {
      return platform.name;
    }
  }
  return DefaultPlatform;
};

const getSocialMediaIconComponent = (platformName?: string): string => {
  if (!platformName) return OtherPlatformIcon;
  const platform = SocialMediaPlatformsList.find(
    (p) => p.name.toLowerCase() === platformName.toLowerCase(),
  );
  return platform ? platform.icon : OtherPlatformIcon;
};

interface AddSocialMediaProps<T extends FieldValues> {
  index: number;
  control: Control<T>;
  remove: (index: number) => void;
  setValue: UseFormSetValue<T>;
  getValues: UseFormGetValues<T>;
  watch: UseFormWatch<T>;
  disable?: boolean;
}

/**
 * ✅ FIXED VERSION
 * - Made `social_media` optional in generic type
 * - Corrected all `socialMedia` → `social_media` paths
 */
const AddSocialMedia = <
  T extends FieldValues & {
    social_media?: Array<{ platform: string; url: string }>;
  },
>({
  index,
  control,
  remove,
  setValue,
  getValues,
  watch,
  disable,
}: AddSocialMediaProps<T>) => {
  const platformValue =
    (useWatch({
      control,
      name: `social_media.${index}.platform` as Path<T>,
    }) as string) || DefaultPlatform;

  const currentIcon = useMemo(
    () => getSocialMediaIconComponent(platformValue),
    [platformValue],
  );

  const [inputMode, setInputMode] = useState<"url" | "username">("url");

  const currentPlatformConfig = useMemo(
    () =>
      SocialMediaPlatformsList.find((p) => p.name === platformValue) ||
      SocialMediaPlatformsList.find((p) => p.name === DefaultPlatform)!,
    [platformValue],
  );

  const urlTemplate = currentPlatformConfig.urlTemplate;

  const handleUsernameChange = useCallback(
    (username: string) => {
      if (username.trim() === "") {
        setValue(
          `social_media.${index}.url` as Path<T>,
          "" as PathValue<T, Path<T>>,
          {
            shouldValidate: true,
          },
        );
        return;
      }
      if (urlTemplate.includes("{username}")) {
        const constructedUrl = urlTemplate.replace("{username}", username);
        setValue(
          `social_media.${index}.url` as Path<T>,
          constructedUrl as PathValue<T, Path<T>>,
          { shouldValidate: true },
        );
      } else {
        setValue(
          `social_media.${index}.url` as Path<T>,
          username as PathValue<T, Path<T>>,
          { shouldValidate: true },
        );
      }
    },
    [setValue, index, urlTemplate],
  );

  const extractUsername = useCallback(
    (url: string): string => {
      if (
        !url ||
        platformValue === DefaultPlatform ||
        !urlTemplate.includes("{username}")
      )
        return "";

      const platform = SocialMediaPlatformsList.find(
        (p) => p.name === platformValue,
      );
      if (!platform) return "";

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

      try {
        const urlObj = new URL(url.startsWith("http") ? url : `https://${url}`);
        const pathParts = urlObj.pathname.split("/").filter((part) => part);
        if (
          platform.name === "LinkedIn" &&
          pathParts[0] === "in" &&
          pathParts.length > 1
        )
          return pathParts[1];
        return pathParts[0] || "";
      } catch {
        return "";
      }
    },
    [platformValue, urlTemplate],
  );

  const handleUrlInputChange = useCallback(
    (newUrl: string) => {
      setValue(
        `social_media.${index}.url` as Path<T>,
        newUrl as PathValue<T, Path<T>>,
        { shouldValidate: true, shouldDirty: true },
      );
      const detectedPlatform = detectSocialMediaPlatform(newUrl);
      const currentPlatform = getValues(
        `social_media.${index}.platform` as Path<T>,
      ) as string;
      if (currentPlatform !== detectedPlatform) {
        setValue(
          `social_media.${index}.platform` as Path<T>,
          detectedPlatform as PathValue<T, Path<T>>,
          { shouldValidate: true, shouldDirty: true },
        );
      }
    },
    [setValue, getValues, index],
  );

  return (
    <div className="flex flex-col items-start gap-3 p-3 sm:flex-row sm:items-center">
      <div className="flex-none">
        <motion.div
          key={currentIcon} // ensures re-animation when icon changes
          className="flex-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <MyImage src={currentIcon} className="size-10" role="ICON" />
        </motion.div>
      </div>

      <div className="flex-grow space-y-3">
        {platformValue !== DefaultPlatform && (
          <div className="flex space-x-2">
            <Button
              type="button"
              variant={inputMode === "url" ? "secondary" : "outline"}
              size="xs"
              onClick={() => setInputMode("url")}
              disabled={disable}
              library="daisy"
            >
              Enter URL
            </Button>
            <Button
              type="button"
              variant={inputMode === "username" ? "secondary" : "outline"}
              size="xs"
              onClick={() => setInputMode("username")}
              disabled={!urlTemplate.includes("{username}") || disable}
              library="daisy"
            >
              Enter Username
            </Button>
          </div>
        )}

        {inputMode === "url" ||
        !urlTemplate.includes("{username}") ||
        platformValue === DefaultPlatform ? (
          <FormField
            control={control}
            name={`social_media.${index}.url` as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Social Media Url</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://www.example.com/username"
                    {...field}
                    onChange={(e) => handleUrlInputChange(e.target.value)}
                    disabled={disable}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <FormField
            control={control}
            name={`social_media.${index}.url` as Path<T>}
            render={({ field }) => (
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
                      disabled={disable}
                    />
                    {urlTemplate.split("{username}")[1] && (
                      <span className="ml-1 text-sm text-nowrap">
                        {urlTemplate.split("{username}")[1]}
                      </span>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>

      <FormField
        control={control}
        name={`social_media.${index}.platform` as Path<T>}
        render={({ field: platformField }) => (
          <FormItem className="mt-2 w-full sm:mt-0 sm:w-48">
            <FormLabel className="sr-only">Platform</FormLabel>
            <Select
              disabled={disable}
              onValueChange={(value) => {
                platformField.onChange(value);
                if (inputMode === "username" && value !== DefaultPlatform) {
                  const currentLink = getValues(
                    `social_media.${index}.url` as Path<T>,
                  ) as string;
                  const username = extractUsername(currentLink);
                  if (username) {
                    const newPlatformConfig = SocialMediaPlatformsList.find(
                      (p) => p.name === value,
                    );
                    if (newPlatformConfig?.urlTemplate.includes("{username}")) {
                      const newUrl = newPlatformConfig.urlTemplate.replace(
                        "{username}",
                        username,
                      );
                      setValue(
                        `social_media.${index}.url` as Path<T>,
                        newUrl as PathValue<T, Path<T>>,
                        { shouldValidate: true },
                      );
                    } else if (newPlatformConfig) {
                      setValue(
                        `social_media.${index}.url` as Path<T>,
                        username as PathValue<T, Path<T>>,
                        { shouldValidate: true },
                      );
                    }
                  }
                }
              }}
              value={(platformField.value as string) || DefaultPlatform}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select Platform" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {SocialMediaPlatformsList.map((p) => (
                  <SelectItem key={p.name} value={p.name}>
                    <div className="flex flex-row items-center gap-2">
                      <MyImage src={p.icon} className="size-4" /> {p.name}
                    </div>
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
        disabled={disable}
      >
        <Trash2 className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default AddSocialMedia;
