"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import CheckboxInput from "@/components/common/form/checkbox-input";
import GuardiansInput from "@/components/common/form/guardian-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  LearningChallengeDetails,
  SpecialSupportDetails,
} from "@/lib/const/common-details-const";
import { useToast } from "@/lib/context/toast/ToastContext";
import {
  type studentSupport,
  studentSupportSchema,
} from "@/lib/schema/student/student-schema";
import type { UserModel } from "@/lib/schema/user/user-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

interface Props {
  user: UserModel;
  auth: AuthContext;
  setStep?: (step: number, id?: string) => void;
  markStepCompleted?: (step: number, autoNext?: boolean, id?: string) => void;
}

const StudentSupportForm = ({
  user,
  auth,
  setStep,
  markStepCompleted,
}: Props) => {
  const [error, setError] = useState<string | null | undefined>("");
  const [success, setSuccess] = useState<string | null | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const form = useForm<studentSupport>({
    resolver: zodResolver(studentSupportSchema),
    defaultValues: {
      learning_challenges: user.learning_challenges
        ? user.learning_challenges
        : undefined,
      special_support_needed: user.special_support_needed
        ? user.special_support_needed
        : undefined,
      guardian_info: user.guardian_info ? user.guardian_info : undefined,
    },
    mode: "onChange",
  });

  const onSubmit = (value: studentSupport) => {
    setSuccess(null);
    setError(null);
    startTransition(async () => {
      const update = await apiRequest<studentSupport, UserModel>(
        "put",
        `/users/${auth.user.id}`,
        value,
        { token: auth.token },
      );

      if (update.data) {
        showToast({
          title: "Thanks for upgrading your profile 🌻",
          description: "You have added student academic interest info.",
          type: "success",
        });

        if (setStep) setStep(4, update.data.id);
        if (markStepCompleted)
          markStepCompleted(3, true, update.data.id || update.data._id);
      } else if (update.message) {
        showToast({
          title: "Something went wrong 😥",
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <div className="flex flex-col gap-4">
          {/* ✅ Guardian Info */}
          <FormField
            control={form.control}
            name="guardian_info"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Guardians</FormLabel>
                <FormControl>
                  <GuardiansInput
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isPending}
                    currentUser={{
                      name: user?.name,
                      phone: user?.phone,
                      email: user?.email,
                      relationship: "Parent", // or whichever fits
                    }}
                    autoIncludeCurrentUser={true}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ✅ Learning Challenges */}
          <FormField
            control={form.control}
            name="learning_challenges"
            render={({ field }) => (
              <FormItem className="w-full space-y-2">
                <FormLabel>Learning Challenges</FormLabel>
                <FormControl>
                  <CheckboxInput
                    showTooltip
                    items={LearningChallengeDetails}
                    values={field.value}
                    onChange={field.onChange}
                    classname="grid-cols-3 gap-2"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ✅ Special Support Needed */}
          <FormField
            control={form.control}
            name="special_support_needed"
            render={({ field }) => (
              <FormItem className="w-full space-y-2">
                <FormLabel>Special Support Needed</FormLabel>
                <FormControl>
                  <CheckboxInput
                    showTooltip
                    items={SpecialSupportDetails}
                    values={field.value}
                    onChange={field.onChange}
                    classname="grid-cols-3 gap-2"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* ✅ Form Feedback */}
        <div className="mt-2">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>

        {/* ✅ Submit Button */}
        <Button
          disabled={isPending}
          type="submit"
          variant="info"
          className="w-full"
          library="daisy"
          role={isPending ? "loading" : undefined}
        >
          Add academic interests
        </Button>
      </form>
    </Form>
  );
};

export default StudentSupportForm;
