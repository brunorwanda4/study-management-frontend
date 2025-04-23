"use client";
import {
  updateUserDataSchema,
  updateUserDataSchemaType,
} from "@/utils/schema/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  FormMessageError,
  FormMessageSuccess,
} from "@/components/form/formError";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState, useTransition } from "react";
import { useDropzone } from "react-dropzone";
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
import UseTheme from "@/context/theme/use-theme";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { getLocalTimeZone, today, toZoned } from "@internationalized/date";
import { cn } from "@/lib/utils";
import * as RPNInput from "react-phone-number-input";
import {
  CountrySelect,
  FlagComponent,
  PhoneInput,
} from "./component-form-need";
import { Textarea } from "../ui/textarea";
import { User } from "../../../prisma/prisma/generated";
import { Input } from "@/components/ui/input";

interface props {
  currentUser: User;
}

const UserUserDataForm = ({ currentUser }: props) => {
  const [error, setError] = useState<undefined | string>("");
  const [success, setSuccess] = useState<undefined | string>("");
  const [
    isPending,
    //  startTransition
  ] = useTransition();
  const form = useForm<updateUserDataSchemaType>({
    resolver: zodResolver(updateUserDataSchema),
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
  const handleSubmit = (values: updateUserDataSchemaType) => {
    setError("");
    setSuccess("");

    console.log(values);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className=" flex flex-col space-y-4"
      >
        <div className=" w-full flex justify-between">
          <div className=" w-1/2 flex flex-col space-y-4">
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
                      className="w-full bg-base-100"
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
                      className="w-full bg-base-100"
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
                <FormItem className=" w-full">
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
                                currentDate.getMilliseconds()
                              );
                              onChange(date);
                            }
                            onChange(
                              selectedDate ? selectedDate.toDate() : null
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
                                  getLocalTimeZone()
                                )
                              : null
                          }
                        >
                          <FormLabel>Age</FormLabel>
                          <div className="flex">
                            <Group className="inline-flex h-10 w-full rounded-md bg-base-100 px-3 py-2 text-base ring-offset-background   items-center overflow-hidden whitespace-nowrap  pe-9 shadow-sm shadow-black/5 transition-shadow data-[focus-within]:border-ring data-[disabled]:opacity-50 data-[focus-within]:outline-none ">
                              <DateInput {...field}>
                                {(segment) =>
                                  segment &&
                                  (segment.type === "year" ||
                                    segment.type === "month" ||
                                    segment.type === "day") ? (
                                    <>
                                      <DateSegment
                                        segment={segment}
                                        className="inline rounded p-0.5 caret-transparent outline outline-0 data-[disabled]:cursor-not-allowed data-[focused]:bg-accent data-[invalid]:data-[focused]:bg-destructive data-[type=literal]:px-0 data-[focused]:data-[placeholder]:text-foreground data-[focused]:text-foreground data-[invalid]:data-[focused]:data-[placeholder]:text-destructive-foreground data-[invalid]:data-[focused]:text-destructive-foreground data-[invalid]:data-[placeholder]:text-destructive data-[invalid]:text-destructive data-[placeholder]:text-muted-foreground/70 data-[type=literal]:text-muted-foreground/70 data-[disabled]:opacity-50"
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
                            <ButtonDate className="z-10 -me-px -ms-9 flex w-9 items-center justify-center rounded-e-lg outline-offset-2 transition-colors hover:text-info focus-visible:outline-none data-[focus-visible]:outline data-[focus-visible]:outline-2 data-[focus-visible]:outline-ring/70">
                              <CalendarIcon size={16} strokeWidth={2} />
                            </ButtonDate>
                          </div>
                          <Popover
                            className="z-50 rounded-lg border border-base-300 bg-base-200 shadow-lg shadow-black/5 outline-none data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0 data-[entering]:zoom-in-95 data-[exiting]:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2"
                            offset={4}
                            data-theme={UseTheme()}
                          >
                            <Dialog className="max-h-[inherit] overflow-auto p-2">
                              <Calendar className="w-fit">
                                <header className="flex w-full items-center gap-1 pb-1">
                                  <ButtonDate
                                    slot="previous"
                                    className="flex size-9 items-center justify-center rounded-lg outline-offset-2 transition-colors hover:bg-accent hover:text-foreground data-[focus-visible]:outline data-[focus-visible]:outline-2 data-[focus-visible]:outline-ring/70"
                                  >
                                    <ChevronLeft size={16} strokeWidth={2} />
                                  </ButtonDate>
                                  <Heading className="grow text-center text-sm font-medium" />
                                  <ButtonDate
                                    slot="next"
                                    className="flex size-9 items-center justify-center rounded-lg outline-offset-2 transition-colors hover:bg-accent hover:text-foreground data-[focus-visible]:outline data-[focus-visible]:outline-2 data-[focus-visible]:outline-ring/70"
                                  >
                                    <ChevronRight size={16} strokeWidth={2} />
                                  </ButtonDate>
                                </header>
                                <CalendarGrid>
                                  <CalendarGridHeader>
                                    {(day) => (
                                      <CalendarHeaderCell className="size-9 rounded-lg p-0 text-xs font-medium text-muted-foreground/80">
                                        {day}
                                      </CalendarHeaderCell>
                                    )}
                                  </CalendarGridHeader>
                                  <CalendarGridBody className="[&_td]:px-0 border-0">
                                    {(date) => (
                                      <CalendarCell
                                        date={date}
                                        className={cn(
                                          "relative flex size-9 items-center justify-center whitespace-nowrap rounded-lg border border-transparent p-0 text-sm font-normal outline-offset-2 transition-colors data-[disabled]:pointer-events-none data-[unavailable]:pointer-events-none data-[focus-visible]:z-10 data-[hovered]:bg-accent data-[selected]:bg-info data-[hovered]:text-foreground data-[selected]:text-primary-foreground data-[unavailable]:line-through data-[disabled]:opacity-30 data-[unavailable]:opacity-30 data-[focus-visible]:outline data-[focus-visible]:outline-2 data-[focus-visible]:outline-ring/70 data-[invalid]:data-[selected]:[&:not([data-hover])]:bg-destructive data-[invalid]:data-[selected]:[&:not([data-hover])]:text-destructive-foreground",
                                          date.compare(now) === 0 &&
                                            "after:pointer-events-none after:absolute after:bottom-1 after:start-1/2 after:z-10 after:size-[3px] after:-translate-x-1/2 after:rounded-full after:bg-info data-[selected]:after:bg-info"
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
                          className="flex rounded-lg w-96 border-l-0"
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
                      className="w-full bg-base-100"
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
          <div className=" p-10 w-1/2 justify-start flex flex-col">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="items-center">
                  <FormLabel
                    htmlFor="image"
                    className="flex gap-3 items-center"
                  >
                    <div className=" flex flex-col space-y-2 items-center">
                      <div className=" space-y-2">
                        <FormLabel className="">Profile image</FormLabel>
                        <MyImage
                          role="AVATAR"
                          src={field.value || "/default.jpg"}
                          className="size-40 min-h-36 min-w-36 "
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
                  {error && <p className="text-sm text-error">{error}</p>}
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
        <div className=" mt-2">
          <FormMessageError message={error} />
          <FormMessageSuccess message={success} />
        </div>
        <Button variant="info" className=" w-32">
          Update profile
        </Button>
      </form>
    </Form>
  );
};

export default UserUserDataForm;
