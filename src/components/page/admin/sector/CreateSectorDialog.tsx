"use client";

import CreateSectorForm from "@/components/page/admin/sector/create-sector-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { SectorModel } from "@/lib/schema/admin/sectorSchema";
import type { AuthContext } from "@/lib/utils/auth-context";
import { BsPlus } from "react-icons/bs";

interface props {
  auth: AuthContext;
  onSectorCreated?: (sector: SectorModel) => void;
}

const CreateSectorDialog = ({ auth, onSectorCreated }: props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button library="daisy" variant="info" size="sm">
          <BsPlus /> Add new sector
        </Button>
      </DialogTrigger>
      <DialogContent className="max- max-h-[95vh] overflow-y-auto sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle>Add New Sector</DialogTitle>
        </DialogHeader>
        <CreateSectorForm auth={auth} onSectorCreated={onSectorCreated} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateSectorDialog;
