"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FormError, FormSuccess } from "@/components/common/form-message";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"; // Import InputOTP components
import {
  JoinSchoolDto,
  JoinSchoolSchema,
} from "@/lib/schema/school/join-school-schema";
import { JoinSchoolByUsernameAndCode } from "@/service/school/school-join-request.service";
import { useState, useTransition } from "react";
// OTPInput_ is no longer needed if using shadcn/ui InputOTP
// import OTPInput_ from "@/components/origin/otp-input";

export default function InputJoinSchoolFormForm() {
  const [error, setError] = useState<undefined | null | string>("");
  const [success, setSuccess] = useState<undefined | null | string>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<JoinSchoolDto>({
    resolver: zodResolver(JoinSchoolSchema),
    defaultValues: {
      username: "",
      code: "",
    },
  });

  function onSubmit(data: JoinSchoolDto) {
    setError(null);
    setSuccess(null);
    startTransition(async () => {
      const join = await JoinSchoolByUsernameAndCode(data);
      if (join.data) {
        setSuccess(`To join school successfully! ☺️`);
      } else {
        setError(join.message);
      }
    });
  }

  // Determine the expected length of the school code.
  // This should ideally come from JoinSchoolSchema or a constant.
  // For demonstration, assuming a 6-digit code.
  const codeLength = 5;

  // Helper to render the correct number of InputOTPSlot components
  const renderOTPSlots = () => {
    const slots = [];
    for (let i = 0; i < codeLength; i++) {
      slots.push(<InputOTPSlot key={i} index={i} />);
      // Optional: Add a separator between pairs of digits for better readability
      // if (i < codeLength - 1 && (i + 1) % 2 === 0) {
      //   slots.push(<InputOTPSeparator key={`sep-${i}`} />);
      // }
    }
    return slots;
  };

  return (
    <Form {...form}>
      <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="bg-base-200">Username</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="school username"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter school user name you want to join
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="bg-base-200">School code</FormLabel>
              <FormControl>
                <InputOTP
                  disabled={isPending}
                  maxLength={codeLength}
                  {...field}
                  onChange={(value) => field.onChange(value)}
                  // The value prop expects the full string value
                  value={field.value}
                >
                  <InputOTPGroup>{renderOTPSlots()}</InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Enter the code provided by your school administrator.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-2">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
        <Button
          disabled={isPending}
          className="w-full"
          variant={"info"}
          library="daisy"
          type="submit"
        >
          Join school
        </Button>
      </form>
    </Form>
  );
}
