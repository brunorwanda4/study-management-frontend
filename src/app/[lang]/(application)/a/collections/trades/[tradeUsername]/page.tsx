import TradeInformationCard from "@/components/page/admin/trades/trade-information-card";
import TradeMainClassesCard from "@/components/page/admin/trades/trade-main-classes-card";
import ErrorPage from "@/components/page/error-page";
import NotFoundPage from "@/components/page/not-found";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { MainClassModel } from "@/lib/schema/admin/main-classes-schema";
import type {
  TradeModelWithOthers,
  TradeModule,
} from "@/lib/schema/admin/tradeSchema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { Metadata } from "next";
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
  const auth = await authContext();
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

  const [mainClassRes] = await Promise.all([
    apiRequest<void, MainClassModel[]>(
      "get",
      `/main-classes/trade/${tradeRes.data._id || tradeRes.data.id}`,
      undefined,
      { token: auth.token, realtime: "trade" },
    ),
  ]);

  if (!mainClassRes.data)
    return (
      <ErrorPage message={mainClassRes.message} error={mainClassRes.error} />
    );

  return (
    <RealtimeProvider<TradeModule | MainClassModel>
      channels={[
        { name: "trade", initialData: [tradeRes.data] },
        { name: "main_class", initialData: mainClassRes.data },
      ]}
    >
      <main className="flex flex-col gap-4 lg:flex-row">
        <TradeInformationCard
          main_classes={mainClassRes.data}
          trade={tradeRes.data}
          auth={auth}
        />
        <div className="w-full">
          <TradeMainClassesCard
            trade={tradeRes.data}
            mainClasses={mainClassRes.data}
            auth={auth}
          />
        </div>
      </main>
    </RealtimeProvider>
  );
};

export default TradeUsernamePage;
