import z from "zod";

export const CreateSubjectTopicSchema = z.object({
  learning_outcome_id: z.string(),
  parent_topic_id: z.string().optional().nullable(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional().nullable(),
  order: z.number().positive("Order must be greater than 0"),
});

export type CreateSubjectTopic = z.infer<typeof CreateSubjectTopicSchema>;
