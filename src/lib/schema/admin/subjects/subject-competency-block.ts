import { z } from "zod";

export const SubjectContributorSchema = z.object({
  name: z.string(),
  role: z.string(),
  user_id: z.string().optional(),
});

export type SubjectContributor = z.infer<typeof SubjectContributorSchema>;

export const SubjectCompetencyBlockSchema = z.object({
  knowledge: z.array(z.string()),
  skills: z.array(z.string()),
  attitudes: z.array(z.string()),
});

export const CreateSubjectCompetencyBlockSchema = z.object({
  key_competencies: z.object({
    knowledge: z.array(z.string().min(1, "Knowledge point cannot be empty")),
    skills: z.array(z.string().min(1, "Skill cannot be empty")),
    attitudes: z.array(z.string().min(1, "Attitude cannot be empty")),
  }),
});

export type SubjectCompetencyBlock = z.infer<
  typeof SubjectCompetencyBlockSchema
>;
