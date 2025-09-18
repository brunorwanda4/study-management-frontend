"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/lib/hooks/use-toast";
import {
  UserModel,
  UserModelDeleteMany,
  UserModelPut,
  UserModelUpdateMany,
} from "@/lib/types/userModel";
import {
  deleteManyUsersAPI,
  updateManyUsersAPI,
} from "@/service/admin/fetchDataFn";
import { LoaderCircle } from "lucide-react";
import { useState, useTransition } from "react";
import { CiTrash } from "react-icons/ci";
import { GrAttraction } from "react-icons/gr";
import { TbLock } from "react-icons/tb";

interface Props {
  users: UserModel[];
  setUsers: React.Dispatch<React.SetStateAction<UserModel[]>>; // Callback to update users
}

const UserActionDialog = ({ users, setUsers }: Props) => {
  const [error, setError] = useState<undefined | string>("");
  const [success, setSuccess] = useState<undefined | string>("");
  const [isPending, startTransition] = useTransition();

  const deleteMany = () => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const deleteManyBody: UserModelDeleteMany = {
        users: users.map((user) => user.id),
      };
      const result = await deleteManyUsersAPI(deleteManyBody);

      if ("message" in result) {
        setError(result.message);
        toast({
          title: "Uh oh! Something went wrong.",
          description: result.message,
          variant: "destructive",
        });
      } else {
        setSuccess(`More than ${result.length} users deleted successfully! 😔`);
        toast({
          title: `More than ${result.length} users deleted successfully! 😔`,
          description: (
            <div>
              you delete users accounts more than {result.length} include{" "}
              <strong>{result[0].name}</strong>
            </div>
          ),
        });
        setUsers([]); // Clear users after deletion
      }
    });
  };

  const updateMany = () => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const disableBody: UserModelPut = { disable: true };
      const userModelUpdateManyBody: UserModelUpdateMany = {
        users: users.map((user) => {
          return {
            id: user.id,
            user: disableBody,
          };
        }),
      };

      const result = await updateManyUsersAPI(userModelUpdateManyBody);

      if ("message" in result) {
        setError(result.message);
        toast({
          title: "Uh oh! Something went wrong.",
          description: result.message,
          variant: "destructive",
        });
      } else {
        setSuccess(`More than ${result.length} users updated successfully! 😔`);
        toast({
          title: `More than ${result.length} users updated successfully! 😔`,
          description: (
            <div>
              you updated users more than {result.length} include{" "}
              <strong>{result[0].name}</strong>
            </div>
          ),
        });
      }
    });
  };

  const removeAllSelectedUsers = () => {
    setUsers([]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary" size="sm" disabled={isPending}>
          <GrAttraction /> Action ({users.length}){" "}
          {isPending && (
            <LoaderCircle
              className="-ms-1 me-2 animate-spin"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Make action with many users ({users.length})
          </DialogTitle>
          <DialogDescription>
            This action will be applied to {users.length} users which make them
            effect.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="mt-2">
            <FormMessageError message={error} />
            <FormMessageSuccess message={success} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="error" size="sm" onClick={() => deleteMany()}>
            <CiTrash /> Delete
          </Button>
          <Button
            variant="warning"
            size="sm"
            className=" "
            onClick={() => updateMany()}
          >
            <TbLock /> Disable
          </Button>
          <DialogClose asChild>
            <Button
              size="sm"
              variant="info"
              onClick={() => removeAllSelectedUsers()}
            >
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserActionDialog;
