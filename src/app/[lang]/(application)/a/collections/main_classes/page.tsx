import MainClassCollectionDetails from "@/components/page/admin/main-class/main-class-collection-ditails";
import MainClassesTableCollection from "@/components/page/admin/main-class/main-class-table-collection";
import ErrorPage from "@/components/page/error-page";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import { mainClassModelWithTrade } from "@/lib/schema/admin/main-classes-schema";
import { authUser } from "@/lib/utils/auth-user";
import apiRequest from "@/service/api-client";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "main classes collection | space-together",
  description: "All main classes in database",
};

const MainClassesPage = async () => {
  const auth = await authUser();
  if (!auth) redirect("/auth/login");
  const request = await apiRequest<void, mainClassModelWithTrade[]>(
    "get",
    "/main-classes/trade",
    undefined,
    { token: auth.token, realtime: "main_class" },
  );
  if (!request.data)
    return <ErrorPage message={request.message} error={request.error} />;

  return (
    <RealtimeProvider<mainClassModelWithTrade>
      channel="main_class"
      initialData={request.data}
    >
      <MainClassCollectionDetails initialClasses={request.data} />
      <MainClassesTableCollection
        initialClasses={request.data}
        realtimeEnabled
        auth={auth}
      />
    </RealtimeProvider>
  );
};

export default MainClassesPage;
