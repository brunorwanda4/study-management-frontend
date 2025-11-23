import { UserSmCard } from "@/components/cards/user-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { FaEllipsisVertical } from "react-icons/fa6";
import AddAnnouncementDialog from "../dialog/add-announcement-dialog";
import DeleteAnnouncementDialog from "../dialog/delete-announcement-dialog";
import MyLink from "../myLink";
import FileCard from "./file-card";
import PostCardFooter from "@/components/cards/post-card-footer";

interface ClassWorkCardProps {
  classWork?: any;
  isCommentOpen?: boolean;
}

const ClassWorkCard = ({ classWork, isCommentOpen }: ClassWorkCardProps) => {
  return (
    <Card>
      <CardHeader className="  flex flex-row items-center justify-between">
        <UserSmCard role="Teacher" name="Teacher name" date="2hr ago" />
        <div className=" flex items-center gap-1">
          <span className="text-sm text-base-content/50">Homework</span>
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
      <CardContent className=" flex flex-col gap-2">
        <div className=" flex flex-row justify-between w-full">
          <MyLink
            href=""
            className=" text-base-content/80 cursor-pointer text-lg"
          >
            Subject name
          </MyLink>
          <div className="  text-base text-base-content/80">Topic 2.3</div>
        </div>
        <div className=" flex flex-row justify-between w-full">
          <span className=" text-base-content/80 cursor-pointer text-base">
            100 Points
          </span>
          <div className="  text-base text-base-content/80">Due Tomorrow</div>
        </div>
        <div className=" flex flex-col gap-2">
          <h5 className=" h5 text-center">Class work title</h5>
          <p>
            lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
        <FileCard />
      </CardContent>
      <PostCardFooter
        enabledComponents={["comment", "save", "share", "read"]}
        isCommentOpen={isCommentOpen}
      />
    </Card>
  );
};

export default ClassWorkCard;
