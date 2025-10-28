import { AffiliationTypeSchema } from "@/lib/schema/common-details-schema";
import { z } from "zod";

export const AcademicDetailsSchema = z.object({
  curriculum: z
    .array(z.string())
    .min(1, { message: "Curriculum array cannot be empty if provided" })
    .optional(),
  educationLevel: z
    .array(z.string())
    .min(1, { message: "Education level array cannot be empty if provided" })
    .optional(),
  accreditationNumber: z.string().optional(),
  affiliation: AffiliationTypeSchema.optional(),
});

export type AcademicDetailsDto = z.infer<typeof AcademicDetailsSchema>;
