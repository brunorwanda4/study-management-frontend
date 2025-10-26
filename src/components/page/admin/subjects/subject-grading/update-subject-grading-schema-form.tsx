"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import { MdOutlineDisabledVisible } from "react-icons/md";
import { RiInputCursorMove } from "react-icons/ri";

import { FormError, FormSuccess } from "@/components/common/form-message";
import SelectWithSearch from "@/components/common/select-with-search";
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
import { SubjectTypes, subjectGradingTypes } from "@/lib/const/subject-const";
import {
  defaultLetterGrade,
  defaultPassFail,
  defaultPercentage,
  defaultPoints,
} from "@/lib/const/subject/subject-grading-default-vaules";
import { useToast } from "@/lib/context/toast/ToastContext";
import type {
  DefaultLetterGrade,
  SubjectGrading,
} from "@/lib/schema/admin/subjects/subject-grading-schema/subject-grading-schema";
import {
  type UpdateSubjectGradingScheme,
  UpdateSubjectGradingSchemeSchema,
} from "@/lib/schema/admin/subjects/subject-grading-schema/update-subject-grading-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";

interface Props {
  auth: AuthContext;
  gradingScheme: SubjectGrading;
  action?: () => void;
  isDialog?: boolean;
}

const UpdateSubjectGradingSchemeForm = ({
  auth,
  gradingScheme,
  action,
  isDialog = false,
}: Props) => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const [changeBoundaries, setChangeBoundaries] = useState(false);
  const [changeWeights, setChangeWeights] = useState(false);
  const { showToast } = useToast();

  // 🆕 Local editable text states
  const [gradeBoundariesText, setGradeBoundariesText] = useState(
    JSON.stringify(gradingScheme?.grade_boundaries || {}, null, 2),
  );
  const [assessmentWeightsText, setAssessmentWeightsText] = useState(
    JSON.stringify(gradingScheme?.assessment_weights || {}, null, 2),
  );

  const [defaultInfo, setDefaultInfo] = useState({
    grade_boundaries: "",
    assessment_weights: "",
  });

  // --- React Hook Form setup ---
  const form = useForm<UpdateSubjectGradingScheme>({
    resolver: zodResolver(UpdateSubjectGradingSchemeSchema),
    defaultValues: {
      scheme_type: gradingScheme?.scheme_type,
      grade_boundaries: gradingScheme?.grade_boundaries,
      assessment_weights: gradingScheme?.assessment_weights,
      minimum_passing_grade: gradingScheme?.minimum_passing_grade,
      role: gradingScheme?.role,
    },
  });

  const handelChangeBoundaries = () => setChangeBoundaries((s) => !s);
  const handelChangeWeights = () => setChangeWeights((s) => !s);

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
        return defaultLetterGrade(input);
    }
  };

  const schemeType = useWatch({
    control: form.control,
    name: "scheme_type",
  });

  // --- Update defaults when schemeType changes ---
  useEffect(() => {
    if (!schemeType) return;

    const defaultValues = getDefaultGradingScheme(schemeType, {
      reference_id: gradingScheme.reference_id,
      role: "MainSubject",
      created_by: auth.user.id,
    });

    form.setValue("grade_boundaries", defaultValues.grade_boundaries);
    form.setValue("assessment_weights", defaultValues.assessment_weights);
    form.setValue("minimum_passing_grade", defaultValues.minimum_passing_grade);

    setGradeBoundariesText(
      JSON.stringify(defaultValues.grade_boundaries, null, 2),
    );
    setAssessmentWeightsText(
      JSON.stringify(defaultValues.assessment_weights, null, 2),
    );

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
  }, [schemeType, auth.user.id, gradingScheme.reference_id, form]);

  // --- Submit handler ---
  const handleSubmit = (values: UpdateSubjectGradingScheme) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const apiData = Object.fromEntries(
          Object.entries(values).filter(
            ([_, v]) => v !== undefined && v !== null,
          ),
        );

        const request = await apiRequest<
          UpdateSubjectGradingScheme,
          SubjectGrading
        >(
          "put",
          `/subject-grading-schemes/${gradingScheme._id || gradingScheme.id}`,
          apiData,
          {
            token: auth.token,
          },
        );

        if (!request.data) {
          setError(request.message);
          showToast({
            title: "Error",
            description: request.message,
            type: "error",
          });
        } else {
          setSuccess("Grading scheme updated successfully!");
          showToast({
            title: "Success",
            description: "Grading scheme updated successfully!",
            type: "success",
          });
          if (action) action();
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

        {/* Grade Boundaries */}
        <FormItem>
          <div className="flex items-center justify-between">
            <FormLabel
              className="cursor-pointer"
              onClick={handelChangeBoundaries}
            >
              Grade Boundaries (Label → Minimum %)
            </FormLabel>
            <Button
              variant="secondary"
              type="button"
              size="sm"
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
            readOnly={!changeBoundaries || isPending}
            disabled={!changeBoundaries || isPending}
            value={gradeBoundariesText}
            onChange={(e) => {
              setGradeBoundariesText(e.target.value);
              try {
                const parsed = JSON.parse(e.target.value);
                form.setValue("grade_boundaries", parsed);
              } catch {
                // ignore invalid JSON until corrected
              }
            }}
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
              variant="secondary"
              type="button"
              size="sm"
              library="daisy"
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
            readOnly={!changeWeights || isPending}
            value={assessmentWeightsText}
            disabled={!changeWeights || isPending}
            onChange={(e) => {
              setAssessmentWeightsText(e.target.value);
              try {
                const parsed = JSON.parse(e.target.value);
                form.setValue("assessment_weights", parsed);
              } catch {
                // ignore invalid JSON until corrected
              }
            }}
          />
          <p className="text-muted-foreground text-xs">
            Default: {defaultInfo.assessment_weights || "—"}
          </p>
        </FormItem>

        {/* Messages */}
        <FormError message={error} />
        <FormSuccess message={success} />

        {/* Footer */}
        {isDialog ? (
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
              Update Scheme{" "}
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
        ) : (
          <div className="flex space-x-3 pt-4">
            <Button
              type="submit"
              variant="primary"
              library="daisy"
              disabled={isPending}
              className="w-full sm:w-auto"
              role={isPending ? "loading" : undefined}
            >
              Update Scheme
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};

export default UpdateSubjectGradingSchemeForm;
