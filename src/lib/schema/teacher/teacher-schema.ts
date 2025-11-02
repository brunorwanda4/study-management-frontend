import { MIN_YEAR } from "@/lib/env";
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
} from "@/lib/schema/common-details-schema";
import { todayISO } from "@/lib/utils";
import z from "zod";

export const TeacherPositionSchema = z.object({
  employment_type: EmploymentTypeSchema.optional(),
  favorite_subjects_category: z.array(SubjectCategorySchema).optional(),
  teaching_level: z.array(z.string()).optional(),
});

export type TeacherPosition = z.infer<typeof TeacherPositionSchema>;

export const teacherBackgroundSchema = z.object({
  years_of_experience: z
    .string()
    .optional()
    .nullable()
    .refine(
      (val) => {
        if (!val) return true; // allow empty

        // If incoming is already date-only (YYYY-MM-DD) capture parts
        const dateOnlyMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(val);
        let year: number, month: number, day: number;

        if (dateOnlyMatch) {
          year = Number(dateOnlyMatch[1]);
          month = Number(dateOnlyMatch[2]);
          day = Number(dateOnlyMatch[3]);
        } else {
          // Otherwise try to parse any ISO-like timestamp (with time and/or offset)
          const parsed = new Date(val);
          if (Number.isNaN(parsed.getTime())) return false;
          // Use UTC components to avoid timezone/time-of-day issues
          year = parsed.getUTCFullYear();
          month = parsed.getUTCMonth() + 1;
          day = parsed.getUTCDate();
        }

        // Quick year bound check
        if (year < MIN_YEAR) return false;

        // Build a UTC date-only object for comparison (midnight UTC)
        const candidateUtc = new Date(
          Date.UTC(year, month - 1, day, 0, 0, 0, 0),
        );

        // Today (UTC) date-only
        const now = new Date();
        const todayUtc = new Date(
          Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate(),
            0,
            0,
            0,
            0,
          ),
        );

        // Candidate must not be in the future (compare date-only)
        if (candidateUtc > todayUtc) return false;

        return true;
      },
      { message: `Date must be between ${MIN_YEAR}-01-01 and ${todayISO}` },
    ),
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
