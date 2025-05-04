import NotFoundPage from "@/components/page/not-found";
import UpdateSchoolPublicInfo from "@/components/page/school-staff/school-setting/froms/update-school-public-info-form";
import { Locale } from "@/i18n";
import { getAuthUserServer, getSchoolServer } from "@/lib/utils/auth";
import { getSchoolByIdService } from "@/service/school/school.service";
import { Metadata } from "next";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "School setting",
  description: "Join School Requests",
};
interface props {
  params: Promise<{ lang: Locale; schoolId: string }>;
}

const SchoolSettingsPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const [currentUser, currentSchool] = await Promise.all([getAuthUserServer(), getSchoolServer()]);
  if (!currentUser?.role) return redirect(`/${lang}/auth/login`);
  if (!currentSchool) return <NotFoundPage message="You need to have school to access this page"/>
  const school = await getSchoolByIdService(currentSchool.schoolId);
  if (!school.data) return <NotFoundPage />
  return (
    <div>
      <h2 className=" title-page">School Public Information</h2>
      <UpdateSchoolPublicInfo lang={lang} school={school.data} />
    </div>
  );
};

export default SchoolSettingsPage;
