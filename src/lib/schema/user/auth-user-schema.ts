import {
  GenderSchema,
  userRoleSchema,
} from "@/lib/schema/common-details-schema";
import z from "zod";

export const AuthUserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  username: z.string(),
  name: z.string().min(1, { message: "Minimum 1 character" }),
  image: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  role: userRoleSchema.optional(),
  current_school_id: z.string().nullable().optional(),
  gender: GenderSchema.nullable().optional(),
  bio: z.string().max(500).nullable().optional(),
  accessToken: z.string().optional(),
  schoolAccessToken: z.string().optional(),
  disable: z.boolean().nullable().optional(),
  exp: z.number(),
  iat: z.number(),
});

export type AuthUserDto = z.infer<typeof AuthUserSchema>;

export const RegisterUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export type RegisterUser = z.infer<typeof RegisterUserSchema>;

export const LoginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export type LoginUserDto = z.infer<typeof LoginUserSchema>;
