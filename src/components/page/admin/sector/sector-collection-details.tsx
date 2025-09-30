"use client";
import DataDetailsCard, {
  dataDetailsCardProps,
} from "@/components/common/cards/data-details-card";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import { SectorModel } from "@/lib/schema/admin/sectorSchema";
import { useEffect, useState } from "react";

interface Props {
  initialSectors?: SectorModel[];
}

const SectorCollectionDetails = ({ initialSectors = [] }: Props) => {
  const { data: sectors } = useRealtimeData<SectorModel>();
  const [displaySectors, setDisplaySectors] =
    useState<SectorModel[]>(initialSectors);

  // Sync with realtime data when available
  useEffect(() => {
    if (sectors && sectors.length > 0) {
      setDisplaySectors(sectors);
    }
  }, [sectors]);

  // --- Aggregations ---
  const totalSectors = displaySectors.length;

  const typeCount = displaySectors.reduce<Record<string, number>>(
    (acc, sector) => {
      acc[sector.type] = (acc[sector.type] || 0) + 1;
      return acc;
    },
    {},
  );

  const countryCount = displaySectors.reduce<Record<string, number>>(
    (acc, sector) => {
      acc[sector.country] = (acc[sector.country] || 0) + 1;
      return acc;
    },
    {},
  );

  // --- Cards configuration ---
  const cards: dataDetailsCardProps[] = [
    {
      title: "Total Sectors",
      size: totalSectors,
      icon: "/icons/graduation-hat.png",
    },
    {
      title: "By Type",
      size: Object.keys(typeCount).length,
      icon: "/icons/application.png",
      items: Object.entries(typeCount).map(([key, value]) => ({ key, value })),
    },
    {
      title: "Countries Represented",
      size: Object.keys(countryCount).length,
      icon: "/icons/world.png",
      items: Object.entries(countryCount).map(([key, value]) => ({
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

export default SectorCollectionDetails;
