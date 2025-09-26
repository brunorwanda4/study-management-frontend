import MyImage from "@/components/common/myImage";
import UpdateTradeForm from "@/components/page/admin/trades/update-trade-form";
import { buttonVariants } from "@/components/ui/button";
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
}

const UpdateTradeDialog = ({ trade, auth }: Props) => {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          buttonVariants({ library: "shadcn" }),
          "w-full cursor-pointer",
        )}
      >
        <MyImage role="ICON" src="/icons/edit.png" /> Update Trade{" "}
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
