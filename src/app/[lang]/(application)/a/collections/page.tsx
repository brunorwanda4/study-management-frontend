import PageTitle from "@/components/common/page-title";
import AllCollectionInCollection from "@/components/page/admin/dashboard/collections/all_collection-in-collections";

const CollectionPage = () => {
  return (
    <div className="happy-page">
      <PageTitle title="Collections" />
      <div className="w-full space-y-4">
        <AllCollectionInCollection />
      </div>
    </div>
  );
};

export default CollectionPage;
