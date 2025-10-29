import {
  AffiliationTypes,
  AgeGroups,
  AttendanceSystems,
  CertificationOrTrainings,
  ClassTypes,
  CommunicationMethods,
  Departments,
  EducationLevels,
  EmploymentTypes,
  genders,
  JobTitles,
  JoinRoleEnums,
  JoinStatusEnums,
  languages,
  LearningChallenges,
  ProfessionalGoals,
  Relationships,
  schoolMembers,
  SchoolStaffTypes,
  schoolTypes,
  SpecialSupports,
  StudentStatuses,
  StudyStyles,
  TeacherTypes,
  TeachingStyles,
  userRoles,
  Weekdays,
} from "@/lib/const/common-details-const";
import z from "zod";

const googleMapsUrlRegex =
  /^https?:\/\/(www\.)?google\.[a-z]{2,}(\.[a-z]{2,})?\/maps([/@?].*)?$/i;

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

export const commonDetailsSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  image : z.string().min(1, { message: "Image is required" }).optional(),
  description: z.string().optional(),
})
export type CommonDetails = z.infer<typeof commonDetailsSchema>;

export const GenderSchema = z.enum(genders);
export type Gender = z.infer<typeof GenderSchema>;

export const StudentStatusSchema = z.enum(StudentStatuses);
export type StudentStatus = z.infer<typeof StudentStatusSchema>;

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

export const OptionSchema = z
  .object({
    value: z.string(),
    label: z.string(),
    disable: z.boolean().optional(),
    fixed: z.boolean().optional(),
  })
  .catchall(z.any());

export type Option = z.infer<typeof OptionSchema>;



// ------------------ TimeRange ------------------
export const TimeRangeSchema = z.object({
  start: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid start time format (HH:MM)"),
  end: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid end time format (HH:MM)"),
});

export type TimeRange = z.infer<typeof TimeRangeSchema>;

// ------------------ DailyAvailability ------------------
export const WeekdaySchema = z.enum(Weekdays);
export type Weekday = z.infer<typeof WeekdaySchema>;

export const DailyAvailabilitySchema = z.object({
  day: WeekdaySchema,
  time_range: TimeRangeSchema,
});

export type DailyAvailability = z.infer<typeof DailyAvailabilitySchema>;

// ------------------ Image ------------------
export const ImageSchema = z.object({
  id: z.string().min(1, "Image ID is required"),
  url: z.string().url("Must be a valid URL"),
});

export type Image = z.infer<typeof ImageSchema>;

// school
export const SchoolStaffTypeSchema = z.enum(SchoolStaffTypes);
export const SchoolMemberSchema = z.enum(schoolMembers);
export const SchoolTypeSchema = z.enum(schoolTypes);
export const AttendanceSystemSchema = z.enum(AttendanceSystems);
export const AffiliationTypeSchema = z.enum(AffiliationTypes);

export type SchoolMember = z.infer<typeof SchoolMemberSchema>;
export type SchoolType = z.infer<typeof SchoolTypeSchema>;
export type AttendanceSystem = z.infer<typeof AttendanceSystemSchema>;
export type SchoolStaffType = z.infer<typeof SchoolStaffTypeSchema>;
export type AffiliationType = z.infer<typeof AffiliationTypeSchema>;

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

// ------------------ enums ------------------
export const LanguageSchema = z.enum(languages);
export type Language = z.infer<typeof LanguageSchema>;

export const StudyStyleSchema = z.enum(StudyStyles);
export type StudyStyle = z.infer<typeof StudyStyleSchema>;

export const CommunicationMethodSchema = z.enum(CommunicationMethods);
export type CommunicationMethod = z.infer<typeof CommunicationMethodSchema>;

export const RelationshipSchema = z.enum(Relationships);
export type Relationship = z.infer<typeof RelationshipSchema>;

export const SpecialSupportSchema = z.enum(SpecialSupports);
export type SpecialSupport = z.infer<typeof SpecialSupportSchema>;

export const LearningChallengeSchema = z.enum(LearningChallenges);
export type LearningChallenge = z.infer<typeof LearningChallengeSchema>;

export const EmploymentTypeSchema = z.enum(EmploymentTypes);
export type EmploymentType = z.infer<typeof EmploymentTypeSchema>;

export const EducationLevelSchema = z.enum(EducationLevels);
export type EducationLevel = z.infer<typeof EducationLevelSchema>;

export const CertificationOrTrainingSchema = z.enum(CertificationOrTrainings);
export type CertificationOrTraining = z.infer<typeof CertificationOrTrainingSchema>;

export const TeachingStyleSchema = z.enum(TeachingStyles);
export type TeachingStyle = z.infer<typeof TeachingStyleSchema>;

export const AgeGroupSchema = z.enum(AgeGroups);
export type AgeGroup = z.infer<typeof AgeGroupSchema>;

export const ProfessionalGoalSchema = z.enum(ProfessionalGoals);
export type ProfessionalGoal = z.infer<typeof ProfessionalGoalSchema>;

export const DepartmentSchema = z.enum(Departments);
export type Department = z.infer<typeof DepartmentSchema>;

export const JobTitleSchema = z.enum(JobTitles);
export type JobTitle = z.infer<typeof JobTitleSchema>;
