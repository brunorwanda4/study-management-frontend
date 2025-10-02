import { SubjectCompetencyBlockSchema } from "@/lib/schema/admin/subjects/subject-competency-block";
import z from "zod";
export const UpdateLearningOutcomeSchema = z
  .object({
    subject_id: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    order: z.number().optional(),
    estimated_hours: z.number().optional(),
    key_competencies: SubjectCompetencyBlockSchema.optional(),
    assessment_criteria: z.array(z.string()).optional(),
    role: z.enum(["STUDENT", "TEACHER", "BOTH"]).optional(), // Replace with actual SubjectTypeFor values
    prerequisites: z.array(z.string()).optional(),
    is_mandatory: z.boolean().optional(),
  })
  .strict(); // strict() ensures no extra fields are allowed

export type UpdateLearningOutcome = z.infer<typeof UpdateLearningOutcomeSchema>;
