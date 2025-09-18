import UserTooltip from "@/components/common/user-tooltip";
import { Locale } from "@/i18n";
import { userImage } from "@/lib/context/images";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import PostCardHeaderDropdown from "./post-card-header-dropdown";

interface props {
  lang: Locale;
}

const PostCardHeader = ({ lang }: props) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Link href={`/${lang}/profile/user`}>
          <UserTooltip
            lang={lang}
            trigger={
              <Avatar className="size-12">
                <AvatarImage src={userImage} />
                <AvatarFallback>PR</AvatarFallback>
              </Avatar>
            }
          />
        </Link>
        <Link href={`/${lang}/profile/user`}>
          <h4 className="font-medium">Iradukunda Mike</h4>
          <span className="text-myGray text-sm">Teacher</span>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-myGray font-medium">2h ago</span>
        <PostCardHeaderDropdown />
      </div>
    </div>
  );
};

export default PostCardHeader;
