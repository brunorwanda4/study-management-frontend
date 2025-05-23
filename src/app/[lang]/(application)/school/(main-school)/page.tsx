import JoinSchoolPage from "@/components/page/join-school-page";
import NotFoundPage from "@/components/page/not-found";
import SchoolHomeBody from "@/components/page/school/school-home-body";
import { Locale } from "@/i18n";
import { getAuthUserServer, getSchoolServer } from "@/lib/utils/auth";
import { getSchoolByIdService } from "@/service/school/school.service";
import { redirect } from "next/navigation";

interface props {
  params: Promise<{ lang: Locale }>;
}

const SchoolPage = async (props: props) => {
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
    <div className=" px-4 space-y-4">
      <SchoolHomeBody currentUser={currentUser} school={school.data} lang={lang} />
    </div>
  );
};

export default SchoolPage;
