"use client";
import { FormError, FormSuccess } from "@/components/common/form-message";
import AddressInput from "@/components/common/form/address-input";
import AgeInput from "@/components/common/form/age-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/lib/context/toast/ToastContext";
import {
  type StudentBackground,
  StudentBackgroundSchema,
} from "@/lib/schema/student/student-schema";
import type { UserModel } from "@/lib/schema/user/user-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

interface props {
  user: UserModel;
  auth: AuthContext;
  setStep?: (step: number, id?: string) => void;
  markStepCompleted?: (step: number, autoNext?: boolean, id?: string) => void;
}

const StudentBackgroundForm = ({
  user,
  auth,
  setStep,
  markStepCompleted,
}: props) => {
  const [error, setError] = useState<undefined | null | string>("");
  const [success, setSuccess] = useState<undefined | null | string>("");
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const form = useForm<StudentBackground>({
    resolver: zodResolver(StudentBackgroundSchema),
    defaultValues: {
      address: user.address ? user.address : undefined,
      age: user.age ? user.age : undefined,
    },
    mode: "onChange",
  });

  const onSubmit = (value: StudentBackground) => {
    setSuccess(null);
    setError(null);
    startTransition(async () => {
      const update = await apiRequest<StudentBackground, UserModel>(
        "put",
        `/users/${auth.user.id}`,
        value,
        { token: auth.token },
      );
      if (update.data) {
        showToast({
          title: "Thanks for upgrading your profile 🌻",
          description:
            " You have been add student Personal Details & Background info",
          type: "success",
        });
        if (setStep) setStep(3, update.data.id);
        if (markStepCompleted)
          markStepCompleted(2, true, update.data.id || update.data._id);
      } else if (update.message) {
        showToast({
          title: "Some thing went wrong 😥",
          description: update.message,
          type: "error",
        });
        setError(update.message);
      } else {
        setError(update.error);
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
          name="age"
          render={({ field }) => (
            <FormItem className=" w-full space-y-2">
              <FormLabel>Date of Birth / Age</FormLabel>
              <FormControl>
                <AgeInput
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
          name="address"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Your Address</FormLabel>
              <FormControl>
                <AddressInput
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
          Add academic interests
        </Button>
      </form>{" "}
    </Form>
  );
};

export default StudentBackgroundForm;
