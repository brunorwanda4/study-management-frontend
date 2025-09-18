import UserCardSmall from "@/components/cards/user-card-small";
import MyLink from "@/components/comon/myLink";
import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n";
import { StudentDto } from "@/lib/schema/school/student.dto";
import { AuthUserDto } from "@/lib/utils/auth";
import Link from "next/link";
import { BsPlusCircle } from "react-icons/bs";

interface props {
  lang: Locale;
  onThePage?: boolean;
  students: StudentDto[];
  currentUser: AuthUserDto;
}

const SchoolStudents = ({ lang, currentUser, students, onThePage }: props) => {
  if (students.length === 0) {
    return (
      <div className="basic-card space-y-2">
        <h3 className="basic-title text-center text-gray-500">
          This school have no students! 😔
        </h3>
        {currentUser.role === "SCHOOLSTAFF" && (
          <div>
            <MyLink
              button={{ variant: "primary", library: "daisy" }}
              type="button"
              href="s-t/students"
              className="w-full"
              classname=" w-full"
            >
              <BsPlusCircle />
              Add new students
            </MyLink>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="basic-card space-y-2">
      <div className="">
        <h3 className="font-semibold capitalize">school Student </h3>
      </div>
      <div className="ml-2 space-y-2">
        {students.map((item) => {
          return (
            <UserCardSmall
              key={item.id}
              id={item.id}
              role="s"
              lang={lang}
              userRole="STUDENT"
              userId={item.userId}
            />
          );
        })}
      </div>
      {!onThePage && (
        <Link
          href={`/${lang}/school/peoples`}
          className="flex w-full items-center justify-center"
        >
          <Button variant="ghost" size="sm" className="w-full">
            See More
          </Button>
        </Link>
      )}
    </div>
  );
};

export default SchoolStudents;
