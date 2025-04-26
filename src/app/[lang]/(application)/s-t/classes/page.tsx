import PermissionPage from "@/components/page/permission-page";
import type { Locale } from "@/i18n";
import { getAuthUserServer, getSchoolServer } from "@/lib/utils/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Class Management",
  description: "Manage your class members and their roles",
  keywords: "class, management, students, teachers",
};

interface props {
  params: Promise<{ lang: Locale }>;
}

const SchoolStaffClassesPage = async (props : props) => {
  const params = await props.params;
  const { lang } = params;
  const [currentUser, currentSchool] = await Promise.all([
    await getAuthUserServer(),
    await getSchoolServer(),
  ]);

  if (!currentUser) {
    redirect(`/${lang}/auth/login`);
  }

  if (!currentSchool) return <PermissionPage lang={lang} role={currentUser.role ?? "STUDENT"}/>
  // const school = await getSchoolByIdService(currentSchool.schoolId);
  // if (!school.data) return <NotFoundPage />;
  return (
    <div className="p-4 space-y-2 max-w-full">
      
      <div>
        {/* <ClassTimetable /> */}
      </div>
    </div>
  );
};
export default SchoolStaffClassesPage;
