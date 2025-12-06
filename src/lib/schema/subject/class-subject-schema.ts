import { z } from "zod";
import { SubjectCategorySchema } from "@/lib/schema/common-details-schema";
import { TemplateSubjectSchema, TemplateTopicSchema } from "./template-schema";
import { SchoolSchema } from "../school/school-schema";
import { ClassSchema } from "../class/class-schema";
import { TeacherSchema } from "../school/teacher-schema";
// (Where your TemplateTopicSchema is located)

// ----------------------------------------
// CLASS SUBJECT
// ----------------------------------------

export const ClassSubjectSchema = z.object({
  id: z.string().optional(),
  _id: z.string().optional(),

  teacher_id: z.string().optional(),
  school_id: z.string().optional(),
  class_id: z.string().optional(),
  main_subject_id: z.string().optional(), // TemplateSubject ID

  name: z.string(),
  code: z.string(),
  description: z.string().optional().nullable(),

  category: SubjectCategorySchema,

  estimated_hours: z.union([z.string(), z.number()]),
  credits: z.union([z.string(), z.number()]).optional().nullable(),

  topics: z.array(TemplateTopicSchema).optional(),

  created_by: z.string().optional(),
  disable: z.boolean().optional(),

  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});

export type ClassSubject = z.infer<typeof ClassSubjectSchema>;

export const ClassSubjectWithRelationsSchema = z.object({
  ...ClassSubjectSchema.shape,

  main_template_subject: TemplateSubjectSchema.optional(),
  school: SchoolSchema.optional(),
  class: ClassSchema.optional(),
  teacher: TeacherSchema.optional(),
});

export type ClassSubjectWithRelations = z.infer<
  typeof ClassSubjectWithRelationsSchema
>;
