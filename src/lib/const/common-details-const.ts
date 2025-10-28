import type { AffiliationType, AgeGroup, AttendanceSystem, CertificationOrTraining, ClassType, CommunicationMethod, Department, EducationLevel, EmploymentType, Gender, JobTitle, JoinRole, JoinStatus, Language, LearningChallenge, ProfessionalGoal, Relationship, SchoolMember, SchoolStaffType, SchoolType, SpecialSupport, StudentStatus, StudyStyle, TeacherType, TeachingStyle, userRole, Weekday } from "@/lib/schema/common-details-schema";

/** ---------- USER ROLES ---------- */
export const userRoles = [
  "STUDENT",
  "ADMIN",
  "TEACHER",
  "SCHOOLSTAFF",
] as const;

export const UserRoleDetails: Record<
  userRole,
  { name: string; image: string; description: string }
> = {
  STUDENT: {
    name: "Student",
    image: "/images/roles/student.png",
    description: "Learns, participates in classes, and completes assignments.",
  },
  ADMIN: {
    name: "Administrator",
    image: "/images/roles/admin.png",
    description:
      "Oversees the school system and manages users and permissions.",
  },
  TEACHER: {
    name: "Teacher",
    image: "/images/roles/teacher.png",
    description:
      "Guides and instructs students in specific subjects or classes.",
  },
  SCHOOLSTAFF: {
    name: "School Staff",
    image: "/images/roles/staff.png",
    description:
      "Handles daily school operations such as administration and logistics.",
  },
};

/** ---------- GENDER ---------- */
export const genders = ["MALE", "FEMALE", "OTHER"] as const;

export const GenderDetails: Record<
  Gender,
  { name: string; image: string; description: string }
> = {
  MALE: {
    name: "Male",
    image: "/images/gender/male.png",
    description: "Identifies as male.",
  },
  FEMALE: {
    name: "Female",
    image: "/images/gender/female.png",
    description: "Identifies as female.",
  },
  OTHER: {
    name: "Other",
    image: "/images/gender/other.png",
    description: "Non-binary or prefers not to specify.",
  },
};

/** ---------- SCHOOL ---------- */
export const schoolTypes = [
  "Public",
  "Private",
  "Charter",
  "International",
] as const;

export const SchoolTypeDetails: Record<
  SchoolType,
  { name: string; image: string; description: string }
> = {
  Public: {
    name: "Public",
    image: "/images/schools/public.png",
    description: "Government funded and managed.",
  },
  Private: {
    name: "Private",
    image: "/images/schools/private.png",
    description: "Funded independently through tuition or donations.",
  },
  Charter: {
    name: "Charter",
    image: "/images/schools/charter.png",
    description: "Publicly funded but operates independently.",
  },
  International: {
    name: "International",
    image: "/images/schools/international.png",
    description: "Follows international curricula and diverse student body.",
  },
};

export const schoolMembers = ["Mixed", "Boys", "Girls"] as const;

export const SchoolMemberDetails: Record<
  SchoolMember,
  { name: string; image: string; description: string }
> = {
  Mixed: {
    name: "Mixed",
    image: "/images/schools/mixed.png",
    description: "Boys and girls study together.",
  },
  Boys: {
    name: "Boys",
    image: "/images/schools/boys.png",
    description: "Only male students.",
  },
  Girls: {
    name: "Girls",
    image: "/images/schools/girls.png",
    description: "Only female students.",
  },
};

export const AttendanceSystems = ["Manual", "Online"] as const;
export const AttendanceSystemDetails: Record<
  AttendanceSystem,
  { name: string; image: string; description: string }
> = {
  Manual: {
    name: "Manual",
    image: "/images/attendance/manual.png",
    description: "Attendance recorded manually on paper or books.",
  },
  Online: {
    name: "Online",
    image: "/images/attendance/online.png",
    description: "Attendance tracked digitally within the system.",
  },
};

export const AffiliationTypes = [
  "Government",
  "Religious",
  "NGO",
  "Independent",
] as const;

export const AffiliationTypeDetails: Record<
  AffiliationType,
  { name: string; image: string; description: string }
> = {
  Government: {
    name: "Government",
    image: "/images/affiliation/gov.png",
    description: "Managed and funded by government.",
  },
  Religious: {
    name: "Religious",
    image: "/images/affiliation/religious.png",
    description: "Operated under a faith-based organization.",
  },
  NGO: {
    name: "NGO",
    image: "/images/affiliation/ngo.png",
    description: "Run by a non-governmental organization.",
  },
  Independent: {
    name: "Independent",
    image: "/images/affiliation/independent.png",
    description: "Self-managed and autonomous.",
  },
};

