"use client";

import UploadImage from "@/components/common/cards/form/upload-image";
import { FormError, FormSuccess } from "@/components/common/form-message";
import {
  CountrySelect,
  FlagComponent,
  PhoneInput,
} from "@/components/common/form/phone-input";
import RadioInput from "@/components/common/form/radio-input";
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
import type { Locale } from "@/i18n";
import {
  GenderDetails,
  UserRoleDetails,
} from "@/lib/const/common-details-const";
import { useToast } from "@/lib/context/toast/ToastContext";
import { redirectContents } from "@/lib/hooks/redirect";
import type { AuthUserDto } from "@/lib/schema/user/auth-user-schema";
import {
  type UserOnboarding,
  UserOnboardingSchema,
} from "@/lib/schema/user/user-schema";
import { type AuthContext, setAuthCookies } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import * as RPNInput from "react-phone-number-input";
interface Props {
  lang: Locale;
  auth: AuthContext;
  dictionary: any;
}

const OnboardingForm = ({ lang, auth, dictionary }: Props) => {
  const [error, setError] = useState<undefined | null | string>("");
  const [success, setSuccess] = useState<undefined | null | string>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { showToast } = useToast();
  const form = useForm<UserOnboarding>({
    resolver: zodResolver(UserOnboardingSchema),
    defaultValues: {
      image: auth.user.image ?? undefined,
      username: auth.user.username ?? "",
      role: auth.user.role ?? undefined,
      phone: auth.user.phone ?? "",
      gender: auth.user.gender ?? undefined,
    },
  });
  const onSubmit = (value: UserOnboarding) => {
    setSuccess(null);
    setError(null);
    startTransition(async () => {
      const update = await apiRequest<UserOnboarding, AuthUserDto>(
        "patch",
        "/auth/onboarding",
        value,
        { token: auth.token },
      );
      if (update.data) {
        if (update.data.accessToken) {
          await setAuthCookies(
            update.data.accessToken,
            update.data.id,
            update.data.schoolAccessToken,
          );
          setSuccess("Your basic info profile ☺️");
          showToast({
            title: "Your basic info profile ☺️",
            description: " Thanks to help us to know you better!",
            type: "success",
          });
          if (update.data.role) {
            if (update.data.role === "STUDENT") {
              router.push(`/${lang}/auth/onboarding/student`);
            } else if (update.data.role === "TEACHER") {
              router.push(`/${lang}/auth/onboarding/teacher`);
            } else if (update.data.role === "SCHOOLSTAFF") {
              router.push(`/${lang}/auth/onboarding/staff`);
            } else {
              router.push(redirectContents({ lang, role: update.data.role }));
            }
          }
        }
      } else if (update.message) {
        showToast({
          title: "Some thing went wrong 😥",
          description: update.message,
          type: "error",
        });
        setError(update.message);
      } else {
        setError(`${update.error}`);
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" w-full space-y-4 "
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="row-span-3 flex flex-col space-y-2">
              <FormLabel>Your profile image</FormLabel>
              <FormControl>
                <UploadImage
                  onChange={field.onChange}
                  disabled={isPending}
                  value={field.value?.toString() ?? null}
                  Classname=" h-54 "
                  className="h-54 "
                  description="Drop your profile image here"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className=" flex flex-col gap-4">
          {/* username and phone */}
          <div className=" flex gap-4 flex-col lg:flex-row">
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel>{dictionary.phone}</FormLabel>
                  <FormControl>
                    <Controller
                      name={field.name}
                      control={form.control}
                      render={({ field }) => (
                        <RPNInput.default
                          {...field}
                          className="flex rounded-lg border-l-0"
                          international
                          flagComponent={FlagComponent}
                          countrySelectComponent={CountrySelect}
                          inputComponent={PhoneInput}
                          defaultCountry="RW"
                          placeholder="Enter phone number"
                          onChange={(value) => field.onChange(value ?? "")}
                          disabled={isPending}
                        />
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      className=""
                      placeholder={
                        dictionary.username.placeholder ?? "Enter your username"
                      }
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* gender and user role */}
          <div className=" flex gap-4 flex-col lg:flex-row">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <RadioInput
                      items={GenderDetails}
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel>Who are you</FormLabel>
                  <FormControl>
                    <RadioInput
                      items={Object.fromEntries(
                        Object.entries(UserRoleDetails).filter(
                          ([key]) => key !== "ADMIN",
                        ),
                      )}
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className=" mt-2">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
        <Button
          disabled={isPending}
          type="submit"
          variant="info"
          className=" w-full"
          library="daisy"
          role={isPending ? "loading" : undefined}
        >
          {dictionary.button}
        </Button>
      </form>
    </Form>
  );
};

export default OnboardingForm;
