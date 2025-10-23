import {
  JoinRoleEnumSchema,
  JoinStatusEnumSchema,
} from "@/lib/schema/common-details-schema";
import { SchoolSchema } from "@/lib/schema/school/school-schema";
import { UserModelSchema } from "@/lib/schema/user/user-schema";
import { z } from "zod";

export const JoinSchoolRequestSchema = z.object({
  id: z.string().optional(), // ObjectId serialized as string
  _id: z.string().optional(), // ObjectId serialized as string

  school_id: z.string(), // ObjectId -> string
  invited_user_id: z.string().optional().nullable(),
  class_id: z.string().optional().nullable(),

  role: JoinRoleEnumSchema,
  email: z.string().email(),

  type: z.string(), // renamed from `r#type` since TS can't use reserved word syntax

  message: z.string().optional().nullable(),
  status: JoinStatusEnumSchema,

  sent_at: z.string().datetime(), // DateTime<Utc> -> ISO string
  responded_at: z.string().datetime().optional().nullable(),
  expires_at: z.string().datetime().optional().nullable(),

  sent_by: z.string(), // ObjectId -> string

  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type JoinSchoolRequest = z.infer<typeof JoinSchoolRequestSchema>;

// ----------- RESPOND TO REQUEST -----------

export const RespondToJoinRequestSchema = z.object({
  request_id: z.string(),
  status: JoinStatusEnumSchema,
  responded_by: z.string().optional().nullable(),
  invited_user_id: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
});

export type RespondToJoinRequest = z.infer<typeof RespondToJoinRequestSchema>;

// ----------- UPDATE EXPIRATION -----------

export const UpdateRequestExpirationSchema = z.object({
  request_id: z.string(),
  expires_at: z.string().datetime(), // ISO8601
});

export type UpdateRequestExpiration = z.infer<
  typeof UpdateRequestExpirationSchema
>;

// ----------- BULK RESPOND -----------

export const BulkRespondRequestSchema = z.object({
  request_ids: z.array(z.string()),
  status: JoinStatusEnumSchema,
  responded_by: z.string().optional().nullable(),
  responded_at: z.string().datetime().optional().nullable(),
});

export type BulkRespondRequest = z.infer<typeof BulkRespondRequestSchema>;

// ----------- WITH RELATIONS -----------

export const JoinSchoolRequestWithRelationsSchema = z.object({
  ...JoinSchoolRequestSchema.shape,
  school: SchoolSchema.optional(), // replace with SchoolSchema if available
  invited_user: UserModelSchema.optional(), // replace with UserSchema if available
  sender: UserModelSchema.optional(),
});

export type JoinSchoolRequestWithRelations = z.infer<
  typeof JoinSchoolRequestWithRelationsSchema
>;
