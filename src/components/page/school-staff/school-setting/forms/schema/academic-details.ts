// schemas/academic-details.ts
import { z } from "zod";
import { AffiliationTypeEnum } from "@/lib/schema/school.dto";

export const AcademicDetailsSchema = z.object({
  curriculum: z.array(z.string()).min(1, { message: "Curriculum array cannot be empty if provided" }).optional(),
  educationLevel: z.array(z.string()).min(1, { message: "Education level array cannot be empty if provided" }).optional(),
  accreditationNumber: z.string().optional(),
  affiliation: AffiliationTypeEnum.optional(),
});

export type AcademicDetailsDto = z.infer<typeof AcademicDetailsSchema>;