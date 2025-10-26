"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
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
import { useToast } from "@/lib/context/toast/ToastContext";
import type { SubjectProgressTrackingConfig } from "@/lib/schema/admin/subjects/subject-progress-tracking-config-schema/subject-progress-tracking-config-schema";
import {
  type UpdateSubjectProgressTrackingConfig,
  UpdateSubjectProgressTrackingConfigSchema,
} from "@/lib/schema/admin/subjects/subject-progress-tracking-config-schema/update-subject-progress-tracking-config-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

interface Props {
  auth: AuthContext;
  config: SubjectProgressTrackingConfig;
  setStep?: (step: number, id?: string) => void;
  markStepCompleted?: (step: number, autoNext?: boolean, id?: string) => void;
  isDialog?: boolean;
}

const UpdateSubjectProgressTrackingConfigForm = ({
  auth,
  config,
  setStep,
  markStepCompleted,
  isDialog = false,
}: Props) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const form = useForm<UpdateSubjectProgressTrackingConfig>({
    resolver: zodResolver(UpdateSubjectProgressTrackingConfigSchema),
    defaultValues: {
      track_attendance: config.track_attendance,
      track_assignments: config.track_assignments,
      track_topic_coverage: config.track_topic_coverage,
      track_skill_acquisition: config.track_skill_acquisition,
      thresholds: {
        satisfactory: config.thresholds.satisfactory,
        needs_improvement: config.thresholds.needs_improvement,
        at_risk: config.thresholds.at_risk,
      },
    },
    mode: "onChange",
  });

  const watchThresholds = form.watch("thresholds");

  const handleSubmit: SubmitHandler<UpdateSubjectProgressTrackingConfig> = (
    values,
  ) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        // Remove undefined values to send only updated fields
        const cleanedValues = Object.fromEntries(
          Object.entries(values).filter(([_, value]) => value !== undefined),
        );

        // Clean thresholds object if it exists
        if (cleanedValues.thresholds) {
          cleanedValues.thresholds = Object.fromEntries(
            Object.entries(cleanedValues.thresholds).filter(
              ([_, value]) => value !== undefined,
            ),
          );

          // Remove thresholds if it's empty
          if (Object.keys(cleanedValues.thresholds).length === 0) {
            delete cleanedValues.thresholds;
          }
        }

        const request = await apiRequest<
          UpdateSubjectProgressTrackingConfig,
          SubjectProgressTrackingConfig
        >(
          "put",
          `/subject-progress-configs/${config.id || config._id}`,
          cleanedValues,
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
          setSuccess("Progress tracking configuration updated successfully!");
          showToast({
            title: "Configuration updated",
            description: `Progress tracking configuration has been updated`,
            type: "success",
          });

          if (setStep) setStep(4, config?.id || config?._id);
          if (markStepCompleted)
            markStepCompleted(2, undefined, config?.id || config?._id);
        }
      } catch (err) {
        setError(`Unexpected error occurred [${err}]. Please try again.`);
      }
    });
  };

  const handleResetToDefaults = () => {
    form.reset({
      track_attendance: true,
      track_assignments: true,
      track_topic_coverage: true,
      track_skill_acquisition: false,
      thresholds: {
        satisfactory: 80,
        needs_improvement: 60,
        at_risk: 40,
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Configuration Info (Read-only) */}
        <div className="bg-muted/50 rounded-lg border p-4">
          <h3 className="mb-2 font-semibold">Configuration Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Type:</span>
              <span className="ml-2 capitalize">
                {config.role.replace(/([A-Z])/g, " $1").trim()}
              </span>
            </div>
            <div>
              <span className="font-medium">Reference ID:</span>
              <span className="ml-2 font-mono text-xs">
                {config.reference_id}
              </span>
            </div>
            <div>
              <span className="font-medium">Created:</span>
              <span className="ml-2">
                {config.created_at
                  ? new Date(config.created_at).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
            <div>
              <span className="font-medium">Last Updated:</span>
              <span className="ml-2">
                {config.updated_at
                  ? new Date(config.updated_at).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Tracking Options */}
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="py-2">
              <FormLabel className="text-base">Tracking Options</FormLabel>
              <FormDescription>
                Configure which aspects of progress should be tracked
              </FormDescription>
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
                      checked={field.value ?? config.track_attendance}
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
                      checked={field.value ?? config.track_assignments}
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
                      checked={field.value ?? config.track_topic_coverage}
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
                      checked={field.value ?? config.track_skill_acquisition}
                      onCheckedChange={field.onChange}
                      disabled={isPending}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Progress Thresholds */}
        <div className="space-y-4 rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <FormLabel className="text-base">Progress Thresholds</FormLabel>
              <FormDescription>
                Set the percentage thresholds for different progress levels
              </FormDescription>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleResetToDefaults}
              disabled={isPending}
            >
              Reset to Defaults
            </Button>
          </div>

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
                        value={field.value ?? config.thresholds.satisfactory}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        disabled={isPending}
                        className="pr-10"
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Above {field.value ?? config.thresholds.satisfactory}% is
                    satisfactory
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
                        value={
                          field.value ?? config.thresholds.needs_improvement
                        }
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        disabled={isPending}
                        className="pr-10"
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    {field.value ?? config.thresholds.needs_improvement}% to{" "}
                    {watchThresholds?.satisfactory ??
                      config.thresholds.satisfactory}
                    % needs improvement
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
                        value={field.value ?? config.thresholds.at_risk}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        disabled={isPending}
                        className="pr-10"
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Below {field.value ?? config.thresholds.at_risk}% is at risk
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
                className="bg-error"
                style={{
                  width: `${watchThresholds?.at_risk ?? (config.thresholds.at_risk || 0)}%`,
                }}
              />
              <div
                className="bg-warning"
                style={{
                  width: `${(watchThresholds?.needs_improvement ?? (config.thresholds.needs_improvement || 0)) - (watchThresholds?.at_risk ?? (config.thresholds.at_risk || 0))}%`,
                }}
              />
              <div
                className="bg-success"
                style={{
                  width: `${(watchThresholds?.satisfactory ?? (config.thresholds.satisfactory || 0)) - (watchThresholds?.needs_improvement ?? (config.thresholds.needs_improvement || 0))}%`,
                }}
              />
              <div
                className="bg-info"
                style={{
                  width: `${100 - (watchThresholds?.satisfactory ?? (config.thresholds.satisfactory || 0))}%`,
                }}
              />
            </div>
            <div className="text-muted-foreground mt-1 flex justify-between text-xs">
              <span>0%</span>
              <span>
                {watchThresholds?.at_risk ?? config.thresholds.at_risk}%
              </span>
              <span>
                {watchThresholds?.needs_improvement ??
                  config.thresholds.needs_improvement}
                %
              </span>
              <span>
                {watchThresholds?.satisfactory ??
                  config.thresholds.satisfactory}
                %
              </span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <FormError message={error} />
        <FormSuccess message={success} />

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
              role={isPending ? "loading" : undefined}
            >
              Update Topic
            </Button>
          </DialogFooter>
        ) : (
          <div className="flex space-x-3 pt-4">
            <Button
              type="submit"
              variant="primary"
              library="daisy"
              role={isPending ? "loading" : undefined}
              disabled={isPending}
            >
              Update Configuration
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};

export default UpdateSubjectProgressTrackingConfigForm;
