import {
  SubjectAuthSchema,
  SubjectCategorySchema,
  SubjectLevelSchema,
} from "@/lib/schema/common-details-schema";
import { z } from "zod";

export const MainSubjectSchema = z.object({
  id: z.string().optional(),
  _id: z.string().optional(),
  name: z.string(),
  code: z.string(),
  description: z.string().optional(),
  level: SubjectLevelSchema.optional(),
  estimated_hours: z.number().int(),
  credits: z.number().int().optional(),
  category: SubjectCategorySchema,
  main_class_ids: z.array(z.string()).default([]),
  prerequisites: z.array(z.string()).optional(),
  contributors: z
    .array(
      z.object({
        name: z
          .string()
          .min(1, "Contributor name is required")
          .max(100, "Name must be less than 100 characters"),
        role: SubjectAuthSchema.optional(),
      }),
    )
    .default([]),
  starting_year: z.date().optional(),
  ending_year: z.date().optional(),
  created_by: z.string().optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  is_active: z.boolean().default(true),
});
export const ContributorFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: SubjectAuthSchema.optional(),
  user_id: z.string().optional(),
});

export type MainSubject = z.infer<typeof MainSubjectSchema>;

// Main Subject With Others (placeholder types for dependencies)
// Note: You'll need to define these based on your actual types
export const LearningOutcomeWithOthersSchema = z.any(); // Replace with actual schema
export const SubjectProgressTrackingConfigSchema = z.any(); // Replace with actual schema
export const SubjectGradingSchemeSchema = z.any(); // Replace with actual schema

export const MainSubjectWithOthersSchema = MainSubjectSchema.extend({
  learning_outcome: z
    .array(LearningOutcomeWithOthersSchema)
    .optional()
    .default([]),
  progress_tracking_config: SubjectProgressTrackingConfigSchema.optional(),
  grading_schemes: SubjectGradingSchemeSchema.optional(),
});

export type MainSubjectWithOthers = z.infer<typeof MainSubjectWithOthersSchema>;
