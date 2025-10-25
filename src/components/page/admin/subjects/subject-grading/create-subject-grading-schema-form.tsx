"use client";

import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import { MdOutlineDisabledVisible } from "react-icons/md";
import { RiInputCursorMove } from "react-icons/ri";

import { FormError, FormSuccess } from "@/components/common/form-message";
import SelectWithSearch from "@/components/common/select-with-search";
import { useToast } from "@/lib/context/toast/ToastContext";
import apiRequest from "@/service/api-client";

import { subjectGradingTypes, SubjectTypes } from "@/lib/const/subject-const";
import {
  defaultLetterGrade,
  defaultPassFail,
  defaultPercentage,
  defaultPoints,
} from "@/lib/const/subject/subject-grading-default-vaules";
import { MainSubject } from "@/lib/schema/admin/subjects/main-subject-schema/main-subject-schema";
import {
  CreateSubjectGradingScheme,
  CreateSubjectGradingSchemeSchema,
} from "@/lib/schema/admin/subjects/subject-grading-schema/create-subject-grading-schema";
import {
  DefaultLetterGrade,
  SubjectGrading,
} from "@/lib/schema/admin/subjects/subject-grading-schema/subject-grading-schema";
import { AuthContext } from "@/lib/utils/auth-context";
import { redirect } from "next/navigation";

interface Props {
  auth: AuthContext;
  subject: MainSubject;
  action?: () => void;
}

