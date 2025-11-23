"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdOutlineInsertComment } from "react-icons/md";
import AnnouncementCard from "../cards/announcement-card";
import CommentCard from "../cards/comment-card";
import MessageInput from "../form/message-input/message-input";

interface CommentsDialogProps {
  comments?: any;
  dialogTriggerType?: "icon" | "button";
  name?: string;
  // post ?:
}

const CommentsDialog = ({
  comments,
  dialogTriggerType,
}: CommentsDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {dialogTriggerType === "button" ? (
          <Button
            variant={"ghost"}
            type="button"
            className=" w-fit"
            size={"sm"}
          >
            14 View all comments
          </Button>
        ) : (
          <Button title="comments" library="daisy" variant="ghost" size="md">
            <MdOutlineInsertComment size={28} />
            <span className=" sr-only">32 Likes</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[95vh] overflow-y-auto sm:max-w-5xl flex flex-row gap-4">
        <div className=" w-1/2">
          <AnnouncementCard isCommentOpen />
        </div>
        <div className="w-1/2">
          <DialogHeader>
            <DialogTitle>12 Comments</DialogTitle>
          </DialogHeader>
          <div className="max-h-[63vh] overflow-y-scroll ">
            {[...Array(8)].map((_, i) => {
              return <CommentCard key={i} />;
            })}
          </div>
          <MessageInput
            placeholder="Add comment..."
            enabledTools={["emoji", "metion", "toolbar", "send"]}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentsDialog;
