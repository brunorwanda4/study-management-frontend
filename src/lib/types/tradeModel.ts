import { TradeModelWithOthers } from "@/lib/schema/admin/tradeSchema";

export type TradeWithNonNullableId = Omit<
  TradeModelWithOthers,
  "id" | "_id"
> & {
  id?: string;
  _id?: string;
};
