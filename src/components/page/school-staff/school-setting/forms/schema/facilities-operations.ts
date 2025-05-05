// schemas/facilities-operations.ts
import { z } from "zod";
import { AttendanceSystemEnum } from "@/lib/schema/school.dto";

export const FacilitiesOperationsSchema = z.object({
  studentCapacity: z.number().int().positive({ message: "Student capacity must be a positive integer" }).optional(),
  uniformRequired: z.boolean().optional(),
  attendanceSystem: AttendanceSystemEnum.optional(),
  scholarshipAvailable: z.boolean().optional(),
  classrooms: z.number().int().positive({ message: "Number of classrooms must be a positive integer" }).optional(),
  library: z.boolean().optional(),
  labs: z.array(z.string()).optional(),
  sportsExtracurricular: z.array(z.string()).optional(),
  onlineClasses: z.boolean().optional(),
});

export type FacilitiesOperationsDto = z.infer<typeof FacilitiesOperationsSchema>;