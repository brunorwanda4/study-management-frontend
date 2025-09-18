import CreateClassPage from "@/components/page/admin/classes/CreateClassPage";
import { DocumentPageStaticError } from "@/components/page/admin/static/documentPageStatic";

const AddNewItemInCollectionPage = async (props: {
  params: Promise<{ collectionName: string; documentId: string }>;
}) => {
  const params = await props.params;
  const { collectionName, documentId } = params;

  switch (collectionName) {
    case "classes":
      return <CreateClassPage />;
    default:
      return (
        <DocumentPageStaticError
          documentName={documentId}
          collectionName={collectionName}
        />
      );
  }
};

export default AddNewItemInCollectionPage;
