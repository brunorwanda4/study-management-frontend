import ClassTimetable from "@/components/page/school-staff/class-components/time-table";
import StaffPeople from "@/components/page/school-staff/dashboard/staff-people";
import StudentAttendanceChart from "@/components/page/school-staff/students-components/students-attendance-chart";
import StudentsList from "@/components/page/school-staff/students-components/students-list";
import SchoolHeader from "@/components/page/school/school-header";
import type { Locale } from "@/i18n";
import { Metadata } from "next";

export const metadata : Metadata ={
  title : "Class Management",
  description : "Manage your class members and their roles",
  keywords : "class, management, students, teachers",
}

interface props {
  lang: Locale;
}

const SchoolStaffClassesPage = ({ lang }: props) => {
  return (
    <div className="p-4 space-y-2 max-w-full">
      <SchoolHeader onThePage lang={lang} />

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
            <StudentsList title="All Teachers" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="overflow-hidden">
            <StaffPeople
              lang={lang}
              total={100}
              Ftotal={50}
              Mtotal={50}
              title="Teachers"
              role="Teachers"
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
        <ClassTimetable />
      </div>
    </div>
  );
};
export default SchoolStaffClassesPage;
