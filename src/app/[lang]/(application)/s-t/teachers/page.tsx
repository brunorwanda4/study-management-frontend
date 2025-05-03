import StaffPeople from "@/components/page/school-staff/dashboard/staff-people";
import { Metadata } from "next";
import type { Locale } from "@/i18n";
import { getAuthUserServer, getSchoolServer } from "@/lib/utils/auth";
import { redirect } from "next/navigation";
import NotFoundPage from "@/components/page/not-found";
import { getAllTeacherBySchoolId } from "@/service/school/teacher-service";
import SchoolTeacherTable from "@/components/page/school-staff/table/teacher-table/table-teacher";

interface props {
  params: Promise<{ lang: Locale }>;
}

export const generateMetadata = async (): Promise<Metadata> => {
  const school = await getSchoolServer();
  return {
    title: school?.name
      ? `All Teacher in ${school?.schoolName}`
      : "School not found",
    description: school?.name
      ? `All Teacher in ${school?.schoolName}`
      : "school not found",
  };
};

interface props {
  lang: Locale;
}

const SchoolStaffTeacherPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const [currentUser, currentSchool] = await Promise.all([
    getAuthUserServer(),
    getSchoolServer(),
  ]);

  if (!currentUser) {
    redirect(`/${lang}/auth/login`);
  }
  if (!currentSchool)
    return <NotFoundPage message="You need to have school to view this page" />;
  const [allTeachers] = await Promise.all([
    getAllTeacherBySchoolId(currentSchool.schoolId),
  ]);
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
          schoolId={currentSchool.schoolId}
          lang={lang}
          teachers={ allTeachers.data ?? [] }
        />
      </div>
    </div>
  );
};
export default SchoolStaffTeacherPage;
