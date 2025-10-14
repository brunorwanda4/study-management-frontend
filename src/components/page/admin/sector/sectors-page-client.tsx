"use client";

import SectorCollectionDetails from "@/components/page/admin/sector/sector-collection-details";
import SectorsTableCollection from "@/components/page/admin/sector/sectors-table-collection";
import { useRealtimeEntity } from "@/lib/hooks/useRealtime";
import { SectorModel } from "@/lib/schema/admin/sectorSchema";
import { AuthContext } from "@/lib/utils/auth-context";
import { useState } from "react";

interface SectorsPageClientProps {
  initialData: SectorModel[];
  auth: AuthContext;
}

const SectorsPageClient = ({ initialData, auth }: SectorsPageClientProps) => {
  const [sectors, setSectors] = useState<SectorModel[]>(initialData);

  // Set up real-time updates for sectors
  const { isConnected } = useRealtimeEntity<SectorModel>(
    "sector",
    // When a new sector is created
    (newSector) => {
      setSectors((prev) => {
        // Check if sector already exists
        const exists = prev.some(
          (s) =>
            s.id === newSector.id ||
            s._id === newSector.id ||
            s._id === newSector._id,
        );
        return exists ? prev : [...prev, newSector];
      });
    },
    // When a sector is updated
    (updatedSector) => {
      setSectors((prev) =>
        prev.map((sector) => {
          const sectorId = sector.id || sector._id;
          const updatedId = updatedSector.id || updatedSector._id;
          return sectorId === updatedId ? updatedSector : sector;
        }),
      );
    },
    // When a sector is deleted
    (deletedSectorId) => {
      setSectors((prev) =>
        prev.filter((sector) => {
          const sectorId = sector.id || sector._id;
          return sectorId !== deletedSectorId;
        }),
      );
    },
  );

  return (
    <div className="space-y-4">
      <SectorCollectionDetails
        data={sectors}
        // realtimeEnabled={true}
        // isConnected={isConnected}
      />
      <SectorsTableCollection
        auth={auth}
        data={sectors}
        realtimeEnabled={true}
        isConnected={isConnected}
      />
    </div>
  );
};

export default SectorsPageClient;
