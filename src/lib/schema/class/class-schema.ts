import { mainClassSchema } from "@/lib/schema/admin/main-classes-schema";
import { ClassTypeSchema } from "@/lib/schema/common-details-schema";
import { SchoolSchema } from "@/lib/schema/school/school-schema";
import { TeacherSchema } from "@/lib/schema/school/teacher-schema";
import { UserModelSchema } from "@/lib/schema/user/user-schema";
import { z } from "zod";

// 🧩 Enum: ClassType

// 🧩 Base Class Schema
export const ClassSchema = z.object({
  id: z.string().optional(), // ObjectId → string
  _id: z.string().optional(), // ObjectId → string
  name: z.string(),
  username: z.string(),
  code: z.string().optional(),
  image: z.string().optional(),

  school_id: z.string().optional(),
  creator_id: z.string().optional(),
  class_teacher_id: z.string().optional(),

  type: ClassTypeSchema.default("Private"),

  main_class_id: z.string().optional(),

  is_active: z.boolean(),

  description: z.string().nullable().optional(),
  capacity: z.number().int().optional(),
  subject: z.string().nullable().optional(),
  grade_level: z.string().nullable().optional(),

  tags: z.array(z.string()).default([]),

  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});
export type Class = z.infer<typeof ClassSchema>;

// 🧩 UpdateClass Schema (mirrors Rust UpdateClass)
export const UpdateClassSchema = z.object({
  name: z.string().optional(),
  username: z.string().optional(),
  code: z.union([z.string().nullable(), z.null()]).optional(),

  school_id: z.union([z.string().nullable(), z.null()]).optional(),
  class_teacher_id: z.union([z.string().nullable(), z.null()]).optional(),

  type: ClassTypeSchema.optional(),
  is_active: z.boolean().optional(),

  description: z.union([z.string().nullable(), z.null()]).optional(),
  capacity: z.number().int().optional(),
  subject: z.union([z.string().nullable(), z.null()]).optional(),
  grade_level: z.union([z.string().nullable(), z.null()]).optional(),
  tags: z.array(z.string()).optional(),
});
export type UpdateClass = z.infer<typeof UpdateClassSchema>;

// 🧩 ClassWithSchool Schema
export const ClassWithSchoolSchema = z.object({
  ...ClassSchema.shape,
  school: SchoolSchema.optional(), // Replace z.any() with your SchoolSchema if defined
});
export type ClassWithSchool = z.infer<typeof ClassWithSchoolSchema>;

// 🧩 ClassWithOthers Schema
export const ClassWithOthersSchema = z.object({
  ...ClassSchema.shape,
  school: SchoolSchema.optional(), // SchoolSchema if available
  creator: UserModelSchema.optional(), // UserSchema
  class_teacher: TeacherSchema.optional(), // TeacherSchema
  main_class: mainClassSchema.optional(), // MainClassSchema
});
export type ClassWithOthers = z.infer<typeof ClassWithOthersSchema>;

// 🧩 BulkClassesRequest Schema
export const BulkClassesRequestSchema = z.object({
  classes: z.array(ClassSchema),
});
export type BulkClassesRequest = z.infer<typeof BulkClassesRequestSchema>;

// 🧩 BulkClassesForSchoolRequest Schema
export const BulkClassesForSchoolRequestSchema = z.object({
  classes: z.array(ClassSchema),
  school_id: z.string(),
});
export type BulkClassesForSchoolRequest = z.infer<
  typeof BulkClassesForSchoolRequestSchema
>;

// 🧩 BulkUpdateItem Schema
export const BulkUpdateItemSchema = z.object({
  id: z.string(),
  update: UpdateClassSchema,
});
export type BulkUpdateItem = z.infer<typeof BulkUpdateItemSchema>;

// 🧩 BulkUpdateRequest Schema
export const BulkUpdateRequestSchema = z.object({
  updates: z.array(BulkUpdateItemSchema),
});
export type BulkUpdateRequest = z.infer<typeof BulkUpdateRequestSchema>;
