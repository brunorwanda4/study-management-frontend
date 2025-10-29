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

// Schema for user onboarding
export const UserOnboardingSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(30, { message: "Username cannot exceed 30 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores",
    }),

  role: userRoleSchema,

  gender: GenderSchema,

  image: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val || (val.startsWith("data:image/") && val.length < 2 * 1024 * 1024),
      {
        message: "Invalid image format or image too large (max 2MB)",
      }
    ),

  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number cannot exceed 15 digits" })
    .regex(/^\+?\d+$/, {
      message: "Phone number must contain only digits and may start with '+'",
    }),
});

export type UserOnboarding = z.infer<typeof UserOnboardingSchema>;
