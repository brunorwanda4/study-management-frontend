import * as z from "zod";
import { ClassDto } from "../class/class.schema";
import { SchoolDto } from "../school.dto";
import { AgeSchema, GenderEnum, UserDto } from "../user/user-schema";
export const StudentSchema = z.object({
  id: z.string(),
  userId: z.string(),
  classId: z.string().optional(),
  schoolId: z.string().optional(),
  email: z.string().email({ message: "Invalid email" }).optional(),
  name: z.string().optional(),
  phone: z.string().optional(),
  image: z.string().url({ message: "Invalid image URL" }).optional(),
  age: AgeSchema.optional(),
  gender: GenderEnum.optional(),
  createAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
export type StudentDto = z.infer<typeof StudentSchema>;

export interface studentsAndOther extends StudentDto {
  school: SchoolDto;
  user: UserDto;
  class: ClassDto;
}
