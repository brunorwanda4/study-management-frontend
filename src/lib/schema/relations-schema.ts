import { mainClassSchema } from "@/lib/schema/admin/main-classes-schema";
import { tradeSchema } from "@/lib/schema/admin/tradeSchema";
import { ClassSchema } from "@/lib/schema/class/class-schema";
import { SchoolSchema } from "@/lib/schema/school/school-schema";
import { TeacherSchema } from "@/lib/schema/school/teacher-schema";
import { UserModelSchema } from "@/lib/schema/user/user-schema";
import { z } from "zod";

export const ClassWithOthersSchema = z.object({
  ...ClassSchema.shape,
  school: SchoolSchema.optional(), // SchoolSchema if available
  creator: UserModelSchema.optional(), // UserSchema
  class_teacher: TeacherSchema.optional(), // TeacherSchema
  main_class: mainClassSchema.optional(), // MainClassSchema
  trade: tradeSchema.optional(),
});
export type ClassWithOthers = z.infer<typeof ClassWithOthersSchema>;
