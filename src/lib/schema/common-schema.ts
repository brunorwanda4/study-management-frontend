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

export const PaginatedSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    data: z.array(itemSchema),
    total: z.number().int(),
    total_pages: z.number().int(),
    current_page: z.number().int(),
  });

export interface Paginated<T> {
  data: T[];
  total: number;
  total_pages: number;
  current_page: number;
}
