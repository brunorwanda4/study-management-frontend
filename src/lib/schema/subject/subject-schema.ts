import { MainSubjectSchema } from "@/lib/schema/admin/subjects/main-subject-schema/main-subject-schema";
import { SubjectCategorySchema } from "@/lib/schema/admin/subjects/subject-category";
import { ClassSchema } from "@/lib/schema/class/class-schema";
import { TeacherSchema } from "@/lib/schema/school/teacher-schema";
import { z } from "zod";

// ------------ SUBJECT ------------

export const SubjectSchema = z.object({
  id: z.string().optional(), // ObjectId
  _id: z.string().optional(), // ObjectId
  name: z.string(),
  username: z.string(),

  class_id: z.string().optional().nullable(),
  creator_id: z.string().optional().nullable(),
  class_teacher_id: z.string().optional().nullable(),
  main_subject_id: z.string().optional().nullable(),

  subject_type: SubjectCategorySchema,
  description: z.string().optional().nullable(),
  code: z.string().optional().nullable(),
  is_active: z.boolean(),

  tags: z.array(z.string()).default([]),

  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});

export type Subject = z.infer<typeof SubjectSchema>;

// ------------ UPDATE SUBJECT ------------

export const UpdateSubjectSchema = z.object({
  name: z.string().optional().nullable(),
  username: z.string().optional().nullable(),

  class_id: z.union([z.string().nullable(), z.null()]).optional().nullable(),
  class_teacher_id: z
    .union([z.string().nullable(), z.null()])
    .optional()
    .nullable(),
  main_subject_id: z
    .union([z.string().nullable(), z.null()])
    .optional()
    .nullable(),

  subject_type: SubjectCategorySchema.optional().nullable(),

  description: z.union([z.string().nullable(), z.null()]).optional().nullable(),
  code: z.union([z.string().nullable(), z.null()]).optional().nullable(),

  is_active: z.boolean().optional(),
  tags: z.array(z.string()).optional().nullable(),
});

export type UpdateSubject = z.infer<typeof UpdateSubjectSchema>;

// ------------ RELATIONS ------------
// Replace z.any() with your own schemas for Class, User, and MainSubject

export const SubjectWithRelationsSchema = z.object({
  ...SubjectSchema.shape,
  class: ClassSchema.optional().nullable(),
  class_teacher: TeacherSchema.optional().nullable(),
  main_subject: MainSubjectSchema.optional().nullable(),
});

export type SubjectWithRelations = z.infer<typeof SubjectWithRelationsSchema>;

// ------------ BULK REQUESTS ------------

export const BulkSubjectsRequestSchema = z.object({
  subjects: z.array(SubjectSchema),
});
export type BulkSubjectsRequest = z.infer<typeof BulkSubjectsRequestSchema>;

export const BulkSubjectsForClassRequestSchema = z.object({
  subjects: z.array(SubjectSchema),
  class_id: z.string(),
});
export type BulkSubjectsForClassRequest = z.infer<
  typeof BulkSubjectsForClassRequestSchema
>;

export const BulkSubjectsForTeacherRequestSchema = z.object({
  subjects: z.array(SubjectSchema),
  teacher_id: z.string(),
});
export type BulkSubjectsForTeacherRequest = z.infer<
  typeof BulkSubjectsForTeacherRequestSchema
>;

export const BulkSubjectsForMainSubjectRequestSchema = z.object({
  subjects: z.array(SubjectSchema),
  main_subject_id: z.string(),
});
export type BulkSubjectsForMainSubjectRequest = z.infer<
  typeof BulkSubjectsForMainSubjectRequestSchema
>;

// ------------ BULK UPDATE ------------

export const BulkUpdateItemSchema = z.object({
  id: z.string(),
  update: UpdateSubjectSchema,
});
export type BulkUpdateItem = z.infer<typeof BulkUpdateItemSchema>;

export const BulkUpdateRequestSchema = z.object({
  updates: z.array(BulkUpdateItemSchema),
});
export type BulkUpdateRequest = z.infer<typeof BulkUpdateRequestSchema>;

// ------------ BULK IDS ------------

export const BulkIdsRequestSchema = z.object({
  ids: z.array(z.string()),
});
export type BulkIdsRequest = z.infer<typeof BulkIdsRequestSchema>;

// ------------ BULK CHECK IDENTIFIERS ------------

export const BulkCheckIdentifiersRequestSchema = z.object({
  usernames: z.array(z.string()),
  codes: z.array(z.string()),
});
export type BulkCheckIdentifiersRequest = z.infer<
  typeof BulkCheckIdentifiersRequestSchema
>;

export const BulkCheckIdentifiersResponseSchema = z.object({
  existing_usernames: z.array(z.string()),
  existing_codes: z.array(z.string()),
});
export type BulkCheckIdentifiersResponse = z.infer<
  typeof BulkCheckIdentifiersResponseSchema
>;

// ------------ BULK ACTIVE STATUS ------------

export const BulkUpdateActiveStatusRequestSchema = z.object({
  ids: z.array(z.string()),
  is_active: z.boolean(),
});
export type BulkUpdateActiveStatusRequest = z.infer<
  typeof BulkUpdateActiveStatusRequestSchema
>;

// ------------ BULK TAGS ------------

export const BulkTagsRequestSchema = z.object({
  ids: z.array(z.string()),
  tags: z.array(z.string()),
});
export type BulkTagsRequest = z.infer<typeof BulkTagsRequestSchema>;

// ------------ BULK UPDATE BY CLASS ------------

export const BulkUpdateByClassRequestSchema = z.object({
  class_id: z.string(),
  update: UpdateSubjectSchema,
});
export type BulkUpdateByClassRequest = z.infer<
  typeof BulkUpdateByClassRequestSchema
>;
