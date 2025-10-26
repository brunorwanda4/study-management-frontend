import {
  AddressSchema,
  AgeSchema,
  GenderSchema,
  userRoleSchema,
} from "@/lib/schema/common-details-schema";
import z from "zod";

export const UpdateUserSchema = z.object({
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
});
export type UpdateUser = z.infer<typeof UpdateUserSchema>;

export const OnboardingSchema = z.object({
  image: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val || (val.startsWith("data:image/") && val.length < 2 * 1024 * 1024),
      {
        message: "Invalid image format or image too large (max 2MB)",
      },
    ),
  age: z
    .object({
      year: z
        .number()
        .min(1900, "Year must be valid")
        .max(new Date().getFullYear(), "Year cannot be in the future"),
      month: z
        .number()
        .min(1, "Month must be between 1 and 12")
        .max(12, "Month must be between 1 and 12"),
      day: z.number().min(1, "Day must be valid").max(31, "Day must be valid"),
    })
    .refine(
      (data) => {
        const { year, month, day } = data;
        const birthDate = new Date(year, month - 1, day);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
          age--;
        }

        return age >= 2 && age <= 100;
      },
      {
        message: "Age must be between 3 and 95 years old.",
      },
    ),
  phone: z
    .string()
    .min(10, {
      message: "Minium character are 10",
    })
    .regex(/^\d+$/, "Phone number must contain only numbers")
    .optional(),
  role: z.enum(["STUDENT", "TEACHER", "ADMIN", "SCHOOLSTAFF"], {
    message: "Role must be one of 'STUDENT', 'TEACHER', or 'SCHOOL STAFF'",
  }),
  gender: GenderSchema,
  address: AddressSchema,
  bio: z.string().optional(),
});

export type onboardingDto = z.infer<typeof OnboardingSchema>;
