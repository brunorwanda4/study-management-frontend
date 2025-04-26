import PermissionPage from "@/components/page/permission-page";
import ClassTimetable from "@/components/page/school-staff/class-components/time-table";
import StaffPeople from "@/components/page/school-staff/dashboard/staff-people";
import StudentAttendanceChart from "@/components/page/school-staff/students-components/students-attendance-chart";
import StudentsList from "@/components/page/school-staff/students-components/students-list";
import SchoolHeader from "@/components/page/school/school-header";
import type { Locale } from "@/i18n";
import { getAuthUserServer, getSchoolServer } from "@/lib/utils/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Class Management",
  description: "Manage your class members and their roles",
  keywords: "class, management, students, teachers",
};

interface props {
  params: Promise<{ lang: Locale }>;
}

const SchoolStaffClassesPage = async (props : props) => {
  const params = await props.params;
  const { lang } = params;
  const [currentUser, currentSchool] = await Promise.all([
    await getAuthUserServer(),
    await getSchoolServer(),
  ]);

  if (!currentUser) {
    redirect(`/${lang}/auth/login`);
  }

  if (!currentSchool) return <PermissionPage lang={lang} role={currentUser.role ?? "STUDENT"}/>
  // const school = await getSchoolByIdService(currentSchool.schoolId);
  // if (!school.data) return <NotFoundPage />;
  return (
    <div className="p-4 space-y-2 max-w-full">
      <SchoolHeader currentUser={currentUser} currentSchool={currentSchool} onThePage lang={lang} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 space-x-4">
        <div className="space-y-4">
          <div className="overflow-hidden">
            <StaffPeople
              icon="/icons/student.png"
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
              icon="/icons/teacher.png"
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
