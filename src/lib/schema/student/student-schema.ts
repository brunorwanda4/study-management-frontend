import {
  AddressSchema,
  AgeSchema,
  LanguageSchema,
  LearningChallengeSchema,
  SpecialSupportSchema,
  StudyStyleSchema,
  SubjectCategorySchema,
} from "@/lib/schema/common-details-schema";
import { GuardianInfoSchema } from "@/lib/schema/parent/guardian-schema";
import z from "zod";

export const StudentAcademicInterestSchema = z.object({
  favorite_subjects_category: z
    .array(SubjectCategorySchema)
    .nonempty("Please select at least one subject category."),
  preferred_study_styles: z
    .array(StudyStyleSchema)
    .nonempty("Please select at least one study style."),
  languages_spoken: z
    .array(LanguageSchema)
    .nonempty("Please select at least one language."),
});

export type StudentAcademicInterest = z.infer<
  typeof StudentAcademicInterestSchema
>;

export const StudentBackgroundSchema = z.object({
  age: AgeSchema.optional(),
  address: AddressSchema.optional(),
});

export type StudentBackground = z.infer<typeof StudentBackgroundSchema>;

export const studentSupportSchema = z.object({
  learning_challenges: z.array(LearningChallengeSchema).optional(),
  special_support_needed: z.array(SpecialSupportSchema).optional(),
  guardian_info: z.array(GuardianInfoSchema).optional(),
});

export type studentSupport = z.infer<typeof studentSupportSchema>;
