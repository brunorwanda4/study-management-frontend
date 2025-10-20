import { SchoolStaffTypeSchema } from "@/lib/schema/common-details-schema";
import { z } from "zod";

// Core Schema
export const SchoolStaffSchema = z.object({
  id: z.string().optional().nullable(), // ObjectId
  user_id: z.string().optional().nullable(),
  school_id: z.string().optional().nullable(),
  creator_id: z.string().optional().nullable(),

  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email" }),

  type: SchoolStaffTypeSchema.default("Director"),

  is_active: z.boolean().default(false),
  tags: z.array(z.string()).default([]),

  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});

// Update Schema
export const UpdateSchoolStaffSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  type: SchoolStaffTypeSchema.optional(),
  is_active: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

// With Relations (user & school optional)
export const SchoolStaffWithRelationsSchema = z.object({
  staff: SchoolStaffSchema,
  user: z.any().optional(), // You can replace with actual UserSchema
  school: z.any().optional(), // You can replace with actual SchoolSchema
});

// Bulk actions
export const BulkIdsRequestSchema = z.object({
  ids: z.array(z.string().min(1, { message: "Invalid ID" })),
});

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
