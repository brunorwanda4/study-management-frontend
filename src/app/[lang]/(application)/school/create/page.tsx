import PermissionPage from "@/components/page/permission-page";
import { Locale } from "@/i18n";
import { authContext } from "@/lib/utils/auth-context";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Create - school",
};

interface props {
  params: Promise<{ lang: Locale }>;
}

const SchoolStaffCreateSchoolPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const currentUser = await authContext();
  if (!currentUser) return redirect(`/${lang}/auth/login`);
  if (!currentUser.user.role) return redirect(`/${lang}/auth/onboarding`);
  if (currentUser.user.role !== "SCHOOLSTAFF")
    return <PermissionPage lang={lang} role={currentUser.user.role} />;

  return (
    <div className="mt-4 px-4">
      <div>
        <h1 className="basic-title">Create School</h1>
        <p>
          To create school they are some information we ask you to create school
          which help us to know your school please use real information
        </p>
      </div>
    </div>
  );
};

export default SchoolStaffCreateSchoolPage;
