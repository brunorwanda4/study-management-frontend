import { z } from "zod";

export const SchoolMembers = z.enum(["Mixed", "Boys", "Girls"]);
export const SchoolTypeEnum = z.enum([
  "Public",
  "Private",
  "Charter",
  "International",
]);
export const AttendanceSystemEnum = z.enum(["Manual", "Online"]);

export const AffiliationTypeEnum = z.enum([
  "Government", "Religious", "NGO", "independent"
])

// Subschemas
const googleMapsUrlRegex = /^https?:\/\/(www\.)?google\.[a-z]{2,}(\.[a-z]{2,})?\/maps([\/@?].*)?$/i;
const AddressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
  googleMapUrl: z.string()
    .url({ message: "Invalid URL format" })
    .regex(googleMapsUrlRegex, { message: "URL must be a valid Google Maps link" })
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
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  logo: z.string().url("Logo must be a valid URL").optional(),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  schoolType: SchoolTypeEnum,
  curriculum: z.array(z.object({
    label: z.string(),
    value: z.string(),
    disable: z.boolean().optional(),
  })).min(1, "At least one curriculum is required"),
  educationLevel: z.array(z.object({
    label: z.string(),
    value: z.string(),
    disable: z.boolean().optional(),
  })).min(1, "At least one education level is required"),
  schoolMembers: SchoolMembers.optional(),
  accreditationNumber: z.string().optional(),
  affiliation: AffiliationTypeEnum.optional(),

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
  labs: z.array(z.object({
    label: z.string(),
    value: z.string(),
    disable: z.boolean().optional(),
  })).optional(),
  sportsExtracurricular: z.array(z.object({
    label: z.string(),
    value: z.string(),
    disable: z.boolean().optional(),
  })).optional(),
  onlineClasses: z.boolean().optional(),
}).superRefine((data, ctx) => {
  if (!data.username || !data.name) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Username, and name are required",
    });
  }

  if (!data.website && (!data.socialMedia || data.socialMedia.length === 0)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Either website or at least one social media link must be provided",
    });
  }
});

export type CreateSchoolDto = z.infer<typeof CreateSchoolSchema>;

export const CreateSchoolSchemaBackend = z.object({
  creatorId: z.string().min(1, "Creator ID is required"),
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  logo: z.string().url("Logo must be a valid URL").optional(),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  schoolType: SchoolTypeEnum,
  curriculum: z.array(z.string()).min(1, "At least one curriculum is required"),
  educationLevel: z.array(z.string()).min(1, "At least one education level is required"),
  schoolMembers: SchoolMembers.optional(),
  accreditationNumber: z.string().optional(),
  affiliation: AffiliationTypeEnum.optional(),

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
  if (!data.username || !data.name) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Username, and name are required",
    });
  }

  if (!data.website && (!data.socialMedia || data.socialMedia.length === 0)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Either website or at least one social media link must be provided",
    });
  }
});

export type CreateSchoolDtoBackend = z.infer<typeof CreateSchoolSchemaBackend>


export const SchoolAcademicSchema = z.object({
  // Primary Education
  primarySubjectsOffered: z.array(z.string()).optional(), // Using array for multiple selections
  assessmentTypes: z.array(z.string()).optional(),
  primaryPassMark: z.number().optional(), // Could be a number input or a select with common values

  // Ordinary Level
  oLevelCoreSubjects: z.array(z.string()).optional(),
  oLevelOptionSubjects: z.array(z.string()).optional(),
  oLevelExaminationTypes: z.array(z.string()).optional(),
  oLevelAssessment: z.array(z.string()).optional(),

  // Advanced Level
  aLevelSubjectCombination: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
        disable: z.boolean().optional(),
      })
    )
    .min(1, {
      message : "Advance level is required"
    }), // Assuming one combination can be selected
  aLevelOptionSubjects: z.array(z.string()).optional(),
  aLevelPassMark : z.number().int().optional(),
  // TVET
  tvetSpecialization: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
        disable: z.boolean().optional(),
      })
    )
    .min(1, {
      message : "TVET Trading is required,"
    }), // Assuming one specialization can be selected
  tvetOptionSubjects: z.array(z.string()).optional(),
});

export type schoolAcademicDto = z.infer<typeof SchoolAcademicSchema>

export const SchoolSchema = z.object({
  id: z.string(),
  creatorId: z.string(),

  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  logo: z.string().url({ message: "Invalid logo URL" }).optional(),
  name: z.string().min(1, { message: "School name is required" }),
  code: z.string().min(1, { message: "School code is required" }),
  description: z.string().optional(),
  schoolType: SchoolTypeEnum,
  curriculum: z.array(z.string()).min(1, { message: "At least one curriculum must be specified" }),
  educationLevel: z.array(z.string()).min(1, { message: "At least one education level must be specified" }),
  schoolMembers: SchoolMembers.optional(),
  accreditationNumber: z.string().optional(),
  affiliation: z.string().optional(),

  // location
  address: AddressSchema.optional(),
  contact: ContactSchema.optional(),
  website: z.string().url({ message: "Invalid website URL" }).optional(),
  socialMedia: z.array(SocialMediaSchema).optional(),

  // students
  studentCapacity: z.number().int().positive({ message: "Student capacity must be a positive integer" }).optional(),
  uniformRequired: z.boolean().optional(),
  attendanceSystem: AttendanceSystemEnum.optional(),
  scholarshipAvailable: z.boolean().optional(),

  // facilities
  classrooms: z.number().int().positive({ message: "Number of classrooms must be a positive integer" }).optional(),
  library: z.boolean().optional(),
  labs: z.array(z.string()).optional(),
  sportsExtracurricular: z.array(z.string()).optional(),
  onlineClasses: z.boolean().optional(),

  createAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type SchoolDto = z.infer<typeof SchoolSchema>;