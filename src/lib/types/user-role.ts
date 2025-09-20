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

export const userRoles: { id: userRole; role: string }[] = [
  // { id: "ADMIN", role: "ADMIN" },
  { id: "SCHOOLSTAFF", role: "SCHOOLSTAFF" },
  { id: "TEACHER", role: "TEACHER" },
  { id: "STUDENT", role: "STUDENT" },
];
