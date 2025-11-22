import MyAvatar from "@/components/common/image/my-avatar";
import MyImage from "@/components/common/myImage";
import MyLink from "@/components/common/myLink";
import type { Locale } from "@/i18n";
import type { Class } from "@/lib/schema/class/class-schema";
import { BsPeople } from "react-icons/bs";
import { FaBook } from "react-icons/fa6";

interface props {
  lang: Locale;
  cls: Class;
  totalStudents: number;
  totalTeachers: number;
  totalSubjects: number;
}

const ClassHero = () => {
  return (
    <section className=" relative h-fit">
      <MyImage
        src="/images/1.jpg"
        className=" h-52 w-full"
        classname=" card rounded-t-none"
      />
      <div className=" absolute z-20 -bottom-25 left-4 w-full">
        <div className=" flex items-center flex-row justify-between gap-4 w-full pr-12">
          <div className=" flex items-center gap-4">
            <MyAvatar
              size="2xl"
              type="cycle"
              className=" border-2 border-base-200"
            />
            <div>
              <h1 className="h3">Class name</h1>
              <MyLink roleTag="c" href="/">
                class_username
              </MyLink>
            </div>
          </div>
          <div className=" grid grid-cols-2 gap-4">
            <MyLink href="" className="flex items-center gap-2">
              <BsPeople />
              32 Students
            </MyLink>
            <MyLink href="" className="flex items-center gap-2">
              <BsPeople />9 Teachers
            </MyLink>
            <MyLink href="" className="flex items-center gap-2">
              <FaBook />
              12 Subjects
            </MyLink>
          </div>
          <div>
            <MyLink href="" className="flex items-center gap-2">
              <MyAvatar size="sm" type="squircle" />
              <div className="flex flex-col items-start">
                <h4 className="h4 leading-4">Teacher name</h4>
                <span className="text-sm text-neutral ">Class teacher</span>
              </div>
            </MyLink>
          </div>
        </div>
      </div>
      <div className=" mt-28" />
    </section>
  );
};

export default ClassHero;
