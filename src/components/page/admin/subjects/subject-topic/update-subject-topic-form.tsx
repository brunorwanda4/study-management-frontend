"use client";

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
import { useToast } from "@/lib/context/toast/ToastContext";
import type { MainSubject } from "@/lib/schema/admin/subjects/main-subject-schema/main-subject-schema";
import type { LearningOutcome } from "@/lib/schema/admin/subjects/subject-learning-outcome-schema/learning-outcome-schema";
import type { SubjectTopic } from "@/lib/schema/admin/subjects/subject-topic-schema/subject-topic-schema";
import {
  type UpdateSubjectTopic,
  UpdateSubjectTopicSchema,
} from "@/lib/schema/admin/subjects/subject-topic-schema/update-subject-topic-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

interface Props {
  auth: AuthContext;
  topic: SubjectTopic;
  subject?: MainSubject;
  learningOutcome?: LearningOutcome;
}

const UpdateSubjectTopicForm = ({
  auth,
  topic,
  subject,
  learningOutcome,
}: Props) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const [learningOutcomes, setLearningOutcomes] = useState<LearningOutcome[]>(
    [],
  );
  const [parentTopics, setParentTopics] = useState<SubjectTopic[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  // Fetch dropdown data
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [loRes, topicsRes] = await Promise.all([
          apiRequest<void, LearningOutcome[]>(
            "get",
            subject
              ? `/learning-outcomes/subject/${subject.id || subject._id}`
              : "/learning-outcomes",
            undefined,
            { token: auth.token },
          ),
          apiRequest<void, SubjectTopic[]>(
            "get",
            learningOutcome
              ? `/subject-topics/learning-outcome/${learningOutcome._id || learningOutcome.id}`
              : "/subject-topics",
            undefined,
            {
              token: auth.token,
              realtime: true,
            },
          ),
        ]);

        if (loRes.data) setLearningOutcomes(loRes.data);
        if (topicsRes.data) setParentTopics(topicsRes.data);
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, [auth.token, subject, learningOutcome]);

  // Setup form with defaults from existing topic
  const form = useForm<UpdateSubjectTopic>({
    resolver: zodResolver(UpdateSubjectTopicSchema),
    defaultValues: {
      title: topic.title ?? "",
      description: topic.description ?? "",
      order: topic.order ?? 1,
      learning_outcome_id:
        topic.learning_outcome_id ??
        learningOutcome?._id ??
        learningOutcome?.id ??
        undefined,
      parent_topic_id: topic.parent_topic_id ?? undefined,
    },
    mode: "onChange",
  });

  // Submit handler
  const handleSubmit = (values: UpdateSubjectTopic) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const request = await apiRequest<UpdateSubjectTopic, SubjectTopic>(
          "put",
          `/subject-topics/${topic._id || topic.id}`,
          values,
          { token: auth.token },
        );

        if (!request.data) {
          setError(request.message);
          showToast({
            title: "Error",
            description: request.message,
            type: "error",
          });
        } else {
          setSuccess("Subject Topic updated successfully!");
          showToast({
            title: "Updated",
            description: `Updated topic: ${request.data.title}`,
            type: "success",
          });
        }
      } catch (err) {
        setError(`Unexpected error occurred [${err}]. Please try again.`);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Left Column */}
          <div className="flex flex-col space-y-4">
            {/* Title */}
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter topic title"
                      disabled={isPending}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter topic description"
                      className="min-h-24 resize-none"
                      disabled={isPending}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Right Column */}
          <div className="flex flex-col space-y-4">
            {/* Learning Outcome */}
            {!learningOutcome && (
              <FormField
                name="learning_outcome_id"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Learning Outcome</FormLabel>
                    {loadingOptions ? (
                      <div className="skeleton h-12 rounded-md" />
                    ) : (
                      <SelectWithSearch
                        options={learningOutcomes.map((lo) => ({
                          value: lo.id || lo._id || "",
                          label: lo.title,
                        }))}
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        placeholder={
                          loadingOptions
                            ? "Loading outcomes..."
                            : "Select learning outcome"
                        }
                        disabled={isPending || loadingOptions}
                      />
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Parent Topic */}
            <FormField
              name="parent_topic_id"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent Topic</FormLabel>
                  <SelectWithSearch
                    options={parentTopics.map((pt) => ({
                      value: pt.id || pt._id || "",
                      label: pt.title,
                    }))}
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    placeholder={
                      loadingOptions
                        ? "Loading topics..."
                        : "Select parent topic"
                    }
                    disabled={isPending || loadingOptions}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Order */}
            <FormField
              name="order"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

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
            Update Topic{" "}
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

export default UpdateSubjectTopicForm;
