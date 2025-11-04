import MyImage from "@/components/common/myImage";
import ChangeClassTeacherDialog from "@/components/page/school-staff/dialog/change-class-teacher-dialog";
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
import Link from "next/link";
import { BsBook } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { PiStudentLight } from "react-icons/pi";
import { SiLevelsdotfyi } from "react-icons/si";

const ClassModifySheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button library="daisy" variant={"outline"}>
          Modify Class
        </Button>
      </SheetTrigger>
      <SheetContent isPublic>
        <SheetHeader className=" p-0 relative">
          <div className=" relative">
            <MyImage src="/images/1.jpg" className=" w-full" />
            <div className="absolute -bottom-18 flex items-center gap-2 p-4">
              <Avatar className="size-20 border border-base-content/50 shadow">
                <AvatarImage src="/images/2.jpg" />
                <AvatarFallback>LOGO</AvatarFallback>
              </Avatar>
              <div className="mt-6 space-x-1">
                <h3
                  data-tip={"Level 5 Software"}
                  className="line-clamp-1 leading-5 font-medium tooltip"
                >
                  {"Level 5 Software development"}
                </h3>
                <Link
                  className="line-clamp-1 flex space-x-1 text-sm"
                  href={`/class`}
                >
                  <span>@</span> <span className="line-clamp-1">{"L5SOD"}</span>
                </Link>
              </div>
            </div>
          </div>
          <div className=" mt-14 flex flex-col gap-2 px-4">
            <div className=" grid grid-cols-2 gap-y-1">
              <div className=" flex flex-row gap-2">
                <span>Code: </span>
                <span className=" text-primary">CODE123</span>
              </div>
              <div className=" flex gap-2 items-center">
                <div className=" flex gap-1 items-center">
                  <SiLevelsdotfyi /> <span>Level:</span>
                </div>
                <span className=" font-medium">Primary</span>
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
              <div className=" flex gap-2 items-center">
                <div className=" flex gap-1 items-center">
                  <FaPeopleGroup /> <span>Capacity:</span>
                </div>
                <span className=" font-medium">45</span>
              </div>
            </div>
            <div>{/* Other data which are needed */}</div>
            <p className=" text-sm ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
              facere sed iste quo delectus distinctio reprehenderit
              exercitationem sapiente? Officia aperiam nihil vero ex unde sed
              minus rem repellat. Nemo, sed?
            </p>
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