export const StudentStatuses = [
  "Active",
  "Suspended",
  "Graduated",
  "Left",
] as const;

export const StudentStatusDetails: Record<
  StudentStatus,
  { name: string; image: string; description: string }
> = {
  Active: {
    name: "Active",
    image: "/images/students/active.png",
    description: "Currently enrolled and attending.",
  },
  Suspended: {
    name: "Suspended",
    image: "/images/students/suspended.png",
    description: "Temporarily removed from active study.",
  },
  Graduated: {
    name: "Graduated",
    image: "/images/students/graduated.png",
    description: "Successfully completed their education.",
  },
  Left: {
    name: "Left",
    image: "/images/students/left.png",
    description: "No longer part of the school for other reasons.",
  },
};

export const SchoolStaffTypes = ["Director", "HeadOfStudies"] as const;

export const SchoolStaffTypeDetails: Record<
  SchoolStaffType,
  { name: string; image: string; description: string }
> = {
  Director: {
    name: "Director",
    image: "/images/staff/director.png",
    description: "Oversees the entire school operations and policies.",
  },
  HeadOfStudies: {
    name: "Head of Studies",
    image: "/images/staff/head.png",
    description: "Supervises academic programs and teacher performance.",
  },
};

export const TeacherTypes = [
  "Regular",
  "HeadTeacher",
  "SubjectTeacher",
  "Deputy",
] as const;

export const TeacherTypeDetails: Record<
  TeacherType,
  { name: string; image: string; description: string }
> = {
  Regular: {
    name: "Regular",
    image: "/images/teacher/regular.png",
    description: "Handles regular classroom duties.",
  },
  HeadTeacher: {
    name: "Head Teacher",
    image: "/images/teacher/head.png",
    description: "Leads teachers within a class or grade level.",
  },
  SubjectTeacher: {
    name: "Subject Teacher",
    image: "/images/teacher/subject.png",
    description: "Teaches specific subjects.",
  },
  Deputy: {
    name: "Deputy",
    image: "/images/teacher/deputy.png",
    description: "Assists head teacher or school management.",
  },
};

export const JoinStatusEnums = [
  "Pending",
  "Accepted",
  "Rejected",
  "Expired",
  "Cancelled",
] as const;

export const JoinStatusDetails: Record<
  JoinStatus,
  { name: string; image: string; description: string }
> = {
  Pending: {
    name: "Pending",
    image: "/images/join/pending.png",
    description: "Awaiting approval or review.",
  },
  Accepted: {
    name: "Accepted",
    image: "/images/join/accepted.png",
    description: "Approved and active membership.",
  },
  Rejected: {
    name: "Rejected",
    image: "/images/join/rejected.png",
    description: "Request was not approved.",
  },
  Expired: {
    name: "Expired",
    image: "/images/join/expired.png",
    description: "Request timed out or no longer valid.",
  },
  Cancelled: {
    name: "Cancelled",
    image: "/images/join/cancelled.png",
    description: "Cancelled by the user or admin.",
  },
};

export const JoinRoleEnums = ["Teacher", "Student", "Staff"] as const;

export const JoinRoleDetails: Record<
  JoinRole,
  { name: string; image: string; description: string }
> = {
  Teacher: {
    name: "Teacher",
    image: "/images/join/teacher.png",
    description: "Joins school as an educator.",
  },
  Student: {
    name: "Student",
    image: "/images/join/student.png",
    description: "Joins school as a learner.",
  },
  Staff: {
    name: "Staff",
    image: "/images/join/staff.png",
    description: "Joins school as a support or administrative member.",
  },
};

/** ---------- CLASS ---------- */
export const ClassTypes = ["Private", "School", "Public"] as const;

export const ClassTypeDetails: Record<
  ClassType,
  { name: string; image: string; description: string }
> = {
  Private: {
    name: "Private",
    image: "/images/class/private.png",
    description: "Accessible to invited or specific members.",
  },
  School: {
    name: "School",
    image: "/images/class/school.png",
    description: "Class within the official school structure.",
  },
  Public: {
    name: "Public",
    image: "/images/class/public.png",
    description: "Open to wider or community-based participants.",
  },
};

/** ---------- LANGUAGE ---------- */
export const languages = [
  "English",
  "French",
  "Kinyarwanda",
  "Kiswahili",
] as const;

export const LanguageDetails: Record<
  Language,
  { name: string; image: string; description: string }
