import {
  AddressSchema,
  ContactSchema,
  SocialMediaSchema,
} from "@/lib/schema/common-details-schema";
import {
  AttendanceSystemSchema,
  SchoolMemberSchema,
  SchoolTypeEnum,
} from "@/lib/schema/school/school-schema";
import z from "zod";

export const PublicSchoolUpdateSchema = z.object({
  logo: z.string().url({ message: "Invalid logo URL" }).optional(),
  name: z
    .string()
    .min(1, { message: "School name cannot be empty if provided" })
    .optional(),
  username: z
    .string()
    .min(1, { message: "School name cannot be empty if provided" })
    .optional(),
  description: z.string().optional(),
  schoolType: SchoolTypeEnum.optional(),
  schoolMembers: SchoolMemberSchema.optional(),
  curriculum: z
    .array(z.string())
    .min(1, { message: "Curriculum array cannot be empty if provided" })
    .optional(),
  educationLevel: z
    .array(z.string())
    .min(1, { message: "Education level array cannot be empty if provided" })
    .optional(),
  accreditationNumber: z.string().optional(), // Allow setting accreditation to empty string if needed
  affiliation: z.string().optional(), // Allow setting affiliation to empty string if needed

  address: AddressSchema.optional(),
  contact: ContactSchema.optional(),
  website: z.string().url({ message: "Invalid website URL" }).optional(), // Allow empty string? If so .or(z.literal('')) before optional
  socialMedia: z.array(SocialMediaSchema).optional(), // Array of partial social media updates

  studentCapacity: z
    .number()
    .int()
    .positive({ message: "Student capacity must be a positive integer" })
    .optional(),
  uniformRequired: z.boolean().optional(),
  attendanceSystem: AttendanceSystemSchema.optional(),
  scholarshipAvailable: z.boolean().optional(),

  classrooms: z
    .number()
    .int()
    .positive({ message: "Number of classrooms must be a positive integer" })
    .optional(),
  library: z.boolean().optional(),
  labs: z.array(z.string()).optional(),
  sportsExtracurricular: z.array(z.string()).optional(),
  onlineClasses: z.boolean().optional(),
});

// Corresponding TypeScript type
export type PublicSchoolUpdateDto = z.infer<typeof PublicSchoolUpdateSchema>;
