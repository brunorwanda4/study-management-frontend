"use client";
import CreateUserForm from "@/components/page/admin/users/create-user-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { AuthContext } from "@/lib/utils/auth-context";
import { BsPlus } from "react-icons/bs";

interface props {
  auth: AuthContext;
}

const CreateNewUserDialog = ({ auth }: props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary" size="sm" library="daisy">
          <BsPlus /> Create new user
        </Button>
      </DialogTrigger>
      <DialogContent className="max- max-h-[95vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Create new user</DialogTitle>
        </DialogHeader>
        <CreateUserForm auth={auth} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewUserDialog;
