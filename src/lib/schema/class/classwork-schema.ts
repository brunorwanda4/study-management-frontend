import { ClassworkTypeSchema } from "@/lib/schema/common-details-schema";
import { z } from "zod";

export const ClassWorkSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  mention: z.array(z.string().min(1).max(120)),
  type: ClassworkTypeSchema,
  due_date: z.coerce.date().optional(),
  points: z.number().int().min(0).optional(),
  allow_close_submissions: z.boolean().optional(),
  topic_id: z.string().optional(),
});

export type ClassWork = z.infer<typeof ClassWorkSchema>;
