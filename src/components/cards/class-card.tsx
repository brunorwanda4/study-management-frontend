"use client";
import MyAvatar from "@/components/common/image/my-avatar";
import MyImage from "@/components/common/myImage";
import MyLink from "@/components/common/myLink";
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
import type { ClassWithOthers } from "@/lib/schema/relations-schema";
import { cn } from "@/lib/utils";
import type { AuthContext } from "@/lib/utils/auth-context";
import { getInitialsUsername } from "@/lib/utils/generate-username";
import Link from "next/link";
import { BsBook } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdClass } from "react-icons/md";
import { PiStudentLight } from "react-icons/pi";
import { SiLevelsdotfyi } from "react-icons/si";
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
          src="/images/1.jpg"
          className="h-32 w-full"
          classname=" card rounded-b-none border-b border-base-content/50"
        />
        <div className="absolute -bottom-15 flex items-center gap-2 p-4">
          <MyAvatar
            size="lg"
            type="cycle"
            src={cls?.image}
            isSubClass
            alt={cls?.name}
            className=" border-2 border-base-100"
          />
          <div className="mt-6 space-x-1 overflow-hidden">
            <span
              title={cls?.name}
              data-tip={cls?.name ?? "Level 5 Software"}
              className="line-clamp-1 leading-5 font-medium tooltip max-w-52 tooltip-bottom"
            >
              {cls?.name ?? "Level 5 Software development"}
            </span>
            {cls?.username && (
              <Link
                className="line-clamp-1 flex space-x-1 text-sm max-w-52 overflow-hidden"
                href={`/${lang}/c/${cls?.username}`}
              >
                <span title={`@ ${cls?.username}`}>
                  @ {getInitialsUsername(cls?.name, true)}
                </span>
              </Link>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-12 p-0">
        <div className=" px-4 space-y-2">
          <div className=" flex gap-2 items-center">
            <div className=" flex gap-1 items-center">
              <SiLevelsdotfyi /> <span>Level:</span>
            </div>
            {cls?.trade?.name && (
              <span title={cls.trade.name} className=" font-medium">
                {getInitialsUsername(cls?.trade?.name)}
              </span>
            )}
          </div>
          {cls?.class_teacher && (
            <div className=" flex gap-2 items-center">
              <MyAvatar
                src={cls?.class_teacher?.image}
                alt={cls.class_teacher.name}
                type="squircle"
                size="2xs"
              />
              <Tooltip>
                <TooltipTrigger>
                  <span className=" ">{cls.class_teacher.name}</span>
                </TooltipTrigger>
                <TooltipContent>Class teacher</TooltipContent>
              </Tooltip>
            </div>
          )}
        </div>
        {/* ands and teachers */}
        <div className=" px-4 flex flex-wrap gap-4">
          {/* students */}
          <MyLink href={`/${lang}/c/${cls?.username}/people#students`}>
            <div className=" flex gap-1 items-center" title="Students ">
              <PiStudentLight /> <span>34</span>
            </div>
          </MyLink>
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
          {cls?.subclass_ids && (
            <Tooltip>
              <TooltipTrigger>
                <Badge variant={"outline"} library="daisy">
                  <MdClass /> <span>{cls.subclass_ids.length}</span>
                </Badge>
              </TooltipTrigger>
              <TooltipContent>Sub Classes</TooltipContent>
            </Tooltip>
          )}
        </div>
        <CardFooter
          className={cn(
            " border-t border-base-content/50 pb-4",
            isSchoolStaff && " flex flex-row justify-end gap-2",
          )}
        >
          {canModify && (
            <ClassModifySheet isSchool auth={auth} cls={cls} lang={lang} />
          )}
          <Button
            library="daisy"
            variant={isClassTeacher ? "info" : "primary"}
            className={cn("w-full", isSchoolStaff && "w-fit")}
            role="page"
            href={`/${lang}/c/${cls?.username}`}
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
