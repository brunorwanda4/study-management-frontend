import CollectionsTable from "@/components/page/admin/database/collections_table";
import DatabaseHeader from "@/components/page/admin/database/databaseHeader";
import ErrorPage from "@/components/page/error-page";
import type { DatabaseStats } from "@/lib/types/databaseStatus";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Collections | space-together",
  description: "All things are in collections",
};

const CollectionsPage = async () => {
  const auth = await authContext();
  if (!auth) redirect("/auth/login");
  const request = await apiRequest<void, DatabaseStats>(
    "get",
    "/database/status",
    undefined,
    { token: auth.token },
  );

  if (!request.data) {
    return <ErrorPage message={request.message} />;
  }

  return (
    <div className="happy-page space-y-4">
      <DatabaseHeader data={request.data} />
      <CollectionsTable data={request.data} />
    </div>
  );
};

export default CollectionsPage;
