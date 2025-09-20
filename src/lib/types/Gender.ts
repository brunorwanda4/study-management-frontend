import z from "zod";

export const GenderSchema = z.enum(["MALE", "FEMALE", "OTHER"]);
export type Gender = z.infer<typeof GenderSchema>;

export const gender = {
  MALE: "MALE" as Gender,
  FEMALE: "FEMALE" as Gender,
  OTHER: "OTHER" as Gender,
};

export const genders: { id: Gender; role: string }[] = [
  { id: "MALE", role: "Male" },
  { id: "FEMALE", role: "Female" },
  { id: "OTHER", role: "Other" },
];
