import { SubjectCategorySchema } from "@/lib/schema/admin/subjects/subject-category";
import { SubjectContributorSchema } from "@/lib/schema/admin/subjects/subject-competency-block";
import { z } from "zod";

export const MainSubjectSchema = z.object({
  id: z.string().optional(),
  _id: z.string().optional(),
  name: z.string(),
  code: z.string(),
  description: z.string().optional(),
  level: z.string().optional(),
  estimated_hours: z.number().int(),
  credits: z.number().int().optional(),
  category: SubjectCategorySchema,
  main_class_ids: z.array(z.string()).default([]),
  prerequisites: z.array(z.string()).optional(),
  contributors: z.array(SubjectContributorSchema),
  starting_year: z.date().optional(),
  ending_year: z.date().optional(),
  created_by: z.string().optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  is_active: z.boolean().default(true),
});
export const ContributorFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  user_id: z.string().optional(),
});

export type MainSubject = z.infer<typeof MainSubjectSchema>;

// Update Main Subject
export const UpdateMainSubjectSchema = z
  .object({
    name: z.string().optional(),
    code: z.string().optional(),
    description: z.string().optional(),
    level: z.string().optional(),
    estimated_hours: z.number().int().optional(),
    credits: z.number().int().optional(),
    category: SubjectCategorySchema.optional(),
    main_class_ids: z.array(z.string()).optional(),
    prerequisites: z.array(z.string()).optional(),
    contributors: z.array(SubjectContributorSchema).optional(),
    starting_year: z.date().optional(),
    ending_year: z.date().optional(),
    created_by: z.string().optional(),
    is_active: z.boolean().optional(),
  })
  .strict();

export type UpdateMainSubject = z.infer<typeof UpdateMainSubjectSchema>;

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
