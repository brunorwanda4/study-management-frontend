import {
  AddressSchema,
  AttendanceSystemSchema,
  ContactSchema,
  SchoolMemberSchema,
  SchoolTypeSchema,
  SocialMediaSchema,
} from "@/lib/schema/common-details-schema";

import z from "zod";

export const SchoolIdentitySchema = z.object({
  name: z
    .string()
    .min(1, { message: "School name cannot be empty if provided" })
    .optional(),
  username: z
    .string()
    .min(1, { message: "Username cannot be empty if provided" })
    .optional(),
  logo: z.string().url({ message: "Invalid logo URL" }).optional(),
  description: z.string().optional(),
});
export type SchoolIdentityDto = z.infer<typeof SchoolIdentitySchema>;

export const SchoolClassificationSchema = z.object({
  schoolType: SchoolTypeSchema.optional(),
  schoolMembers: SchoolMemberSchema.optional(), // Ensure this matches your SchoolMembers definition
  affiliation: z.string().optional(), // Or use AffiliationTypeEnum if applicable
  accreditationNumber: z.string().optional(),
});
export type SchoolClassificationDto = z.infer<
  typeof SchoolClassificationSchema
>;

// 3. Academic Programs Schema (2 fields)
// Note: This group is small, but focuses specifically on academic offerings.
export const AcademicProgramsSchema = z.object({
  curriculum: z
    .array(z.string())
    .min(1, { message: "Curriculum array cannot be empty if provided" })
    .optional(),
  educationLevel: z
    .array(z.string())
    .min(1, { message: "Education level array cannot be empty if provided" })
    .optional(),
});
export type AcademicProgramsDto = z.infer<typeof AcademicProgramsSchema>;

// 4. Contact & Location Schema (4 fields)
export const ContactLocationSchema = z.object({
  address: AddressSchema.optional(),
  contact: ContactSchema.optional(),
  website: z.string().url({ message: "Invalid website URL" }).optional(),
  socialMedia: z.array(SocialMediaSchema).optional(),
});
export type ContactLocationDto = z.infer<typeof ContactLocationSchema>;

// 5. Operations Schema (5 fields)
export const OperationsSchema = z.object({
  studentCapacity: z
    .number()
    .int()
    .positive({ message: "Student capacity must be a positive integer" })
    .optional(),
  classrooms: z
    .number()
    .int()
    .positive({ message: "Number of classrooms must be a positive integer" })
    .optional(),
  attendanceSystem: AttendanceSystemSchema.optional(),
  uniformRequired: z.boolean().optional(),
  scholarshipAvailable: z.boolean().optional(),
});
export type OperationsDto = z.infer<typeof OperationsSchema>;

// 6. Facilities & Activities Schema (4 fields)
export const FacilitiesActivitiesSchema = z.object({
  library: z.boolean().optional(),
  labs: z.array(z.string()).optional(),
  sportsExtracurricular: z.array(z.string()).optional(),
  onlineClasses: z.boolean().optional(),
});
export type FacilitiesActivitiesDto = z.infer<
  typeof FacilitiesActivitiesSchema
>;

// --- Recomposing the Full Schema ---

// Merge the sub-schemas sequentially to reconstruct the full schema
export const RecomposedPublicSchoolUpdateSchema = SchoolIdentitySchema.merge(
  SchoolClassificationSchema,
)
  .merge(AcademicProgramsSchema)
  .merge(ContactLocationSchema)
  .merge(OperationsSchema)
  .merge(FacilitiesActivitiesSchema);

// Corresponding TypeScript type for the recomposed schema
export type RecomposedPublicSchoolUpdateDto = z.infer<
  typeof RecomposedPublicSchoolUpdateSchema
>;

// You can now use each smaller schema (e.g., SchoolIdentitySchema, ContactLocationSchema)
// for individual form steps or sections in your UI, providing a more focused user experience.
// The RecomposedPublicSchoolUpdateSchema can be used for final validation before submitting
// the combined data.
