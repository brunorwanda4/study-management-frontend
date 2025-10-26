"use client";

import CreateMainClassForm from "@/components/page/admin/main-class/create-main-class-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TradeModule } from "@/lib/schema/admin/tradeSchema";
import { AuthContext } from "@/lib/utils/auth-context";
import { BsPlus } from "react-icons/bs";

interface props {
  auth: AuthContext;
  trade?: TradeModule;
}

const CreateMainClassDialog = ({ auth, trade }: props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button library="daisy" variant="info" size="sm">
          <BsPlus /> Add main class
        </Button>
      </DialogTrigger>
      <DialogContent className="max- max-h-[95vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Add New Main class</DialogTitle>
        </DialogHeader>
        <CreateMainClassForm trade={trade} auth={auth} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateMainClassDialog;
