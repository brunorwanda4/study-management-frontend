import CollectionPageStatic, {
  CollectionPageErrorStatic,
} from "@/components/page/admin/static/collectionPageStatic";
import {
  fetchAllClassesRoom,
  fetchAllClassRoomType,
  fetchAllSector,
  fetchAllTrade,
} from "@/service/admin/fetchDataFn";
import AllClassRoomTable from "./allClassRoomTable";
import ClassRoomCollectionDetails from "./classRoomCollectionDetails";
import ClassRoomRoles from "./classRoomRoles";

interface props {
  collection: string;
}
const ClassRoomPageDocument = async ({ collection }: props) => {
  const getClassRoom = await fetchAllClassesRoom();

  if ("message" in getClassRoom) {
    return (
      <CollectionPageErrorStatic collection="education" error={getClassRoom} />
    );
  }

  const getClassRoomType = await fetchAllClassRoomType();
  if ("message" in getClassRoomType) {
    return (
      <CollectionPageErrorStatic
        collection="education"
        error={getClassRoomType}
      />
    );
  }

  const getSectors = await fetchAllSector();
  if ("message" in getSectors) {
    return (
      <CollectionPageErrorStatic collection="education" error={getSectors} />
    );
  }

  const getTrades = await fetchAllTrade();
  if ("message" in getTrades) {
    return (
      <CollectionPageErrorStatic collection="education" error={getTrades} />
    );
  }

  return (
    <CollectionPageStatic collection={collection}>
      <div className="flex min-h-48 justify-between gap-4">
        <ClassRoomCollectionDetails
          totalRoomClassRole={getClassRoomType.length}
          totalRoomClass={getClassRoom.length}
        />
        <ClassRoomRoles roles={getClassRoomType} />
      </div>
      <AllClassRoomTable
        classRoomTypes={getClassRoomType}
        sectors={getSectors}
        trades={getTrades}
        collectionName={collection}
        classRoom={getClassRoom}
      />
    </CollectionPageStatic>
  );
};

export default ClassRoomPageDocument;
