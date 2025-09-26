"use client";

import DataDetailsCard, {
  dataDetailsCardProps,
} from "@/components/common/cards/data-details-card";
import { mainClassModelWithTrade } from "@/lib/schema/admin/main-classes-schema";

const MainClassCollectionDetails = ({
  data,
}: {
  data: mainClassModelWithTrade[];
}) => {
  // 1. Total classes
  const totalClasses = data.length;

  // 2. Disabled vs Active
  const activeCount = data.filter((cls) => !cls.disable).length;
  const disabledCount = totalClasses - activeCount;

  // 3. Group by Trade
  const tradeCount: Record<string, number> = {};
  data.forEach((cls) => {
    const tradeName = cls.trade?.name || "Unassigned";
    tradeCount[tradeName] = (tradeCount[tradeName] || 0) + 1;
  });

  const components: dataDetailsCardProps[] = [
    {
      title: "Total Classes",
      size: totalClasses,
      icon: "/icons/classroom.png",
    },
    {
      title: "Status",
      size: totalClasses,
      icon: "/icons/clipboard.png",
      items: [
        { key: "Active", value: activeCount },
        { key: "Disabled", value: disabledCount },
      ],
    },
    {
      title: "By Trade",
      size: Object.keys(tradeCount).length,
      icon: "/icons/graduation-hat.png",
      items: Object.entries(tradeCount).map(([key, value]) => ({
        key, // trade name
        value, // number of classes
      })),
    },
  ];

  return (
    <main className="grid grid-cols-4 gap-4 max-lg:grid-cols-2">
      {components.map((item, i) => (
        <DataDetailsCard
          key={i}
          title={item.title}
          icon={item.icon}
          size={item.size}
          items={item.items}
        />
      ))}
    </main>
  );
};

export default MainClassCollectionDetails;
