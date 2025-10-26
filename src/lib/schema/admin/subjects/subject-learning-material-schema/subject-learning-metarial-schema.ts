import {
  SubjectLearningMaterialRoleEnum,
  SubjectMaterialTypeEnum,
} from "@/lib/schema/admin/subjects/subject-category";
import { z } from "zod";

export const SubjectLearningMaterialSchema = z.object({
  id: z.string().optional(),
  _id: z.string().optional(),
  material_type: SubjectMaterialTypeEnum,
  title: z.string(),
  link: z.string().url().optional(),
  description: z.string().optional(),
  role: SubjectLearningMaterialRoleEnum,
  reference_id: z.string().optional(),
  created_by: z.string().optional(),
  created_at: z.date().or(z.string()).optional(),
  updated_at: z.date().or(z.string()).optional(),
  is_active: z.boolean(),
});

export type SubjectLearningMaterial = z.infer<
  typeof SubjectLearningMaterialSchema
>;
