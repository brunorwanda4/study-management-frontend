"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  AdvancedLevels,
  OLevelAssessment,
  OLevelSubjects,
  OptionalSubjects,
  PrimaryAssessment,
  PrimarySubjects,
  TevetLevels,
  TvetPrograms,
} from "@/lib/context/school.context";
import MultipleSelector from "@/components/ui/multiselect";

const formSchema = z.object({
  // Primary Education
  primarySubjectsOffered: z.array(z.string()).optional(), // Using array for multiple selections
  primaryAssessmentTypes: z.array(z.string()).optional(),
  primaryPassMark: z.number().optional(), // Could be a number input or a select with common values

  // Ordinary Level
  olevelCoreSubjects: z.array(z.string()).optional(),
  olevelOptionSubjects: z.array(z.string()).optional(),
  olevelExaminationTypes: z.array(z.string()).optional(),
  oLevelAssessment: z.array(z.string()).optional(),

  // Advanced Level
  alevelSubjectCombination: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
        disable: z.boolean().optional(),
      })
    )
    .optional(), // Assuming one combination can be selected
  // aleveSubjects
  // TVET
  tvetSpecialization: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
        disable: z.boolean().optional(),
      })
    )
    .optional(), // Assuming one specialization can be selected
  tvetCertificationLevel: z.array(z.string()).optional(), // Assuming one level can be selected
});

interface SchoolDto {
  curriculum: string[];
  educationLevel: string[];
}

interface props {
  school: SchoolDto;
}

