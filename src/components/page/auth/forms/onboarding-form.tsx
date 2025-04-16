"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChangeEvent, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Locale } from "@/i18n";
import { CountriesContext } from "@/lib/data/locations";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { onboardingDto, OnboardingSchema } from "@/lib/schema/user.dto";
import { useTheme } from "next-themes";
import MyImage from "@/components/myComponents/myImage";
import { FormError, FormSuccess } from "@/components/myComponents/form-message";
import { onboardingService } from "@/service/auth/auth-service";
interface Props {
  lang: Locale;
}

const OnboardingForm = ({}: Props) => {
  const [error, setError] = useState<undefined | null | string>("");
  const [success, setSuccess] = useState<undefined | null | string>("");
  const [isPending, startTransition] = useTransition();
  const { theme } = useTheme();
  const form = useForm<onboardingDto>({
    resolver: zodResolver(OnboardingSchema),
    defaultValues: {
      image: "",
      age: undefined,
      phone: "",
      gender: undefined,
      role: undefined,
      location: {
        country: "Rwanda",
        province: "",
        district: "",
      },
      bio: "",
    },
  });
  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    setError("");
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // Check if the file is an image
      if (!file.type.includes("image")) {
        return setError("Please select an image file");
      }

      // Check if the file size is greater than 2MB (2MB = 2 * 1024 * 1024 bytes)
      const maxSizeInBytes = 2 * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        return setError(
          "Sorry your image it to high try other image which is not less than 2MB!."
        );
      }

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const onSubmit = (value: onboardingDto) => {
    setSuccess(null);
    setError(null);
    startTransition(async () => {
      //   const update = await updateUserByUserSession(value, user?.id, user.token);

      //   if (update.success && update.data) {
      //     setSuccess(update.success);
      //     setUserRole(update.data.role);
      //   } else if (update.error) {
      //     setTimeout(() => setError(update.error), 0);
      //   }
      const update = await onboardingService(value);
      if (update.data) {
        setSuccess(update.data.name);
      } else if (update.error) {
        setError(`error :${update.error}, message : ${update.message}`);
      }
      console.log(value);
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" w-full space-y-2"
      >
        {/* image */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className={cn("flex gap-2 items-center")}>
              <FormLabel
                htmlFor="image"
                className={cn("flex gap-3 items-center")}
              >
                <MyImage
                  src={
                    field.value
                      ? field.value
                      : "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg"
                  }
                  className={cn("size-24")}
                  classname=" card"
                  alt="Profile"
                />
                <span
                  className={cn("cursor-pointer", !field.value && "text-info")}
                >
                  Profile image
                </span>
              </FormLabel>
              <FormControl>
                <div className={cn("flex flex-col")}>
                  <Input
                    disabled={isPending}
                    type="file"
                    id="image"
                    accept="image/*"
                    placeholder="Add profile photo"
                    className={cn(
                      "border-none outline-none bg-transparent hidden"
                    )}
                    onChange={(e) => handleImage(e, field.onChange)}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-4 w-full justify-between">
          {/* Left */}
          <div className=" flex flex-col space-y-2 w-full justify-start">
            {/* age */}
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel className=" text-lg">Age</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      {/* Year Select */}
                      <div className=" flex flex-col space-y-1 w-full">
                        <Label>years</Label>
                        <Select
                          onValueChange={(value) =>
                            field.onChange({
                              ...(field.value || {}),
                              year: Number(value),
                            })
                          }
                        >
                          <SelectTrigger className=" w-full">
                            <SelectValue placeholder="Year" />
                          </SelectTrigger>
                          <SelectContent
                            className=" max-h-60"
                            data-theme={theme}
                          >
                            {Array.from(
                              { length: 100 },
                              (_, i) => new Date().getFullYear() - i
                            ).map((year) => (
                              <SelectItem key={year} value={String(year)}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Month Select */}
                      <div className=" flex flex-col space-y-1 w-full">
                        <Label>Month</Label>
                        <Select
                          onValueChange={(value) =>
                            field.onChange({
                              ...(field.value || {}),
                              month: Number(value),
                            })
                          }
                        >
                          <SelectTrigger className=" w-full">
                            <SelectValue placeholder="Month" />
                          </SelectTrigger>
                          <SelectContent
                            className=" max-h-60"
                            data-theme={theme}
                          >
                            {Array.from({ length: 12 }, (_, i) => i + 1).map(
                              (month) => (
                                <SelectItem key={month} value={String(month)}>
                                  {month}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Day Select */}
                      <div className=" flex flex-col space-y-1 w-full">
                        <Label>Day</Label>
                        <Select
                          onValueChange={(value) =>
                            field.onChange({
                              ...(field.value || {}),
                              day: Number(value),
                            })
                          }
                        >
                          <SelectTrigger className=" w-full">
                            <SelectValue placeholder="Day" />
                          </SelectTrigger>
                          <SelectContent
                            className=" max-h-60"
                            data-theme={theme}
                          >
                            {Array.from({ length: 31 }, (_, i) => i + 1).map(
                              (day) => (
                                <SelectItem key={day} value={String(day)}>
                                  {day}
                                </SelectItem>
                              )
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
                  <FormLabel className=" text-lg ">Phone</FormLabel>
                  <FormControl>
                    <Input
                      className="h-12 text-lg w-96"
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
                  <FormLabel className=" text-lg">Role</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-2"
                    >
                      <FormItem className="flex items-center space-x-0 space-y-0">
                        <FormControl>
                          <RadioGroupItem className=" size-6" value="STUDENT" />
                        </FormControl>
                        <FormLabel className="font-normal">Student</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-0 space-y-0">
                        <FormControl>
                          <RadioGroupItem className=" size-6" value="TEACHER" />
                        </FormControl>
                        <FormLabel className="font-normal">Teacher</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-0 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            className=" size-6"
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
                  <FormLabel className=" text-lg">Gender</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex  space-x-2"
                    >
                      <FormItem className="flex items-center space-x-0 space-y-0">
                        <FormControl>
                          <RadioGroupItem className=" size-6" value="MALE" />
                        </FormControl>
                        <FormLabel className="font-normal">Male</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-0 space-y-0">
                        <FormControl>
                          <RadioGroupItem className=" size-6" value="FEMALE" />
                        </FormControl>
                        <FormLabel className="font-normal">Female</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-0 space-y-0">
                        <FormControl>
                          <RadioGroupItem className=" size-6" value="OTHER" />
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
          <div className=" justify-start flex flex-col space-y-2 w-full">
            {/* location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel className=" text-lg">
                    Location -{" "}
                    <span className=" text-base font-normal text-gray-500">
                      In Rwanda
                    </span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <div className=" flex flex-col space-y-1 w-full">
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
                          <SelectTrigger className=" w-full">
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
                      <div className="  flex flex-col  space-y-1 w-full">
                        <Label> district</Label>
                        <Select
                          disabled={!field.value?.province}
                          onValueChange={(value) =>
                            field.onChange({ ...field.value, district: value })
                          }
                        >
                          <SelectTrigger className=" w-full">
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
                  <FormLabel className=" text-lg">Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      className=" text-lg w-96 h-full min-h-44 "
                      {...field}
                      rows={8}
                    />
                  </FormControl>
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
          library="daisy"
          disabled={isPending}
          type="submit"
          variant="info"
          className=" w-full"
        >
          Update account
          {isPending && (
            <div
              role="status"
              aria-label="Loading"
              className={"loading loading-spinner"}
            />
          )}
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
