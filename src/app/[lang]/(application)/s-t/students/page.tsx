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

interface props {
  lang: Locale;
}

const SchoolStaffStudentPage = ({ lang }: props) => {
  return (
    <div className="p-4 space-y-2 max-w-full">
      {/* <SchoolHeader onThePage lang={lang} /> */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 space-x-4">
        <div className="space-y-4">
          <div className="overflow-hidden">
            <StaffPeople
              lang={lang}
              total={100}
              Ftotal={50}
              Mtotal={50}
              title="Students"
              role="Student"
            />
          </div>

          <div className=" overflow-hidden">
            <StudentsList title="New Comers" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="overflow-hidden">
            <StudentStatus
              lang={lang}
              status="Students Status rol"
              role="Student"
            />
          </div>

          <div className="  overflow-hidden">
            <StudentsList title="All students" />
          </div>
        </div>
      </div>
      <div className="happy-card ">
        <StudentAttendanceChart />
      </div>

      <div>
        <StudentProgressChart title="Student Performance Distribution" />
      </div>
    </div>
  );
};
export default SchoolStaffStudentPage;
