"use client";
import { FormError, FormSuccess } from "@/components/common/form-message";
import CheckboxInput from "@/components/common/form/checkbox-input";
import RadioInput from "@/components/common/form/radio-input";
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
  EmploymentTypeDetails,
  SubjectCategoryDetails,
} from "@/lib/const/common-details-const";
import { useToast } from "@/lib/context/toast/ToastContext";
import type { TradeModule } from "@/lib/schema/admin/tradeSchema";
import {
  type TeacherPosition,
  TeacherPositionSchema,
} from "@/lib/schema/teacher/teacher-schema";
import type { UserModel } from "@/lib/schema/user/user-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

interface props {
  user: UserModel;
  auth: AuthContext;
  setStep?: (step: number, id?: string) => void;
  markStepCompleted?: (step: number, autoNext?: boolean, id?: string) => void;
}

const TeacherPositionForm = ({
  user,
  auth,
  setStep,
  markStepCompleted,
}: props) => {
  const [error, setError] = useState<undefined | null | string>("");
  const [success, setSuccess] = useState<undefined | null | string>("");
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();
  const [trades, setTrades] = useState<TradeModule[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [tradesRes] = await Promise.all([
          apiRequest<any, TradeModule[]>("get", "/trades", undefined, {
            token: auth.token,
          }),
        ]);

        if (tradesRes.data) {
          const activeTrades = tradesRes.data.filter((t) => !t.disable);
          setTrades(activeTrades);
        }
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, [auth.token]);

  const form = useForm<TeacherPosition>({
    resolver: zodResolver(TeacherPositionSchema),
    defaultValues: {
      favorite_subjects_category: user.favorite_subjects_category
        ? user.favorite_subjects_category
        : [],
      employment_type: user.employment_type ? user.employment_type : undefined,
      teaching_level: user.teaching_level ? user.teaching_level : [],
    },
    mode: "onChange",
  });

  const onSubmit = (value: TeacherPosition) => {
    setSuccess(null);
    setError(null);
    startTransition(async () => {
      const update = await apiRequest<TeacherPosition, UserModel>(
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
        if (setStep) setStep(2, update.data.id);
        if (markStepCompleted)
          markStepCompleted(1, true, update.data.id || update.data._id);
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
            name="favorite_subjects_category"
            render={({ field }) => (
              <FormItem className=" w-full space-y-2">
                <FormLabel>Favorite subjects category</FormLabel>
                <FormControl>
                  <CheckboxInput
                    showTooltip
                    items={SubjectCategoryDetails}
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
            name="employment_type"
            render={({ field }) => (
              <FormItem className=" w-full space-y-2">
                <FormLabel>Employment type</FormLabel>
                <FormControl>
                  <RadioInput
                    showTooltip
                    items={EmploymentTypeDetails}
                    value={field.value}
                    onChange={field.onChange}
                    className=" grid-cols-3 gap-2"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="teaching_level"
            render={({ field }) => (
              <FormItem className=" w-full space-y-2">
                <FormLabel>Teaching Level</FormLabel>
                {loadingOptions ? (
                  <div className=" skeleton h-12 w-full" />
                ) : (
                  <FormControl>
                    <CheckboxInput
                      showTooltip
                      items={Object.fromEntries(
                        trades.map((t) => [
                          t.id || t._id,
                          {
                            name: t.name,
                            description: t.description ?? undefined,
                            image: undefined,
                          },
                        ]),
                      )}
                      values={field.value}
                      onChange={field.onChange}
                      classname=" grid-cols-3 gap-2"
                      disabled={isPending}
                    />
                  </FormControl>
                )}
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
          <div className=" flex justify-end">
            <div className=" flex gap-4">
              <Button
                disabled={isPending}
                type="button"
                variant="outline"
                className=" w-fit"
                library="daisy"
                onClick={() => {
                  setStep(2, user._id);
                  markStepCompleted(1, true, user._id);
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
          </div>
        ) : (
          <Button
            disabled={isPending}
            type="submit"
            variant="info"
            className=" w-full"
            library="daisy"
            role={isPending ? "loading" : undefined}
          >
            Add Position information
          </Button>
        )}
      </form>
    </Form>
  );
};

export default TeacherPositionForm;
