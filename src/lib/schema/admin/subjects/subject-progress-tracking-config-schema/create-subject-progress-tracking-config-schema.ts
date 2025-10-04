import { SubjectProgressTrackingConfigTypeSchema } from "@/lib/schema/admin/subjects/subject-category";
import { SubjectProgressThresholdsSchema } from "@/lib/schema/admin/subjects/subject-progress-tracking-config-schema/subject-progress-tracking-config-schema";
import { z } from "zod";

export const CreateSubjectProgressTrackingConfigSchema = z
  .object({
    reference_id: z.string().optional(),

    // All tracking flags are required for creation
    track_attendance: z.boolean(),
    track_assignments: z.boolean(),
    track_topic_coverage: z.boolean(),
    track_skill_acquisition: z.boolean(),

    // Thresholds are required for creation
    thresholds: SubjectProgressThresholdsSchema,

    role: SubjectProgressTrackingConfigTypeSchema,
  })
  .refine((data) => {
    // Additional business logic validation
    return true;
  });

export type CreateSubjectProgressTrackingConfig = z.infer<
  typeof CreateSubjectProgressTrackingConfigSchema
>;
