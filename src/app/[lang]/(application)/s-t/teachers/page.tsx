import StaffPeople from "@/components/page/school-staff/dashboard/staff-people";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teacher management",
  description: "Teacher page",
  icons: {
    icon: "/favicon.ico",
  },
};

import type { Locale } from "@/i18n";
import SchoolTeacherTable from "@/components/page/school-staff/table/teacher-table/table-teacher";

interface props {
  lang: Locale;
}

const SchoolStaffStudentPage = ({ lang }: props) => {
  return (
    <div className="p-4 space-y-4 ">
      <h2 className=" title-page">Teachers</h2>
      <div className=" flex space-x-4">
        <StaffPeople
          icon="/icons/teacher.png"
          link=""
          total={762}
          title="Teacher"
          Ftotal={60}
          Mtotal={37}
          role="Total Teacher"
        />
        <StaffPeople
          icon="/icons/primary.png"
          link=""
          total={345}
          title="Primary"
          Ftotal={100}
          Mtotal={233}
          role="Total Primary Teacher"
        />
        <StaffPeople
          icon="/icons/OLevel.png"
          link=""
          total={345}
          title="Ordinary_level"
          Ftotal={100}
          Mtotal={233}
          role="Total Ordinary_level Teacher"
        />
      </div>
      <div>
        <SchoolTeacherTable
          schoolId={"schoolId"}
          Classes={ []}
          lang={lang}
          teachers={ []}
        />
      </div>
    </div>
  );
};
export default SchoolStaffStudentPage;
