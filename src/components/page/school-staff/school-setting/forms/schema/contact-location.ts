// schemas/contact-location.ts
import { z } from "zod";
import { SchoolAddress, ContactSchema, SocialMediaSchema } from "@/lib/schema/school.dto";

export const ContactLocationSchema = z.object({
  address: SchoolAddress.optional(),
  contact: ContactSchema.optional(),
  website: z.string().url({ message: "Invalid website URL" }).optional(),
  socialMedia: z.array(SocialMediaSchema).optional(),
});

export type ContactLocationDto = z.infer<typeof ContactLocationSchema>;