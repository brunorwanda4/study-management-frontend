"use client";
import { FormError, FormSuccess } from "@/components/common/form-message";
import CheckboxInput from "@/components/common/form/checkbox-input";
import DailyAvailabilityInput from "@/components/common/form/daily-availability-input";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { Locale } from "@/i18n";
import { ProfessionalGoalDetails } from "@/lib/const/common-details-const";
import { useToast } from "@/lib/context/toast/ToastContext";
import { redirectContents } from "@/lib/hooks/redirect";
import {
  type TeacherPreferences,
  TeacherPreferencesSchema,
} from "@/lib/schema/teacher/teacher-schema";
import type { UserModel } from "@/lib/schema/user/user-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

interface props {
  user: UserModel;
  auth: AuthContext;
  setStep?: (step: number, id?: string) => void;
  markStepCompleted?: (step: number, autoNext?: boolean, id?: string) => void;
  lang?: Locale;
  reset?: () => void;
}

const TeacherPreferencesForm = ({
  user,
  auth,
  setStep,
  lang,
  reset,
  markStepCompleted,
}: props) => {
  const [error, setError] = useState<undefined | null | string>("");
  const [success, setSuccess] = useState<undefined | null | string>("");
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();
  const router = useRouter();

  const form = useForm<TeacherPreferences>({
    resolver: zodResolver(TeacherPreferencesSchema),
    defaultValues: {
      professional_goals: user.professional_goals
        ? user.professional_goals
        : [],
      availability_schedule: user.availability_schedule
        ? user.availability_schedule
        : undefined,
    },
    mode: "onChange",
  });

  const onSubmit = (value: TeacherPreferences) => {
    setSuccess(null);
    setError(null);
    startTransition(async () => {
      const update = await apiRequest<TeacherPreferences, UserModel>(
        "put",
        `/users/${auth.user.id}`,
        value,
        { token: auth.token },
      );
      if (update.data) {
        showToast({
          title: "Thanks for upgrading your profile 🌻",
          description: " You have been add student academic intereset info",
          type: "success",
        });
        if (reset) reset;
        router.push(
          redirectContents({
            role: auth.user.role || "TEACHER",
            lang: lang || "en",
          }),
        );
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
        <div className=" flex flex-col gap-4">
          <FormField
            control={form.control}
            name="professional_goals"
            render={({ field }) => (
              <FormItem className=" w-full space-y-2">
                <FormLabel>Professional goals</FormLabel>
                <FormControl>
                  <CheckboxInput
                    showTooltip
                    items={ProfessionalGoalDetails}
                    values={field.value}
                    onChange={field.onChange}
                    classname=" grid-cols-3 gap-2"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="availability_schedule"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Availability</FormLabel>
                <FormControl>
                  <DailyAvailabilityInput
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className=" mt-2">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
        {setStep && markStepCompleted ? (
          <CardFooter className=" flex justify-between">
            <Button
              disabled={isPending}
              type="button"
              variant="outline"
              className=" w-fit"
              library="daisy"
              onClick={() => {
                setStep(3, user._id);
              }}
            >
              Go back
            </Button>
            <div className=" flex gap-4">
              <Button
                disabled={isPending}
                type="button"
                variant="outline"
                className=" w-fit"
                library="daisy"
                onClick={() => {
                  if (reset) reset();
                  router.push(
                    redirectContents({
                      role: auth.user.role || "TEACHER",
                      lang: lang || "en",
                    }),
                  );
                }}
              >
                Skip
              </Button>

              <Button
                disabled={isPending}
                type="submit"
                variant="info"
                className="  w-fit"
                library="daisy"
                role={isPending ? "loading" : undefined}
              >
                Continue
              </Button>
            </div>
          </CardFooter>
        ) : (
          <Button
            disabled={isPending}
            type="submit"
            variant="info"
            className=" w-full"
            library="daisy"
            role={isPending ? "loading" : undefined}
          >
            Add Preferences
          </Button>
        )}
      </form>
    </Form>
  );
};

export default TeacherPreferencesForm;
