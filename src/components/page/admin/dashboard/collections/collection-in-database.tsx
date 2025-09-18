import CardError from "@/components/common/card-error";
import { DatabaseStats } from "@/lib/types/databaseStatus";
import apiRequest from "@/service/api-client";
import CollectionInDBMain from "./collection-in-DB-main";
import CollectionInPasentage from "./collection-in-pasentage";

const CollectionInDatabase = async () => {
  const databaseStatus = await apiRequest<void, DatabaseStats>(
    "get",
    "/database/status",
    undefined,
  );
  return (
    <div className="w-full">
      <div className="flex w-full gap-4">
        {databaseStatus.error || !databaseStatus.data ? (
          <CardError
            error={{
              message: databaseStatus.message,
              details: databaseStatus.error,
              status: databaseStatus.statusCode,
            }}
          />
        ) : (
          <CollectionInPasentage data={databaseStatus.data} />
        )}
        <CollectionInDBMain />
      </div>
    </div>
  );
};

export default CollectionInDatabase;
