import {
  SubjectGradingTypeEnum,
  SubjectTypeSchema,
} from "@/lib/schema/admin/subjects/subject-category";
import { z } from "zod";

export const UpdateSubjectGradingSchemeSchema = z.object({
  scheme_type: SubjectGradingTypeEnum.optional(),
  grade_boundaries: z.record(z.string(), z.number()).optional(),
  assessment_weights: z.record(z.string(), z.number()).optional(),
  minimum_passing_grade: z.string().optional(),
  role: SubjectTypeSchema.optional(),
});

export type UpdateSubjectGradingScheme = z.infer<typeof SubjectTypeSchema>;
