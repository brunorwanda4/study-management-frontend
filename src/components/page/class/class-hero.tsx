import MyAvatar from "@/components/common/image/my-avatar";
import MyImage from "@/components/common/myImage";
import MyLink from "@/components/common/myLink";
import type { Locale } from "@/i18n";
import type { Class } from "@/lib/schema/class/class-schema";
import type { Teacher } from "@/lib/schema/school/teacher-schema";
import { BsPeople } from "react-icons/bs";
import { FaBook } from "react-icons/fa6";

interface props {
  lang: Locale;
  cls: Class;
  totalStudents: number;
  totalTeachers: number;
  totalSubjects: number;
  classTeacher?: Teacher;
}

const ClassHero = ({
  lang,
  cls,
  totalStudents,
  totalTeachers,
  totalSubjects,
  classTeacher,
}: props) => {
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
              alt={cls.name}
              src={cls.image}
              size="2xl"
              isSubClass
              type="cycle"
              className=" border-2 border-base-200"
            />
            <div>
              <h1 title={cls.name} className="h3 line-clamp-1 max-w-80">
                {cls.name}
              </h1>
              <MyLink
                roleTag="c"
                href={`/${lang}/c/${cls.username}`}
                className="line-clamp-1 max-w-80"
              >
                <span title={cls.username}>{cls.username}</span>
              </MyLink>
            </div>
          </div>
          <div className=" grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
            <MyLink
              href={`/${lang}/c/${cls.username}/people#students`}
              className="flex items-center gap-2"
            >
              <BsPeople />
              {totalStudents ?? 32} Students
            </MyLink>
            <MyLink
              href={`/${lang}/c/${cls.username}/people#teachers`}
              className="flex items-center gap-2"
            >
              <BsPeople />
              {totalTeachers ?? 0} Teachers
            </MyLink>
            <MyLink
              href={`/${lang}/c/${cls.username}/subjects`}
              className="flex items-center gap-2"
            >
              <FaBook />
              {totalSubjects ?? 0} Subjects
            </MyLink>
          </div>
          <div>
            {classTeacher && (
              <MyLink href="" className="flex items-center gap-2">
                <MyAvatar
                  src={classTeacher.image}
                  alt={classTeacher.name}
                  size="sm"
                  type="squircle"
                />
                <div className="flex flex-col items-start">
                  <h4 className="h4 leading-4">{classTeacher.name}</h4>
                  <span className="text-sm text-base-content/50 ">
                    Class teacher
                  </span>
                </div>
              </MyLink>
            )}
          </div>
        </div>
      </div>
      <div className=" mt-28" />
    </section>
  );
};

export default ClassHero;
