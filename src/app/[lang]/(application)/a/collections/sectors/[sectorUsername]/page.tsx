import SectorInformationCard from "@/components/page/admin/sector/sector-information-card";
import SectorTradesCard from "@/components/page/admin/sector/sector-trades-card";
import ErrorPage from "@/components/page/error-page";
import NotFoundPage from "@/components/page/not-found";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { SectorModel } from "@/lib/schema/admin/sectorSchema";
import type { TradeModule } from "@/lib/schema/admin/tradeSchema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sectorUsername: string }>;
}): Promise<Metadata> {
  const { sectorUsername } = await params;
  return {
    title: `${sectorUsername} Sector | space-together`,
    description: `Details for Sector ${sectorUsername}`,
  };
}

const SectorUsernamePage = async (props: {
  params: Promise<{ sectorUsername: string }>;
}) => {
  const params = await props.params;
  const { sectorUsername } = params;
  const auth = await authContext();
  if (!auth) redirect("/auth/login");

  const sectorRes = await apiRequest<void, SectorModel>(
    "get",
    `/sectors/username/${sectorUsername}`,
    undefined,
    { token: auth.token, realtime: "sector" },
  );
  if (sectorRes.statusCode === 404)
    return <NotFoundPage message={sectorRes.message} />;
  if (!sectorRes.data)
    return <ErrorPage message={sectorRes.message} error={sectorRes.error} />;

  const [tradesRes] = await Promise.all([
    apiRequest<void, TradeModule[]>(
      "get",
      `/trades/sector/${sectorRes.data._id || sectorRes.data.id}`,
      undefined,
      { token: auth.token, realtime: "trade" },
    ),
  ]);

  if (!tradesRes.data)
    return <ErrorPage message={tradesRes.message} error={tradesRes.error} />;

  return (
    <RealtimeProvider<SectorModel | TradeModule>
      channels={[
        { name: "sector", initialData: [sectorRes.data] },
        { name: "trade", initialData: tradesRes.data },
      ]}
    >
      <main className="flex flex-col gap-4 lg:flex-row">
        <SectorInformationCard auth={auth} sector={sectorRes.data} />
        <div className="w-full">
          <SectorTradesCard
            sector={sectorRes.data}
            trades={tradesRes.data}
            auth={auth}
          />
        </div>
      </main>
    </RealtimeProvider>
  );
};

export default SectorUsernamePage;
