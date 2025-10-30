import {
  CommunicationMethodSchema,
  SocialMediaSchema,
} from "@/lib/schema/common-details-schema";
import z from "zod";

// ----------------------commutation---------------------------
export const SocialAndCommunicationSchema = z.object({
  social_media: z.array(SocialMediaSchema).optional(),
  preferred_communication_method: z.array(CommunicationMethodSchema).optional(),
});

export type SocialAndCommunication = z.infer<
  typeof SocialAndCommunicationSchema
>;
