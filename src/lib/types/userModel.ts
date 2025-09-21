import { AddressSchema } from "@/lib/types/address";
import { AgeSchema } from "@/lib/types/age";
import { GenderSchema } from "@/lib/types/Gender";
import { userRoleSchema } from "@/lib/types/user-role";
import z from "zod";

export const UserModelNewSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  username: z.string().optional(),
  password_hash: z.string(),
  role: userRoleSchema.optional(),
  image_id: z.string().optional(),
  image: z.string().optional(),
  phone: z.string().optional(),
  gender: GenderSchema.optional(),
  age: AgeSchema.optional(),
  address: AddressSchema.optional(),
  current_school_id: z.string().optional(),
  bio: z.string().optional(),
});
export type UserModelNew = z.infer<typeof UserModelNewSchema>;

// User schema (fetched from DB)
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

// Update User schema
export const UserModelPutSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  username: z.string().optional(),
  password_hash: z.string().optional(),
  role: userRoleSchema.optional(),
  image: z.string().optional(),
  phone: z.string().optional(),
  gender: GenderSchema.optional(),
  age: AgeSchema.optional(),
  address: AddressSchema.optional(),
  current_school_id: z.string().optional(),
  disable: z.boolean().optional(),
  bio: z.string().optional(),
  updated_at: z.string().optional(),
});
export type UserModelPut = z.infer<typeof UserModelPutSchema>;

// Bulk delete schema
export const UserModelDeleteManySchema = z.object({
  users: z.array(z.string()),
});
export type UserModelDeleteMany = z.infer<typeof UserModelDeleteManySchema>;

// Single update schema
export const UserModelUpdateSchema = z.object({
  id: z.string(),
  user: UserModelPutSchema,
});
export type UserModelUpdate = z.infer<typeof UserModelUpdateSchema>;

// Bulk update schema
export const UserModelUpdateManySchema = z.object({
  users: z.array(UserModelUpdateSchema),
});
export type UserModelUpdateMany = z.infer<typeof UserModelUpdateManySchema>;
