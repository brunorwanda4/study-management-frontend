import SectorCollectionDetails from "@/components/page/admin/sector/sector-collection-details";
import SectorsTableCollection from "@/components/page/admin/sector/sectors-table-collection";
import ErrorPage from "@/components/page/error-page";
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
    auth.token,
  );
  if (!request.data)
    return <ErrorPage message={request.message} error={request.error} />;

  return (
    <div className="space-y-4">
      <SectorCollectionDetails data={request.data} />
      <SectorsTableCollection auth={auth} data={request.data} />
    </div>
  );
};

export default SectorsPage;
