import {
  JoinRoleEnumSchema,
  JoinStatusEnumSchema,
} from "@/lib/schema/common-details-schema";
import { z } from "zod";

export const JoinSchoolRequestSchema = z.object({
  id: z.string().optional().nullable(), // ObjectId serialized as string

  school_id: z.string(), // ObjectId -> string
  invited_user_id: z.string().optional().nullable(),

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

// ----------- CREATE REQUEST DTO -----------

export const CreateJoinSchoolRequestSchema = z.object({
  sent_by: z.string(),
  email: z.string().email(),
  role: JoinRoleEnumSchema,
  school_id: z.string(),
  message: z.string().optional().nullable(),
  type: z.string(),
});

export type CreateJoinSchoolRequest = z.infer<
  typeof CreateJoinSchoolRequestSchema
>;

// ----------- BULK CREATE -----------

export const BulkCreateJoinSchoolRequestSchema = z.object({
  requests: z.array(CreateJoinSchoolRequestSchema),
});

export type BulkCreateJoinSchoolRequest = z.infer<
  typeof BulkCreateJoinSchoolRequestSchema
>;

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
  request: JoinSchoolRequestSchema,
  school: z.any().optional().nullable(), // replace with SchoolSchema if available
  invited_user: z.any().optional().nullable(), // replace with UserSchema if available
  sender: z.any().optional().nullable(),
});

export type JoinSchoolRequestWithRelations = z.infer<
  typeof JoinSchoolRequestWithRelationsSchema
>;
