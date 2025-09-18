import ClassRoomPageDocument from "@/components/page/admin/class_room/classRoomPageDocument";
import ClassesPageDocument from "@/components/page/admin/classes/classesPageDocument";
import EducationPageDocument from "@/components/page/admin/education/educationPageDocument";
import SectorPageDocument from "@/components/page/admin/sector/sectorPageComponet";
import { CollectionPageErrorStatic } from "@/components/page/admin/static/collectionPageStatic";
import TradePageDocument from "@/components/page/admin/trades/TradePageDocument";
import UserPageCollection from "@/components/page/admin/users/UserPageCollection";

export default async function CollectionPage(props: {
  params: Promise<{ collectionName: string }>;
}) {
  const params = await props.params;
  const { collectionName } = params;

  switch (collectionName) {
    case "users":
      return <UserPageCollection collectionName={collectionName} />;
    case "educations":
      return <EducationPageDocument collection={collectionName} />;
    case "sector":
      return <SectorPageDocument collection={collectionName} />;
    case "trades":
      return <TradePageDocument collection={collectionName} />;
    case "classes":
      return <ClassesPageDocument collection={collectionName} />;
    case "Class_room":
      return <ClassRoomPageDocument collection={collectionName} />;
    default:
      return <CollectionPageErrorStatic collection={collectionName} />;
  }
}
