import { SchoolAcademicForm } from "@/components/table/school/school-academic-form";
import NotFoundPage from "@/components/page/not-found";
import PermissionPage from "@/components/page/permission-page";
import { Locale } from "@/i18n";
import { authUser } from "@/lib/utils/auth-user";
import { getSchoolByIdService } from "@/service/school/school.service";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "school - Academic",
};
interface props {
  params: Promise<{ lang: Locale; schoolId: string }>;
}

const SchoolAcademicOnboardingPage = async (props: props) => {
  const params = await props.params;
  const { lang, schoolId } = params;
  const currentUser = (await authUser())?.user;
  if (!currentUser) return redirect(`/${lang}/auth/login`);
  if (currentUser.role !== "SCHOOLSTAFF")
    return <PermissionPage lang={lang} role={currentUser.role ?? "STUDENT"} />;
  const school = await getSchoolByIdService(schoolId);
  if (!school.data) return <NotFoundPage />;
  if (school.data.creatorId !== currentUser.id)
    return <PermissionPage lang={lang} role={currentUser.role ?? "STUDENT"} />;
  return (
    <div className="mt-4 space-y-2 px-4">
      <div>
        <h1 className="title-page">Educational Background Information</h1>
        <p>
          Please provide details about the academic offerings based on the
          school&apos;s configuration.
        </p>
      </div>
      <SchoolAcademicForm lang={lang} school={school.data} />
    </div>
  );
};

export default SchoolAcademicOnboardingPage;