> = {
  English: {
    name: "English",
    image: "/images/languages/english.png",
    description: "Widely spoken international language.",
  },
  French: {
    name: "French",
    image: "/images/languages/french.png",
    description: "Language used in many African and European schools.",
  },
  Kinyarwanda: {
    name: "Kinyarwanda",
    image: "/images/languages/kinyarwanda.png",
    description: "National language of Rwanda.",
  },
  Kiswahili: {
    name: "Kiswahili",
    image: "/images/languages/kiswahili.png",
    description: "Regional East African communication language.",
  },
};

/** ---------- STUDY STYLES ---------- */
export const StudyStyles = [
  "Visual",
  "Discussion",
  "HandsOn",
  "Reading",
  "Writing",
  "Group",
  "Solo",
  "ProjectBased",
  "Digital",
  "Other",
] as const;

export const StudyStyleDetails: Record<
  StudyStyle,
  { name: string; image: string; description: string }
> = {
  Visual: {
    name: "Visual",
    image: "/images/study/visual.png",
    description: "Learns best through images, diagrams, and visual materials.",
  },
  Discussion: {
    name: "Discussion",
    image: "/images/study/discussion.png",
    description: "Prefers learning through conversations and group dialogue.",
  },
  HandsOn: {
    name: "Hands-On",
    image: "/images/study/handson.png",
    description: "Learns by doing practical or physical activities.",
  },
  Reading: {
    name: "Reading",
    image: "/images/study/reading.png",
    description: "Learns through reading books, notes, and written content.",
  },
  Writing: {
    name: "Writing",
    image: "/images/study/writing.png",
    description: "Retains knowledge through writing and note-taking.",
  },
  Group: {
    name: "Group",
    image: "/images/study/group.png",
    description: "Learns collaboratively with peers.",
  },
  Solo: {
    name: "Solo",
    image: "/images/study/solo.png",
    description: "Prefers independent learning.",
  },
  ProjectBased: {
    name: "Project-Based",
    image: "/images/study/project.png",
    description: "Learns through real-world projects and activities.",
  },
  Digital: {
    name: "Digital",
    image: "/images/study/digital.png",
    description: "Learns effectively through online tools or technology.",
  },
  Other: {
    name: "Other",
    image: "/images/study/other.png",
    description: "Other unique or mixed learning approaches.",
  },
};

/** ---------- COMMUNICATION METHODS ---------- */
export const CommunicationMethods = [
  "Chat",
  "Sms",
  "Email",
  "Call",
  "VideoCall",
  "InPerson",
  "Other",
] as const;

export const CommunicationMethodDetails: Record<
  CommunicationMethod,
  { name: string; image: string; description: string }
> = {
  Chat: {
    name: "Chat",
    image: "/images/communication/chat.png",
    description: "Real-time text messaging.",
  },
  Sms: {
    name: "SMS",
    image: "/images/communication/sms.png",
    description: "Short message service via mobile.",
  },
  Email: {
    name: "Email",
    image: "/images/communication/email.png",
    description: "Formal or structured communication via email.",
  },
  Call: {
    name: "Call",
    image: "/images/communication/call.png",
    description: "Voice-based communication over the phone.",
  },
  VideoCall: {
    name: "Video Call",
    image: "/images/communication/video.png",
    description: "Face-to-face communication via video.",
  },
  InPerson: {
    name: "In-Person",
    image: "/images/communication/inperson.png",
    description: "Physical meeting or discussion.",
  },
  Other: {
    name: "Other",
    image: "/images/communication/other.png",
    description: "Other or unspecified communication method.",
  },
};

/** ---------- RELATIONSHIPS ---------- */
export const Relationships = [
  "Parent",
  "Mother",
  "Father",
  "StepMother",
  "StepFather",
  "Grandmother",
  "Grandfather",
  "Aunt",
  "Uncle",
  "Brother",
  "Sister",
  "Cousin",
  "Guardian",
  "Sponsor",
  "Caregiver",
  "FosterParent",
  "HostParent",
  "Mentor",
  "Teacher",
  "Neighbor",
  "FamilyFriend",
  "LegalRepresentative",
  "SocialWorker",
  "Other",
] as const;

export const RelationshipDetails: Record<
  Relationship,
  { name: string; image: string; description: string }
> = Object.fromEntries(
  Relationships.map((r) => [
    r,
    {
      name: r.replace(/([A-Z])/g, " $1").trim(),
      image: "/images/relationship/default.png",
      description: `${r.replace(/([A-Z])/g, " $1").trim()} related to or responsible for the student.`,
    },
  ]),
) as Record<Relationship, { name: string; image: string; description: string }>;

