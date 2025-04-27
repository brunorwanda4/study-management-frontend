import * as z from "zod";
import { AgeSchema, GenderEnum } from "../user.dto";

export const TeacherSchema = z.object({
    id: z.string(),
    schoolId: z.string().optional(),
    userId: z.string(),

    email: z.string().email({ message: "Invalid email" }).optional(),
    name: z.string().optional(),
    phone: z.string().optional(),
    image: z.string().url({ message: "Invalid image URL" }).optional(),
    age: AgeSchema.optional(),
    gender: GenderEnum.optional(),

    createAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export type TeacherDto = z.infer<typeof TeacherSchema>;
