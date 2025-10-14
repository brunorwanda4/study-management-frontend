import NotFoundPage from "@/components/page/not-found";
import StaffPeople from "@/components/page/school-staff/dashboard/staff-people";
import SchoolStudentTable from "@/components/page/school-staff/table/student-table/table-student-list";
import type { Locale } from "@/i18n";
import { getSchoolServer } from "@/lib/utils/auth";
import { getClassesBySchoolIdViewData } from "@/service/class/class.service";
import { getAllStudentBySchoolId } from "@/service/school/student-service";
import { Metadata } from "next";
import { redirect } from "next/navigation";

interface props {
  params: Promise<{ lang: Locale }>;
}

export const generateMetadata = async (): Promise<Metadata> => {
  const school = await getSchoolServer();
  return {
    title: school?.name
      ? `All Student in ${school?.schoolName}`
      : "School not found",
    description: school?.name
      ? `All student in ${school?.schoolName}`
      : "school not found",
  };
};

const SchoolStaffStudentPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const [currentUser, currentSchool] = await Promise.all([
    authContext(),
    getSchoolServer(),
  ]);

  if (!currentUser) {
    redirect(`/${lang}/auth/login`);
  }
  if (!currentSchool)
    return <NotFoundPage message="You need to have school to view this page" />;
  const [allStudents, cls] = await Promise.all([
    getAllStudentBySchoolId(currentSchool.schoolId),
    getClassesBySchoolIdViewData(currentSchool.schoolId),
  ]);
  return (
    <div className="space-y-4 p-4">
      <h2 className="title-page">Students</h2>
      <div className="flex space-x-4">
        <StaffPeople
          icon="/icons/student.png"
          link={`/${lang}/s-t/students`}
          total={allStudents.data?.length ?? 0}
          title="Students"
          Ftotal={
            allStudents.data?.filter((student) => student.gender === "FEMALE")
              .length ?? 0
          }
          Mtotal={
            allStudents.data?.filter((student) => student.gender === "MALE")
              .length ?? 0
          }
          role="Total students"
        />
        <StaffPeople
          icon="/icons/primary.png"
          link={`/${lang}/s-t/students?educationLevel=primary`} // TODO add search params for get student in primary in this school
          total={345}
          title="Primary"
          Ftotal={100}
          Mtotal={233}
          role="Total Primary Students"
        />
        <StaffPeople
          icon="/icons/OLevel.png"
          link={`/${lang}/s-t/students?educationLevel=OLevel`}
          total={345}
          title="Ordinary_level"
          Ftotal={100}
          Mtotal={233}
          role="Total Ordinary_level Students"
        />
      </div>
      <div>
        <SchoolStudentTable
          schoolId={currentSchool.schoolId}
          Classes={cls.data || []}
          lang={lang}
          students={allStudents?.data ? allStudents.data : []}
        />
      </div>
    </div>
  );
};
export default SchoolStaffStudentPage;
