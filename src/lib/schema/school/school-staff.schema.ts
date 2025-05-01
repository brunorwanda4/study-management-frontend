import * as z from "zod"
import { AgeSchema, GenderEnum } from "../user/user.dto";
export const SchoolStaffSchema = z.object({
  id: z.string(),
  userId: z.string(),
  schoolId: z.string(),
  role: z.string(),

  email: z.string().email({ message: "Invalid email address" }).optional(),
  name: z.string().optional(),
  phone: z.string().optional(),
  image: z.string().optional(),
  age: AgeSchema.optional(),
  gender: GenderEnum.optional(),
  createAt: z.date().optional(),
  updatedAt: z.date().optional(),

  // Optional relation references (can be expanded with real schemas if needed)
  school: z.any().optional(),
  user: z.any().optional(),
});

export type SchoolStaffDto = z.infer<typeof SchoolStaffSchema>;
