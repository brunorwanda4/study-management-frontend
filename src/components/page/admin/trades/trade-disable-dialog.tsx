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
import { TradeModule } from "@/lib/schema/admin/tradeSchema";
import { cn } from "@/lib/utils";
import { AuthUserResult } from "@/lib/utils/auth-user";
import apiRequest from "@/service/api-client";
import { LoaderCircle } from "lucide-react";
import { useState, useTransition } from "react";

interface Props {
  trade: TradeModule;
  auth: AuthUserResult;
}

const TradeDisableDialog = ({ trade, auth }: Props) => {
  const [error, setError] = useState<undefined | string>("");
  const [success, setSuccess] = useState<undefined | string>("");
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const handleToggle = () => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const request = await apiRequest<{ disable: boolean }, TradeModule>(
        "put",
        `/trades/${trade.id || trade._id}`,
        { disable: trade.disable ? false : true },
        { token: auth.token },
      );

      if (!request.data) {
        setError(request.message);
        showToast({
          title: "Uh oh! Something went wrong.",
          description: request.message,
          type: "error",
        });
      } else {
        const action = trade.disable ? "enabled" : "disabled";
        setSuccess(`Trade ${request.data.name} ${action} successfully!`);
        showToast({
          title: `Trade ${request.data.name} ${action}`,
          description: (
            <p>
              You {action} <strong>{request.data.name}</strong>.
            </p>
          ),
          type: "success",
        });
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={cn(
          buttonVariants({ size: "sm", variant: "ghost", library: "shadcn" }),
          "cursor-pointer",
        )}
      >
        <MyImage
          role="ICON"
          src={trade.disable ? "/icons/checked.png" : "/icons/disabled.png"}
        />
        <span>{trade.disable ? "Enable" : "Disable"}</span>
        {isPending && <LoaderCircle className="ms-2 animate-spin" size={12} />}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to{" "}
            <span className="capitalize">
              {trade.disable ? "enable" : "disable"}
            </span>{" "}
            <strong>{trade.name}</strong>?
          </AlertDialogTitle>
          <AlertDialogDescription>
            {trade.disable
              ? "This will re-enable the trade."
              : "This action will disable the trade until re-enabled."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="mt-2">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleToggle}
            className={cn(
              buttonVariants({
                variant: trade.disable ? "success" : "warning",
                library: "daisy",
              }),
              "cursor-pointer",
            )}
          >
            {trade.disable ? "Enable" : "Disable"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TradeDisableDialog;
