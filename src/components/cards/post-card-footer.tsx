import { Button } from "../ui/button";
import { FaRegHeart, FaReadme, FaRegBookmark } from "react-icons/fa6";
import { CardFooter } from "../ui/card";
import { IoMdShare } from "react-icons/io";
import MyAvatar from "../common/image/my-avatar";
import CommentsDialog from "../common/dialog/comments-dialog";
import LikesDialog from "../common/dialog/likes-dialog";

type components = "like" | "comment" | "save" | "share" | "read";

interface propsPostCardFooter {
  enabledComponents?: components[];
  isCommentOpen?: boolean;
}

const PostCardFooter = ({
  enabledComponents = ["save", "comment", "like", "share", "read"],
  isCommentOpen,
}: propsPostCardFooter) => {
  return (
    <CardFooter className=" flex flex-col justify-start items-start">
      <div className="flex justify-between py-2 w-full">
        <div className=" flex items-center">
          {enabledComponents.includes("like") && (
            <Button title="Like" library="daisy" variant="ghost" size="md">
              <FaRegHeart size={28} />
              <span className=" sr-only">43 Likes</span>
            </Button>
          )}
          {enabledComponents.includes("read") && (
            <Button title="Read" library="daisy" variant="ghost" size="md">
              <FaReadme size={28} />
              <span className=" sr-only">43 Reads</span>
            </Button>
          )}
          {!isCommentOpen && enabledComponents.includes("comment") && (
            <CommentsDialog dialogTriggerType="icon" />
          )}
        </div>
        <div className=" flex items-center">
          <Button title="Share" library="daisy" variant="ghost" size="md">
            <IoMdShare size={28} />
          </Button>
          <Button title="Save" library="daisy" variant="ghost" size="md">
            <FaRegBookmark size={28} />
          </Button>
        </div>
      </div>
      <div className="   space-y-2">
        <LikesDialog dialogTriggerType="groupUsers" />
        {!isCommentOpen && (
          <div className=" flex gap-2">
            <MyAvatar size="xs" />
            <div>
              <div className=" flex flex-row items-center gap-2">
                <h6 className=" font-medium">Sender comment</h6>
                <span className=" text-xs">1 hour ago</span>
              </div>
              <p className=" text-sm line-3">
                lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, voluptatum.
              </p>
            </div>
          </div>
        )}
        {!isCommentOpen && <CommentsDialog dialogTriggerType="button" />}
      </div>
    </CardFooter>
  );
};

export default PostCardFooter;
