import SchoolAdministrationForm from "@/components/forms/school/school-administration-form ";
import NotFoundPage from "@/components/page/not-found";
import PermissionPage from "@/components/page/permission-page";
import { Locale } from "@/i18n";
import { getAuthUserServer } from "@/lib/utils/auth";
import { getSchoolByIdService } from "@/service/school/school.service";
import { Metadata } from "next";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "school new Administration",
};
interface props {
  params: Promise<{ lang: Locale; schoolId: string }>;
}

const AdministrationPage = async (props: props) => {
  const params = await props.params;
  const { lang, schoolId } = params;
  const currentUser = await getAuthUserServer();
  if (!currentUser) return redirect(`/${lang}/auth/login`);
  if (currentUser.role !== "SCHOOLSTAFF")
    return <PermissionPage lang={lang} role={currentUser.role ?? "STUDENT"} />;
  const school = await getSchoolByIdService(schoolId);
  if (!school.data) return <NotFoundPage />;
  if (school.data.creatorId !== currentUser.id)
    return <PermissionPage lang={lang} role={currentUser.role ?? "STUDENT"} />;
  return (
    <div className=" px-4 mt-4 space-y-2">
      <div>
        <h1 className="title-page">School Administration Details</h1>
        <p>
          Fill out the form below to provide details about the school&apos;s
          administration and staff.
        </p>
      </div>
      <SchoolAdministrationForm schoolId={schoolId} lang={lang} currentUser={currentUser}/>
    </div>
  );
};

export default AdministrationPage;
