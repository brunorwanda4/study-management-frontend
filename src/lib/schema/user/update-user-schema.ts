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
  userRoleSchema,
} from "@/lib/schema/common-details-schema";
import { GuardianInfoSchema } from "@/lib/schema/parent/guardian-schema";
import z from "zod";

// =========================================================
// 🔹 UpdateUserSchema (Frontend form validation / PATCH)
// =========================================================
export const UpdateUserSchema = z.object({
  // 🔹 Basic Info
  name: z.string().optional(),
  email: z.string().email().optional(),
  username: z.string().optional(),
  password_hash: z.string().optional(),
  role: userRoleSchema.optional(),

  // 🔹 Profile Image
  image_id: z.string().optional(),
  image: z.string().optional(),
  background_images: z.array(ImageSchema).optional(),

  // 🔹 Contact
  phone: z.string().optional(),

  // 🔹 Personal Details
  gender: GenderSchema.optional(),
  age: AgeSchema.optional(),

  // 🔹 Location & Social
  address: AddressSchema.optional(),
  social_media: z.array(SocialMediaSchema).optional(),

  // 🔹 School Relationships
  current_school_id: z.string().optional(),
  schools: z.array(z.string()).optional(),
  accessible_classes: z.array(z.string()).optional(),

  // 🔹 Profile
  bio: z.string().optional(),
  disable: z.boolean().optional(),

  // 🔹 Academic Interests
  favorite_subjects_category: z.array(SubjectCategorySchema).optional(),
  preferred_study_styles: z.array(StudyStyleSchema).optional(),
  languages_spoken: z.array(LanguageSchema).optional(),
  hobbies_interests: z.array(z.string()).optional(),
  dream_career: z.string().optional(),
  special_skills: z.array(z.string()).optional(),
  health_or_learning_notes: z.string().optional(),

  // 🔹 Communication Preferences
  preferred_communication_method: z.array(CommunicationMethodSchema).optional(),

  // 🔹 Guardian & Support Info
  guardian_info: z.array(GuardianInfoSchema).optional(),
  special_support_needed: z.array(SpecialSupportSchema).optional(),
  learning_challenges: z.array(LearningChallengeSchema).optional(),

  // 🔹 Teaching-related Info
  teaching_level: z.array(z.string()).optional(),
  employment_type: EmploymentTypeSchema.optional(),
  teaching_start_date: z.string().optional(), // DateTime<Utc> as string
  years_of_experience: z.string().optional(), // DateTime<Utc> as string
  education_level: EducationLevelSchema.optional(),
  certifications_trainings: z.array(CertificationOrTrainingSchema).optional(),
  preferred_age_group: AgeGroupSchema.optional(),
  professional_goals: z.array(ProfessionalGoalSchema).optional(),
  availability_schedule: z.array(DailyAvailabilitySchema).optional(),
  department: DepartmentSchema.optional(),
  job_title: JobTitleSchema.optional(),
  teaching_style: z.array(StudyStyleSchema).optional(),

  // 🔹 Timestamp
  updated_at: z.string().optional(),
});

export type UpdateUser = z.infer<typeof UpdateUserSchema>;

export const OnboardingSchema = z.object({
  image: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val || (val.startsWith("data:image/") && val.length < 2 * 1024 * 1024),
      {
        message: "Invalid image format or image too large (max 2MB)",
      },
    ),
  age: z
    .object({
      year: z
        .number()
        .min(1900, "Year must be valid")
        .max(new Date().getFullYear(), "Year cannot be in the future"),
      month: z
        .number()
        .min(1, "Month must be between 1 and 12")
        .max(12, "Month must be between 1 and 12"),
      day: z.number().min(1, "Day must be valid").max(31, "Day must be valid"),
    })
    .refine(
      (data) => {
        const { year, month, day } = data;
        const birthDate = new Date(year, month - 1, day);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
          age--;
        }

        return age >= 2 && age <= 100;
      },
      {
        message: "Age must be between 3 and 95 years old.",
      },
    ),
  phone: z
    .string()
    .min(10, {
      message: "Minium character are 10",
    })
    .regex(/^\d+$/, "Phone number must contain only numbers")
    .optional(),
  role: z.enum(["STUDENT", "TEACHER", "ADMIN", "SCHOOLSTAFF"], {
    message: "Role must be one of 'STUDENT', 'TEACHER', or 'SCHOOL STAFF'",
  }),
  gender: GenderSchema,
  address: AddressSchema,
  bio: z.string().optional(),
});

export type onboardingDto = z.infer<typeof OnboardingSchema>;
