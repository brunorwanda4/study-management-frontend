import { z } from "zod";
import { AcademicProfileDtoSchema } from "./school/AcademicProfileDto";
import { SchoolJoinRequestDto } from "./school/school-join-school/school-join-request.schema";
import { SchoolStaffDto } from "./school/school-staff.schema";
import { StudentDto } from "./school/student.dto";
import { TeacherDto } from "./school/teacher.dto";

export const SchoolMembers = z.enum(["Mixed", "Boys", "Girls"]);
export const SchoolTypeEnum = z.enum([
  "Public",
  "Private",
  "Charter",
  "International",
]);
export const AttendanceSystemEnum = z.enum(["Manual", "Online"]);

export const AffiliationTypeEnum = z.enum([
  "Government",
  "Religious",
  "NGO",
  "independent",
]);

// Subschemas
const googleMapsUrlRegex =
  /^https?:\/\/(www\.)?google\.[a-z]{2,}(\.[a-z]{2,})?\/maps([\/@?].*)?$/i;
export const SchoolAddress = z
  .object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    country: z.string().min(1, "Country is required"),
    googleMapUrl: z
      .string()
      .url({ message: "Invalid URL format" })
      .regex(googleMapsUrlRegex, {
        message: "URL must be a valid Google Maps link",
      }),
  })
  .optional();

export const ContactSchema = z
  .object({
    phone: z.string().min(1, "Phone is required"),
    email: z.string().email("Invalid email format"),
    whatsappNumber: z.string().optional(),
  })
  .optional();

export const SocialMediaSchema = z.object({
  platform: z.string().min(1, "Platform is required"),
  link: z.string().url("Must be a valid URL"),
});

export type SocialMediaDto = z.infer<typeof SocialMediaSchema>;

export const CreateSchoolSchema = z
  .object({
    creatorId: z.string().min(1, "Creator ID is required"),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores",
      ),
    logo: z.string().url("Logo must be a valid URL").optional(),
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    schoolType: SchoolTypeEnum,
    curriculum: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
          disable: z.boolean().optional(),
        }),
      )
      .min(1, "At least one curriculum is required"),
    educationLevel: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
          disable: z.boolean().optional(),
        }),
      )
      .min(1, "At least one education level is required"),
    schoolMembers: SchoolMembers.optional(),
    accreditationNumber: z.string().optional(),
    affiliation: AffiliationTypeEnum.optional(),

    address: SchoolAddress,
    contact: ContactSchema,
    website: z.string().url("Website must be a valid URL").optional(),
    socialMedia: z.array(SocialMediaSchema).optional(),

    studentCapacity: z
      .number()
      .int()
      .positive("Capacity must be a positive number")
      .optional(),
    uniformRequired: z.boolean().optional(),
    attendanceSystem: AttendanceSystemEnum.optional(),
    scholarshipAvailable: z.boolean().optional(),

    classrooms: z
      .number()
      .int()
      .positive("Classrooms must be a positive number")
      .optional(),
    library: z.boolean().optional(),
    labs: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
          disable: z.boolean().optional(),
        }),
      )
      .optional(),
    sportsExtracurricular: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
          disable: z.boolean().optional(),
        }),
      )
      .optional(),
    onlineClasses: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.username || !data.name) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Username, and name are required",
      });
    }

    if (!data.website && (!data.socialMedia || data.socialMedia.length === 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Either website or at least one social media link must be provided",
      });
    }
  });

export type CreateSchoolDto = z.infer<typeof CreateSchoolSchema>;

