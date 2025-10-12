import UpdateTradeForm from "@/components/page/admin/trades/update-trade-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TradeModule } from "@/lib/schema/admin/tradeSchema";
import { cn } from "@/lib/utils";
import { AuthUserResult } from "@/lib/utils/auth-user";

interface Props {
  trade: TradeModule;
  auth: AuthUserResult;
  isIcon?: boolean;
}

const UpdateTradeDialog = ({ trade, auth, isIcon = false }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          library="daisy"
          role="update"
          size={"sm"}
          data-tip={isIcon && " Update trade"}
          className={cn(
            "w-full",
            isIcon && "tooltip tooltip-top tooltip-warning w-fit",
          )}
        >
          <span className={cn(isIcon && "sr-only")}>Update Trade</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max- max-h-[95vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            Update trade <strong>{trade.name}</strong>
          </DialogTitle>
        </DialogHeader>
        <UpdateTradeForm auth={auth} trade={trade} />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTradeDialog;
