"use client";
 import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Locale } from "@/i18n";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface props {
    lang : Locale
}

const MessageUserCard = ({lang} : props) => {
  const {theme} = useTheme();
  return (
    <div className={cn(" flex space-x-2  duration-200 p-2 card w-full  flex-row", theme === "dark" ? "hover:bg-white/10" : "hover:bg-black/10")}>
      <Avatar className=" size-12">
        <AvatarImage src="/images/17.jpg" />
        <AvatarFallback>PR</AvatarFallback>
      </Avatar>
      <div className=" w-full">
        <Link href={`/${lang}/messages/student`} className=" flex justify-between items-center w-full">
          <h4 className=" line-clamp-1"> Bahabe Like</h4>
          <span className=" text-xs text-myGray font-medium">2min ago</span>
        </Link>
        <p className=" text-sm line-clamp-1 text-myGray">
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, cupiditate suscipit, iste fugit, quos doloribus quis voluptatibus explicabo a distinctio magni nostrum vel. Hic tempore repellendus magni distinctio vel? Beatae.
        </p>
      </div>
    </div>
  );
};

export default MessageUserCard;
