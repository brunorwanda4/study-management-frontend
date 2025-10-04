// update-subject-progress-tracking-config-schema.ts
import { z } from "zod";

export const UpdateSubjectProgressThresholdsSchema = z
  .object({
    satisfactory: z.number().min(0).max(100).optional(),
    needs_improvement: z.number().min(0).max(100).optional(),
    at_risk: z.number().min(0).max(100).optional(),
  })
  .refine(
    (data) => {
      // Only validate if all fields are provided
      if (
        data.satisfactory !== undefined &&
        data.needs_improvement !== undefined &&
        data.at_risk !== undefined
      ) {
        return (
          data.satisfactory > data.needs_improvement &&
          data.needs_improvement > data.at_risk
        );
      }
      return true;
    },
    {
      message:
        "Thresholds must be in descending order: satisfactory > needs_improvement > at_risk",
    },
  );

export const UpdateSubjectProgressTrackingConfigSchema = z
  .object({
    track_attendance: z.boolean().optional(),
    track_assignments: z.boolean().optional(),
    track_topic_coverage: z.boolean().optional(),
    track_skill_acquisition: z.boolean().optional(),
    thresholds: UpdateSubjectProgressThresholdsSchema.optional(),
  })
  .strict();

export type UpdateSubjectProgressThresholds = z.infer<
  typeof UpdateSubjectProgressThresholdsSchema
>;
export type UpdateSubjectProgressTrackingConfig = z.infer<
  typeof UpdateSubjectProgressTrackingConfigSchema
>;
