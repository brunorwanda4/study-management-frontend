import z from "zod";
export const AgeSchema = z.object({
  year: z.number(),
  month: z.number(),
  day: z.number(),
});
export type Age = z.infer<typeof AgeSchema>;
