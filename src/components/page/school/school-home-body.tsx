 import SchoolHomePosts from "./school-home-posts";
import SchoolHomeAbout from "./school-home-about";
import { Locale } from "@/i18n";
import SchoolContacts from "./school-contacts";
import SchoolStaff from "./school-staff";
import SchoolTeachers from "./school-teachers";
import SchoolStudents from "./school-student";
import { SchoolAndOthers } from "@/lib/schema/school.dto";
import { AuthUserDto } from "@/lib/utils/auth";

interface props {
  lang: Locale;
  school : SchoolAndOthers
  currentUser : AuthUserDto
}

const SchoolHomeBody = ({ lang,school , currentUser}: props) => {
  return (
    <div className=" w-full space-y-4">
      <div className=" flex space-x-4 justify-between w-full">
        <div className=" w-3/5  space-y-4">
          <SchoolHomePosts lang={lang} />
        </div>
        <div className=" w-2/5 space-y-4">
          <SchoolHomeAbout school={school} lang={lang}/>
          <SchoolContacts school={school}/>
          <SchoolStaff schoolStaff={school.SchoolStaff} lang={lang} />
          <SchoolTeachers currentUser={currentUser}  teachers={school.Teacher} lang={lang} />
          <SchoolStudents currentUser={currentUser} students={school.Student} lang={lang} />
        </div>
      </div>
    </div>
  );
};

export default SchoolHomeBody;
