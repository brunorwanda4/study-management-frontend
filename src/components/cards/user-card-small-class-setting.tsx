 import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { toLowerCase } from "@/utils/functions/characters";
import Link from "next/link";
import { Locale } from "@/i18n";
import { Dot } from "lucide-react";
import { TextTooltip } from "@/context/tooltip/text-tooltip";
import { cn } from "@/lib/utils";
import { Module, User } from "../../../prisma/prisma/generated";
import { getSubjectById } from "@/services/data/subject-data";

interface props {
  userRole:
    | "DIRECTER"
    | "EDUCATION_PREFECT"
    | "DISCIPLINE_PREFECT"
    | "TEACHER"
    | "STUDENT";
  lang: Locale;
  className?: string;
  user?: User | null;
  modules?: Module[] | null;
  noAction?: boolean;
}
const UserCardSmallCallSetting = ({
  userRole,
  lang,
  className,
  user,
  modules,
}: props) => {
  return (
    <div
      className={cn(
        "flex justify-between items-center basic-card flex-row w-full space-y-2",
        className
      )}
    >
      <div className=" flex space-x-2">
        <Link href={`/${lang}/profile/${user?.id ? user.id : "student"}`}>
          <Avatar className=" size-14">
            <AvatarImage src={user?.image ? user.image : "/profiles/b/20.png"} />
            <AvatarFallback>PR</AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <div className=" flex space-x-4 items-center">
            <Link href={`/${lang}/profile/student`}>
              <h4 className=" font-medium">
                {user?.name ? user.name : "Murekezi Hindiro"}
              </h4>
            </Link>
            {userRole === "TEACHER" &&
              !!modules &&
              modules.map(async (item) => {
                const getSubject = await getSubjectById(item.subject_id);
                return (
                  <div key={item.id} className=" -space-x-2 flex items-center">
                    <Dot size={32} />
                    <span className=" text-sm font-medium ">
                      {getSubject ? getSubject.name : "Kinyarwanda"}
                    </span>
                  </div>
                );
              })}
          </div>
          <div className=" flex items-center">
            <span className=" font-medium text-myGray capitalize">
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
      <div className=" space-x-2">
        {/* TODO: make function for update or remove teacher in class */}
        {/* <Button size="sm">
          <AiOutlineSetting />
          Setting
        </Button>
        <Button variant="warning" size="sm">
          <IoIosRemoveCircleOutline />
          Disable
        </Button> 
        <Button variant="error" size="sm">
          <CiCircleRemove />
          Remove
        </Button>
        */}
      </div>
    </div>
  );
};

export default UserCardSmallCallSetting;