export const CreateSchoolSchemaBackend = z
  .object({
    creatorId: z.string().min(1, "Creator ID is required"),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores",
      ),
    logo: z.string().url("Logo must be a valid URL").optional(),
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    schoolType: SchoolTypeEnum,
    curriculum: z
      .array(z.string())
      .min(1, "At least one curriculum is required"),
    educationLevel: z
      .array(z.string())
      .min(1, "At least one education level is required"),
    schoolMembers: SchoolMembers.optional(),
    accreditationNumber: z.string().optional(),
    affiliation: AffiliationTypeEnum.optional(),

    address: SchoolAddress,
    contact: ContactSchema,
    website: z.string().url("Website must be a valid URL").optional(),
    socialMedia: z.array(SocialMediaSchema).optional(),

    studentCapacity: z
      .number()
      .int()
      .positive("Capacity must be a positive number")
      .optional(),
    uniformRequired: z.boolean().optional(),
    attendanceSystem: AttendanceSystemEnum.optional(),
    scholarshipAvailable: z.boolean().optional(),

    classrooms: z
      .number()
      .int()
      .positive("Classrooms must be a positive number")
      .optional(),
    library: z.boolean().optional(),
    labs: z.array(z.string()).optional(),
    sportsExtracurricular: z.array(z.string()).optional(),
    onlineClasses: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.username || !data.name) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Username, and name are required",
      });
    }

    if (!data.website && (!data.socialMedia || data.socialMedia.length === 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Either website or at least one social media link must be provided",
      });
    }
  });

export type CreateSchoolDtoBackend = z.infer<typeof CreateSchoolSchemaBackend>;

export const SchoolAcademicSchema = z.object({
  schoolId: z.string().min(1, { message: "School is required" }),
  // assessmentTypes: z.array(z.string()).optional(),
  // Primary Education
  primarySubjectsOffered: z.array(z.string()).optional(), // Using array for multiple selections
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
      }),
    )
    .min(1, {
      message: "Advance level is required",
    })
    .max(6, {
      message: "Maximum Trading all 6",
    })
    .optional(), // Assuming one combination can be selected
  aLevelOptionSubjects: z.array(z.string()).optional(),
  aLevelPassMark: z.number().int().optional(),
  // TVET
  tvetSpecialization: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
        disable: z.boolean().optional(),
      }),
    )
    .min(1, {
      message: "TVET Trading is required,",
    })
    .max(6, {
      message: "Maximum Trading all 6",
    })
    .optional(), // Assuming one specialization can be selected
  tvetOptionSubjects: z.array(z.string()).optional(),
});

export type schoolAcademicDto = z.infer<typeof SchoolAcademicSchema>;

export const SchoolAcademicSchemaBackend = z.object({
  schoolId: z.string().min(1, { message: "School is required" }),
  // assessmentTypes: z.array(z.string()).optional(),
  // Primary Education
  primarySubjectsOffered: z.array(z.string()).optional(),
  primaryPassMark: z.number().optional(),

  // Ordinary Level
  oLevelCoreSubjects: z.array(z.string()).optional(),
  oLevelOptionSubjects: z.array(z.string()).optional(),
  oLevelExaminationTypes: z.array(z.string()).optional(),
  oLevelAssessment: z.array(z.string()).optional(),

  // Advanced Level
  aLevelSubjectCombination: z
    .array(z.string())
    .min(1, {
      message: "Advance level is required",
    })
    .max(6, {
      message: "Maximum Trading all 6",
    })
    .optional(), // Make optional as not all schools have AL
  aLevelOptionSubjects: z
    .array(z.string())
    .max(6, {
      message: "Maximum Trading all 6",
    })
    .optional(),
  aLevelPassMark: z.number().int().optional(),

  // TVET
  tvetSpecialization: z
    .array(z.string())
    .min(1, {
      message: "TVET Trading is required,",
    })
    .max(6, {
      message: "Maximum Trading all 6",
    })
    .optional(), // Make optional as not all schools have TVET
  tvetOptionSubjects: z.array(z.string()).optional(),
});

export type SchoolAcademicDtoBackend = z.infer<
  typeof SchoolAcademicSchemaBackend
>;

export const SchoolAcademicCreation = z.object({
  totalClasses: z.number(),
  totalModule: z.number(),
});

