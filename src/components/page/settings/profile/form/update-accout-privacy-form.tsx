"use client";
  
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Checkbox } from "@/components/ui/checkbox";
import { updateUserEmailDto, updateUserEmailSchema, } from "@/lib/schema/user/user-email.dto";
import { FormError, FormSuccess } from "@/components/myComponents/form-message";

const UpdateAccountPrivacyForm = () => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
   const [isPending, 
     // startTransition
   ] = useTransition();
  const form = useForm<updateUserEmailDto>({
    resolver: zodResolver(updateUserEmailSchema),
    defaultValues: {
      email: "",
    },
  });
  const handleSubmit = (values: updateUserEmailDto) => {
    setError("");
    setSuccess("");

    console.log(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className=" flex items-center space-x-4">
        <div className=" flex flex-col space-y-2">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className="">
                  <FormControl>
                    <Checkbox disabled={isPending} className=" mr-2" id="privacy" {...field} />
                  </FormControl>
                  <FormLabel htmlFor="privacy" className=" cursor-pointer">Change account in private</FormLabel>
                <FormDescription>
                  make account private on you and school staff can access you information.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <FormError message={error} />
            <FormSuccess message={success} />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default UpdateAccountPrivacyForm;
