import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { UserModel } from "@/lib/schema/user/user-schema";
import { UserSmCard } from "@/components/cards/user-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaEllipsisVertical } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AddAnnouncementDialog from "../dialog/add-announcement-dialog";
import DeleteAnnouncementDialog from "../dialog/delete-announcement-dialog";
import PostCardFooter from "@/components/cards/post-card-footer";
import { cn } from "@/lib/utils";

interface AnnouncementCardProps {
  sender?: Pick<
    UserModel,
    "_id" | "name" | "username" | "email" | "id" | "role"
  >;
  isCommentOpen?: boolean;
}

const AnnouncementCard = ({ sender, isCommentOpen }: AnnouncementCardProps) => {
  return (
    <Card
      className={cn(
        isCommentOpen && "border-none border-0 shadow-none p-0 pt-0 pb-0",
      )}
    >
      <CardHeader className="  flex flex-row items-center justify-between">
        <UserSmCard role="Teacher" name="Sender name" date="2hrs ago" />
        <div className=" flex items-center gap-1">
          <span className="text-sm text-base-content/50">Announcement</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button library="daisy" variant="ghost" size={"sm"} type="button">
                <FaEllipsisVertical className="text-base-content/50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className=" p-2 gap-0 space-y-0">
              <div className="flex flex-col gap-1">
                <Button
                  library="daisy"
                  variant="ghost"
                  size={"sm"}
                  type="button"
                  className=" justify-start"
                >
                  Report
                </Button>
                <Separator />
                <AddAnnouncementDialog
                  button={{
                    library: "daisy",
                    size: "sm",
                    type: "button",
                    className: " justify-start ",
                    variant: "ghost",
                  }}
                  name="Edit"
                  className="  justify-start"
                />
                <DeleteAnnouncementDialog />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
      <CardContent>
        lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </CardContent>
      <PostCardFooter
        enabledComponents={["comment", "save", "share"]}
        isCommentOpen={isCommentOpen}
      />
    </Card>
  );
};

export default AnnouncementCard;
