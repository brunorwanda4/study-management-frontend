import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Locale } from "@/i18n";
import Link from "next/link";

interface props {
  lang: Locale;
}

const ConversationNavbar = ({ lang }: props) => {
  return (
    <nav className=" h-12 bg-base-100 border-b border-b-base-300 px-4 flex items-center">
      <div className=" flex space-x-2">
        <Avatar className=" size-10">
          <AvatarImage src="/profiles/b/20.png" />
          <AvatarFallback>PR</AvatarFallback>
        </Avatar>
        <div className=" flex flex-col">
          <Link href={`/${lang}/profile/student`}>
            <h3 className=" font-medium"> Bruno Happy heart</h3>
          </Link>
          <span className=" text-base-content/50 text-sm">STUDENT</span>
        </div>
      </div>
    </nav>
  );
};

export default ConversationNavbar;
