import { z } from "zod";
import { SchoolDto } from "../../school.dto";
import { UserDto } from "../../user/user.dto";
import { ClassDto } from "../../class/class.schema";

export const SchoolJoinRequestSchema = z.object({
    id: z.string(),
    userId: z.string().nullable().optional(),
    schoolId: z.string(),
    role: z.string(),
    name: z.string().nullable().optional(),
    email: z.string().email().nullable().optional(),
    phone: z.string().nullable().optional(),
    classId: z.string().nullable().optional(),
    fromUser: z.boolean().default(false),
    status: z.enum(["pending", "approved", "rejected"]).default("pending"), // Use enum for clarity
    createdAt: z.string(), // Use date object initially
    updatedAt: z.string(),
});

export type SchoolJoinRequestDto = z.infer<typeof SchoolJoinRequestSchema>


export enum SchoolJoinRequestStatus {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
}

export enum UserRole { // Example roles - adjust as needed
  Student = "student",
  Teacher = "teacher",
  Admin = "admin",
  Parent = "parent",
}

export interface SchoolJoinRequestAndSchool extends SchoolJoinRequestDto {
    school: SchoolDto
}

export interface SchoolJoinRequestAndOther extends SchoolJoinRequestDto {
    school?: SchoolDto,
    user?: UserDto,
    class?: ClassDto
}

export interface SchoolJoinRequestAndToken extends SchoolJoinRequestDto {
    token: string
}