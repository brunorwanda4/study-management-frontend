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
import { FaRegHeart } from "react-icons/fa6";
import MyAvatarGroup from "../image/my-avatar-group";
import { Label } from "@/components/ui/label";
import { Span } from "next/dist/trace";

interface LikesDialogProps {
  likes?: any;
  dialogTriggerSize?: "sm" | "default" | number;
  dialogTriggerType?: "icon" | "groupUsers" | "text";
}

const LikesDialog = ({
  likes,
  dialogTriggerSize = "default",
  dialogTriggerType = "icon",
}: LikesDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        {dialogTriggerType === "text" ? (
          <span>2 Likes</span>
        ) : dialogTriggerType === "groupUsers" ? (
          <div className=" justify-start flex flex-row w-full items-center gap-2 cursor-pointer">
            <MyAvatarGroup
              type="cycle"
              className=" w-fit"
              size="2xs"
              limit={3}
              items={[...Array(3)].map((_i) => {
                return {
                  src: "/images/3.jpg",
                  alt: "avatar",
                };
              })}
            />
            <Label>23 Likes</Label>
          </div>
        ) : (
          <Button
            type="button"
            variant="ghost"
            className=" items-center flex"
            library="daisy"
            size={dialogTriggerSize === "sm" ? "sm" : "md"}
          >
            <FaRegHeart
              size={
                dialogTriggerSize === "sm"
                  ? 16
                  : dialogTriggerSize === "default"
                    ? 28
                    : dialogTriggerSize
              }
            />
            <span className=" ">12</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className=" p-0">
        <DialogHeader className=" px-6 py-4">
          <DialogTitle>Likes</DialogTitle>
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

export default LikesDialog;
