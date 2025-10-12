// schemas/contact-location.ts
import {
  ContactSchema,
  SchoolAddress,
  SocialMediaSchema,
} from "@/lib/schema/school/school.dto";
import { z } from "zod";

export const ContactLocationSchema = z.object({
  address: SchoolAddress.optional(),
  contact: ContactSchema.optional(),
  website: z.string().url({ message: "Invalid website URL" }).optional(),
  socialMedia: z.array(SocialMediaSchema).optional(),
});

export type ContactLocationDto = z.infer<typeof ContactLocationSchema>;
