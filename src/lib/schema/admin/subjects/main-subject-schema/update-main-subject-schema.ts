import {
  SubjectAuthSchema,
  SubjectCategorySchema,
  SubjectLevelSchema,
} from "@/lib/schema/admin/subjects/subject-category";
import { z } from "zod";

export const UpdateMainSubjectFormSchema = z
  .object({
    name: z
      .string()
      .min(1, "Subject name is required")
      .max(200, "Subject name must be less than 200 characters")
      .regex(
        /^[a-zA-Z0-9\s\-&.,()]+$/,
        "Subject name contains invalid characters",
      )
      .optional(),

    code: z
      .string()
      .min(1, "Subject code is required")
      .max(50, "Subject code must be less than 50 characters")
      .regex(
        /^[A-Z0-9\-_]+$/,
        "Subject code can only contain uppercase letters, numbers, hyphens, and underscores",
      )
      .optional(),

    description: z
      .string()
      .max(1000, "Description must be less than 1000 characters")
      .optional(),

    level: SubjectLevelSchema.optional(),

    estimated_hours: z
      .number()
      .int("Must be a whole number")
      .min(1, "Estimated hours must be at least 1")
      .max(1000, "Estimated hours cannot exceed 1000")
      .optional(),

    credits: z
      .number()
      .int("Must be a whole number")
      .min(0, "Credits cannot be negative")
      .max(100, "Credits cannot exceed 100")
      .optional(),

    category: SubjectCategorySchema.optional(),

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
      .optional(),

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

    is_active: z.boolean().optional(),
  })
  // Add cross-field validation at the schema level
  .refine(
    (data) => {
      if (!data.ending_year || !data.starting_year) return true;
      return new Date(data.ending_year) >= new Date(data.starting_year);
    },
    {
      message: "End year must be after start year",
      path: ["ending_year"],
    },
  );

export type UpdateMainSubjectFormData = z.infer<
  typeof UpdateMainSubjectFormSchema
>;
