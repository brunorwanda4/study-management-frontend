import { ClassSchema } from "@/lib/schema/class/class-schema";
import { WeekDaySchema } from "@/lib/schema/common-details-schema";
import { TeacherSchema } from "@/lib/schema/school/teacher-schema";
import { SubjectSchema } from "@/lib/schema/subject/subject-schema";
import { z } from "zod";

/** PERIOD TYPES SUPPORTED **/
const PeriodTypeEnum = z.enum(["subject", "break", "lunch", "free"]);
/** BASE DB SCHEMA (PERSISTED) **/
export const ClassTimetableSchema = z.object({
  _id: z.string(),
  class_id: z.string(),
  academic_year: z.string(),
  weekly_schedule: z.array(
    z
      .object({
        day: WeekDaySchema,
        is_holiday: z.boolean().default(false),

        // Start time stored as 24-hour clock "HH:MM"
        start_on: z
          .string()
          .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid 24-hour time (HH:MM)")
          .optional(),

        periods: z.array(
          z
            .object({
              period_id: z.string().optional(), // generated on create/update

              type: PeriodTypeEnum,
              order: z.number().int().nonnegative(),
              /** Optional for subject periods.
               *  Example: "Mathematics - Revision"
               */
              title: z.string().optional(),
              description: z.string().optional(),

              /** Required only when type = subject */
              subject_id: z.string().optional(),
              teacher_id: z.string().optional(),

              /** Time stored safely as offset + duration */
              start_offset: z.number().int().nonnegative(), // minutes from day start
              duration_minutes: z.number().int().positive(),

              enabled: z.boolean().optional(),
            })
            .superRefine((data, ctx) => {
              // Subject validation
              if (data.type === "subject" && !data.subject_id) {
                ctx.addIssue({
                  code: "custom",
                  message: "subject_id is required for subject periods",
                });
              }
            }),
        ),
      })
      .superRefine((data, ctx) => {
        // Require start_on when the day is not a holiday
        if (!data.is_holiday && !data.start_on) {
          ctx.addIssue({
            code: "custom",
            message: "start_on is required for non-holiday days (format HH:MM)",
          });
        }
      }),
  ),

  created_at: z.string(),
  updated_at: z.string(),
});

export type ClassTimetable = z.infer<typeof ClassTimetableSchema>;

export const PopulatedPeriodSchema = z.object({
  period_id: z.string(),
  type: PeriodTypeEnum,

  title: z.string().optional(),
  description: z.string().optional(),
  order: z.number().int().nonnegative(),
  start_offset: z.number().int().nonnegative(),
  duration_minutes: z.number().int().positive(),

  color_code: z.string().optional(),
  enabled: z.boolean().optional(),

  teacher_id: z.string().optional(),
  subject_id: z.string().optional(),

  /** Nested populated data */
  teacher: TeacherSchema.pick({
    id: true,
    _id: true,
    name: true,
    user_id: true,
    image: true,
  }).optional(),

  subject: SubjectSchema.pick({
    id: true,
    _id: true,
    name: true,
    code: true,
  }).optional(),
});

export type PopulatedPeriod = z.infer<typeof PopulatedPeriodSchema>;

/** FRONTEND-READY POPULATED TIMETABLE **/
export const PopulatedClassTimetableSchema = z.object({
  _id: z.string(),
  class_id: z.string(),
  academic_year: z.string(),

  weekly_schedule: z.array(
    z.object({
      day: WeekDaySchema,
      is_holiday: z.boolean(),
      start_on: z
        .string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid 24-hour time (HH:MM)")
        .optional(),
      periods: z.array(PopulatedPeriodSchema),
    }),
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

export type PopulatedClassTimetable = z.infer<
  typeof PopulatedClassTimetableSchema
>;

// TODO: Expand as needed
// const PopulatedClassTimetableCalendarItemSchema = z.object({
//   subject_name: z.string(),

// });

// export const PopulatedClassTimetableCalendarSchema = z.object({

// })
