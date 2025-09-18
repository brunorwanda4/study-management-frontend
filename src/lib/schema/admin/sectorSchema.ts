import z from "zod";

export const sectorSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "sector name is required",
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
  education: z.string(),
  description: z
    .string()
    .min(1, {
      message: "Description  is required",
    })
    .max(200, {
      message: "Maximum character is 200",
    }),
  logo: z.string(),
});

export type sectorSchemaType = z.infer<typeof sectorSchema>;
