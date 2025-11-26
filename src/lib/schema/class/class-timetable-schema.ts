import { ClassSchema } from "@/lib/schema/class/class-schema";
import { WeekDaySchema } from "@/lib/schema/common-details-schema";
import { TeacherSchema } from "@/lib/schema/school/teacher-schema";
import { SubjectSchema } from "@/lib/schema/subject/subject-schema";
import { z } from "zod";

export const ClassTimetableSchema = z.object({
  _id: z.string(),
  class_id: z.string(),
  academic_year: z.string(),

  weekly_schedule: z.array(
    z.object({
      day: WeekDaySchema,

      is_holiday: z.boolean(),

      periods: z.array(
        z.object({
          period_id: z.string(),
          type: z.enum(["subject", "break", "lunch"]),

          title: z.string(),
          subject_id: z.string().optional(),
          teacher_id: z.string().optional(),

          // required canonical fields
          start_time: z.string(), // "HH:MM"
          end_time: z.string(),   // "HH:MM"

          // UI helpers
          color_code: z.string().optional(),
          enabled: z.boolean().optional(),
        })
      ),
    })
  ),

  created_at: z.string(),
  updated_at: z.string(),
});

export type ClassTimetable = z.infer<typeof ClassTimetableSchema>;


export const PopulatedPeriodSchema = z.object({
  period_id: z.string(),
  type: z.enum(["subject", "break", "lunch"]),

  title: z.string(),
  start_time: z.string(),
  end_time: z.string(),

  color_code: z.string().optional(),
  enabled: z.boolean().optional(),

  // Extra data
  teacher: TeacherSchema.pick({ id: true, name: true, _id: true, image: true, user_id: true }).optional(),
  subject: SubjectSchema.pick({id: true, _id: true, name: true, code: true}).optional(),
});

export const PopulatedClassTimetableSchema = z.object({
  _id: z.string(),
  class_id: z.string(),
  academic_year: z.string(),

  weekly_schedule: z.array(
    z.object({
      day: WeekDaySchema,

      is_holiday: z.boolean(),

      periods: z.array(PopulatedPeriodSchema),
    })
  ),

  class: ClassSchema.pick({id: true, _id: true, name: true, username: true, image: true,}), // optional expanded class info
  created_at: z.string(),
  updated_at: z.string(),
});

export type PopulatedClassTimetable = z.infer<typeof PopulatedClassTimetableSchema>;
