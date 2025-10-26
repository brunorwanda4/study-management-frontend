import { SchoolStaffTypeSchema } from "@/lib/schema/common-details-schema";
import { SchoolSchema } from "@/lib/schema/school/school-schema";
import { UserModelSchema } from "@/lib/schema/user/user-schema";
import { z } from "zod";

// Core Schema
export const SchoolStaffSchema = z.object({
  id: z.string().optional(), // ObjectId
  _id: z.string().optional(), // ObjectId
  user_id: z.string().optional(),
  school_id: z.string().optional(),
  creator_id: z.string().optional(),
  image: z.string().optional(),

  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email" }),

  type: SchoolStaffTypeSchema.default("Director"),

  is_active: z.boolean().default(false),
  tags: z.array(z.string()).default([]),

  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});

export type SchoolStaff = z.infer<typeof SchoolStaffSchema>;

// Update Schema
export const UpdateSchoolStaffSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  image: z.string().optional(),
  type: SchoolStaffTypeSchema.optional(),
  is_active: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});
export type UpdateSchoolStaff = z.infer<typeof UpdateSchoolStaffSchema>;

// With Relations (user & school optional)
export const SchoolStaffWithRelationsSchema = z.object({
  ...SchoolStaffSchema.shape,
  user: UserModelSchema.optional(), // You can replace with actual UserSchema
  school: SchoolSchema.optional(), // You can replace with actual SchoolSchema
});

export type SchoolStaffWithRelations = z.infer<
  typeof SchoolStaffWithRelationsSchema
>;

// Bulk actions
export const BulkIdsRequestSchema = z.object({
  ids: z.array(z.string().min(1, { message: "Invalid ID" })),
});

export type BulkIdsRequestSchema = z.infer<typeof BulkIdsRequestSchema>;

export const BulkUpdateActiveStatusRequestSchema = z.object({
  ids: z.array(z.string().min(1, { message: "Invalid ID" })),
  is_active: z.boolean(),
});

export const BulkTagsRequestSchema = z.object({
  ids: z.array(z.string().min(1, { message: "Invalid ID" })),
  tags: z.array(z.string()),
});

// Prepare Staff Request
export const PrepareStaffRequestSchema = z.object({
  staff_members: z.array(SchoolStaffSchema),
  school_id: z.string().optional().nullable(),
  creator_id: z.string().optional().nullable(),
});
