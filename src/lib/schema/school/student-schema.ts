import { StudentStatusSchema } from "@/lib/schema/common-details-schema";
import z from "zod";

export const studentSchema = z.object({
  id: z.string().optional(),
  _id: z.string().optional(),
  user_id: z.string(),
  school_id: z.string(),
  class_id: z.string().optional(),
  creator_id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  gender: z.string().optional(),
  date_of_birth: z.string().optional(),
  registration_number: z.string().optional(),
  admission_year: z.string(),
  status: StudentStatusSchema,
  is_active: z.boolean(),
  tags: z.array(z.string()),

  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});

export type Student = z.infer<typeof studentSchema>;
