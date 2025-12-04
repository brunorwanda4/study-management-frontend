import {
  OptionSchema,
  SubjectCategorySchema,
} from "@/lib/schema/common-details-schema";
import { z } from "zod";
import { UserModelSchema } from "../user/user-schema";
import { mainClassSchema } from "../admin/main-classes-schema";

export type TemplateTopic = {
  order: string;
  title: string;
  description?: string | null;
  estimated_hours?: string | null | number;
  credits?: string | null | number;
  subtopics?: TemplateTopic[];
};

export const TemplateTopicSchema: z.ZodType<TemplateTopic> = z.lazy(() =>
  z.object({
    order: z.string(),
    title: z.string(),
    description: z.string().optional().nullable(),
    estimated_hours: z.union([z.string(), z.number()]).optional().nullable(),
    credits: z.union([z.string(), z.number()]).optional().nullable(),
    subtopics: z.array(TemplateTopicSchema).optional(),
  }),
);

export const TemplateSubjectSchema = z.object({
  id: z.string().optional(),
  _id: z.string().optional(),

  name: z.string(),
  code: z.string(),
  description: z.string(),

  category: SubjectCategorySchema,

  estimated_hours: z.union([z.string(), z.number()]).optional().nullable(),
  credits: z.union([z.string(), z.number()]).optional().nullable(),

  prerequisites: z.array(OptionSchema).optional(),

  topics: TemplateTopicSchema.array().optional(),

  created_by: z.string().optional(),

  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});

export type TemplateSubject = z.infer<typeof TemplateSubjectSchema>;

export const TemplateSubjectPartialSchema = TemplateSubjectSchema.partial();

export const TemplateSubjectWithOtherSchema = z.object({
  ...TemplateSubjectSchema.shape,
  creator_user: UserModelSchema.optional(),
  prerequisite_classes: z.array(mainClassSchema).optional(),
});

export type TemplateSubjectWithOther = z.infer<
  typeof TemplateSubjectWithOtherSchema
>;
