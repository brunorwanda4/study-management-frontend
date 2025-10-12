import {
  AddressSchema,
  ContactSchema,
  OptionSchema,
  SocialMediaSchema,
} from "@/lib/schema/common-details-schema";
import {
  AffiliationTypeSchema,
  AttendanceSystemSchema,
  SchoolMemberSchema,
  SchoolTypeEnum,
} from "@/lib/schema/school/school-schema";
import { z } from "zod";

export const CreateSchoolSchema = z.object({
  // Core
  username: z.string().min(3, "Username must be at least 3 characters"),
  name: z.string().min(2, "School name must be at least 2 characters"),

  // Optional visuals and metadata
  logo: z.string().url().optional(),
  description: z.string().optional(),

  // Categorical fields
  school_type: SchoolTypeEnum.optional(),
  curriculum: z.array(OptionSchema).optional(),
  education_level: z.array(OptionSchema).optional(),
  accreditation_number: z.string().optional(),
  affiliation: AffiliationTypeSchema.optional(),
  school_members: SchoolMemberSchema.optional(),

  // Location and contact
  address: AddressSchema.optional(),
  contact: ContactSchema.optional(),
  website: z.string().url().optional(),
  social_media: z.array(SocialMediaSchema).optional(),

  // Academic and administrative characteristics
  student_capacity: z.number().int().positive().optional(),
  uniform_required: z.boolean().optional(),
  attendance_system: AttendanceSystemSchema.optional(),
  scholarship_available: z.boolean().optional(),

  // Facilities
  classrooms: z.number().int().optional(),
  library: z.boolean().optional(),
  labs: z.array(OptionSchema).optional(),
  sports_extracurricular: z.array(OptionSchema).optional(),
  online_classes: z.boolean().optional(),

  //   is_active: z.boolean().default(true),
});

export type CreateSchool = z.infer<typeof CreateSchoolSchema>;
