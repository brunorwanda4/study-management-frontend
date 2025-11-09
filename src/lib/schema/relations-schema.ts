import { mainClassSchema } from "@/lib/schema/admin/main-classes-schema";
import { tradeSchema } from "@/lib/schema/admin/tradeSchema";
import { ClassSchema } from "@/lib/schema/class/class-schema";
import { SchoolSchema } from "@/lib/schema/school/school-schema";
import { StudentSchema } from "@/lib/schema/school/student-schema";
import { TeacherSchema } from "@/lib/schema/school/teacher-schema";
import { UserModelSchema } from "@/lib/schema/user/user-schema";
import { z } from "zod";

// ---------------------------------------------
// class With Relations
// ---------------------------------------------
export const ClassWithOthersSchema = z.object({
  ...ClassSchema.shape,
  school: SchoolSchema.optional(), // SchoolSchema if available
  creator: UserModelSchema.optional(), // UserSchema
  class_teacher: TeacherSchema.optional(), // TeacherSchema
  main_class: mainClassSchema.optional(), // MainClassSchema
  trade: tradeSchema.optional(),
});
export type ClassWithOthers = z.infer<typeof ClassWithOthersSchema>;

// get with pages paginated

export const PaginatedClassesSchema = z.object({
  classes: z.array(ClassSchema),
  total: z.number().int(),
  total_pages: z.number().int(),
  current_page: z.number().int(),
});

export type PaginatedClasses = z.infer<typeof PaginatedClassesSchema>;

// Equivalent to Rust's PaginatedClassesWithOthers
export const PaginatedClassesWithOthersSchema = z.object({
  classes: z.array(ClassWithOthersSchema),
  total: z.number().int(),
  total_pages: z.number().int(),
  current_page: z.number().int(),
});

export type PaginatedClassesWithOthers = z.infer<
  typeof PaginatedClassesWithOthersSchema
>;

// ---------------------------------------------
// Student With Relations
// ---------------------------------------------
export const StudentWithRelationsSchema = z.object({
  ...StudentSchema.shape,
  user: UserModelSchema.optional(), // Replace with your actual User schema
  creator: UserModelSchema.optional(), // Replace with your actual User schema
  school: SchoolSchema.optional(), // Replace with your actual School schema
  class: ClassSchema.optional(), // Replace with your actual Class schema
});

export type StudentWithRelations = z.infer<typeof StudentWithRelationsSchema>;

export const PaginatedStudentsSchema = z.object({
  students: z.array(StudentSchema),
  total: z.number().int(),
  total_pages: z.number().int(),
  current_page: z.number().int(),
});

export type PaginatedStudents = z.infer<typeof PaginatedStudentsSchema>;

// Equivalent to Rust's PaginatedClassesWithOthers
export const PaginatedStudentWithRelationsSchema = z.object({
  students: z.array(StudentWithRelationsSchema),
  total: z.number().int(),
  total_pages: z.number().int(),
  current_page: z.number().int(),
});

export type PaginatedStudentWithRelations = z.infer<
  typeof PaginatedStudentWithRelationsSchema
>;
