import type {
  AffiliationType,
  AgeGroup,
  AttendanceSystem,
  CertificationOrTraining,
  ClassType,
  CommonDetails,
  CommunicationMethod,
  Department,
  EducationLevel,
  EmploymentType,
  Gender,
  JobTitle,
  JoinRole,
  JoinStatus,
  Language,
  LearningChallenge,
  ProfessionalGoal,
  Relationship,
  SchoolMember,
  SchoolStaffType,
  SchoolType,
  SpecialSupport,
  StudentStatus,
  StudyStyle,
  SubjectAuth,
  SubjectCategory,
  SubjectGradingType,
  SubjectLearningMaterialRole,
  SubjectLevel,
  SubjectMaterialType,
  SubjectProgressTrackingConfigType,
  SubjectType,
  TeacherType,
  TeachingStyle,
  userRole,
  Weekday,
} from "@/lib/schema/common-details-schema";

/** ---------- USER ROLES ---------- */
export const userRoles = [
  "STUDENT",
  "ADMIN",
  "TEACHER",
  "SCHOOLSTAFF",
] as const;

export const UserRoleDetails: Record<userRole, CommonDetails> = {
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

export const GenderDetails: Record<Gender, CommonDetails> = {
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

// class Level
export const TradeTypes = ["Senior", "Primary", "Level", "Nursing"] as const;

/** ---------- SCHOOL ---------- */
export const schoolTypes = [
  "Public",
  "Private",
  "Charter",
  "International",
] as const;

export const SchoolTypeDetails: Record<SchoolType, CommonDetails> = {
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

export const SchoolMemberDetails: Record<SchoolMember, CommonDetails> = {
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
export const AttendanceSystemDetails: Record<AttendanceSystem, CommonDetails> =
  {
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

export const AffiliationTypeDetails: Record<AffiliationType, CommonDetails> = {
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

export const StudentStatusDetails: Record<StudentStatus, CommonDetails> = {
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

export const SchoolStaffTypeDetails: Record<SchoolStaffType, CommonDetails> = {
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

export const TeacherTypeDetails: Record<TeacherType, CommonDetails> = {
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

export const JoinStatusDetails: Record<JoinStatus, CommonDetails> = {
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

export const JoinRoleDetails: Record<JoinRole, CommonDetails> = {
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

export const ClassTypeDetails: Record<ClassType, CommonDetails> = {
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

export const LanguageDetails: Record<Language, CommonDetails> = {
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

export const StudyStyleDetails: Record<StudyStyle, CommonDetails> = {
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
    image: "/icons/study/study.png",
    description: "Learns by doing practical or physical activities.",
  },
  Reading: {
    name: "Reading",
    image: "/icons/study/book.png",
    description: "Learns through reading books, notes, and written content.",
  },
  Writing: {
    name: "Writing",
    image: "/icons/study/note.png",
    description: "Retains knowledge through writing and note-taking.",
  },
  Group: {
    name: "Group",
    image: "/icons/study/partners.png",
    description: "Learns collaboratively with peers.",
  },
  Solo: {
    name: "Solo",
    image: "/icons/study/person.png",
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
    image: "/icons/globe.png",
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
  CommonDetails
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
    image: "/icons/communication/video-call.png",
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

export const RelationshipDetails: Record<Relationship, CommonDetails> =
  Object.fromEntries(
    Relationships.map((r) => [
      r,
      {
        name: r.replace(/([A-Z])/g, " $1").trim(),
        image: "/icons/relationship/default.png",
        description: `${r.replace(/([A-Z])/g, " $1").trim()} related to or responsible for the student.`,
      },
    ]),
  ) as Record<Relationship, CommonDetails>;

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

export const SpecialSupportDetails: Record<SpecialSupport, CommonDetails> =
  Object.fromEntries(
    SpecialSupports.map((s) => [
      s,
      {
        name: s.replace(/([A-Z])/g, " $1").trim(),
        // image: "/icons/support/default.png",
        description: `${s.replace(/([A-Z])/g, " $1").trim()} support for student needs.`,
      },
    ]),
  ) as Record<SpecialSupport, CommonDetails>;

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

/** ---------- LEARNING CHALLENGE DETAILS (Student-Friendly) ---------- */
export const LearningChallengeDetails: Record<
  LearningChallenge,
  CommonDetails
> = {
  NeedsTutoring: {
    name: "Needs Tutoring",
    image: "/icons/challenges/tutoring.png",
    description:
      "You may need some extra help after class or one-on-one support to fully understand some subjects.",
  },
  LanguageSupport: {
    name: "Language Support",
    image: "/icons/challenges/translation.png",
    description:
      "You might find it challenging to understand or express yourself in the language used in class, and could benefit from extra language assistance.",
  },
  LiteracyDifficulty: {
    name: "Literacy Difficulty",
    image: "/icons/challenges/open-book.png",
    description:
      "Reading and writing can sometimes feel hard, and you may need more time or special tools to improve these skills.",
  },
  AttentionDifficulty: {
    name: "Attention Difficulty",
    image: "/icons/challenges/attention.png",
    description:
      "It can be hard to stay focused or pay attention during lessons, especially for long periods of time.",
  },
  HearingImpairment: {
    name: "Hearing Impairment",
    image: "/icons/challenges/hearing.png",
    description:
      "You might have trouble hearing what’s being said in class, so using clear speech or visual aids can help you learn better.",
  },
  VisualImpairment: {
    name: "Visual Impairment",
    image: "/icons/challenges/binoculars.png",
    description:
      "You may have difficulty seeing the board, reading small text, or using visual materials, and may need large print or other tools.",
  },
  PhysicalDisability: {
    name: "Physical Disability",
    image: "/icons/challenges/exercise.png",
    description:
      "You may have a condition that affects your movement or physical activity, and may need a supportive or accessible learning environment.",
  },
  BehavioralDifficulty: {
    name: "Behavioral Difficulty",
    image: "/icons/challenges/behavior.png",
    description:
      "Sometimes you may find it difficult to manage emotions or behavior in class, and might benefit from extra support or guidance.",
  },
  MathDifficulty: {
    name: "Math Difficulty",
    image: "/icons/challenges/math.png",
    description:
      "You may find numbers, calculations, or problem-solving in math challenging and may need extra time or practice.",
  },
  LearningDisability: {
    name: "Learning Disability",
    image: "/icons/challenges/learning.png",
    description:
      "You may process information differently, which can make learning new things harder, but the right methods can make a big difference.",
  },
  StudySkillsSupport: {
    name: "Study Skills Support",
    image: "/icons/challenges/study.png",
    description:
      "You may need help developing study habits like note-taking, organization, or managing time effectively.",
  },
  Other: {
    name: "Other",
    image: "/icons/challenges/book.png",
    description:
      "You may face a different kind of challenge that affects your learning, and we’ll work together to understand and support it.",
  },
};

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

export const EmploymentTypeDetails: Record<EmploymentType, CommonDetails> =
  Object.fromEntries(
    EmploymentTypes.map((e) => [
      e,
      {
        name: e.replace(/([A-Z])/g, " $1").trim(),
        // image: "/icons/employment/default.png",
        description: `${e.replace(/([A-Z])/g, " $1").trim()} job type or work arrangement.`,
      },
    ]),
  ) as Record<EmploymentType, CommonDetails>;

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

export const EducationLevelDetails: Record<EducationLevel, CommonDetails> =
  Object.fromEntries(
    EducationLevels.map((l) => [
      l,
      {
        name: l.replace(/([A-Z])/g, " $1").trim(),
        // image: "/icons/education/default.png",
        description: `Education level: ${l.replace(/([A-Z])/g, " $1").trim()}.`,
      },
    ]),
  ) as Record<EducationLevel, CommonDetails>;

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
  CommonDetails
> = Object.fromEntries(
  CertificationOrTrainings.map((c) => [
    c,
    {
      name: c.replace(/([A-Z])/g, " $1").trim(),
      // image: "/icons/certifications/default.png",
      description: `Training or certification in ${c.replace(/([A-Z])/g, " $1").trim()}.`,
    },
  ]),
) as Record<CertificationOrTraining, CommonDetails>;

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

export const TeachingStyleDetails: Record<TeachingStyle, CommonDetails> =
  Object.fromEntries(
    TeachingStyles.map((t) => [
      t,
      {
        name: t.replace(/([A-Z])/g, " $1").trim(),
        // image: "/icons/teaching/default.png",
        description: `${t.replace(/([A-Z])/g, " $1").trim()} teaching method.`,
      },
    ]),
  ) as Record<TeachingStyle, CommonDetails>;

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

export const AgeGroupDetails: Record<AgeGroup, CommonDetails> =
  Object.fromEntries(
    AgeGroups.map((a) => [
      a,
      {
        name: a.replace(/([A-Z])/g, " $1").trim(),
        image: "/icons/agegroups/default.png",
        description: `Applicable age or grade: ${a.replace(/([A-Z])/g, " $1").trim()}.`,
      },
    ]),
  ) as Record<AgeGroup, CommonDetails>;

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

export const ProfessionalGoalDetails: Record<ProfessionalGoal, CommonDetails> =
  Object.fromEntries(
    ProfessionalGoals.map((p) => [
      p,
      {
        name: p.replace(/([A-Z])/g, " $1").trim(),
        // image: "/icons/goals/default.png",
        description: `Professional goal: ${p.replace(/([A-Z])/g, " $1").trim()}.`,
      },
    ]),
  ) as Record<ProfessionalGoal, CommonDetails>;

/** ---------- DEPARTMENTS ---------- */
export const Departments = [
  "Administration",
  "Finance",
  "Library",
  "IT",
  "HR",
  "Maintenance",
  // "Security",
  // "Cafeteria",
  // "Transport",
  "Other",
] as const;

export const DepartmentDetails: Record<Department, CommonDetails> =
  Object.fromEntries(
    Departments.map((d) => [
      d,
      {
        name: d.replace(/([A-Z])/g, " $1").trim(),
        // image: "/icons/departments/default.png",
        description: `Department of ${d.replace(/([A-Z])/g, " $1").trim()}.`,
      },
    ]),
  ) as Record<Department, CommonDetails>;

/** ---------- JOB TITLES ---------- */
export const JobTitles = [
  "Accountant",
  "Secretary",
  // "Clerk",
  "Librarian",
  // "SecurityGuard",
  // "ITSupport",
  "Manager",
  "Teacher",
  // "Counselor",
  "Other",
] as const;

export const JobTitleDetails: Record<JobTitle, CommonDetails> =
  Object.fromEntries(
    JobTitles.map((j) => [
      j,
      {
        name: j.replace(/([A-Z])/g, " $1").trim(),
        // image: "/icons/jobs/default.png",
        description: `${j.replace(/([A-Z])/g, " $1").trim()} role in the organization.`,
      },
    ]),
  ) as Record<JobTitle, CommonDetails>;

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

export const WeekdayDetails: Record<Weekday, CommonDetails> = {
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

/** ---------- SUBJECTS ---------- */
export const SubjectLevels = ["Beginner", "Intermediate", "Advanced"] as const;

export const SubjectLevelDetails: Record<SubjectLevel, CommonDetails> = {
  Beginner: {
    name: "Beginner",
    image: "/icons/subjects/beginner.png",
    description: "Covers fundamental concepts and basic understanding.",
  },
  Intermediate: {
    name: "Intermediate",
    image: "/icons/subjects/intermediate.png",
    description: "Builds upon basic knowledge and introduces complex topics.",
  },
  Advanced: {
    name: "Advanced",
    image: "/icons/subjects/advanced.png",
    description: "In-depth and specialized understanding of subject material.",
  },
};

/** ---------- SUBJECT CATEGORIES ---------- */
export const SubjectCategories = [
  "Science",
  "Technology",
  "Engineering",
  "Mathematics",
  "Language",
  "SocialScience",
  "Arts",
  "TVET",
  "Other",
] as const;

export const SubjectCategoryDetails: Record<SubjectCategory, CommonDetails> = {
  Science: {
    name: "Science",
    image: "/icons/subjects/science.png",
    description:
      "Covers natural and physical sciences such as biology, chemistry, and physics.",
  },
  Technology: {
    name: "Technology",
    image: "/icons/subjects/data-science.png",
    description: "Focuses on computing, innovation, and applied technologies.",
  },
  Engineering: {
    name: "Engineering",
    image: "/icons/subjects/engineers.png",
    description:
      "Deals with the design and construction of structures and systems.",
  },
  Mathematics: {
    name: "Mathematics",
    image: "/icons/subjects/mathematics.png",
    description: "Involves problem-solving, logic, and quantitative reasoning.",
  },
  Language: {
    name: "Language",
    image: "/icons/subjects/language.png",
    description:
      "Studies spoken and written languages, grammar, and communication.",
  },
  SocialScience: {
    name: "SocialScience",
    image: "/icons/subjects/social-media.png",
    description: "Explores human behavior, history, and societal structures.",
  },
  Arts: {
    name: "Arts",
    image: "/icons/subjects/paint-palette.png",
    description:
      "Includes creative and performing arts such as music, drawing, and theatre.",
  },
  TVET: {
    name: "TVET",
    image: "/icons/subjects/analysis.png",
    description: "Technical and Vocational Education and Training subjects.",
  },
  Other: {
    name: "Other",
    image: "/icons/subjects/globe.png",
    description: "Covers subjects that do not fit into predefined categories.",
  },
};

/** ---------- SUBJECT AUTHOR ROLES ---------- */
export const subjectAuths = ["Author", "Reviewer"] as const;

export const SubjectAuthDetails: Record<SubjectAuth, CommonDetails> = {
  Author: {
    name: "Author",
    image: "/icons/subjects/author.png",
    description: "Creates and develops subject content and materials.",
  },
  Reviewer: {
    name: "Reviewer",
    image: "/icons/subjects/reviewer.png",
    description: "Evaluates and verifies the quality of subject materials.",
  },
};

/** ---------- SUBJECT TYPES ---------- */
export const SubjectTypes = ["MainSubject", "ClassSubject"] as const;

export const SubjectTypeDetails: Record<SubjectType, CommonDetails> = {
  MainSubject: {
    name: "Main Subject",
    image: "/icons/subjects/main.png",
    description: "Core subject taught to all students in the curriculum.",
  },
  ClassSubject: {
    name: "Class Subject",
    image: "/icons/subjects/class.png",
    description: "Optional or specialized subject specific to certain classes.",
  },
};

/** ---------- SUBJECT PROGRESS CONFIG TYPES ---------- */
export const SubjectProgressTrackingConfigTypes = [
  "MainSubject",
  "ClassSubject",
] as const;

export const SubjectProgressTrackingConfigDetails: Record<
  SubjectProgressTrackingConfigType,
  CommonDetails
> = {
  MainSubject: {
    name: "Main Subject",
    image: "/icons/subjects/progress-main.png",
    description: "Tracks progress for primary and core subjects.",
  },
  ClassSubject: {
    name: "Class Subject",
    image: "/icons/subjects/progress-class.png",
    description: "Tracks progress for optional or specialized class subjects.",
  },
};

/** ---------- SUBJECT MATERIAL TYPES ---------- */
export const SubjectMaterialTypes = [
  "Book",
  "Article",
  "Video",
  "Note",
  "ExternalLink",
  "Document",
] as const;

export const SubjectMaterialTypeDetails: Record<
  SubjectMaterialType,
  CommonDetails
> = {
  Book: {
    name: "Book",
    image: "/icons/materials/book.png",
    description: "Printed or digital book used for reference or study.",
  },
  Article: {
    name: "Article",
    image: "/icons/materials/article.png",
    description: "Written piece discussing a specific topic or research.",
  },
  Video: {
    name: "Video",
    image: "/icons/materials/video.png",
    description: "Educational video material for visual learning.",
  },
  Note: {
    name: "Note",
    image: "/icons/materials/note.png",
    description: "Written notes or summaries created for learning support.",
  },
  ExternalLink: {
    name: "External Link",
    image: "/icons/materials/link.png",
    description: "Links to useful external online learning resources.",
  },
  Document: {
    name: "Document",
    image: "/icons/materials/document.png",
    description: "Files and official documents related to subject content.",
  },
};

/** ---------- SUBJECT LEARNING MATERIAL ROLES ---------- */
export const SubjectLearningMaterialRoles = [
  "MainSubject",
  "ClassSubject",
  "SubjectTopic",
] as const;

export const SubjectLearningMaterialRoleDetails: Record<
  SubjectLearningMaterialRole,
  CommonDetails
> = {
  MainSubject: {
    name: "Main Subject",
    image: "/icons/materials/main.png",
    description: "Materials used for teaching the main subject curriculum.",
  },
  ClassSubject: {
    name: "Class Subject",
    image: "/icons/materials/class.png",
    description: "Resources supporting class-specific lessons or topics.",
  },
  SubjectTopic: {
    name: "Subject Topic",
    image: "/icons/materials/topic.png",
    description: "Resources related to a specific topic or subunit.",
  },
};

/** ---------- SUBJECT GRADING TYPES ---------- */
export const subjectGradingTypes = [
  "LetterGrade",
  "Percentage",
  "Points",
  "PassFail",
] as const;

export const SubjectGradingTypeDetails: Record<
  SubjectGradingType,
  CommonDetails
> = {
  LetterGrade: {
    name: "Letter Grade",
    image: "/icons/grades/letter.png",
    description: "Grades represented by letters such as A, B, C, etc.",
  },
  Percentage: {
    name: "Percentage",
    image: "/icons/grades/percentage.png",
    description: "Grades based on a 0–100% scoring system.",
  },
  Points: {
    name: "Points",
    image: "/icons/grades/points.png",
    description: "Grades represented numerically by points earned.",
  },
  PassFail: {
    name: "Pass/Fail",
    image: "/icons/grades/passfail.png",
    description: "Simple grading system based on pass or fail outcome.",
  },
};

// classes
export const ClassLevels = [
  "MainClass", // e.g., "Primary 1"
  "SubClass",
] as const;
