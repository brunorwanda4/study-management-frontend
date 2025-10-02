import { SubjectTypeSchema } from "@/lib/schema/admin/subjects/subject-category";
import { z } from "zod";

export const CreateLearningOutcomeFormSchema = z.object({
  subject_id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  order: z.number().int().min(1, "Order must be at least 1"),
  estimated_hours: z.number().int().min(0).default(0),
  key_competencies: z.object({
    knowledge: z.array(z.string().min(1, "Knowledge point cannot be empty")),
    skills: z.array(z.string().min(1, "Skill cannot be empty")),
    attitudes: z.array(z.string().min(1, "Attitude cannot be empty")),
  }),
  assessment_criteria: z
    .array(z.string().min(1, "Criteria cannot be empty"))
    .default([]),
  role: SubjectTypeSchema,
  prerequisites: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
        disable: z.boolean().optional(),
      }),
    )
    .optional(),
  is_mandatory: z.boolean().default(false),
});

export type CreateLearningOutcomeFormData = z.infer<
  typeof CreateLearningOutcomeFormSchema
>;
