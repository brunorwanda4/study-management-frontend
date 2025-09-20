import MyImage from "@/components/common/myImage";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
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
        <Card className="pb-0" key={i}>
          <CardHeader className="border-b-0">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <CardTitle>{item.title}</CardTitle>
                <span className="text-2xl font-semibold">{item.size}</span>
              </div>
              <MyImage
                src={item.icon}
                className="size-12"
                alt={`icon: ${item.icon}`}
              />
            </div>
          </CardHeader>
        </Card>
      ))}
    </main>
  );
};

export default DatabaseHeader;
