import { JoinRoleEnumSchema } from "@/lib/schema/common-details-schema";
import { z } from "zod";

export const CreateJoinSchoolRequestSchema = z.object({
  sent_by: z.string(),
  email: z.string().email(),
  role: JoinRoleEnumSchema,
  school_id: z.string(),
  message: z.string().optional(),
  class_id: z.string().optional(),
  type: z.string().optional(),
});

export type CreateJoinSchoolRequest = z.infer<
  typeof CreateJoinSchoolRequestSchema
>;

export const BulkCreateJoinSchoolRequestSchema = z.object({
  requests: z.array(CreateJoinSchoolRequestSchema),
});

export type BulkCreateJoinSchoolRequest = z.infer<
  typeof BulkCreateJoinSchoolRequestSchema
>;
