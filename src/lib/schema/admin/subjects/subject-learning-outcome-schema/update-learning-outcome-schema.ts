import { SubjectTypeSchema } from "@/lib/schema/common-details-schema";
import { z } from "zod";

export const UpdateLearningOutcomeFormSchema = z.object({
  subject_id: z.string().optional(),
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().optional(),
  order: z.number().int().min(1, "Order must be at least 1").optional(),
  estimated_hours: z.number().int().min(0).default(0).optional(),
  key_competencies: z
    .object({
      knowledge: z.array(z.string().min(1, "Knowledge point cannot be empty")),
      skills: z.array(z.string().min(1, "Skill cannot be empty")),
      attitudes: z.array(z.string().min(1, "Attitude cannot be empty")),
    })
    .optional(),
  assessment_criteria: z
    .array(z.string().min(1, "Criteria cannot be empty"))
    .default([])
    .optional(),
  role: SubjectTypeSchema.optional(),
  prerequisites: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
        disable: z.boolean().optional(),
      }),
    )
    .optional(),
  is_mandatory: z.boolean().default(false).optional(),
});

export type UpdateLearningOutcomeFormData = z.infer<
  typeof UpdateLearningOutcomeFormSchema
>;
