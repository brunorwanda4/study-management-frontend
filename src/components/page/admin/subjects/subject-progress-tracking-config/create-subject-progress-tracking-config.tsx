"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

import { FormError, FormSuccess } from "@/components/common/form-message";
import SelectWithSearch from "@/components/common/select-with-search";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/lib/context/toast/ToastContext";
import { MainSubject } from "@/lib/schema/admin/subjects/main-subject-schema/main-subject-schema";
import { SubjectProgressTrackingConfigType } from "@/lib/schema/admin/subjects/subject-category";
import {
  CreateSubjectProgressTrackingConfig,
  CreateSubjectProgressTrackingConfigSchema,
} from "@/lib/schema/admin/subjects/subject-progress-tracking-config-schema/create-subject-progress-tracking-config-schema";
import { SubjectProgressTrackingConfig } from "@/lib/schema/admin/subjects/subject-progress-tracking-config-schema/subject-progress-tracking-config-schema";
import { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";

interface Props {
  auth: AuthContext;
  subject?: MainSubject;
  subjectType?: SubjectProgressTrackingConfigType;
  setStep: (step: number, id?: string) => void;
  markStepCompleted?: (step: number, autoNext?: boolean, id?: string) => void;
}

const CreateSubjectProgressTrackingConfigForm = ({
  auth,
  subject,
  subjectType,
  setStep,
  markStepCompleted,
}: Props) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();
  const [subjects, setSubjects] = useState<MainSubject[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [defaultConfig, setDefaultConfig] = useState(
    !!subject && !!subjectType,
  );

  useEffect(() => {
    const fetchMainClasses = async () => {
      try {
        const [subjects] = await Promise.all([
          apiRequest<void, MainSubject[]>("get", "/main-subjects", undefined, {
            token: auth.token,
          }),
        ]);

        if (subjects.data) {
          setSubjects(subjects.data);
        }
      } catch (error) {
        showToast({
          title: "Error to get main class or main subjects",
          description: `"Failed to fetch main classes:", ${error}`,
          type: "error",
        });
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchMainClasses();
  }, [auth.token]);

  const form = useForm<CreateSubjectProgressTrackingConfig>({
    resolver: zodResolver(CreateSubjectProgressTrackingConfigSchema),
    defaultValues: {
      reference_id: subject ? subject.id || subject._id : "",
      track_attendance: true,
      track_assignments: true,
      track_topic_coverage: true,
      track_skill_acquisition: false,
      thresholds: {
        satisfactory: 80,
        needs_improvement: 60,
        at_risk: 40,
      },
      role: subjectType && "MainSubject",
    },
    mode: "onChange",
  });

  const watchThresholds = form.watch("thresholds");

  const handleSubmit: SubmitHandler<CreateSubjectProgressTrackingConfig> = (
    values,
  ) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const apiBody = { ...values, created_by: auth.user.id };
        const request = await apiRequest<
          CreateSubjectProgressTrackingConfig,
          SubjectProgressTrackingConfig
        >("post", "/subject-progress-configs", apiBody, {
          token: auth.token,
        });

        if (!request.data) {
          setError(request.message);
          showToast({
            title: "Error",
            description: request.message,
            type: "error",
          });
        } else {
          if (!!setStep) setStep(4, subject?.id || subject?._id);
          if (!!markStepCompleted) markStepCompleted(2);
          setSuccess("Progress tracking configuration created successfully!");
          showToast({
            title: "Configuration created",
            description: `Progress tracking configuration has been created`,
            type: "success",
          });
          form.reset();
        }
      } catch (err) {
        setError(`Unexpected error occurred [${err}]. Please try again.`);
      }
    });
  };

  const handleChangeDefaultConfig = () => {
    setDefaultConfig((state) => !state);
  };

  const handleCreateDefaultConfig = () => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      try {
        const apiBody = {
          created_by: auth.user.id,
          role: subjectType,
          reference_id: subject?._id || subject?.id,
        };
        const request = await apiRequest<any, SubjectProgressTrackingConfig>(
          "post",
          "/subject-progress-configs/default",
          apiBody,
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
          if (!!setStep) setStep(4, subject?.id || subject?._id);
          if (!!markStepCompleted) markStepCompleted(2);
          setSuccess("Progress tracking configuration created successfully!");
          showToast({
            title: "Configuration created",
            description: `Progress tracking configuration has been created`,
            type: "success",
          });
          form.reset();
        }
      } catch (err) {
        setError(`Unexpected error occurred [${err}]. Please try again.`);
      }
    });
  };

  if (defaultConfig) {
    return (
      <div className="flex gap-4">
        <Button
          onClick={handleCreateDefaultConfig}
          type="button"
          library="daisy"
        >
          Create default subject progress configs 🌻
        </Button>
        <Button
          onClick={handleChangeDefaultConfig}
          type="button"
          library="daisy"
          variant={"outline"}
        >
          Customer subject progress configs ✨
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Configuration Type and Reference */}
        <div className="flex flex-row gap-4">
          {!subjectType && !subject && (
            <div className="flex w-1/2 flex-col space-y-4">
              {/* Role */}
              {!subjectType && (
                <FormField
                  name="role"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Configuration Type</FormLabel>
                      <Select
                        value={field.value ?? ""}
                        onValueChange={field.onChange}
                        disabled={isPending}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select configuration type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="MainSubject">
                            Main Subject
                          </SelectItem>
                          <SelectItem value="ClassSubject">
                            Class Subject
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Determines what type of entity this configuration
                        applies to
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Reference ID */}
              {!subject && (
                <FormField
                  name="reference_id"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reference Entity</FormLabel>
                      {loadingOptions ? (
                        <div className="skeleton h-12 rounded-md" />
                      ) : (
                        <SelectWithSearch
                          options={subjects.map((item) => ({
                            value: String(item._id ?? item.id ?? ""),
                            label: `${item.name} - ${item.code}`,
                          }))}
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          placeholder="Select reference entity"
                          disabled={isPending}
                        />
                      )}
                      <FormDescription>
                        The main subject or class subject this configuration
                        applies to
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          )}

          {/* Right Side - Tracking Options */}
          <div className="flex w-1/2 flex-col space-y-4">
            {/* Tracking Options */}
            <div className="space-y-3">
              <div className="py-2">
                <FormLabel className="">Tracking Options</FormLabel>
              </div>

              <FormField
                name="track_attendance"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Track Attendance</FormLabel>
                      <FormDescription>
                        Monitor student attendance for this subject
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isPending}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="track_assignments"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Track Assignments</FormLabel>
                      <FormDescription>
                        Monitor assignment completion and grades
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isPending}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="track_topic_coverage"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Track Topic Coverage</FormLabel>
                      <FormDescription>
                        Monitor curriculum topic completion
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isPending}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="track_skill_acquisition"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Track Skill Acquisition</FormLabel>
                      <FormDescription>
                        Monitor skill development and mastery
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isPending}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/* Progress Thresholds */}
        <div className="space-y-4 rounded-lg border p-4">
          <FormLabel className="text-base">Progress Thresholds</FormLabel>
          <FormDescription>
            Set the percentage thresholds for different progress levels
          </FormDescription>

          <div className="grid grid-cols-3 gap-4">
            {/* Satisfactory Threshold */}
            <FormField
              name="thresholds.satisfactory"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-green-600">Satisfactory</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        numberMode="percent"
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        disabled={isPending}
                        className="pr-10"
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Above {field.value}% is satisfactory
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Needs Improvement Threshold */}
            <FormField
              name="thresholds.needs_improvement"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-yellow-600">
                    Needs Improvement
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        numberMode="percent"
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        disabled={isPending}
                        className="pr-10"
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    {field.value}% to {watchThresholds?.satisfactory}% needs
                    improvement
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* At Risk Threshold */}
            <FormField
              name="thresholds.at_risk"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-red-600">At Risk</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        numberMode="percent"
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        disabled={isPending}
                        className="pr-10"
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Below {field.value}% is at risk
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Threshold Visual Indicator */}
          <div className="bg-muted mt-4 rounded-lg p-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-error">At Risk</span>
              <span className="text-warning">Needs Improvement</span>
              <span className="text-success">Satisfactory</span>
            </div>
            <div className="mt-2 flex h-2 overflow-hidden rounded-full bg-gray-200">
              <div
                className="bg-red-500"
                style={{ width: `${watchThresholds?.at_risk || 0}%` }}
              />
              <div
                className="bg-yellow-500"
                style={{
                  width: `${(watchThresholds?.needs_improvement || 0) - (watchThresholds?.at_risk || 0)}%`,
                }}
              />
              <div
                className="bg-green-500"
                style={{
                  width: `${(watchThresholds?.satisfactory || 0) - (watchThresholds?.needs_improvement || 0)}%`,
                }}
              />
              <div
                className="bg-blue-500"
                style={{
                  width: `${100 - (watchThresholds?.satisfactory || 0)}%`,
                }}
              />
            </div>
            <div className="text-muted-foreground mt-1 flex justify-between text-xs">
              <span>0%</span>
              <span>{watchThresholds?.at_risk}%</span>
              <span>{watchThresholds?.needs_improvement}%</span>
              <span>{watchThresholds?.satisfactory}%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <FormError message={error} />
        <FormSuccess message={success} />

        <div className="flex w-full justify-between">
          <Button
            type="submit"
            variant="default"
            disabled={isPending}
            className="w-full sm:w-auto"
          >
            Create Configuration{" "}
            {isPending && (
              <LoaderCircle
                className="-ms-1 me-2 animate-spin"
                size={12}
                strokeWidth={2}
                aria-hidden="true"
              />
            )}
          </Button>
          <Button
            onClick={handleCreateDefaultConfig}
            type="button"
            library="daisy"
          >
            Create default subject progress configs 🌻
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateSubjectProgressTrackingConfigForm;
