import {
  AddressSchema,
  ContactSchema,
  SocialMediaSchema,
} from "@/lib/schema/common-details-schema";
import { z } from "zod";

export const ContactLocationSchema = z.object({
  address: AddressSchema.optional(),
  contact: ContactSchema.optional(),
  website: z.string().url({ message: "Invalid website URL" }).optional(),
  social_media: z.array(SocialMediaSchema).optional(),
});

export type ContactLocationDto = z.infer<typeof ContactLocationSchema>;
