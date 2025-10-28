"use client";

import UploadImage from "@/components/common/cards/form/upload-image";
import { FormError, FormSuccess } from "@/components/common/form-message";
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Locale } from "@/i18n";
import { CountriesContext } from "@/lib/data/locations";
import { redirectContents } from "@/lib/hooks/redirect";
import type { AuthUserDto } from "@/lib/schema/user/auth-user-schema";
import {
  type onboardingDto,
  OnboardingSchema,
} from "@/lib/schema/user/update-user-schema";
import { type AuthContext, setAuthCookies } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
interface Props {
  lang: Locale;
  auth: AuthContext;
}

const OnboardingForm = ({ lang, auth }: Props) => {
  const [error, setError] = useState<undefined | null | string>("");
  const [success, setSuccess] = useState<undefined | null | string>("");
  const [isPending, startTransition] = useTransition();
  const { theme } = useTheme();
  const router = useRouter();
  const form = useForm<onboardingDto>({
    resolver: zodResolver(OnboardingSchema),
    defaultValues: {
      image: undefined,
      age: undefined,
      phone: "",
      gender: undefined,
      role: undefined,
      address: {
        country: "Rwanda",
        province: "",
        district: "",
      },
      bio: "",
    },
  });

  const onSubmit = (value: onboardingDto) => {
    setSuccess(null);
    setError(null);
    startTransition(async () => {
      const update = await apiRequest<onboardingDto, AuthUserDto>(
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
          setSuccess("Thanks to help us to know you better! ☺️");
          if (update.data.role) {
            router.push(redirectContents({ lang, role: update.data.role }));
          }
        }
      } else if (update.error) {
        setError(`${update.error}`);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        {/* image */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="row-span-3 flex flex-col space-y-2">
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                <UploadImage
                  onChange={field.onChange}
                  disabled={isPending}
                  className="size-40 w-full md:mb-4"
                  Classname=" w-full min-h-44"
                  value={field.value?.toString() ?? null}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full justify-between space-x-4">
          {/* Left */}
          <div className="flex w-full flex-col justify-start space-y-2">
            {/* age */}
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className=" ">Age</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      {/* Year Select */}
                      <div className="flex w-full flex-col space-y-1">
                        <Label>years</Label>
                        <Select
                          onValueChange={(value) =>
                            field.onChange({
                              ...(field.value || {}),
                              year: Number(value),
                            })
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Year" />
                          </SelectTrigger>
                          <SelectContent
                            className="max-h-60"
                            data-theme={theme}
                          >
                            {Array.from(
                              { length: 100 },
                              (_, i) => new Date().getFullYear() - i,
                            ).map((year) => (
                              <SelectItem key={year} value={String(year)}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Month Select */}
                      <div className="flex w-full flex-col space-y-1">
                        <Label>Month</Label>
                        <Select
                          onValueChange={(value) =>
                            field.onChange({
                              ...(field.value || {}),
                              month: Number(value),
                            })
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Month" />
                          </SelectTrigger>
                          <SelectContent
                            className="max-h-60"
                            data-theme={theme}
                          >
                            {Array.from({ length: 12 }, (_, i) => i + 1).map(
                              (month) => (
                                <SelectItem key={month} value={String(month)}>
                                  {month}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Day Select */}
                      <div className="flex w-full flex-col space-y-1">
                        <Label>Day</Label>
                        <Select
                          onValueChange={(value) =>
                            field.onChange({
                              ...(field.value || {}),
                              day: Number(value),
                            })
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Day" />
                          </SelectTrigger>
                          <SelectContent
                            className="max-h-60"
                            data-theme={theme}
                          >
                            {Array.from({ length: 31 }, (_, i) => i + 1).map(
                              (day) => (
                                <SelectItem key={day} value={String(day)}>
                                  {day}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" ">Phone</FormLabel>
                  <FormControl>
                    <Input
                      className="h-12 w-96"
                      type="tel"
                      placeholder="Enter your phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* role */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel className=" ">Role</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-2"
                    >
                      <FormItem className="flex items-center space-y-0 space-x-0">
                        <FormControl>
                          <RadioGroupItem className="size-6" value="STUDENT" />
                        </FormControl>
                        <FormLabel className="font-normal">Student</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-y-0 space-x-0">
                        <FormControl>
                          <RadioGroupItem className="size-6" value="TEACHER" />
                        </FormControl>
                        <FormLabel className="font-normal">Teacher</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-y-0 space-x-0">
                        <FormControl>
                          <RadioGroupItem
                            className="size-6"
                            value="SCHOOLSTAFF"
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          School staff
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* gender */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel className=" ">Gender</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-2"
                    >
                      <FormItem className="flex items-center space-y-0 space-x-0">
                        <FormControl>
                          <RadioGroupItem className="size-6" value="MALE" />
                        </FormControl>
                        <FormLabel className="font-normal">Male</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-y-0 space-x-0">
                        <FormControl>
                          <RadioGroupItem className="size-6" value="FEMALE" />
                        </FormControl>
                        <FormLabel className="font-normal">Female</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-y-0 space-x-0">
                        <FormControl>
                          <RadioGroupItem className="size-6" value="OTHER" />
                        </FormControl>
                        <FormLabel className="font-normal">Other</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full flex-col justify-start space-y-2">
            {/* location */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className=" ">
                    Location -{" "}
                    <span className="text-base font-normal text-gray-500">
                      In Rwanda
                    </span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <div className="flex w-full flex-col space-y-1">
                        <Label>Province</Label>
                        <Select
                          onValueChange={(value) =>
                            field.onChange({
                              country: "Rwanda",
                              province: value,
                              district: "",
                            })
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Province" />
                          </SelectTrigger>
                          <SelectContent data-theme={theme}>
                            {CountriesContext[0].provinces.map((province) => (
                              <SelectItem
                                key={province.name}
                                value={province.name}
                              >
                                {province.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* District Select */}
                      <div className="flex w-full flex-col space-y-1">
                        <Label> district</Label>
                        <Select
                          disabled={!field.value?.province}
                          onValueChange={(value) =>
                            field.onChange({ ...field.value, district: value })
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="District" />
                          </SelectTrigger>
                          <SelectContent data-theme={theme}>
                            {CountriesContext[0].provinces
                              .find((p) => p.name === field.value?.province)
                              ?.districts.map((district) => (
                                <SelectItem key={district} value={district}>
                                  {district}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* bio */}
            <FormField
              name="bio"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" ">Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-full max-h-52 min-h-44 w-96 overflow-auto"
                      {...field}
                      rows={8}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="mt-8">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
        <Button
          library="daisy"
          disabled={isPending}
          type="submit"
          variant="info"
          className="w-full"
          role={isPending ? "loading" : undefined}
        >
          Update account
        </Button>
        {/* {success && userRole && (
          <AskIfUserHaveSchoolOrClass
            isOpen={true}
            lang={lang}
            userRole={userRole}
          />
        )} */}
      </form>
    </Form>
  );
};

export default OnboardingForm;
