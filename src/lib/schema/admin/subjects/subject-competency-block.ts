import { z } from "zod";

export const SubjectContributorSchema = z.object({
  name: z.string(),
  role: z.string(),
  user_id: z.string().optional(),
});

export type SubjectContributor = z.infer<typeof SubjectContributorSchema>;
