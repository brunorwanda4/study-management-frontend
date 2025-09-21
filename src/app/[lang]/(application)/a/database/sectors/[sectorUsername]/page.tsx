import SectorInformationCard from "@/components/page/admin/sector/sector-information-card";
import ErrorPage from "@/components/page/error-page";
import NotFoundPage from "@/components/page/not-found";
import { SectorModel } from "@/lib/schema/admin/sectorSchema";
import { authUser } from "@/lib/utils/auth-user";
import apiRequest from "@/service/api-client";
import { redirect } from "next/navigation";

const SectorUsernamePage = async (props: {
  params: Promise<{ sectorUsername: string }>;
}) => {
  const params = await props.params;
  const { sectorUsername } = params;
  const auth = await authUser();
  if (!auth) redirect("/auth/login");
  const request = await apiRequest<void, SectorModel>(
    "get",
    `/sectors/username/${sectorUsername}`,
    undefined,
    auth.token,
  );
  if (request.statusCode === 404)
    return <NotFoundPage message={request.message} />;
  if (!request.data)
    return <ErrorPage message={request.message} error={request.error} />;

  return (
    <div>
      <SectorInformationCard sector={request.data} />
    </div>
  );
};

export default SectorUsernamePage;
