import { RelationshipSchema } from "@/lib/schema/common-details-schema";
import { z } from "zod";

export const GuardianInfoSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  relationship: RelationshipSchema.optional(),
});

// TypeScript type inferred from schema
export type GuardianInfo = z.infer<typeof GuardianInfoSchema>;
