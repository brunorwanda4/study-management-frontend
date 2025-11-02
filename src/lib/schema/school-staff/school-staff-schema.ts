import {
  AddressSchema,
  CertificationOrTrainingSchema,
  DepartmentSchema,
  EducationLevelSchema,
  EmploymentTypeSchema,
  JobTitleSchema,
  LanguageSchema,
  YearsOfExperienceSchema,
} from "@/lib/schema/common-details-schema";
import z from "zod";

export const StaffDepartmentSchema = z.object({
  department: DepartmentSchema.optional(),
  job_title: JobTitleSchema.optional(),
  employment_type: EmploymentTypeSchema.optional(),
});

export type StaffDepartment = z.infer<typeof StaffDepartmentSchema>;

export const StaffBackgroundSchema = z.object({
  years_of_experience: YearsOfExperienceSchema.optional(),
  address: AddressSchema.optional(),
  education_level: EducationLevelSchema.optional(),
  certifications_trainings: z.array(CertificationOrTrainingSchema).optional(),
  languages_spoken: z.array(LanguageSchema).optional(),
});

export type StaffBackground = z.infer<typeof StaffBackgroundSchema>;
