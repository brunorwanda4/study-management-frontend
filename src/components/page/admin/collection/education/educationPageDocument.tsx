import CollectionPageStatic from "@/components/page/admin/static/collectionPageStatic";
import AllEducationComponent from "./allEducationComponent";
import CreateEducationDialog from "./createEducationDialog";

interface props {
  collection: string;
}
const EducationPageDocument = ({ collection }: props) => {
  return (
    <CollectionPageStatic collection={collection}>
      <div className="flex items-center justify-between">
        <h2 className="happy-title-base">Education system supported</h2>
        <CreateEducationDialog />
      </div>
      <AllEducationComponent />
    </CollectionPageStatic>
  );
};

export default EducationPageDocument;
