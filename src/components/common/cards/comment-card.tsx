import { Card, CardHeader } from "@/components/ui/card";
import { UserSmCard } from "@/components/cards/user-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FaEllipsisVertical, FaRegHeart } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import {
  Item,
  ItemContent,
  ItemFooter,
  ItemHeader,
} from "@/components/ui/item";
import LikesDialog from "../dialog/likes-dialog";

interface CommentCardProps {
  comment?: any;
}

const CommentCard = ({ comment }: CommentCardProps) => {
  return (
    <Item className=" flex flex-col gap-2 items-start">
      <ItemHeader className=" w-full">
        <div className=" flex justify-between w-full">
          <UserSmCard
            name="Bruno Rwanda"
            role="Teacher"
            image="/images/3.jpg"
          />
          <div className=" flex items-center gap-1">
            <span className="text-sm text-base-content/50">2 hrs ago</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  library="daisy"
                  variant="ghost"
                  size={"sm"}
                  type="button"
                >
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
                  <Button
                    library="daisy"
                    variant="ghost"
                    size={"sm"}
                    type="button"
                    className=" justify-start hover:text-error"
                  >
                    Delete
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </ItemHeader>
      <ItemContent>
        lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.
        Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies
        sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius
        a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy
        molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.
        Duis semper.
        <ItemFooter className=" flex justify-start gap-2">
          <Button
            type="button"
            variant="ghost"
            className=" items-center flex"
            library="daisy"
            size={"sm"}
          >
            <FaRegHeart size={16} />
          </Button>
          {/*GPT can you help me when user click on reply it will add that comment in setReply*/}
          <Button size="sm" library="daisy" variant={"ghost"}>
            Reply
          </Button>
          <LikesDialog dialogTriggerType="text" dialogTriggerSize={"sm"} />
          {/*GPT can you help me when use click on this button it show all replies for this coments and those comment are comments */}
          <Button size="sm" library="daisy" variant={"ghost"}>
            View all replies (2)
          </Button>
        </ItemFooter>
      </ItemContent>
    </Item>
  );
};

export default CommentCard;
