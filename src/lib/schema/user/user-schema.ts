import {
  AddressSchema,
  AgeSchema,
  GenderSchema,
  userRoleSchema,
} from "@/lib/schema/common-details-schema";
import z from "zod";

export const UserModelSchema = z.object({
  id: z.string(),
  _id: z.string().optional(),
  name: z.string(),
  email: z.string().email(),
  username: z.string().optional(),
  password_hash: z.string().optional(),
  role: userRoleSchema.optional(),
  image_id: z.string().optional(),
  image: z.string().optional(),
  phone: z.string().optional(),
  gender: GenderSchema.optional(),
  age: AgeSchema.optional(),
  address: AddressSchema.optional(),
  current_school_id: z.string().optional(),
  bio: z.string().optional(),
  disable: z.boolean().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});
export type UserModel = z.infer<typeof UserModelSchema>;
