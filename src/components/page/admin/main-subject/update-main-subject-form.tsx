"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Plus, Trash2 } from "lucide-react";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from "react";
import { useFieldArray, useForm, type Resolver } from "react-hook-form";

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
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import MultipleSelector from "@/components/ui/multiselect";
import {
  subjectAuths,
  SubjectCategories,
  SubjectLevels,
} from "@/lib/const/subject-const";
import { useToast } from "@/lib/context/toast/ToastContext";
import { MainClassModel } from "@/lib/schema/admin/main-classes-schema";
import { MainSubject } from "@/lib/schema/admin/subjects/main-subject-schema/main-subject-schema";
import {
  UpdateMainSubjectFormData,
  UpdateMainSubjectFormSchema,
} from "@/lib/schema/admin/subjects/main-subject-schema/update-main-subject-schema";
import { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { redirect } from "next/navigation";

interface Props {
  auth: AuthContext;
  subject: MainSubject;
  setSubject?: Dispatch<SetStateAction<MainSubject | undefined>>;
  onCancel?: () => void;
  isDialog?: boolean;
  mainClass?: MainClassModel;
  revalidate?: boolean;
}

const UpdateMainSubjectForm = ({
  auth,
  isDialog,
  subject,
  setSubject,
  onCancel,
  mainClass,
  revalidate,
}: Props) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  // Local state for main classes
  const [mainClasses, setMainClasses] = useState<MainClassModel[]>([]);
  const [mainSubjects, setMainSubjects] = useState<MainSubject[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  useEffect(() => {
    const fetchMainClasses = async () => {
      try {
        const [classes, subjects] = await Promise.all([
          apiRequest<void, MainClassModel[]>(
            "get",
            "/main-classes",
            undefined,
            { token: auth.token },
          ),
          apiRequest<void, MainSubject[]>("get", "/main-subjects", undefined, {
            token: auth.token,
          }),
        ]);

        if (classes.data) {
          setMainClasses(classes.data);
        }

        if (subjects.data) {
          setMainSubjects(subjects.data);
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

  // Transform subject data for form default values
  const getDefaultValues = (): UpdateMainSubjectFormData => {
    return {
      name: subject.name || "",
      code: subject.code || "",
      description: subject.description || "",
      level: subject.level || "Beginner",
      estimated_hours: subject.estimated_hours || 0,
      credits: subject.credits || 0,
      category: subject.category || "Science",
      main_class_ids:
        subject.main_class_ids?.map((id) => {
          const mainClass = mainClasses.find(
            (mc) => mc.id === id || mc._id === id || mc.trade_id === id,
          );
          return {
            value: id,
            label: mainClass?.name || `Class ${id}`,
            disable: mainClass?.disable || false,
          };
        }) || [],
      prerequisites:
        subject.prerequisites?.map((prereqId) => {
          const prereqSubject = mainSubjects.find(
            (ms) => ms.id === prereqId || ms._id === prereqId,
          );
          return {
            value: prereqId,
            label: prereqSubject
              ? `${prereqSubject.name} - ${prereqSubject.code}`
              : `Subject ${prereqId}`,
            disable: prereqSubject ? !prereqSubject.is_active : false,
          };
        }) || [],
      contributors:
        subject.contributors?.map((contributor) => ({
          name: contributor.name || "",
          role: contributor.role || "Reviewer",
        })) || [],
      starting_year: subject.starting_year
        ? new Date(subject.starting_year).toISOString().split("T")[0]
        : "",
      ending_year: subject.ending_year
        ? new Date(subject.ending_year).toISOString().split("T")[0]
        : "",
      is_active: subject.is_active ?? true,
    };
  };

  const form = useForm<UpdateMainSubjectFormData>({
    resolver: zodResolver(
      UpdateMainSubjectFormSchema,
    ) as Resolver<UpdateMainSubjectFormData>,
    defaultValues: getDefaultValues(),
    mode: "onChange",
  });

  // Reset form when subject changes
  useEffect(() => {
    if (subject) {
      form.reset(getDefaultValues());
    }
  }, [subject, mainClasses, mainSubjects]);

  // Field array for contributors
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "contributors",
  });

  const handleSubmit = (values: UpdateMainSubjectFormData) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        // Transform the data for API submission
        const apiData = {
          ...values,
          // Ensure numbers are properly formatted
          estimated_hours: Number(values.estimated_hours),
          credits: Number(values.credits),

          // Convert empty strings to undefined for dates
          starting_year: values.starting_year
            ? new Date(values.starting_year).toISOString()
            : undefined,
          ending_year: values.ending_year
            ? new Date(values.ending_year).toISOString()
            : undefined,

          // Only send array of IDs (values)
          main_class_ids: mainClass
            ? [mainClass.id || mainClass._id || ""]
            : (values.main_class_ids?.map((item) => item.value) ?? []),
          prerequisites: values.prerequisites?.map((item) => item.value) ?? [],

          updated_by: auth.user.id,
        };
        const request = await apiRequest<typeof apiData, MainSubject>(
          "put",
          `/main-subjects/${subject.id || subject._id}`,
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
          setSuccess("Main subject updated successfully!");
          showToast({
            title: "Subject updated",
            description: `Updated: ${request.data.name}`,
            type: "success",
          });
          if (revalidate)
            redirect(`/a/collections/main_subjects/${subject.code}`);
          if (!!setSubject) setSubject(request.data);
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
            {/* Name */}
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject Name *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter subject name"
                      disabled={isPending}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Code */}
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject Code *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g., MATH101, SCI201"
                      disabled={isPending}
                      className="uppercase"
                      value={field.value || ""}
                      onChange={(e) =>
                        field.onChange(e.target.value.toUpperCase())
                      }
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
                      placeholder="Subject description and overview"
                      className="min-h-24 resize-none"
                      disabled={isPending}
                      value={field.value || ""}
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

            {/* Level */}
            <FormField
              name="level"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Level</FormLabel>
                  <FormControl>
                    <SelectWithSearch
                      options={SubjectLevels.map((level) => ({
                        value: level,
                        label: level,
                      }))}
                      value={field.value || ""}
                      onChange={field.onChange}
                      placeholder="e.g., Beginner, Intermediate, Advanced"
                      disabled={isPending || loadingOptions}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Hours and Credits */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                name="estimated_hours"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated Hours *</FormLabel>
                    <FormControl>
                      <Input
                        numberMode="hours"
                        type="number"
                        min="1"
                        max="1000"
                        numberProps={{ defaultValue: 60 }}
                        value={field.value || 0}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="credits"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Credits</FormLabel>
                    <FormControl>
                      <Input
                        numberMode="percent"
                        type="number"
                        min="1"
                        max="1000"
                        value={field.value || 0}
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

          {/* Right Column */}
          <div className="flex w-1/2 flex-col space-y-4">
            {/* Category */}
            <FormField
              name="category"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category *</FormLabel>
                  <FormControl>
                    <SelectWithSearch
                      options={SubjectCategories.map((category) => ({
                        value: category,
                        label: category,
                      }))}
                      value={field.value || ""}
                      onChange={field.onChange}
                      placeholder={
                        loadingOptions ? "Loading sectors..." : "Select sector"
                      }
                      disabled={isPending || loadingOptions}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Main Class IDs - Multi-select */}
            <FormField
              name="main_class_ids"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Linked Main Classes</FormLabel>
                  {loadingOptions ? (
                    <div className="skeleton h-12 rounded-md" />
                  ) : (
                    <FormControl>
                      <MultipleSelector
                        value={field.value || []}
                        onChange={field.onChange}
                        defaultOptions={mainClasses.map((item) => ({
                          value: item.id || item._id || item.trade_id || "",
                          label: item.name,
                          disable: item.disable || false,
                        }))}
                        placeholder="e.g., Level 4 Software development"
                        hidePlaceholderWhenSelected
                      />
                    </FormControl>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Prerequisites - Multi-select */}
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
                        defaultOptions={mainSubjects.map((item) => ({
                          value: item.id || item._id || "",
                          label: `${item.name} - ${item.code}`,
                          disable: !item.is_active || false,
                        }))}
                        placeholder="Select prerequisite subjects"
                        hidePlaceholderWhenSelected
                      />
                    </FormControl>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Academic Year */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                name="starting_year"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Year</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="ending_year"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Year</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Is Active */}
            <FormField
              name="is_active"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value || false}
                      onCheckedChange={field.onChange}
                      disabled={isPending}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Active Subject</FormLabel>
                    <FormDescription className="text-muted-foreground text-sm">
                      This subject will be available for use in classes
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Contributors Section */}
        <div className="space-y-4 border-t pt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Contributors</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ name: "", role: "Reviewer" })}
              disabled={isPending}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Contributor
            </Button>
          </div>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-12 items-start gap-4 rounded-lg border p-4"
            >
              <FormField
                control={form.control}
                name={`contributors.${index}.name`}
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Contributor name"
                        disabled={isPending}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`contributors.${index}.role`}
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormLabel>Role *</FormLabel>
                    <FormControl>
                      <SelectWithSearch
                        options={subjectAuths.map((roles) => ({
                          value: roles,
                          label: roles,
                        }))}
                        value={field.value || ""}
                        onChange={field.onChange}
                        placeholder="e.g., Author, Reviewer"
                        disabled={isPending || loadingOptions}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-1 flex items-center justify-center pt-8">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
                  disabled={isPending}
                >
                  <Trash2 className="text-destructive h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          {fields.length === 0 && (
            <div className="text-muted-foreground rounded-lg border-2 border-dashed py-8 text-center">
              No contributors added yet. Click "Add Contributor" to add one.
            </div>
          )}
        </div>

        {/* Messages */}
        <FormError message={error} />
        <FormSuccess message={success} />

        {/* Action Buttons */}
        {isDialog ? (
          <DialogFooter className="flex justify-end">
            <DialogClose>
              <Button variant={"outline"} type="button" library="daisy">
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant={"primary"}
              type="submit"
              disabled={isPending}
              className="w-full sm:w-auto"
              library={"daisy"}
            >
              update main subject{" "}
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
          <div className="flex gap-3">
            <Button
              variant={"info"}
              type="submit"
              disabled={isPending}
              className="sm:w-auto"
              library={"daisy"}
            >
              Update main subject{" "}
              {isPending && (
                <LoaderCircle
                  className="-ms-1 me-2 animate-spin"
                  size={12}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              )}
            </Button>

            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isPending}
                className="sm:w-auto"
              >
                Cancel
              </Button>
            )}
          </div>
        )}
      </form>
    </Form>
  );
};

export default UpdateMainSubjectForm;
