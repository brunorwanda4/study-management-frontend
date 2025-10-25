import * as z from "zod";

export const JoinClassSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: "School username is required",
    })
    .min(50),
  code: z
    .string()
    .min(5, {
      message: "Minimum characters are 5",
    })
    .max(5),
});

export type JoinClassDto = z.infer<typeof JoinClassSchema>;
