import ClassPageDocument from "@/components/page/admin/classes/classPageDucoment";
import { DocumentPageStaticError } from "@/components/page/admin/static/documentPageStatic";

const DocumentPage = async (props: {
  params: Promise<{ collectionName: string; documentId: string }>;
}) => {
  const params = await props.params;
  const { collectionName, documentId } = params;

  switch (collectionName) {
    case "classes":
      return (
        <ClassPageDocument
          collectionName={collectionName}
          documentId={documentId}
        />
      );
    default:
      return (
        <DocumentPageStaticError
          documentName={documentId}
          collectionName={collectionName}
        />
      );
  }
};

export default DocumentPage;
