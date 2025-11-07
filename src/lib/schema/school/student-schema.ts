import {
  AgeSchema,
  GenderSchema,
  StudentStatusSchema,
} from "@/lib/schema/common-details-schema";
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
  image: z.string().optional(),
  image_id: z.string().optional(),

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

export const StudentBaseSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().optional(),
  image: z.string().optional(),
  gender: GenderSchema.optional(),
  date_of_birth: AgeSchema.optional(),
  class_id: z.string().optional(),
  registration_number: z.string().optional(),
  admission_year: z.string().optional(),
  status: StudentStatusSchema.optional(),
  is_active: z.boolean().optional(),
  creator_id: z.string().optional(),
  tags: z.array(z.string()).optional(),
  school_id: z.string().optional(),
});

export type StudentBase = z.infer<typeof StudentBaseSchema>;

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
