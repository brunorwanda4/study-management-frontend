import { SubjectCategorySchema } from "@/lib/schema/common-details-schema";
import { z } from "zod";

// 1) Define the type separately (forward declaration)
export type TemplateTopic = {
  order: string;
  title: string;
  estimated_hours?: string | null;
  credits?: string | null;
  subtopics?: TemplateTopic[];
};

export const TemplateTopicSchema: z.ZodType<TemplateTopic> = z.lazy(() =>
  z.object({
    order: z.string(),
    title: z.string(),
    estimated_hours: z.string().optional(),
    credits: z.string().optional(),
    subtopics: z.array(TemplateTopicSchema).optional(),
  }),
);

// Type inference for TypeScript

export const TemplateSubjectSchema = z.object({
  id: z.string().optional(),
  _id: z.string().optional(),

  name: z.string(),
  code: z.string(),
  description: z.string(),

  category: SubjectCategorySchema,

  estimated_hours: z.string(),
  credits: z.string().optional(),

  prerequisites: z.array(z.string()).optional(),

  topics: TemplateTopicSchema.array().optional(),

  created_by: z.string().optional(),

  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});

export type TemplateSubject = z.infer<typeof TemplateSubjectSchema>;

export const TemplateSubjectPartialSchema = TemplateSubjectSchema.partial();
