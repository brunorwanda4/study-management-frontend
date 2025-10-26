import {
  SubjectGradingTypeEnum,
  SubjectTypeSchema,
} from "@/lib/schema/admin/subjects/subject-category";
import { z } from "zod";

export const CreateSubjectGradingSchemeSchema = z.object({
  reference_id: z.string().optional(),
  scheme_type: SubjectGradingTypeEnum,
  grade_boundaries: z.record(z.string(), z.number()),
  assessment_weights: z.record(z.string(), z.number()),
  minimum_passing_grade: z.string(),
  role: SubjectTypeSchema,
});

export type CreateSubjectGradingScheme = z.infer<
  typeof CreateSubjectGradingSchemeSchema
>;
