import { z } from "zod";

// You might need to define or import these separately
const SchoolTypeEnum = z.enum(["Public", "Private", "Charter", "International"]); // adjust to your values
const AttendanceSystemEnum = z.enum(["Manual", "Biometric", "RFID", "Online"]); // adjust to your values

// Subschemas
const AddressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
}).optional();

const ContactSchema = z.object({
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email format"),
}).optional();

const SocialMediaSchema = z.object({
  platform: z.string().min(1, "Platform is required"),
  link: z.string().url("Must be a valid URL"),
});

export const CreateSchoolSchema = z.object({
  creatorId: z.string().min(1, "Creator ID is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  logo: z.string().url("Logo must be a valid URL").optional(),
  name: z.string().min(1, "Name is required"),
  code: z.string().min(2, "School code is required"),
  description: z.string().optional(),
  schoolType: SchoolTypeEnum,
  curriculum: z.array(z.string()).min(1, "At least one curriculum is required"),
  educationLevel: z.array(z.string()).min(1, "At least one education level is required"),
  schoolMembers: z.any().optional(), // define this more specifically if you can
  accreditationNumber: z.string().optional(),
  affiliation: z.string().optional(),

  address: AddressSchema,
  contact: ContactSchema,
  website: z.string().url("Website must be a valid URL").optional(),
  socialMedia: z.array(SocialMediaSchema).optional(),

  studentCapacity: z.number().int().positive("Capacity must be a positive number").optional(),
  uniformRequired: z.boolean().optional(),
  attendanceSystem: AttendanceSystemEnum.optional(),
  scholarshipAvailable: z.boolean().optional(),

  classrooms: z.number().int().positive("Classrooms must be a positive number").optional(),
  library: z.boolean().optional(),
  labs: z.array(z.string()).optional(),
  sportsExtracurricular: z.array(z.string()).optional(),
  onlineClasses: z.boolean().optional(),
}).superRefine((data, ctx) => {
  if (!data.username || !data.name || !data.code) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Username, name, and code are required",
    });
  }

  // Example custom rule: website is required if social media is not provided
  if (!data.website && (!data.socialMedia || data.socialMedia.length === 0)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Either website or at least one social media link must be provided",
    });
  }
});
