import { z } from "zod";

// Base ObjectId schema (you might want to customize this based on your needs)
export const ObjectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

// DateTime schema (using string representation)
export const DateTimeSchema = z.string().datetime();

// SubjectTopic schema
export const SubjectTopicSchema = z.object({
  id: z.union([ObjectIdSchema, z.undefined()]).optional().catch(undefined),
  _id: z.union([ObjectIdSchema, z.undefined()]).optional().catch(undefined),
  learning_outcome_id: z
    .union([ObjectIdSchema, z.undefined()])
    .optional()
    .catch(undefined),
  parent_topic_id: z
    .union([ObjectIdSchema, z.undefined()])
    .optional()
    .catch(undefined),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional().catch(undefined),
  order: z.number(),
  created_by: z
    .union([ObjectIdSchema, z.undefined()])
    .optional()
    .catch(undefined),
  created_at: DateTimeSchema.optional().catch(undefined),
  updated_at: DateTimeSchema.optional().catch(undefined),
});

// UpdateSubjectTopic schema
export const UpdateSubjectTopicSchema = z.object({
  learning_outcome_id: z
    .union([ObjectIdSchema, z.undefined()])
    .optional()
    .catch(undefined),
  parent_topic_id: z
    .union([ObjectIdSchema, z.undefined()])
    .optional()
    .catch(undefined),
  title: z.string().min(1, "Title is required").optional().catch(undefined),
  description: z.string().optional().catch(undefined),
  order: z.number().optional().catch(undefined),
  created_by: z
    .union([ObjectIdSchema, z.undefined()])
    .optional()
    .catch(undefined),
  updated_at: DateTimeSchema.optional().catch(undefined),
});
