// schemas/basic-information.ts
import {
  SchoolMemberSchema,
  SchoolTypeEnum,
} from "@/lib/schema/school/school-schema";
import z from "zod";

export const BasicInformationSchema = z.object({
  logo: z.string().url({ message: "Invalid logo URL" }).optional(),
  name: z
    .string()
    .min(1, { message: "School name cannot be empty if provided" })
    .optional(),
  username: z
    .string()
    .min(1, { message: "Username cannot be empty if provided" })
    .optional(),
  description: z.string().optional(),
  school_type: SchoolTypeEnum.optional(),
  school_members: SchoolMemberSchema.optional(),
});

export type BasicInformationDto = z.infer<typeof BasicInformationSchema>;
