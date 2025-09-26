import {
  tradeSchema,
  tradeWithOthersSchema,
} from "@/lib/schema/admin/tradeSchema";
import z from "zod";

// ------------------- Base schema for MainClass -------------------
export const mainClassSchema = z.object({
  id: z.string().optional(), // maps to ObjectId in Rust backend
  _id: z.string().optional(), // maps to ObjectId in Rust backend
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Maximum character is 50" }),
  username: z
    .string()
    .min(1, { message: "Username is required" })
    .max(50, { message: "Maximum character is 50" }),
  trade_id: z.string().optional(), // maps to Option<ObjectId>
  description: z
    .string()
    .max(200, { message: "Maximum character is 200" })
    .optional(),
  disable: z.boolean().optional(),
  created_at: z.string().datetime().optional(), // DateTime<Utc>
  updated_at: z.string().datetime().optional(),
});

export type MainClassModel = z.infer<typeof mainClassSchema>;

// ------------------- Schema for updating MainClass -------------------
export const updateMainClassSchema = z.object({
  name: z.string().max(50).optional(),
  username: z.string().max(50).optional(),
  trade_id: z.string().optional(),
  description: z.string().max(200).optional(),
  disable: z.boolean().optional(),
  updated_at: z.string().datetime().optional(),
});

export type UpdateMainClassModel = z.infer<typeof updateMainClassSchema>;

export const mainClassModelWithOthersSchema = z.object({
  ...mainClassSchema.shape, // flatten MainClass
  trade: tradeWithOthersSchema.optional(),
});

export type MainClassModelWithOthers = z.infer<
  typeof mainClassModelWithOthersSchema
>;

export const mainClassModelWithTradeSchema = z.object({
  ...mainClassSchema.shape,
  trade: tradeSchema,
});

export type mainClassModelWithTrade = z.infer<
  typeof mainClassModelWithTradeSchema
>;
