"use client";
import MyAvatar from "@/components/common/image/my-avatar";
import MyImage from "@/components/common/myImage";
import MyLink from "@/components/common/myLink";
import StudentModifySheet from "@/components/page/school-staff/students-components/student-modify-sheet";
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
import type { StudentWithRelations } from "@/lib/schema/relations-schema";
import { cn } from "@/lib/utils";
import type { AuthContext } from "@/lib/utils/auth-context";

interface props {
  lang: Locale;
  auth: AuthContext;
  isSchoolStaff?: boolean;
  student?: StudentWithRelations;
}

const StudentCard = ({ auth, isSchoolStaff, student, lang }: props) => {
  const canModify =
    (isSchoolStaff && auth.user.role === "SCHOOLSTAFF") ||
    auth.user.role === "ADMIN";

  return (
    <Card className=" p-0">
      <CardHeader className="relative p-0 border-b-0">
        <MyImage
          src={
            student?.image
              ? student.image
              : student?.gender === "MALE"
                ? "/images/students/male.jpg"
                : "/images/students/female.jpg"
          }
          className="h-52 w-full  border-b border-base-content/50"
          classname=" card rounded-b-none"
        />
        <div className=" px-4 flex flex-col mt-1">
          <div className=" flex justify-between items-center">
            {student?.name && <h5 className=" font-medium">{student.name}</h5>}
            <Badge
              library="daisy"
              variant={student?.is_active ? "info" : "error"}
              size={"sm"}
            >
              Active
            </Badge>
          </div>

          {student?.user?.username && (
            <MyLink
              className=" link link-hover"
              href={`/${lang}/p/${student?.user?.username}`}
            >
              @ {student.user.username}
            </MyLink>
          )}
          {student?.registration_number && (
            <Tooltip>
              <TooltipTrigger asChild>
                <span className=" text-primary">
                  {student.registration_number}
                </span>
              </TooltipTrigger>
              <TooltipContent>Student code</TooltipContent>
            </Tooltip>
          )}
          {/* student class */}
          {student?.class && (
            <div className=" flex gap-2 mt-2">
              <MyAvatar
                src={student.class.image}
                alt={student.class.name}
                type="square"
                size="xs"
              />
              <span className=" text-sm line-clamp-1 ">
                {student.class.name}
              </span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className=" p-0 pb-4 flex flex-col justify-between">
        <div className=" px-4 flex flex-wrap gap-4"></div>

        <CardFooter
          className={cn(
            " border-t border-base-content/50 pb- bottom-0",
            isSchoolStaff && " flex flex-row justify-end gap-2",
          )}
        >
          {canModify && (
            <StudentModifySheet // server side component
              lang={lang}
              auth={auth}
              student={student}
              isSchool
            />
          )}
          {student?.user?.username && (
            <Button
              library="daisy"
              variant={"primary"}
              className={cn("w-full", isSchoolStaff && "w-fit")}
              role="page"
              href={`/${lang}/p/${student.user.username}`}
            >
              {"Vue student"}
            </Button>
          )}
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default StudentCard;
