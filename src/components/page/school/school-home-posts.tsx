 import CreateNewPostInSchool from "./create-new-post-in-school";
import { FaSignsPost } from "react-icons/fa6";
import PostCard from "@/components/cards/post-card";
import { Locale } from "@/i18n";
import { cn } from "@/lib/utils";

interface props {
  lang: Locale;
  isOnSchoolPost?: boolean;
  className?: string;
}

const SchoolHomePosts = ({ lang, isOnSchoolPost, className }: props) => {
  return (
    <div className="space-y-2 w-full">
      {!isOnSchoolPost && <CreateNewPostInSchool />}
      <div className=" space-y-2">
        {!isOnSchoolPost && (
          <div className=" space-x-1 flex items-center">
            <FaSignsPost />
            <h2 className=" font-semibold">Posts</h2>
          </div>
        )}
        <div className={cn("grid grid-cols-1 w-full gap-4", className)}>
          <PostCard lang={lang} postRole="IMAGE" />
          <PostCard lang={lang} postRole="TEXT" />
          <PostCard lang={lang} postRole="IMAGE" />
          <PostCard lang={lang} postRole="TEXT" />
        </div>
      </div>
    </div>
  );
};

export default SchoolHomePosts;
