 import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Locale } from "@/i18n";
import PostCardHeaderDropdown from "./post-card-header-dropdown";
import UserTooltip from "@/components/myComponents/user-tooltip";
import { userImage } from "@/lib/context/images";

interface props {
  lang: Locale;
}

const PostCardHeader = ({ lang }: props) => {
  
  return (
    <div className="flex justify-between items-center">
      <div className=" flex items-center space-x-2">
        <Link href={`/${lang}/profile/user`}>
          <UserTooltip
            lang={lang}
            trigger={
              <Avatar className=" size-12">
                <AvatarImage src={userImage} />
                <AvatarFallback>PR</AvatarFallback>
              </Avatar>
            }
          />
        </Link>
        <Link href={`/${lang}/profile/user`}>
          <h4 className=" font-medium">Iradukunda Mike</h4>
          <span className=" text-sm text-myGray">Teacher</span>
        </Link>
      </div>
      <div className=" flex gap-2 items-center">
        <span className=" font-medium text-myGray">2h ago</span>
        <PostCardHeaderDropdown />
      </div>
    </div>
  );
};

export default PostCardHeader;
