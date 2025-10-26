import {
  subjectAuths,
  SubjectCategories,
  subjectGradingTypes,
  SubjectLearningMaterialRoles,
  SubjectLevels,
  SubjectMaterialTypes,
  SubjectProgressTrackingConfigTypes,
  SubjectTypes,
} from "@/lib/const/subject-const";
import z from "zod";

// Subject Category
export const SubjectCategorySchema = z
  .enum(SubjectCategories)
  .or(z.string())
  .transform((val) => val as any);

export type SubjectCategory = z.infer<typeof SubjectCategorySchema>;

// Subject Level
export const SubjectLevelSchema = z.enum(SubjectLevels);

export type SubjectLevel = z.infer<typeof SubjectLevelSchema>;

// Subject Auth
export const SubjectAuthSchema = z.enum(subjectAuths);
export type SubjectAuth = z.infer<typeof SubjectAuthSchema>;

// Subject Type
export const SubjectTypeSchema = z.enum(SubjectTypes);
export type SubjectType = z.infer<typeof SubjectTypeSchema>;

export const SubjectProgressTrackingConfigTypeSchema = z.enum(
  SubjectProgressTrackingConfigTypes,
);

export type SubjectProgressTrackingConfigType = z.infer<
  typeof SubjectProgressTrackingConfigTypeSchema
>;

export const SubjectLearningMaterialRoleEnum = z.enum(
  SubjectLearningMaterialRoles,
);
export type SubjectLearningMaterialRole = z.infer<
  typeof SubjectLearningMaterialRoleEnum
>;

export const SubjectMaterialTypeEnum = z.enum(SubjectMaterialTypes);
export type SubjectMaterialType = z.infer<typeof SubjectMaterialTypeEnum>;

export const SubjectGradingTypeEnum = z.enum(subjectGradingTypes);

export type SubjectGradingType = z.infer<typeof SubjectGradingTypeEnum>;
