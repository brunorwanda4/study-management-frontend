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
import { SectorModel } from "@/lib/schema/admin/sectorSchema";
import { cn } from "@/lib/utils";
import { AuthUserResult } from "@/lib/utils/auth-user";
import apiRequest from "@/service/api-client";
import { LoaderCircle } from "lucide-react";
import { redirect } from "next/navigation";
import { useState, useTransition } from "react";

interface Props {
  sector: SectorModel;
  auth: AuthUserResult;
}

const DeleteSectorDialog = ({ sector, auth }: Props) => {
  const [error, setError] = useState<undefined | string>("");
  const [success, setSuccess] = useState<undefined | string>("");
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const handleDelete = () => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const request = await apiRequest(
        "delete",
        `/sectors/${sector.id || sector._id}`,
        undefined,
        { token: auth.token },
      );
      if (request.error || !request.data || request.statusCode !== 200) {
        setError(request.message);
        showToast({
          title: "Uh oh! Something went wrong.",
          description: request.message,
          type: "error",
        });
      } else {
        setSuccess("Sector deleted successfully!");
        showToast({
          title: "Sector deleted successfully",
          description: <p>{request.message}</p>,
          type: "success",
        });
        redirect("/a/collections/sectors");
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
          }),
          "cursor-pointer",
        )}
      >
        <MyImage role="ICON" src="/icons/delete.png" />
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
            Are you sure you want to delete sector{" "}
            <strong className="">{sector.name}</strong>?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. It will permanently delete the sector
            account and the sector will no longer be able to access the system
            again. 😔 Please proceed with caution.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="mt-2">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className={cn(
              buttonVariants({ variant: "destructive", library: "shadcn" }),
              "cursor-pointer",
            )}
          >
            Delete{" "}
            {isPending && (
              <LoaderCircle
                className="-ms-1 me-2 animate-spin"
                size={12}
                strokeWidth={2}
                aria-hidden="true"
              />
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteSectorDialog;