export function SchoolAcademicForm({ school }: props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // Provide default values for all potential fields
    defaultValues: {
      primarySubjectsOffered: PrimarySubjects.map((subject) => subject.value),
      primaryAssessmentTypes: PrimaryAssessment.map(
        (assessment) => assessment.value
      ),
      primaryPassMark: undefined,
      olevelCoreSubjects: OLevelSubjects.map((subject) => subject.value),
      olevelOptionSubjects: OptionalSubjects.map((subject) => subject.value),
      olevelExaminationTypes: OLevelAssessment.map((subject) => subject.value),
      oLevelAssessment: PrimaryAssessment.map((assessment) => assessment.value),
      alevelSubjectCombination: [],
      tvetSpecialization: [],
      tvetCertificationLevel: [],
    },
  });

  // Use useMemo to check the presence of levels/curriculum for conditional rendering
  const hasPrimary = useMemo(
    () => school.educationLevel?.includes("Primary"),
    [school.educationLevel]
  );
  const hasOLevel = useMemo(
    () => school.educationLevel?.includes("OLevel"),
    [school.educationLevel]
  );
  const hasALevel = useMemo(
    () => school.educationLevel?.includes("ALevel"),
    [school.educationLevel]
  );
  const hasTVET = useMemo(
    () => school.curriculum?.includes("TVET"),
    [school.curriculum]
  );

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 basic-card shadow-sm"
      >
        <div className=" grid md:grid-cols-2 gap-4 grid-cols-1">
          {hasPrimary && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                Primary Education (P1 - P6)
              </h3>
              <FormField
                control={form.control}
                name="primarySubjectsOffered"
                render={({}) => (
                  <FormItem>
                    <FormLabel>Subjects Offered</FormLabel>
                    {PrimarySubjects.map((subject) => (
                      <FormField
                        key={subject.value}
                        control={form.control}
                        name="primarySubjectsOffered"
                        render={({ field: innerField }) => {
                          return (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={innerField.value?.includes(
                                    subject.value
                                  )}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? innerField.onChange([
                                          ...(innerField.value || []),
                                          subject.value,
                                        ])
                                      : innerField.onChange(
                                          innerField.value?.filter(
                                            (value) => value !== subject.value
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                {subject.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="primaryAssessmentTypes"
                render={({}) => (
                  <FormItem>
                    <FormLabel>Assessment Type</FormLabel>
                    {PrimaryAssessment.map((subject) => (
                      <FormField
                        key={subject.value}
                        control={form.control}
                        name="primarySubjectsOffered"
                        render={({ field: innerField }) => {
                          return (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={innerField.value?.includes(
                                    subject.value
                                  )}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? innerField.onChange([
                                          ...(innerField.value || []),
                                          subject.value,
                                        ])
                                      : innerField.onChange(
                                          innerField.value?.filter(
                                            (value) => value !== subject.value
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                {subject.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="primaryPassMark"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pass Mark (usually 50%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g., 50"
                        {...field}
                        onChange={(event) =>
                          field.onChange(+event.target.value)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Ordinary Level Section - Conditionally Rendered */}
          {hasOLevel && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                Ordinary Level (O-Level: S1 - S3)
              </h3>
              <FormField
                control={form.control}
                name="olevelCoreSubjects"
                render={({}) => (
                  <FormItem>
                    <FormLabel>Core Subjects</FormLabel>
                    {OLevelSubjects.map((subject) => (
                      <FormField
                        key={subject.value}
                        control={form.control}
                        name="primarySubjectsOffered"
                        render={({ field: innerField }) => {
                          return (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={innerField.value?.includes(
                                    subject.value
                                  )}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? innerField.onChange([
                                          ...(innerField.value || []),
                                          subject.value,
                                        ])
                                      : innerField.onChange(
                                          innerField.value?.filter(
                                            (value) => value !== subject.value
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                {subject.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="olevelOptionSubjects"
                render={({}) => (
                  <FormItem>
                    <FormLabel>Option Subjects</FormLabel>
                    {OptionalSubjects.map((subject) => (
                      <FormField
                        key={subject.value}
                        control={form.control}
                        name="primarySubjectsOffered"
                        render={({ field: innerField }) => {
                          return (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={innerField.value?.includes(
                                    subject.value
                                  )}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? innerField.onChange([
                                          ...(innerField.value || []),
                                          subject.value,
                                        ])
                                      : innerField.onChange(
                                          innerField.value?.filter(
                                            (value) => value !== subject.value
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                {subject.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="olevelExaminationTypes"
                render={({}) => (
                  <FormItem>
                    <FormLabel>Examinations</FormLabel>
                    {OLevelAssessment.map((subject) => (
                      <FormField
                        key={subject.value}
                        control={form.control}
                        name="primarySubjectsOffered"
                        render={({ field: innerField }) => {
                          return (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={innerField.value?.includes(
                                    subject.value
                                  )}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? innerField.onChange([
                                          ...(innerField.value || []),
                                          subject.value,
                                        ])
                                      : innerField.onChange(
                                          innerField.value?.filter(
                                            (value) => value !== subject.value
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                {subject.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Advanced Level Section - Conditionally Rendered */}
          {hasALevel && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                Advanced Level (A-Level: S4-S6)
              </h3>
              <FormField
                control={form.control}
                name="alevelSubjectCombination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject Combination</FormLabel>
                    <FormControl>
                      <MultipleSelector
                        value={field.value}
                        onChange={field.onChange}
                        defaultOptions={AdvancedLevels}
                        placeholder="e.g., MPC, PCB"
                        hidePlaceholderWhenSelected
                      />
                    </FormControl>
                    <FormDescription>
                      Search combination using username
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="primaryPassMark"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pass Mark (usually 50%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g., 50"
                        {...field}
                        onChange={(event) =>
                          field.onChange(+event.target.value)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="olevelOptionSubjects"
                render={({}) => (
                  <FormItem>
                    <FormLabel>Option Subjects</FormLabel>
                    {OptionalSubjects.map((subject) => (
                      <FormField
                        key={subject.value}
                        control={form.control}
                        name="primarySubjectsOffered"
                        render={({ field: innerField }) => {
                          return (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={innerField.value?.includes(
                                    subject.value
                                  )}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? innerField.onChange([
                                          ...(innerField.value || []),
                                          subject.value,
                                        ])
                                      : innerField.onChange(
                                          innerField.value?.filter(
                                            (value) => value !== subject.value
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                {subject.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* TVET Section - Conditionally Rendered */}
          {hasTVET && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                TVET (Technical and Vocational Education and Training)
              </h3>
              <FormField
                control={form.control}
                name="tvetSpecialization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specialization</FormLabel>
                    <FormControl>
                      <MultipleSelector
                        value={field.value}
                        onChange={field.onChange}
                        defaultOptions={TvetPrograms}
                        placeholder="e.g., SOFTWARE_DEVELOPMENT, NETWORKING_INTERNET_TECHNOLOGIES"
                        hidePlaceholderWhenSelected
                      />
                    </FormControl>
                    <FormDescription>
                      Search combination using username eg* SOFTWARE_DEVELOPMENT
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tvetCertificationLevel"
                render={({}) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Certification Level</FormLabel>
                    {TevetLevels.map((level) => (
                      <FormField
                        key={level.value}
                        control={form.control}
                        name="primarySubjectsOffered"
                        render={({ field: innerField }) => {
                          return (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={innerField.value?.includes(
                                    level.value
                                  )}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? innerField.onChange([
                                          ...(innerField.value || []),
                                          level.value,
                                        ])
                                      : innerField.onChange(
                                          innerField.value?.filter(
                                            (value) => value !== level.value
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                {level.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="olevelOptionSubjects"
                render={({}) => (
                  <FormItem>
                    <FormLabel>Option Subjects</FormLabel>
                    {OptionalSubjects.map((subject) => (
                      <FormField
                        key={subject.value}
                        control={form.control}
                        name="primarySubjectsOffered"
                        render={({ field: innerField }) => {
                          return (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={innerField.value?.includes(
                                    subject.value
                                  )}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? innerField.onChange([
                                          ...(innerField.value || []),
                                          subject.value,
                                        ])
                                      : innerField.onChange(
                                          innerField.value?.filter(
                                            (value) => value !== subject.value
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                {subject.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>

        {(hasPrimary || hasOLevel || hasALevel || hasTVET) && (
          <Button type="submit">Submit</Button>
        )}
      </form>
    </Form>
  );
}
