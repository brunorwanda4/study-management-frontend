import {
  subjectAuths,
  SubjectCategories,
  SubjectLevels,
} from "@/lib/const/subject-const";
import z from "zod";
export const SubjectCategorySchema = z
  .enum([...SubjectCategories] as [string, ...string[]])
  .or(z.string())
  .transform((val) => val as any);

export type SubjectCategory = z.infer<typeof SubjectCategorySchema>;

export const SubjectLevelSchema = z
  .enum([...SubjectLevels] as [string, ...string[]])
  .or(z.string())
  .transform((val) => val as any);

export type SubjectLevel = z.infer<typeof SubjectLevelSchema>;

export const subjectAuthSchema = z.enum([...subjectAuths] as [
  string,
  ...string[],
]);

export type subjectAuth = z.infer<typeof subjectAuthSchema>;
