"use client";

import DataDetailsCard, {
  dataDetailsCardProps,
} from "@/components/common/cards/data-details-card";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import { mainClassModelWithTrade } from "@/lib/schema/admin/main-classes-schema";
import { useEffect, useState } from "react";

interface Props {
  initialClasses?: mainClassModelWithTrade[];
}

const MainClassCollectionDetails = ({ initialClasses = [] }: Props) => {
  const { data: classes } =
    useRealtimeData<mainClassModelWithTrade>("main_class");
  const [displayClasses, setDisplayClasses] =
    useState<mainClassModelWithTrade[]>(initialClasses);

  // Sync with realtime data when available
  useEffect(() => {
    if (classes && classes.length > 0) {
      setDisplayClasses(classes);
    }
  }, [classes]);

  // --- Aggregations ---
  const totalClasses = displayClasses.length;

  const statusCount = displayClasses.reduce<Record<string, number>>(
    (acc, cls) => {
      const status = cls.disable ? "Disabled" : "Active";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    {},
  );

  const tradeCount = displayClasses.reduce<Record<string, number>>(
    (acc, cls) => {
      const tradeName = cls.trade?.name || "Unassigned";
      acc[tradeName] = (acc[tradeName] || 0) + 1;
      return acc;
    },
    {},
  );

  // --- Cards configuration ---
  const cards: dataDetailsCardProps[] = [
    {
      title: "Total Classes",
      size: totalClasses,
      icon: "/icons/classroom.png",
    },
    {
      title: "Status",
      size: Object.keys(statusCount).length,
      icon: "/icons/clipboard.png",
      items: Object.entries(statusCount).map(([key, value]) => ({
        key,
        value,
      })),
    },
    {
      title: "By Trade",
      size: Object.keys(tradeCount).length,
      icon: "/icons/graduation-hat.png",
      items: Object.entries(tradeCount).map(([key, value]) => ({
        key,
        value,
      })),
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <DataDetailsCard
          key={index}
          title={card.title}
          icon={card.icon}
          size={card.size}
          items={card.items}
        />
      ))}
    </section>
  );
};

export default MainClassCollectionDetails;
