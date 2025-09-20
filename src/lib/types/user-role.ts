import z from "zod";

export const userRoleSchema = z.enum([
  "STUDENT",
  "ADMIN",
  "TEACHER",
  "SCHOOLSTAFF",
]);
export type userRole = z.infer<typeof userRoleSchema>;

export const userRole = {
  STUDENT: "STUDENT" as userRole,
  ADMIN: "ADMIN" as userRole,
  TEACHER: "TEACHER" as userRole,
  SCHOOLSTAFF: "SCHOOLSTAFF",
};
