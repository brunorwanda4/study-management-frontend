import { DefaultLetterGrade } from "@/lib/schema/admin/subjects/subject-grading-schema/subject-grading-schema";

export const subjectGradingTypes = [
  "LetterGrade",
  "Percentage",
  "Points",
  "PassFail",
] as const;

// Letter grade defaults
export const defaultLetterGrade = (input: DefaultLetterGrade) => ({
  reference_id: input.reference_id,
  scheme_type: "LetterGrade" as const,
  grade_boundaries: {
    A: 90,
    B: 80,
    C: 70,
    D: 60,
    F: 0,
  },
  assessment_weights: {
    exams: 40,
    assignments: 30,
    participation: 20,
    projects: 10,
  },
  minimum_passing_grade: "D",
  role: input.role,
  created_by: input.created_by,
});

// Percentage defaults
export const defaultPercentage = (input: DefaultLetterGrade) => ({
  reference_id: input.reference_id,
  scheme_type: "Percentage" as const,
  grade_boundaries: {
    Excellent: 90,
    Good: 80,
    Average: 70,
    Pass: 60,
    Fail: 0,
  },
  assessment_weights: {
    exams: 50,
    assignments: 30,
    participation: 20,
  },
  minimum_passing_grade: "Pass",
  role: input.role,
  created_by: input.created_by,
});

// Points defaults
export const defaultPoints = (input: DefaultLetterGrade) => ({
  reference_id: input.reference_id,
  scheme_type: "Points" as const,
  grade_boundaries: {
    max_points: 100,
    passing_points: 50,
  },
  assessment_weights: {
    exams: 50,
    assignments: 30,
    projects: 20,
  },
  minimum_passing_grade: "50 points",
  role: input.role,
  created_by: input.created_by,
});

// Pass/Fail defaults
export const defaultPassFail = (input: DefaultLetterGrade) => ({
  reference_id: input.reference_id,
  scheme_type: "PassFail" as const,
  grade_boundaries: {
    Pass: 60,
    Fail: 0,
  },
  assessment_weights: {
    exams: 60,
    assignments: 40,
  },
  minimum_passing_grade: "Pass",
  role: input.role,
  created_by: input.created_by,
});
