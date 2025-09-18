import UpdateClassPage from "@/components/page/admin/classes/updateClassPage";
import { DocumentPageStaticError } from "@/components/page/admin/static/documentPageStatic";

const AddNewItemInCollectionPage = async (props: {
  params: Promise<{ collectionName: string; updateDocumentId: string }>;
}) => {
  const params = await props.params;
  const { collectionName, updateDocumentId } = params;

  switch (collectionName) {
    case "classes":
      return <UpdateClassPage classId={updateDocumentId} />;
    default:
      return (
        <DocumentPageStaticError
          documentName={updateDocumentId}
          collectionName={collectionName}
        />
      );
  }
};

export default AddNewItemInCollectionPage;
