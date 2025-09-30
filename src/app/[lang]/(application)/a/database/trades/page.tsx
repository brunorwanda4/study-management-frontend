import TradeCollectionDetails from "@/components/page/admin/trades/trade-collection-details";
import TradesTableCollection from "@/components/page/admin/trades/trade-trable-collection";
import ErrorPage from "@/components/page/error-page";
import { TradeModelWithOthers } from "@/lib/schema/admin/tradeSchema";
import { authUser } from "@/lib/utils/auth-user";
import apiRequest from "@/service/api-client";
import { redirect } from "next/navigation";

const TradesPage = async () => {
  const auth = await authUser();
  if (!auth) redirect("/auth/login");
  const request = await apiRequest<void, TradeModelWithOthers[]>(
    "get",
    "/trades/others",
    undefined,
    { token: auth.token },
  );
  if (!request.data)
    return <ErrorPage message={request.message} error={request.error} />;

  return (
    <div className="space-y-4">
      <TradeCollectionDetails data={request.data} />
      <TradesTableCollection data={request.data} auth={auth} />
    </div>
  );
};

export default TradesPage;
