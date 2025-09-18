"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/lib/hooks/use-toast";
import { UserModelPut } from "@/lib/types/userModel";
import { updateUserAPI } from "@/service/admin/fetchDataFn";
import { startTransition } from "react";

interface props {
  id: string;
  disable?: boolean;
}

const UserDisableButton = ({ id, disable }: props) => {
  const handleSubmit = (values: UserModelPut, id: string) => {
    startTransition(async () => {
      const result = await updateUserAPI(values, id);

      if ("message" in result) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: result.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: `User ${result.name} updated successfully`,
          description: <div>user: {result.name}</div>,
        });
      }
    });
  };
  const disableUser: UserModelPut = { disable: true };
  const Enable: UserModelPut = { disable: false };
  return (
    <Button
      size="sm"
      variant="warning"
      onClick={() => handleSubmit(disable ? Enable : disableUser, id)}
    >
      {disable ? "Enable" : "Disable"} account
    </Button>
  );
};

export default UserDisableButton;
