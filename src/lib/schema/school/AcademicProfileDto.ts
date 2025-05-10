import { z } from 'zod';

// Zod schema for AcademicProfileDto
// This schema is based on the AcademicProfileDto interface provided in the SchoolHomeAboutUpdated component.
// It defines each field as an optional array of strings.

export const AcademicProfileDtoSchema = z.object({
  /**
   * An optional array of strings representing the primary subjects offered by the school.
   * Example: ["math", "english", "science"]
   */
  primarySubjectsOffered: z.array(z.string()).optional().describe("Primary subjects offered by the school."),

  /**
   * An optional array of strings representing the core subjects offered at O-Level.
   * Example: ["math", "physics", "chemistry"]
   */
  oLevelCoreSubjects: z.array(z.string()).optional().describe("O-Level core subjects."),

  /**
   * An optional array of strings representing the optional subjects offered at O-Level.
   * Example: ["computerScience", "art"]
   */
  oLevelOptionSubjects: z.array(z.string()).optional().describe("O-Level optional subjects."),

  /**
   * An optional array of strings representing A-Level subject combinations.
   * Example: ["PCM", "MPC", "HEG"]
   */
  aLevelSubjectCombination: z.array(z.string()).optional().describe("A-Level subject combinations."),

  /**
   * An optional array of strings representing optional subjects offered at A-Level.
   * Example: ["furtherMath", "economics"]
   */
  aLevelOptionSubjects: z.array(z.string()).optional().describe("A-Level optional subjects."),

  /**
   * An optional array of strings representing TVET (Technical and Vocational Education and Training) specializations.
   * Example: ["AUTOMOBILE_TECHNOLOGY", "WELDING"]
   */
  tvetSpecialization: z.array(z.string()).optional().describe("TVET specializations offered."),

  /**
   * An optional array of strings representing optional subjects or modules within TVET programs.
   * Example: ["ADVANCED_WELDING_TECHNIQUES"]
   */
  tvetOptionSubjects: z.array(z.string()).optional().describe("TVET optional subjects or modules."),
});

// You can infer the TypeScript type from the schema if needed:
export type InferredAcademicProfileDto = z.infer<typeof AcademicProfileDtoSchema>;