const CreateSubjectGradingSchemeForm = ({ auth, subject, action }: Props) => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();
  const [changeBoundaries, setChangeBoundaries] = useState(false);
  const [changeWeights, setChangeWeights] = useState(false);
  const [defaultInfo, setDefaultInfo] = useState({
    grade_boundaries: "",
    assessment_weights: "",
  });

  const handelChangeBoundaries = () => {
    setChangeBoundaries((state) => !state);
  };

  const handelChangeWeights = () => {
    setChangeWeights((state) => !state);
  };

  // --- React Hook Form setup ---
  const form = useForm<CreateSubjectGradingScheme>({
    resolver: zodResolver(CreateSubjectGradingSchemeSchema),
    defaultValues: {
      reference_id: subject ? subject.id || subject.id : undefined,
      scheme_type: "Percentage",
      grade_boundaries: {
        Excellent: 90,
        Good: 80,
        Average: 70,
        Pass: 60,
        Fail: 0,
      },
      assessment_weights: {
        exams: 50,
        assignments: 30,
        participation: 20,
      },
      minimum_passing_grade: "Average",
      role: "MainSubject",
    },
    mode: "onChange",
  });

  const getDefaultGradingScheme = (
    schemeType: string,
    input: DefaultLetterGrade,
  ) => {
    switch (schemeType) {
      case "LetterGrade":
        return defaultLetterGrade(input);
      case "Percentage":
        return defaultPercentage(input);
      case "Points":
        return defaultPoints(input);
      case "PassFail":
        return defaultPassFail(input);
      default:
        return defaultLetterGrade(input); // fallback
    }
  };

  const schemeType = useWatch({
    control: form.control,
    name: "scheme_type",
  });

  useEffect(() => {
    if (!schemeType) return;

    const defaultValues = getDefaultGradingScheme(schemeType, {
      reference_id: subject.id,
      role: "MainSubject",
      created_by: auth.user.id,
    });

    form.setValue("grade_boundaries", defaultValues.grade_boundaries);
    form.setValue("assessment_weights", defaultValues.assessment_weights);
    form.setValue("minimum_passing_grade", defaultValues.minimum_passing_grade);

    // 🆕 Format and set default info text dynamically
    const boundariesText = Object.entries(defaultValues.grade_boundaries)
      .map(([k, v]) => `${k}=${v}`)
      .join(", ");
    const weightsText = Object.entries(defaultValues.assessment_weights || {})
      .map(([k, v]) => `${k}=${v}`)
      .join(", ");

    setDefaultInfo({
      grade_boundaries: boundariesText,
      assessment_weights: weightsText,
    });
  }, [schemeType, subject, auth.user.id, form]);

  // --- Handle Submit ---
  const handleSubmit = (values: CreateSubjectGradingScheme) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const apiData = {
          ...values,
          reference_id: subject?._id || subject?.id,
          created_by: auth.user.id,
        };

        const request = await apiRequest<
          CreateSubjectGradingScheme,
          SubjectGrading
        >("post", "/subject-grading-schemes", apiData, { token: auth.token });
        if (!request.data) {
          setError(request.message);
          showToast({
            title: "Error",
            description: request.message,
            type: "error",
          });
        } else {
          setSuccess("Subject Grading Scheme created successfully!");
          showToast({
            title: "Success",
            description: "Grading scheme created successfully!",
            type: "success",
          });
          if (!!action) action();
          form.reset();
          redirect(`/a/collections/main_subjects/${subject.code}`);
        }
      } catch (err) {
        setError(`Unexpected error: ${err}`);
      }
    });
  };

  // --- Render ---
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Scheme Type */}
        <FormField
          name="scheme_type"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Scheme Type</FormLabel>
              <SelectWithSearch
                options={subjectGradingTypes.map((opt) => ({
                  value: opt,
                  label: opt,
                }))}
                value={field.value}
                onChange={field.onChange}
                placeholder="Select scheme type"
                disabled={isPending}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Minimum Passing Grade */}
        <FormField
          name="minimum_passing_grade"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimum Passing Grade</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g. D or Pass"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Role */}
        {!subject && (
          <FormField
            name="role"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <SelectWithSearch
                  options={SubjectTypes.map((r) => ({
                    value: r,
                    label: r,
                  }))}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select role"
                  disabled={isPending}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Grade Boundaries */}
        <FormItem>
          <div className="flex items-center justify-between">
            <FormLabel
              className="cursor-pointer"
              onClick={handelChangeBoundaries}
            >
              Grade Boundaries (Label → Minimum %){" "}
            </FormLabel>
            <Button
              variant={"secondary"}
              type="button"
              size={"sm"}
              library="daisy"
              onClick={handelChangeBoundaries}
            >
              {changeBoundaries ? (
                <RiInputCursorMove />
              ) : (
                <MdOutlineDisabledVisible />
              )}
            </Button>
          </div>
          <Textarea
            className="min-h-24 resize-none"
            disabled={!changeBoundaries || isPending}
            value={JSON.stringify(form.getValues("grade_boundaries"), null, 2)}
          />
          <p className="text-muted-foreground text-xs">
            Default: {defaultInfo.grade_boundaries || "—"}
          </p>
        </FormItem>

        {/* Assessment Weights */}
        <FormItem>
          <div className="flex items-center justify-between">
            <FormLabel className="cursor-pointer" onClick={handelChangeWeights}>
              Assessment Weights (Category → %)
            </FormLabel>
            <Button
              variant={"secondary"}
              type="button"
              library="daisy"
              size={"sm"}
              onClick={handelChangeWeights}
            >
              {changeWeights ? (
                <RiInputCursorMove />
              ) : (
                <MdOutlineDisabledVisible />
              )}
            </Button>
          </div>
          <Textarea
            className="min-h-24 resize-none"
            disabled={!changeWeights || isPending}
            value={JSON.stringify(
              form.getValues("assessment_weights"),
              null,
              2,
            )}
          />
          <p className="text-muted-foreground text-xs">
            Default: {defaultInfo.assessment_weights || "—"}
          </p>
        </FormItem>

        {/* Messages */}
        <FormError message={error} />
        <FormSuccess message={success} />

        {/* Footer */}
        <DialogFooter className="px-6 pb-6 sm:justify-end">
          <DialogClose asChild>
            <Button library="daisy" type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant="primary"
            library="daisy"
            disabled={isPending}
            className="w-full sm:w-auto"
          >
            Create Scheme{" "}
            {isPending && (
              <LoaderCircle
                className="-ms-1 me-2 animate-spin"
                size={12}
                strokeWidth={2}
                aria-hidden="true"
              />
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default CreateSubjectGradingSchemeForm;
