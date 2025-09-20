import { z } from "zod";

export const AgeSchema = z
  .object({
    year: z
      .number()
      .min(1900, { message: "Year must be valid" })
      .max(new Date().getFullYear(), {
        message: "Year cannot be in the future",
      }),
    month: z
      .number()
      .min(1, { message: "Month must be between 1 and 12" })
      .max(12, { message: "Month must be between 1 and 12" }),
    day: z
      .number()
      .min(1, { message: "Day must be valid" })
      .max(31, { message: "Day must be valid" }),
  })
  .refine(
    ({ year, month, day }) => {
      const birthDate = new Date(year, month - 1, day);
      const today = new Date();

      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();

      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
      }

      return age >= 3 && age <= 95;
    },
    { message: "Age must be between 3 and 95 years old." },
  );

export type Age = z.infer<typeof AgeSchema>;
