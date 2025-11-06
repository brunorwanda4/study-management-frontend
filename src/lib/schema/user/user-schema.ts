import {
  AddressSchema,
  AgeGroupSchema,
  AgeSchema,
  CertificationOrTrainingSchema,
  CommunicationMethodSchema,
  DailyAvailabilitySchema,
  DepartmentSchema,
  EducationLevelSchema,
  EmploymentTypeSchema,
  GenderSchema,
  ImageSchema,
  JobTitleSchema,
  LanguageSchema,
  LearningChallengeSchema,
  ProfessionalGoalSchema,
  SocialMediaSchema,
  SpecialSupportSchema,
  StudyStyleSchema,
  SubjectCategorySchema,
  TeachingStyleSchema,
  userRoleSchema,
} from "@/lib/schema/common-details-schema";
import { GuardianInfoSchema } from "@/lib/schema/parent/guardian-schema";
import z from "zod";

// =========================================================
// 🔹 UserModelSchema (Frontend Zod Validation)
// =========================================================
export const UserModelSchema = z.object({
  // 🔹 Identification & Authentication
  id: z.string().optional(),
  _id: z.string().optional(),
  name: z.string(),
  email: z.string().email(),
  username: z.string().optional(),
  password_hash: z.string().optional(),
  role: userRoleSchema.optional(),

  // 🔹 Profile & Media
  image_id: z.string().optional(),
  image: z.string().optional(),
  background_images: z.array(ImageSchema).optional(),
  bio: z.string().optional(),
  disable: z.boolean().optional(),

  // 🔹 Contact & Social
  phone: z.string().optional(),
  address: AddressSchema.optional(),
  social_media: z.array(SocialMediaSchema).optional(),
  preferred_communication_method: z.array(CommunicationMethodSchema).optional(),

  // 🔹 Personal Information
  gender: GenderSchema.optional(),
  age: AgeSchema.optional(),
  languages_spoken: z.array(LanguageSchema).optional(),
  hobbies_interests: z.array(z.string()).optional(),
  dream_career: z.string().optional(),
  special_skills: z.array(z.string()).optional(),
  health_or_learning_notes: z.string().optional(),

  // 🔹 Academic & School Relationships
  current_school_id: z.string().optional(),
  schools: z.array(z.string()).optional(),
  accessible_classes: z.array(z.string()).optional(),
  favorite_subjects_category: z.array(SubjectCategorySchema).optional(),
  preferred_study_styles: z.array(StudyStyleSchema).optional(),

  // 🔹 Guardian, Support & Learning Needs
  guardian_info: z.array(GuardianInfoSchema).optional(),
  special_support_needed: z.array(SpecialSupportSchema).optional(),
  learning_challenges: z.array(LearningChallengeSchema).optional(),

  // 🔹 Teaching & Employment Details
  teaching_level: z.array(z.string()).optional(),
  employment_type: EmploymentTypeSchema.optional(),
  teaching_start_date: z.string().optional(),
  years_of_experience: z.string().optional(),
  education_level: EducationLevelSchema.optional(),
  certifications_trainings: z.array(CertificationOrTrainingSchema).optional(),
  preferred_age_group: AgeGroupSchema.optional(),
  professional_goals: z.array(ProfessionalGoalSchema).optional(),

  // Default availability: Mon–Fri 9am–5pm (example)
  availability_schedule: z.array(DailyAvailabilitySchema).optional(),

  department: DepartmentSchema.optional(),
  job_title: JobTitleSchema.optional(),
  teaching_style: z.array(TeachingStyleSchema).optional(),

  // 🔹 Timestamps
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type UserModel = z.infer<typeof UserModelSchema>;

// Schema for user onboarding
export const UserOnboardingSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(30, { message: "Username cannot exceed 30 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores",
    }),

  role: userRoleSchema,

  gender: GenderSchema,

  image: z.string().optional().nullable(),

  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number cannot exceed 15 digits" })
    .regex(/^\+?\d+$/, {
      message: "Phone number must contain only digits and may start with '+'",
    }),
});

export type UserOnboarding = z.infer<typeof UserOnboardingSchema>;
