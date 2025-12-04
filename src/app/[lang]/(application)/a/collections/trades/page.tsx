import TradeCollectionDetails from "@/components/page/admin/trades/trade-collection-details";
import TradesTableCollection from "@/components/page/admin/trades/trade-trable-collection";
import ErrorPage from "@/components/page/error-page";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { TradeModelWithOthers } from "@/lib/schema/admin/tradeSchema";
import type { TradeWithNonNullableId } from "@/lib/types/tradeModel";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Trades collection | space-together",
  description: "All trades in database",
};

const TradesPage = async () => {
  const auth = await authContext();
  if (!auth) redirect("/auth/login");
  const request = await apiRequest<void, TradeModelWithOthers[]>(
    "get",
    "/trades/others",
    undefined,
    { token: auth.token, realtime: "trade" },
  );
  if (!request.data)
    return <ErrorPage message={request.message} error={request.error} />;

  const initialData: TradeWithNonNullableId[] = request.data.map((t) => {
    const { id, _id, ...rest } = t;
    return {
      ...rest,
      id: id ?? undefined,
      _id: _id ?? undefined,
    };
  });

  return (
    <RealtimeProvider<TradeWithNonNullableId>
      channel="trade"
      initialData={initialData}
    >
      <TradeCollectionDetails initialTrades={initialData} />
      <TradesTableCollection
        realtimeEnabled
        initialTrades={initialData}
        auth={auth}
      />
    </RealtimeProvider>
  );
};

export default TradesPage;
