import { z } from "zod";

export const ViewDataClassSchema = z.object({
  id: z.string(), // MongoDB ObjectId string
  name: z.string(),
  teacher: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullable(), // null if no teacher assigned
  image: z.string().nullable(), // can be null
  _count: z.object({
    students: z.number(), // count of students
  }),
});

export type ViewDataClassDto = z.infer<typeof ViewDataClassSchema>;
