import UserCardSmall from "@/components/cards/user-card-small";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaReadme, FaRegHeart } from "react-icons/fa6";
import MyAvatarGroup from "../image/my-avatar-group";
import { Label } from "@/components/ui/label";
import { Span } from "next/dist/trace";

interface ReadDialogProps {
  reads?: any;
  dialogTriggerType?: "icon" | "text";
}

const ReadDialog = ({ reads, dialogTriggerType = "icon" }: ReadDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        {dialogTriggerType === "icon" ? (
          <Button title="Read" library="daisy" variant="ghost" size="md">
            <FaReadme size={28} />
            <span className=" ">43 </span>
          </Button>
        ) : (
          <Button library="daisy" variant={"ghost"} size="sm">
            43 Readings
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className=" p-0">
        <DialogHeader className=" px-6 py-4">
          <DialogTitle>People Reading</DialogTitle>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-scroll px-6">
          {[...Array(32)].map((_, i) => {
            return (
              <UserCardSmall
                key={i}
                name="Bruno Rwanda"
                lang="en"
                userRole="Teacher"
              />
            );
          })}
        </div>
        <DialogFooter className="px-6 pb-2">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReadDialog;