/** ---------- SPECIAL SUPPORT ---------- */
export const SpecialSupports = [
  "Financial",
  "Academic",
  "Emotional",
  "Medical",
  "Mobility",
  "Nutritional",
  "Social",
  "Language",
  "Technical",
  "Other",
] as const;

export const SpecialSupportDetails: Record<
  SpecialSupport,
  { name: string; image: string; description: string }
> = Object.fromEntries(
  SpecialSupports.map((s) => [
    s,
    {
      name: s.replace(/([A-Z])/g, " $1").trim(),
      image: "/images/support/default.png",
      description: `${s.replace(/([A-Z])/g, " $1").trim()} support for student needs.`,
    },
  ]),
) as Record<
  SpecialSupport,
  { name: string; image: string; description: string }
>;

/** ---------- LEARNING CHALLENGES ---------- */
export const LearningChallenges = [
  "NeedsTutoring",
  "LanguageSupport",
  "LiteracyDifficulty",
  "AttentionDifficulty",
  "HearingImpairment",
  "VisualImpairment",
  "PhysicalDisability",
  "BehavioralDifficulty",
  "MathDifficulty",
  "LearningDisability",
  "StudySkillsSupport",
  "Other",
] as const;

export const LearningChallengeDetails: Record<
  LearningChallenge,
  { name: string; image: string; description: string }
> = Object.fromEntries(
  LearningChallenges.map((l) => [
    l,
    {
      name: l.replace(/([A-Z])/g, " $1").trim(),
      image: "/images/challenges/default.png",
      description: `Challenge: ${l.replace(/([A-Z])/g, " $1").trim()}.`,
    },
  ]),
) as Record<
  LearningChallenge,
  { name: string; image: string; description: string }
>;

/** ---------- EMPLOYMENT TYPES ---------- */
export const EmploymentTypes = [
  "FullTime",
  "PartTime",
  "Volunteer",
  "Contract",
  "Internship",
  "SelfEmployed",
  "Unemployed",
  "Other",
] as const;

export const EmploymentTypeDetails: Record<
  EmploymentType,
  { name: string; image: string; description: string }
> = Object.fromEntries(
  EmploymentTypes.map((e) => [
    e,
    {
      name: e.replace(/([A-Z])/g, " $1").trim(),
      image: "/images/employment/default.png",
      description: `${e.replace(/([A-Z])/g, " $1").trim()} job type or work arrangement.`,
    },
  ]),
) as Record<
  EmploymentType,
  { name: string; image: string; description: string }
>;

/** ---------- EDUCATION LEVELS ---------- */
export const EducationLevels = [
  "None",
  "Primary",
  "HighSchool",
  "Vocational",
  "Diploma",
  "Bachelor",
  "Master",
  "Doctorate",
  "Professional",
  "InProgress",
  "Other",
] as const;

export const EducationLevelDetails: Record<
  EducationLevel,
  { name: string; image: string; description: string }
> = Object.fromEntries(
  EducationLevels.map((l) => [
    l,
    {
      name: l.replace(/([A-Z])/g, " $1").trim(),
      image: "/images/education/default.png",
      description: `Education level: ${l.replace(/([A-Z])/g, " $1").trim()}.`,
    },
  ]),
) as Record<
  EducationLevel,
  { name: string; image: string; description: string }
>;

/** ---------- CERTIFICATION / TRAINING ---------- */
export const CertificationOrTrainings = [
  "FirstAid",
  "TeachingCertificate",
  "ComputerLiteracy",
  "LeadershipTraining",
  "SafetyTraining",
  "LanguageProficiency",
  "CounselingTraining",
  "ChildProtection",
  "ManagementTraining",
  "MentorshipProgram",
  "TechnicalCertification",
  "Other",
] as const;

export const CertificationDetails: Record<
  CertificationOrTraining,
  { name: string; image: string; description: string }
> = Object.fromEntries(
  CertificationOrTrainings.map((c) => [
    c,
    {
      name: c.replace(/([A-Z])/g, " $1").trim(),
      image: "/images/certifications/default.png",
      description: `Training or certification in ${c.replace(/([A-Z])/g, " $1").trim()}.`,
    },
  ]),
) as Record<
  CertificationOrTraining,
  { name: string; image: string; description: string }
>;

/** ---------- TEACHING STYLES ---------- */
export const TeachingStyles = [
  "Lecture",
  "Discussion",
  "HandsOn",
  "ProjectBased",
  "Flipped",
  "Collaborative",
  "Individualized",
  "Digital",
  "Other",
] as const;

export const TeachingStyleDetails: Record<
  TeachingStyle,
  { name: string; image: string; description: string }
