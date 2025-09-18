import CollectionPageStatic, {
  CollectionPageErrorStatic,
} from "@/components/page/admin/static/collectionPageStatic";
import { fetchAllEducation, fetchAllSector } from "@/service/admin/fetchDataFn";
import CreateSectorDialog from "./CreateSectorDialog";
import AllSectorTable from "./allSectorTable";
// import AllEducationComponent from "./allEducationComponent"

interface props {
  collection: string;
}
const SectorPageDocument = async ({ collection }: props) => {
  const getSectors = await fetchAllSector();

  if ("message" in getSectors) {
    return <CollectionPageErrorStatic collection="Sector" error={getSectors} />;
  }

  const getEducation = await fetchAllEducation();

  if ("message" in getEducation) {
    return (
      <CollectionPageErrorStatic collection="education" error={getEducation} />
    );
  }

  return (
    <CollectionPageStatic collection={collection}>
      <div className="flex items-center justify-between">
        <h2 className="happy-title-base">Sector for education</h2>
        <CreateSectorDialog education={getEducation} />
      </div>
      <AllSectorTable
        educations={getEducation}
        collectionName="sector"
        sectors={getSectors}
      />
    </CollectionPageStatic>
  );
};

export default SectorPageDocument;
