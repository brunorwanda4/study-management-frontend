
import PermissionPage from "@/components/page/permission-page";
// import SchoolCreateBody from "@/components/page/school/create/school-create-body";
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

const SchoolStaffCreateSchoolPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const currentUser = await getAuthUserServer();
  if (!currentUser) return redirect(`/${lang}/auth/login`);
  if (!currentUser.role) return redirect(`/${lang}/auth/onboarding`);
  if (currentUser.role !== "SCHOOLSTAFF") return <PermissionPage lang={lang} role={currentUser.role}/>;



  return (
    <div className=" px-4 mt-4">
      <div>
        <h1 className=" basic-title">Create School</h1>
        <p>To create school they are some information we ask you to create school which help us to know your school please use real information</p>
      </div>
      {/* <SchoolCreateBody /> */}
    </div>
  )
};

export default SchoolStaffCreateSchoolPage;
