"use client";

import DeleteSectorDialog from "@/components/page/admin/sector/deleteSectorDialog";
import SectorDisableDialog from "@/components/page/admin/sector/sector-disable-dialog";
import UpdateSectorDialog from "@/components/page/admin/sector/updateSectorDialog";
import OpenImages from "@/components/page/admin/users/open-images";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import { SectorModel } from "@/lib/schema/admin/sectorSchema";
import { AuthUserResult } from "@/lib/utils/auth-user";
import { formatReadableDate } from "@/lib/utils/format-date";
import { useEffect, useState } from "react";

interface PropsSector {
  sector: SectorModel;
  auth: AuthUserResult;
}

const SectorInformationCard = ({ sector, auth }: PropsSector) => {
  const { data } = useRealtimeData<SectorModel>("main_sector");
  const [currentSector, setCurrentSector] = useState(sector);

  useEffect(() => {
    if (data && data.length > 0) {
      const updated = data.find((d) => d._id === sector._id);
      if (updated) setCurrentSector(updated);
    }
  }, [data, sector._id]);

  return (
    <Card className="max-w-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Sector</CardTitle>
          <div className="flex items-center gap-4">
            <UpdateSectorDialog isIcon sector={currentSector} auth={auth} />
            <SectorDisableDialog isIcon sector={currentSector} auth={auth} />
            <DeleteSectorDialog sector={currentSector} auth={auth} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <aside className="md:w-72">
          {/* Logo */}
          <OpenImages
            images={currentSector.logo || "/images/default-sector.png"}
            className="h-60 md:size-72"
            classname=" object-contain"
          />

          <div className="mt-2 space-y-2">
            {/* Name */}
            {currentSector.name && (
              <h1 className="text-2xl font-medium">{currentSector.name}</h1>
            )}

            {/* Username */}
            {currentSector.username && (
              <div className="flex gap-2">
                <p className="text-xl font-normal opacity-80">
                  @{currentSector.username}
                </p>
              </div>
            )}

            {/* Description */}
            {currentSector.description && (
              <div>
                <span>Description:</span>
                <p className="font-medium">{currentSector.description}</p>
              </div>
            )}

            {/* Country */}
            {currentSector.country && (
              <div className="flex gap-2">
                <span>Country:</span>
                <p className="font-medium">{currentSector.country}</p>
              </div>
            )}

            {/* Type */}
            {currentSector.type && (
              <div className="flex gap-2">
                <span>Type:</span>
                <p className="font-medium capitalize">{currentSector.type}</p>
              </div>
            )}

            {/* Curriculum (start - end years) */}
            {currentSector.curriculum && (
              <div className="flex gap-2">
                <span>Curriculum:</span>
                <p className="font-medium">
                  {currentSector.curriculum[0]} - {currentSector.curriculum[1]}
                </p>
              </div>
            )}

            {/* Created & Updated dates */}
            {currentSector.created_at && (
              <div className="flex text-sm text-gray-500">
                Created at {formatReadableDate(currentSector.created_at)}
              </div>
            )}

            {currentSector.updated_at && (
              <div className="flex text-sm text-gray-500">
                Updated at {formatReadableDate(currentSector.updated_at)}
              </div>
            )}
          </div>
        </aside>
      </CardContent>
    </Card>
  );
};

export default SectorInformationCard;
