import UpdateSectorForm from "@/components/page/admin/sector/update-sector-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { SectorModel } from "@/lib/schema/admin/sectorSchema";
import { cn } from "@/lib/utils";
import type { AuthContext } from "@/lib/utils/auth-context";

interface Props {
  sector: SectorModel;
  auth: AuthContext;
  isIcon?: boolean;
}

const UpdateSectorDialog = ({ sector, auth, isIcon }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/** biome-ignore lint/a11y/useValidAriaRole: <explanation> */}
        <Button
          className={cn(
            "w-full cursor-pointer",
            isIcon && "tooltip tooltip-top tooltip-warning w-fit",
          )}
          library="daisy"
          role="update"
          size={"sm"}
          variant={"warning"}
          type="button"
          data-tip={isIcon && " Update sector"}
        >
          <span className={cn(isIcon && "sr-only")}>Update sector</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max- max-h-[95vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            Update sector <strong>{sector.name}</strong>
          </DialogTitle>
        </DialogHeader>
        <UpdateSectorForm auth={auth} sector={sector} />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateSectorDialog;
