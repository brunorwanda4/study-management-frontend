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
    image: "/icons/roles/student.png",
    description: "Learns, participates in classes, and completes assignments.",
  },
  ADMIN: {
    name: "Administrator",
    image: "/icons/roles/admin.png",
    description:
      "Oversees the school system and manages users and permissions.",
  },
  TEACHER: {
    name: "Teacher",
    image: "/icons/roles/teacher.png",
    description:
      "Guides and instructs students in specific subjects or classes.",
  },
  SCHOOLSTAFF: {
    name: "School Staff",
    image: "/icons/roles/staff.png",
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
    image: "/icons/gender/male.png",
    description: "Identifies as male.",
  },
  FEMALE: {
    name: "Female",
    image: "/icons/gender/female.png",
    description: "Identifies as female.",
  },
  OTHER: {
    name: "Other",
    image: "/icons/gender/genders.png",
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
    image: "/icons/schools/public.png",
    description: "Government funded and managed.",
  },
  Private: {
    name: "Private",
    image: "/icons/schools/private.png",
    description: "Funded independently through tuition or donations.",
  },
  Charter: {
    name: "Charter",
    image: "/icons/schools/charter.png",
    description: "Publicly funded but operates independently.",
  },
  International: {
    name: "International",
    image: "/icons/schools/international.png",
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
    image: "/icons/schools/children.png",
    description: "Boys and girls study together.",
  },
  Boys: {
    name: "Boys",
    image: "/icons/schools/boy.png",
    description: "Only male students.",
  },
  Girls: {
    name: "Girls",
    image: "/icons/schools/woman.png",
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
    image: "/icons/attendance/manual.png",
    description: "Attendance recorded manually on paper or books.",
  },
  Online: {
    name: "Online",
    image: "/icons/attendance/online.png",
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
    image: "/icons/affiliation/gov.png",
    description: "Managed and funded by government.",
  },
  Religious: {
    name: "Religious",
    image: "/icons/affiliation/religious.png",
    description: "Operated under a faith-based organization.",
  },
  NGO: {
    name: "NGO",
    image: "/icons/affiliation/ngo.png",
    description: "Run by a non-governmental organization.",
  },
  Independent: {
    name: "Independent",
    image: "/icons/affiliation/independent.png",
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
    image: "/icons/students/active.png",
    description: "Currently enrolled and attending.",
  },
  Suspended: {
    name: "Suspended",
    image: "/icons/students/suspended.png",
    description: "Temporarily removed from active study.",
  },
  Graduated: {
    name: "Graduated",
    image: "/icons/students/graduated.png",
    description: "Successfully completed their education.",
  },
  Left: {
    name: "Left",
    image: "/icons/students/left.png",
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
    image: "/icons/staff/director.png",
    description: "Oversees the entire school operations and policies.",
  },
  HeadOfStudies: {
    name: "Head of Studies",
    image: "/icons/staff/head-of-studies.png",
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
    image: "/icons/teacher/regular.png",
    description: "Handles regular classroom duties.",
  },
  HeadTeacher: {
    name: "Head Teacher",
    image: "/icons/teacher/head.png",
    description: "Leads teachers within a class or grade level.",
  },
  SubjectTeacher: {
    name: "Subject Teacher",
    image: "/icons/teacher/subject.png",
    description: "Teaches specific subjects.",
  },
  Deputy: {
    name: "Deputy",
    image: "/icons/teacher/deputy.png",
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
    image: "/icons/join/pending.png",
    description: "Awaiting approval or review.",
  },
  Accepted: {
    name: "Accepted",
    image: "/icons/join/accepted.png",
    description: "Approved and active membership.",
  },
  Rejected: {
    name: "Rejected",
    image: "/icons/join/rejected.png",
    description: "Request was not approved.",
  },
  Expired: {
    name: "Expired",
    image: "/icons/join/expired.png",
    description: "Request timed out or no longer valid.",
  },
  Cancelled: {
    name: "Cancelled",
    image: "/icons/join/cancelled.png",
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
    image: "/icons/join/teacher.png",
    description: "Joins school as an educator.",
  },
  Student: {
    name: "Student",
    image: "/icons/join/student.png",
    description: "Joins school as a learner.",
  },
  Staff: {
    name: "Staff",
    image: "/icons/join/staff.png",
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
    image: "/icons/class/private.png",
    description: "Accessible to invited or specific members.",
  },
  School: {
    name: "School",
    image: "/icons/class/school.png",
    description: "Class within the official school structure.",
  },
  Public: {
    name: "Public",
    image: "/icons/class/public.png",
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
    image: "/icons/languages/english.png",
    description: "Widely spoken international language.",
  },
  French: {
    name: "French",
    image: "/icons/languages/french.png",
    description: "Language used in many African and European schools.",
  },
  Kinyarwanda: {
    name: "Kinyarwanda",
    image: "/icons/languages/kinyarwanda.png",
    description: "National language of Rwanda.",
  },
  Kiswahili: {
    name: "Kiswahili",
    image: "/icons/languages/kiswahili.png",
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
    image: "/icons/study/visual.png",
    description: "Learns best through icons, diagrams, and visual materials.",
  },
  Discussion: {
    name: "Discussion",
    image: "/icons/study/discussion.png",
    description: "Prefers learning through conversations and group dialogue.",
  },
  HandsOn: {
    name: "Hands-On",
    image: "/icons/study/handson.png",
    description: "Learns by doing practical or physical activities.",
  },
  Reading: {
    name: "Reading",
    image: "/icons/study/reading.png",
    description: "Learns through reading books, notes, and written content.",
  },
  Writing: {
    name: "Writing",
    image: "/icons/study/writing.png",
    description: "Retains knowledge through writing and note-taking.",
  },
  Group: {
    name: "Group",
    image: "/icons/study/group.png",
    description: "Learns collaboratively with peers.",
  },
  Solo: {
    name: "Solo",
    image: "/icons/study/solo.png",
    description: "Prefers independent learning.",
  },
  ProjectBased: {
    name: "Project-Based",
    image: "/icons/study/project.png",
    description: "Learns through real-world projects and activities.",
  },
  Digital: {
    name: "Digital",
    image: "/icons/study/digital.png",
    description: "Learns effectively through online tools or technology.",
  },
  Other: {
    name: "Other",
    image: "/icons/study/other.png",
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
    image: "/icons/communication/chat.png",
    description: "Real-time text messaging.",
  },
  Sms: {
    name: "SMS",
    image: "/icons/communication/sms.png",
    description: "Short message service via mobile.",
  },
  Email: {
    name: "Email",
    image: "/icons/communication/email.png",
    description: "Formal or structured communication via email.",
  },
  Call: {
    name: "Call",
    image: "/icons/communication/call.png",
    description: "Voice-based communication over the phone.",
  },
  VideoCall: {
    name: "Video Call",
    image: "/icons/communication/video.png",
    description: "Face-to-face communication via video.",
  },
  InPerson: {
    name: "In-Person",
    image: "/icons/communication/inperson.png",
    description: "Physical meeting or discussion.",
  },
  Other: {
    name: "Other",
    image: "/icons/communication/other.png",
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
      image: "/icons/relationship/default.png",
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
      image: "/icons/support/default.png",
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
      image: "/icons/challenges/default.png",
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
      image: "/icons/employment/default.png",
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
      image: "/icons/education/default.png",
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
      image: "/icons/certifications/default.png",
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
      image: "/icons/teaching/default.png",
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
      image: "/icons/agegroups/default.png",
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
      image: "/icons/goals/default.png",
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
      image: "/icons/departments/default.png",
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
      image: "/icons/jobs/default.png",
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
    image: "/icons/days/mon.png",
    description: "First working day of the week.",
  },
  Tue: {
    name: "Tuesday",
    image: "/icons/days/tue.png",
    description: "Second working day of the week.",
  },
  Wed: {
    name: "Wednesday",
    image: "/icons/days/wed.png",
    description: "Midweek day.",
  },
  Thu: {
    name: "Thursday",
    image: "/icons/days/thu.png",
    description: "Fourth working day of the week.",
  },
  Fri: {
    name: "Friday",
    image: "/icons/days/fri.png",
    description: "Last working day of the week.",
  },
  Sat: {
    name: "Saturday",
    image: "/icons/days/sat.png",
    description: "Weekend day, sometimes for activities.",
  },
  Sun: {
    name: "Sunday",
    image: "/icons/days/sun.png",
    description: "Rest day or religious observance day.",
  },
};
