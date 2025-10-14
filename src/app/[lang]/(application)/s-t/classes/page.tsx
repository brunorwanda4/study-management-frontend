import NotFoundPage from "@/components/page/not-found";
import PermissionPage from "@/components/page/permission-page";
import ClassesSchoolTable from "@/components/page/school-staff/table/classes-table";
import type { Locale } from "@/i18n";
import { getSchoolServer } from "@/lib/utils/auth";
import { authContext } from "@/lib/utils/auth-context";
import { getClassesBySchoolId } from "@/service/class/class.service";
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

const SchoolStaffClassesPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const [currentUser, currentSchool] = await Promise.all([
    await authContext(),
    await getSchoolServer(),
  ]);

  if (!currentUser) {
    redirect(`/${lang}/auth/login`);
  }

  if (!currentSchool)
    return (
      <PermissionPage lang={lang} role={currentUser.user.role ?? "STUDENT"} />
    );
  const classes = await getClassesBySchoolId(currentSchool.schoolId);
  if (!classes.data) return <NotFoundPage />;
  return (
    <div className="max-w-full space-y-2 p-4">
      <h2 className="title-page">Classes</h2>
      <div>
        <ClassesSchoolTable lang={lang} classes={classes.data} />
      </div>
    </div>
  );
};
export default SchoolStaffClassesPage;
