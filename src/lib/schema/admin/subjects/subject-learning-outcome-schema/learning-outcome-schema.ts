import { SubjectTypeSchema } from "@/lib/schema/admin/subjects/subject-category";
import { SubjectCompetencyBlockSchema } from "@/lib/schema/admin/subjects/subject-competency-block";
import { z } from "zod";

export const LearningOutcomeSchema = z
  .object({
    _id: z.string().optional(),
    id: z.string().optional(),
    subject_id: z.string().optional(),
    title: z.string(),
    description: z.string().optional(),
    order: z.number(),
    estimated_hours: z.number().optional(),
    key_competencies: SubjectCompetencyBlockSchema,
    assessment_criteria: z.array(z.string()),
    role: SubjectTypeSchema,
    prerequisites: z.array(z.string()).optional(),
    is_mandatory: z.boolean().optional(),
    created_by: z.string().optional(),
    created_at: z.date().or(z.string()).optional(),
    updated_at: z.date().or(z.string()).optional(),
  })
  .refine(
    (data) => {
      if (data._id && data.id && data._id !== data.id) {
        return false;
      }
      return true;
    },
    {
      message: "_id and id must match when both are present",
    },
  );

export type LearningOutcome = z.infer<typeof LearningOutcomeSchema>;
