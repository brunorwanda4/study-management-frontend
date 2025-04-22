import { z } from "zod";
import { SchoolDto } from "../school.dto";

export const SchoolJoinRequestSchema = z.object({
    id: z.string(),
    userId: z.string().nullable().optional(),
    schoolId: z.string(),
    role: z.enum(["Headmaster"]), // extend with other roles if needed
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(), // You can add regex for validation if needed
    status: z.enum(["pending", "approved", "rejected"]), // extend as needed
    createAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});

export type SchoolJoinRequestDto = z.infer<typeof SchoolJoinRequestSchema>

export interface SchoolJoinRequestAndSchool extends SchoolJoinRequestDto {
    school : SchoolDto
}