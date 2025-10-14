"use client";

import CreateTradeForm from "@/components/page/admin/trades/create-trade-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SectorModel } from "@/lib/schema/admin/sectorSchema";
import { AuthContext } from "@/lib/utils/auth-context";
import { BsPlus } from "react-icons/bs";

interface props {
  auth: AuthContext;
  sector?: SectorModel;
}

const CreateTradeDialog = ({ auth, sector }: props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button library="daisy" variant="info" size="sm">
          <BsPlus /> Add new trade
        </Button>
      </DialogTrigger>
      <DialogContent className="max- max-h-[95vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Add New trade</DialogTitle>
        </DialogHeader>
        <CreateTradeForm auth={auth} sector={sector} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateTradeDialog;
