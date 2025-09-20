import z from "zod";

export const AddressSchema = z.object({
  country: z.string(),
  province: z.string().optional(),
  district: z.string().optional(),
  sector: z.string().optional(),
  cell: z.string().optional(),
  village: z.string().optional(),
  state: z.string().optional(),
  postal_code: z.string().optional(),
  google_map_url: z.string().optional(),
});
export type Address = z.infer<typeof AddressSchema>;
