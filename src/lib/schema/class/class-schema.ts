import {
  ClassLevelSchema,
  ClassTypeSchema,
  ImageSchema,
} from "@/lib/schema/common-details-schema";
import { SchoolSchema } from "@/lib/schema/school/school-schema";
import z from "zod";

/* --------------------------------------------------------
   CLASS SETTINGS
-------------------------------------------------------- */

export const ClassStudentSettingsSchema = z.object({
  auto_enroll_subclasses: z.boolean(),
  student_visibility: z.enum(["all", "limited", "none"]),
  permissions: z.object({
    can_chat: z.boolean(),
    can_upload_homework: z.boolean(),
    can_comment: z.boolean(),
    can_view_all_students: z.boolean(),
  }),
  attendance_rules: z.object({
    late_after_minutes: z.number(),
    required_attendance_percentage: z.number(),
  }),
  classwork_rules: z.object({
    allow_resubmission: z.boolean(),
    max_late_days: z.string(),
  }),
});

export type ClassStudentSettings = z.infer<typeof ClassStudentSettingsSchema>;

export const ClassTeachersSettingsSchema = z.object({
  permissions: z.object({
    can_edit_marks: z.boolean(),
    can_take_attendance: z.boolean(),
    can_remove_students: z.boolean(),
  }),
  visibility: z.boolean(),
});

export type ClassTeacherSettings = z.infer<typeof ClassTeachersSettingsSchema>;

export const ClassClassTeacherSettingsSchema = z.object({
  allowed_actions: z.object({
    can_edit_class_info: z.boolean(),
    can_add_students: z.boolean(),
    can_remove_students: z.boolean(),
    can_manage_subjects: z.boolean(),
    can_manage_timetable: z.boolean(),
    can_assign_roles: z.boolean(),
    can_send_parent_notifications: z.boolean(),
    can_add_teachers: z.boolean(),
  }),
  security: z.object({
    require_two_person_approval_for_results: z.boolean(),
    log_all_teacher_changes: z.boolean(),
  }),
});

export type ClassClassTeacherSettings = z.infer<
  typeof ClassClassTeacherSettingsSchema
>;

export const ClassSubjectSettingsSchema = z.object({
  subjects: z.array(
    z.object({
      subject_id: z.string(),
      name: z.string(),
      code: z.string().nullable().optional(),
      type: z.enum(["core", "elective"]).default("core"),
      credit: z.number().default(1),
      teacher_id: z.string().nullable().optional(),
    }),
  ),
  grading: z.object({
    max_score: z.number().default(100),
    pass_mark: z.number().default(40),
    grade_boundaries: z.object({
      A: z.number().default(80),
      B: z.number().default(70),
      C: z.number().default(60),
      D: z.number().default(50),
      E: z.number().default(40),
      F: z.number().default(0),
    }),
  }),
});

export type ClassSubjectSettings = z.infer<typeof ClassSubjectSettingsSchema>;

export const ClassTimetableSettingsSchema = z.object({
  period_length_minutes: z.number(),
  periods_per_day: z.number(),
  weekly_timetable: z.record(
    z.array(
      z.object({
        period: z.number(),
        subject: z.string(),
        teacher_id: z.string().nullable(),
      }),
    ),
  ),
  break_times: z.array(
    z.object({
      start: z.string(),
      end: z.string(),
      label: z.string(),
    }),
  ),
  clash_prevention: z.object({
    prevent_double_teacher_booking: z.boolean(),
    prevent_duplicate_subject_same_day: z.boolean(),
  }),
});

export type ClassTimetableSettings = z.infer<
  typeof ClassTimetableSettingsSchema
>;

export const ClassSettingsSchema = z.object({
  students: ClassStudentSettingsSchema,
  teachers: ClassTeachersSettingsSchema,
  class_teacher: ClassClassTeacherSettingsSchema,
  subjects: ClassSubjectSettingsSchema,
  timetable: ClassTimetableSettingsSchema,
});

export type ClassSettings = z.infer<typeof ClassSettingsSchema>;

