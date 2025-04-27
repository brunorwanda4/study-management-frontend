import { z } from 'zod';
import { SchoolDto } from '../school.dto';
import { TeacherDto } from '../school/teacher.dto';
import { StudentDto } from '../school/student.dto';

export const ClassType = z.enum(["Private", "Public", "SchoolClass"]);
export type ClassEnum = z.infer<typeof ClassType>;

export const ClassSchema = z.object({
    id: z.string(), // MongoDB ObjectId as a string
    schoolId: z.string().optional().nullable(), // Optional ObjectId string
    creatorId: z.string().optional().nullable(), // Optional ObjectId string
    code: z.string(), // Required unique string
    name: z.string(), // Required string
    username: z.string(), // Required unique string
    image: z.string().optional().nullable(), // Optional string
    classType: ClassType.optional().nullable(), // Optional ClassType enum with potential null
    educationLever: z.string().optional().nullable(), // Optional string
    curriculum: z.string().optional().nullable(), // Optional string
    classTeacherId: z.string().optional().nullable(), // Optional ObjectId string

    createAt: z.date(), // DateTime represented as a Date object
    updatedAt: z.date(), // DateTime represented as a Date object

});

export type ClassDto = z.infer<typeof ClassSchema>;

export interface ClassAndOthers extends ClassDto {
    school?: SchoolDto,
    teacher?: TeacherDto,
    student?: StudentDto[];
}