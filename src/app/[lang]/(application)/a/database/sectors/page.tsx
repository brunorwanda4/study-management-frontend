import SectorCollectionDetails from "@/components/page/admin/sector/sector-collection-details";
import SectorsTableCollection from "@/components/page/admin/sector/sectors-table-collection";
import ErrorPage from "@/components/page/error-page";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import { SectorModel } from "@/lib/schema/admin/sectorSchema";
import { authUser } from "@/lib/utils/auth-user";
import apiRequest from "@/service/api-client";
import { redirect } from "next/navigation";

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
      <div className="space-y-4">
        <SectorCollectionDetails initialSectors={request.data} />
        <SectorsTableCollection auth={auth} />
      </div>
    </RealtimeProvider>
  );
};

export default SectorsPage;
