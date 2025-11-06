"use client";
import MyImage from "@/components/common/myImage";
import MyLink from "@/components/common/myLink";
import SchoolTeacherModifySheet from "@/components/page/school-staff/school-teachers/school-teacher-modify-sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import type { TeacherWithRelations } from "@/lib/schema/school/teacher-schema";
import { cn } from "@/lib/utils";
import type { AuthContext } from "@/lib/utils/auth-context";
import { BsBook } from "react-icons/bs";
import { MdClass } from "react-icons/md";

// const SchoolTeacherModifySheet = dynamic(
//   () =>
//     import(
//       "@/components/page/school-staff/school-teachers/school-teacher-modify-sheet"
//     ),
//   { ssr: false },
// );

interface props {
  lang: Locale;
  auth: AuthContext;
  isSchoolStaff?: boolean;
  teacher?: TeacherWithRelations;
}

const TeacherCard = ({ auth, isSchoolStaff, teacher, lang }: props) => {
  const canModify =
    (isSchoolStaff && auth.user.role === "SCHOOLSTAFF") ||
    auth.user.role === "ADMIN";

  return (
    <Card className=" p-0">
      <CardHeader className="relative p-0 border-b-0">
        <MyImage
          src={
            teacher?.image
              ? teacher.image
              : teacher?.gender === "MALE"
                ? "/images/teachers/male-teacher.jpg"
                : "/images/teachers/female-teacher.jpg"
          }
          className="h-52 w-full  border-b border-base-content/50"
          classname=" card rounded-b-none"
        />
        <div className=" px-4 flex flex-col mt-1">
          <div className=" flex justify-between items-center">
            {teacher?.name && <h5 className=" font-medium">{teacher.name}</h5>}
            <Badge
              library="daisy"
              variant={teacher?.is_active ? "info" : "error"}
              size={"sm"}
            >
              Active
            </Badge>
          </div>
          {teacher?.user?.username && (
            <MyLink
              className=" link link-hover"
              href={`/${lang}/p/${teacher?.user?.username}`}
            >
              @ {teacher.user.username}
            </MyLink>
          )}
          {teacher?.phone && <span>{teacher.phone}</span>}
        </div>
      </CardHeader>
      <CardContent className=" p-0 pb-4 flex flex-col justify-between">
        <div className=" px-4 flex flex-wrap gap-4">
          {/* students */}
          <Tooltip>
            <TooltipTrigger>
              <Badge variant={"outline"} library="daisy">
                <MdClass />{" "}
                <span>
                  {teacher?.class_ids ? teacher?.class_ids.length : 0}
                </span>
              </Badge>
            </TooltipTrigger>
            <TooltipContent>Classes</TooltipContent>
          </Tooltip>
          {/* subject */}
          <Tooltip>
            <TooltipTrigger>
              <Badge variant={"outline"} library="daisy">
                <BsBook />{" "}
                <span>
                  {teacher?.subject_ids ? teacher?.subject_ids.length : 0}
                </span>
              </Badge>
            </TooltipTrigger>
            <TooltipContent>Subjects</TooltipContent>
          </Tooltip>
        </div>

        <CardFooter
          className={cn(
            " border-t border-base-content/50 pb- bottom-0",
            isSchoolStaff && " flex flex-row justify-end gap-2",
          )}
        >
          {canModify && (
            <SchoolTeacherModifySheet // server side component
              lang={lang}
              auth={auth}
              teacher={teacher}
              isSchool
            />
          )}
          {teacher?.user?.username && (
            <Button
              library="daisy"
              variant={"primary"}
              className={cn("w-full", isSchoolStaff && "w-fit")}
              role="page"
              href={`/${lang}/p/${teacher.user.username}`}
            >
              {"Vue teacher"}
            </Button>
          )}
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default TeacherCard;
