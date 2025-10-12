import { UserModel } from "@/lib/schema/user/user-schema";
import { z } from "zod";
import { ClassDto } from "../../class/class.schema";
import { SchoolDto } from "../../school.dto";

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
  createAt: z.string(), // Use date object initially
  updateAt: z.string(),
});

export type SchoolJoinRequestDto = z.infer<typeof SchoolJoinRequestSchema>;

export enum SchoolJoinRequestStatus {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
}

export interface SchoolJoinRequestAndSchool extends SchoolJoinRequestDto {
  school: SchoolDto;
}

export interface SchoolJoinRequestAndOther extends SchoolJoinRequestDto {
  school?: SchoolDto;
  user?: UserModel;
  class?: ClassDto;
}

export interface SchoolJoinRequestAndToken extends SchoolJoinRequestDto {
  token: string;
}
