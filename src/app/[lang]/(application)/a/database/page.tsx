import PageTitle from "@/components/common/page-title";
import CollectionsCharts from "@/components/page/admin/database/collections_cards";
import DatabaseHeader from "@/components/page/admin/database/databaseHeader";
import { DatabaseStats } from "@/lib/types/databaseStatus";
import { FetchError } from "@/lib/types/fetchErr";
import { fetchDatabaseStatus } from "@/service/admin/databaseStatusService";

const Home = async () => {
  let data: DatabaseStats | null = null;
  let error: FetchError | null = null;

  try {
    const result = await fetchDatabaseStatus();

    if (result && "message" in result) {
      error = result;
    } else if (result) {
      data = result;
    }
  } catch (err) {
    error = {
      message: "An unexpected error occurred",
      details: (err as Error).message,
    };
  }

  return (
    <div className="happy-page">
      <div>
        <PageTitle title="Database" />
      </div>
      <DatabaseHeader data={data} error={error} />
      <div>
        <CollectionsCharts data={data} error={error} />
      </div>
      <div className="h-screen" />
    </div>
  );
};

export default Home;
