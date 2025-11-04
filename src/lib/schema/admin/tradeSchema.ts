import { sectorSchema } from "@/lib/schema/admin/sectorSchema";
import { TradeTypeSchema } from "@/lib/schema/common-details-schema";
import z from "zod";

export const tradeSchema = z.object({
  id: z.string().optional(),
  _id: z.string().optional(),
  sector_id: z.string().optional().nullable(),
  trade_id: z.string().optional().nullable(), // self relation
  name: z
    .string()
    .min(1, { message: "Trade name is required" })
    .max(50, { message: "Maximum character is 50" }),
  username: z
    .string()
    .min(1, { message: "Username is required" })
    .max(50, { message: "Maximum character is 50" }),
  description: z.string().max(200).optional().nullable(),
  class_min: z
    .number()
    .min(0, { message: "Class minimum must be 0 or greater" }),
  class_max: z
    .number()
    .min(0, { message: "Class maximum must be 0 or greater" }),
  type: TradeTypeSchema,
  disable: z.boolean().optional().nullable(),
  created_at: z.date().optional().nullable(),
  updated_at: z.date().optional().nullable(),
});

export type TradeModule = z.infer<typeof tradeSchema>;

export const updateTradeSchema = z.object({
  sector_id: z.string().optional().nullable(),
  trade_id: z.string().optional().nullable(),
  name: z.string().max(50).optional(),
  username: z.string().max(50).optional(),
  description: z.string().max(200).optional().nullable(),
  class_min: z.number().min(0).optional(),
  class_max: z.number().min(0).optional(),
  type: z.enum(["Senior", "Primary", "Level", "Nursing"]).optional(),
  disable: z.boolean().optional(),
  updated_at: z.date().optional().nullable(),
});

export type UpdateTradeModule = z.infer<typeof updateTradeSchema>;

export const tradeWithParentSchema = z.object({
  ...tradeSchema.shape,
  sector: sectorSchema.optional().nullable(),
});

export type TradeWithParentSchemaType = z.infer<typeof tradeWithParentSchema>;

export const tradeWithOthersSchema = z.object({
  ...tradeSchema.shape,
  sector: sectorSchema.optional().nullable(),
  parent_trade: tradeWithParentSchema.optional().nullable(),
});

export type TradeModelWithOthers = z.infer<typeof tradeWithOthersSchema>;
