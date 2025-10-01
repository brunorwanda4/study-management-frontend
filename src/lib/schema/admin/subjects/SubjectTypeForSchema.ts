import z from "zod";
// Subject Type For Enum
export const SubjectTypeForSchema = z.enum(["MainSubject", "ClassSubject"]);
export type SubjectTypeFor = z.infer<typeof SubjectTypeForSchema>;
