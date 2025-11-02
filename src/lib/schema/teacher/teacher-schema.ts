import {
  AddressSchema,
  CertificationOrTrainingSchema,
  DailyAvailabilitySchema,
  EducationLevelSchema,
  EmploymentTypeSchema,
  LanguageSchema,
  ProfessionalGoalSchema,
  SubjectCategorySchema,
  TeachingStyleSchema,
  YearsOfExperienceSchema,
} from "@/lib/schema/common-details-schema";
import z from "zod";

export const TeacherPositionSchema = z.object({
  employment_type: EmploymentTypeSchema.optional(),
  favorite_subjects_category: z.array(SubjectCategorySchema).optional(),
  teaching_level: z.array(z.string()).optional(),
});

export type TeacherPosition = z.infer<typeof TeacherPositionSchema>;

export const teacherBackgroundSchema = z.object({
  years_of_experience: YearsOfExperienceSchema.optional(),
  address: AddressSchema.optional(),
  education_level: EducationLevelSchema.optional(),
  certifications_trainings: z.array(CertificationOrTrainingSchema).optional(),
  languages_spoken: z.array(LanguageSchema).optional(),
  teaching_style: z.array(TeachingStyleSchema).optional(),
});

export type teacherBackground = z.infer<typeof teacherBackgroundSchema>;

export const TeacherPreferencesSchema = z.object({
  professional_goals: z.array(ProfessionalGoalSchema).optional(),
  availability_schedule: z.array(DailyAvailabilitySchema).optional(),
});

export type TeacherPreferences = z.infer<typeof TeacherPreferencesSchema>;
