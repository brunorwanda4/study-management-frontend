import ClassesPageDocument from "@/components/page/admin/classes/classesPageDocument";
import EducationPageDocument from "@/components/page/admin/education/educationPageDocument";
import { CollectionPageErrorStatic } from "@/components/page/admin/static/collectionPageStatic";
import TradePageDocument from "@/components/page/admin/trades/TradePageDocument";

export default async function CollectionPage(props: {
  params: Promise<{ collectionName: string }>;
}) {
  const params = await props.params;
  const { collectionName } = params;

  switch (collectionName) {
    case "educations":
      return <EducationPageDocument collection={collectionName} />;
    case "trades":
      return <TradePageDocument collection={collectionName} />;
    case "classes":
      return <ClassesPageDocument collection={collectionName} />;
    default:
      return <CollectionPageErrorStatic collection={collectionName} />;
  }
}
