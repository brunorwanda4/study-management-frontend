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
import { useState, useTransition } from "react";

interface Props {
  sector: SectorModel;
  auth: AuthUserResult;
}

const SectorDisableDialog = ({ auth, sector }: Props) => {
  const [error, setError] = useState<undefined | string>("");
  const [success, setSuccess] = useState<undefined | string>("");
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const handleToggle = () => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const request = await apiRequest<{ disable: boolean }, SectorModel>(
        "put",
        `/sectors/${sector.id || sector._id}`,
        {
          disable: sector.disable ? false : true,
        },
        auth?.token,
      );

      if (!request.data) {
        setError(request.message);
        showToast({
          title: "Uh oh! Something went wrong.",
          description: request.message,
          type: "error",
        });
      } else {
        const action = sector.disable ? "disabled" : "enabled";
        setSuccess(`Sector ${request.data.name} ${action} successfully!`);
        showToast({
          title: `Sector ${request.data.name} ${action} successfully`,
          type: "success",
          description: (
            <p>
              You {action} <strong>{request.data.name}</strong> account.
            </p>
          ),
        });
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
        <MyImage
          role="ICON"
          src={sector.disable ? "/icons/checked.png" : "/icons/disabled.png"}
        />
        <span className="">{sector.disable ? "Enable" : "Disable"}</span>
        {isPending && (
          <LoaderCircle
            className="-ms-1 me-2 animate-spin"
            size={12}
            strokeWidth={2}
            aria-hidden="true"
          />
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to{" "}
            <span className="font-medium capitalize">
              {sector.disable ? "enable" : "disable"}
            </span>{" "}
            <span className="font-medium">{sector.name}</span>?
          </AlertDialogTitle>
          <AlertDialogDescription>
            {sector.disable
              ? "This will re-enable the account and allow the sector to access the system again."
              : "This action will disable the account. The sector will not be able to access the system until it is enabled again."}
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
            onClick={() => handleToggle()}
            className={cn(
              buttonVariants({
                variant: sector.disable ? "success" : "warning",
                library: "daisy",
              }),
              "cursor-pointer",
            )}
          >
            {sector.disable ? "Enable" : "Disable"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SectorDisableDialog;
