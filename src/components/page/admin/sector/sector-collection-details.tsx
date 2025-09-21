import DataDetailsCard, {
  dataDetailsCardProps,
} from "@/components/common/cards/data-details-card";
import { SectorModel } from "@/lib/schema/admin/sectorSchema";

const SectorCollectionDetails = ({ data }: { data: SectorModel[] }) => {
  // 1. Total sectors
  const totalSectors = data.length;

  // 2. Group by type
  const typeCount: Record<string, number> = {};
  data.forEach((sector) => {
    typeCount[sector.type] = (typeCount[sector.type] || 0) + 1;
  });

  // 3. Countries represented
  const countryCount: Record<string, number> = {};
  data.forEach((sector) => {
    countryCount[sector.country] = (countryCount[sector.country] || 0) + 1;
  });

  const components: dataDetailsCardProps[] = [
    {
      title: "Total Sectors",
      size: totalSectors,
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
      title: "Countries Represented",
      size: Object.keys(countryCount).length,
      icon: "/icons/world.png",
      items: Object.entries(countryCount).map(([key, value]) => ({
        key, // country name
        value, // number of sectors in that country
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

export default SectorCollectionDetails;
