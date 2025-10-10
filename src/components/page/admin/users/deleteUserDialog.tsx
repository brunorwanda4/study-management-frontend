"use client";

import { FormError, FormSuccess } from "@/components/common/form-message";
import MyImage from "@/components/common/myImage";
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
import { buttonVariants } from "@/components/ui/button";
import { useToast } from "@/lib/context/toast/ToastContext";
import { UserModel } from "@/lib/types/userModel";
import { cn } from "@/lib/utils";
import { AuthUserResult } from "@/lib/utils/auth-user";
import apiRequest from "@/service/api-client";
import { LoaderCircle } from "lucide-react";
import { redirect } from "next/navigation";
import { useState, useTransition } from "react";

interface Props {
  user: UserModel;
  auth: AuthUserResult;
}

const DeleteUserDialog = ({ user, auth }: Props) => {
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
      <AlertDialogTrigger
        className={cn(
          buttonVariants({
            size: "sm",
            variant: "ghost",
            library: "shadcn",
            shape: "circle",
          }),
          "cursor-pointer",
        )}
      >
        <MyImage role="ICON" src="/icons/delete.png" />{" "}
        <span className="">Delete</span>
        {isPending && (
          <LoaderCircle
            className="-ms-1 me-2 animate-spin"
            size={12}
            strokeWidth={2}
            aria-hidden="true"
          />
        )}
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
          <AlertDialogAction
            onClick={handleDelete}
            className={cn(
              buttonVariants({ variant: "destructive", library: "shadcn" }),
              "cursor-pointer",
            )}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUserDialog;
