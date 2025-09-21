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
import { AuthUserResult } from "@/lib/utils/auth-user";
import { BsPlus } from "react-icons/bs";

interface props {
  auth: AuthUserResult;
}

const CreateSectorDialog = ({ auth }: props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button library="daisy" variant="info" size="sm">
          <BsPlus /> Add new sector
        </Button>
      </DialogTrigger>
      <DialogContent className="max- max-h-[95vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Add New Sector</DialogTitle>
        </DialogHeader>
        <CreateSectorForm auth={auth} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateSectorDialog;
