import { FormError, FormSuccess } from "@/components/common/form-message";
import CheckboxInput from "@/components/common/form/checkbox-input";
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
  LanguageDetails,
  StudyStyleDetails,
  SubjectCategoryDetails,
} from "@/lib/const/common-details-const";
import { useToast } from "@/lib/context/toast/ToastContext";
import {
  type StudentAcademicInterest,
  StudentAcademicInterestSchema,
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

const StudentAcademicInterestForm = ({
  user,
  auth,
  setStep,
  markStepCompleted,
}: props) => {
  const [error, setError] = useState<undefined | null | string>("");
  const [success, setSuccess] = useState<undefined | null | string>("");
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const form = useForm<StudentAcademicInterest>({
    resolver: zodResolver(StudentAcademicInterestSchema),
    defaultValues: {
      favorite_subjects_category: user.favorite_subjects_category
        ? user.favorite_subjects_category
        : [],
      preferred_study_styles: user.preferred_study_styles
        ? user.preferred_study_styles
        : [],
      languages_spoken: user.languages_spoken ? user.languages_spoken : [],
    },
    mode: "onChange",
  });

  const onSubmit = (value: StudentAcademicInterest) => {
    setSuccess(null);
    setError(null);
    startTransition(async () => {
      const update = await apiRequest<StudentAcademicInterest, UserModel>(
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
            name="preferred_study_styles"
            render={({ field }) => (
              <FormItem className=" w-full space-y-2">
                <FormLabel>Preferred study style</FormLabel>
                <FormControl>
                  <CheckboxInput
                    showTooltip
                    items={StudyStyleDetails}
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
            name="languages_spoken"
            render={({ field }) => (
              <FormItem className=" w-full space-y-2">
                <FormLabel>Languages spoken</FormLabel>
                <FormControl>
                  <CheckboxInput
                    showTooltip
                    items={LanguageDetails}
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
        </div>
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
      </form>
    </Form>
  );
};

export default StudentAcademicInterestForm;
