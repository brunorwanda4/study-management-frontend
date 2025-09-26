import MainClassCollectionDetails from "@/components/page/admin/main-class/main-class-collection-ditails";
import MainClassesTableCollection from "@/components/page/admin/main-class/main-class-table-collection";
import ErrorPage from "@/components/page/error-page";
import { mainClassModelWithTrade } from "@/lib/schema/admin/main-classes-schema";
import { authUser } from "@/lib/utils/auth-user";
import apiRequest from "@/service/api-client";
import { redirect } from "next/navigation";

const MainClassesPage = async () => {
  const auth = await authUser();
  if (!auth) redirect("/auth/login");
  const request = await apiRequest<void, mainClassModelWithTrade[]>(
    "get",
    "/main-classes/trade",
    undefined,
    auth.token,
  );
  if (!request.data)
    return <ErrorPage message={request.message} error={request.error} />;

  return (
    <div className="space-y-4">
      <MainClassCollectionDetails data={request.data} />
      <MainClassesTableCollection data={request.data} auth={auth} />
    </div>
  );
};

export default MainClassesPage;
