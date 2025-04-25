import StaffPeople from "@/components/page/school-staff/dashboard/staff-people";
import { StudentProgressChart } from "@/components/page/school-staff/students-components/student-progress-chart";
import StudentStatus from "@/components/page/school-staff/students-components/student-status";
import StudentAttendanceChart from "@/components/page/school-staff/students-components/students-attendance-chart";
import StudentsList from "@/components/page/school-staff/students-components/students-list";
import { Metadata } from "next";

export const metadata : Metadata= {
  title: "Students management",
  description: "Students page",
  icons: {
    icon: "/favicon.ico",
  },
}

import type { Locale } from "@/i18n";
import TableList from "@/components/table/s-t/table-list";

interface props {
  lang: Locale;
}

const SchoolStaffStudentPage = ({ lang }: props) => {
  return (
    <div className="p-4 space-y-4 ">
      <div className=' flex space-x-4'>
      <StaffPeople lang={lang} total={762} title='Students' Ftotal={60} Mtotal={37} role='Total students'/>
      <StaffPeople lang={lang} total={345} title='Primary' Ftotal={100} Mtotal={233} role='Total Primary Students' />
      <StaffPeople lang={lang} total={345} title='Ordinary_level' Ftotal={100} Mtotal={233} role='Total Ordinary_level Students' />
    </div>
      <div>
      <TableList/>
      </div>
    </div>
  );
};
export default SchoolStaffStudentPage;
