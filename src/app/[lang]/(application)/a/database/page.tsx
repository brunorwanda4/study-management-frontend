import CollectionsCharts from "@/components/page/admin/database/collections_cards";
import DatabaseHeader from "@/components/page/admin/database/databaseHeader";
import ErrorPage from "@/components/page/error-page";
import { DatabaseStats } from "@/lib/types/databaseStatus";
import apiRequest from "@/service/api-client";

const DatabasePage = async () => {
  const request = await apiRequest<void, DatabaseStats>(
    "get",
    "/database/status",
  );

  if (!request.data) {
    return <ErrorPage message={request.message} />;
  }

  return (
    <div className="happy-page space-y-4">
      <DatabaseHeader data={request.data} />
      <div>
        <CollectionsCharts data={request.data} />
      </div>
      <div className="h-screen" />
    </div>
  );
};

export default DatabasePage;
