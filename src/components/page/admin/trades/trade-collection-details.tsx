"use client";

import DataDetailsCard, {
  dataDetailsCardProps,
} from "@/components/common/cards/data-details-card";
import { TradeModelWithOthers } from "@/lib/schema/admin/tradeSchema"; // adjust path if needed

const TradeCollectionDetails = ({ data }: { data: TradeModelWithOthers[] }) => {
  // 1. Total trades
  const totalTrades = data.length;

  // 2. Group by type (Senior, Primary, Level, Nursing)
  const typeCount: Record<string, number> = {};
  data.forEach((trade) => {
    typeCount[trade.type] = (typeCount[trade.type] || 0) + 1;
  });

  // 3. Group by sector (if available)
  const sectorCount: Record<string, number> = {};
  data.forEach((trade) => {
    const sectorName = trade.sector?.name || "Unassigned";
    sectorCount[sectorName] = (sectorCount[sectorName] || 0) + 1;
  });

  // 4. Disabled vs Active
  const statusCount = {
    Disabled: data.filter((t) => t.disable).length,
    Active: data.filter((t) => !t.disable).length,
  };

  const components: dataDetailsCardProps[] = [
    {
      title: "Total Trades",
      size: totalTrades,
      icon: "/icons/graduation-hat.png",
    },
    {
      title: "By Type",
      size: Object.keys(typeCount).length,
      icon: "/icons/application.png",
      items: Object.entries(typeCount).map(([key, value]) => ({
        key,
        value,
      })),
    },
    {
      title: "By Sector",
      size: Object.keys(sectorCount).length,
      icon: "/icons/folder.png",
      items: Object.entries(sectorCount).map(([key, value]) => ({
        key,
        value,
      })),
    },
    {
      title: "Status",
      size: Object.keys(statusCount).length,
      icon: "/icons/checked.png",
      items: Object.entries(statusCount).map(([key, value]) => ({
        key,
        value,
      })),
    },
  ];

  return (
    <main className="grid grid-cols-4 gap-4">
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

export default TradeCollectionDetails;
