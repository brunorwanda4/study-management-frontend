import UpdateMainClassForm from "@/components/page/admin/main-class/update-main-class-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { MainClassModel } from "@/lib/schema/admin/main-classes-schema";
import { cn } from "@/lib/utils";
import type { AuthContext } from "@/lib/utils/auth-context";

interface Props {
  mainClass: MainClassModel;
  auth: AuthContext;
  isIcon?: boolean;
}

const UpdateMainClassDialog = ({ mainClass, auth, isIcon }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={cn(
            "w-full",
            isIcon && "tooltip tooltip-top tooltip-warning w-fit",
          )}
          variant={"ghost"}
          size={"sm"}
          library="daisy"
          role="update"
          data-tip={isIcon && " Update main class"}
        >
          <span className={cn(isIcon && "sr-only")}> Update main class</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max- max-h-[95vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            Update main class <strong>{mainClass.name}</strong>
          </DialogTitle>
        </DialogHeader>
        <UpdateMainClassForm auth={auth} mainClass={mainClass} />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateMainClassDialog;
