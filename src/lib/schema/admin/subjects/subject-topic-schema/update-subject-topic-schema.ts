import z from "zod";
export const UpdateSubjectTopicSchema = z.object({
  learning_outcome_id: z.string().optional().nullable(),
  parent_topic_id: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  order: z.number().optional().nullable(),
});

export type UpdateSubjectTopic = z.infer<typeof UpdateSubjectTopicSchema>;
