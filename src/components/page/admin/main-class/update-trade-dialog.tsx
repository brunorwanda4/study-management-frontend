import MyImage from "@/components/common/myImage";
import UpdateMainClassForm from "@/components/page/admin/main-class/update-main-class-form";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MainClassModel } from "@/lib/schema/admin/main-classes-schema";
import { cn } from "@/lib/utils";
import { AuthUserResult } from "@/lib/utils/auth-user";

interface Props {
  mainClass: MainClassModel;
  auth: AuthUserResult;
}

const UpdateMainClassDialog = ({ mainClass, auth }: Props) => {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          buttonVariants({ library: "daisy", variant: "warning" }),
          "w-full cursor-pointer",
        )}
      >
        <MyImage role="ICON" src="/icons/edit.png" /> Update main class{" "}
      </DialogTrigger>
      <DialogContent className="max- max-h-[95vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            Update trade <strong>{mainClass.name}</strong>
          </DialogTitle>
        </DialogHeader>
        <UpdateMainClassForm auth={auth} mainClass={mainClass} />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateMainClassDialog;
