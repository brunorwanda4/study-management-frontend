import UserCardSmall from "@/components/cards/user-card-small";
import MyLink from "@/components/myComponents/myLink";
import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n";
import { TeacherDto } from "@/lib/schema/school/teacher.dto";
import { AuthUserDto } from "@/lib/utils/auth";
import Link from "next/link";
import { BsPlusCircle } from "react-icons/bs";

interface props {
  lang: Locale;
  onThePage?: boolean;
  teachers: TeacherDto[];
  currentUser: AuthUserDto;
}

const SchoolTeachers = ({ lang, onThePage, currentUser, teachers }: props) => {
  if (teachers.length === 0) {
    return (
      <div className=" basic-card space-y-2">
        <h3 className=" text-center basic-title text-gray-500">
          This school have not have teaches! 😔
        </h3>
        {currentUser.role === "SCHOOLSTAFF" && (
          <div>
            <MyLink
              button={{ variant: "primary", library: "daisy" }}
              type="button"
              href="s-t/teachers"
              className=" w-auto"
            >
              <BsPlusCircle />
              Add new teaches
            </MyLink>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className=" basic-card space-y-2">
      <div className="">
        <h3 className=" font-semibold capitalize">Teachers </h3>
      </div>
      {teachers.map((item) => {
        return (
          <UserCardSmall
            key={item.id}
            id={item.id}
            role="t"
            lang={lang}
            userRole="TEACHER"
          />
        );
      })}
      {!onThePage && (
        <Link
          href={`/${lang}/school/peoples`}
          className=" w-full items-center flex justify-center"
        >
          <Button variant="ghost" size="sm" className=" w-full">
            See More
          </Button>
        </Link>
      )}
    </div>
  );
};

export default SchoolTeachers;