// 🧩 Base Class Schema
export const ClassSchema = z.object({
  id: z.string().optional(), // ObjectId → string
  _id: z.string().optional(), // ObjectId → string
  name: z.string(),
  username: z.string(),
  code: z.string().optional(),
  image_id: z.string().optional(),
  image: z.string().optional(),
  background_images: z.array(ImageSchema).optional(),

  school_id: z.string().optional(),
  creator_id: z.string().optional(),
  class_teacher_id: z.string().optional(),

  level_type: ClassLevelSchema.optional(),
  parent_class_id: z.string().optional(),
  subclass_ids: z.array(z.string()).optional(),

  type: ClassTypeSchema.default("Private"),

  main_class_id: z.string().optional(),
  trade_id: z.string().optional(),

  is_active: z.boolean(),

  description: z.string().nullable().optional(),
  capacity: z.number().int().optional(),
  subject: z.string().nullable().optional(),
  grade_level: z.string().nullable().optional(),

  tags: z.array(z.string()),

  settings: ClassSettingsSchema,
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});
export type Class = z.infer<typeof ClassSchema>;

export const CreateClassSchema = z.object({
  name: z.string().min(1, "Class name is required"),
  username: z.string().min(1, "Username is required"),

  image: z.string().optional().nullable(),
  school_id: z.string().optional(),
  creator_id: z.string().optional(),
  class_teacher_id: z.string().optional(),
  trade_id: z.string().optional(),
  type: ClassTypeSchema,

  main_class_id: z.string().optional(),

  // ✅ Default value makes this required but with a fallback
  is_active: z.boolean(),

  description: z.string().nullable().optional(),
  capacity: z
    .number()
    .int()
    .positive("Capacity must be a positive number")
    .max(80, "Capacity cannot exceed 80")
    .min(5, "Min student must be gether than 50")
    .optional(),
  grade_level: z.string().optional(),
});

export type CreateClass = z.infer<typeof CreateClassSchema>;

// 🧩 UpdateClass Schema (mirrors Rust UpdateClass)
export const UpdateClassSchema = z.object({
  name: z.string().optional(),
  username: z.string().optional(),
  code: z.union([z.string().nullable(), z.null()]).optional(),

  school_id: z.union([z.string().nullable(), z.null()]).optional(),
  class_teacher_id: z.union([z.string().nullable(), z.null()]).optional(),

  type: ClassTypeSchema.optional(),
  is_active: z.boolean().optional(),

  description: z.union([z.string().nullable(), z.null()]).optional(),
  capacity: z.number().int().optional(),
  subject: z.union([z.string().nullable(), z.null()]).optional(),
  grade_level: z.union([z.string().nullable(), z.null()]).optional(),
  tags: z.array(z.string()).optional(),
});
export type UpdateClass = z.infer<typeof UpdateClassSchema>;

// 🧩 ClassWithSchool Schema
export const ClassWithSchoolSchema = z.object({
  ...ClassSchema.shape,
  school: SchoolSchema.optional(), // Replace z.any() with your SchoolSchema if defined
});
export type ClassWithSchool = z.infer<typeof ClassWithSchoolSchema>;

// 🧩 BulkClassesRequest Schema
export const BulkClassesRequestSchema = z.object({
  classes: z.array(ClassSchema),
});
export type BulkClassesRequest = z.infer<typeof BulkClassesRequestSchema>;

// 🧩 BulkClassesForSchoolRequest Schema
export const BulkClassesForSchoolRequestSchema = z.object({
  classes: z.array(ClassSchema),
  school_id: z.string(),
});
export type BulkClassesForSchoolRequest = z.infer<
  typeof BulkClassesForSchoolRequestSchema
>;

// 🧩 BulkUpdateItem Schema
export const BulkUpdateItemSchema = z.object({
  id: z.string(),
  update: UpdateClassSchema,
});
export type BulkUpdateItem = z.infer<typeof BulkUpdateItemSchema>;

// 🧩 BulkUpdateRequest Schema
export const BulkUpdateRequestSchema = z.object({
  updates: z.array(BulkUpdateItemSchema),
});
export type BulkUpdateRequest = z.infer<typeof BulkUpdateRequestSchema>;

// add class teacher into school
export const addOrUpdateClassTeacherSchema = z.object({
  class_id: z.string().optional(),
  teacher_id: z.string().optional(),
});

export type addOrUpdateClassTeacher = z.infer<
  typeof addOrUpdateClassTeacherSchema
>;

// sub classes
export const CreateManSubClassesSchema = z.object({
  class_id: z.string(),
  count: z.string().refine(
    (val) => {
      const num = Number(val);
      return !Number.isNaN(num) && num >= 2 && num <= 12;
    },
    { message: "Count must be a number between 2 and 12" },
  ),
});

export type CreateManSubClasses = z.infer<typeof CreateManSubClassesSchema>;
