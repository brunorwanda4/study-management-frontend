import { SubjectProgressTrackingConfigTypeSchema } from "@/lib/schema/common-details-schema";
import { z } from "zod";

// Threshold Schemas
export const SubjectProgressThresholdsSchema = z
  .object({
    satisfactory: z.number().min(0).max(100),
    needs_improvement: z.number().min(0).max(100),
    at_risk: z.number().min(0).max(100),
  })
  .refine(
    (data) => {
      // Ensure thresholds are in descending order: satisfactory > needs_improvement > at_risk
      return (
        data.satisfactory > data.needs_improvement &&
        data.needs_improvement > data.at_risk
      );
    },
    {
      message:
        "Thresholds must be in descending order: satisfactory > needs_improvement > at_risk",
    },
  );
export type SubjectProgressThresholds = z.infer<
  typeof SubjectProgressThresholdsSchema
>;

export const SubjectProgressTrackingConfigSchema = z.object({
  id: z.string().optional(),
  _id: z.string().optional(),
  reference_id: z.string().optional(),
  track_attendance: z.boolean(),
  track_assignments: z.boolean(),
  track_topic_coverage: z.boolean(),
  track_skill_acquisition: z.boolean(),
  thresholds: SubjectProgressThresholdsSchema,
  role: SubjectProgressTrackingConfigTypeSchema,
  created_by: z.string().optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

export type SubjectProgressTrackingConfig = z.infer<
  typeof SubjectProgressTrackingConfigSchema
>;
