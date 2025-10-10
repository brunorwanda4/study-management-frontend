import SectorInformationCard from "@/components/page/admin/sector/sector-information-card";
import ErrorPage from "@/components/page/error-page";
import NotFoundPage from "@/components/page/not-found";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import { SectorModel } from "@/lib/schema/admin/sectorSchema";
import { authUser } from "@/lib/utils/auth-user";
import apiRequest from "@/service/api-client";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sectorUsername: string }>;
}): Promise<Metadata> {
  const { sectorUsername } = await params;
  return {
    title: `${sectorUsername} | Sector`,
    description: `Details for Sector ${sectorUsername}`,
  };
}

const SectorUsernamePage = async (props: {
  params: Promise<{ sectorUsername: string }>;
}) => {
  const params = await props.params;
  const { sectorUsername } = params;
  const auth = await authUser();
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

  return (
    <RealtimeProvider<SectorModel>
      channels={[{ name: "sector", initialData: [sectorRes.data] }]}
    >
      <main>
        <SectorInformationCard auth={auth} sector={sectorRes.data} />
      </main>
    </RealtimeProvider>
  );
};

export default SectorUsernamePage;
