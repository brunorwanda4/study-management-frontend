import CollectionPageStatic, {
  CollectionPageErrorStatic,
} from "@/components/page/admin/static/collectionPageStatic";
import {
  fetchAllClasses,
  fetchAllClassesType,
  fetchAllEducation,
} from "@/service/admin/fetchDataFn";
import AllClassesTable from "./allClassesTable";
import ClassesCollectionDetails from "./classCollectionDetails";
import ClassRoles from "./classesRoles";

interface props {
  collection: string;
}
const ClassesPageDocument = async ({ collection }: props) => {
  const getClasses = await fetchAllClasses();

  if ("message" in getClasses) {
    return (
      <CollectionPageErrorStatic collection="education" error={getClasses} />
    );
  }

  const getClassesType = await fetchAllClassesType();
  if ("message" in getClassesType) {
    return (
      <CollectionPageErrorStatic
        collection="education"
        error={getClassesType}
      />
    );
  }

  const getEducations = await fetchAllEducation();
  if ("message" in getEducations) {
    return (
      <CollectionPageErrorStatic error={getEducations} collection={"classes"} />
    );
  }

  return (
    <CollectionPageStatic collection={collection}>
      <div className="flex min-h-48 justify-between gap-4">
        <ClassesCollectionDetails
          totalClassesRole={getClassesType.length}
          totalClasses={getClasses.length}
        />
        <ClassRoles roles={getClassesType} />
      </div>
      <AllClassesTable
        classTypes={getClassesType}
        educations={getEducations}
        collectionName={collection}
        classes={getClasses}
      />
    </CollectionPageStatic>
  );
};

export default ClassesPageDocument;