> = Object.fromEntries(
  TeachingStyles.map((t) => [
    t,
    {
      name: t.replace(/([A-Z])/g, " $1").trim(),
      image: "/images/teaching/default.png",
      description: `${t.replace(/([A-Z])/g, " $1").trim()} teaching method.`,
    },
  ]),
) as Record<
  TeachingStyle,
  { name: string; image: string; description: string }
>;

/** ---------- AGE GROUPS ---------- */
export const AgeGroups = [
  "Age6To9",
  "Age10To12",
  "Age13To15",
  "Age16To18",
  "Grade1To3",
  "Grade4To6",
  "Grade7To9",
  "Grade10To12",
  "AdultEducation",
  "Other",
] as const;

export const AgeGroupDetails: Record<
  AgeGroup,
  { name: string; image: string; description: string }
> = Object.fromEntries(
  AgeGroups.map((a) => [
    a,
    {
      name: a.replace(/([A-Z])/g, " $1").trim(),
      image: "/images/agegroups/default.png",
      description: `Applicable age or grade: ${a.replace(/([A-Z])/g, " $1").trim()}.`,
    },
  ]),
) as Record<AgeGroup, { name: string; image: string; description: string }>;

/** ---------- PROFESSIONAL GOALS ---------- */
export const ProfessionalGoals = [
  "ImproveDigitalSkills",
  "MentorStudents",
  "ClassroomManagement",
  "CurriculumDevelopment",
  "AssessmentSkills",
  "InclusiveEducation",
  "LeadershipTraining",
  "Other",
] as const;

export const ProfessionalGoalDetails: Record<
  ProfessionalGoal,
  { name: string; image: string; description: string }
> = Object.fromEntries(
  ProfessionalGoals.map((p) => [
    p,
    {
      name: p.replace(/([A-Z])/g, " $1").trim(),
      image: "/images/goals/default.png",
      description: `Professional goal: ${p.replace(/([A-Z])/g, " $1").trim()}.`,
    },
  ]),
) as Record<
  ProfessionalGoal,
  { name: string; image: string; description: string }
>;

/** ---------- DEPARTMENTS ---------- */
export const Departments = [
  "Administration",
  "Finance",
  "Library",
  "IT",
  "HR",
  "Maintenance",
  "Security",
  "Cafeteria",
  "Transport",
  "Other",
] as const;

export const DepartmentDetails: Record<
  Department,
  { name: string; image: string; description: string }
> = Object.fromEntries(
  Departments.map((d) => [
    d,
    {
      name: d.replace(/([A-Z])/g, " $1").trim(),
      image: "/images/departments/default.png",
      description: `Department of ${d.replace(/([A-Z])/g, " $1").trim()}.`,
    },
  ]),
) as Record<Department, { name: string; image: string; description: string }>;

/** ---------- JOB TITLES ---------- */
export const JobTitles = [
  "Accountant",
  "Secretary",
  "Clerk",
  "Librarian",
  "SecurityGuard",
  "ITSupport",
  "Manager",
  "Teacher",
  "Counselor",
  "Other",
] as const;

export const JobTitleDetails: Record<
  JobTitle,
  { name: string; image: string; description: string }
> = Object.fromEntries(
  JobTitles.map((j) => [
    j,
    {
      name: j.replace(/([A-Z])/g, " $1").trim(),
      image: "/images/jobs/default.png",
      description: `${j.replace(/([A-Z])/g, " $1").trim()} role in the organization.`,
    },
  ]),
) as Record<JobTitle, { name: string; image: string; description: string }>;

/** ---------- WEEKDAYS ---------- */
export const Weekdays = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
] as const;

export const WeekdayDetails: Record<
  Weekday,
  { name: string; image: string; description: string }
> = {
  Mon: {
    name: "Monday",
    image: "/images/days/mon.png",
    description: "First working day of the week.",
  },
  Tue: {
    name: "Tuesday",
    image: "/images/days/tue.png",
    description: "Second working day of the week.",
  },
  Wed: {
    name: "Wednesday",
    image: "/images/days/wed.png",
    description: "Midweek day.",
  },
  Thu: {
    name: "Thursday",
    image: "/images/days/thu.png",
    description: "Fourth working day of the week.",
  },
  Fri: {
    name: "Friday",
    image: "/images/days/fri.png",
    description: "Last working day of the week.",
  },
  Sat: {
    name: "Saturday",
    image: "/images/days/sat.png",
    description: "Weekend day, sometimes for activities.",
  },
  Sun: {
    name: "Sunday",
    image: "/images/days/sun.png",
    description: "Rest day or religious observance day.",
  },
};
