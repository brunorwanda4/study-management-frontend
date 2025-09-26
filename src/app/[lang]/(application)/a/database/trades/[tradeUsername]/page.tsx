import TradeInformationCard from "@/components/page/admin/trades/trade-information-card";
import ErrorPage from "@/components/page/error-page";
import NotFoundPage from "@/components/page/not-found";
import { TradeModelWithOthers } from "@/lib/schema/admin/tradeSchema";
import { authUser } from "@/lib/utils/auth-user";
import apiRequest from "@/service/api-client";
import { redirect } from "next/navigation";

const TradeUsernamePage = async (props: {
  params: Promise<{ tradeUsername: string }>;
}) => {
  const params = await props.params;
  const { tradeUsername } = params;
  const auth = await authUser();
  if (!auth) redirect("/auth/login");
  const request = await apiRequest<void, TradeModelWithOthers>(
    "get",
    `/trades/username/others/${tradeUsername}`,
    undefined,
    auth.token,
  );
  if (request.statusCode === 404)
    return <NotFoundPage message={request.message} />;
  if (!request.data)
    return <ErrorPage message={request.message} error={request.error} />;

  return (
    <div>
      <TradeInformationCard trade={request.data} auth={auth} />
    </div>
  );
};

export default TradeUsernamePage;
