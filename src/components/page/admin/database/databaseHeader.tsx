import DataDetailsCard from "@/components/common/cards/data-details-card";
import { DatabaseStats } from "@/lib/types/databaseStatus";

interface props {
  data?: DatabaseStats;
}

const DatabaseHeader = ({ data }: props) => {
  const components = [
    {
      title: "Total size",
      size: data?.total_size_bytes,
      icon: "/icons/database.png",
    },
    {
      title: "Total collations",
      size: data?.total_collection,
      icon: "/icons/data-collection.png",
    },
    {
      title: "Total documents",
      size: `${data?.total_documents} docs`,
      icon: "/icons/memo.png",
    },
  ];
  return (
    <main className="grid grid-cols-4 gap-4">
      {components.map((item, i) => (
        <DataDetailsCard title={item.title} icon={item.icon} size={item.size} />
      ))}
    </main>
  );
};

export default DatabaseHeader;
