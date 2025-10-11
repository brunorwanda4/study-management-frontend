"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/context/toast/ToastContext";
import { UserModel } from "@/lib/types/userModel";
import { cn } from "@/lib/utils";
import { AuthUserResult } from "@/lib/utils/auth-user";
import apiRequest from "@/service/api-client";
import { redirect } from "next/navigation";
import { useState, useTransition } from "react";

interface Props {
  user: UserModel;
  auth: AuthUserResult;
  isIcon?: boolean;
}

const DeleteUserDialog = ({ user, auth, isIcon }: Props) => {
  const [error, setError] = useState<undefined | string>("");
  const [success, setSuccess] = useState<undefined | string>("");
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const handleDelete = () => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const deleteUser = await apiRequest<void, UserModel>(
        "delete",
        `/users/${user.id || user._id}`,
        undefined,
        { token: auth.token },
      );

      if (deleteUser.statusCode !== 200) {
        setError(deleteUser.message);
        showToast({
          title: "Uh oh! Something went wrong.",
          description: deleteUser.message,
          type: "error",
        });
      } else {
        setSuccess("User role deleted successfully!");
        showToast({
          title: "User role created successfully",
          type: "warning",
          description: (
            <p>
              You delete <strong>{deleteUser.data?.name}</strong> account which
              created on {deleteUser.data?.created_at} 😔
            </p>
          ),
        });
        redirect("/a/collections/users");
      }
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size={"sm"}
          library="daisy"
          variant={"ghost"}
          role={isPending ? "loading" : "delete"}
          data-tip={isIcon && "Delete user"}
          className={cn(isIcon && "tooltip tooltip-top tooltip-error")}
        >
          <span className={cn(isIcon && "sr-only")}>Delete user</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete{" "}
            <span className="font-medium capitalize">{user.name}</span> account?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. It will permanently delete the user
            account and the user will no longer be able to access the system
            again. 😔 Please proceed with caution.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="mt-2">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel type="button" className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={() => handleDelete()}
              library={"daisy"}
              variant={"error"}
              role={isPending ? "loading" : undefined}
            >
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUserDialog;
