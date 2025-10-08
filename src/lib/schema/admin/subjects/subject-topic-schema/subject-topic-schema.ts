import { SubjectLearningMaterialSchema } from "@/lib/schema/admin/subjects/subject-learning-material-schema/subject-learning-metarial-schema";
import { z } from "zod";

export const SubjectTopicSchema = z.object({
  id: z.string().optional(),
  _id: z.string().optional(),
  learning_outcome_id: z.string().optional(),
  parent_topic_id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  order: z.number(),
  created_by: z.string().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

export type SubjectTopic = z.infer<typeof SubjectTopicSchema>;

export const SubjectTopicWithOthersSchema: z.ZodType<
  SubjectTopic & {
    sub_topics?: z.infer<typeof SubjectTopicWithOthersSchema>[];
    learning_materials?: z.infer<typeof SubjectLearningMaterialSchema>[];
  }
> = z.lazy(() =>
  SubjectTopicSchema.extend({
    sub_topics: z.array(SubjectTopicWithOthersSchema).optional(),
    learning_materials: z.array(SubjectLearningMaterialSchema).optional(),
  }),
);

export type SubjectTopicWithOthers = z.infer<
  typeof SubjectTopicWithOthersSchema
>;
