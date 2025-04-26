import StaffPeople from "@/components/page/school-staff/dashboard/staff-people";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Students management",
  description: "Students page",
  icons: {
    icon: "/favicon.ico",
  },
};

import type { Locale } from "@/i18n";
import TableList from "@/components/page/school-staff/table/table-student-list";

interface props {
  lang: Locale;
}

const SchoolStaffStudentPage = ({ lang }: props) => {
  return (
    <div className="p-4 space-y-4">
      <h2 className=" title-page">Students</h2>
      <div className=" flex space-x-4">
        <StaffPeople
          icon="/icons/student.png"
          lang={lang}
          total={762}
          title="Students"
          Ftotal={60}
          Mtotal={37}
          role="Total students"
        />
        <StaffPeople
          icon="/icons/primary.png"
          lang={lang}
          total={345}
          title="Primary"
          Ftotal={100}
          Mtotal={233}
          role="Total Primary Students"
        />
        <StaffPeople
          icon="/icons/OLevel.png"
          lang={lang}
          total={345}
          title="Ordinary_level"
          Ftotal={100}
          Mtotal={233}
          role="Total Ordinary_level Students"
        />
      </div>
      <div>
        <TableList />
      </div>
    </div>
  );
};
export default SchoolStaffStudentPage;
