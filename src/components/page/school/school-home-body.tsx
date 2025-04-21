 import SchoolHomePosts from "./school-home-posts";
import SchoolHomeAbout from "./school-home-about";
import { Locale } from "@/i18n";
import SchoolContacts from "./school-contacts";
import SchoolStaff from "./school-staff";
import SchoolTeachers from "./school-teachers";
import SchoolStudents from "./school-student";
import SchoolClasses from "./school-classese";

interface props {
  lang: Locale;
}

const SchoolHomeBody = ({ lang }: props) => {
  return (
    <div className=" w-full space-y-4">
      <div className=" flex space-x-4 justify-between w-full">
        <div className=" w-3/5  space-y-4">
          <SchoolHomePosts lang={lang} />
          <SchoolClasses lang={lang}/>
        </div>
        <div className=" w-2/5 space-y-4">
          <SchoolHomeAbout lang={lang}/>
          <SchoolContacts />
          <SchoolStaff lang={lang} />
          <SchoolTeachers lang={lang} />
          <SchoolStudents lang={lang} />
        </div>
      </div>
    </div>
  );
};

export default SchoolHomeBody;
