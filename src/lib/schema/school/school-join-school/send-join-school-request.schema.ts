import { validSchoolStaffRoles } from "@/lib/context/school.context";
import * as z from "zod";

const ROLES = ["STUDENT", "TEACHER", "SCHOOLSTAFF"] as const;
// type Role = (typeof ROLES)[number]; // Define type for roles

export const sendJoinSchoolRequestSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    role: z.enum(ROLES, { required_error: "Please select a role" }),
    schoolId: z.string().min(1, { message: "School ID is required" }),

    // classId is optional overall, but required conditionally
    classId: z.string().optional(),

    // staffRole is optional overall, but required conditionally
    staffRole: z.enum(validSchoolStaffRoles).optional(),

  })
  .superRefine((data, ctx) => {
    // Validation for SCHOOLSTAFF role
    if (data.role === "SCHOOLSTAFF") {
      if (!data.staffRole) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please select the specific school staff role",
          path: ["staffRole"], // Target the staffRole select field
        });
      }
      // // Optional: Clear classId if role is switched to SCHOOLSTAFF
      // // This might be better handled in the component's useEffect
      // if (data.classId) {
      //   data.classId = undefined;
      // }
    }

    // Validation for STUDENT role - Make classId required
    if (data.role === "STUDENT") {
      if (!data.classId || data.classId.trim() === "") { // Ensure it's not just an empty string if passed
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please select a class for the student",
          path: ["classId"], // Target the classId select field
        });
      }
      // // Optional: Clear staffRole if role is switched to STUDENT
      // // This might be better handled in the component's useEffect
      // if (data.staffRole) {
      //   data.staffRole = undefined;
      // }
    }

    // Optional: Clear conditional fields if role is TEACHER (or others)
    if (data.role === "TEACHER") {
      // // Consider clearing in useEffect instead for better UX
      // data.staffRole = undefined;
      // data.classId = undefined;
    }
  });

export type SendJoinSchoolRequestDto = z.infer<
  typeof sendJoinSchoolRequestSchema
>;