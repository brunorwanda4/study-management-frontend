import PermissionPage from "@/components/page/permission-page";
import CreateSchoolForm from "@/components/page/school/create/create-school-form";
import { Locale } from "@/i18n";
import { authContext } from "@/lib/utils/auth-context";
import { Metadata } from "next";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "Create school | space-together",
};
interface props {
  params: Promise<{ lang: Locale }>;
}

const SchoolStaffRegisterSchool = async (props: props) => {
  const params = await props.params;
  const { lang } = params;

  const auth = await authContext();
  if (!auth) return redirect(`/${lang}/auth/login`);

  const allowedRoles = ["ADMIN", "SCHOOLSTAFF"];
  if (!auth.user.role || !allowedRoles.includes(auth.user.role))
    return <PermissionPage lang={lang} role={auth.user.role ?? "STUDENT"} />;

  return (
    <div className="mt-4 space-y-2 px-4">
      <div>
        <h1 className="title-page">Register a New School</h1>
        <p>
          To register your school, please provide accurate information. This
          helps us understand your institution better and ensures smooth
          onboarding. Make sure to use real and up-to-date details about your
          school.
        </p>
      </div>
      <CreateSchoolForm auth={auth} lang={lang} />
    </div>
  );
};

export default SchoolStaffRegisterSchool;
