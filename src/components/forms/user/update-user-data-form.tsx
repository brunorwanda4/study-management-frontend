"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { FormError, FormSuccess } from "@/components/common/form-message";
import MyImage from "@/components/common/myImage";
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
import { Textarea } from "@/components/ui/textarea";
import {
  UpdateUserDto,
  UpdateUserSchema,
  UserDto,
} from "@/lib/schema/user/user.dto";
import { cn } from "@/lib/utils";
import { getLocalTimeZone, today, toZoned } from "@internationalized/date";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useTransition } from "react";
import {
  Button as ButtonDate,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateInput,
  DatePicker,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Popover,
} from "react-aria-components";
import { useDropzone } from "react-dropzone";
import * as RPNInput from "react-phone-number-input";
import {
  CountrySelect,
  FlagComponent,
  PhoneInput,
} from "../component-form-need";

interface props {
  currentUser: UserDto;
}

const UserUserDataForm = ({ currentUser }: props) => {
  const [error, setError] = useState<undefined | string>("");
  const [success, setSuccess] = useState<undefined | string>("");
  const [
    isPending,
    //  startTransition
  ] = useTransition();
  const { theme } = useTheme();
  const form = useForm<UpdateUserDto>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: currentUser.name ? currentUser.name : "",
      image: currentUser.image ? currentUser.image : "",
      username: currentUser.username ? currentUser.username : "",
      bio: currentUser.bio ? currentUser.bio : "",
      phone: currentUser.name ? currentUser.name : "",
      age: undefined,
    },
    shouldFocusError: true,
    shouldUnregister: true,
    criteriaMode: "firstError",
    reValidateMode: "onChange",
    mode: "onChange",
  });
  const onDrop = (acceptedFiles: File[]) => {
    setError("");
    const file = acceptedFiles[0];
    if (!file) return;

    if (!file.type.includes("image")) {
      return setError("Please select an image file.");
    }

    if (file.size > 10 * 1024 * 1024) {
      return setError("Image size exceeds 10MB.");
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageDataUrl = event.target?.result as string;
      form.setValue("image", imageDataUrl);
    };
    reader.onerror = () => setError("Failed to read image file.");
    reader.readAsDataURL(file);
  };

  const { getInputProps } = useDropzone({
    onDrop,
    // accept: "image/*",
    maxFiles: 1,
  });
  const now = today(getLocalTimeZone());
  const handleSubmit = (values: UpdateUserDto) => {
    setError("");
    setSuccess("");

    console.log(values);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col space-y-4"
      >
        <div className="flex w-full justify-between">
          <div className="flex w-1/2 flex-col space-y-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" ">Full names</FormLabel>
                  <FormControl>
                    <Input
                      id="role"
                      {...field}
                      className="bg-base-100 w-full"
                      placeholder="User full name"
                      type="text"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormDescription>
                    your full which your parent give your or written on your
                    national ID.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" ">Username</FormLabel>
                  <FormControl>
                    <Input
                      id="role"
                      {...field}
                      className="bg-base-100 w-full"
                      placeholder="Username"
                      type="text"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormDescription>
                    username name which is unique from other usernames, which
                    like on instagram.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Controller
                      name="age"
                      render={({ field: { onChange, value } }) => (
                        <DatePicker
                          className="space-y-2"
                          onChange={(selectedDate) => {
                            const currentDate = new Date();
                            if (selectedDate) {
                              const date = selectedDate.toDate();
                              date.setHours(
                                currentDate.getHours(),
                                currentDate.getMinutes(),
                                currentDate.getSeconds(),
                                currentDate.getMilliseconds(),
                              );
                              onChange(date);
                            }
                            onChange(
                              selectedDate ? selectedDate.toDate() : null,
                            );
                          }}
                          value={
                            value
                              ? toZoned(
                                  today(getLocalTimeZone()).set({
                                    year: new Date(value).getFullYear(),
                                    month: new Date(value).getMonth() + 1,
                                    day: new Date(value).getDate(),
                                  }),
                                  getLocalTimeZone(),
                                )
                              : null
                          }
                        >
                          <FormLabel>Age</FormLabel>
                          <div className="flex">
                            <Group className="bg-base-100 ring-offset-background data-[focus-within]:border-ring inline-flex h-10 w-full items-center overflow-hidden rounded-md px-3 py-2 pe-9 text-base whitespace-nowrap shadow-sm shadow-black/5 transition-shadow data-[disabled]:opacity-50 data-[focus-within]:outline-none">
                              <DateInput {...field}>
                                {(segment) =>
                                  segment &&
                                  (segment.type === "year" ||
                                    segment.type === "month" ||
                                    segment.type === "day") ? (
                                    <>
                                      <DateSegment
                                        segment={segment}
                                        className="data-[focused]:bg-accent data-[invalid]:data-[focused]:bg-destructive data-[focused]:data-[placeholder]: data-[focused]: data-[invalid]:data-[focused]:data-[placeholder]:text-destructive-foreground data-[invalid]:data-[focused]:text-destructive-foreground data-[invalid]:data-[placeholder]:text-destructive data-[invalid]:text-destructive data-[placeholder]: /70 data-[type=literal]: /70 inline rounded p-0.5 caret-transparent outline outline-0 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[type=literal]:px-0"
                                      />
                                      {segment.type !== "year" && (
                                        <span>/</span>
                                      )}
                                    </>
                                  ) : (
                                    <></>
                                  )
                                }
                              </DateInput>
                            </Group>
                            <ButtonDate className="hover:text-info data-[focus-visible]:outline-ring/70 z-10 -ms-9 -me-px flex w-9 items-center justify-center rounded-e-lg outline-offset-2 transition-colors focus-visible:outline-none data-[focus-visible]:outline data-[focus-visible]:outline-2">
                              <CalendarIcon size={16} strokeWidth={2} />
                            </ButtonDate>
                          </div>
                          <Popover
                            className="border-base-300 bg-base-200 data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0 data-[entering]:zoom-in-95 data-[exiting]:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2 z-50 rounded-lg border shadow-lg shadow-black/5 outline-none"
                            offset={4}
                            data-theme={theme}
                          >
                            <Dialog className="max-h-[inherit] overflow-auto p-2">
                              <Calendar className="w-fit">
                                <header className="flex w-full items-center gap-1 pb-1">
                                  <ButtonDate
                                    slot="previous"
                                    className="hover:bg-accent hover: data-[focus-visible]:outline-ring/70 flex size-9 items-center justify-center rounded-lg outline-offset-2 transition-colors data-[focus-visible]:outline data-[focus-visible]:outline-2"
                                  >
                                    <ChevronLeft size={16} strokeWidth={2} />
                                  </ButtonDate>
                                  <Heading className="grow text-center text-sm font-medium" />
                                  <ButtonDate
                                    slot="next"
                                    className="hover:bg-accent hover: data-[focus-visible]:outline-ring/70 flex size-9 items-center justify-center rounded-lg outline-offset-2 transition-colors data-[focus-visible]:outline data-[focus-visible]:outline-2"
                                  >
                                    <ChevronRight size={16} strokeWidth={2} />
                                  </ButtonDate>
                                </header>
                                <CalendarGrid>
                                  <CalendarGridHeader>
                                    {(day) => (
                                      <CalendarHeaderCell className="/80 size-9 rounded-lg p-0 text-xs font-medium">
                                        {day}
                                      </CalendarHeaderCell>
                                    )}
                                  </CalendarGridHeader>
                                  <CalendarGridBody className="border-0 [&_td]:px-0">
                                    {(date) => (
                                      <CalendarCell
                                        date={date}
                                        className={cn(
                                          "data-[hovered]:bg-accent data-[selected]:bg-info data-[hovered]: data-[selected]:text-primary-foreground data-[focus-visible]:outline-ring/70 data-[invalid]:data-[selected]:[&:not([data-hover])]:bg-destructive data-[invalid]:data-[selected]:[&:not([data-hover])]:text-destructive-foreground relative flex size-9 items-center justify-center rounded-lg border border-transparent p-0 text-sm font-normal whitespace-nowrap outline-offset-2 transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-30 data-[focus-visible]:z-10 data-[focus-visible]:outline data-[focus-visible]:outline-2 data-[unavailable]:pointer-events-none data-[unavailable]:line-through data-[unavailable]:opacity-30",
                                          date.compare(now) === 0 &&
                                            "after:bg-info data-[selected]:after:bg-info after:pointer-events-none after:absolute after:start-1/2 after:bottom-1 after:z-10 after:size-[3px] after:-translate-x-1/2 after:rounded-full",
                                        )}
                                      />
                                    )}
                                  </CalendarGridBody>
                                </CalendarGrid>
                              </Calendar>
                            </Dialog>
                          </Popover>
                        </DatePicker>
                      )}
                    />
                  </FormControl>
                  <FormDescription>
                    Your age you have now, it help if you ask to join school if
                    your age is allowed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Controller
                      name={field.name}
                      control={form.control}
                      render={({ field }) => (
                        <RPNInput.default
                          {...field}
                          className="flex w-96 rounded-lg border-l-0"
                          international
                          flagComponent={FlagComponent}
                          countrySelectComponent={CountrySelect}
                          inputComponent={PhoneInput}
                          defaultCountry="RW"
                          placeholder="Enter phone number"
                          onChange={(value) => field.onChange(value ?? "")}
                        />
                      )}
                    />
                  </FormControl>
                  <FormDescription>
                    your phone number we can use to communicate with you.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="bio"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" ">Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      id="bio"
                      {...field}
                      className="bg-base-100 w-full"
                      placeholder="type about your self..."
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormDescription>
                    Explain your self what you like, which game ⚽ you like or
                    other things about you.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-1/2 flex-col justify-start p-10">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="items-center">
                  <FormLabel
                    htmlFor="image"
                    className="flex items-center gap-3"
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="flex flex-col space-y-4">
                        <FormLabel className="">Profile image</FormLabel>
                        <MyImage
                          role="AVATAR"
                          src={field.value || "/images/p.jpg"}
                          className="size-54 min-h-36 min-w-36"
                          alt="Profile"
                        />
                      </div>
                      <FormControl>
                        <input
                          disabled={isPending}
                          {...getInputProps()}
                          id="image"
                        />
                      </FormControl>
                    </div>
                  </FormLabel>
                  {error && <p className="text-error text-sm">{error}</p>}
                  <FormDescription>
                    Your image for you please you image for you because it help
                    other to know you.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="mt-2">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
        <Button
          library={"daisy"}
          disabled={isPending}
          variant="info"
          className="w-32"
        >
          Update profile{" "}
          {isPending && (
            <div
              role="status"
              aria-label="Loading"
              className={cn("loading loading-spinner")}
            />
          )}
        </Button>
      </form>
    </Form>
  );
};

export default UserUserDataForm;
