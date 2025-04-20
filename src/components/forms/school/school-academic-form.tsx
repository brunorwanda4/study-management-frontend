"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMemo } from "react"; // Import useMemo for optimizing checks

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label"; // Needed for RadioGroupItem labels
import { OLevelAssessment, OLevelSubjects, OptionalSubjects, PrimaryAssessment, PrimarySubjects } from "@/lib/context/school.context";
// Assuming SchoolDto is defined elsewhere and imported correctly
// import { SchoolDto } from "@/lib/schema/school.dto";

// Define your form schema using Zod
// Keep all possible fields in the schema
const formSchema = z.object({
  // Primary Education
  primarySubjectsOffered: z.array(z.string()).optional(), // Using array for multiple selections
  primaryAssessmentTypes: z.array(z.string()).optional(),
  primaryPassMark: z.number().optional(), // Could be a number input or a select with common values

  // Ordinary Level
  olevelCoreSubjects: z.array(z.string()).optional(),
  olevelOptionSubjects: z.array(z.string()).optional(),
  olevelExaminationTypes: z.array(z.string()).optional(),

  // Advanced Level
  alevelSubjectCombination: z.string().optional(), // Assuming one combination can be selected

  // TVET
  tvetSpecialization: z.string().optional(), // Assuming one specialization can be selected
  tvetCertificationLevel: z.string().optional(), // Assuming one level can be selected
});

// Define a placeholder for SchoolDto if you don't have the actual import
// Replace this with your actual SchoolDto import
interface SchoolDto {
  curriculum: string[]; // e.g., ["REB", "TVET"]
  educationLevel: string[]; // e.g., ["Primary", "OLevel", "ALevel"]
  // Add other properties of SchoolDto here if needed
}

interface props {
  school: SchoolDto;
}

export function SchoolAcademicForm({ school }: props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // Provide default values for all potential fields
    defaultValues: {
      primarySubjectsOffered: PrimarySubjects.map(subject => subject.value),
      primaryAssessmentTypes: PrimaryAssessment.map(assessment => assessment.value),
      primaryPassMark: undefined,
      olevelCoreSubjects: OLevelSubjects.map(subject => subject.value),
      olevelOptionSubjects: OptionalSubjects.map(subject => subject.value),
      olevelExaminationTypes: OLevelAssessment.map(subject => subject.value),
      alevelSubjectCombination: "",
      tvetSpecialization: "",
      tvetCertificationLevel: "",
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
                render={({ field }) => (
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
                                  checked={innerField.value?.includes(subject.value)}
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
                render={({ field }) => (
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
                                  checked={innerField.value?.includes(subject.value)}
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
                render={({ field }) => (
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
                                  checked={innerField.value?.includes(subject.value)}
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
                render={({ field }) => (
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
                                  checked={innerField.value?.includes(subject.value)}
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
                render={({ field }) => (
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
                                  checked={innerField.value?.includes(subject.value)}
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a combination" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="MPC">MPC</SelectItem>
                        <SelectItem value="PCB">PCB</SelectItem>
                        <SelectItem value="MCB">MCB</SelectItem>
                        {/* Add more combinations as needed */}
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Assuming examination is always national exams, maybe just a note or not a form field */}
              <p className="text-sm text-muted-foreground">
                Examination: national exams
              </p>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a specialization" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Software Development">
                          Software Development
                        </SelectItem>
                        <SelectItem value="Networking">Networking</SelectItem>
                        <SelectItem value="Multimedia">Multimedia</SelectItem>
                        <SelectItem value="Masonry">Masonry</SelectItem>
                        <SelectItem value="Electrical Engineering">
                          Electrical Engineering
                        </SelectItem>
                        <SelectItem value="Automotive Mechanics">
                          Automotive Mechanics
                        </SelectItem>
                        {/* Add more specializations as needed */}
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tvetCertificationLevel"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Certification Level</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Level 3 (Certificate of Vocation Training)" />
                          </FormControl>
                          <Label>
                            Level 3 (Certificate of Vocation Training)
                          </Label>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Level 4 (Advance Certificate)" />
                          </FormControl>
                          <Label>Level 4 (Advance Certificate)</Label>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Level 5 (Diploma)" />
                          </FormControl>
                          <Label>Level 5 (Diploma)</Label>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
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
