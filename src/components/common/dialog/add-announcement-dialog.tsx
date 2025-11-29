import AnnouncementForm from "@/components/common/form/announcement-form";
import MyAvatar from "@/components/common/image/my-avatar";
import {
  Button,
  type DaisyButtonProps,
  type ShadcnButtonProps,
} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { AuthContext } from "@/lib/utils/auth-context";
import { CgAttachment } from "react-icons/cg";
import { FiSend } from "react-icons/fi";

interface props {
  className?: string;
  button?: ShadcnButtonProps | DaisyButtonProps;
  name?: string;
  auth: AuthContext;
}

const AddAnnouncementDialog = ({ button, name, className, auth }: props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {button ? (
          <Button {...button} className={cn("", className)}>
            {name}
          </Button>
        ) : (
          <div className=" flex gap-2 card bg-base-100 flex-row border-sm p-2 ">
            <MyAvatar src={auth?.user.image} alt={auth.user.name} size="sm" />
            <div className=" bg-base-content/20 w-full p-2 card ">
              <span>New announcement..</span>
            </div>
            <Button
              variant={"outline"}
              library="daisy"
              shape={"circle"}
              type="button"
            >
              <CgAttachment className=" size-6" />
            </Button>
            <Button
              variant={"primary"}
              library="daisy"
              shape={"circle"}
              type="button"
            >
              <FiSend className=" size-6" />
            </Button>
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[95vh] overflow-y-auto sm:max-w-2xl">
        <DialogTitle>New announcement in Class name</DialogTitle>
        <DialogDescription>
          This is announcement will shown in only this class
        </DialogDescription>
        <AnnouncementForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddAnnouncementDialog;
