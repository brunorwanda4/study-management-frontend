import { validSchoolStaffRoles } from "@/lib/context/school.context";
import * as z from "zod";


const ROLES = ["STUDENT", "TEACHER", "SCHOOLSTAFF"] as const;

export const sendJoinSchoolRequestSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    role: z.enum(ROLES, { required_error: "Please select a role" }),
    schoolId: z.string().min(1, { message: "School ID is required" }),
    classId: z.string().optional(),
    // Use z.enum for staffRole, make it optional initially
    staffRole: z.enum(validSchoolStaffRoles).optional(),
    // Add a field for 'Other' staff role if you have an 'OTHER' option
    // otherStaffRole: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // If role is SCHOOLSTAFF, staffRole becomes required
    if (data.role === "SCHOOLSTAFF") {
      // Check if staffRole has been selected
      if (!data.staffRole) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please select the specific school staff role",
          path: ["staffRole"], // Target the staffRole select field
        });
      }
      // Optional: Add validation if you have an 'OTHER' option
      // if (data.staffRole === "OTHER" && (!data.otherStaffRole || data.otherStaffRole.trim() === "")) {
      //   ctx.addIssue({
      //     code: z.ZodIssueCode.custom,
      //     message: "Please specify the 'Other' staff role",
      //     path: ["otherStaffRole"],
      //   });
      // }
    }
  });

export type SendJoinSchoolRequestDto = z.infer<
  typeof sendJoinSchoolRequestSchema
>;