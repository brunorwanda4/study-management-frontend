import { Button } from "../ui/button";
import { FaRegHeart, FaReadme, FaRegBookmark } from "react-icons/fa6";
import { CardFooter } from "../ui/card";
import { IoMdShare } from "react-icons/io";
import { MdOutlineInsertComment } from "react-icons/md";

type components = "like" | "comment" | "save" | "share" | "read";

interface propsPostCardFooter {
  enabledComponents?: components[];
}

const PostCardFooter = ({
  enabledComponents = ["save", "comment", "like", "share", "read"],
}: propsPostCardFooter) => {
  return (
    <CardFooter className=" flex justify-between px-4 py-2">
      <div className=" flex items-center">
        {enabledComponents.includes("like") && (
          <Button title="Like" library="daisy" variant="ghost" size="md">
            <FaRegHeart size={28} />
            <span>43</span>
          </Button>
        )}
        {enabledComponents.includes("read") && (
          <Button title="Read" library="daisy" variant="ghost" size="md">
            <FaReadme size={28} />
            <span>43</span>
          </Button>
        )}
        {enabledComponents.includes("comment") && (
          <Button title="comments" library="daisy" variant="ghost" size="md">
            <MdOutlineInsertComment size={28} />
            <span>32</span>
          </Button>
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
    </CardFooter>
  );
};

export default PostCardFooter;
