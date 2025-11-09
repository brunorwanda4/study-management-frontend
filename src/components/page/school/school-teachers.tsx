import UserCardSmall from "@/components/cards/user-card-small";
import MyLink from "@/components/common/myLink";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n";
import type { Teacher } from "@/lib/schema/school/teacher-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import Link from "next/link";
import { BsPlusCircle } from "react-icons/bs";

interface props {
  lang: Locale;
  onThePage?: boolean;
  teachers: Teacher[];
  auth: AuthContext;
}

const SchoolTeachers = ({ lang, onThePage, auth, teachers }: props) => {
  if (teachers.length === 0) {
    return (
      <div className="basic-card space-y-2">
        <h3 className="basic-title text-center text-gray-500">
          This school have not have teaches! 😔
        </h3>
        {auth.user.role === "SCHOOLSTAFF" && (
          <div>
            <MyLink
              button={{ variant: "primary", library: "daisy" }}
              type="button"
              href="s-t/teachers"
              className="w-full"
              classname=" w-full"
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
    <div className="basic-card space-y-2">
      <div className="">
        <h3 className="font-semibold capitalize">Teachers </h3>
      </div>
      {teachers.map((item) => {
        return (
          <UserCardSmall
            key={item._id || item.id}
            id={item.id}
            role="t"
            lang={lang}
            userRole="TEACHER"
            name={item.name}
            image={item.image}
            userId={item.user_id || ""}
          />
        );
      })}
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

export default SchoolTeachers;
