import {
  ClassTypes,
  genders,
  JoinRoleEnums,
  JoinStatusEnums,
  SchoolStaffTypes,
  StudentStatuses,
  TeacherTypes,
  userRoles,
} from "@/lib/const/common-details-const";
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
  street: z.string().optional(),
  city: z.string().optional(),
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

export const StudentStatusSchema = z.enum(StudentStatuses);
export type StudentStatus = z.infer<typeof GenderSchema>;

export const userRoleSchema = z.enum(userRoles);
export type userRole = z.infer<typeof userRoleSchema>;

export const ContactSchema = z
  .object({
    phone: z.string().min(1, "Phone is required"),
    email: z.string().email("Invalid email format"),
    whatsapp: z.string().optional(),
    alt_phone: z.string().optional(),
  })
  .optional();

export type contact = z.infer<typeof ContactSchema>;

export const SocialMediaSchema = z.object({
  platform: z.string().min(1, "Platform is required"),
  url: z.string().url("Must be a valid URL"),
});

export type SocialMedia = z.infer<typeof SocialMediaSchema>;

export const OptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  disable: z.boolean().optional(),
});

export type Option = z.infer<typeof OptionSchema>;

// school
export const SchoolStaffTypeSchema = z.enum(SchoolStaffTypes);

export type SchoolStaffType = z.infer<typeof SchoolStaffTypeSchema>;

// teacher
export const TeacherTypeSchema = z.enum(TeacherTypes);

export type TeacherType = z.infer<typeof TeacherTypeSchema>;

export const JoinRoleEnumSchema = z.enum(JoinRoleEnums);
export type JoinRole = z.infer<typeof JoinRoleEnumSchema>;

export const JoinStatusEnumSchema = z.enum(JoinStatusEnums);
export type JoinStatus = z.infer<typeof JoinStatusEnumSchema>;

// class
export const ClassTypeSchema = z.enum(ClassTypes);
export type ClassType = z.infer<typeof ClassTypeSchema>;
