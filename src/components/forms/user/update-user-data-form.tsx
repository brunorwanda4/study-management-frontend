"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { FormError, FormSuccess } from "@/components/common/form-message";
import AgeInput from "@/components/common/form/age-input";
import {
  CountrySelect,
  FlagComponent,
  PhoneInput,
} from "@/components/common/form/phone-input";
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
  type UpdateUser,
  UpdateUserSchema,
} from "@/lib/schema/user/update-user-schema";
import type { UserModel } from "@/lib/schema/user/user-schema";
import { cn } from "@/lib/utils";
import { useState, useTransition } from "react";
import { useDropzone } from "react-dropzone";
import * as RPNInput from "react-phone-number-input";

interface props {
  currentUser: UserModel;
}

const UserUserDataForm = ({ currentUser }: props) => {
  const [error, setError] = useState<undefined | string>("");
  const [success, setSuccess] = useState<undefined | string>("");
  const [
    isPending,
    //  startTransition
  ] = useTransition();
  const form = useForm<UpdateUser>({
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
  const handleSubmit = (values: UpdateUser) => {
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
                  <FormLabel>Date of Birth / Age</FormLabel>
                  <FormControl>
                    <AgeInput
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isPending}
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
