import {
  SubjectLearningMaterialRoleEnum,
  SubjectMaterialTypeEnum,
} from "@/lib/schema/admin/subjects/subject-category";
import z from "zod";

export const UpdateSubjectLearningMaterialSchema = z.object({
  material_type: SubjectMaterialTypeEnum.optional(),
  title: z.string().optional(),
  link: z.string().url().optional(),
  description: z.string().optional(),
  role: SubjectLearningMaterialRoleEnum.optional(),
  is_active: z.boolean().optional(),
  reference_id: z.string().optional(),
});

export type UpdateSubjectLearningMaterial = z.infer<
  typeof UpdateSubjectLearningMaterialSchema
>;
