import DocumentPageStatic, {
  DocumentPageStaticError,
} from "@/components/page/admin/static/documentPageStatic";

import {
  fetchAllClassesType,
  fetchAllEducation,
} from "@/service/admin/fetchDataFn";
import CreateClassForm from "./createClassForm";

const CreateClassPage = async () => {
  const getEducations = await fetchAllEducation();
  const getClassTypes = await fetchAllClassesType();

  if ("message" in getEducations) {
    return (
      <DocumentPageStaticError
        error={getEducations}
        documentName={"Class-add"}
        collectionName={"classes"}
      />
    );
  }
  if ("message" in getClassTypes) {
    return (
      <DocumentPageStaticError
        error={getClassTypes}
        documentName={"Class-add"}
        collectionName={"classes"}
      />
    );
  }

  return (
    <DocumentPageStatic collectionName="classes" documentName="Class-add">
      <CreateClassForm classTypes={getClassTypes} educations={getEducations} />
    </DocumentPageStatic>
  );
};

export default CreateClassPage;
