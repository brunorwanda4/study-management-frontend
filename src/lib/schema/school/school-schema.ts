import {
  AffiliationTypes,
  AttendanceSystems,
  schoolMembers,
  schoolTypes,
} from "@/lib/const/common-details-const";
import {
  AddressSchema,
  ContactSchema,
  SocialMediaSchema,
} from "@/lib/schema/common-details-schema";
import { z } from "zod";

export const SchoolMemberSchema = z.enum(schoolMembers);
export const SchoolTypeEnum = z.enum(schoolTypes);
export const AttendanceSystemSchema = z.enum(AttendanceSystems);

export const AffiliationTypeSchema = z.enum(AffiliationTypes);

export const SchoolAcademicSchema = z.object({
  schoolId: z.string().min(1, { message: "School is required" }),
  // assessmentTypes: z.array(z.string()).optional(),
  // Primary Education
  primarySubjectsOffered: z.array(z.string()).optional(), // Using array for multiple selections
  primaryPassMark: z.number().optional(), // Could be a number input or a select with common values

  // Ordinary Level
  oLevelCoreSubjects: z.array(z.string()).optional(),
  oLevelOptionSubjects: z.array(z.string()).optional(),
  oLevelExaminationTypes: z.array(z.string()).optional(),
  oLevelAssessment: z.array(z.string()).optional(),

  // Advanced Level
  aLevelSubjectCombination: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
        disable: z.boolean().optional(),
      }),
    )
    .min(1, {
      message: "Advance level is required",
    })
    .max(6, {
      message: "Maximum Trading all 6",
    })
    .optional(), // Assuming one combination can be selected
  aLevelOptionSubjects: z.array(z.string()).optional(),
  aLevelPassMark: z.number().int().optional(),
  // TVET
  tvetSpecialization: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
        disable: z.boolean().optional(),
      }),
    )
    .min(1, {
      message: "TVET Trading is required,",
    })
    .max(6, {
      message: "Maximum Trading all 6",
    })
    .optional(), // Assuming one specialization can be selected
  tvetOptionSubjects: z.array(z.string()).optional(),
});

export type schoolAcademicDto = z.infer<typeof SchoolAcademicSchema>;

export const SchoolAcademicSchemaBackend = z.object({
  schoolId: z.string().min(1, { message: "School is required" }),
  // assessmentTypes: z.array(z.string()).optional(),
  // Primary Education
  primarySubjectsOffered: z.array(z.string()).optional(),
  primaryPassMark: z.number().optional(),

  // Ordinary Level
  oLevelCoreSubjects: z.array(z.string()).optional(),
  oLevelOptionSubjects: z.array(z.string()).optional(),
  oLevelExaminationTypes: z.array(z.string()).optional(),
  oLevelAssessment: z.array(z.string()).optional(),

  // Advanced Level
  aLevelSubjectCombination: z
    .array(z.string())
    .min(1, {
      message: "Advance level is required",
    })
    .max(6, {
      message: "Maximum Trading all 6",
    })
    .optional(), // Make optional as not all schools have AL
  aLevelOptionSubjects: z
    .array(z.string())
    .max(6, {
      message: "Maximum Trading all 6",
    })
    .optional(),
  aLevelPassMark: z.number().int().optional(),

  // TVET
  tvetSpecialization: z
    .array(z.string())
    .min(1, {
      message: "TVET Trading is required,",
    })
    .max(6, {
      message: "Maximum Trading all 6",
    })
    .optional(), // Make optional as not all schools have TVET
  tvetOptionSubjects: z.array(z.string()).optional(),
});

export type SchoolAcademicDtoBackend = z.infer<
  typeof SchoolAcademicSchemaBackend
>;

export const SchoolAcademicCreation = z.object({
  totalClasses: z.number(),
  totalModule: z.number(),
});

export type SchoolAcademicCreationDto = z.infer<typeof SchoolAcademicCreation>;

export const SchoolAdministrationSchema = z.object({
  schoolId: z.string().min(1),
  headmasterName: z
    .string()
    .min(2, { message: "Headmaster name is required." }),
  headmasterEmail: z.string().email({ message: "Invalid email address." }),
  headmasterPhone: z
    .string()
    .min(10, {
      message: "Minimum character are 10", // Corrected typo
    })
    .regex(/^\d+$/, "Phone number must contain only numbers"),

  DirectorOfStudies: z
    .string()
    .min(2, { message: "Director of Studies name is required." }),
  principalEmail: z.string().email({ message: "Invalid email address." }),
  principalPhone: z
    .string()
    .min(10, {
      message: "Minimum character are 10", // Corrected typo
    })
    .regex(/^\d+$/, "Phone number must contain only numbers"),

  numberOfTeachers: z.coerce
    .number()
    .int()
    .min(0, { message: "Number of teachers cannot be negative." }),

  additionalAdministration: z
    .array(
      z.object({
        role: z.string().min(1, { message: "Please select a role." }),
        name: z.string().min(2, { message: "Name is required." }),
        email: z.string().email({ message: "Invalid email address." }),
        phone: z
          .string()
          .min(10, {
            message: "Minimum character are 10", // Corrected typo
          })
          .regex(/^\d+$/, "Phone number must contain only numbers"),
      }),
    )
    .default([])
    .optional(),
});

// Define the DTO type based on the schema
export type SchoolAdministrationDto = z.infer<
  typeof SchoolAdministrationSchema
>;

export const sendAdministrationJoinRequestsSchema = z.object({
  attempted: z.number(),
  created: z.number(),
  message: z.string().min(1),
});

export type sendAdministrationJoinRequestsDto = z.infer<
  typeof sendAdministrationJoinRequestsSchema
>;

// 🏫 Main School Schema
export const SchoolSchema = z.object({
  id: z.string().optional(), // Mongo ObjectId as string
  creator_id: z.string().optional(),

  username: z.string(),
  logo: z.string().nullable().optional(),
  logo_id: z.string().nullable().optional(),
  name: z.string(),
  code: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  school_type: SchoolTypeEnum.optional(),

  curriculum: z.array(z.string()).optional(),
  education_level: z.array(z.string()).optional(),

  accreditation_number: z.string().optional(),
  affiliation: AffiliationTypeSchema.optional(),
  school_members: SchoolMemberSchema.optional(),

  address: AddressSchema.optional(),
  contact: ContactSchema.optional(),
  website: z.string().url().optional(),
  social_media: z.array(SocialMediaSchema).optional(),

  student_capacity: z.number().optional(),
  uniform_required: z.boolean().optional(),
  attendance_system: AttendanceSystemSchema.optional(),
  scholarship_available: z.boolean().optional(),

  classrooms: z.number().optional(),
  library: z.boolean().optional(),
  labs: z.array(z.string()).optional(),
  sports_extracurricular: z.array(z.string()).optional(),
  online_classes: z.boolean().optional(),

  database_name: z.string().optional(),
  is_active: z.boolean().optional(),

  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});

// 📊 Stats Schema
export const SchoolStatsSchema = z.object({
  total: z.number(),
  public: z.number(),
  private: z.number(),
  active: z.number(),
  inactive: z.number(),
  recent_30_days: z.number(),
});

// 🧩 Inferred Types
export type School = z.infer<typeof SchoolSchema>;
export type SchoolStats = z.infer<typeof SchoolStatsSchema>;
