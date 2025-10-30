import { SubjectCompetencyBlockSchema } from "@/lib/schema/admin/subjects/subject-competency-block";
import { SubjectTopicWithOthersSchema } from "@/lib/schema/admin/subjects/subject-topic-schema/subject-topic-schema";
import { SubjectTypeSchema } from "@/lib/schema/common-details-schema";
import { z } from "zod";

const LearningOutcomeBaseSchema = z.object({
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
});

export const LearningOutcomeSchema = LearningOutcomeBaseSchema.refine(
  (data) => !data._id || !data.id || data._id === data.id,
  { message: "_id and id must match when both are present" },
);

export type LearningOutcome = z.infer<typeof LearningOutcomeSchema>;

export const LearningOutcomeWithOthersSchema: z.ZodType<
  z.infer<typeof LearningOutcomeBaseSchema> & {
    topics?: z.infer<typeof SubjectTopicWithOthersSchema>[];
  }
> = z.lazy(() =>
  LearningOutcomeBaseSchema.extend({
    topics: z.array(SubjectTopicWithOthersSchema).optional(),
  }),
);

export type LearningOutcomeWithOthers = z.infer<
  typeof LearningOutcomeWithOthersSchema
>;
