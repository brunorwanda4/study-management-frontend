import { ClassSchema } from "@/lib/schema/class/class-schema";
import {
  GenderSchema,
  TeacherTypeSchema,
} from "@/lib/schema/common-details-schema";
import { SchoolSchema } from "@/lib/schema/school/school-schema";
// import { SubjectSchema } from "@/lib/schema/subject/subject-schema";
import { UserModelSchema } from "@/lib/schema/user/user-schema";
import { z } from "zod";

// Core Schema
export const TeacherSchema = z.object({
  id: z.string().optional(),
  _id: z.string().optional(),
  user_id: z.string().optional(),
  school_id: z.string().optional(),
  creator_id: z.string().optional(),

  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().optional().nullable(),
  image: z.string().optional(),
  gender: GenderSchema.optional().nullable(),

  type: TeacherTypeSchema.default("Regular"),

  class_ids: z.array(z.string()).optional().nullable(),
  subject_ids: z.array(z.string()).optional().nullable(),

  is_active: z.boolean().default(false),
  tags: z.array(z.string()).default([]),

  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});

export type Teacher = z.infer<typeof TeacherSchema>;

export const TeacherBaseSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().optional(),
  image: z.string().optional(),
  gender: GenderSchema.optional(),
  type: TeacherTypeSchema.optional(),
  class_ids: z.array(z.string()).optional(),
  subject_ids: z.array(z.string()).optional(),
  is_active: z.boolean(),
  tags: z.array(z.string()),
  school_id: z.string().optional(),
  creator_id: z.string().optional(),
});

export type TeacherBase = z.infer<typeof TeacherBaseSchema>;

// Update Schema
export const UpdateTeacherSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  image: z.string().optional(),
  gender: GenderSchema.optional(),
  type: TeacherTypeSchema.optional(),
  class_ids: z.array(z.string()).optional(),
  subject_ids: z.array(z.string()).optional(),
  is_active: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

export type UpdateTeacher = z.infer<typeof UpdateTeacherSchema>;
// With Relations
export const TeacherWithRelationsSchema = z.object({
  ...TeacherSchema.shape,
  user: UserModelSchema.optional(), // Replace with actual UserSchema when available
  school: SchoolSchema.optional(), // Replace with SchoolSchema
  classes: z.array(ClassSchema).optional(), // Replace with ClassSchema
  // subjects: z.array(SubjectSchema).optional(), // Replace with SubjectSchema
});

export type TeacherWithRelations = z.infer<typeof TeacherWithRelationsSchema>;
// Bulk operations
export const BulkTeacherIdsSchema = z.object({
  ids: z.array(z.string()),
});
export type BulkTeacherIds = z.infer<typeof BulkTeacherIdsSchema>;

export const BulkUpdateTeacherActiveSchema = z.object({
  ids: z.array(z.string()),
  is_active: z.boolean(),
});

export const BulkTeacherTagsSchema = z.object({
  ids: z.array(z.string()),
  tags: z.array(z.string()),
});

export type BulkTeacherTags = z.infer<typeof BulkTeacherTagsSchema>;

// Prepare Teacher Request
export const PrepareTeacherRequestSchema = z.object({
  teachers: z.array(TeacherSchema),
  school_id: z.string().optional().nullable(),
  creator_id: z.string().optional().nullable(),
});

export type PrepareTeacherRequest = z.infer<typeof PrepareTeacherRequestSchema>;

export const PaginatedTeacherSchema = z.object({
  teachers: z.array(TeacherSchema),
  total: z.number().int(),
  total_pages: z.number().int(),
  current_page: z.number().int(),
});

export type PaginatedTeacher = z.infer<typeof PaginatedTeacherSchema>;
