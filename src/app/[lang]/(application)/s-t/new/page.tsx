import CreateSchoolForm from "@/components/forms/create-school-form";
import PermissionPage from "@/components/page/permission-page";
import { Locale } from "@/i18n";
import { getAuthUserServer } from "@/lib/utils/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Create - school",
};
interface props {
  params: Promise<{ lang: Locale }>;
}

const SchoolStaffRegisterSchool = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const currentUser = await getAuthUserServer();
  if (!currentUser) return redirect(`/${lang}/auth/login`);
  if (currentUser.role !== "SCHOOLSTAFF")
    return <PermissionPage lang={lang} role={currentUser.role ?? "STUDENT"} />;

  return (
    <div className=" px-4 mt-4 space-y-2">
      <div>
        <h1 className="title-page">Register a New School</h1>
        <p>
          To register your school, please provide accurate information. This
          helps us understand your institution better and ensures smooth
          onboarding. Make sure to use real and up-to-date details about your
          school.
        </p>
      </div>
      <CreateSchoolForm userId={currentUser.id} lang={lang} />
    </div>
  );
};

export default SchoolStaffRegisterSchool;
