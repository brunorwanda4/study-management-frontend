import z from "zod";

export const classRoomSchema = z.object({
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
  trade: z.string(),
  sector: z.string(),
  class_room_type: z.string(),
  symbol : z.string(),
  description: z
    .string()
    .min(1, {
      message: "Description  is required",
    })
    .max(200, {
      message: "Maximum character is 200",
    }),
});

export type classRoomSchemaType = z.infer<typeof classRoomSchema>;
