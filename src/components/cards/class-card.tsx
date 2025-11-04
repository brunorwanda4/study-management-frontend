import MyImage from "@/components/common/myImage";
import ClassModifySheet from "@/components/page/class/class-modify-sheet";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Locale } from "@/i18n";
import type { ClassWithOthers } from "@/lib/schema/class/class-schema";
import { cn } from "@/lib/utils";
import type { AuthContext } from "@/lib/utils/auth-context";
import Link from "next/link";
import { BsBook } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { PiStudentLight } from "react-icons/pi";
import { SiLevelsdotfyi } from "react-icons/si";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

interface props {
  lang: Locale;
  isClassTeacher?: boolean;
  isSchool?: boolean;
  isOther?: boolean; // others users which are not in class
  isStudent?: boolean;
  isNotes?: boolean;
  auth: AuthContext;
  isSchoolStaff?: boolean;
  cls?: ClassWithOthers;
}

const ClassCard = ({
  lang,
  isClassTeacher,
  cls,
  isNotes,
  auth,
  isSchoolStaff,
}: props) => {
  const canModify =
    (isSchoolStaff && auth.user.role === "SCHOOLSTAFF") ||
    auth.user.role === "ADMIN";
  return (
    <Card className=" relative h-auto p-0">
      <CardHeader className="relative p-0">
        <MyImage
          src="https://img.freepik.com/free-photo/students-knowing-right-answer_329181-14271.jpg?t=st=1745210505~exp=1745214105~hmac=3f882c695e86b9db87db4ae4830ce8e407e5b44305df6ae24cb07a89942eb99d&w=1380"
          className="h-32 w-full"
          classname=" card rounded-b-none border-b border-base-content/50"
        />
        <div className="absolute -bottom-18 flex items-center gap-2 p-4">
          <Avatar className="size-20 border border-base-content/50 shadow">
            <AvatarImage
              src={
                cls?.image
                  ? cls.image
                  : "https://img.freepik.com/free-photo/boy-helping-his-friend-with-books_23-2148764069.jpg?t=st=1745210582~exp=1745214182~hmac=e009776674767118dd22fff3a6d02541ae9c89fb290cf7440ac7757cfc6f9123&w=1060"
              }
            />
            <AvatarFallback>LOGO</AvatarFallback>
          </Avatar>
          <div className="mt-6 space-x-1 overflow-hidden">
            <h3
              data-tip={cls?.name ?? "Level 5 Software"}
              className="line-clamp-1 leading-5 font-medium tooltip max-w-52 tooltip-bottom"
            >
              {cls?.name ?? "Level 5 Software development"}
            </h3>
            <Link
              className="line-clamp-1 flex space-x-1 text-sm max-w-52 overflow-hidden"
              href={`/${lang}/c/${cls?.username}`}
            >
              <span>@</span>{" "}
              <span className="line-clamp-1">{cls?.username ?? "L5SOD"}</span>
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-12 p-0">
        <div className=" px-4 space-y-2">
          <div className=" flex gap-2 items-center">
            <div className=" flex gap-1 items-center">
              <SiLevelsdotfyi /> <span>Level:</span>
            </div>
            <span className=" font-medium">
              {cls?.trade?.name ?? "Primary"}
            </span>
          </div>
          <div className=" flex gap-2 items-center">
            <MyImage role="AVATAR" src={"/images/3.jpg"} className=" size-10" />
            <Tooltip>
              <TooltipTrigger>
                <span className=" ">teacher name</span>
              </TooltipTrigger>
              <TooltipContent>Class teacher</TooltipContent>
            </Tooltip>
          </div>
        </div>
        {/* ands and teachers */}
        <div className=" px-4 flex flex-wrap gap-4">
          {/* students */}
          <Tooltip>
            <TooltipTrigger>
              <Badge variant={"outline"} library="daisy">
                <PiStudentLight /> <span>34</span>
              </Badge>
            </TooltipTrigger>
            <TooltipContent>Students</TooltipContent>
          </Tooltip>
          {/* subject */}
          <Tooltip>
            <TooltipTrigger>
              <Badge variant={"outline"} library="daisy">
                <BsBook /> <span>20</span>
              </Badge>
            </TooltipTrigger>
            <TooltipContent>Subjects</TooltipContent>
          </Tooltip>
          {cls?.capacity && (
            <Tooltip>
              <TooltipTrigger>
                <Badge variant={"outline"} library="daisy">
                  <FaPeopleGroup /> <span>{cls.capacity}</span>
                </Badge>
              </TooltipTrigger>
              <TooltipContent>capacity</TooltipContent>
            </Tooltip>
          )}
        </div>
        <CardFooter
          className={cn(
            " border-t border-base-content/50 pb-4",
            isSchoolStaff && " flex flex-row justify-end gap-2",
          )}
        >
          {canModify && <ClassModifySheet auth={auth} cls={cls} />}
          <Button
            library="daisy"
            variant={isClassTeacher ? "info" : "primary"}
            className={cn("w-full", isSchoolStaff && "w-fit")}
            role="page"
            href="/c/page"
          >
            {isSchoolStaff
              ? "Visit class"
              : isNotes
                ? "See notes"
                : "Join class"}
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default ClassCard;
