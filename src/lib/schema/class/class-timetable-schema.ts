import { ClassSchema } from "@/lib/schema/class/class-schema";
import { WeekDaySchema } from "@/lib/schema/common-details-schema";
import { TeacherSchema } from "@/lib/schema/school/teacher-schema";
import { SubjectSchema } from "@/lib/schema/subject/subject-schema";
import { z } from "zod";

const PeriodTypeEnum = z.enum(["subject", "break", "lunch"]);

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
          type: PeriodTypeEnum,

          title: z.string(),
          subject_id: z.string().optional(),
          teacher_id: z.string().optional(),

          // SAFE TIME MODEL
          start_offset: z.number().int().nonnegative(),  // minutes from day start (e.g., 9:00 = 0)
          duration_minutes: z.number().int().positive(), // length of the session

          // UI helpers
          color_code: z.string().optional(),
          enabled: z.boolean().optional(),
        })
      )
    })
  ),

  created_at: z.string(),
  updated_at: z.string(),
});

export type ClassTimetable = z.infer<typeof ClassTimetableSchema>;

export const PopulatedPeriodSchema = z.object({
  period_id: z.string(),
  type: PeriodTypeEnum,

  title: z.string(),

  start_offset: z.number().int().nonnegative(),
  duration_minutes: z.number().int().positive(),

  color_code: z.string().optional(),
  enabled: z.boolean().optional(),

  teacher: TeacherSchema.pick({
    id: true,
    name: true,
    _id: true,
    image: true,
    user_id: true
  }).optional(),

  subject: SubjectSchema.pick({
    id: true,
    _id: true,
    name: true,
    code: true
  }).optional(),
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

  class: ClassSchema.pick({
    id: true,
    _id: true,
    name: true,
    username: true,
    image: true,
  }),

  created_at: z.string(),
  updated_at: z.string(),
});

export type PopulatedClassTimetable = z.infer<typeof PopulatedClassTimetableSchema>;
