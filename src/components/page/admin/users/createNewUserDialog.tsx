"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BsPlus } from "react-icons/bs";

import CreateUserForm from "@/components/page/admin/users/create-user-form";
import { AuthUserResult } from "@/lib/utils/auth-user";

interface props {
  auth: AuthUserResult;
}

const CreateNewUserDialog = ({ auth }: props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="info" size="sm" library="daisy">
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
