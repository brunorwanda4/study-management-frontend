import { Locale } from "@/i18n";
import { SchoolAndOthers } from "@/lib/schema/school/school.dto";
import { authContextDto } from "@/lib/utils/auth";
import SchoolContacts from "./school-contacts";
import SchoolHomeAbout from "./school-home-about";
import SchoolHomePosts from "./school-home-posts";
import SchoolStaff from "./school-staff";
import SchoolStudents from "./school-student";
import SchoolTeachers from "./school-teachers";

interface props {
  lang: Locale;
  school: SchoolAndOthers;
  currentUser: authContextDto;
}

const SchoolHomeBody = ({ lang, school, currentUser }: props) => {
  return (
    <div className="w-full space-y-4">
      <div className="flex w-full justify-between space-x-4">
        <div className="w-3/5 space-y-4">
          <SchoolHomePosts lang={lang} />
        </div>
        <div className="w-2/5 space-y-4">
          <SchoolHomeAbout school={school} lang={lang} />
          <SchoolContacts school={school} />
          <SchoolStaff schoolStaff={school.SchoolStaff} lang={lang} />
          <SchoolTeachers
            currentUser={currentUser}
            teachers={school.Teacher}
            lang={lang}
          />
          <SchoolStudents
            currentUser={currentUser}
            students={school.Student}
            lang={lang}
          />
        </div>
      </div>
    </div>
  );
};

export default SchoolHomeBody;
