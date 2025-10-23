import { Locale } from "@/i18n";
import { School } from "@/lib/schema/school/school-schema";
import { SchoolStaff as school_staff_t } from "@/lib/schema/school/school-staff-schema";
import { Student } from "@/lib/schema/school/student-schema";
import { Teacher } from "@/lib/schema/school/teacher-schema";
import { AuthContext } from "@/lib/utils/auth-context";
import SchoolContacts from "./school-contacts";
import SchoolHomeAbout from "./school-home-about";
import SchoolHomePosts from "./school-home-posts";
import SchoolStaff from "./school-staff";
import SchoolStudents from "./school-student";
import SchoolTeachers from "./school-teachers";

interface props {
  lang: Locale;
  school: School;
  auth: AuthContext;
  school_staffs: school_staff_t[];
  teachers: Teacher[];
  students: Student[];
}

const SchoolHomeBody = ({
  lang,
  school,
  auth,
  school_staffs,
  teachers,
  students,
}: props) => {
  return (
    <div className="w-full space-y-4">
      <div className="flex w-full justify-between space-x-4">
        <div className="w-3/5 space-y-4">
          <SchoolHomePosts lang={lang} />
        </div>
        <div className="w-2/5 space-y-4">
          <SchoolHomeAbout school={school} lang={lang} />
          <SchoolContacts school={school} />
          <SchoolStaff schoolStaff={school_staffs} lang={lang} />
          <SchoolTeachers auth={auth} teachers={teachers} lang={lang} />
          <SchoolStudents auth={auth} students={students} lang={lang} />
        </div>
      </div>
    </div>
  );
};

export default SchoolHomeBody;
