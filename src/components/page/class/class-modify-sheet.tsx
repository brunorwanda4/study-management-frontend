import MyImage from "@/components/common/myImage";
import MyLink from "@/components/common/myLink";
import ChangeClassTeacherDialog from "@/components/page/school-staff/dialog/change-class-teacher-dialog";
import ClassDialog from "@/components/page/school-staff/dialog/class-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Locale } from "@/i18n";
import type { ClassWithOthers } from "@/lib/schema/class/class-schema";
import { cn } from "@/lib/utils";
import type { AuthContext } from "@/lib/utils/auth-context";
import { formatReadableDate } from "@/lib/utils/format-date";
import { BsBook } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { PiStudentLight } from "react-icons/pi";
import { SiLevelsdotfyi } from "react-icons/si";

interface props {
  cls?: ClassWithOthers;
  auth: AuthContext;
  isTable?: boolean;
  lang?: Locale;
}

const ClassModifySheet = ({ cls, auth, isTable, lang }: props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {isTable ? (
          <Button library="daisy" variant={"ghost"} size={"sm"}>
            {cls?.image && (
              <MyImage src={cls?.image} alt={cls?.name} role="ICON" />
            )}
            <span className=" min-w-32 line-clamp-1">{cls?.name}</span>
          </Button>
        ) : (
          <Button library="daisy" variant={"outline"}>
            Modify Class
          </Button>
        )}
      </SheetTrigger>
      <SheetContent isPublic>
        <SheetHeader className=" p-0 relative">
          <div className=" relative">
            <MyImage src="/images/1.jpg" className=" w-full" />
            <div className="absolute -bottom-18 flex items-center gap-2 p-4">
              <Avatar className="size-20 border border-base-content/50 shadow">
                <AvatarImage src={cls?.image ?? "/images/2.jpg"} />
                <AvatarFallback>LOGO</AvatarFallback>
              </Avatar>
              <div className="mt-6 space-x-1">
                <h3
                  data-tip={cls?.name ?? "Level 5 Software"}
                  className="line-clamp-1 leading-5 font-medium tooltip text-lg"
                >
                  {cls?.name ?? "Level 5 Software development"}
                </h3>
                <MyLink
                  className="line-clamp-1 flex space-x-1 link link-hover"
                  href={`/class`}
                >
                  <span>@</span>{" "}
                  <span className="line-clamp-1">
                    {cls?.username ?? "L5SOD"}
                  </span>
                </MyLink>
              </div>
            </div>
          </div>

          <div className=" mt-14 flex flex-col gap-2 px-4">
            <div className=" grid grid-cols-2 gap-y-1">
              <div className=" flex flex-row gap-2">
                <span>Code: </span>
                <span className=" text-primary">{cls?.code ?? "CODE123"}</span>
              </div>
              <div className=" flex gap-2 items-center">
                <div className=" flex gap-1 items-center">
                  <SiLevelsdotfyi /> <span>Level:</span>
                </div>
                <span className=" font-medium">
                  {cls?.trade?.name ?? "Primary"}
                </span>
              </div>
              <div className=" flex gap-2 items-center">
                <div className=" flex gap-1 items-center">
                  <PiStudentLight /> <span>Students:</span>
                </div>
                <span className=" font-medium">30</span>
              </div>
              <div className=" flex gap-2 items-center">
                <div className=" flex gap-1 items-center">
                  <BsBook /> <span>Subjects:</span>
                </div>
                <span className=" font-medium">20</span>
              </div>
              {cls?.capacity && (
                <div className=" flex gap-2 items-center">
                  <div className=" flex gap-1 items-center">
                    <FaPeopleGroup /> <span>Capacity:</span>
                  </div>
                  <span className=" font-medium">{cls?.capacity}</span>
                </div>
              )}
            </div>
            <div>{/* Other data which are needed */}</div>
            {cls?.description && (
              <div className=" flex flex-col">
                <h6 className="">Description:</h6>
                <p className=" text-sm ml-4">{cls.description}</p>
              </div>
            )}
            <div className=" flex gap-4 justify-end">
              <div className=" flex gap-2 text-sm">
                <span>Created on:</span>{" "}
                <span className=" font-medium">
                  {formatReadableDate(cls?.created_at)}
                </span>
              </div>
              <div className=" flex gap-2 text-sm">
                <span>Last update:</span>{" "}
                <span className=" font-medium">
                  {formatReadableDate(cls?.updated_at)}
                </span>
              </div>
            </div>
            <div className=" mt-4 flex justify-end flex-wrap gap-2">
              <Button
                library="daisy"
                variant={"primary"}
                className={cn("w-fit")}
                role="page"
                size={"sm"}
                href={`${lang}/c/`}
              >
                {"Visit class"}
              </Button>
              <ClassDialog auth={auth} isSchool cls={cls} />
            </div>
          </div>
        </SheetHeader>
        <Separator />
        <main className="px-4">
          {/* class teacher */}
          <div className=" space-y-4 flex-col flex">
            <Label className=" ">Class Teacher</Label>
            <div className=" flex justify-between flex-row items-center">
              <div className=" flex gap-2 items-center">
                <MyImage
                  role="AVATAR"
                  src={"/images/3.jpg"}
                  className=" size-14"
                />
                <div className=" flex flex-col">
                  <span className="">teacher name</span>
                  <span>@ teacher_username</span>
                </div>
              </div>
              <ChangeClassTeacherDialog />
            </div>
          </div>
        </main>
      </SheetContent>
    </Sheet>
  );
};

export default ClassModifySheet;
