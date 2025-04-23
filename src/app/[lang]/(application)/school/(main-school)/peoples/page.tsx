import JoinSchoolPage from "@/components/page/join-school-page";
import NotFoundPage from "@/components/page/not-found";
import SchoolStaff from "@/components/page/school/school-staff";
import SchoolStudents from "@/components/page/school/school-student";
import SchoolTeachers from "@/components/page/school/school-teachers";
import { Locale } from "@/i18n";
import { getAuthUserServer, getSchoolServer } from "@/lib/utils/auth";
import { getSchoolByIdService } from "@/service/school/school.service";
import { redirect } from "next/navigation";
interface props {
  params: Promise<{ lang: Locale }>;
}

const SchoolPeoplePage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const [currentUser, currentSchool] = await Promise.all([
    await getAuthUserServer(),
    await getSchoolServer(),
  ]);

  if (!currentUser) {
    redirect(`/${lang}/auth/login`);
  }
  if (!currentSchool) return <JoinSchoolPage />;
  const school = await getSchoolByIdService(currentSchool.schoolId);
  if (!school.data) return <NotFoundPage />;

  return (
    <div className="  min-h-screen px-4 space-x-4 flex ">
      <div className=" w-1/2 space-y-4">
        <SchoolStaff schoolStaff={school.data.SchoolStaff} lang={lang} />
        <SchoolStudents currentUser={currentUser} students={school.data.Student} onThePage lang={lang} />
      </div>
      <div className=" w-1/2 space-y-4">
        <SchoolTeachers currentUser={currentUser} teachers={school.data.Teacher} onThePage lang={lang} />
      </div>
      <div className=" h-screen"></div>
    </div>
  );
};

export default SchoolPeoplePage;
