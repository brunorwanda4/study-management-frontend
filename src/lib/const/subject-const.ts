import type { CommonDetails } from "@/lib/schema/common-details-schema";

/** ---------- SUBJECTS ---------- */
export const SubjectLevels = ["Beginner", "Intermediate", "Advanced"] as const;
export type SubjectLevel = (typeof SubjectLevels)[number];

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
export type SubjectCategory = (typeof SubjectCategories)[number];

export const SubjectCategoryDetails: Record<SubjectCategory, CommonDetails> = {
  Science: {
    name: "Science",
    image: "/icons/subjects/science.png",
    description:
      "Covers natural and physical sciences such as biology, chemistry, and physics.",
  },
  Technology: {
    name: "Technology",
    image: "/icons/subjects/technology.png",
    description: "Focuses on computing, innovation, and applied technologies.",
  },
  Engineering: {
    name: "Engineering",
    image: "/icons/subjects/engineering.png",
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
    image: "/icons/subjects/social.png",
    description: "Explores human behavior, history, and societal structures.",
  },
  Arts: {
    name: "Arts",
    image: "/icons/subjects/arts.png",
    description:
      "Includes creative and performing arts such as music, drawing, and theatre.",
  },
  TVET: {
    name: "TVET",
    image: "/icons/subjects/tvet.png",
    description: "Technical and Vocational Education and Training subjects.",
  },
  Other: {
    name: "Other",
    image: "/icons/subjects/other.png",
    description: "Covers subjects that do not fit into predefined categories.",
  },
};

/** ---------- SUBJECT AUTHOR ROLES ---------- */
export const subjectAuths = ["Author", "Reviewer"] as const;
export type SubjectAuth = (typeof subjectAuths)[number];

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
export type SubjectType = (typeof SubjectTypes)[number];

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
export type SubjectProgressTrackingConfigType =
  (typeof SubjectProgressTrackingConfigTypes)[number];

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
export type SubjectMaterialType = (typeof SubjectMaterialTypes)[number];

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
export type SubjectLearningMaterialRole =
  (typeof SubjectLearningMaterialRoles)[number];

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
export type SubjectGradingType = (typeof subjectGradingTypes)[number];

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
