import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LuMessageCircle } from "react-icons/lu";
import { Locale } from "@/i18n";
import { Dot } from "lucide-react";
import { cn } from "@/lib/utils";
import { TextTooltip } from "../myComponents/text-tooltip";
import { toLowerCase } from "@/lib/functions/characters";
import MyLink from "../myComponents/myLink";

interface props {
  userRole: string;
  lang: Locale;
  className?: string;
  name?: string;
  id?: string;
  role?: "s-t" | "s" | "t" | "a";
  image?: string;
  userId: string;
}

const UserCardSmall = ({
  id,
  role,
  userRole,
  name,
  lang,
  className,
  image,
  userId,
}: props) => {
  return (
    <div
      className={cn("flex justify-between items-center  space-y-2", className)}
    >
      <div className=" flex space-x-2">
        <MyLink
          loading
          className=" underline-offset-0"
          href={`/${lang}/p/${userId}?${
            role === "t"
              ? `teacherId=${id}`
              : role === "s"
              ? `studentId=${id}`
              : role === "s-t"
              ? `school-staff=${id}`
              : null
          }`}
        >
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
        </MyLink>
        <div>
          <MyLink
            loading
            className=" underline-offset-0"
            href={`/${lang}/p/${userId}?${
              role === "t"
                ? `teacherId=${id}`
                : role === "s"
                ? `studentId=${id}`
                : role === "s-t"
                ? `school-staff=${id}`
                : null
            }`}
          >
            <h4 className=" ">{name ? name : "Murekezi Hindiro"}</h4>
          </MyLink>
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
      <MyLink
        loading
        className=" underline-offset-0"
        href={`/${lang}/messages/${id}`}
        type="button"
        button={{ library: "daisy", variant: "info", size: "sm" }}
      >
        <LuMessageCircle />
        Message
      </MyLink>
    </div>
  );
};

export default UserCardSmall;
