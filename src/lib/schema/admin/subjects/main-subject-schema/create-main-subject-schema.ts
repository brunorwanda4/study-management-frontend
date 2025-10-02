import {
  SubjectAuthSchema,
  SubjectCategorySchema,
  SubjectLevelSchema,
} from "@/lib/schema/admin/subjects/subject-category";
import { z } from "zod";

export const CreateMainSubjectFormSchema = z
  .object({
    name: z
      .string()
      .min(1, "Subject name is required")
      .max(200, "Subject name must be less than 200 characters")
      .regex(
        /^[a-zA-Z0-9\s\-&.,()]+$/,
        "Subject name contains invalid characters",
      ),

    code: z
      .string()
      .min(1, "Subject code is required")
      .max(50, "Subject code must be less than 50 characters")
      .regex(
        /^[A-Z0-9\-_]+$/,
        "Subject code can only contain uppercase letters, numbers, hyphens, and underscores",
      ),

    description: z
      .string()
      .max(1000, "Description must be less than 1000 characters")
      .optional(),

    level: SubjectLevelSchema.optional(),

    estimated_hours: z
      .number()
      .int("Must be a whole number")
      .min(1, "Estimated hours must be at least 1")
      .max(1000, "Estimated hours cannot exceed 1000"),

    credits: z
      .number()
      .int("Must be a whole number")
      .min(0, "Credits cannot be negative")
      .max(100, "Credits cannot exceed 100")
      .optional()
      .default(0),

    category: SubjectCategorySchema,

    main_class_ids: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
          disable: z.boolean().optional(),
        }),
      )
      .optional(),

    prerequisites: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
          disable: z.boolean().optional(),
        }),
      )
      .optional(),

    contributors: z
      .array(
        z.object({
          name: z
            .string()
            .min(1, "Contributor name is required")
            .max(100, "Name must be less than 100 characters"),
          role: SubjectAuthSchema.optional(),
        }),
      )
      .default([]),

    starting_year: z
      .string()
      .optional()
      .refine((val) => !val || !isNaN(Date.parse(val)), {
        message: "Invalid start date format",
      }),

    ending_year: z
      .string()
      .optional()
      .refine((val) => !val || !isNaN(Date.parse(val)), {
        message: "Invalid end date format",
      }),

    is_active: z.boolean().default(true),
  })
  // Add cross-field validation at the schema level
  .refine(
    (data) => {
      if (!data.ending_year || !data.starting_year) return true;
      return new Date(data.ending_year) >= new Date(data.starting_year);
    },
    {
      message: "End year must be after start year",
      path: ["ending_year"], // This shows the error on the ending_year field
    },
  );

export type CreateMainSubjectFormData = z.infer<
  typeof CreateMainSubjectFormSchema
>;
