import { ClassSchema } from "@/lib/schema/class/class-schema";
import {
  AgeSchema,
  GenderSchema,
  StudentStatusSchema,
} from "@/lib/schema/common-details-schema";
import { SchoolSchema } from "@/lib/schema/school/school-schema";
import { UserModelSchema } from "@/lib/schema/user/user-schema";
import { z } from "zod";

// ---------------------------------------------
// Base Student Schema
// ---------------------------------------------
export const StudentSchema = z.object({
  id: z.string().optional(),
  _id: z.string().optional(),
  user_id: z.string().optional(),
  school_id: z.string().optional(),
  class_id: z.string().optional(),
  creator_id: z.string().optional(),

  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  gender: GenderSchema.optional(),
  date_of_birth: AgeSchema.optional(),

  registration_number: z.string().optional(),
  admission_year: z.number().int().optional(),

  status: StudentStatusSchema.default("Active"),
  is_active: z.boolean().default(false),
  tags: z.array(z.string()).default([]),

  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});

export type Student = z.infer<typeof StudentSchema>;

// ---------------------------------------------
// Update Student Schema
// ---------------------------------------------
export const UpdateStudentSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  gender: GenderSchema.optional(),
  date_of_birth: AgeSchema.optional(),
  registration_number: z.string().optional(),
  admission_year: z.number().int().optional(),
  status: StudentStatusSchema.optional(),
  is_active: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

export type UpdateStudent = z.infer<typeof UpdateStudentSchema>;

// ---------------------------------------------
// Student With Relations
// ---------------------------------------------
export const StudentWithRelationsSchema = z.object({
  ...StudentSchema.shape,
  user: UserModelSchema.optional(), // Replace with your actual User schema
  school: SchoolSchema.optional(), // Replace with your actual School schema
  class: ClassSchema.optional(), // Replace with your actual Class schema
});

export type StudentWithRelations = z.infer<typeof StudentWithRelationsSchema>;

// ---------------------------------------------
// Bulk Operations
// ---------------------------------------------
export const BulkStudentIdsSchema = z.object({
  ids: z.array(z.string()),
});

export const BulkUpdateStudentStatusSchema = z.object({
  ids: z.array(z.string()),
  status: StudentStatusSchema,
});

export const BulkStudentTagsSchema = z.object({
  ids: z.array(z.string()),
  tags: z.array(z.string()),
});

// ---------------------------------------------
// Prepare Requests
// ---------------------------------------------
export const PrepareStudentRequestSchema = z.object({
  students: z.array(StudentSchema),
  school_id: z.string().optional(),
  creator_id: z.string().optional(),
});

export const PrepareStudentsBulkRequestSchema = z.object({
  students: z.array(StudentSchema),
  school_id: z.string().optional(),
  class_id: z.string().optional(),
  creator_id: z.string().optional(),
});
