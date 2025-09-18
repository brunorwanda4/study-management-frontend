import { Locale } from "@/i18n";
import { userImage } from "@/lib/context/images";
import { toLowerCase } from "@/lib/functions/characters";
import { cn } from "@/lib/utils";
import { Dot } from "lucide-react";
import { LuMessageCircle } from "react-icons/lu";
import MyLink from "../common/myLink";
import { TextTooltip } from "../common/text-tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

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
      className={cn("flex items-center justify-between space-y-2", className)}
    >
      <div className="flex space-x-2">
        <MyLink
          loading
          className="underline-offset-0"
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
          <Avatar className="size-12">
            <AvatarImage src={image ? image : userImage} />
            <AvatarFallback>PR</AvatarFallback>
          </Avatar>
        </MyLink>
        <div>
          <MyLink
            loading
            className="underline-offset-0"
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
          <div className="flex items-center">
            <span className="text-myGray text-sm capitalize">
              {toLowerCase(userRole)}
            </span>
            {userRole === "STUDENT" && (
              <div className="flex items-center -space-x-2">
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
        className="underline-offset-0"
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
