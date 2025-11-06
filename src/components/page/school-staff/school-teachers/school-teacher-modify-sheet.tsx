import MyAvatar from "@/components/common/image/my-avatar";
import MyImage from "@/components/common/myImage";
import MyLink from "@/components/common/myLink";
import ClassTeacherDialog from "@/components/page/class/dialog/add-class-teacher-dialog";
import TeacherDialog from "@/components/page/teacher/dialog/teacher-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Locale } from "@/i18n";
import { splitCamelCase } from "@/lib/helpers/format-text";
import type { Class } from "@/lib/schema/class/class-schema";
import type { TeacherWithRelations } from "@/lib/schema/school/teacher-schema";
import { cn } from "@/lib/utils";
import type { AuthContext } from "@/lib/utils/auth-context";
import { formatReadableDate } from "@/lib/utils/format-date";
import apiRequest from "@/service/api-client";

interface props {
  teacher?: TeacherWithRelations;
  auth: AuthContext;
  isTable?: boolean;
  lang?: Locale;
  isSchool?: boolean;
}

const SchoolTeacherModifySheet = async ({
  teacher,
  auth,
  isTable,
  lang,
  isSchool,
}: props) => {
  const teacher_classes = await apiRequest<void, Class[]>(
    "get",
    isSchool
      ? `/school/classes/teacher/${teacher?._id || teacher?.id}`
      : `/classes/teacher/${teacher?._id || teacher?.id}`,
    undefined,
    { token: auth.token, schoolToken: auth.schoolToken },
  );

  return (
    <Sheet isPublic>
      <SheetTrigger asChild>
        {isTable ? (
          <Button library="daisy" variant={"ghost"} size={"sm"}>
            {teacher?.image && (
              <MyImage src={teacher?.image} alt={teacher?.name} role="ICON" />
            )}
            <span className=" min-w-32 line-clamp-1">{teacher?.name}</span>
          </Button>
        ) : (
          <Button library="daisy" variant={"outline"}>
            Modify teacher
          </Button>
        )}
      </SheetTrigger>
      <SheetContent
        isPublic
        className=" overflow-y-auto max-h-screen flex flex-col gap-4"
      >
        <SheetHeader className=" p-0 relative">
          <div className=" relative">
            <MyImage
              src={
                teacher?.image
                  ? teacher.image
                  : teacher?.gender === "MALE"
                    ? "/images/teachers/male-teacher.jpg"
                    : "/images/teachers/female-teacher.jpg"
              }
              className=" w-full h-64"
            />
            <div className=" space-x-1 p-4 ">
              <div className=" flex justify-between ">
                {teacher?.name && (
                  <h3
                    data-tip={teacher.name ?? "Teacher name"}
                    className="line-clamp-1 leading-5 font-medium tooltip text-lg"
                  >
                    {teacher?.name ?? "Teacher name"}
                  </h3>
                )}
                <Badge
                  library="daisy"
                  variant={teacher?.is_active ? "info" : "error"}
                >
                  Active
                </Badge>
              </div>
              {teacher?.user?.username && (
                <MyLink
                  className="line-clamp-1 flex space-x-1 link link-hover"
                  href={`/p/${teacher.user.username}`}
                >
                  <span>@</span>
                  <span className="line-clamp-1">{teacher.user.username}</span>
                </MyLink>
              )}
              <div className=" grid grid-cols-2 mt-4 gap-y-1 gap-x-2">
                <div className=" flex gap-2">
                  <span>Subjects:</span>
                  <span className=" font-medium">
                    {teacher?.subject_ids ? teacher?.subject_ids.length : 0}
                  </span>
                </div>
                <div className=" flex gap-2">
                  <span>Classes:</span>
                  <span className=" font-medium">
                    {teacher?.class_ids ? teacher?.class_ids.length : 0}
                  </span>
                </div>
                {teacher?.phone && (
                  <div className=" flex gap-2">
                    <span>Phone number:</span>
                    <span className=" font-medium">{teacher.phone}</span>
                  </div>
                )}
                {teacher?.gender && (
                  <div className=" flex gap-2">
                    <span>Gender:</span>
                    <span className=" font-medium">
                      {splitCamelCase(teacher.gender)}
                    </span>
                  </div>
                )}
                {teacher?.type && (
                  <div className=" flex gap-2">
                    <span>Type of teacher:</span>
                    <span className=" font-medium">{teacher.type}</span>
                  </div>
                )}
                {teacher?.user?.employment_type && (
                  <div className=" flex gap-2">
                    <span>Employment type:</span>
                    <span className=" font-medium">
                      {splitCamelCase(teacher.user.employment_type)}
                    </span>
                  </div>
                )}
              </div>
              {/* user */}
              {teacher?.user && (
                <div className=" flex gap-2 mt-4 items-center">
                  <MyAvatar
                    src={teacher.image}
                    alt={teacher.name}
                    role={{ role: "TEACHER", gender: teacher.gender }}
                    size="sm"
                  />
                  <div className=" flex flex-col gap-0">
                    <p className=" font-medium leading-4">
                      {teacher.user.name}
                    </p>
                    <MyLink
                      href={`/${lang}/p/${teacher.user.username}`}
                      className=" link link-hover"
                    >
                      <span className=" text-sm leading-4">
                        @ {teacher.user.username}
                      </span>
                    </MyLink>
                  </div>
                </div>
              )}
            </div>
            <div className=" flex gap-4 justify-end px-4">
              <div className=" flex gap-2 text-xs opacity-80">
                <span className=" ">Created on:</span>{" "}
                <span className=" font-medium">
                  {formatReadableDate(teacher?.created_at)}
                </span>
              </div>
              <div className=" flex gap-2 text-xs opacity-80">
                <span>Last update:</span>{" "}
                <span className=" font-medium">
                  {formatReadableDate(teacher?.updated_at)}
                </span>
              </div>
            </div>
            <div className=" mt-4 px-4 flex justify-start flex-wrap gap-2 flex-row">
              <TeacherDialog
                isSchool={isSchool}
                auth={auth}
                teacher={teacher}
              />
              {teacher?.user?.username && (
                <Button
                  library="daisy"
                  variant={"primary"}
                  className={cn("w-fit")}
                  role="page"
                  size={"sm"}
                  href={`/${lang}/p/${teacher?.user.username}`}
                >
                  {"Vue Teacher"}
                </Button>
              )}
            </div>
          </div>
        </SheetHeader>
        {/* other data */}
        <main className=" px-4">
          {/* classes */}
          <div className=" flex flex-col gap-2">
            <div className=" flex justify-between w-full items-center">
              <Label>Teacher Classes</Label>
              <ClassTeacherDialog auth={auth} />
            </div>
            <div className=" flex flex-col gap-2">
              {teacher_classes.data &&
                teacher_classes.data.map((tea) => {
                  return (
                    <div
                      key={tea._id || tea.id}
                      className=" flex justify-between items-center w-full"
                    >
                      <div className=" flex gap-2 items-center">
                        <MyAvatar size="sm" type="square" />
                        <div className=" flex flex-col">
                          <span className="">class name</span>
                          <span>@ class_username</span>
                        </div>
                      </div>
                      <Button
                        size={"sm"}
                        variant={"ghost"}
                        library="daisy"
                        type="button"
                      >
                        Remove
                      </Button>
                    </div>
                  );
                })}
            </div>
          </div>
        </main>
        <SheetFooter className=" h-screen">
          <div className="h-screen" />
          app footer
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SchoolTeacherModifySheet;
