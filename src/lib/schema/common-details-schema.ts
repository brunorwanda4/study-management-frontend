import { genders, userRoles } from "@/lib/const/common-details-const";
import z from "zod";

const googleMapsUrlRegex =
  /^https?:\/\/(www\.)?google\.[a-z]{2,}(\.[a-z]{2,})?\/maps([\/@?].*)?$/i;

export const AddressSchema = z.object({
  country: z.string().min(1, { message: "Country is required" }),
  province: z.string().optional(),
  district: z.string().optional(),
  sector: z.string().optional(),
  cell: z.string().optional(),
  village: z.string().optional(),
  state: z.string().optional(),
  postal_code: z.string().optional(),
  google_map_url: z
    .string()
    .url({ message: "Invalid URL" })
    .regex(googleMapsUrlRegex, {
      message: "URL must be a valid Google Maps link",
    })
    .optional(),
});

export const AgeSchema = z
  .object({
    year: z
      .number()
      .min(1900, { message: "Year must be valid" })
      .max(new Date().getFullYear(), {
        message: "Year cannot be in the future",
      }),
    month: z
      .number()
      .min(1, { message: "Month must be between 1 and 12" })
      .max(12, { message: "Month must be between 1 and 12" }),
    day: z
      .number()
      .min(1, { message: "Day must be valid" })
      .max(31, { message: "Day must be valid" }),
  })
  .refine(
    ({ year, month, day }) => {
      const birthDate = new Date(year, month - 1, day);
      const today = new Date();

      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();

      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
      }

      return age >= 3 && age <= 95;
    },
    { message: "Age must be between 3 and 95 years old." },
  );

export type Age = z.infer<typeof AgeSchema>;

export const GenderSchema = z.enum(genders);
export type Gender = z.infer<typeof GenderSchema>;

export const userRoleSchema = z.enum(userRoles);
export type userRole = z.infer<typeof userRoleSchema>;
