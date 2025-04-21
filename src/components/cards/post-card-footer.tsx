 import { Button } from "../ui/button";
import { FaComment, FaReadme, FaRegBookmark, FaShare } from "react-icons/fa6";
import { AiOutlineLike } from "react-icons/ai";

// interface props {
//   postRole?:
//     | "IMAGE"
//     | "NOTES"
//     | "VIDEO"
//     | "AUDIO"
//     | "BOOK"
//     | "LINK"
//     | "CODE"
//     | "OTHER";
// }

interface props {
  postRole?:
    "NOTES" | "IMAGE" | "VIDEO" | "POST" | "ACTIVITY" | "BOOK" | "TEXT";
}

const PostCardFooter = ({ postRole }: props) => {
  return (
    <div className=" flex justify-between px-4 py-2">
      <div className=" flex items-center">
        <Button library="daisy" variant="ghost" size="md">
          {postRole === "NOTES" || postRole === "BOOK" ? (
            <FaReadme size={28} />
          ) : (
            <AiOutlineLike size={28} />
          )}
          <span>43</span>
        </Button>
        <Button library="daisy" variant="ghost" size="md">
          <FaComment size={28} />
          <span>32</span>
        </Button>
      </div>
      <div className=" flex items-center">
        <Button library="daisy" variant="ghost" size="md">
          <FaShare size={28} />
        </Button>
        <Button library="daisy" variant="ghost" size="md">
          <FaRegBookmark size={28} />
        </Button>
      </div>
    </div>
  );
};

export default PostCardFooter;
