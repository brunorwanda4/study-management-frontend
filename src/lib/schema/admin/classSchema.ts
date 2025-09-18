import z from "zod";

export const classSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Name is required",
    })
    .max(50, {
      message: "Maximum character is 50",
    }),
  trade: z.string(),
  education: z.string(),
  sector: z.string(),
  class_teacher: z.string().email(),
  class_type: z.string().min(1 , {
    message : "Class type is required"
  }),
  class_room: z.string(),
  is_public : z.string(),
  image : z.string(),
  username: z
    .string()
    .min(1, {
      message: "Username is required",
    })
    .max(50, {
      message: "Maximum character is 50",
    }),
  description: z
    .string()
    .min(1, {
      message: "Description  is required",
    })
    .max(200, {
      message: "Maximum character is 200",
    }),
});

export type classSchemaType = z.infer<typeof classSchema>;
