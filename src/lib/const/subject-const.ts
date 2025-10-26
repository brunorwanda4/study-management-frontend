export const SubjectLevels = ["Beginner", "Intermediate", "Advanced"] as const;
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

export const subjectAuths = ["Author", "Reviewer"] as const;

export const SubjectTypes = ["MainSubject", "ClassSubject"] as const;

export const SubjectProgressTrackingConfigTypes = [
  "MainSubject",
  "ClassSubject",
] as const;

export const SubjectMaterialTypes = [
  "Book",
  "Article",
  "Video",
  "Note",
  "ExternalLink",
  "Document",
] as const;

export const SubjectLearningMaterialRoles = [
  "MainSubject",
  "ClassSubject",
  "SubjectTopic",
] as const;

export const subjectGradingTypes = [
  "LetterGrade",
  "Percentage",
  "Points",
  "PassFail",
] as const;
