import z from "zod";

export const educationSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Education name is required",
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
    .max(400, {
      message: "Maximum character is 400",
    }),
  logo: z.string(),
});

export type educationSchemaType = z.infer<typeof educationSchema>;