export type SchoolAcademicCreationDto = z.infer<typeof SchoolAcademicCreation>;

export const SchoolAdministrationSchema = z.object({
  schoolId: z.string().min(1),
  headmasterName: z
    .string()
    .min(2, { message: "Headmaster name is required." }),
  headmasterEmail: z.string().email({ message: "Invalid email address." }),
  headmasterPhone: z
    .string()
    .min(10, {
      message: "Minimum character are 10", // Corrected typo
    })
    .regex(/^\d+$/, "Phone number must contain only numbers"),

  DirectorOfStudies: z
    .string()
    .min(2, { message: "Director of Studies name is required." }),
  principalEmail: z.string().email({ message: "Invalid email address." }),
  principalPhone: z
    .string()
    .min(10, {
      message: "Minimum character are 10", // Corrected typo
    })
    .regex(/^\d+$/, "Phone number must contain only numbers"),

  numberOfTeachers: z.coerce
    .number()
    .int()
    .min(0, { message: "Number of teachers cannot be negative." }),

  additionalAdministration: z
    .array(
      z.object({
        role: z.string().min(1, { message: "Please select a role." }),
        name: z.string().min(2, { message: "Name is required." }),
        email: z.string().email({ message: "Invalid email address." }),
        phone: z
          .string()
          .min(10, {
            message: "Minimum character are 10", // Corrected typo
          })
          .regex(/^\d+$/, "Phone number must contain only numbers"),
      }),
    )
    .default([])
    .optional(),
});

// Define the DTO type based on the schema
export type SchoolAdministrationDto = z.infer<
  typeof SchoolAdministrationSchema
>;

export const sendAdministrationJoinRequestsSchema = z.object({
  attempted: z.number(),
  created: z.number(),
  message: z.string().min(1),
});

export type sendAdministrationJoinRequestsDto = z.infer<
  typeof sendAdministrationJoinRequestsSchema
>;

export const SchoolSchema = z.object({
  id: z.string(),
  creatorId: z.string(),

  // basic information
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  logo: z.string().url({ message: "Invalid logo URL" }).optional(),
  name: z.string().min(1, { message: "School name is required" }),
  code: z.string().min(1, { message: "School code is required" }),
  description: z.string().optional(),
  schoolType: SchoolTypeEnum,
  curriculum: z
    .array(z.string())
    .min(1, { message: "At least one curriculum must be specified" }),
  educationLevel: z
    .array(z.string())
    .min(1, { message: "At least one education level must be specified" }),
  assessmentTypes: z.array(z.string()).optional(),
  schoolMembers: SchoolMembers.optional(),
  accreditationNumber: z.string().optional(),
  affiliation: z.string().optional(),

  // location
  address: SchoolAddress.optional(),
  contact: ContactSchema.optional(),
  website: z.string().url({ message: "Invalid website URL" }).optional(),
  socialMedia: z.array(SocialMediaSchema).optional(),

  // students
  studentCapacity: z
    .number()
    .int()
    .positive({ message: "Student capacity must be a positive integer" })
    .optional(),
  uniformRequired: z.boolean().optional(),
  attendanceSystem: AttendanceSystemEnum.optional(),
  scholarshipAvailable: z.boolean().optional(),

  // facilities
  classrooms: z
    .number()
    .int()
    .positive({ message: "Number of classrooms must be a positive integer" })
    .optional(),
  library: z.boolean().optional(),
  labs: z.array(z.string()).optional(),
  sportsExtracurricular: z.array(z.string()).optional(),
  onlineClasses: z.boolean().optional(),
  academicProfile: AcademicProfileDtoSchema.optional(),
  // metadata
  createAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type SchoolDto = z.infer<typeof SchoolSchema>;

export interface SchoolAndOthers extends SchoolDto {
  Teacher: TeacherDto[];
  Student: StudentDto[];
  SchoolStaff: SchoolStaffDto[];
  SchoolJoinRequest: SchoolJoinRequestDto[];
}
