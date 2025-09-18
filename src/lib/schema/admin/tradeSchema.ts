import z from "zod";

export const tradeSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "trade name is required",
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
  sector: z.string(),
  description: z
    .string()
    .min(1, {
      message: "Description  is required",
    })
    .max(200, {
      message: "Maximum character is 200",
    }),
  class_rooms: z.number().min(0, "The number must be 0 or greater."),
  logo: z.string(),
});

export type tradeSchemaType = z.infer<typeof tradeSchema>;
