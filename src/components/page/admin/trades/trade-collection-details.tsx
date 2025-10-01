"use client";

import DataDetailsCard, {
  dataDetailsCardProps,
} from "@/components/common/cards/data-details-card";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import { TradeModelWithOthers } from "@/lib/schema/admin/tradeSchema";
import { TradeWithNonNullableId } from "@/lib/types/tradeModel";
import { useEffect, useState } from "react";

interface Props {
  initialTrades?: TradeWithNonNullableId[];
}

const TradeCollectionDetails = ({ initialTrades = [] }: Props) => {
  const { data: trades } = useRealtimeData<TradeWithNonNullableId>();
  const [displayTrades, setDisplayTrades] =
    useState<TradeModelWithOthers[]>(initialTrades);

  // Sync with realtime data when available
  useEffect(() => {
    if (trades && trades.length > 0) {
      setDisplayTrades(trades);
    }
  }, [trades]);

  // --- Aggregations ---
  const totalTrades = displayTrades.length;

  const typeCount = displayTrades.reduce<Record<string, number>>(
    (acc, trade) => {
      acc[trade.type] = (acc[trade.type] || 0) + 1;
      return acc;
    },
    {},
  );

  const sectorCount = displayTrades.reduce<Record<string, number>>(
    (acc, trade) => {
      const sectorName = trade.sector?.name || "Unassigned";
      acc[sectorName] = (acc[sectorName] || 0) + 1;
      return acc;
    },
    {},
  );

  const statusCount = displayTrades.reduce<Record<string, number>>(
    (acc, trade) => {
      const status = trade.disable ? "Disabled" : "Active";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    {},
  );

  // --- Cards configuration ---
  const cards: dataDetailsCardProps[] = [
    {
      title: "Total Trades",
      size: totalTrades,
      icon: "/icons/graduation-hat.png",
    },
    {
      title: "By Type",
      size: Object.keys(typeCount).length,
      icon: "/icons/application.png",
      items: Object.entries(typeCount).map(([key, value]) => ({ key, value })),
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

export default TradeCollectionDetails;
