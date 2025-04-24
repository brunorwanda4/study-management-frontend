import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LuMessageCircle } from "react-icons/lu";
import Link from "next/link";
import { Locale } from "@/i18n";
import { Dot } from "lucide-react";
import { cn } from "@/lib/utils";
import { TextTooltip } from "../myComponents/text-tooltip";
import { toLowerCase } from "@/lib/functions/characters";

interface props {
  userRole: string;
  lang: Locale;
  className?: string;
  name?: string;
  id?: string;
  role?: "s-t" | "s" | "t" | "a";
  image?: string;
}

const UserCardSmall = ({
  id,
  role,
  userRole,
  name,
  lang,
  className,
  image,
}: props) => {
  return (
    <div
      className={cn("flex justify-between items-center  space-y-2", className)}
    >
      <div className=" flex space-x-2">
        <Link href={`/${lang}/profile/student`}>
          <Avatar className=" size-12">
            <AvatarImage
              src={
                image
                  ? image
                  : "https://i.pinimg.com/1200x/5d/0c/d8/5d0cd81e76339b484605c2b2a5bb681f.jpg"
              }
            />
            <AvatarFallback>PR</AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <Link
            href={`/${lang}/profile${
              role === "s-t" ? `/s-t/${id ? id : "school-staff"}` : "/student"
            }`}
          >
            <h4 className=" ">{name ? name : "Murekezi Hindiro"}</h4>
          </Link>
          <div className=" flex items-center">
            <span className=" text-myGray capitalize text-sm">
              {toLowerCase(userRole)}
            </span>
            {userRole === "STUDENT" && (
              <div className=" flex -space-x-2 items-center">
                <Dot size={32} />
                <TextTooltip
                  content={<span>Level 5 Software development</span>}
                  trigger={<span>L5 SOD</span>}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <Link
        href={`/${lang}/messages/${role === "s-t" ? "s-t" : "user"}/${
          id ? id : 12334
        }`}
      >
        <Button library="daisy" variant="info" size="sm">
          <LuMessageCircle />
          Message
        </Button>
      </Link>
    </div>
  );
};

export default UserCardSmall;
