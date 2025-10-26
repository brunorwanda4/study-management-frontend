import z from "zod";

const baseSectorFields = {
  name: z
    .string()
    .min(1, { message: "Sector name is required" })
    .max(50, { message: "Maximum character is 50" }),

  username: z
    .string()
    .min(1, { message: "Username is required" })
    .max(50, { message: "Maximum character is 50" }),

  description: z
    .string()
    .max(200, { message: "Maximum character is 200" })
    .optional(),

  logo: z.string().optional(),
  logo_id: z.string().optional(),

  curriculum: z.tuple([z.number(), z.number()]).optional(), // start-end years

  country: z.string().min(1, { message: "Country is required" }),

  type: z.enum(["global", "international", "local"], {
    required_error: "Sector type is required",
  }),
  disable: z.boolean().optional(),
};

export const createSectorSchema = z.object({
  ...baseSectorFields,
});

export type CreateSectorModel = z.infer<typeof createSectorSchema>;

// ----------------- UPDATE -----------------
export const updateSectorSchema = z.object({
  name: z.string().max(50).optional(),
  username: z.string().max(50).optional(),
  description: z.string().max(200).optional(),
  logo: z.string().optional(),
  logo_id: z.string().optional(),
  curriculum: z.tuple([z.number(), z.number()]).optional(),
  country: z.string().optional(),
  type: z.enum(["global", "international", "local"]).optional(),
  disable: z.boolean().optional(),
});

export type UpdateSectorModel = z.infer<typeof updateSectorSchema>;

// ----------------- FULL SECTOR (with id + timestamps) -----------------
export const sectorSchema = z.object({
  id: z.string(),
  _id: z.string().optional(),
  ...baseSectorFields,
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

export type SectorModel = z.infer<typeof sectorSchema>;
