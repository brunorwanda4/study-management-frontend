import z from "zod";

export const classRoomTypeSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Name is required",
    })
    .max(50, {
      message: "Maximum character is 50",
    }),
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

export type classRoomTypeSchemaType = z.infer<typeof classRoomTypeSchema>;
