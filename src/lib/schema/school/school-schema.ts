import {
  AddressSchema,
  AffiliationTypeSchema,
  AttendanceSystemSchema,
  ContactSchema,
  SchoolMemberSchema,
  SchoolTypeSchema,
  SocialMediaSchema,
} from "@/lib/schema/common-details-schema";
import { z } from "zod";


export const SchoolAcademicCreation = z.object({
  totalClasses: z.number(),
  totalModule: z.number(),
});

export type SchoolAcademicCreationDto = z.infer<typeof SchoolAcademicCreation>;

// 🏫 Main School Schema
export const SchoolSchema = z.object({
  id: z.string().optional(), // Mongo ObjectId as string
  _id: z.string().optional(), // Mongo ObjectId as string
  creator_id: z.string().optional(),

  username: z.string(),
  logo: z.string().nullable().optional(),
  logo_id: z.string().nullable().optional(),
  name: z.string(),
  code: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  school_type: SchoolTypeSchema.optional(),

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

export const schoolAcademicResponseSchema = z.object({
  created_classes: z.number(),
  created_subjects: z.number(),
  success: z.boolean(),
});

export type schoolAcademicResponse = z.infer<
  typeof schoolAcademicResponseSchema
>;
