// Assuming you are using react-hook-form with zod for validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label"; // Needed for RadioGroupItem labels


// Define your form schema using Zod
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

export function SchoolAcademicForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      primarySubjectsOffered: [],
      primaryAssessmentTypes: [],
      primaryPassMark: undefined,
      olevelCoreSubjects: [],
      olevelOptionSubjects: [],
      olevelExaminationTypes: [],
      alevelSubjectCombination: "",
      tvetSpecialization: "",
      tvetCertificationLevel: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Primary Education */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Primary Education (P1 - P6)</h3>
          <FormField
            control={form.control}
            name="primarySubjectsOffered"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subjects Offered</FormLabel>
                {['Math', 'Science', 'English', 'Social studies', 'ICT'].map(subject => (
                  <FormField
                    key={subject}
                    control={form.control}
                    name="primarySubjectsOffered"
                    render={({ field: innerField }) => {
                      return (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={innerField.value?.includes(subject)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? innerField.onChange([...(innerField.value || []), subject])
                                  : innerField.onChange(innerField.value?.filter(value => value !== subject));
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {subject}
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
                {['class tests', 'midterm exams', 'national in P6'].map(type => (
                  <FormField
                    key={type}
                    control={form.control}
                    name="primaryAssessmentTypes"
                    render={({ field: innerField }) => {
                      return (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={innerField.value?.includes(type)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? innerField.onChange([...(innerField.value || []), type])
                                  : innerField.onChange(innerField.value?.filter(value => value !== type));
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {type}
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
                  <Input type="number" placeholder="e.g., 50" {...field} onChange={event => field.onChange(+event.target.value)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Ordinary Level */}
        <div className="space-y-4">
           <h3 className="text-lg font-semibold">Ordinary Level (O-Level: S1 - S3)</h3>
           <FormField
            control={form.control}
            name="olevelCoreSubjects"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Core Subjects</FormLabel>
                 {['Math', 'Physics', 'Chemistry', 'Biology', 'English', 'etc.'].map(subject => (
                  <FormField
                    key={subject}
                    control={form.control}
                    name="olevelCoreSubjects"
                    render={({ field: innerField }) => {
                      return (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={innerField.value?.includes(subject)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? innerField.onChange([...(innerField.value || []), subject])
                                  : innerField.onChange(innerField.value?.filter(value => value !== subject));
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {subject}
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
                 {['computer science', 'Agriculture', 'Fine Arts', 'etc.'].map(subject => (
                  <FormField
                    key={subject}
                    control={form.control}
                    name="olevelOptionSubjects"
                    render={({ field: innerField }) => {
                      return (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={innerField.value?.includes(subject)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? innerField.onChange([...(innerField.value || []), subject])
                                  : innerField.onChange(innerField.value?.filter(value => value !== subject));
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {subject}
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
                 {['internal exams', 'national exams in S3'].map(type => (
                  <FormField
                    key={type}
                    control={form.control}
                    name="olevelExaminationTypes"
                    render={({ field: innerField }) => {
                      return (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={innerField.value?.includes(type)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? innerField.onChange([...(innerField.value || []), type])
                                  : innerField.onChange(innerField.value?.filter(value => value !== type));
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {type}
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

        {/* Advanced Level */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Advanced Level (A-Level: S4-S6)</h3>
           <FormField
            control={form.control}
            name="alevelSubjectCombination"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject Combination</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
           <p className="text-sm text-muted-foreground">Examination: national exams</p>
        </div>

        {/* TVET */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">TVET (Technical and Vocational Education and Training)</h3>
           <FormField
            control={form.control}
            name="tvetSpecialization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Specialization</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a specialization" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Software Development">Software Development</SelectItem>
                    <SelectItem value="Networking">Networking</SelectItem>
                    <SelectItem value="Multimedia">Multimedia</SelectItem>
                    <SelectItem value="Masonry">Masonry</SelectItem>
                    <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                    <SelectItem value="Automotive Mechanics">Automotive Mechanics</SelectItem>
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
                      <Label>Level 3 (Certificate of Vocation Training)</Label>
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}