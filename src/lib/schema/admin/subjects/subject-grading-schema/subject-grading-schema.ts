import {
  SubjectGradingTypeEnum,
  SubjectTypeSchema,
} from "@/lib/schema/common-details-schema";
import { z } from "zod";

// --- DefaultLetterGrade ---
export const DefaultLetterGradeSchema = z.object({
  reference_id: z.union([z.string().optional(), z.string()]),
  role: SubjectTypeSchema,
  created_by: z.string().optional(),
});

export type DefaultLetterGrade = z.infer<typeof DefaultLetterGradeSchema>;

// --- Main Schema: SubjectGradingScheme ---
export const SubjectGradingSchemeSchema = z.object({
  id: z.string().optional(),
  _id: z.string().optional(),
  reference_id: z.string().optional(),
  scheme_type: SubjectGradingTypeEnum,
  grade_boundaries: z.record(z.string(), z.number()),
  assessment_weights: z.record(z.string(), z.number()),
  minimum_passing_grade: z.string(),
  role: SubjectTypeSchema,
  created_by: z.string().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

export type SubjectGrading = z.infer<typeof SubjectGradingSchemeSchema>;
