"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from "react";
import { useForm, type Resolver } from "react-hook-form";

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
import { Textarea } from "@/components/ui/textarea";

import { FormError, FormSuccess } from "@/components/common/form-message";
import SelectWithSearch from "@/components/common/select-with-search";
import TagField from "@/components/common/tag-field";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import MultipleSelector from "@/components/ui/multiselect";
import { SubjectTypes } from "@/lib/const/subject-const";
import { useToast } from "@/lib/context/toast/ToastContext";
import { MainSubject } from "@/lib/schema/admin/subjects/main-subject-schema/main-subject-schema";
import {
  CreateLearningOutcomeFormData,
  CreateLearningOutcomeFormSchema,
} from "@/lib/schema/admin/subjects/subject-learning-outcome-schema/create-subject-learning-outcome-schema";
import { LearningOutcome } from "@/lib/schema/admin/subjects/subject-learning-outcome-schema/learning-outcome-schema";
import { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";

interface Props {
  auth: AuthContext;
  mainSubject: MainSubject; // Pass main subjects as prop or fetch internally
  setLearningOutcome?: Dispatch<SetStateAction<LearningOutcome | undefined>>;
  isDialog?: boolean;
}

const CreateLearningOutcomeForm = ({
  auth,
  mainSubject,
  isDialog = true,
  setLearningOutcome,
}: Props) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();
  const [existingOutcomes, setExistingOutcomes] = useState<LearningOutcome[]>(
    [],
  );
  const [mainSubjects, setMainSubject] = useState<MainSubject[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  useEffect(() => {
    const fetchExistingOutcomes = async () => {
      try {
        const [outcomes, mainSubjects] = await Promise.all([
          apiRequest<void, LearningOutcome[]>(
            "get",
            `/learning-outcomes/subject/${mainSubject._id || mainSubject.id}`,
            undefined,
            { token: auth.token, realtime: true },
          ),
          apiRequest<void, MainSubject[]>("get", "/main-subjects", undefined, {
            token: auth.token,
          }),
        ]);

        if (outcomes.data) {
          setExistingOutcomes(outcomes.data);
        }

        if (mainSubjects.data) {
          setMainSubject(mainSubjects.data);
        }
      } catch (error) {
        showToast({
          title: "Error fetching learning outcomes",
          description: `Failed to fetch existing outcomes: ${error}`,
          type: "error",
        });
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchExistingOutcomes();
  }, [auth.token]);

  // Default values matching the create schema
  const defaultValues: CreateLearningOutcomeFormData = {
    subject_id: mainSubject ? mainSubject.id || mainSubject._id : "",
    title: "",
    description: "",
    order: 1,
    estimated_hours: 0,
    key_competencies: {
      knowledge: [],
      skills: [],
      attitudes: [],
    },
    assessment_criteria: [],
    role: mainSubject ? "MainSubject" : "MainSubject", // Default role
    prerequisites: [],
    is_mandatory: true,
  };

  const form = useForm<CreateLearningOutcomeFormData>({
    resolver: zodResolver(
      CreateLearningOutcomeFormSchema,
    ) as Resolver<CreateLearningOutcomeFormData>,
    defaultValues,
    mode: "onChange",
  });

  const handleSubmit = (values: CreateLearningOutcomeFormData) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        // Transform data for API - handle prerequisites format
        const apiData = {
          ...values,
          estimated_hours: Number(values.estimated_hours),
          order: Number(values.order),
          // Convert empty string to undefined for subject_id
          subject_id: values.subject_id || undefined,
          // Extract just the values from prerequisites if using MultipleSelector format
          prerequisites: values.prerequisites?.map((p) => p.value) || [],
          created_by: auth.user.id,
        };

        const request = await apiRequest<typeof apiData, LearningOutcome>(
          "post",
          "/learning-outcomes",
          apiData,
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
          setSuccess("Learning outcome created successfully!");
          showToast({
            title: "Learning outcome created",
            description: `Created: ${request.data.title}`,
            type: "success",
          });

          if (!!setLearningOutcome) setLearningOutcome(request.data);
          form.reset(defaultValues);
        }
      } catch (err) {
        setError(`Unexpected error occurred [${err}]. Please try again.`);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Two Column Layout */}
        <div className="flex flex-row gap-6">
          {/* Left Column */}
          <div className="flex w-1/2 flex-col space-y-4">
            {/* Subject */}
            {!mainSubject && (
              <FormField
                name="subject_id"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject *</FormLabel>
                    {loadingOptions ? (
                      <div className="skeleton h-10 rounded-md" />
                    ) : (
                      <FormControl>
                        <SelectWithSearch
                          options={mainSubjects.map((subject) => ({
                            value: subject.id || subject._id || "",
                            label: `${subject.name} - ${subject.code}`,
                            disable: !subject.is_active,
                          }))}
                          value={field.value || ""}
                          onChange={field.onChange}
                          placeholder="Select subject"
                          disabled={isPending}
                        />
                      </FormControl>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Title */}
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter learning outcome title"
                      disabled={isPending}
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
                      placeholder="Detailed description of the learning outcome"
                      className="min-h-24 resize-none"
                      disabled={isPending}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value)}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Order and Hours */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                name="order"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="estimated_hours"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated Hours</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        numberMode="hours"
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Role */}
            {!mainSubject && (
              <FormField
                name="role"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Role *</FormLabel>
                    <FormControl>
                      <SelectWithSearch
                        options={SubjectTypes.map((type) => ({
                          value: type,
                          label: type,
                        }))}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select target role"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          {/* Right Column */}
          <div className="flex w-1/2 flex-col space-y-4">
            {/* Prerequisites */}
            <FormField
              name="prerequisites"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prerequisites</FormLabel>
                  {loadingOptions ? (
                    <div className="skeleton h-12 rounded-md" />
                  ) : (
                    <FormControl>
                      <MultipleSelector
                        value={field.value || []}
                        onChange={field.onChange}
                        defaultOptions={existingOutcomes.map((outcome) => ({
                          value: outcome.id || outcome._id || "",
                          label: `${outcome.title} (Order: ${outcome.order})`,
                        }))}
                        placeholder="Select prerequisite learning outcomes"
                        hidePlaceholderWhenSelected
                        disabled={isPending}
                      />
                    </FormControl>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Is Mandatory */}
            <FormField
              name="is_mandatory"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isPending}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Mandatory Outcome</FormLabel>
                    <FormDescription className="text-muted-foreground text-sm">
                      This learning outcome is required for completion
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Key Competencies Section */}
        <div className="space-y-6 border-t pt-6">
          <h3 className="text-lg font-medium">Key Competencies</h3>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              name="key_competencies.knowledge"
              control={form.control}
              render={({ field }) => (
                <FormItem className="h-fit">
                  <FormLabel>Knowledge *</FormLabel>
                  <FormControl>
                    <TagField
                      tags={field.value || []}
                      onChange={field.onChange}
                      placeholder="Add knowledge items"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="key_competencies.skills"
              control={form.control}
              render={({ field }) => (
                <FormItem className="h-fit">
                  <FormLabel>Skills *</FormLabel>
                  <FormControl>
                    <TagField
                      tags={field.value || []}
                      onChange={field.onChange}
                      placeholder="Add skills"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="key_competencies.attitudes"
              control={form.control}
              render={({ field }) => (
                <FormItem className="h-fit">
                  <FormLabel>Attitudes *</FormLabel>
                  <FormControl>
                    <TagField
                      tags={field.value || []}
                      onChange={field.onChange}
                      placeholder="Add attitudes"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="assessment_criteria"
              control={form.control}
              render={({ field }) => (
                <FormItem className="h-fit">
                  <FormLabel>Assessment Criteria</FormLabel>
                  <FormControl>
                    <TagField
                      tags={field.value || []}
                      label
                      onChange={field.onChange}
                      placeholder="Add assessment criteria"
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

        {isDialog ? (
          <DialogFooter className="flex items-center justify-end gap-4">
            <Button
              variant={"info"}
              type="submit"
              disabled={isPending}
              className="w-full sm:w-auto"
              library={"daisy"}
            >
              Create learning outcome{" "}
              {isPending && (
                <LoaderCircle
                  className="-ms-1 me-2 animate-spin"
                  size={12}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              )}
            </Button>
            <DialogClose asChild>
              <Button library="daisy" variant={"outline"}>
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        ) : (
          <Button
            variant={"info"}
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto"
            library={"daisy"}
          >
            Create learning outcome{" "}
            {isPending && (
              <LoaderCircle
                className="-ms-1 me-2 animate-spin"
                size={12}
                strokeWidth={2}
                aria-hidden="true"
              />
            )}
          </Button>
        )}
      </form>
    </Form>
  );
};

export default CreateLearningOutcomeForm;
