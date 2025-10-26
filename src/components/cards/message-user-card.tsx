"use client";
import { Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import { generateImageProfile } from "@/lib/utils/generate-profile-image";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface props {
  lang: Locale;
}

const MessageUserCard = ({ lang }: props) => {
  const { theme } = useTheme();
  return (
    <div
      className={cn(
        "card flex w-full flex-row space-x-2 p-2 duration-200",
        theme === "dark" ? "hover:bg-white/10" : "hover:bg-black/10",
      )}
    >
      <Avatar className="size-12">
        <AvatarImage src={generateImageProfile("bruno", "MALE")} />
        <AvatarFallback>PR</AvatarFallback>
      </Avatar>
      <div className="w-full">
        <Link
          href={`/${lang}/messages/student`}
          className="flex w-full items-center justify-between"
        >
          <h4 className="line-clamp-1"> Bahabe Like</h4>
          <span className="text-myGray text-xs font-medium">2min ago</span>
        </Link>
        <p className="text-myGray line-clamp-1 text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam,
          cupiditate suscipit, iste fugit, quos doloribus quis voluptatibus
          explicabo a distinctio magni nostrum vel. Hic tempore repellendus
          magni distinctio vel? Beatae.
        </p>
      </div>
    </div>
  );
};

export default MessageUserCard;
