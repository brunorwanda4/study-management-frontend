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
  subjectAuths,
  SubjectCategories,
  subjectGradingTypes,
  SubjectLearningMaterialRoles,
  SubjectLevels,
  SubjectMaterialTypes,
  SubjectProgressTrackingConfigTypes,
  SubjectTypes,
  TeacherTypes,
  TeachingStyles,
  TradeTypes,
  userRoles,
  Weekdays,
} from "@/lib/const/common-details-const";
import { MIN_YEAR } from "@/lib/env";
import { todayISO } from "@/lib/utils";
import z from "zod";

const googleMapsUrlRegex =
  /^https?:\/\/(www\.)?google\.[a-z]{2,}(\.[a-z]{2,})?\/maps([/@?].*)?$/i;

export const AddressSchema = z.object({
  country: z.string().optional().nullable(),
  province: z.string().optional().nullable(),
  district: z.string().optional().nullable(),
  sector: z.string().optional().nullable(),
  cell: z.string().optional().nullable(),
  village: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  street: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  postal_code: z.string().optional().nullable(),
  google_map_url: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val.trim() === "") return true; // allow empty
        return googleMapsUrlRegex.test(val);
      },
      { message: "URL must be a valid Google Maps link" },
    )
    .nullable(),
});

export type address = z.infer<typeof AddressSchema>;

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
  image: z.string().min(1, { message: "Image is required" }).optional(),
  description: z.string().optional(),
});
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
  start: z.string(),
  end: z.string(),
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

// ----------------- Years Of experience ------------------
export const YearsOfExperienceSchema = z
  .string()
  .nullable()
  .refine(
    (val) => {
      if (!val) return true; // allow empty

      // If incoming is already date-only (YYYY-MM-DD) capture parts
      const dateOnlyMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(val);
      let year: number, month: number, day: number;

      if (dateOnlyMatch) {
        year = Number(dateOnlyMatch[1]);
        month = Number(dateOnlyMatch[2]);
        day = Number(dateOnlyMatch[3]);
      } else {
        // Otherwise try to parse any ISO-like timestamp (with time and/or offset)
        const parsed = new Date(val);
        if (Number.isNaN(parsed.getTime())) return false;
        // Use UTC components to avoid timezone/time-of-day issues
        year = parsed.getUTCFullYear();
        month = parsed.getUTCMonth() + 1;
        day = parsed.getUTCDate();
      }

      // Quick year bound check
      if (year < MIN_YEAR) return false;

      // Build a UTC date-only object for comparison (midnight UTC)
      const candidateUtc = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));

      // Today (UTC) date-only
      const now = new Date();
      const todayUtc = new Date(
        Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate(),
          0,
          0,
          0,
          0,
        ),
      );

      // Candidate must not be in the future (compare date-only)
      if (candidateUtc > todayUtc) return false;

      return true;
    },
    { message: `Date must be between ${MIN_YEAR}-01-01 and ${todayISO}` },
  );

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
export type CertificationOrTraining = z.infer<
  typeof CertificationOrTrainingSchema
>;

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

// Subject

// Subject Category
export const SubjectCategorySchema = z
  .enum(SubjectCategories)
  .or(z.string())
  .transform((val) => val as any);

export type SubjectCategory = z.infer<typeof SubjectCategorySchema>;

// Subject Level
export const SubjectLevelSchema = z.enum(SubjectLevels);

export type SubjectLevel = z.infer<typeof SubjectLevelSchema>;

// Subject Auth
export const SubjectAuthSchema = z.enum(subjectAuths);
export type SubjectAuth = z.infer<typeof SubjectAuthSchema>;

// Subject Type
export const SubjectTypeSchema = z.enum(SubjectTypes);
export type SubjectType = z.infer<typeof SubjectTypeSchema>;

export const SubjectProgressTrackingConfigTypeSchema = z.enum(
  SubjectProgressTrackingConfigTypes,
);

export type SubjectProgressTrackingConfigType = z.infer<
  typeof SubjectProgressTrackingConfigTypeSchema
>;

export const SubjectLearningMaterialRoleEnum = z.enum(
  SubjectLearningMaterialRoles,
);
export type SubjectLearningMaterialRole = z.infer<
  typeof SubjectLearningMaterialRoleEnum
>;

export const SubjectMaterialTypeEnum = z.enum(SubjectMaterialTypes);
export type SubjectMaterialType = z.infer<typeof SubjectMaterialTypeEnum>;

export const SubjectGradingTypeEnum = z.enum(subjectGradingTypes);

export type SubjectGradingType = z.infer<typeof SubjectGradingTypeEnum>;

// trades
export const TradeTypeSchema = z.enum(TradeTypes);
export type TradeType = z.infer<typeof TradeTypeSchema>;
