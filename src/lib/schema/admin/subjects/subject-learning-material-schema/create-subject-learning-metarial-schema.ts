import {
  SubjectLearningMaterialRoleEnum,
  SubjectMaterialTypeEnum,
} from "@/lib/schema/admin/subjects/subject-category";
import z from "zod";

export const CreateSubjectLearningMaterialSchema = z.object({
  material_type: SubjectMaterialTypeEnum,
  title: z.string().min(1, "Title is required"),
  link: z.string().url().optional(),
  description: z.string().optional(),
  role: SubjectLearningMaterialRoleEnum,
  reference_id: z.string().min(1, "Reference ID is required"), // related entity ID
  created_by: z.string().optional(),
  is_active: z.boolean().default(true),
});

export type CreateSubjectLearningMaterial = z.infer<
  typeof CreateSubjectLearningMaterialSchema
>;
