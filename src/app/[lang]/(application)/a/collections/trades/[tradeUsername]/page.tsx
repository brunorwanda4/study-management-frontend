import TradeInformationCard from "@/components/page/admin/trades/trade-information-card";
import ErrorPage from "@/components/page/error-page";
import NotFoundPage from "@/components/page/not-found";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import {
  TradeModelWithOthers,
  TradeModule,
} from "@/lib/schema/admin/tradeSchema";
import { authUser } from "@/lib/utils/auth-user";
import apiRequest from "@/service/api-client";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tradeUsername: string }>;
}): Promise<Metadata> {
  const { tradeUsername } = await params;
  return {
    title: `${tradeUsername} Trade | space-together`,
    description: `Details for trade ${tradeUsername}`,
  };
}

const TradeUsernamePage = async (props: {
  params: Promise<{ tradeUsername: string }>;
}) => {
  const params = await props.params;
  const { tradeUsername } = params;
  const auth = await authUser();
  if (!auth) redirect("/auth/login");
  const tradeRes = await apiRequest<void, TradeModelWithOthers>(
    "get",
    `/trades/username/others/${tradeUsername}`,
    undefined,
    { token: auth.token },
  );
  if (tradeRes.statusCode === 404)
    return <NotFoundPage message={tradeRes.message} />;
  if (!tradeRes.data)
    return <ErrorPage message={tradeRes.message} error={tradeRes.error} />;

  return (
    <RealtimeProvider<TradeModule>
      channels={[{ name: "trade", initialData: [tradeRes.data] }]}
    >
      <TradeInformationCard trade={tradeRes.data} auth={auth} />
    </RealtimeProvider>
  );
};

export default TradeUsernamePage;
