import SectorCollectionDetails from "@/components/page/admin/sector/sector-collection-details";
import SectorsTableCollection from "@/components/page/admin/sector/sectors-table-collection";
import ErrorPage from "@/components/page/error-page";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import { SectorModel } from "@/lib/schema/admin/sectorSchema";
import { authUser } from "@/lib/utils/auth-user";
import apiRequest from "@/service/api-client";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sectors - collection",
  description: "All sectors in database",
};

const SectorsPage = async () => {
  const auth = await authUser();
  if (!auth) redirect("/auth/login");

  const request = await apiRequest<void, SectorModel[]>(
    "get",
    "/sectors",
    undefined,
    { token: auth.token, realtime: "sector" },
  );

  if (!request.data)
    return <ErrorPage message={request.message} error={request.error} />;

  return (
    <RealtimeProvider<SectorModel> channel="sector" initialData={request.data}>
      <SectorCollectionDetails initialSectors={request.data} />
      <SectorsTableCollection realtimeEnabled auth={auth} />
    </RealtimeProvider>
  );
};

export default SectorsPage;
