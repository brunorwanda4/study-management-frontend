import { z } from "zod";

export const announcementSchema = z.object({
  content: z.string().min(10).max(500),
  mention: z.array(z.string().min(1).max(120)),
});

export type Announcement = z.infer<typeof announcementSchema>;
