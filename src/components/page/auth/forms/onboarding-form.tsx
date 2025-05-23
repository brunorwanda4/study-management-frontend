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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChangeEvent, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n";
import { CountriesContext } from "@/lib/data/locations";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { onboardingDto, OnboardingSchema } from "@/lib/schema/user/user.dto";
import { useTheme } from "next-themes";
import MyImage from "@/components/myComponents/myImage";
import { FormError, FormSuccess } from "@/components/myComponents/form-message";
import { onboardingService } from "@/service/auth/auth-service";
import { useRouter } from "next/navigation";
import { redirectContents } from "@/lib/hooks/redirect";
interface Props {
  lang: Locale;
}

const OnboardingForm = ({ lang }: Props) => {
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
      const update = await onboardingService(value);
      if (update.data) {
        setSuccess("Thanks to help us to know you better! ☺️");
        if (update.data.role) {
          router.push(redirectContents({ lang, role: update.data.role }));
        }
      } else if (update.error) {
        setError(`error :${update.error}, message : ${update.message}`);
      }
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
              <FormItem className="mt-4 flex flex-col gap-2">
                <FormLabel>Profile Image</FormLabel>
                <div className="flex items-center gap-4">
                  <Label htmlFor="logo-upload" className="cursor-pointer">
                    <MyImage
                      src={
                        field.value ||
                        "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg"
                      } // Default placeholder
                      className="size-24 border rounded" // Adjust styling as needed
                      classname=" card" // Adjust styling as needed
                      alt="Profile image"
                    />
                  </Label>
                  <FormControl>
                    <Input
                      id="logo-upload"
                      disabled={isPending}
                      type="file"
                      accept="image/*"
                      placeholder="Upload Image"
                      className="hidden" // Hide default input, trigger via label/MyImage
                      onChange={(e) => handleImage(e, field.onChange)}
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
                    {field.value ? "Change Image" : "Upload Image"}
                  </Button>
                </div>
                <FormDescription>
                  Recommended size: 200x200px, Max 2MB.
                </FormDescription>
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
                  <FormLabel className="  ">Age</FormLabel>
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
                  <FormLabel className="   ">Phone</FormLabel>
                  <FormControl>
                    <Input
                      className="h-12   w-96"
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
                  <FormLabel className="  ">Role</FormLabel>
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
                  <FormLabel className="  ">Gender</FormLabel>
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
              name="address"
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel className="  ">
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
                  <FormLabel className="  ">Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      className="   w-96 h-full min-h-44 "
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
